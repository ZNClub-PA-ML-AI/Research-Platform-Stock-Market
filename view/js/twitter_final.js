labeledSpline();
dualOpenCharts();
dualCloseCharts();

function labeledSpline(){

	$.getJSON('/Research-Platform-Stock-Market/view/data/json/twitter/Reliance_score.json', function(data) {

	  //var close_map = data.close_score;
	  var size = Object.keys(data.date).length;
	  var close = [];
	  var open = [];

	  for (var i = 0; i < size; i += 1) {
	    console.log(data.date[i]);
	    console.log(data.open_score[i]);
	    console.log(data.close_score[i]);

	    //split date ie key
	    var dates = data.date[i].split('/');
	    //adjust month
	    var m = dates[0];
	    m = parseInt(m) - 1;
	    m = m.toString()
	    if (m.length == 1) {
	      m = "0" + m;
	    }
	    var dateUTC = Date.UTC(dates[2], m, dates[1]);

	    open.push([dateUTC, data.open_score[i]]);
	    close.push([dateUTC, data.close_score[i]]);
		  console.log(dateUTC)
	  }

	  Highcharts.chart('container2', {
	    chart: {
	      type: 'spline',
	      zoomType: 'xy'
	    },
	    title: {
	      text: 'Twitter Sentiment Graph'
	    },
	    subtitle: {
	      text: 'Sentiment-analysis-using-Tweets'
	    },
	    xAxis: {
	      type: 'datetime',
	      dateTimeLabelFormats: { // don't display the dummy year
	        day: '%e. %b',
	        month: '%b \'%y',
	        year: '%Y'
	      },
	      title: {
	        text: 'Time'
	      }
	    },
	    yAxis: {
	      title: {
	        text: 'Sentiment Score'
	      },
	      min: -0.30,
	      gridLineWidth: 0,
	      alternateGridColor: null,
	      plotBands: [{
	          from: 0.05,
	          to: -0.05,
	          color: 'rgba(0, 0, 0, 0)',
	          label: {
	            text: 'NEUTRAL',
	            style: {
	              color: '#606060'
	            }
	          }
	        }, {
	          from: 0.05,
	          to: 0.2,
	          color: 'rgba(100, 255, 100, 0.2)',
	          label: {
	            text: 'POSITIVE',
	            style: {
	              color: '#0FFF0F'
	            }
	          }
	        }, { // Light air
	          from: 0.2,
	          to: 0.4,
	          color: 'rgba(100, 255, 100, 0.4)',
	          label: {
	            text: 'HIGHLY POSITIVE',
	            style: {
	              color: '#00F000'
	            }
	          }
	        }, {
	          from: -0.05,
	          to: -0.2,
	          color: 'rgba(255, 100, 100, 0.2)',
	          label: {
	            text: 'NEGATIVE',
	            style: {
	              color: '#FF0F0F'
	            }
	          }
	        },{
	          from: -0.2,
	          to: -0.4,
	          color: 'rgba(255, 100, 100, 0.5)',
	          label: {
	            text: 'HIGHLY NEGATIVE',
	            style: {
	              color: '#FF0000'
	            }
	          }
	        }
	      ]
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
	      name: 'RELIANCE OP sentiment',
	      data: open
	    }, {
	      name: 'RELIANCE CP sentiment',
	      data: close
	    }]
	  });
});

}


