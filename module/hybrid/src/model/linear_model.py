
import numpy as np
from sklearn import preprocessing, cross_validation
from sklearn.linear_model import LinearRegression
import pandas as pd
import copy
import platform
import sys
import json

if platform.system()=='Windows':
    company_id='REL'
else:
    company_id=sys.argv[1]

#read file
df1=pd.read_csv('../../data/'+company_id+'_qt.csv')
df2=pd.read_csv('../../data/'+company_id+'_sentiment.csv')

#slice df
df1 = df1[['Date','Open',  'High',  'Low',  'Close', 'open_score', 'close_score']]
df2 = df2[['date','open_score','close_score']]


#rename columns to remove ambiguity
df1.columns=['Date','Open',  'High',  'Low',  'Close','twi_open','twi_close']
df2.columns=['date','news_open','news_close',]

#set index for inner join
df1=df1.set_index('Date')
df2=df2.set_index('date')

#print(df1.tail())
#print(df1.columns)
#print(df2.columns)

#print(df1.shape)
#print(df2.shape)

df=pd.concat([df1,df2],axis='0',join='inner')
#print(df.shape)
#print(df.columns)

forecast_col = ['Open',  'High',  'Low',  'Close']
df.fillna(value=-99999, inplace=True)



# forecast_out basically the days ka gap u want to set
forecast_out = 1

df['ForecastOpen'] = df[forecast_col[0]].shift(-forecast_out)
#df['ForecastHigh'] = df[forecast_col[1]].shift(-forecast_out)
#df['ForecastLow'] = df[forecast_col[2]].shift(-forecast_out)
df['ForecastClose'] = df[forecast_col[3]].shift(-forecast_out)

# temporary copy
data=copy.deepcopy(df)

#hybrid close price
df=copy.deepcopy(data)
X = np.array(df.drop(['ForecastOpen', 'ForecastClose'], 1))
X = X[:-forecast_out]
df.dropna(inplace=True)

y = np.array(df[['ForecastOpen']])
X_train, X_test, y_train, y_test = cross_validation.train_test_split(X, y, test_size=0.2)

clf = LinearRegression(n_jobs=-1)
clf.fit(X_train, y_train)
confidence = clf.score(X_test, y_test)
print ('Hybrid Method Accuracy for Open price: ', confidence*100)

#hybrid close price
df=copy.deepcopy(data)
X = np.array(df.drop(['ForecastOpen', 'ForecastClose'], 1))
X = X[:-forecast_out]
df.dropna(inplace=True)

y = np.array(df[['ForecastClose']])
X_train, X_test, y_train, y_test = cross_validation.train_test_split(X, y, test_size=0.2)

clf = LinearRegression(n_jobs=-1)
clf.fit(X_train, y_train)
confidence = clf.score(X_test, y_test)
print ('Hybrid Method Accuracy for Close price: ', confidence*100)



# code to predict output for chart
# referred from traditional.py 

# need help regarding date

new_df = pd.DataFrame()
prev = []
for i, row in df.iterrows():
#    print (i)
    #print (i, row, prev)
    if i == 0:
        prev = [row.Open, row.High, row.Low, row.Close, row['Total Trade Quantity']]
        temp_df = pd.DataFrame({
                            'Date': [row.Date],
                            'Open': [row.Open],
                            'High': [row.High],
                            'Low': [row.Low],
                            'Close': [row.Close],
			    'TotalTradeQuantity': row['Total Trade Quantity'],
                            'open_predicted': [row.Open]})
        new_df = pd.concat([new_df, temp_df])
        continue
    #to_predict = [row.Open, row.High, row.Low, row.Close]
    temp_df = pd.DataFrame({
			    'Date': [row.Date],
			    'Open': [row.Open], 
                            'High': [row.High], 
                            'Low': [row.Low],
                            'Close': [row.Close],
			    'TotalTradeQuantity': row['Total Trade Quantity'],
                            'open_predicted': [openModel.predict([prev])[0][0]]})#, 
#                            'close_predicted': [closeModel.predict([to_predict])[0][0]]                                                
#                            })
    new_df = pd.concat([new_df, temp_df])
    prev = [row.Open, row.High, row.Low, row.Close, row['Total Trade Quantity']]
#new_df.to_csv('traditional.csv', sep=',', encoding='utf-8')

#print (new_df.head(5))

new_df = new_df.reset_index()

#print (new_df.head(5))

#file_name = file_name.split('.')
#file_name = file_name[0].split('/')
#file_name = file_name[len(file_name)-1]

#print (file_name)
#df = pd.read_csv('traditional.csv')

#df = df.sort_values(['Date'],ascending=[1])
#df.sort_values(by='Date')

#df.to_json('/var/www/html/Research-Platform-Stock-Market/view/json/'+file_name+'.json')
#print (json.dumps(new_df.to_json()))
#os.remove('traditional.csv')

#new_df =  new_df.sort_values(['Date'],ascending=[True])

#print (new_df.to_json())
json_object = new_df.to_json()
json_object = json.loads(json_object)
json_object['accuracy'] = confidence*100
print (json.dumps(json_object))



