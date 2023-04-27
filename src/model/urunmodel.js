const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Kategori = require('./categorimodel');

const urunschema = new Schema({
    urunadi:{
        type:String,
        trim:true,
        required:true,
        minlength:[5,'Minimum 5 Karakter Olmak Zorunda'],
        maxlength:[30, 'En Fazla 30 Karakter Olmalıdır']
    },
    urunaciklama:{
        type:String,
        trim:true,
        required:true,
        minlength:[30,"Ürün Açıklaması Minimum 30 Karakter Olmalı"],
        maxlength:[500,"Ürün Açıklaması Maksimum 1000 Karakter Olmalıdır."]
    },
    urunfiyat:{
        type:[Number, 'Sadece Sayı Girebilirsiniz.'],
        trim:true,
        required:true,
        minlength:[1,'Girdiğiniz Sayı En Az 1 Basamaklı olmalıdır.'],
        maxlength:[6,'Girdiğiniz Sayı Maksimum 6 Basamaklı olmalıdır']
    },
    urunindirimlifiyat:{
        type:[Number, 'Sadece Sayı Girebilirsiniz.'],
        trim:true,
        required:true,
        minlength:[1,'Girdiğiniz Sayı En Az 1 Basamaklı olmalıdır.'],
        maxlength:[6,'Girdiğiniz Sayı Maksimum 6 Basamaklı olmalıdır']
    },
    indirimorani:{
        type:[Number, 'Sadece Sayı Girebilirsiniz.'],
        trim:true,
        required:true,
        minlength:[1,'Girdiğiniz Sayı En Az 1 Basamaklı olmalıdır.'],
        maxlength:[6,'Girdiğiniz Sayı Maksimum 6 Basamaklı olmalıdır']
    },
    urunkategorisi:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Kategori'
    }
}, {collection: 'Urunler', timestamps:true})

const Urunler = mongoose.model('Urunler', urunschema);

module.exports = Urunler;