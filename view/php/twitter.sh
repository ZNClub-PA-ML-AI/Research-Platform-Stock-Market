python /var/www/html/Research-Platform-Stock-Market/module/twitter/src/code3\ -\ average_sentiment.py "labeled.csv"
python /var/www/html/Research-Platform-Stock-Market/module/twitter/src/code4\ -\ merge_with_NSE\ &\ find\ correlation.py "Reliance_score.csv" "NSE-RELIANCE.csv"
python /var/www/html/Research-Platform-Stock-Market/module/twitter/src/code5\ -\ prediction.py "merged_with_NSE_data.csv"
