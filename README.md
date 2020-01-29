## Pages ini akan membantu kita untuk belajar tentang apa itu callback.

## Table of Content
1. [Apa itu callback?](#apa-itu-callback)
2. [Mengapa butuh callback?](#mengapa-butuh-callback)
3. [Synchronous callback](#synchronous-callback)
4. [Asynchronous callback](#asynchronous-callback)
5. [Real-world case study](#real-world-case-study)
6. [Referensi](#referensi)

### Apa itu callback?
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

### Mengapa butuh callback?
Javascript sendiri merupakan *event-driven language*.
Ini artinya dalam Javascript, *ketimbang* menunggu sebuah respon berjalan,
Javascript akan mengeksekusi sesuatu sambil menunggu event lainnya.

Contoh:

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

Pada kode di atas, **fungsiPertama** akan dijalankan terlebih dahulu sebelum 
**fungsiKedua**. semua terkesan baik-baik saja.

Tapi apa yang terjadi bila **fungsiPertama** memiliki kode yang tidak bisa 
dijalankan dengan cepat? Contohnya API request dimana harus mengirim request
dan menunggu response?

Untuk mensimulasikan ini, kita akan mengubah kode kita di atas dengan menambahkan
fungsi bawaan Javscript **setTimeout**

Contoh baru:

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

Output baru:

```javascript
dua
satu
```

Pertanyaan:

*Loh,* mengapa output-nya menjadi **dua** terlebih dahulu baru **satu**?
Padahal *kan* **fungsiPertama** dipanggil terlebih dahulu sebelum **fungsiKedua**?

Penjelasan:

Ini bukan berarti Javascript *ngeyel* dengan tidak menjalankan **fungsiPertama**
dahulu baru menjalankan **fungsiKedua**, hanya saja ***Javascript tidak menunggu***
***respon dari*** **fungsiPertama** ***sebelum menjalankan*** **fungsiKedua**.

### Synchronous callback

### Asynchronous callback

### Real-world case study

### Referensi
* [Brandon Morelli - Codeburst.io](https://codeburst.io/javascript-what-the-heck-is-a-callback-aba4da2deced?gi=dba6cb9bb948)
* [Sastra Panca Nababan - Medium](https://medium.com/coderupa/panduan-komplit-asynchronous-programming-pada-javascript-part-2-callback-3a717df6cfdf)
