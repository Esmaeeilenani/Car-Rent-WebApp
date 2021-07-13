<?php

declare(strict_types=1);
class Car implements JsonSerializable
{
    private $CarID;
    private $CarModel;
    private $Model_Year;
    private $CarType;
    private $Price;
    private $Status;
    private $CarProvider;
    private $CarRentr;

    public static function Car($CarID,  $CarModel, $Model_Year, $CarType, float $Price, $Status, Provider $CarProvider)
    {
        $car = new self();
        $car->CarID = $CarID;
        $car->CarModel = $CarModel;
        $car->Model_Year = $Model_Year;
        $car->CarType  = $CarType;
        $car->Price = $Price;
        $car->Status = $Status;
        $car->CarProvider = $CarProvider;
        return $car;
    }
    public function __construct()
    {
    }

    public function getCarID()
    {
        return $this->CarID;
    }


    public function setCarID($CarID)
    {
        $this->CarID = $CarID;
    }

    public function getCarModel()
    {
        return $this->CarModel;
    }


    public function setCarModel($CarModel)
    {
        $this->CarModel = $CarModel;
    }


    public function getModel_Year()
    {
        return $this->Model_Year;
    }


    public function setModel_Year($Model_Year)
    {
        $this->Model_Year = $Model_Year;

        return $this;
    }


    public function getCarType()
    {
        return $this->CarType;
    }


    public function setCarType($CarType)
    {
        $this->CarType = $CarType;
    }


    public function getPrice()
    {
        return $this->Price;
    }

    public function setPrice(float $Price)
    {
        $this->Price = $Price;
    }


    public function getStatus()
    {
        return $this->Status;
    }


    public function setStatus($Status)
    {
        $this->Status = $Status;
    }

    public function getCarProvider()
    {
        return $this->CarProvider;
    }


    public function setCarProvider(Provider $CarProvider)
    {
        $this->CarProvider = $CarProvider;
    }

    public function getCarRentr()
    {
        return $this->CarRentr;
    }


    public function setCarRentr(Renter $CarRentr)
    {
        $this->CarRentr = $CarRentr;
    }


    public function jsonSerialize()
    {

        return [
            "CarID" => $this->CarID,
            "CarModel" => $this->CarModel,
            "Model_Year" => $this->Model_Year,
            "CarType" => $this->CarType,
            "Price" => $this->Price,
            "Status" => $this->Status,
            "CarProvider" => $this->CarProvider->getCompanyName(),
            "CarRenter" => $this->getCarRentr() !== null ? $this->getCarRentr()->getName() : null
        ];
    }
}
