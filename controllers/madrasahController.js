const Model = require("../models");
const {
    User,
    Berita,
    Madrasah

} = require("../models");
const {
    varify
} = require("../helpers/jwt.js");
class madrasahController {

    static addMadrasah(req, res, next) {
        Madrasah.findOrCreate({
                where: {
                    nama: req.body.nama
                },
                order: [
                    ['id', 'DESC'],
                ],
            })
            .then(data => {
                return Madrasah.findAll()
            })
            .then(data => {
                res.status(200).json(data)

            })
    }

    static allMadrasah(req, res, next) {
        Madrasah.findAll({
                include: [{
                    model: User,
                    as: 'users'
                }]
            })
            .then(data => {
                res.status(200).json(data)
            })
    }


}
module.exports = madrasahController;