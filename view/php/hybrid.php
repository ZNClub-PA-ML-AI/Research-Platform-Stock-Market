<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
$company = $_GET['company'];
echo exec('sudo ./hybrid.sh '.$company);
?>
