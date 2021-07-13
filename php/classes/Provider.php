<?php

declare(strict_types=1);
class Provider implements JsonSerializable
{


  private $CompanyName;
  private $CRecord;
  private $Phone;
  private $Email;
  private $Password;
  private $CarsList = array();


  public static function Provider($CompanyName, $CRecord, $Phone, $Email, $Password)
  {
    $Provider = new self();
    $Provider->CompanyName = $CompanyName;
    $Provider->CRecord = $CRecord;
    $Provider->Phone = $Phone;
    $Provider->Email = $Email;
    $Provider->Password = $Password;
    $Provider->CarsList =  array();
    return $Provider;
  }

  public function __construct()
  {
  }

  public function getCompanyName()
  {
    return $this->CompanyName;
  }

  public function setCompanyName($CompanyName)
  {
    $this->CompanyName = $CompanyName;
  }

  public function getCRecord()
  {
    return $this->CRecord;
  }
  public function setCRecord($CRecord)
  {
    $this->CRecord = $CRecord;
  }

  public function getPhone()
  {
    return $this->Phone;
  }


  public function setPhone($Phone)
  {
    $this->Phone = $Phone;
  }

  public function getEmail()
  {
    return $this->Email;
  }

  public function setEmail($Email)
  {
    $this->Email = $Email;
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

  public function getPassword()
  {
    return $this->Password;
  }

  public function setPassword($Password)
  {
    $this->Password = $Password;
  }


  public function jsonSerialize()
  {
    return [
      "CompanyName" => $this->CompanyName,
      "CRecord" => $this->CRecord,
      "Phone" => $this->Phone,
      "Email" => $this->Email,
      "Password" => $this->Password,
      "CarsList" => $this->CarsList
    ];
  }

  public function __destruct()
  {
  }
}
