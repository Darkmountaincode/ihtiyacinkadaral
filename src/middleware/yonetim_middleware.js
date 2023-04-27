const yoneticioturumu = (req,res,next) =>  {
    if(req.isAuthenticated()){
        return next();
    }else{
        req.flash('error',['Lütfen Oturum Açınız']);
        res.redirect('login');
    }
}


const oturumcontrol = (req,res,next) => {
    if(!req.isAuthenticated()){
        return next();
    }else{
        req.flash('error',['Zaten Oturum Açtınız']);
        res.redirect('/nadmin')
    }
}


module.exports = {
    yoneticioturumu,
    oturumcontrol
}