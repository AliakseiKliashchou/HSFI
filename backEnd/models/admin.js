const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({

  countries: {
      type: Object,
      default: ['Россия', 'Беларусь','Украина'],
  },
  foodGroups: {
      type: Object,
      default: ['Meat','Fruit', 'Fastfood'],
  },
  organizations: {
    type: Object,
    default: ['iTechArt','Epam', 'IBA'],
  },
  questions: {
    type: Object,
    default: [
    'Safety of sell point',
    'Quality of environment',
    'Quality of clothes',
    'Quality of products'
    ],
  },
  flag: {
      type: String,
      default: '',
  }

});



const adminModel = mongoose.model('admin', adminSchema);

module.exports = adminModel;