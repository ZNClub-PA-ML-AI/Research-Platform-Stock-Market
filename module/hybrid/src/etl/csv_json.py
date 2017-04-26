



import pandas as pd


#sentiment or NSE

path_in='../../data/'
#path_in='../../'
path_out='../../../../view/data/json/hybrid/'
#path_out=path_in


filenames=[path_in+'hybrid.csv']

df=pd.read_csv(filenames[0])

print(df.head(1))

df.to_json(path_out+company_id+'_'+type_id+'.json')






