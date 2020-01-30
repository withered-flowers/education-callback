const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

// fs.readFile('hello1.md', (err,a) => {
//   fs.readFile('hello2.md', (err,b) => {
//     fs.readFile('hello3.md', (err,c) => {
//       fs.writeFile('output.md', a+b+c, () => {
//         console.log("File selesai dituliskan !");
//       });
//     });
//   });
// });

let baca1 = (err, data, cb) => {
  fs.readFile('hello2.md', (err,dataAdd) => {
    let dataFinal = data + dataAdd;
    cb(err, dataFinal);
  });
};

let baca2 = (err, data, cb) => {
  fs.readFile('hello3.md', (err,dataAdd) => {
    let dataFinal = data + dataAdd;
    cb(err, dataFinal);
  });
};

// let baca3 = (err, data, cb) => {
//   cb(data);
// }

let tulis1 = (err,data) => {
  fs.writeFile('output.md', data, () => {
    console.log("File selesai dituliskan !");
  });
}

fs.readFile('hello1.md', (err, data) => {
  baca1(err, data, (err, data2) => {
    baca2(err, data2, (err, data3) => {
      tulis1(err, data3);
    });
  });
});

// (async () => {
//   try {
//     let file1 = await readFile('hello1.md', 'utf8');
//     let file2 = await readFile('hello2.md', 'utf8');
//     let file3 = await readFile('hello3.md', 'utf8');

//     writeFile('output.md', file1+file2+file3);

//     console.log("File selesai dituliskan !");
//   }
//   catch(err) {
//     console.log(err.toString());
//   }
// }) ();