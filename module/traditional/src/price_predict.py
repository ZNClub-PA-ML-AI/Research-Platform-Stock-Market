import pickle
import json
import numpy as np
from sklearn import preprocessing, cross_validation
from sklearn.linear_model import LinearRegression
import pandas as pd
import sys


openModel = pickle.load(open('open_model.p', 'rb'))
open = float(sys.argv[1])
high = float(sys.argv[2])
low = float(sys.argv[3])
close = float(sys.argv[4])
volume = float(sys.argv[5])

predicted_open_price = openModel.predict([[open, high, low, close, volume]])

d = {'predicted_open_price': predicted_open_price[0][0]}

print (json.dumps(d))

