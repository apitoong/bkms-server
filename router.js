const router = require("express").Router();
const userController = require("./controllers/userController");
const beritaController=require('./controllers/beritaController')
const madrasahController=require('./controllers/madrasahController')
const { User } = require("./models");
const {
  Authentication,
  Authorization,
  adminAuth,
  SuperAuth,
   
} = require("./auth");

router.get('/user/all', userController.allUser)
router.post("/user/register", userController.register);
router.post("/user/login", userController.login);
router.put('/user/edit',adminAuth,userController.editUser)
router.delete('/user/delete',SuperAuth,userController.deleteUser)

// ============================== BERITA

router.get('/berita/all',beritaController.allBerita)
router.post('/berita/add',adminAuth, beritaController.addBerita)
router.put('/berita/edit/:beritaId', beritaController.editBerita)
router.delete('/berita/delete/:beritaId',beritaController.deleteBerita)

router.post('/madrasah/add', SuperAuth,madrasahController.addMadrasah)
router.get('/madrasah/all',madrasahController.allMadrasah)




module.exports = router;
