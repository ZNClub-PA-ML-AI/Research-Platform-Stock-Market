


import sys
import pandas as pd
import platform


if platform.system()=='Windows':
    company_id,type='AX','qs'
else:
    company_id=sys.argv[1],sys.argv[2]

filenames=['../../data/'+company_id+'_'+type+'.csv']
df=pd.read_csv(filenames[0])
#df = df.set_index(['date'])
df = df.sort_values(['Date'],ascending=[1])
print(df.head(1))
#print(filename[:-3])
df.to_json('../../../view/js/data/'+company_id+'_'+type+'.json')






