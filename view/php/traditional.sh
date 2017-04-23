export PATH="/home/melwyn95/anaconda3/bin:$PATH"
#echo $PATH
python /var/www/html/Research-Platform-Stock-Market/module/traditional/src/traditional.py "${1}.csv"
python /var/www/html/Research-Platform-Stock-Market/module/traditional/src/load_json.py "${1}.json"
