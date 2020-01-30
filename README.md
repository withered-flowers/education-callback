## Table of Content
1. [Apa itu callback?](#apa-itu-callback)
1. [Mengapa butuh callback?](#mengapa-butuh-callback)
1. [Yuk buat callback!](#yuk-buat-callback)
1. [Real-world case study](#real-world-case-study)
    1. [API Request](#api-request)
    1. [Read file](#read-file)
1. [Callback hell](#callback-hell)
1. [Referensi](#referensi)

## Apa itu callback?
Secara sederhananya:
Callback merupakan sebuah fungsi yang akan dijalankan setelah sebuah fungsi lain
telah selesai dijalankan - sehingga, dinamakan dengan *callback*

Secara kompleksnya:
Dalam javascript, perlu diingat bahwa fungsi adalah sebuah objek atau sering
disebut dengan *first-class object*, yang artinya:
* fungsi bisa dijadikan sebagai parameter
* fungsi bisa disimpan ke dalam variabel
* fungsi bisa memiliki *property* dan *method*
* fungsi bisa mengembalikan nilai dalam bentuk fungsi

## Mengapa butuh callback?
Javascript sendiri merupakan *event-driven language*.
Ini artinya dalam Javascript, *ketimbang* menunggu sebuah respon berjalan,
Javascript akan mengeksekusi sesuatu sambil menunggu event lainnya.

Code:

```javascript
function fungsiPertama() {
  console.log("satu");
}

function fungsiKedua() {
  console.log("dua");
}

fungsiPertama();
fungsiKedua();
```

Output:

```javascript
satu
dua
```

Penjelasan:

Pada kode di atas, `fungsiPertama` akan dijalankan terlebih dahulu sebelum 
`fungsiKedua`. semua terkesan baik-baik saja.

Tapi apa yang terjadi bila `fungsiPertama` memiliki kode yang tidak bisa 
dijalankan dengan cepat? Contohnya API request dimana harus mengirim request
dan menunggu response?

Untuk mensimulasikan ini, kita akan mengubah kode kita di atas dengan menambahkan
fungsi bawaan Javascript `setTimeout`

Code 2:

```javascript
function fungsiPertama() {
  //Simulasi delay sebagai analogi API Request
  setTimeout( () => {
    console.log("satu");
  }, 500);
}

function fungsiKedua() {
  console.log("dua");
}

fungsiPertama();
fungsiKedua();
```

Output 2:

```javascript
dua
satu
```

Pertanyaan:

*Loh,* mengapa output-nya menjadi **dua** terlebih dahulu baru **satu**?
Padahal *kan* `fungsiPertama` dipanggil terlebih dahulu sebelum `fungsiKedua`?

Penjelasan:

Ini bukan berarti Javascript *ngeyel* dengan tidak menjalankan `fungsiPertama`
dahulu baru menjalankan `fungsiKedua`, hanya saja ***Javascript tidak menunggu***
***respon dari*** `fungsiPertama` ***sebelum menjalankan*** `fungsiKedua`.

Jadi pada javascript, kita **tidak** bisa mengharapkan dengan memanggil fungsi
secara berurutan dan berharap urutan tersebut akan dijalankan dengan benar.

Solusinya bagaimana? salah satunya adalah dengan menggunakan **callback**.

### Yuk buat callback!

Masih dengan contoh yang sama di atas, kita akan memodifikasi kode sehingga
walaupun `fungsiPertama` menggunakan `setTimeout` sebagai analogi API Request,
namun tetap "ditunggu" oleh `fungsiKedua`

Code 3:

```javascript

//fungsiPertama akan menerima sebuah parameter dengan nama cb yang merupakan callback
function fungsiPertama(cb) {
  //Simulasi delay sebagai analogi API Request
  setTimeout( () => {
    console.log("satu");

    //panggil parameter cb, as a function.
    cb();
  }, 500);
}

function fungsiKedua() {
  console.log("dua");
}

//masukkan fungsiKedua sebagai parameter fungsiPertama
fungsiPertama(fungsiKedua);
```

Output 3:

```javascript
satu
dua
```

Penjelasan:

Pada kode di atas, `fungsiPertama` sekarang menerima sebuah parameter bernama
`cb` yang merupakan sebuah *callback*. Kemudian setelah mencetak tulisan
**satu** (yang dianalogikan setelah API Request berhasil diperoleh), kita akan
memanggil parameter `cb` sebagai fungsi.

Saat memanggil `fungsiPertama`, kita memasukkan sebuah parameter, yaitu
`fungsiKedua` yang akan dijadikan sebagai *callback*-nya. sehingga setelah
mencetak tulisan **satu**, kita akan menggail `fungsiKedua` untuk mencetak
tulisan **dua**

## Real-world case study

### API Request

Pada code sebelumnya, disinggung analogi tentang API Request. cara sederhana
pada javascript untuk melakukan API Request adalah dengan menggunakan AJAX,
namun, umumnya untuk AJAX terdapat masalah seperti berikut:

Code 4:

```javascript
let data = requestDataViaAjax();
showResult(data);
```

Problem:<br/>
<br/>
Pada kode di atas, fungsi `showResult()` bisa jadi mengembalikan data `undefined`
dikarenakan fungsi `requestDataViaAjax()` merupakan fungsi async, dimana seharusnya
kode di atas menunggu respon `requestDataViaAjax()` selesai dilakukan 
terlebih dahulu baru memanggil fungsi `showResult()`.

Solusi:<br/>
<br/>
Solusinya adalah dengan mengubah fungsi `showResult()` menjadi callback bagi
fungsi `requestDataViaAjax()`.

Solution 4:<br/>
(dapat dilihat di link github [ini](https://github.com/withered-flowers/education-callback/tree/master/api-request))

```javascript
const requestDataViaAjax = (cb) => {
  let xhr = new XMLHttpRequest();
  let url = "https://jsonplaceholder.typicode.com/users/1";

  xhr.open('GET', url);

  xhr.onload = () => {
    if(xhr.status === 200) {
      cb(xhr.responseText);
    }
    else {
      cb(null);
    }
  }

  xhr.send();
}
  
const showResult = (data) => {
  if (data != null) {
    data = JSON.parse(data);
    console.log(data);
  }
}
  
requestDataViaAjax(showResult);
```

### Read File

Dalam NodeJS, operasi file seperti baca dan tulis tulis umum digunakan. pada NodeJS
sendiri operasi ini mendukung secara sync dan async. pada pembelajaran ini kita akan
mencoba untuk membuat kode sederhana untuk membaca file secara async.

Code 5:<br/>
(dapat dilihat di link github [ini](https://github.com/withered-flowers/education-callback/tree/master/baca-folder))

```javascript
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
```

Output 5:
```javascript
ini hanyalah tulisan.
```

## Callback hell

Callback hell merupakan kondisi ketika programmer membuat beberapa callback di
dalam callback (nested callback) sehingga membuat codingan yang sudah ada sulit untuk 
dibaca.

Contoh 6:

```javascript
fs.readFile('hello1.md', (a) => {
  fs.readFile('hello2.md', (b) => {
    fs.readFile('hello3.md', (c) => {
      fs.writeFile('output.md', a+b+c, () => {
        console.log("File selesai dituliskan !");
      });
    })
  })
});
```

Problem 6:<br/>
<br/>
Dapat dilihat dari kode di atas, betapa banyaknya `})` di akhir? *OMG*,
kondisi seperti inilah yang disebut dengan **Callback Hell**.

Kondisi seperti ini membuat:
* Kode lebih sulit dibaca, kode piramid seperti ini akan sulit untuk di-maintain nantinya
* Kode di atas juga belum memasukkan adanya *error handling*, sehingga jika proses 
  baca atau tulisnya error, sulit untuk dideteksi.

Solusi 6:<br/>
<br/>
Solusi dari permasalahan ini adalah:
* Jangan menggunakan fungsi dalam fungsi seperti contoh kode di atas.
* Biasakan membuat kode lebih modular agar lebih mudah dibaca (pecah fungsi dan beri nama)
* Handle **setiap error** yang ada di dalam **setiap callback**.
* Mengggunakan alternatif dari callback yang sudah disediakan dalam Javascript
  (**Promise** atau **async / await**)


## Referensi
* [Brandon Morelli - Codeburst.io](https://codeburst.io/javascript-what-the-heck-is-a-callback-aba4da2deced?gi=dba6cb9bb948)
* [Sastra Panca Nababan - Medium](https://medium.com/coderupa/panduan-komplit-asynchronous-programming-pada-javascript-part-2-callback-3a717df6cfdf)
* [Callback Hell [dot] com](http://callbackhell.com/)