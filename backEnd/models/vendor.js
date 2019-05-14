const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const VendorSchema = new Schema({

  operatorName: {
    type: String,
    required: true,
    
  },
  registrationDate: {
    type: String,
    required: true,
    
  },
  name: {
    type: String,
    required: true,
    
  },
  photo: {
    type: String,
    required: true,
    
  },
  licenceScan: {
    type: String,
    required: true,
    
  },
  licenceNumber: {
    type: String,
    required: true,
    
  },
  country: {
    type: String,
    required: true,
   
  },
  phone: {
    type: String,
    required: true,
    
  },
  email: {
    type: String,
    required: true,
    
  },
  businessLocation: {
    type: Object,
    required: true,
   
  },
  businessSchedule: {
    type: Object,
    required: true,
    
  },
  ingredientSource: {
    type: Object,
    required: true,
    
  },
  foodGroup: {
    type: String,
    required: true,
    
  },
  flag: {
    type: String,
    default: '',
  },
  wasFlag: {
    type: Boolean,
    default: false
  },
  stars: {
    type: Number,
    default: 0
  },
  callerID: {
    type: Object,
    default: []
  },
  callCount: {
    type: Number,
    default: 0
  },
  callDate: {
    type: Object,
    default: []
  }
});



const VendorModel = mongoose.model('vendor', VendorSchema);

module.exports = VendorModel;