import csv
from dbfread import DBF

with open('copemae.csv', 'w', newline = '') as f:# create a csv file, fill it with dbf content
    writer = csv.writer(f)
    for record in DBF('copemae.dbf'):
        writer.writerow(dict(record).values())
        writer = csv.writer(f)
            
