const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const KategoriSchema = new Schema({
    kategoriadi: {
        type: String,
        trim:true,
        required:true,
        minlength:2,
        maxlength:[20,"Kategori Adınız En Fazla 15 Karakter Olabilir"],
        unique:true
    },
    kategoriurl:{
        type : String,
        trim:true,
    },
    kategoriaciklama:{
        type:String,
        trim:true,
        minlength:2,
        maxlength:[1000,"Kategori Adınız En Fazla 15 Karakter Olabilir"],
    }
},{collection:'kategoriler', timestamps:true});

const Kategori = mongoose.model('Kategori',KategoriSchema);

module.exports = Kategori;