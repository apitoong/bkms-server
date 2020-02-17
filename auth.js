const { varify } = require("./helpers/jwt");
// const { Siswa, Admin } = require("../models");
var jwtDecode = require("jwt-decode");

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

  Admin.findOne({
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
  console.log(req.headers.token);
  console.log(validate);
  Admin.findOne({
    where: {
      id: validate.id,
      role: "admin"
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
  var validate = varify(req.headers.token);
  console.log(req.headers.token);
  console.log(validate);
  Admin.findOne({
    where: {
      id: validate.id
    }
  })
    .then(data => {
      // console.log(data);

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

module.exports = {
  Authentication,
  Authorization,
  SuperAuth,
  adminAuth
};
