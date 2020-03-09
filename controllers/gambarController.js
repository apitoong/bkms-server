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


    static allGaleri(req, res, next) {

        Gambar.findAll({
                where: {
                    status: 'galeri'
                },
                order: [
                    ['id', 'DESC'],
                ],
            })
            .then(data => {
                res.status(200).json(data);
            })
    }

    static cleanPath(req, res, next) {
        var files = fs.readdirSync("./uploads");
        Gambar.findAll({
                isNewRecord: true
            })
            .then(data => {
                let result = [];
                for (let i = 0; i < files.length; i++) {
                    let flag = false;
                    for (let j = 0; j < data.length; j++) {
                        if (files[i] == data[j].fileName) {
                            flag = true;
                        }
                    }
                    if (flag == false) {
                        if (result.indexOf(files[i]) == -1) {

                            result.push(files[i]);
                        }
                    }
                }
                let hasil = Object.assign({}, result);
                for (let i = 0; i < result.length; i++) {
                    fs.unlink(`./uploads/${result[i]}`, function (err) {});
                }
                res.status(200).json({
                    data: hasil,
                    status: "berhasil"
                });
            })
            .catch(next);


    }

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

    static addGaleri(req, res, next) {
        const {
            path,
            fileName
        } = req.body;
        let inputData = {
            path,
            fileName,
            status: "galeri",
            berita_id: null
        }
        Gambar.create(inputData)
            .then(data => {
                res.status(200).json(data);
            })
            .catch(next);
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

    static deleteGaleri(req, res, next) {


        Gambar.destroy({
                where: {
                    id: req.body.id,
                    status: "galeri"
                }
            })
            .then(data => {
                fs.unlink(`./uploads/${req.body.path}`, function (err) {});
                res.status(200).json(data);
            })
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