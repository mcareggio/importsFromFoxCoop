copy \\Server\c\qscoop\copemae.dbf C:\Users\GENERAL\ImportadorDatos
node importsqlfromcsvCopemae.js
cd C:\Program Files\MySQL\MySQL Server 8.0\bin
mysql -u root -padmin coop -e "TRUNCATE TABLE copemae;"
mysql -u root -padmin coop < "C:\Users\GENERAL\ImportadorDatos\sqlcopemae.sql"

