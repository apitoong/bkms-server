const Model = require("../models");
const { User,Berita ,Madrasah, BeritaMadrasah} = require("../models");
const { varify } = require("../helpers/jwt.js");
class madrasahController {

    static addMadrasah(req,res,next){
        Madrasah.findOrCreate({
            where:{
                nama:req.body.nama
            }
        })
        .then(data=>{
            res.status(200).json(data)
        })
    }

    static allMadrasah(req,res,next){
        Madrasah.findAll({
            include:[{
                model:User,
                as:'users'
            }]
        })
        .then(data=>{
            res.status(200).json(data)
        })
    }
    
 
}
module.exports = madrasahController;
