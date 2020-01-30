//modul fs dari nodejs
const fs = require('fs');

//fungsi yang digunakan sebagai callback
const callbackBacaFile = (error, data) => {
  if(error) {
    console.log("Error dalam membaca file: " + error);
  }
  else {
    console.log(data.toString());
  }
};

//memanggil fungsi readFile untuk membaca data hello.md
let data = fs.readFile('hello.md', callbackBacaFile);