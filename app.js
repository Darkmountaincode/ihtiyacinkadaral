// app.js

// tanımlar global çevirilecek
const dotenv = require('dotenv').config();
const express = require('express');
const authRouter = require('./src/routers/auth_routers');
const nadminRouter = require('./src/routers/yonetim_routers');
const apiRouter = require('./api/api_routers');
const path = require('path');
const session = require('express-session');
const MonnoDbStore = require('connect-mongodb-session')(session);
const passport = require('passport');
const flash = require('connect-flash');
require('./src/config/database');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const sweetalert = require('sweetalert2');
const bodyParser = require("body-parser"); 
const sessionStore = new MonnoDbStore({
  uri: process.env.CONNECTION_DB,
  collection:'sessionlar'
});

app.use(expressLayouts);
app.use(express.static('public'));
app.use("/uploads", express.static(path.join(__dirname,'/src/uploads')));
app.set('view engine', 'ejs');
app.set('views',path.resolve(__dirname, './src/views'));
app.use('/api', express.static(__dirname + '/api'));

// şimdi hocam her yerde bunları tekrar tekrar tanımlamayın bunları vs onları global yapın her yerde kullanabilirsiniz o sayede app.js de yaparsanız global tanımları daha iyi olur
// o cok iyimiş kursu bitirdim ama böyle bir şey öğretmediler valla hocam sence kod düzenim cok mu kötü hocam isimlendirme olayı sorun sizde yonetim demişsiniz diğer yarısı controller olmuş yarı ingilizce yarı türkçe pek olmamış
// onu çözemedim için rastgele yazdım normalde öyle yazmıyordum 

app.use(session(
  {
  secret : process.env.SESSION_SECRET,
  resave : false,
  saveUninitialized : true,
  cookie:{
         maxAge : 36000000
  },
  store:sessionStore
  }
));

 

app.use(flash());

app.use((req,res,next) => {
  res.locals.validation_error = req.flash('validation_error');
  res.locals.success_message = req.flash('success_message');
  res.locals.kullaniciadi  = req.flash('kullaniciadi');
  res.locals.ad = req.flash('ad');
  res.locals.soyad = req.flash('soyad');
  res.locals.email = req.flash('email');
  res.locals.sifre = req.flash('sifre');
  res.locals.resifre = req.flash('resifre');
  res.locals.login_error = req.flash('error');
  res.locals.kategoriadi = req.flash('kategoriadi');
  res.locals.kategoriurl = req.flash('kategoriurl');
  res.locals.kategoriaciklama = req.flash('kategoriaciklama')
  next();
});






app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());
 
app.use('/', authRouter);
app.use('/nadmin', nadminRouter);
app.use('/api', apiRouter);


app.listen(process.env.PORT, () => {
  console.log(`Server ${process.env.PORT} Port Aktif`);
});

