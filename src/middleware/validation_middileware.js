const {body} = require('express-validator');

const validateNewUser = () => {
    return [
        body('kullaniciadi').trim().isLength({min:4}).withMessage("Kullanıcı Adı En Az 4 Karakter Olmalıdır")
        .isLength({max:20}).withMessage("Kullanıcı Adı En Fazla 20 Karakter Olabilir"),
        
        body('ad').trim().isLength({min:3}).withMessage("Adınız en az 3 karakter olmalıdır.")
        .isLength({max:20}).withMessage('Adınız Maksimum 20 karakter olmalıdır.'),

        body('soyad').trim().isLength({min:3}).withMessage("Soyadınız en az 3 karakter olmalıdır.")
        .isLength({max:20}).withMessage("Soyadınız maksimum 20 karakter olmalıdır."),

        body('email').trim().isEmail().withMessage("Lütfen geçerli bir mail adresi giriniz"),

        body('sifre').trim().isLength({min:6}).withMessage("Şifreniz en az 6 karakter olmalıdır.")
        .isLength({max:20}).withMessage("Şifreniz En fazla 20 karakter olabilir."),

        body('resifre').trim().custom((value, {req})=> {
            if(value !== req.body.sifre){
                throw new Error('Şifreniz aynı olmalıdır.');
            }
            return true;
        })
    ]
}

const validatelogin = () => {
    return [
        body('email').trim().isEmail().withMessage("Lütfen Geçerli Bir email Griniz"),
        body('sifre').trim().isLength({min:6}).withMessage("Şifreniz En az 6 karakter olmalıdır.").isLength({max:20}).withMessage("Şifreniz Maksimum 20 Karakter Olabilir.")
    ]
}


const validateNewKategori = () => {
    return [
        body('kategoriadi').trim().isLength({min:4}).withMessage("Kategori Adı Minimum 4 Karakter Olmalı")
        .isLength({max:20}).withMessage("Kategori Adı En Fazla 20 Karakter Olabilir"),
        body('kategoriaciklama').trim().isLength({min:10}).withMessage("Kategori Açıklaması Minimum 10 Karakter Olmalı")
        .isLength({max:1000}).withMessage("Kategori Açıklaması Maksimum 1000 Karakter Olabilir..")
        
    ]
}


const validatedetay = () => {
    return [
        body('ad').trim().isLength({min:3}).withMessage("Adınız en az 3 karakter olmalıdır.")
        .isLength({max:20}).withMessage('Adınız Maksimum 20 karakter olmalıdır.'),
        
        body('soyad').trim().isLength({min:3}).withMessage("Soyadınız en az 3 karakter olmalıdır.")
        .isLength({max:20}).withMessage("Soyadınız maksimum 20 karakter olmalıdır."),
        
        body('sifre').trim().isLength({min:6}).withMessage("Şifreniz en az 6 karakter olmalıdır.")
        .isLength({max:20}).withMessage("Şifreniz En fazla 20 karakter olabilir."),

        body('resifre').trim().custom((value, {req})=> {
            if(value !== req.body.sifre){
                throw new Error('Şifreniz aynı olmalıdır.');
            }
            return true;
        })

    ]
}


module.exports = {
    validateNewUser,
    validatedetay,
    validatelogin,
    validateNewKategori
}