function dualOpenCharts(){

$.getJSON('/Research-Platform-Stock-Market/view/data/json/twitter/merged_with_NSE_data.json',
  function(data) {
    //console.log(data['Unnamed: 0'][1]);

    var price = [];
    var sentiment = [];
    var size = Object.keys(data.Open).length;
    console.log(size);

    for (var i = 0; i < size; i += 1) {
    console.log(data.date[i]);
      //var temp = data.date[i];
      //console.log(temp);

      //split date ie key
    var dates = data.date[i].split('/');
    //adjust month
    var m = dates[0];
    m = parseInt(m) - 1;
    m = m.toString()
    if (m.length == 1) {
      m = "0" + m;
    }
    var dateUTC = Date.UTC(dates[2], m, dates[1]);

      price.push([dateUTC, data.Open[i]]);
      //price.push([dateUTC, data.Close[i]]);
      sentiment.push([dateUTC, data.open_score[i]]);
      //sentiment.push([dateUTC, data.close_score[i]]);
      console.log(dateUTC);
      //console.log(price[i]);
    }




    Highcharts.chart('container3', {
      chart: {
        zoomType: 'x'
      },
      title: {
        text: 'Open Price and Twitter sentiment'
        //text: 'Close Price and Twitter sentiment'
      },
      subtitle: {
        text: 'Sentiment-analysis-using-Twitter'
      },
      xAxis: [{
        type: 'datetime',
        //categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        crosshair: true
      }],
      yAxis: [{ // Primary yAxis
        labels: {
          format: '{value} Rs',
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        },
        title: {
          text: 'Stock Open Price',
          //text: 'Stock Close Price',
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        }
      }, { // Secondary yAxis
        title: {
          text: 'Sentiment Score',
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        },
        labels: {
          format: '{value}',
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        },
        opposite: true
      }],
      tooltip: {
        shared: true
      },
      legend: {
        layout: 'vertical',
        align: 'left',
        x: 70,
        y: 12,
        verticalAlign: 'top',

        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
      },
      series: [{
        name: 'Sentiment',
        type: 'spline',
        yAxis: 1,
        data: sentiment
          /*    [
                [Date.UTC(2017, 02, 22), -0.49],
                [Date.UTC(2017, 02, 23), 0.02],
                [Date.UTC(2017, 02, 28), -0.20]

              ]*/
          ,
        tooltip: {
          valueSuffix: ' '
        }

      }, {
        name: 'Open Price',
        //name: 'Close Price',
        type: 'spline',
        data: price
          /*    [
                [Date.UTC(2017, 02, 22), 1149.9],
                [Date.UTC(2017, 02, 23), 1171.5],
                [Date.UTC(2017, 02, 28), 1100.4]
              ]*/
          ,
        tooltip: {
          valueSuffix: 'Rs'
        }
      }]
    });



  });
}


function dualCloseCharts(){

$.getJSON('/Research-Platform-Stock-Market/view/data/json/twitter/merged_with_NSE_data.json',
  function(data) {
    //console.log(data['Unnamed: 0'][1]);

    var price = [];
    var sentiment = [];
    var size = Object.keys(data.Open).length;
    console.log(size);

    for (var i = 0; i < size; i += 1) {
    console.log(data.date[i]);
      //var temp = data.date[i];
      //console.log(temp);

      //split date ie key
    var dates = data.date[i].split('/');
    //adjust month
    var m = dates[0];
    m = parseInt(m) - 1;
    m = m.toString()
    if (m.length == 1) {
      m = "0" + m;
    }
    var dateUTC = Date.UTC(dates[2], m, dates[1]);

      //price.push([dateUTC, data.Open[i]]);
      price.push([dateUTC, data.Close[i]]);
      //sentiment.push([dateUTC, data.open_score[i]]);
      sentiment.push([dateUTC, data.close_score[i]]);
      console.log(dateUTC);
      //console.log(price[i]);
    }




    Highcharts.chart('container4', {
      chart: {
        zoomType: 'x'
      },
      title: {
        //text: 'Open Price and Twitter sentiment'
        text: 'Close Price and Twitter sentiment'
      },
      subtitle: {
        text: 'Sentiment-analysis-using-Twitter'
      },
      xAxis: [{
        type: 'datetime',
        //categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        crosshair: true
      }],
      yAxis: [{ // Primary yAxis
        labels: {
          format: '{value} Rs',
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        },
        title: {
          //text: 'Stock Open Price',
          text: 'Stock Close Price',
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        }
      }, { // Secondary yAxis
        title: {
          text: 'Sentiment Score',
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        },
        labels: {
          format: '{value}',
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        },
        opposite: true
      }],
      tooltip: {
        shared: true
      },
      legend: {
        layout: 'vertical',
        align: 'left',
        x: 70,
        y: 12,
        verticalAlign: 'top',

        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
      },
      series: [{
        name: 'Sentiment',
        type: 'spline',
        yAxis: 1,
        data: sentiment
          /*    [
                [Date.UTC(2017, 02, 22), -0.49],
                [Date.UTC(2017, 02, 23), 0.02],
                [Date.UTC(2017, 02, 28), -0.20]

              ]*/
          ,
        tooltip: {
          valueSuffix: ' '
        }

      }, {
        //name: 'Open Price',
        name: 'Close Price',
        type: 'spline',
        data: price
          /*    [
                [Date.UTC(2017, 02, 22), 1149.9],
                [Date.UTC(2017, 02, 23), 1171.5],
                [Date.UTC(2017, 02, 28), 1100.4]
              ]*/
          ,
        tooltip: {
          valueSuffix: 'Rs'
        }
      }]
    });



  });

}