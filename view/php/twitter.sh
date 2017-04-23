python /var/www/html/Research-Platform-Stock-Market/module/twitter/src/code3 - average_sentiment.py "${1}.csv"
python /var/www/html/Research-Platform-Stock-Market/module/twitter/src/code4 - merge_with_NSE & find correlation.py "${1}.csv" "${2}.csv"
python /var/www/html/Research-Platform-Stock-Market/module/twitter/src/code5 - prediction.py "${1}.csv"