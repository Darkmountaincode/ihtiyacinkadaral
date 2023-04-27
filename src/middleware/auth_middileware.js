const oturumAcilmis = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }else{
    req.flash('error', ['Lütfen Oturum Açınız.']);
     res.redirect('/login');
    }
}

const oturumAcilmamis = function(req,res,next){
    if(!req.isAuthenticated()){
        return next();
    }else{
  
     res.redirect('/');
    }
}

module.exports = {
    oturumAcilmis,
    oturumAcilmamis
}