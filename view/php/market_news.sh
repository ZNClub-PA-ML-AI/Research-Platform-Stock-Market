
#run python scripts for market-news module

cd to etl dir
cd ../../module/market-news/src/etl

#run python modules
echo "module 1"
python keyword_extraction_v3.py $company_id

echo "module 2"
#python preprediction.py $company_id
 


#take company_id as input
##company_id=$1


echo "exec model"
cd ../model

python linear_model.py $company_id

#python test_sh.py $company_id

#end of file





