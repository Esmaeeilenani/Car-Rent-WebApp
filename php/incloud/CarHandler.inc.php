<?php
include 'ClassLoader.php';
session_start();
$provider = $_SESSION['provider'];
$CarDB = new CarDBConn();
$CarID = $CarModel =  $Model_Year = $CarType = $Price = "";

//to use Add car Page 
// if (!isset($provider)) {
//     header("Location: ../../index.html");
//     exit();
// }

$CarArr = json_decode($_POST['car'], true);

$CarID = test_Carinput($CarArr['CarID']);
$CarModel = test_Carinput($CarArr['CarModel']);
$Model_Year = test_Carinput($CarArr['Model_Year']);
$CarType = test_Carinput($CarArr['CarType']);
$Price = test_Carinput($CarArr['Price']);

//if the provider want to add a car
if (isset($_POST['AddCar'])) {
    insertCarDB($CarID, $CarModel, $Model_Year, $CarType, $Price, $provider, $CarDB);
} else if (isset($_POST['UpdateCar'])) {
    UpdateCarDB($CarModel, $Model_Year, $CarType, $Price, $provider, $CarDB);
} else if (isset($_POST['ProviderName'])) {
    $ProvName =  test_Carinput($_POST['ProviderName']);
    $provider = new Provider();
    $provider->setCompanyName($ProvName);

    getAllCars($CarID, $CarModel, $Model_Year, $CarType, $Price, $provider, $CarDB);
    echo json_encode($provider);
}


function getAllCars($CarID, $CarModel, $Model_Year, $CarType, $Price, $provider, $CarDB)
{
    $RenterDB = new RenterDBConn();
    $CarsArr = $CarDB->getCarsProv($provider->getCompanyName());

    foreach ($CarsArr as $car) {
        $renter = null;
        $CarID = $car['CarID'];
        $CarModel = $car['CarModel'];
        $Model_Year = $car['Model_Year'];
        $CarType = $car['CarType'];
        $Price = $car['Price'];
        $Status = ($car['Status'] == 1) ? true : false;


        $ProvCar = Car::Car($CarID, $CarModel, $Model_Year, $CarType, (float)$Price, $Status, $provider);
        if ($car['Renter_FK'] !== null) {
            $renterName = $RenterDB->getRenterName($car['Renter_FK']);
            $renter = new Renter();
            $renter->setName($renterName);
            $ProvCar->setCarRentr($renter);
        }




        $provider->addCar($ProvCar);
    }
}


function insertCarDB($CarID, $CarModel, $Model_Year, $CarType, $Price, $provider, $CarDB)
{

    $exists = $CarDB->getCar($CarID);
    if (!empty($exists)) {
        echo "exists";
        unset($CarDB);
        exit();
    }

    $car = Car::Car($CarID, $CarModel, $Model_Year, $CarType, (float)$Price, true, $provider);
    $provider->addCar($car);

    $CarDB->insertCar($car);
    unset($CarDB);
    unset($_POST);
    echo "Done";
    exit();
}

function UpdateCarDB($CarModel, $Model_Year, $CarType, $Price, $provider, $CarDB)
{

    $index = $_POST["index"];




    $car = $provider->getCar($index);

    $car->setCarModel($CarModel);
    $car->setModel_Year($Model_Year);
    $car->setCarType($CarType);
    $car->setPrice($Price);


    $CarDB->UpdateCar($car, $provider->getCompanyName());

    unset($CarDB);
    unset($_POST);
    echo "Done";
    exit();
}




//checks if all feild are Secure
function test_Carinput($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
