const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
  package: { type: mongoose.Schema.Types.ObjectId, ref: 'Package' },
  date: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
  amount: { type: Number, required: true },
  notes: { type: String },
}, { timestamps: true })

module.exports = mongoose.model('Booking', bookingSchema)
