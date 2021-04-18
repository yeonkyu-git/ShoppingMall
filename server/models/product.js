const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    require: true,
    maxlength: 200,
  },
  description: {
    type: String,
    require: true,
    maxlength: 200,
  },
  price: {
    type: Number,
    trim: true,
    require: true,
    maxlength: 32
  },
  category: {
    type: ObjectId,
    ref: 'Category',
    require: true
  },
  quantity: {
    type: Number,
    default: 0
  },
  sold: {
    type: Number,
    default: 0
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  shipping: {
    require: false,
    type: Boolean,
  }
}, { timestaps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = { Product };