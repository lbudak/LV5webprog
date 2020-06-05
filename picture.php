<?php

function countPng(){
    $directory = "./img/";
    $filecount = 0;
    $files = glob($directory . "*");
    if ($files)
        $filecount = count($files);
    return $filecount;
}