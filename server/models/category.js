const mongoose = require('mongoose');
const { timeStamp } = require('node:console');

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
    maxlength: 32,
    unique: true
  }
}, { timeStamp: true });


const Category = mongoose.model('Category', categorySchema);
module.exports = { Category };