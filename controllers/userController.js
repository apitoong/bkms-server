const Model = require("../models");
const {
  User,
  Madrasah,
  Berita
} = require("../models");

const {
  tokenGenerate
} = require("../helpers/jwt.js");
const {
  comparePassword,
  hashPassword,
  unhashPassword
} = require("../helpers/crypto");
class userController {


  static verifyPass(req, res, next) {

    let result = []
    let temp = req.body.user
    for (let i = 0; i < temp.length; i++) {
      const el = temp[i];
      el.original = unhashPassword(el.pass)
      result.push(el)
    }


    res.status(200).json({
      result
    });
  }
  static allUserMadrasah(req, res, next) {
    let madrasah = []
    let user = []
    User.findAll({
        where: {
          role: 'admin'
        },
        include: [{
          model: Madrasah,
          as: 'madrasah'
        }, {
          model: Berita,
          as: 'beritas'
        }],

      })
      .then(data => {

        user = data
        return Madrasah.findAll({
          include: [{
            model: User,
            as: 'users'
          }]
        })

      })
      .then(data => {
        madrasah = data
        res.status(200).json({
          madrasah,
          user
        });
      })


  }
  static checkSession(req, res, next) {



    let validate = req.headers.token
    if (validate == undefined || validate == null) {
      res.status(404).json({
        messege: "You Must login"
      });
    } else {
      res.status(200).json({
        data: validate
      });
    }

  }
  static allUser(req, res, next) {

    User.findAll({
        include: [{
          model: Madrasah,
          as: 'madrasah'
        }]
      })
      .then(data => {
        res.status(200).json(data);
      })
  }
  static editUser(req, res, next) {
    const {
      email,
      pass,
      role,
      organisasi
    } = req.body;

    User.findOne({
        where: {
          email
        }
      })
      .then(data => {

        data.pass = pass ? pass : unhashPassword(data.pass)
        data.role = role ? role : data.role
        data.organisasi = organisasi ? organisasi : data.organisasi
        data.save()


        res.status(200).json(data);
      })

  }
  static register(req, res, next) {
    const {
      email,
      pass,
      role,
      organisasi
    } = req.body;



    User.create({
        email,
        pass,
        role,
        organisasi
      })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(next);
  }
  static login(req, res, next) {
    const {
      email,
      pass
    } = req.body;

    User.findOne({
        where: {
          email
        }
      })
      .then(userData => {
        if (userData == null) {
          throw new Error("User tidak ada");
        } else {
          let validate = comparePassword(email, pass, userData)
          if (validate.status == false) {
            res.status(404).json({
              messege: "NOT FOUND user name / pass "
            });
          } else {
            let payload = {
              id: validate.id,
              email
            };
            let token = tokenGenerate(payload);


            res.status(200).json({
              token: token
            });
          }
        }
      })
      .catch(error => {

        res.json({
          status: false,
          code: 406,
          message: error.message,
          data: {},
        })

      })


  }
  static deleteUser(req, res, next) {
    User.destroy({
        where: {
          email: req.body.email
        }
      })
      .then(data => {
        res.status(200).json({
          status: true,
          message: 'User Deleted !!!'
        });

      })
      .catch(next)

  }
}
module.exports = userController;