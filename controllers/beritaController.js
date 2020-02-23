const Model = require("../models");
const { User,Berita ,Madrasah, BeritaMadrasah} = require("../models");
const { varify } = require("../helpers/jwt.js");
class beritaController {


    static deleteBerita(req,res,next){

        Berita.destroy({
            where:{
              id:req.params.beritaId
            }
          })
          .then(data=>{
            res.status(200).json({ status:true,message:'Berita Deleted !!!' });
             
          })
          .catch(next)
    }
    static editBerita(req,res,next){
        const { title,time, description,gambar_id,status } = req.body;

        let user_id=varify(req.session.adminBkms).id

        Berita.findOne({where:{
            id:req.params.beritaId
        }})
        .then(data=>{
            data.status=status
            data.title=title
            data.description=description
            data.gambar_id=gambar_id
            data.save()
            res.status(200).json(data)
        })
        .catch(next)

    }
    static addBerita(req,res,next){

        const { title,time, description,gambar_id ,madrasah_id} = req.body;

        let user_id=varify(req.session.adminBkms).id
        Berita.create({title,time,description,gambar_id,user_id,status:'no verify'})
        .then(data=>{
            
            
            return BeritaMadrasah.create({
                berita_id:data.id,
                madrasah_id
            })
        })
        .then(data=>{
            res.status(200).json({
                message: `Register Successfully`
              });

        })
        .catch(next)
        
    }

    static allBerita(req,res,next){
        Berita.findAll({
            include:[{
                model:Madrasah,
                as:'madrasah'
            },
            {
                model:User,
                as:'user'
            }
        ]
        })
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(next)
    }
 
}
module.exports = beritaController;
