// const bcrypt = require('bcryptjs')
// function hashPassword(password) {
//     const salt = bcrypt.genSaltSync(Number(process.env.saltPass))
//     return bcrypt.hashSync(password, salt)
// }

// function comparePassword(password, hash) {
//     return bcrypt.compareSync(password, hash)
// }
 
 
require("dotenv").config();
var CryptoJS = require("crypto-js");
function hashPassword(password) {
  // var hash = CryptoJS.AES.encrypt(
  //   JSON.stringify(password),
  //   process.env.saltCrypto
  // ).toString();
  // return hash;
  var ciphertext = CryptoJS.AES.encrypt(password, process.env.saltCrypto).toString();
  return ciphertext
 
}

function unhashPassword(pass){
  var bytes  = CryptoJS.AES.decrypt(pass, process.env.saltCrypto);
  var unhash = bytes.toString(CryptoJS.enc.Utf8);
  return unhash

}

function comparePassword(email, password,user) {
    var bytes  = CryptoJS.AES.decrypt(user.pass, process.env.saltCrypto);
var unhash = bytes.toString(CryptoJS.enc.Utf8);
 
     
      if (unhash == password) {
         
        
        return { status: true, id: user.id };
      } else {
     
        
        return { status: false };
      }
    
}

module.exports = {
  unhashPassword,
  hashPassword,
  comparePassword
};
