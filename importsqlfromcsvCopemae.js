import { DBFFile } from "dbffile";
console.log("Arrnaca");
import * as mysql from "mysql";
import * as fs from "fs";

var results = [];

var con = mysql.createConnection({
  connectionLimit: 1000000,
  host: "localhost",
  user: "root",
  password: "admin",
  database: "coop",
});

var stringcompleto = "";
var tmpsuma = 0;
var sql = "";
let records;
async function batchRead() {
  let dbf = await DBFFile.open("./copemae.dbf");
  console.log(`DBF file contains ${dbf.recordCount} records.`);
  console.log(`Field names: ${dbf.fields.map((f) => f.name).join(", ")}`);
  records = await dbf.readRecords();
  console.log(records.length);
  guardarEnLaBBDD();
}
batchRead();

function guardarEnLaBBDD() {
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql_truncate = "TRUNCATE TABLE copemae";
    con.query(sql_truncate, null, function (err, result) {
      if (err) throw err;
      {
        for (let record of records) {
          record.FECPAGO =
            record.FECPAGO != null
              ? "'" + convertirFecha(record.FECPAGO.toString()) + "'"
              : null;
          record.FECCOMP =
            record.FECCOMP != null
              ? "'" + convertirFecha(record.FECCOMP.toString()) + "'"
              : null;
          record.SUBFOLIO = record.SUBFOLIO.toString();
          sql +=
            "INSERT INTO copemae (RUTA,FOLIO,SUBFOLIO,NOMBRE,CORREO,DIRECCION,TIPOUSU) values(" +
            record.RUTA +
            "," +
            record.FOLIO +
            "," +
            record.SUBFOLIO +
            ",'" +
            record.NOMBRE +
            "','" +
            record.DIR_CORREO +
            "','" +
            record.DOMICILIO +
            "'," +
            record.TIPOUSU +
            ");\n";
        }
        fs.writeFile("sqlcopemae.sql", sql, function (err) {
          if (err) throw err;
          console.log("Saved!");
          process.exit(0);
        });
      }
    });

    /**/
  });
  /* */
}

function convertirFecha(fecha) {
  fecha = new Date(fecha);

  let mes = fecha.getMonth() + 1;
  let dia = fecha.getDate();

  mes = mes < 10 ? "0" + mes : mes;

  dia = dia < 10 ? "0" + dia : dia;

  fecha = fecha.getFullYear() + "-" + mes + "-" + dia;

  return fecha;
}
