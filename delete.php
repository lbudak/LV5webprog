<?php 
    require 'ferit.database.php';
    $db = new Database("db", "ferit", "user", "test");
    $db->Connect();
    $var_value = $_GET['delete'];
    $db->Delete($var_value);
    $db->CloseConnection();
    header("Location: index.php");
?>