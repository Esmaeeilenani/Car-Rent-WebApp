<?php

declare(strict_types=1);
class CarDBConn extends CarDB
{

    //db Commands
    private const INSERT = 'INSERT INTO car  values (?, ?, ?, ?,?,?,? ,?)';
    private const SELECT = 'SELECT * FROM car WHERE CarID = ?';
    private const SELECT_ALL_PROV = 'SELECT * FROM car where ProviderName_FK =?';

    private const SELECT_ALL_NOT_RENTED = 'SELECT  CarID,CarModel , Model_Year,CarType,Price FROM car where ProviderName_FK =? AND Status = 1';

    private const SELECT_ALL_RENTER_CARS = 'SELECT * FROM car where Renter_FK =?';
    private const RENT = 'UPDATE car SET Status = false , Renter_FK=?   WHERE CarID=?';
    private const DELET = 'DELETE FROM car WHERE CarID = ? and ProviderName_FK =?';
    private const UPDATE = 'UPDATE car SET CarModel=? , Model_Year=?, CarType=?,Price=? where CarID =? and ProviderName_FK =?';


    function insertCar(Car $car)
    {
        $providerName = $car->getCarProvider()->getCompanyName();


        $stmt = $this->connect()->prepare(self::INSERT);

        $stmt->execute([
            $car->getCarID(), $providerName, $car->getCarModel(), (string)$car->getModel_Year(), $car->getCarType(), $car->getPrice(), true, null
        ]);
    }


    function getCar(string $CarID)
    {

        $stmt = $this->connect()->prepare(self::SELECT);
        $stmt->execute([$CarID]);

        $result = $stmt->fetch();


        return $result;
    }

    //this only for provider to show all his cars
    function getCarsProv($providerName)
    {
        $stmt = $this->connect()->prepare(self::SELECT_ALL_PROV);
        $stmt->execute([$providerName]);
        $result = $stmt->fetchAll();
        return $result;
    }

    //this for renter or others
    function getNotRentedCars($providerName)
    {
        $stmt = $this->connect()->prepare(self::SELECT_ALL_NOT_RENTED);
        $stmt->execute([$providerName]);
        $result = $stmt->fetchAll();
        return $result;
    }

    function deleteCar($CarID, $providerName)
    {
        $stmt = $this->connect()->prepare(self::DELET);
        $stmt->execute([$CarID, $providerName]);
    }

    function UpdateCar(Car $car, $providerName)
    {
        $stmt = $this->connect()->prepare(self::UPDATE);
        $stmt->execute([$car->getCarModel(), $car->getModel_Year(), $car->getCarType(), $car->getPrice(), $car->getCarID(), $providerName]);
    }




    function RentCar($RenterName, $CarID)
    {
        $stmt = $this->connect()->prepare(self::RENT);
        $stmt->execute([$RenterName, $CarID]);
    }

    function RenterCars($RenterName)
    {
        $stmt = $this->connect()->prepare(self::SELECT_ALL_RENTER_CARS);
        $stmt->execute([$RenterName]);

        $result = $stmt->fetchAll();
        return $result;
    }


    public function __destruct()
    {
    }
}
