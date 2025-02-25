import { DBFFile } from "dbffile";
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
const agunmentos = process.argv;
var stringcompleto = "";
var tmpsuma = 0;
var sql = "";
let records;

//Trama del programa
const skiprecords = agunmentos[2] ?? 0;
console.log(skiprecords);
crearDeudaSQL(skiprecords);

//

async function crearDeudaSQL(skiprecords) {
  let dbf = await DBFFile.open("./deuda.dbf");
  console.log(`DBF file contains ${dbf.recordCount} records.`);
  // console.log(`Field names: ${dbf.fields.map((f) => f.name).join(", ")}`);
  console.log("skiping " + skiprecords + " recors");
  await dbf.readRecords(skiprecords); //Arranca del registro 150 mil para no tomar los primeror
  records = await dbf.readRecords();
  console.log(records.length);
  guardarEnLaBBDD();
}

function guardarEnLaBBDD() {
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql_truncate = "TRUNCATE TABLE deuda";
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

          sql +=
            "INSERT INTO deuda (RUTA,FOLIO,SUBFOLIO,PERIODO,FECCOMP,FECPAGO,TOTALFINAL) values(" +
            record.RUTA +
            "," +
            record.FOLIO +
            ",'" +
            record.SUBFOLIO +
            "','" +
            record.PERIODO +
            "'," +
            record.FECCOMP +
            "," +
            record.FECPAGO +
            "," +
            record.TOTALFINAL +
            ");\n";
        }

        fs.writeFile("sql.sql", sql, function (err) {
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
export { crearDeudaSQL };
