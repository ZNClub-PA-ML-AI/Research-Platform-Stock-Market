company_id='AX';

labeledSpline(company_id);
dualCharts(company_id);


function labeledSpline(company_id){
	// spline.js
//https://cdn.rawgit.com/ZNClub-PA-ML-AI/Sentiment-analysis-using-Business-News/95e16a9b/REL_score_open.json
//https://cdn.rawgit.com/ZNClub-PA-ML-AI/Sentiment-analysis-using-Business-News/4d982b42/data/json/REL_sentiment.json

$.getJSON('/Research-Platform-Stock-Market/view/js/data/'+company_id+'_sentiment.json', function(data) {

  //var close_map = data.close_score;
  var size = Object.keys(data.date).length;
  var close = [];
  var open = [];

  for (var i = 0; i < size; i += 1) {
    console.log(data.date[i]);
    console.log(data.open_score[i]);
    console.log(data.close_score[i]);

    //split date ie key
    var dates = data.date[i].split('-');
    //adjust month
    var m = dates[1];
    m = parseInt(m) - 1;
    m = m.toString()
    if (m.length == 1) {
      m = "0" + m;
    }
    var dateUTC = Date.UTC(dates[0], m, dates[2]);

    open.push([dateUTC, data.open_score[i]]);
    close.push([dateUTC, data.close_score[i]]);

  }

  Highcharts.chart('container2', {
    chart: {
      type: 'spline',
      zoomType: 'x'
    },
    title: {
      text: 'Market News Sentimental Graph'
    },
    subtitle: {
      text: 'Sentiment-analysis-using-Business-News'
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: { // don't display the dummy year
        month: '%e. %b',
        year: '%b'
      },
      title: {
        text: 'Months'
      }
    },
    yAxis: {
      title: {
        text: 'Sentimental Score'
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


function dualCharts(company_id){
// dual.js

//getJSON
//https://cdn.rawgit.com/ZNClub-PA-ML-AI/Sentiment-analysis-using-Business-News/54103f1e/data/json/REL_qs.json

$.getJSON('/Research-Platform-Stock-Market/view/js/data/'+company_id+'_qs.json',function(data) {
    //console.log(data['Unnamed: 0'][0]);

    var price = [];
    var sentiment = [];
    var size = Object.keys(data.Open).length;
    console.log(size);

    for (var i = 0; i < size; i += 1) {
      var temp = data['Unnamed: 0'][i];
      //split date ie key

      var dates = temp.split('-');
      //adjust month
      var m = dates[1];
      m = parseInt(m) - 1;
      m = m.toString()
      if (m.length == 1) {
        m = "0" + m;
      }
      var dateUTC = Date.UTC(dates[0], m, dates[2]);

      price.push([dateUTC, data.Open[i]]);
      sentiment.push([dateUTC, data.open_score[i]]);
      //console.log(i);
      //console.log(price[i]);
    }




    Highcharts.chart('container3', {
      chart: {
        zoomType: 'x'
      },
      title: {
        text: 'Open Price and Market sentiment'
      },
      subtitle: {
        text: 'Sentiment-analysis-using-Business-News'
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
          ,
        tooltip: {
          valueSuffix: ' '
        }

      }, {
        name: 'Open Price',
        type: 'spline',
        data: price        
          ,
        tooltip: {
          valueSuffix: 'Rs'
        }
      }]
    });

  });

}

/*
company_id='AX';

candlestick(company_id);
//predictionChart();

function candlestick(company_id){
	
//[1269820800000,33.29,33.41,33.09,33.20,135185785],

$.getJSON('/Research-Platform-Stock-Market/view/js/data/NSE-'+company_id+'.json', function(data) {
  var open = data['Open'];
  var high = data['High'];
  var low = data['Low'];
  var close = data['Close'];
  var size = Object.keys(close).length;
  var volume = data["Total Trade Quantity"];
  var turnover = data["Turnover (Lacs)"];
  var date = data["Date"];

  var ohlc = [];
  var vol = [];
  var turn = [];

  // set the allowed units for data grouping
  var groupingUnits = [
      [
        'week', // unit name
        [1] // allowed multiples
      ],
      [
        'month', [1, 2, 3, 4, 6]
      ]
    ],

    i = size-1;


  for (i; i >=0; i -= 1) {
    //format date to utc
    var dates = date[i].split('-');
    //adjust month
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

    vol.push([
      dateUTC,
      volume[i]
    ]);
    
    turn.push([
    	dateUTC,
      turnover[i]
    ]);
    //console.log(vol);
  }


  // create the chart
  Highcharts.stockChart('container1', {

    rangeSelector: {
      selected: 1
    },

    title: {
      text: 'NSE/REL Stock Price'
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
    }, {
      labels: {
        align: 'right',
        x: -3
      },
      title: {
        text: 'Volume'
      },
      top: '75%',
      height: '25%',
      offset: 0,
      lineWidth: 2
    }
],

    tooltip: {
      split: true
    },

    series: [{
      type: 'candlestick',
      name: 'RELIANCE',
      data: ohlc,
      dataGrouping: {
        units: groupingUnits
      }
    }, {
      type: 'spline',
      name: 'Volume',
      data: vol,
      yAxis: 1,
      dataGrouping: {
        units: groupingUnits
      }
    }]
  });
});

}
*/
/*
function predictionChart(){

$.getJSON('/Research-Platform-Stock-Market/view/js/data/traditional.json', function(data) {

  var size = Object.keys(data.date).length;
  var close = [];
  var open = [];

  for (var i = 0; i < size; i += 1) {
    console.log(data.date[i]);
    var dates = data.date[i].split('-');
    //adjust month
    var m = dates[1];
    m = parseInt(m) - 1;
    m = m.toString()
    if (m.length == 1) {
      m = "0" + m;
    }
    var dateUTC = Date.UTC(dates[0], m, dates[2]);

    open.push([dateUTC, data.Open[i]]);
    close.push([dateUTC, data.open_predicted[i]]);

  }

  Highcharts.chart('container1', {
    chart: {
      type: 'spline',
      zoomType: 'xy'
    },
    title: {
      text: 'Open Price - Predicted Open Price TRADITIONAL'
    },
    subtitle: {
      text: ''
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: { // don't display the dummy year
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
      min: -0.30,
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
      data: close
    }]
  });
});
}
*/