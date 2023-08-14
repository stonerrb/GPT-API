const mongoose = require('mongoose');

// -------------------- Main ---------------------------

const priceSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  price: { type: Number, required: true },
});

const goldItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  grams: { type: Number, required: true },
  currentPrice: { type: Number, required: true },
  priceHistory: [priceSchema], // Historical prices
});

const GoldItem = mongoose.model('GoldItem', goldItemSchema);

module.exports = GoldItem;
