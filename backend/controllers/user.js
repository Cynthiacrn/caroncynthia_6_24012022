const bcrypt = require('bcrypt');
const cryptojs = require('crypto-js');
const User = require('../models/user');
const jwt = require('jsonwebtoken'); 

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) // on récupère le MDP et on le hash
    .then(hash => {
      const user = new User({ // on créé un nouvel utilisateur avec un l'email unique et le MDP qui a été hashé
        email: cryptojs.HmacSHA256(req.body.email, 'EMAIL_KEY').toString(),
        password: hash
      });
      console.log(user)
      user.save() // on l'enregistre
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  console.log(req.body)
  User.findOne({ email: cryptojs.HmacSHA256(req.body.email, 'EMAIL_KEY').toString() }) // findOne permet de trouver un seul utilisateur dans la base de données
    .then(user => {
      if (!user) { // si utilisateur différent alors = utilisateur non trouvé
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password) // on compare le MDP envoyé avec la requête avec le MDP dans notre base de données
        .then(valid => {
          if (!valid) { // si MDP invalide = mot de passe incorrect
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign( // si tout est ok on assimile un TOKEN secret et unique pour l'ID de l'utilisateur
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
  };
