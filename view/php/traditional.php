<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
$company = $_GET['company'];
$from_date = $_GET['from'];
$to_date = $_GET['to'];
//echo './traditional.sh '.$company;
echo exec('sudo ./traditional.sh '.$company.' '.$from_date.' '.$to_date);
//$json =  json_decode(exec('./traditional.sh '.$company), true);
//echo $json
?>
