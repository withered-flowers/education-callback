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

let baca1 = (err, data1, cb) => {
  fs.readFile('hello2.md', (err,data2) => {
    cb(err, data1, data2);
  });
};

let baca2 = (err, data1, data2, cb) => {
  fs.readFile('hello3.md', (err,data3) => {
    cb(err, data1, data2, data3);
  });
};

let baca3 = (err, data1, data2, data3, cb) => {
  cb(data1, data2, data3);
}

let tulis1 = (data1,data2,data3) => {
  fs.writeFile('output.md', data1+data2+data3, () => {
    console.log("File selesai dituliskan !");
  });
}

fs.readFile('hello1.md', (err,data) => {
  baca1(err,data, (err, data, data2) => {
    baca2(err,data,data2, (err,data,data2,data3) => {
      tulis1(data,data2,data3);
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