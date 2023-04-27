const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Userschema = new Schema({
    kullaniciadi: {
     type : String,
     required: true,
     trim:true,
     minlength:2,
     maxlength:[15,"Soyadınız maksimum 15 karakter olabilir"],
     unique:true
    },
    ad:{
        type : String,
        
    },
    soyad:{
        type : String,
       
    },
    email: String,
    sifre: String,
    admin: {
        type: Boolean,
        default: false
    }
   
}, {collection:'kullanicilar', timestamps:true});


module.exports = mongoose.model("User", Userschema);