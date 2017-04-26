

var company_id='REL';



$.getJSON('/Research-Platform-Stock-Market/view/php/market-news.php?cid='+company_id, function(data) {
	console.log(data);
	console.log(data.result);
	if(data.result=='success'){
	candlestick(company_id);
	predict(company_id);	
	}
	else{
	alert("Server error. Please try again later");
	}
	
});


function labeledSpline(company_id){

$.getJSON('/Research-Platform-Stock-Market/view/data/json/hybrid/'+company_id+'_sentiment.json', function(data) {

  var size = Object.keys(data.date).length;
  
});

}

