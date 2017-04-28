$(document).ready(function(){
	var json_data = null;
	var company_name = null;
	function getData(selected) {
		$.getJSON('/Research-Platform-Stock-Market/view/php/hybrid.php?company='+selected, function(data) {			
			json_data = data;
			$('#open_accuracy').text('Open Model Trained With Accuracy: '+json_data.open_accuracy*100);
			$('#close_accuracy').text('Close Model Trained With Accuracy: '+json_data.close_accuracy*100);
		});
	}
	$('.predict').click(function(){
		var open = $('#open').val();
		var high = $('#high').val();
		var low = $('#low').val();		
		var close = $('#close').val();
		var volume = $('#volume').val();
		$.getJSON('/Research-Platform-Stock-Market/view/php/price_predict.php?open='+open+'&high='+high+'&low='+low+'&close='+close+'&volume='+volume, function(data) {
			$('#prediction').text('Predicted Open Price: '+data['predicted_open_price']);
		});
	});
	$('.select-company').click(function () {
		var selected = $('#company-dropdown').val();
		company_name = $('#company-dropdown option:selected').text();
		getData(selected);
	});
	$('.select-chart').click(function() {
		if (json_data === null) {
			alert("Please train the model.");
		} else {
			var chart_type = $('#chart-type').val();
			if (chart_type === 'spline') {
				var size = Object.keys(json_data.Date).length;
				var open_predicted = [];
				var open = [];		 
				for (var i = 0; i < size; i++) {
					var dates = json_data.Date[i].split('-');
					var m = dates[1];
					m = parseInt(m) - 1;
					m = m.toString()
					if (m.length == 1) {
						m = "0" + m;
					}
					var dateUTC = Date.UTC(dates[0], m, dates[2]);
					open.push([dateUTC, json_data.Open[i]]);
					open_predicted.push([dateUTC, json_data.open_predicted[i]]);
				}
				Highcharts.chart('container', {
					chart: {
						type: 'spline',
						zoomType: 'xy'
					},
					title: {
						text: 'Open Price - Predicted Open Price HYBRID '+company_name
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
			} else if (chart_type === 'candlestick') {
				var open = json_data['Open'];
				var high = json_data['High'];
				var low = json_data['Low'];
				var close = json_data['Close'];
				var size = Object.keys(close).length;
				var date = json_data["Date"];	
				var ohlc = [];
				var vol = [];
				var groupingUnits = [['week', [1] ], ['month', [1, 2, 3, 4, 6]]],
				i = 0;
				for (i; i < size; i += 1) {
					var dates = date[i].split('-');
					var m = dates[1];
					m = parseInt(m) - 1;
					m = m.toString();
					if (m.length == 1) {
						m = "0" + m;
					}
					var dateUTC = Date.UTC(dates[0], m, dates[2]);
					ohlc.push([
						dateUTC,
						open[i],
						high[i],
						low[i],
						close[i]
					]);
					console.log(ohlc[i]);
				  }
				  Highcharts.stockChart('container', {
					rangeSelector: {
						selected: 1
					},
					title: {
						text: company_name
					},
					yAxis: [{
						labels: {
							align: 'right',
							x: -3
						},
						title: {
							text: 'OHLC'
						},
						height: '60%',
						lineWidth: 2
					}
				],
					
					series: [{
						type: 'candlestick',
						name: company_name,
						data: ohlc,
						dataGrouping: {
							units: groupingUnits
						}
					}]
				});
			}
		}
	});
});
