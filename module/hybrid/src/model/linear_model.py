
import numpy as np
from sklearn import preprocessing, cross_validation
from sklearn.linear_model import LinearRegression
import pandas as pd
import copy
import platform
import sys

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

