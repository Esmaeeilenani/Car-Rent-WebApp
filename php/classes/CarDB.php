<?php

class CarDB
{
    private $hostname = "localhost";
    private $user = "root";
    private $pass = 123;
    private $dbName = "cardb";

    protected function connect()
    {
        $dsn = 'mysql:host=' . $this->hostname . ';dbname=' . $this->dbName;
        $pdo = new PDO($dsn, $this->user, $this->pass);
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


        return $pdo;
    }
}
