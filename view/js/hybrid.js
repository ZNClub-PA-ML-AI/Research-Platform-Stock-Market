

var company_id='REL';



/*
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
*/

function candlestick(company_id){

$.getJSON('/Research-Platform-Stock-Market/view/data/json/market-news/NSE-'+company_id+'.json', function(data) {

#var size = Object.keys(data.date).length;
console.log(data);

  
});

}

