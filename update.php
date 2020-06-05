<?php 
    require 'ferit.database.php';
    $db = new Database("db", "ferit", "user", "test");
    $db->Connect();
    
    $name = $_POST["name"];
    $age = $_POST["age"];
    $info = $_POST["info"];
    $wins = $_POST["wins"];
    $loss = $_POST["loss"];
    $image = $_POST["cats"];
    $id = $_POST["update"];

    if( isset($id) ){

        $query = "UPDATE cats SET name='$name' , age='$age', info='$info', wins='$wins', loss='$loss', image='$image' WHERE id=$id";
    }
    else{
        $query = "INSERT INTO cats (name, age, info, wins, loss, image) VALUES ('". $name ."', '". $age ."', '". $info ."' , '". $wins ."' , '". $loss ."' , '". $image ."')";
    }
    $db->Update($query);
 
    $db->CloseConnection();
    header("Location: index.php");  
?>