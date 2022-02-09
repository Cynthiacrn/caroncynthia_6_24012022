const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config()

module.exports = (req, res, next) => {
  try {
    // on récupère le Token
    const token = req.headers.authorization.split(' ')[1];
    // on vérifie le token avec la clé secrète, les clés doivent correspondre
    const decodedToken = jwt.verify(token, process.env.PSW_KEY);
    // on vérifie que le userID corresponde avec le userID encodé dans le Token
    const userId = decodedToken.userId; 
    if (req.body.userId && req.body.userId !== userId) {
      throw 'identifiant invalide';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};