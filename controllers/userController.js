const Model = require("../models");
const { User } = require("../models");
var jwtDecode = require("jwt-decode");
var jwt = require("jsonwebtoken");
const { tokenGenerate } = require("../helpers/jwt.js");
const { comparePassword } = require("../helpers/bycrypt");
class userController {
  static register(req, res, next) {
    const { email, pass, role, organisasi } = req.body;
    User.create({ email, pass, role, organisasi })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(next);
  }
  static login(req, res, next) {
    const { email, pass } = req.body;
    let result = "";
    comparePassword(email, pass).then(data => {
      if (data.status == false) {
        res.status(404).json({
          messege: "NOT FOUND user name / pass "
        });
      } else {
        console.log("elseee", data);

        let payload = {
          id: data.id,
          email
        };
        let token = tokenGenerate(payload);
        sessionData = req.session;

        sessionData.token = token;

        res.status(200).json({ token });
      }
    });
  }
}
module.exports = userController;
