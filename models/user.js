const mongoose = require("mongoose");
const passportlocalmongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    password: String
})

userSchema.plugin(passportlocalmongoose);

const user = mongoose.model('User', userSchema, 'Users');

module.exports = user;