const router = require('express').Router();
const yonetimControllers = require('../controllers/yonetim_controller');
const yonetimmiddleware = require('../middleware/yonetim_middleware');
const validatormiddleware = require('../middleware/validation_middileware');

router.get('/',yonetimmiddleware.yoneticioturumu, yonetimControllers.yonetimpaneli);

router.get('/logout', yonetimmiddleware.yoneticioturumu, yonetimControllers.yonetimlogout);

router.get('/login',yonetimmiddleware.oturumcontrol, yonetimControllers.loginscreen);
router.post('/login', yonetimControllers.login);

router.get('/urunler', yonetimControllers.products);
router.get('/urun-ekle',yonetimControllers.productdetail);

router.get('/kategoriler', yonetimControllers.categories);
router.post('/kategoriler',validatormiddleware.validateNewKategori(), yonetimControllers.categoriesadd);

router.post('/sil', yonetimControllers.categoridelete)

module.exports = router;