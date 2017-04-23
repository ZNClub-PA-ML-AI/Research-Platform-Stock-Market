


import sys
import pandas as pd
import platform


if platform.system()=='Windows':
    company_id,type_id='AX','NSE'
else:
    company_id,type_id=sys.argv[1],sys.argv[2]

filenames=[]
if type_id=='NSE':
    filenames=['../../data/'+type_id+'-'+company_id+'.csv']
else:
    filenames=['../../data/'+company_id+'_'+type_id+'.csv']
df=pd.read_csv(filenames[0])

#df = df.set_index(['date'])
if type_id=='NSE':
    df = df.sort_values(['Date'],ascending=[1])
    
print(df.head(1))
#print(filename[:-3])
if type_id=='NSE':
    df.to_json('../../../'+type_id+'-'+company_id+'.json')
else:
    df.to_json('../../../'+company_id+'_'+type_id+'.json')






