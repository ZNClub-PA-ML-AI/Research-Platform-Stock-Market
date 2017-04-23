import json
import sys

file = '/var/www/html/Research-Platform-Stock-Market/view/json/'+sys.argv[1]
json_object = json.load(open(file))


print (json.dumps(json_object))
