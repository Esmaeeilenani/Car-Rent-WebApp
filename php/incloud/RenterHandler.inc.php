<?php
include 'ClassLoader.php';
header("Content-Type: application/json; charset=UTF-8");
session_start();

//if the post is empty
if (count($_POST) == 0) {
    header("Location: ../../index.html");
    exit();
}




$UserName = $Name  = $Age =  $Email =  $NaID = $Password = "";

$REdb = new RenterDBConn();

//renter associative array from JSON
$renterArr = json_decode($_POST['renter'], true);


//all renter INFO
$UserName = test_Renterinput($renterArr['UserName']);
$Name = test_Renterinput($renterArr['Name']);
$Age = test_Renterinput($renterArr['Age']);
$Phone = test_Renterinput($renterArr['Phone']);
$Password = test_Renterinput($renterArr['Password']);
$Email = test_Renterinput($renterArr['Email']);
$NaID = test_Renterinput($renterArr['NaID']);



if (isset($_POST['RenterReg'])) {

    insertRenterDB($UserName, $Name, $Age, $Phone, $Email, $NaID,  $Password, $REdb);
} else if (isset($_POST['Renter-Update'])) {
    // if the renter is already in the session 
    $renter = $_SESSION['renter'];

    updateRenterDB($renter,  $Name, $Age, $Phone, $NaID,  $Password, $REdb);
} else if (isset($_POST['Renter-Logout'])) {
}



function reloadeAllRenterCars($renter)
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


//checks if all feild are enterd
function insertRenterDB($UserName, $Name, $Age,  $Phone, $Email, $NaID,  $Password, $REdb)
{

    $UserNameExsists = $REdb->getRenter($UserName);
    $EmailExsists = $REdb->getRenterEmail($Email);

    $errorArr = [];


    $errorArr["UserName"] =  !empty($UserNameExsists) ? "UserNameExsists" : "";
    $errorArr["Email"] =  !empty($EmailExsists) ? "EmailExsists" : "";


    if (!empty($errorArr["UserName"]) || !empty($errorArr["Email"])) {
        echo json_encode($errorArr);

        unset($REdb);
        unset($_POST);
        exit();
    }

    $renter = Renter::Renter($UserName, $Name, $Age, $Phone, $Email, $NaID, $Password);

    $_SESSION['renter'] = $renter;

    $REdb->insertRenter($renter);



    unset($REdb);
    unset($_POST);
    $jsondata = json_encode($renter);
    echo $jsondata;
    exit();
}

function updateRenterDB($renter, $Name, $Age,  $Phone, $NaID,  $Password, $REdb)
{
    $newEmail = test_Renterinput($_POST['newEmail']);

    if (!empty($newEmail)) {

        $result = $REdb->getRenterEmail($newEmail);

        if (!empty($result)) {
            echo json_encode(["Email" => "EmailExsists"]);
            exit();
        }


        $renter->setEmail($newEmail);
    }


    $renter->setName($Name);
    $renter->setAge($Age);
    $renter->setPhone($Phone);
    $renter->setNaID($NaID);
    $renter->setPassword($Password);



    $REdb->updateRenter($renter);
    echo json_encode($renter);
    unset($REdb);
    exit();
}

//checks if all feild are Secure
function test_Renterinput($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
