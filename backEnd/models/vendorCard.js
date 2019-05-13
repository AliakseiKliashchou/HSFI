const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vendorCardSchema = new Schema({

  operatorName: {
    type: String,
    required: true,
   
  },
  registrationDate: {
    type: String,
    required: true,
    
  },
  licenceNumber: {
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
  foodGroup: {
    type: String,
    required: true,
    
  },
  serialNumber: {
    type: String,
    required: true,
   
  },

});



const VendorCardModel = mongoose.model('vendorcard', vendorCardSchema);

module.exports = VendorCardModel;