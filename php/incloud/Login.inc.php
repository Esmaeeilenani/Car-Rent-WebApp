<?php
include 'ClassLoader.php';
// include 'ProviderHandler.inc.php';
// include 'RenterHandler.inc.php';
session_start();

/*Security checks*/
$Username = $CName = $Password = "";






if (isset($_POST['Provider-Login'])) {

    $CName = test_input($_POST["CompanyName"]);
    $Password = test_input($_POST["password"]);
    getProvider($CName, $Password);
    unset($_POST);
    exit();
} else if (isset($_POST['Renter-Login'])) {

    $Username = test_input($_POST["Username_Email"]);
    $Password = test_input($_POST["password"]);
    getRenter($Username, $Password);
    unset($_POST);
    exit();
}





//get Provider from database
function getProvider($CName, $Password)
{

    $PRdb = new ProviderDBConn();
    $result = $PRdb->getProvider($CName);

    //the company is not in the database
    if (empty($result)) {
        echo "nocompany";
        exit();
    } else if ($result['Password'] !== $Password) {

        echo "Wrong Password";
        exit();
    }
    $provider = new Provider();
    $provider->setCompanyName($CName);
    $provider->setCRecord($result['CRecord']);
    $provider->setPhone($result['Phone']);
    $provider->setEmail($result['Email']);
    $provider->setPassword($Password);

    ProviderCars($provider);
    $_SESSION['provider'] = $provider;



    echo json_encode($provider);
}
//----------------------------------------------------------------------
function ProviderCars($provider)
{
    $CarDB = new CarDBConn();
    $RenterDB = new RenterDBConn();

    $renter = null;
    $CarsArr = $CarDB->getCarsProv($provider->getCompanyName());

    if (isset($CarsArr)) {
        foreach ($CarsArr as $car) {
            $renter = new Renter();
            $CarID = $car['CarID'];
            $CarModel = $car['CarModel'];
            $Model_Year = $car['Model_Year'];
            $CarType = $car['CarType'];
            $Price = $car['Price'];
            $Status = $car['Status'] === "1" ? true : false;
            if ($car['Renter_FK'] !== null) {
                $renterName = $RenterDB->getRenterName($car['Renter_FK']);
                $renter->setName($renterName);
            }

            $ProvCar = Car::Car($CarID, $CarModel, $Model_Year, $CarType, (float)$Price, $Status, $provider);
            $ProvCar->setCarRentr($renter);

            $provider->addCar($ProvCar);
        }
    }
}

//get renter from database
function getRenter($Username, $Password)
{


    $REdb = new RenterDBConn();
    $result = null;

    if (stripos($Username, "@") !== false) {
        $result = $REdb->getRenterEmail($Username);
    } else {

        $result = $REdb->getRenter($Username);
    }



    //the Renter is not in the database
    if (empty($result)) {
        echo "Wrong Username or Email";
        exit();
    } else if ($result['Password'] !== $Password) {
        echo "Wrong Password";
        exit();
    }

    $renter = new Renter();
    $renter->setUserName($Username);
    $renter->setName($result['Name']);
    $renter->setAge($result['Age']);
    $renter->setPhone($result['Phone']);
    $renter->setEmail($result['Email']);
    $renter->setNaID($result['NaID']);
    $renter->setPassword($Password);

    RenterCars($renter);
    $_SESSION['renter'] = $renter;

    echo json_encode($renter);
}

function RenterCars($renter)
{
    $CarDB = new CarDBConn();
    $provider = null;
    $CarsArr = $CarDB->RenterCars($renter->getUserName());
    if (!empty($CarsArr)) {

        foreach ($CarsArr as $car) {
            $provider  = new Provider();

            $CarID = $car['CarID'];
            $CarModel = $car['CarModel'];
            $Model_Year = $car['Model_Year'];
            $CarType = $car['CarType'];
            $Price = $car['Price'];
            $Status = $car['Status'];
            $provider->setCompanyName($car['ProviderName_FK']);

            $RenterCar = Car::Car($CarID, $CarModel, $Model_Year, $CarType, (float)$Price, $Status, $provider);
            $RenterCar->setCarRentr($renter);
            $renter->addCar($RenterCar);
        }
    }
}


//checks if all feild are Secure
function test_input($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
