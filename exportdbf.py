import csv
from dbfread import DBF

with open('deuda.csv', 'w', newline = '') as f:# create a csv file, fill it with dbf content
    writer = csv.writer(f)
    for record in DBF('deuda.dbf'):
        writer.writerow(dict(record).values())
        writer = csv.writer(f)
            
