
## Workflow 
- livemint_spider.py >>
_data.csv,_data_body.csv 

- _data.csv,_data_body.csv + idgen.py >> data_o1.csv,data_o2.csv

- data_o2.csv + preprocessor.py >> data_o3.csv 

- data_o1.csv, data_o3.csv + merge.py >> data_joined_2.csv 

- data_joined_2.csv + normalizer.py >> normalized.csv
- normalized.csv + sentiment.py >> labeled.csv
- labeled.csv + keyword_extraction_v3.py >> REL.csv
- REL.csv + pre_prediction.py >> REL_score_open.csv, REL_score_close.csv
- REL_score_open.csv, REL_score_close.csv + merge_sentiments.py >> REL_sentiment.csv
- REL_sentiment.csv,NSE-REL.csv + merge_quandl.py >> REL_qs.csv

