#!/home/melwyn95/anaconda3/bin/python

# -*- coding: utf-8 -*-
"""
Created on Mon Apr 10 04:15:27 2017

@author: Melwyn
"""
import json
import os
import numpy as np
from sklearn import preprocessing, cross_validation
from sklearn.linear_model import LinearRegression
import pandas as pd
import sys
import quandl
import pickle

#file_name = '/var/www/html/Research-Platform-Stock-Market/module/traditional/data/'+sys.argv[1]
#df=pd.read_csv(file_name)

df = quandl.get(sys.argv[1], authtoken="-zLmnBx6NmesMSEA_2MU", start_date=sys.argv[2], end_date=sys.argv[3])
df.to_csv('a.csv')
df = pd.read_csv('a.csv')
os.remove('a.csv')



df = df[['Date', 'Open',  'High',  'Low',  'Close', 'Total Trade Quantity']]

df.fillna(value=-99999, inplace=True)

#print (df.head(10))
#print (df.tail(10))

forecast_out = 1

df['ForecastOpen'] = df['Open'].shift(-forecast_out)
df['ForecastClose'] = df['Close'].shift(-forecast_out)



X = np.array(df.drop(['Date', 'ForecastOpen', 'ForecastClose'], 1))

#print(X[0], X.shape)
X = X[:-forecast_out]
#print(X[0], X.shape)
df.dropna(inplace=True)


y = np.array(df[['ForecastOpen']]) 
#print (y[0])
X_train, X_test, y_train, y_test = cross_validation.train_test_split(X, y, test_size=0.2)


openModel = LinearRegression(n_jobs=-1)
openModel.fit(X_train, y_train)
confidence = openModel.score(X_test, y_test)


pickle.dump(openModel, open('open_model.p', 'wb'))

#print("Accuracy Open TRADITIONAL: ", confidence * 100.0)

#y = np.array(df[['ForecastClose']])
#X_train, X_test, y_train, y_test = cross_validation.train_test_split(X, y, test_size=0.2)

#closeModel = LinearRegression(n_jobs=-1)
#closeModel.fit(X_train, y_train)
#confidence = closeModel.score(X_test, y_test)
#print ('Accuracy Close TRADITIONAL: ', confidence*100)

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


new_df = new_df.reset_index()

json_object = new_df.to_json()
json_object = json.loads(json_object)
json_object['accuracy'] = confidence*100
print (json.dumps(json_object))
