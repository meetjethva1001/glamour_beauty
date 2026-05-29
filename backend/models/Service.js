const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: { type: String, required: true, enum: ['Hair', 'Skin', 'Nails', 'Wellness'] },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  icon: { type: String, default: '✨' },
  popular: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

module.exports = mongoose.model('Service', serviceSchema)
