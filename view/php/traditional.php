<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
$company = $_GET['company'];
//echo './traditional.sh '.$company;
echo exec('./traditional.sh '.$company);

?>
