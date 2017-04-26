
#config
#export PATH="/home/melwyn95/anaconda3/bin:$PATH"
#echo $PATH
#alias python="/home/melwyn95/anaconda3/bin/python"
#alias python="/root/anaconda3/bin/python"

#run python scripts for market-news module 

#take company_id as input 
company_id=$1 

#cd to etl dir 
#cd ../../module/market-news/src/etl 

#run python modules 

echo "module 1" 
python /var/www/html/Research-Platform-Stock-Market/module/market-news/src/etl/keyword_extraction_v3.py $company_id 

echo "module 2" 
python /var/www/html/Research-Platform-Stock-Market/module/market-news/src/etl/pre_prediction.py $company_id open

python /var/www/html/Research-Platform-Stock-Market/module/market-news/src/etl/pre_prediction.py $company_id close


echo "module 3"
python /var/www/html/Research-Platform-Stock-Market/module/market-news/src/etl/merge_sentiment.py $company_id

echo "module 4"
python /var/www/html/Research-Platform-Stock-Market/module/market-news/src/etl/merge_quandl.py $company_id


echo "module 5"
python /var/www/html/Research-Platform-Stock-Market/module/market-news/src/etl/csv_json.py $company_id NSE
python /var/www/html/Research-Platform-Stock-Market/module/market-news/src/etl/csv_json.py $company_id qs
python /var/www/html/Research-Platform-Stock-Market/module/market-news/src/etl/csv_json.py $company_id sentiment

echo "exec model" 
#cd ../model 

python /var/www/html/Research-Platform-Stock-Market/module/market-news/src/model/linear_model.py $company_id 

 #end of file 



