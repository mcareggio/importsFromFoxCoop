///import { Parser } from 'node-dbf';
var Parser = require('node-dbf');
var parser = Parser('C:\Users\GENERAL\Downloads\deuda.dbf');

parser.on('start', (p) => {
    console.log('dBase file parsing has started');
});
 
parser.on('header', (h) => {
    console.log('dBase file header has been parsed');
});
 
parser.on('record', (record) => {
    console.log('Name: ' + record.firstName + ' ' + record.lastName); // Name: John Smith
});
 
parser.on('end', (p) => {
    console.log('Finished parsing the dBase file');
});
console.log("corrio") 
parser.parse();