
<?php
	 //php 7.0
 	echo "inside market-news.php"
 	//header("Location:/Research-Platform-Stock-Market/view/market-news.html")
 	$company_id = $_GET['company_id'];
 	echo exec bash market_news.sh $company_id
 	echo "success"
 	
 ?>
