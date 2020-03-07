const Model = require("../models");
const {
    User,
    Berita,
    Gambar,
    Madrasah

} = require("../models");
const {
    varify
} = require("../helpers/jwt.js");
class beritaController {


    static postingBerita(req, res, next) {
        Berita.findOne({
                where: {
                    id: req.params.beritaId
                }
            })
            .then(data => {
                data.posting = req.body.verify
                data.save()
                res.status(200).json({
                    status: true,
                    message: 'Berita Posted !!!'
                });
            })
    }
    static deleteBerita(req, res, next) {


        Berita.destroy({
                where: {
                    id: req.params.beritaId
                }
            })
            .then(data => {
                return Gambar.destroy({
                    where: {
                        id: req.body.gambar_id
                    }
                })
            })
            .then(data => {


                res.status(200).json({
                    status: true,
                    message: 'Berita Deleted !!!'
                });
            })
            .catch(next)
    }
    static editBerita(req, res, next) {
        const {
            title,
            time,
            description,
            gambar_id,
            status,
            gambar
        } = req.body;

        let gambarBaru = ''
        let user_id = varify(req.headers.token).id

        let baru = {}
        Gambar.destroy({
                where: {
                    id: gambar_id
                }
            })
            .then(data => {

                let inputData = {
                    path: gambar.path,
                    fileName: gambar.fileName,
                    status: gambar.status,
                    berita_id: req.params.beritaId
                }
                return Gambar.create(inputData)
            })
            .then(data => {

                gambarBaru = data
                return Berita.findOne({
                    where: {
                        id: req.params.beritaId
                    }
                })
            })

            .then(data => {
                baru = data
                data.status = status
                data.title = title
                data.description = description
                data.gambar_id = gambarBaru.id
                data.posting = 'Belum Terbit'
                return data.save()

            })
            .then(data => {
                res.status(200).json({
                    data: baru,
                    gambar: gambarBaru,
                    id: data.id
                })

            })

            .catch(next)

    }
    static addBerita(req, res, next) {
        let finalID = ''
        const {
            title,
            time,
            description,
            gambar_id,
            status
        } = req.body;
        let madrasah_id = ''
        let user_id = varify(req.headers.token).id
        User.findOne({
                where: {
                    id: user_id
                },
                include: [{
                    model: Madrasah,
                    as: 'madrasah'
                }]
            })
            .then(data => {
                madrasah_id = data.madrasah.id
                return Berita.create({
                    title,
                    time,
                    description,
                    gambar_id,
                    user_id,
                    madrasah_id,
                    status,
                    posting: 'Belum Terbit'
                })
            })

            .then(data => {


                finalID = data.id


                return Berita.findAll({
                    include: [{
                            model: Madrasah,
                            as: 'madrasah'
                        },
                        {
                            model: User,
                            as: 'user'
                        }
                    ],
                    order: [
                        ['id', 'DESC'],
                    ],
                })

            })
            .then(data => {
                res.status(200).json({
                    id: finalID
                })
            })
            .catch(next)

    }

    static allBerita(req, res, next) {
        Berita.findAll({
                include: [{
                        model: Madrasah,
                        as: 'madrasah'
                    },
                    {
                        model: User,
                        as: 'user'
                    },
                    {
                        model: Gambar,
                        as: 'gambar'
                    }
                ],
                order: [
                    ['id', 'DESC'],
                ],
            })
            .then(data => {
                res.status(200).json(data);
            })
            .catch(next)
    }

}
module.exports = beritaController;