$.getJSON('https://rawgit.com/ZNClub-PA-ML-AI/Research-Platform-Stock-Market/master/view/data/json/twitter/merged_with_NSE_data.json',
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




    Highcharts.chart('container', {
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
