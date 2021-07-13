<?php
include 'ClassLoader.php';
session_start();

if (!isset($_SESSION['renter']) && !isset($_POST['car'])) {
    exit();
}

$CarDB =  new CarDBConn();
$renter = $_SESSION['renter'];

$CarArr = json_decode($_POST['car'], true);

$CompanyName = test_Carinput($CarArr['CarProvider']);
$CarID = test_Carinput($CarArr['CarID']);
$CarModel = test_Carinput($CarArr['CarModel']);
$Model_Year = test_Carinput($CarArr['Model_Year']);
$CarType = test_Carinput($CarArr['CarType']);
$Price = test_Carinput($CarArr['Price']);

$provider = new Provider();
$provider->setCompanyName($CompanyName);

$car = Car::Car($CarID, $CarModel, $Model_Year, $CarType, (float)$Price, false, $provider);

$renter->addCar($car);
$CarDB->RentCar($renter->getUserName(), $CarID);




//checks if all feild are Secure
function test_Carinput($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
