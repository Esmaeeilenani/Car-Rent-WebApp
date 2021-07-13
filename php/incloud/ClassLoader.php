<?php
spl_autoload_register('autoLoade');


function autoLoade($className)
{
    $root = $_SERVER['DOCUMENT_ROOT'];


    $fullpath = $root . "/CarRent-new/php/classes/" . $className . ".php";

    if (!file_exists($fullpath)) {

        return false;
    }
    include_once $fullpath;
}
