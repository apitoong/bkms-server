const router = require("express").Router();
const userController = require("./controllers/userController");
const beritaController = require('./controllers/beritaController')
const madrasahController = require('./controllers/madrasahController')
const gambarController = require('./controllers/gambarController')
const {
  User
} = require("./models");
const {
  Authentication,
  Authorization,
  adminAuth,
  SuperAuth,

} = require("./auth");


router.get('/user/check', userController.checkToken)
router.get('/user/have/berita', adminAuth, userController.haveBerita)
router.get('/user/all', adminAuth, userController.allUser)

router.get('/user/madrasah', SuperAuth, userController.allUserMadrasah)
router.post("/user/register", SuperAuth, userController.register);
router.post("/user/login", userController.login);
router.put('/user/edit', adminAuth, userController.editUser)
router.delete('/user/delete', SuperAuth, userController.deleteUser)
router.post('/user/pass', SuperAuth, userController.verifyPass)

// ============================== BERITA

router.get('/berita/all', beritaController.allBerita)
router.get('/berita/view/:beritaId', beritaController.beritaOne)
router.post('/berita/add', adminAuth, beritaController.addBerita)
router.post('/berita/terbit/:beritaId', adminAuth, beritaController.postingBerita)
router.put('/berita/edit/:beritaId', adminAuth, beritaController.editBerita)
router.delete('/berita/delete/:beritaId', adminAuth, beritaController.deleteBerita)

router.post('/madrasah/add', SuperAuth, madrasahController.addMadrasah)
router.get('/madrasah/all', SuperAuth, madrasahController.allMadrasah)

router.post('/gambar/add', adminAuth, gambarController.addPath)
// router.post('/gambar/galeri', adminAuth, gambarController.addGaleri)
router.get('/gambar/galeri/all', gambarController.allGaleri)
router.delete('/gambar/delete', adminAuth, gambarController.deletePath)
router.put('/gambar/edit/:gambarId', adminAuth, gambarController.editPath)
router.post('/gambar/clean', gambarController.cleanPath)
router.delete('/gambar/galeri', SuperAuth, gambarController.deleteGaleri)


module.exports = router;