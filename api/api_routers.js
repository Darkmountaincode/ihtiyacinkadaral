const express = require('express');
const router = express.Router()
Kategori = require('../src/model/categorymodel');

router.delete('/nadmin/kategoriler/:_id', async (req, res) => {
    try {     
      const kategoriId = req.params._id;
      await Kategori.findByIdAndDelete(kategoriId);
      res.json({ success: true });
    } catch (err) {
       console.log("burada")
    }
  });
  
  
module.exports = router;