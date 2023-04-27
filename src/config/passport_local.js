const LocalStrategy = require("passport-local").Strategy;
const passport = require('passport');
const User = require("../model/usermodel");
const bcrypt = require("bcrypt");

module.exports = async function (passport) {

    const options = {
      usernameField: 'email',
      passwordField: "sifre",
    };
  
    passport.use(new LocalStrategy(options, async (emailOrUsername, password, done) => {
        try {
          const _bulunanuser = await User.findOne({$or: [{ email: emailOrUsername }, { kullaniciadi: emailOrUsername }],});
          if (!_bulunanuser) {
            return done(null, false, { message: "Kullanıcı Bulunamadı" });
          }
          const sifreKontrol = await bcrypt.compare(password,_bulunanuser.sifre
          );
          if (!sifreKontrol) {
            return done(null, false, { message: "Şifre Hatalı.." });
          } else {
            return done(null, _bulunanuser);
          }
        } 
        
        catch (err) {
          return done(err);
        }
      }))
    };
    

    passport.serializeUser(function(user,done){
      done(null,user.id);
  });


  passport.deserializeUser(function(id, done){
    User.findById(id)
      .then((user) => {
        const yeniUser = {
            id:user.id,
            kullaniciadi:user.kullaniciadi,
            email:user.email,
            ad:user.ad,
            soyad:user.soyad,
        }
        done(null, yeniUser);
      })
      .catch((err) => {
        done(err, null);
      });
});