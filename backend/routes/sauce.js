const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth')
const isUser = require('../middleware/isUser')
const multer = require('../middleware/multer.config')

router.get('/', auth, sauceCtrl.getAllSauce);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.post('/:id/like', auth, sauceCtrl.likesAndDislikes)
router.get('/:id', auth, sauceCtrl.getOneSauce); 
router.put('/:id', isUser, multer, sauceCtrl.modifySauce);
router.delete('/:id', isUser, sauceCtrl.deleteSauce);



module.exports = router;