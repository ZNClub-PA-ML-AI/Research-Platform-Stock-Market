import pandas as pd
import copy
import sys

#read file

filenames=['/var/www/html/Research-Platform-Stock-Market/module/twitter/data/'+sys.argv[1] ,'/var/www/html/Research-Platform-Stock-Market/module/twitter/data/'+sys.argv[2]]   #Reliance_score.csv, NSE-RELIANCE.csv

df1=pd.read_csv(filenames[0])
df2=pd.read_csv(filenames[1])

# create sets of ids

id_df1=set(df1['date'].tolist())
print((id_df1))

id_df2=set(df2['Date'].tolist())
print((id_df2))

ids=id_df1.intersection(id_df2)
#print(len(ids))

# copy of ids for 2nd for loop
cp_ids = copy.deepcopy(ids)

not_present=id_df1-id_df2
#print((not_present))       

# create new df1 with unique rows
df3=pd.DataFrame()
c=0
for i1,r1 in df1.iterrows():
    if r1.date in ids:
        temp=pd.DataFrame({'date':[r1.date],'open_score':[r1.open_score],'close_score':[r1.close_score]})
        df3=pd.concat([df3,temp])
        c=c+1
        ids.remove(r1.date)

df4=pd.DataFrame()
c=0
for i1,r1 in df2.iterrows():
    #print(r1)
    temp=pd.DataFrame({'Date':[r1.Date],'Open':[r1.Open],'Close':[r1.Close], 'High':[r1.High], 'Low':[r1.Low]})
    df4=pd.concat([df4,temp])
    c=c+1


#print(df3)
#print(df4)


#merging
print(df3)
df3.set_index('date')
df4.set_index('Date')
#df3.to_csv('tp.csv', sep=',', encoding='utf-8')
result=pd.DataFrame()
#print(len(df3['Date'].tolist()),len(df2['Date'].tolist()))
result = pd.concat([df3, df4], axis=1,join='inner')
result = result.reset_index('date')
print(result)
result.to_csv('/var/www/html/Research-Platform-Stock-Market/module/twitter/data/merged_with_NSE_data.csv', sep=',', encoding='utf-8')
result.to_json('/var/www/html/Research-Platform-Stock-Market/view/data/json/twitter/merged_with_NSE_data.json')

#finding correlation
print("Open price correlation:", result['Open'].corr(result['open_score']))
print("Close price correlation:", result['Close'].corr(result['close_score']))

