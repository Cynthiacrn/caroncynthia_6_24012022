
const express = require('express'); // Permet de faire fonctionner l'app
const helmet = require("helmet"); // Permet la sécurité en protégeant l'application de certaines vulnérabilités
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv').config()

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');


mongoose.connect(process.env.MONGO_URL,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();
// Transforme les données arrivant de la requête POST en un objet JSON facilement exploitable
app.use(express.json());
app.use(helmet.crossOriginEmbedderPolicy({policy: 'cross-origin'}));

app.use((req, res, next) => {
  // on indique que les ressources peuvent être partagées depuis n'importe quelle origine
	res.setHeader('Access-Control-Allow-Origin', '*');
  // on indique les entêtes qui seront utilisées après la pré-vérification cross-origin afin de donner l'autorisation
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	 // on indique les méthodes autorisées pour les requêtes HTTP
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
})

app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);


module.exports = app;