# Piquante

Sixème projet de mon parcours Développeur web chez OpenClassroom. L'objectif est de construire une API sécurisée pour une application d'avis gastronomiques

## Scénario

Développement d'une application web nommée "Piquante" dans laquelle les utilisateurs pourront ajouter leurs sauces préférées et liker ou disliker les sauces proposées par les autres utilisateurs.  
Le but est de créer le backend de l'application, le frontend étant déjà codé et fourni.

## Objectifs du projet et compétences évaluées

Développement Backend en Javascript

- Serveur **Node.js**
- Framework **Express**
- Base de données **MongoDB**
  - Hébergement sur MongoDB Atlas
  - Opérations relatives à la BDD réalisées avec mongoose
- **API REST**
- Sécurité **OWASP** et **RGPD**

## Mesures de sécurité mises en place

- Hashage du mot de passe utilisateur avec **bcrypt**
- Cryptage des emails utilisateurs dans la base de données avec **crypto-js**
- Manupulation sécurisée de la base de donnée avec **mongoose**
- Vérification que l'email utilisateur soit unique dans la base de données avec **mongoose-unique-validator**
- Utilisation de variables d'environnement pour les données sensibles avec **dotenv**
- Authentification de l'utilisateur par token avec **jsonwebtoken**
- Protection des headers avec **helmet**
- Log de chaque requête effectuée dans un fichier "assess.log" avec **morgan**

## Pour tester l'application

1. Cloner [ce repository frontend](https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6.git), et le lancer :
   - Dans un terminal, accéder au dossier du frontend
   - Installer les dépendances: `npm install`
   - Lancer: `npm run start`
2. Clonez [ce repository backend](https://github.com/Cynthiacrn/caroncynthia_6_24012022.git)
3. Ajouter un fichier de configuration nommé **".env"** à la racine du backend. A l'intérieur, 5 variables d'environnement "secrètes" seront définies:
   - MONGODB_PATH = 'lien_vers_la_base_de_données_mongoDB'
   - PSW_KEY = 'clé_secrète_pour_crypter_les_mots_de_passe'
   - EMAIL_KEY = 'clé_secrète_pour_crypter_les_emails'
4. Lancer le backend
   - Dans un autre terminal, accéder au dossier du backend
   - Installer les dépendances: `npm install`
   - lancer node avec `npm start`
   - Lancer le serveur avec `nodemon server`
5. Le frontend est accessible à l'adresse http://localhost:8081/
6. Pour des tests spécifiques (avec postman par exemple), le backend répond à l'adresse: http://localhost:3000 (attention: authentification requise pour toutes les routes /api/sauces/)
