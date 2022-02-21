const Sauce = require('../models/sauce')
const helmet = require("helmet"); 
const fs = require('fs');

// Créer une sauce = POST
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({ // création d'une sauce 
    ...sauceObject,
    likes: 0,
    dislikes: 0,
    userLiked: [],
    userDisliked: [],
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // création de l'URL d'image afin de les afficher
  });
  sauce.save() // sauvegarder une sauce
  .then(() => res.status(201).json({ message: 'Sauce enregistrée'}))
  .catch(error => res.status(400).json({error}));
};

// Possibilité de liker ou disliker = POST
exports.likesAndDislikes = (req, res, next) => {
  const like = parseInt(req.body.like); 
  switch (like) { // on compare chaque like à un cas et on éxecute
      case 0:
          Sauce.findOne({ _id: req.params.id })
              .then((sauce) => {
                  if (sauce.usersLiked.includes(req.body.userId)) { 
                      sauce.usersLiked.splice(req.body.userId, 1) 
                      sauce.likes--;
                      Sauce.updateOne({ _id: req.params.id }, { likes: sauce.likes, usersLiked: sauce.usersLiked })
                          .then(() => {
                              res.status(201).json({ message: 'Like supprimé' })
                          })
                          .catch((err) => {
                              res.status(400).json({ err })
                          })
                  }
                  else if (sauce.usersDisliked.includes(req.body.userId)) {
                      sauce.usersDisliked.splice(req.body.userId, 1)
                      sauce.dislikes--;
                      Sauce.updateOne({ _id: req.params.id }, { dislikes: sauce.dislikes, usersDisliked: sauce.usersDisliked })
                          .then(() => {
                              res.status(201).json({ message: 'Dislike supprimé' })
                          })
                          .catch((err) => {
                              res.status(400).json({ err })
                          })
                  }
              })
              .catch((err) => res.status(500).json({ err }))
          break;
      case 1:
          Sauce.findOne({ _id: req.params.id })
              .then((sauce) => {
                  sauce.likes++;
                  sauce.usersLiked.push(req.body.userId)
                  Sauce.updateOne({ _id: req.params.id }, { likes: sauce.likes, usersLiked: sauce.usersLiked })
                      .then(() => {
                          res.status(201).json({ message: 'Like ajouté' })
                      })
                      .catch((err) => {
                          res.status(400).json({ err })
                      })
              })
              .catch((err) => res.status(500).json({ err }))
          break;
      case -1:
          Sauce.findOne({ _id: req.params.id })
              .then((sauce) => {
                  sauce.dislikes++;
                  sauce.usersDisliked.push(req.body.userId)
                  Sauce.updateOne({ _id: req.params.id }, { dislikes: sauce.dislikes, usersDisliked: sauce.usersDisliked })
                      .then(() => {
                          res.status(201).json({ message: 'Disliked ajouté' })
                      })
                      .catch((err) => {
                          res.status(400).json({ err })
                      })
              })
              .catch((err) => res.status(500).json({ err }))
          break;
      default:
          console.log("La variable est supérieure ou inférieure au controller");
  }
}

// Modifier une sauce = PUT
exports.modifySauce = (req, res, next) => {
  if(req.file){
    // Si la modification contient une nouvelle image 
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
        // On supprime l'ancienne image du serveur
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            // une fois que l'ancienne image est supprimée dans le dossier image, on peut mettre à jour les autres infos
            const sauceObject = {
                ...JSON.parse(req.body.sauce),
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            }
            Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Sauce modifiée!' }))
                .catch(error => res.status(400).json({ error }));
        })
    })
    .catch(error => res.status(500).json({ error }));
}else{
    // Si la modification ne contient pas de nouvelle image
    const sauceObject = req.file ?
    {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : {...req.body};
      Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id })
      .then(() => res.status(200).json({message: 'Sauce modifiée'}))
      .catch(error => res.status(400).json({error}));
    };
}

// Supprimer une sauce = DELETE
exports.deleteSauce = (req, res, next) => {
    console.log(req.body)
  Sauce.findOne({ _id: req.params.id})

  .then(sauce => {
    // Pour extraire ce fichier, on récupère l'url de la sauce, et on le split autour de la chaine de caractères
    const filename = sauce.imageUrl.split('/images/')[1];
    // unlink = supprime ce fichier
    fs.unlink(`images/${filename}`, () => {
      Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
        .catch(error => res.status(400).json({ error }));
    });
  })
  .catch(error => res.status(400).json({error}));
};

// Récupérer une sauce = GET
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id})
  .then(sauce => res.status(200).json(sauce))
  .catch(error => res.status(404).json({error}));
};

// Récupérer toutes les sauces = GET
exports.getAllSauce = (req, res, next) => {
  Sauce.find()
  .then(sauces => res.status(200).json(sauces))
  .catch(error => res.status(400).json({error}));
};