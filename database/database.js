const data = require('../data.js');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/petsy');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('database connected!'));

const detailsSchema = mongoose.Schema({
  id: Number,
  name: String,
  freeShipping: Boolean,
  options: {
    name: String,
    optionName: [String],
    price: [Number],
  },
  quantity: Number,
  handmade: Boolean,
  madeToOrder: Boolean,
  materials: String,
  giftMessage: Boolean,
  giftCard: Boolean,
  shippingCountries: [String],
  shippingPrice: [Number],
});

const Product = mongoose.model('Product', detailsSchema);

Product.insertMany(data);
