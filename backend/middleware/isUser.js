const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config()
const Sauce = require('../models/sauce')

module.exports = (req, res, next) => {
  try {
    // on récupère le Token
    const token = req.headers.authorization.split(' ')[1];
    // on vérifie le token avec la clé secrète, les clés doivent correspondre
    const decodedToken = jwt.verify(token, process.env.PSW_KEY);
    // on vérifie que le userID corresponde avec le userID encodé dans le Token
    const userId = decodedToken.userId; 
    // on detecte si la sauce lui appartient ou pas pour la modifier
    if (req.body.userId && req.body.userId !== userId) {
      throw 'identifiant invalide';
    } else {
        Sauce.findOne({ _id: req.params.id})
        .then(sauce => {
    if(sauce.userId == userId){
    next()
    }else{
    throw ("vous n'êtes pas autorisé à supprimer ou modifier cette sauce")
    }

        })
        .catch(error => res.status(404).json({error}));
    //   next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};