import datetime
import pandas as pd

df = pd.read_csv('/var/www/html/Research-Platform-Stock-Market/module/twitter/data/merged_with_NSE_data.csv')
#print(df['Date'])

#df['date'] = df['date'].dt.strftime('%Y-%m-%d')
df['date'] = pd.to_datetime(df['date']).dt.strftime('%Y-%#m-%#d')
df['Date'] = pd.to_datetime(df['Date']).dt.strftime('%Y-%#m-%#d')


df.to_csv('/var/www/html/Research-Platform-Stock-Market/module/twitter/data/final_dataset_twitter.csv', sep=',', encoding='utf-8')
