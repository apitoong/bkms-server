var CryptoJS = require("crypto-js");

var data = "123456";

// Encrypt
var ciphertext = CryptoJS.AES.encrypt(
  JSON.stringify(data),
  "secret key 123"
).toString();


// Decrypt
var bytes = CryptoJS.AES.decrypt(ciphertext, "secret key 123");
var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

console.log(decryptedData); // [{id: 1}, {id: 2}]

// bagaimana mengontrol kecepatan kendaraan
// bagaimana mengetahui teman yang dekat dengan kita saat berkendara
// bagaimana kita bisa mendapat teman ngobrol saat kita berkendara
// bagaiman kita mendapatkan sopir ketika kita malas berkendara
// bagaimana mendapat rekomandasi kendaraan ketika ingin membeli kendaraan