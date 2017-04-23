
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