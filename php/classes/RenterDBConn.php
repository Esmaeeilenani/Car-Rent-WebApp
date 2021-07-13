<?php

declare(strict_types=1);
class RenterDBConn extends CarDB
{


    //Statment handler
    private $stmt;

    //db Commands
    private const INSERT = 'INSERT INTO renter VALUES(?,?,? ,?,?,?,?)';
    private const SELECT = 'SELECT * FROM renter WHERE UserName = ?';
    private const SELECT_BY_EMAIL = 'SELECT * FROM renter WHERE Email = ?';
    private const SELECT_ALL = 'SELECT * FROM renter';
    private const DELET = 'DELETE FROM renter WHERE UserName = ?';
    private const UPDATE = 'UPDATE renter SET Name=? ,Age =?,Phone =?,Email=?,NaID=? ,Password=? where UserName=?';

    public function insertRenter(Renter $renter)
    {
        $stmt = $this->connect()->prepare(self::INSERT);

        $stmt->execute([$renter->getUserName(), $renter->getName(), $renter->getAge(), $renter->getPhone(), $renter->getEmail(), $renter->getNaID(), $renter->getPassword()]);
    }

    public function getRenter(string $UserName)
    {
        $stmt = $this->connect()->prepare(self::SELECT);

        $stmt->execute([$UserName]);

        $result = $stmt->fetch();

        return $result;
    }

    //Select the renter by email
    public function getRenterEmail(string $Email)
    {
        $stmt = $this->connect()->prepare(self::SELECT_BY_EMAIL);

        $stmt->execute([$Email]);

        $result = $stmt->fetch();

        return $result;
    }

    //to Attatch the renter name when the provider see the rented Cars
    public function getRenterName(string $UserName)
    {
        $stmt = $this->connect()->prepare(self::SELECT);

        $stmt->execute([$UserName]);

        $result = $stmt->fetch();

        return $result['Name'];
    }

    public function updateRenter(Renter $renter)
    {
        $stmt = $this->connect()->prepare(self::UPDATE);

        $stmt->execute([$renter->getName(), $renter->getAge(), $renter->getPhone(), $renter->getEmail(), $renter->getNaID(), $renter->getPassword(), $renter->getUserName()]);
    }

    public function __destruct()
    {
    }
}
