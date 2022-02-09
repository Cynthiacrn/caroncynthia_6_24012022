const multer = require('multer');

// dictionnaire MIME qui définit les formats autorisés pour les imaes
const MIME_TYPES ={
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        //on supprime les espaces (white space avec split) et on insère des underscores à la place
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension); //nom complet du fichier- Nom d'origine + numero unique + . + extension
    }
});

module.exports = multer({storage}).single('image');