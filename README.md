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
function eventPertama() {
  console.log("satu");
}

function eventKedua() {
  console.log("kedua");
}
```

### Synchronous callback

### Asynchronous callback

### Real-world case study

### Referensi
* [Brandon Morelli - Codeburst.io](https://codeburst.io/javascript-what-the-heck-is-a-callback-aba4da2deced?gi=dba6cb9bb948)
* [Sastra Panca Nababan - Medium](https://medium.com/coderupa/panduan-komplit-asynchronous-programming-pada-javascript-part-2-callback-3a717df6cfdf)
