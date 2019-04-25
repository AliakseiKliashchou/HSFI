const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const loginSchema = new Schema({
    login: String,
    password: String
});
module.exports = mongoose.model('User', loginSchema);
