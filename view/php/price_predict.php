<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
$open = $_GET['open'];
$high = $_GET['high'];
$low = $_GET['low'];
$close = $_GET['close'];
$volume = $_GET['volume'];
echo exec('sudo ./price_predict.sh '.$open.' '.$high.' '.$low.' '.$close.' '.$volume);
?>
