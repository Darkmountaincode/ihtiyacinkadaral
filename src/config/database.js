const { default: mongoose } = require('mongoose');

mongoose.connect(process.env.CONNECTION_DB).then(() => {
    console.log('Veritabanı Bağlantısı Başarılı');
}).catch(err => console.log('Veritabanı Bağlantısı Yapılırken Bir Hata Oluştu'));