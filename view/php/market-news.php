<?php
	 //php 7.0
 	echo "inside market-news.php";
 	header("Location:/Research-Platform-Stock-Market/view/market-news.html");
 	$company_id = $_GET['cid'];
 	//company_id="REL";
 	exec("sudo ./market_news.sh ".$company_id);
	//exec("sudo ./test.sh ".$company_id);
 	echo "success";
 	
 ?>
