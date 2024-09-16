const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
  name: String,
  last: Number,
  low: Number,
  high: Number,
  volume: Number,
  base_unit: String
}, { timestamps: true });

module.exports = mongoose.model('Crypto', cryptoSchema);