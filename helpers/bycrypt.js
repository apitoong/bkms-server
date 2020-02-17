// const bcrypt = require('bcryptjs')
// function hashPassword(password) {
//     const salt = bcrypt.genSaltSync(Number(process.env.saltPass))
//     return bcrypt.hashSync(password, salt)
// }

// function comparePassword(password, hash) {
//     return bcrypt.compareSync(password, hash)
// }
const { User } = require("../models");
require("dotenv").config();
var CryptoJS = require("crypto-js");
function hashPassword(password) {
  var hash = CryptoJS.AES.encrypt(
    JSON.stringify(password),
    process.env.salt
  ).toString();
  return hash;
}

function comparePassword(email, password) {
  return User.findOne({
    where: {
      email
    }
  })
    .then(data => {
      var bytes = CryptoJS.AES.decrypt(data.pass, process.env.salt);

      var unhash = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      if (unhash == password) {
        return { status: true, id: data.id };
      } else {
        return { status: false };
      }
    })
    .catch(err => {
      return false;
    });
}

module.exports = {
  hashPassword,
  comparePassword
};
