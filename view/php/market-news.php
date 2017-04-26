<?php
	//php 7.0
 	//echo "inside market-news.php";
 	//header("Location:/Research-Platform-Stock-Market/view/market-news.html");

 	$company_id = $_GET['cid']; 	
	//$company_id = 'REL';
 	exec("sudo ./market_news.sh ".$company_id);
	
	// delay return of control
	$x = 1; 
	while($x <= 1050) {	    
	    $x++;
	} 

	$data=['result'=>'success'];
	header('Content-Type:application/json');
	header('Access-Control-Allow-Origing:*');
 	echo json_encode($data);

 ?>
