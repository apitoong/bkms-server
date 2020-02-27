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

router.get('/user/session/check', userController.checkSession)
router.get('/user/all', adminAuth, userController.allUser)
router.get('/user/madrasah', SuperAuth, userController.allUserMadrasah)
router.post("/user/register", SuperAuth, userController.register);
router.post("/user/login", userController.login);
router.put('/user/edit', adminAuth, userController.editUser)
router.delete('/user/delete', SuperAuth, userController.deleteUser)
router.post('/user/pass', SuperAuth, userController.verifyPass)

// ============================== BERITA

router.get('/berita/all', beritaController.allBerita)
router.post('/berita/add', adminAuth, beritaController.addBerita)
router.put('/berita/edit/:beritaId', adminAuth, beritaController.editBerita)
router.delete('/berita/delete/:beritaId', adminAuth, beritaController.deleteBerita)

router.post('/madrasah/add', SuperAuth, madrasahController.addMadrasah)
router.get('/madrasah/all', SuperAuth, madrasahController.allMadrasah)

router.post('/gambar/add', adminAuth, gambarController.addPath)
router.delete('/gambar/delete', adminAuth, gambarController.deletePath)
router.put('/gambar/edit/:gambarId', adminAuth, gambarController.editPath)



module.exports = router;