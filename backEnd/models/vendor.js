const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const VendorSchema = new Schema({

  operatorName: {
    type: String,
    required: true,
    unique: true
  },
  registrationDate: {
    type: String,
    required: true,
    unique: true
  },
  photo: {
    type: String,
    required: true,
    unique: true
  },
  licenceScan: {
    type: String,
    required: true,
    unique: true
  },
  country: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  businessLocation: {
    type: Object,
    required: true,
    unique: true
  },
  businessSchedule: {
    type: Object,
    required: true,
    unique: true
  },
  ingredientSource: {
    type: Object,
    required: true,
    unique: true
  },
  foodGroup: {
    type: String,
    required: true,
    unique: true
  },

});



const VendorModel = mongoose.model('vendor', VendorSchema);

module.exports = VendorModel;