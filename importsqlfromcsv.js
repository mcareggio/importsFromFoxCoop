//import fs from 'fs'
console.log("Arrnaca")
var mysql = require('mysql');
var fs = require('fs');
var csv = require('csv')
var results= [];

var con = mysql.createConnection({
  connectionLimit: 1000000,
  host: "localhost",
  user: "root",
  password: "admin",
  database: "deuda"
});

var stringcompleto="";
var tmpsuma=0;
var sql=""
con.connect(function(err) {

          if (err) throw err;
          console.log("Connected!");

          var sql_truncate="TRUNCATE TABLE deuda"

          con.query(sql_truncate, null,function (err, result) {

            if (err) throw err;
            { 
              fs.createReadStream("deuda.csv").pipe(csv.parse({delimiter:',',from_line: 160000})).on("data", (row) => {               
                results.push(row);}).on("end", () => {
                  
                  //console.log(results[i])
                
                for(var i=0;i<results.length;i++){

                  if(results[i][11]=="")
                    results[i][11]=null
                  else
                  results[i][11]="'"+results[i][11]+"'"
                
                sql+="INSERT INTO deuda (RUTA,FOLIO,SUBFOLIO,PERIODO,FECCOMP,FECPAGO,TOTALFINAL) values("+results[i][1]+","+results[i][2]+",'"+results[i][3]+"','"+results[i][4]+"','"+results[i][9]+"',"+results[i][11]+","+results[i][120]+");\n"
                
                }
                fs.writeFile('sql.sql', sql, function (err) {
                  if (err) throw err;
                  console.log('Saved!');
                  process.exit();
                });
                
              })
              
              if (err) throw err;
              {

              

              }
              /**/
              }
              });
               /* */
              

            })      
              