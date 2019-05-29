const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  },
  office: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    default: ''
  },
  token: {
    type: String,
    default: ''
  },
  country: {
    type: String,
    default: ''
  },
  mailing : {
    type: String,
    default: ""
  },
  task: {
    type: Object,
    default: []
  },
  organization: {
    type: String,
    default: ''
  },
  activity : {
    type: String,
    default: 'wait'
  }

});

UserSchema.pre('save', async function(next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function(password){
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
}

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;