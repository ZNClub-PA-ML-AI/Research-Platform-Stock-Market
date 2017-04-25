<?php
	 //php 7.0
 	//echo "inside market-news.php";
 	//header("Location:/Research-Platform-Stock-Market/view/market-news.html");
 	$company_id = $_GET['cid'];
 	//company_id="REL";
 	exec("sudo ./market_news.sh ".$company_id);
	//exec("sudo ./test.sh ".$company_id);
 	//echo "success";

	$data=['result'=>'success'];
	header('Content-Type:application/json');
	header('Access-Control-Allow-Origing:*');
 	echo json_encode($data);

 ?>
