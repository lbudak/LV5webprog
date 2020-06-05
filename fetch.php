<?php
    // Takes raw data from the request
    $json = file_get_contents('php://input');

    // Converts it into a PHP object
    $data = json_decode($json);

    $id = $data->id;
    $wins = $data->wins;
    $loss = $data->loss;
    

    require 'ferit.database.php';
    $db = new Database("db", "ferit", "user", "test");
    $db->Connect(); 

    $query = "UPDATE cats SET wins='$wins', loss='$loss' WHERE id='$id'";

    $db->Update($query);
    $db->CloseConnection();

    echo $id . " " . $wins . " " . $loss .  " " . $query;

?>