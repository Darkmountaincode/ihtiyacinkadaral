const router = require('express').Router();
const authController = require('../controllers/auth_controllers');
const validatormiddleware = require('../middleware/validation_middileware');
const authMiddileware = require('../middleware/auth_middileware');

router.get('/', authController.homepage);

router.get('/api')

router.get('/urunler',authController.product);

router.get('/kayit-ol',authMiddileware.oturumAcilmamis, authController.registergoster);
router.post('/kayit-ol',authMiddileware.oturumAcilmamis, validatormiddleware.validateNewUser(), authController.register);

router.get('/login',authMiddileware.oturumAcilmamis, authController.logingoster);
router.post('/login',authMiddileware.oturumAcilmamis, authController.login);

router.get('/logout', authMiddileware.oturumAcilmis, authController.logout);

router.get('/kullanici-detay', authMiddileware.oturumAcilmis, authController.kullanicidetay);
router.post('/kullanici-detay',authMiddileware.oturumAcilmis, validatormiddleware.validatedetay(), authController.kullaniciguncelle);

router.post('/api/test', (req, res) => {
    let {
        name,
        surname
    } = req.body;

    if(name == '' && surname == '') return res.json({ status: 400, message: 'Tüm alanları doldurunuz!'});

    return res.json({ status: 200, message: 'Başarılı', data: { name, surname }});
});

module.exports = router;

