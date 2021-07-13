<?php

declare(strict_types=1);
class Renter implements JsonSerializable
{
    private $UserName;
    private $Name;
    private $Age;
    private $Phone;
    private $Email;
    private $NaID;
    private $Password;
    private $CarsList = array();
    private static $DrivingAge = 21;

    public static function Renter($UserName, $Name, $Age, $Phone, $Email, $NaID, $Password)
    {
        $renter = new self();

        $renter->UserName = $UserName;
        $renter->Name = $Name;
        $renter->Age = $Age;
        $renter->Phone = $Phone;
        $renter->Email = $Email;
        $renter->NaID = $NaID;
        $renter->Password = $Password;
        $renter->CarsList = array();
        return $renter;
    }
    public function __construct()
    {
    }

    public function getUserName()
    {
        return $this->UserName;
    }

    public function setUserName($UserName)
    {
        $this->UserName = $UserName;
    }

    public function getName()
    {
        return $this->Name;
    }

    public function setName($Name)
    {
        $this->Name = $Name;
    }

    public function getAge()
    {
        return $this->Age;
    }

    public function setAge($Age)
    {
        $this->Age = $Age;
    }


    public function getPhone()
    {
        return $this->Phone;
    }


    public function setPhone($Phone)
    {
        $this->Phone = $Phone;
    }

    public function getNaID()
    {
        return $this->NaID;
    }

    public function setNaID($NaID)
    {
        $this->NaID = $NaID;
    }

    public function getEmail()
    {
        return $this->Email;
    }


    public function setEmail($Email)
    {
        $this->Email = $Email;
    }


    public function getPassword()
    {
        return $this->Password;
    }


    public function setPassword($Password)
    {
        $this->Password = $Password;
    }


    public function setCarList($CarsList)
    {
        $this->CarsList = $CarsList;
    }

    public function addCar(Car $car)
    {
        $this->CarsList[] = $car;
    }

    public function getCar(int $index)
    {

        return $this->CarsList[$index];
    }

    public function getCars()
    {
        return $this->CarsList;
    }



    public static function getDrivingAge()
    {
        return self::$DrivingAge;
    }

    public function jsonSerialize()
    {
        return [
            'UserName' => $this->UserName,
            'Name' => $this->Name,
            'Age' => $this->Age,
            'Phone' => $this->Phone,
            'Email' => $this->Email,
            'NaID' => $this->NaID,
            'Password' => $this->Password,
            'CarsList' => $this->CarsList
        ];
    }
}
