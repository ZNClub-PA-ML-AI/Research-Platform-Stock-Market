var company_id='';

/*
$('#select-company').click(function () {
	company_id=$('#company-dropdown option:selected').text();
	if(company_id=='None'){
		alert('Select a Company from the given options');
	}
	else{
		alert(company_id+' is Selected');
		labeledSpline(company_id);
		dualChartsOpenScore(company_id);
		dualChartsCloseScore(company_id);
			
	}
	
}
*/




function labeledSpline(company_id){
	// spline.js
//https://cdn.rawgit.com/ZNClub-PA-ML-AI/Sentiment-analysis-using-Business-News/95e16a9b/REL_score_open.json
//https://cdn.rawgit.com/ZNClub-PA-ML-AI/Sentiment-analysis-using-Business-News/4d982b42/data/json/REL_sentiment.json

$.getJSON('/Research-Platform-Stock-Market/view/data/json/market-news/'+company_id+'_sentiment.json', function(data) {

  //var close_map = data.close_score;
  var size = Object.keys(data.date).length;
  var close = [];
  var open = [];

  for (var i = 0; i < size; i += 1) {
    //console.log(data.date[i]);
    //console.log(data.open_score[i]);
    //console.log(data.close_score[i]);

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
      text: 'Market News Sentimental Graph for NSE/'+company_id
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
      min: -1.2,
      gridLineWidth: 0,
      alternateGridColor: null,
      plotBands: [{ 
          from: 0.1,
          to: -0.1,
          color: 'rgba(0, 0, 0, 0)',
          label: {
            text: 'NEUTRAL',
            style: {
              color: '#606060'
            }
          }
        }, { 
          from: 0.1,
          to: 0.5,
          color: 'rgba(100, 255, 100, 0.2)',
          label: {
            text: 'POSITIVE',
            style: {
              color: '#0FFF0F'
            }
          }
        }, { // Light air
          from: 0.5,
          to: 1.0,
          color: 'rgba(100, 255, 100, 0.4)',
          label: {
            text: 'HIGHLY POSITIVE',
            style: {
              color: '#00F000'
            }
          }
        }, { 
          from: -0.1,
          to: -0.5,
          color: 'rgba(255, 100, 100, 0.2)',
          label: {
            text: 'NEGATIVE',
            style: {
              color: '#FF0F0F'
            }
          }
        },{
          from: -0.5,
          to: -1.0,
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
      name: 'OpenPrice sentiment',
      data: open,
	  
      color: '#00FAA2'
      
    }, {
      name: 'ClosePrice sentiment',
      data: close,
	 
		color: '#FFE16B'
     
    }]
  });
});

}


function dualChartsOpenScore(company_id){
// dual.js

//getJSON
//https://cdn.rawgit.com/ZNClub-PA-ML-AI/Sentiment-analysis-using-Business-News/54103f1e/data/json/REL_qs.json

$.getJSON('/Research-Platform-Stock-Market/view/data/json/market-news/'+company_id+'_qs.json',function(data) {
    //console.log(data['Unnamed: 0'][0]);

    var price_open = [];
    var sentiment_open = [];
	//var price_close = [];
    //var sentiment_close = [];
	
    var size = Object.keys(data.Open).length;
    //console.log(size);

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

      price_open.push([dateUTC, data.Open[i]]);
      sentiment_open.push([dateUTC, data.open_score[i]]);
	  //price_close.push([dateUTC, data.Close[i]]);
      //sentiment_close.push([dateUTC, data.close_score[i]]);
      
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
          text: 'Stock Price',
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
        name: 'Open Price Sentiment',
        type: 'spline',
        yAxis: 1,
        data: sentiment_open  ,
		color: '#00FAA2'		
          ,
        tooltip: {
          valueSuffix: ' '
        }

      }, {
        name: 'Open Price',
        type: 'spline',
        data: price_open  ,
		color: '#00B7FF'
          ,
        tooltip: {
          valueSuffix: 'Rs'
        }
      }
	  ]
    });

  });

}

function dualChartsCloseScore(company_id){
// dual.js

//getJSON
//https://cdn.rawgit.com/ZNClub-PA-ML-AI/Sentiment-analysis-using-Business-News/54103f1e/data/json/REL_qs.json

$.getJSON('/Research-Platform-Stock-Market/view/data/json/market-news/'+company_id+'_qs.json',function(data) {
    //console.log(data['Unnamed: 0'][0]);

    //var price_open = [];
    //var sentiment_open = [];
	var price_close = [];
    var sentiment_close = [];
	
    var size = Object.keys(data.Open).length;
    //console.log(size);

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

      //price_open.push([dateUTC, data.Open[i]]);
      //sentiment_open.push([dateUTC, data.open_score[i]]);
	  price_close.push([dateUTC, data.Close[i]]);
      sentiment_close.push([dateUTC, data.close_score[i]]);
      
	  //console.log(i);
      //console.log(price[i]);
    }




    Highcharts.chart('container4', {
      chart: {
        zoomType: 'x'
      },
      title: {
        text: 'Close Price and Market sentiment'
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
          text: 'Stock Price',
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
        name: 'Close Price Sentiment',
        type: 'spline',
        yAxis: 1,
        data: sentiment_close         
          ,color: '#FFE16B',
        tooltip: {
          valueSuffix: ' '
        }

      },{
        name: 'Close Price',
        type: 'spline',        
        data: price_close         
          ,color: '#00B7FF',
        tooltip: {
          valueSuffix: 'Rs'
        }

      }
	  ]
    });

  });

}
