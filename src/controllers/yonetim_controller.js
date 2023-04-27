const {validationResult, } = require('express-validator');
const User = require('../model/usermodel');
const Kategori = require('../model/categorymodel')
const passport = require('passport')
const bcrypt = require('bcrypt')
require('../config/passport_local')(passport)


const categories = async (req,res,next) => {
    try{
    const kategorim = await Kategori.find();
    res.render('nadmin/kategoriler.ejs', {layout:'./layout/yonetim_layout', title:"Kategoriler", kategorim:kategorim});
    }catch(err){
        next(err);
    }
}

const productdetail = async (req,res,next) => {
    try{ 
    const urunkategori = await Kategori.find();
    res.render('nadmin/urun-ekle', {layout:'./layout/yonetim_layout', title:"Ürün ekle", urunkategori:urunkategori});
    }catch(err){
        next(err);
    }
}

const products = (req,res,next) => {
    res.render('nadmin/urunler', {layout:'./layout/yonetim_layout', title:"Ürünler"})
}

const yonetimpaneli = (req,res,next) => {
    res.render('nadmin/index', {layout: './layout/yonetim_layout', title: 'Yönetim Paneli Anasayfa'})
}

const loginscreen = (req,res,next) => {
    res.render('nadmin/login', {layout: false, title: 'Admin Panel Giriş sayfası'},(err, html) => {
        if(err){
            return next(err);
        }
        res.send(html)
    })
}
const login = async (req,res,next) => {
    const errorcontrollers = validationResult(req);
    const validation_error = [];
    if(!errorcontrollers.isEmpty()){
        req.flash('validation_error',errorcontrollers.array());
        req.flash('email',req.body.email);
        req.flash('sifre',req.body.sifre);
        errorcontrollers.array().forEach(element => {
            validation_error.push({msg:element.msg});
        });
        res.json({validation_error: validation_error});
    } else {
        passport.authenticate('local', {
            successRedirect: '/', 
            failureRedirect:'login',
            failureFlash:true,
            session:true,
            cookie: {maxAge: 1800000 },
        }, async (err, user) => {
            if (err) {
                console.log(err)
                return next(err);
            }
            if (!user) {
                console.log('Kullanıcı bulunamadı')
                return res.json({ validation_error: [{msg:'Kullanıcı bulunamadı.'}] })
            }
            if(!user.admin){
                console.log("bu sayfaya erişim yetkiniz bulunmamaktadır.")
                return res.json({validation_error: [{msg:"Bu Sayfaya Erişim Yetkiniz Yok."}]})
            }
            req.login(user, function(err) {
                if (err) { 
                    console.log(err)
                    return next(err);
                }
                console.log('Giriş başarılı')
            
                return res.json({ user: user })
               
            })
        })(req, res, next)
    }
};



const yonetimlogout = (req,res,next) => {
    req.logout((err) => {
      if(err) return next(err);
      req.session.destroy((err) => {
          res.clearCookie('connect.sid');
          res.redirect('login');})})}
  


const categoriesadd = async (req, res, next) => {
    const hatalar = validationResult(req);
    const validation_error = [];
    if (!hatalar.isEmpty()) {
        req.flash('validation_error', hatalar.array());
        req.flash('kategoriadi', req.body.kategoriadi);
         req.flash('kategoriaciklama', req.body.kategoriaciklama);
         hatalar.errors.forEach(element => {
            validation_error.push({msg:element.msg});
        });
        res.json({validation_error: validation_error});
        
        }else{
           try{
        const _Kategori = await Kategori.findOne({kategori:req.body.kategoriadi});
        if(_Kategori){
            req.flash('validation_error', [{msg:"Bu Kategori Kullanımda"}]);
        }

        const url = req.body.kategoriadi;
        const urlwithoutSpaces = url.replace(/\s+/g, '-');
        const urlArray = urlwithoutSpaces.split('-');
        const newUrl = urlArray.join('-');   
        const newKategori = new Kategori({
        kategoriadi:req.body.kategoriadi,
        kategoriurl:'/'+newUrl,
        kategoriaciklama:req.body.kategoriaciklama
        });
        await newKategori.save();
        res.json({validation_error: [{msg:"Kategori Kayıt Başarılı"}]})

              
    }catch(err){
        console.log(err);
        console.log("hata cıktı")
    }
        }
         
    }



    categoridelete = (req, res, next) => {
        const kategoriId = req.body.kategoriId;
        Kategori.findOneAndDelete({_id: kategoriId})
          .then(() => {
            res.redirect('kategoriler'); // başarılı bir şekilde silindiğinde yönlendir
          })
          .catch((err) => {
            res.redirect('/sil/hata'); // hata oluştuğunda yönlendir
          });
      };


module.exports = {
    yonetimpaneli,
    loginscreen,
    login,
    yonetimlogout,
    products,
    productdetail,
    categories,
    categoriesadd,
    categoridelete,
 }