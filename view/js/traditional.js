$(document).ready(function(){
	$('.select-company').click(function () {
		var selected = $('#company-dropdown').val();
		var company_name = $('#company-dropdown option:selected').text();
		var from_year = $('#from-year').val();
		var from_month = $('#from-month').val();
		var from_day = $('#from-day').val();
		var from_date = from_year+"-"+from_month+"-"+from_day;
		var to_year = $('#to-year').val();
		var to_month = $('#to-month').val();
		var to_day = $('#to-day').val();
		var to_date = to_year+"-"+to_month+"-"+to_day;
		$.getJSON('/Research-Platform-Stock-Market/view/php/traditional.php?company='+selected+'&from='+from_date+"&to="+to_date, function(data) {			
			//console.log(data);
			var size = Object.keys(data.Date).length;
			var open_predicted = [];
			var open = [];
		 
			for (var i = size-1; i >= 0; i--) {
				//console.log(data.Date[i]);
				var dates = data.Date[i].split('-');
				var m = dates[1];
				m = parseInt(m) - 1;
				m = m.toString()
				if (m.length == 1) {
				  m = "0" + m;
				}
				var dateUTC = Date.UTC(dates[0], m, dates[2]);
				open.push([dateUTC, data.Open[i]]);
				open_predicted.push([dateUTC, data.open_predicted[i]]);
		  }
		  var accuracy = data.accuracy;
		  console.log(accuracy);
		  $('#accuracy').text('Accuracy: '+accuracy);
		  Highcharts.chart('container1', {
			chart: {
			  type: 'spline',
			  zoomType: 'xy'
			},
			title: {
			  text: 'Open Price - Predicted Open Price TRADITIONAL '+company_name
			},
			subtitle: {
			  text: ''
			},
			xAxis: {
			  type: 'datetime',
			  dateTimeLabelFormats: { 
				month: '%e. %b',
				year: '%b'
			  },
			  title: {
				text: 'Months'
			  }
			},
			yAxis: {
			  title: {
				text: 'Open Price'
			  },
			  min: 0.00,
			  gridLineWidth: 0,
			  alternateGridColor: null,
			},
			tooltip: {
			  headerFormat: '<b>{series.name}</b><br>',
			  pointFormat: '{point.x:%e. %b}: {point.y:.3f} value'
			},
			plotOptions: {
			  spline: {
				marker: {
				  enabled: true
				}
			  }
			},
			series: [{
			  name: 'Open Price',
			  data: open
			}, {
			  name: 'Predicted Open Price',
			  data: open_predicted
			}]
		  });
		});
	});
});
