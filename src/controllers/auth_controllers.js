const {validationResult, cookie} = require('express-validator');
const User = require('../model/usermodel');
const passport = require('passport');
const bcrypt = require('bcrypt')
require('../config/passport_local')(passport)
const jwt = require('jsonwebtoken');
const swal = require('sweetalert2');


const homepage = (req,res,next)=>{
    
    res.render('index', {user:req.user, title: 'Ihtiyacın Kadar Al', layout: '../views/layout/layouts' });
}

const product = (req,res,next)=> {
    res.render('urunler', {title: 'Urunler', layout : '../views/layout/layouts'})
}

const registergoster = (req,res,next) => {
    res.render('kayit-ol', {title:'Kayıt Ol',layout:'../views/layout/layouts'});
}

const kullanicidetay = (req,res,next) => {
 res.render('kullanici-detay', {user:req.user,title:'Kullanıcı Detayı', layout:'../views/layout/layouts'});
}

const logingoster = (req,res,next) => {
    res.render('login', {title: "Giriş Sayfası", layout:'../views/layout/layouts'});
}

// düzen için pretter var yazdıklarınız kalsın hocam döner döner okurum ben onları sürekli bakıyorum cünkü :D bu otomatik olarak düzeltiyor isterseniz deneyelim spoer olur
// takım çalışmaları vs için ideal ctrl + s yapın

const login = (req,res,next)=>{
    const hatalar = validationResult(req);
    req.flash('email', req.body.email);
    req.flash('kullaniciadi',req.body.email)
    req.flash('sifre', req.body.sifre);
    if(!hatalar.isEmpty()){
        req.flash('validation_error',hatalar.array());
        res.redirect('/login');
        
    }
    
    passport.authenticate('local', {
        successRedirect: '/kayit-ol', 
        failureRedirect:'/login',
        failureFlash:true,
        session:true,
        cookie: {maxAge: 1800000 },
    })(req,res, next)

};

const register = async (req, res, next) => {
    const hatalar = validationResult(req);
    if (!hatalar.isEmpty()) {
        req.flash('validation_error', hatalar.array());
        req.flash('kullaniciadi', req.body.kullaniciadi);
        req.flash('ad', req.body.ad);
        req.flash('soyad', req.body.soyad);
        req.flash('email', req.body.email);
        req.flash('sifre', req.body.sifre);
        req.flash('resifre', req.body.sifre);
        res.redirect('kayit-ol');
       
      } else {
     try{
        const _user = await User.findOne({email:req.body.email});
        const _username = await User.findOne({kullaniciadi:req.body.kullaniciadi});
        
        if(_user && _username){
            req.flash('validation_error', [{msg:"Bu Mail ve Kullanıcı Adı Kullanımda.."}]);
        } else if (_user){
            req.flash('validation_error', [{msg:"Bu Mail Kullanımda.."}]);
        } else if (_username){
            req.flash('validation_error', [{msg:"Bu Kullanıcı Adı Kullanımda.."}]);
        }
        
        req.flash('kullaniciadi', req.body.kullaniciadi);
        req.flash('email', req.body.email);
        req.flash('ad', req.body.ad);
        req.flash('soyad', req.body.soyad);
        req.flash('sifre', req.body.sifre);
        req.flash('resifre', req.body.resifre);
    
        const newUser = new User({
            kullaniciadi:req.body.kullaniciadi,
            ad:req.body.ad,
            soyad:req.body.soyad,
            email:req.body.email,
            admin:false,
            sifre: await bcrypt.hash(req.body.sifre, 10)
        });
        await newUser.save();
        res.redirect('login')
  
     }catch(err){
        console.error(err);
        req.flash('validation_error', [{msg:"Kayıt sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin."}]);
        res.redirect('kayit-ol');
      
    }
    }
  };


const logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err) return next(err);
        req.session.destroy((error) =>{
            res.clearCookie('connect.sid');
            res.redirect('login');
        })
    })
}

                                           
               
