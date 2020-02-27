const Model = require("../models");
const {
    Gambar
} = require("../models");
const {
    varify
} = require("../helpers/jwt.js");
var fs = require("fs");
var files = fs.readdirSync("./uploads");
class gambarController {

    static editPath(req, res, next) {


        Gambar.findOne({
                where: {
                    id: req.params.gambarId
                }
            })
            .then(data => {


                data.berita_id = req.body.id
                data.save()
                res.status(200).json(data);
            })
    }

    static addPath(req, res, next) {
        const {
            path,
            status,
            berita_id,
            fileName
        } = req.body;
        let inputData = {
            path,
            fileName,
            status: status ? status : null,
            berita_id: berita_id ? berita_id : null
        }
        Gambar.create(inputData)
            .then(data => {
                res.status(200).json(data);
            })
            .catch(next);
    }

    static deletePath(req, res, next) {
        Gambar.destroy({
            where: {
                path: req.body.path
            }
        }).then(data => {
            fs.unlink(`./uploads/${req.body.path}`, function (err) {});
            res.status(200).json(data);
        });
    }
}
module.exports = gambarController;