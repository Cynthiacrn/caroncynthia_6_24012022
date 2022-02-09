const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({ //création d'un schema mongoose pour nos utilisateurs
    email: {type: String, required: true, unique: true, }, // l'email doit être unique
    password: {type: String, required: true}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);