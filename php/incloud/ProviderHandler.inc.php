<?php
include 'ClassLoader.php';
session_start();

if (count($_POST) == 0) {
    header("Location: ../../index.html");
    exit();
}


$PRDB = new ProviderDBConn();

//Provider associative array from JSON
$ProviderArr = json_decode($_POST['provider'], true);

/*Security checks*/
$CompanyName = test_Providerinput($ProviderArr['CompanyName']);
$CRecord = test_Providerinput($ProviderArr['CRecord']);
$Phone = test_Providerinput($ProviderArr['Phone']);
$Email = test_Providerinput($ProviderArr['Email']);
$Password = test_Providerinput($ProviderArr['Password']);


if (isset($_POST['ProviderReg'])) {

    insertProviderDB($CompanyName, $CRecord, $Phone, $Email, $Password, $PRDB);
} else if (isset($_POST['Provider-Update'])) {
    // if the Provider is already in the session 
    $provider = $_SESSION['provider'];

    //update provider INFO
    updateProviderDB($provider,  $CRecord, $Phone, $Email, $Password,  $PRDB);
} else if (isset($_GET['del'])) {

    deleteProviderCar($_GET['del'], $provider);
} else if ($_POST['Provider-Logout']) {
} else {

    echo json_encode($PRDB->getProvidersNames());
}


//insert to DB
function insertProviderDB($CompanyName, $CRecord, $Phone, $Email, $Password, $PRDB)
{




    $CNameExsists = $PRDB->getProvider($CompanyName);
    $CRecordExsists = $PRDB->getProviderCRecord($CRecord);
    $EmailExsists = $PRDB->getProviderEmail($Email);
    $errorArr = [];

    $errorArr["CompanyName"] = !empty($CNameExsists) ? "CNameExsists" : "";
    $errorArr["CRecord"] = !empty($CRecordExsists) ? "CRecordExsists" : "";
    $errorArr["Email"] = !empty($EmailExsists) ? "EmailExsists" : "";

    if (!empty($errorArr["CompanyName"]) || !empty($errorArr["CRecord"]) || !empty($errorArr["Email"])) {
        echo json_encode($errorArr);
        unset($PRDB);
        unset($_POST);
        exit();
    }

    $newProvider = Provider::Provider($CompanyName, $CRecord, $Phone, $Email, $Password);


    $_SESSION['provider'] = $newProvider;

    $PRDB->insertProvider($newProvider);
    unset($PRDB);
    unset($_POST);
    echo json_encode($newProvider);
    exit();
}


function updateProviderDB($provider,  $CRecord, $Phone, $Email, $Password,  $PRDB)
{

    $newEmail = test_Providerinput($_POST['newEmail']);

    if (!empty($newEmail)) {

        $result = $PRDB->getProviderEmail($newEmail);

        if (!empty($result)) {
            echo json_encode(["Email" => "EmailExsists"]);
            exit();
        }


        $provider->setEmail($newEmail);
    }

    $provider->setCRecord($CRecord);
    $provider->setPhone($Phone);
    $provider->setPassword($Password);

    $PRDB->updateProvider($provider);
    unset($PRDB);
    unset($_POST);

    echo json_encode($provider);

    exit();
}

//Delet Car from Provider
function deleteProviderCar($CarID, $provider)
{
    $CarDB = new CarDBConn();
    $CarDB->deleteCar($CarID, $provider->getCompanyName());
    $Cars = $provider->getCars();


    for ($i = 0; $i < count($Cars); $i++) {


        if ($provider->getCars()[$i]->getCarID() == $CarID) {
            unset($Cars[$i]);
            $provider->setCarList($Cars);
            header("Location: ../ProviderCars.php");
            exit();
        }
    }
}


//checks if all feild are Secure
function test_Providerinput($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
