import datetime
import pandas as pd
import collections
import math

filenames = '/var/www/html/Research-Platform-Stock-Market/module/twitter/data/'+sys.argv[1]     #'labeled.csv'
df = pd.read_csv(filenames)

df = df[pd.notnull(df['date'])]         #to remove date = nan values

date_list = df.date.tolist()
dates=set(date_list)
#print(len(dates))

result=pd.DataFrame()
cnt = collections.Counter(date_list)
print(cnt)

od = collections.OrderedDict(sorted(cnt.items()))
od_close = collections.OrderedDict(sorted(cnt.items()))
#print(od)      #prints dates and no of rows for each date

open_score = dict()
close_score = dict()
for k,v in od.items():
    print(k,v)
    open_score[k]=0
    close_score[k]=0
    od_close[k] = 0

next_date=[]


for i,r in df.iterrows():
    date=str(r.date)
    
    date1 = datetime.datetime.strptime(str(r.date),"%m/%d/%Y") #.strftime("%Y-%m-%d")
    delta = datetime.timedelta(days = 1)
    prev_date = date1-delta
    
    time=datetime.datetime.strptime(str(r.time),'%H:%M')
    time_open=datetime.datetime.strptime('09:00','%H:%M')
    time_close=datetime.datetime.strptime('16:00','%H:%M')
    
    #before open time
    #opening price of current day
    if time<=time_open:
        #continue
        if len(next_date)>0:
            open_score[date] += sum(next_date)
            #open_score[date] += float(r.sentiment)
            od[date] += len(next_date)
            od[prev_date.strftime("%#m/%#d/%Y")] -= len(next_date) #.lstrip("0%d/").replace(" 0", " ")
            next_date = []
        
        open_score[date] += float(r.sentiment)
            
    #after close time
    #opening price of next day
    elif time>time_close:
        next_date.append(float(r.sentiment))
        
    #closing price of current day (9am - 4pm slot)
    else:
        od[date] -= 1
        od_close[date] += 1
        close_score[date] += float(r.sentiment)
        continue


#print(od_close)   
#calculating average
for k,v in od.items():    
    print(k,v)
    open_score[k] = open_score[k]/v
    if od_close[k] != 0:
        close_score[k] = close_score[k]/od_close[k]
    #print(k,open_score[k])
    #print(k,close_score[k])
#print(len(score))
#print(score)

##df=pd.DataFrame(open_score,close_score)
##df=df.transpose()
result = pd.DataFrame()
c = 0
for k,v in od.items():
    temp=pd.DataFrame({'open_score':[open_score[k]],'close_score':[close_score[k]],'date':[k]}) #'index':[c],
    #c += 1
    result = pd.concat([result,temp])

result = result.reset_index('date')

result['date'] =pd.to_datetime(result.date)         #to sort dates in ascending order
result = result.sort_values(by='date')
result['date'] = result.date.dt.strftime('%#m/%#d/%#Y')

result1 = pd.DataFrame()
for i,r in result.iterrows():
    temp=pd.DataFrame({'open_score':[r.open_score],'close_score':[r.close_score],'date':r.date}) #'index':[c],
    #c += 1
    result1 = pd.concat([result1,temp])
result1 = result1.reset_index('date')

print(result1)
result1.to_csv('/var/www/html/Research-Platform-Stock-Market/module/twitter/data/Reliance_score.csv',sep=',',encoding='utf-8')
result1.to_json('/var/www/html/Research-Platform-Stock-Market/view/data/json/twitter/Reliance_score.json')


