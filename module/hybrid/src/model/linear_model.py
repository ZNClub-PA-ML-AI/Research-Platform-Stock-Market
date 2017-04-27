
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

#hybrid open price
df=copy.deepcopy(data)
X = np.array(df.drop(['ForecastOpen', 'ForecastClose'], 1))
X = X[:-forecast_out]
df.dropna(inplace=True)

y = np.array(df[['ForecastOpen']])
X_train, X_test, y_train, y_test = cross_validation.train_test_split(X, y, test_size=0.2)

openModel = LinearRegression(n_jobs=-1)
openModel.fit(X_train, y_train)
confidence = openModel.score(X_test, y_test)
open_accuracy = confidence
#print ('Hybrid Method Accuracy for Open price: ', confidence*100)

#hybrid close price
df=copy.deepcopy(data)
#print(df.columns)
X = np.array(df.drop(['ForecastOpen', 'ForecastClose'], 1))
X = X[:-forecast_out]
df.dropna(inplace=True)

y = np.array(df[['ForecastClose']])
X_train, X_test, y_train, y_test = cross_validation.train_test_split(X, y, test_size=0.2)

closeModel = LinearRegression(n_jobs=-1)
closeModel.fit(X_train, y_train)
confidence = closeModel.score(X_test, y_test)
#print ('Hybrid Method Accuracy for Close price: ', confidence*100)
close_accuracy = confidence


# code to predict output for chart

hybrid = pd.DataFrame()
prev = []

for i, row in df.iterrows():    
    if str(i) == '2017-03-15':
        
        prev = [row['Open'], row['High'], row['Low'], row['Close'], row['twi_open'], row['twi_close'], row['news_open'], row['news_close']]
        
        temp_df = pd.DataFrame({
                            'Date': [str(i)],
                            'Open': [row.Open],                                                        
                            'Close': [row.Close],
                            'open_predicted': [row.Open],
                            'close_predicted': [row.Close]})
        
        hybrid = pd.concat([hybrid, temp_df])
        continue
    
    #to_predict = [row.Open, row.High, row.Low, row.Close]
    temp_df = pd.DataFrame({'Date': [str(i)],'Open': [row.Open], 'Close': [row.Close],
			    'open_predicted': [float(openModel.predict([prev])[0][0])],
                     'close_predicted': [float(closeModel.predict([prev])[0][0])]})
    hybrid = pd.concat([hybrid, temp_df])
    prev = [row['Open'], row['High'], row['Low'], row['Close'], row['twi_open'], row['twi_close'], row['news_open'], row['news_close']]

#hybrid.to_csv('../../data/hybrid.csv', sep=',', encoding='utf-8')
#hybrid.to_csv('../../../../view/data/json/hybrid/hybrid.json', sep=',', encoding='utf-8')
hybrid = hybrid.reset_index()
json_object = hybrid.to_json()
json_object = json.loads(json_object)
json_object['open_accuracy'] = open_accuracy
json_object['close_accuracy'] = close_accuracy
print (json.dumps(json_object))
