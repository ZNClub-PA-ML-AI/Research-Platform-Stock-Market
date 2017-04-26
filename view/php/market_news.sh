
#config
export PATH="/home/melwyn95/anaconda3/bin:$PATH"
#echo $PATH
#alias python="/home/melwyn95/anaconda3/bin/python"
alias python="/root/anaconda3/bin/python"

#run python scripts for market-news module 

#take company_id as input 
company_id=$1 

#cd to etl dir 
cd ../../module/market-news/src/etl 

#run python modules 

echo "module 1" 
python keyword_extraction_v3.py $company_id 

echo "module 2" 
python pre_prediction.py $company_id open

python pre_prediction.py $company_id close


echo "module 3"
python merge_sentiment.py $company_id

echo "module 4"
python merge_quandl.py $company_id


echo "module 5"
python csv_json.py $company_id NSE
python csv_json.py $company_id qs
python csv_json.py $company_id sentiment

echo "exec model" 
cd ../model 

python linear_model.py $company_id 

 #end of file 



