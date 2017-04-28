<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
$open = $_GET['open'];
$high = $_GET['high'];
$low = $_GET['low'];
$close = $_GET['close'];
$mode = $_GET['mode'];
if ($mode == "open")
echo exec('sudo ./hybrid_predict_open.sh '.$open.' '.$high.' '.$low.' '.$close);
else
echo exec('sudo ./hybrid_predict_close.sh '.$open.' '.$high.' '.$low.' '.$close);
?>
