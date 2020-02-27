const {
  varify
} = require("./helpers/jwt");
// const { Siswa, Admin } = require("../models");
var jwtDecode = require("jwt-decode");
const {
  User
} = require("./models");


function Authentication(req, res, next) {
  try {
    let decode = varify(req.headers.token);
    req.decode = decode;
    next();
  } catch (err) {
    next(err);
  }
}

function Authorization(req, res, next) {
  var validate = jwtDecode(req.headers.token);

  User.findOne({
      where: {
        id: validate.id,
        role: "admin"
      }
    })
    .then(event => {
      if (event) {
        next();
      } else {
        next({
          status: 403,
          message: `you don't have the authority to do this action`
        });
      }
    })
    .catch(next);
}

function SuperAuth(req, res, next) {
  var validate = varify(req.headers.token);
  User.findOne({
      where: {
        id: validate.id,
        role: "super"
      }
    })
    .then(data => {
      if (data) {
        next();
      } else {
        next({
          status: 403,
          message: `you don't have the authority to do this action`
        });
      }
    })
    .catch(next);
}

function adminAuth(req, res, next) {
  console.log('ini headers', req.headers.token);

  if (req.headers.token == null) {

    res.json({
      status: false,
      code: 406,
      message: `you don't have the authority to do this action`,
      data: {},
    })
  } else {
    var validate = varify(req.headers.token);
    User.findOne({
        where: {
          id: validate.id
        }
      })
      .then(data => {


        if (data.role == "admin" || data.role == "super") {
          next();
        } else {
          next({
            status: 403,
            message: `you don't have the authority to do this action`
          });
        }
      })
      .catch(next);

  }
}

module.exports = {
  Authentication,
  Authorization,
  SuperAuth,
  adminAuth

};