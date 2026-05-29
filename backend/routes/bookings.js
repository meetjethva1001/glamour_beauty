const express = require('express')
const router = express.Router()
const Booking = require('../models/Booking')
const { protect, adminOnly } = require('../middleware/auth')

// GET /api/bookings — admin only
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email phone')
      .populate('service', 'title price')
      .populate('package', 'name price')
      .sort({ createdAt: -1 })
    res.json({ success: true, bookings })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// GET /api/bookings/my — logged in user
router.get('/my', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('service', 'title price')
      .populate('package', 'name price')
      .sort({ date: -1 })
    res.json({ success: true, bookings })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// POST /api/bookings — logged in user
router.post('/', protect, async (req, res) => {
  try {
    const { service, package, date, amount, notes } = req.body
    const booking = await Booking.create({
      user: req.user._id,
      service,
      package,
      date,
      amount,
      notes
    })
    res.status(201).json({ success: true, booking })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// PATCH /api/bookings/:id — admin only (update status)
router.patch('/:id', protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.body
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true })
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found.' })
    res.json({ success: true, booking })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

module.exports = router
