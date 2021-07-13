<?php

declare(strict_types=1);
class ProviderDBConn extends CarDB
{


    //Statment handler
    private $stmt;

    //db Commands
    private const INSERT = 'INSERT INTO provider VALUES(?,?,?,?,?)';
    private const SELECT = 'SELECT * FROM provider WHERE CName = ?';
    private const SELECT_BY_EMAIL = 'SELECT * FROM provider WHERE Email = ?';
    private const SELECT_BY_C_RECORD = 'SELECT * FROM provider WHERE CRecord = ?';
    private const SELECT_ALL_NAMES = 'SELECT CName FROM provider';
    private const DELET = 'DELETE FROM provider WHERE CName = ?';
    private const UPDATE = 'UPDATE provider SET CRecord=? , Phone=?, Email=?,Password=? where CName =?';

    public function insertProvider(Provider $provider)
    {
        $stmt = $this->connect()->prepare(self::INSERT);

        $stmt->execute([$provider->getCompanyName(), $provider->getCRecord(), $provider->getPhone(), $provider->getEmail(), $provider->getPassword()]);
    }

    public function getProvider(string $CompanyName)
    {
        $stmt = $this->connect()->prepare(self::SELECT);

        $stmt->execute([$CompanyName]);

        $result = $stmt->fetch();

        return $result;
    }

    public function getProviderEmail(string $Email)
    {
        $stmt = $this->connect()->prepare(self::SELECT_BY_EMAIL);

        $stmt->execute([$Email]);

        $result = $stmt->fetch();

        return $result;
    }

    public function getProviderCRecord(string $CRecord)
    {
        $stmt = $this->connect()->prepare(self::SELECT_BY_C_RECORD);

        $stmt->execute([$CRecord]);

        $result = $stmt->fetch();

        return $result;
    }




    public function getProvidersNames()
    {
        $stmt = $this->connect()->prepare(self::SELECT_ALL_NAMES);

        $stmt->execute();

        $result = $stmt->fetchAll();

        return $result;
    }

    public function updateProvider(Provider $provider)
    {
        $stmt = $this->connect()->prepare(self::UPDATE);
        $stmt->execute([$provider->getCRecord(), $provider->getPhone(), $provider->getEmail(), $provider->getPassword(), $provider->getCompanyName()]);
    }

    public function __destruct()
    {
    }
}
