const mongoose = require('mongoose')

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  tag: { type: String },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  features: [{ type: String }],
  popular: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

module.exports = mongoose.model('Package', packageSchema)
