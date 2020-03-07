const Model = require("../models");
const {
  User,
  Madrasah,
  Berita,
  Gambar,

} = require("../models");

const {
  tokenGenerate,
  varify
} = require("../helpers/jwt.js");
const {
  comparePassword,
  hashPassword,
  unhashPassword
} = require("../helpers/crypto");
class userController {

  static haveBerita(req, res, next) {
    let userId = varify(req.headers.token).id


    User.findOne({
        where: {
          id: userId,

        },
        include: [{
          model: Madrasah,
          as: 'madrasah'
        }, {
          model: Berita,
          as: 'beritas',
          include: [{
            model: Gambar,
            as: "gambar"
          }, {
            model: User,
            as: 'user',

          }, {
            model: Madrasah,
            as: 'madrasah'
          }]
        }]
      })
      .then(data => {
        res.status(200).json(data)
      })
  }

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
  static checkToken(req, res, next) {

    let token = req.headers.token

    let id = varify(token).id

    User.findOne({
        where: {
          id
        },
        include: [{
          model: Madrasah,
          as: 'madrasah'
        }, {
          model: Berita,
          as: 'beritas'
        }]
      })
      .then(data => {
        res.status(200).json(data)
      })




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
    let {
      email,
      pass,
      role,
      organisasi
    } = req.body;


    User.findAll({
        where: {
          organisasi
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
        if (data[0] !== undefined && data[0].madrasah.nama == "BKMS") {
          role = "super"
        }
        if (data.length > 0 && data[0].madrasah.nama !== "BKMS") {


          next()
        } else {
          User.create({
              email,
              pass,
              role,
              organisasi
            })
            .then(data => {
              return User.findAll({
                // where: {
                //   id: data.id
                // },
                include: [{
                  model: Madrasah,
                  as: 'madrasah'
                }, {
                  model: Berita,
                  as: 'beritas'
                }],
                order: [
                  ['id', 'DESC'],
                ],
              })

            })
            .then(data => {

              res.status(200).json(data);

            })
        }

      })




    //   .catch(next);
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
          next()
        } else {
          let validate = comparePassword(email, pass, userData)
          if (validate.status == false) {
            // throw new Error('Password salah')
            next()
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