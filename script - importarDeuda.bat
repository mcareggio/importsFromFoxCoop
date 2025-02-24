copy \\Server\c\qscoop\deuda.dbf C:\Users\GENERAL\ImportadorDatos
node importarConNodeDbfDeuda.js 150000
cd C:\Program Files\MySQL\MySQL Server 8.0\bin
mysql -u root -padmin coop -e "TRUNCATE TABLE deuda;"
mysql -u root -padmin coop < "C:\Users\GENERAL\ImportadorDatos\sql.sql"