const kullaniciguncelle = async (req,res,next) => {
    const eskisifre = req.body.eskisifre;
    const yenisifre = req.body.sifre;
    const kullaniciId = req.user.id;
  
    if (!req.body.yenisifre && !req.body.resifre) {
      try {    
        const kullanici = await User.findById(kullaniciId);
        const eskisifretrue = await bcrypt.compare(eskisifre, kullanici.sifre);
  
        if (eskisifretrue) {
            await User.findByIdAndUpdate(kullaniciId,{ad:req.body.ad, soyad:req.body.soyad});
            res.json({ validation_error: [{msg:'Güncelleme Başarılı.!'}]});
          } else { // buradan geliyorlar hocam onlar tek bir hata mesajı var hocam siz neden foreach ve arry kullandınız
            res.json({ validation_error: [{msg:'Eski Şifrenizi Yanlış Girdiniz.!'}]});
          }
          
   
  
      } catch(err) {
        console.log(err)
      }
    
            // Yeni şifre girilmediği için validationMiddleware'i atlıyoruz
        } else {
            // Yeni şifre girildiği için validationMiddleware çalışacak
            // ...
            const hatalar = validationResult(req);
            const validation_error = [];
            if (!hatalar.isEmpty()) {
                req.flash('validation_error',hatalar.array());
                req.flash('ad', req.body.ad);
                req.flash('soyad', req.body.soyad);
                req.flash('sifre', req.body.sifre);
                req.flash('resifre', req.body.sifre);
                hatalar.errors.forEach(element => {
                    validation_error.push({msg:element.msg});
                });
                res.json({validation_error: validation_error});

                console.log("hatalar");
              } else {
            try{    

                    const kullanici = await User.findById(kullaniciId);
                    const eskisifretrue = await bcrypt.compare(eskisifre, kullanici.sifre);

                    if(eskisifretrue){
                        const yenisifreHash = await bcrypt.hash(yenisifre, 10);

                        await User.findByIdAndUpdate(kullaniciId,{sifre:yenisifreHash, ad:req.body.ad, soyad:req.body.soyad});
                        res.json({ validation_error: [{msg:'Bilgileriniz Güncellenmiştir..!'}]});
                        console.log(yenisifre)
                        console.log('güncellendi')
                    }else{// buralardada var diye öyle yapmıştım:D hazır mı hocam suan evetti ama ajaxa geçtim birden fazla hata mesajı gönderebilirsiniz bunda hocam örnek göstermeme gerek var mı yok yok onu iyi anladım bu kısımda cok fazla vakit geçirdim çünkü :D ajaxa geçene kadar tamamdır hocam başka bir sorununuz var mı
                       // birde sen bağlanınca renkler çok güzel oldu bende böyle görünmüyorlar neden hocam kafam cok karışıyor benim renklendirmede beyaz hep vsc nin rengi mi hocam evet mesela bende const kullanici beyaz görünüyor ya da fonksyinoların bazıları calismiyor sanıyorum o zaman
                       /**
                        * temadan dolayı olabilir hocam senin renkler çok belirgin bunu hangi temayla yaptınız default hocamdark teması github ın dark teması var o da güzel
                        * size kalmış hocam tema cok sağoıl valla gerçekten ne kadar teşekkür etsem az hocam siz kaç yıldır nodejs öğreniyorsunuz valla cok iyi umarım o seviyeye 
                        * gelirim ben günde 13 saatimi veriyorum artık rüyalarıma girmeye başladı :D 10 saati dosya konumuna gitti bugun snrm :DAahahahaha evet hocam ettim küfürlerin hesabı yok sabahtan beri :D chatbt ile bir türlü çözemedik sorunu :D 
                        * hocam yarım saat baktım tüm herşey doğruydu en sonunda terminalde src yi göremedim 
                        * bir üst klasör de olduğunu fark ettim :D sen olmasan ben 10 gün arardım sanırım :D 
                        * Kolay gelsin hocam size bir sorunuzu olursa yazabilirsiniz allah razı olsn üstadım cok teşekkür ederim zahmet veridm iyi akşamlar dilerim <3
                        *  */ 
                       if(eskisifretrue){
                        
                            await User.findByIdAndUpdate(kullaniciId,{ad:req.body.ad, soyad:req.body.soyad});
                            res.json({ validation_error: [{msg:'Bilgileriniz Güncellenmiştir..!'}]});
                            console.log('güncellendi')

                        }else{
                            res.json({ validation_error: [{msg:'Eski Şifreniz Hatalı..!'}]});
                           console.log('eski şifre sorunu2')
                           
                            
                        }   
                    }
                  
            }catch(err){
                console.log(err)
            }
        }
        }
}


module.exports = {
    homepage,
    product,
    registergoster,
    register,
    logingoster,
    login,
    logout,
    kullanicidetay,
    kullaniciguncelle
    
    
    
    
}