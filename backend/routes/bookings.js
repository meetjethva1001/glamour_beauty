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
    const { service, package, date, amount, notes, variant } = req.body
    const booking = await Booking.create({
      user: req.user._id,
      service,
      package,
      date,
      amount,
      notes,
      variant
    })
    res.status(201).json({ success: true, booking })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// PATCH /api/bookings/:id — Owner or Admin
router.patch('/:id', protect, async (req, res) => {
  try {
    const { status } = req.body
    const booking = await Booking.findById(req.params.id)

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found.' })
    }

    // Check if user is admin OR the owner of the booking
    if (req.user.role !== 'admin' && booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this booking.' })
    }

    booking.status = status
    if (status === 'cancelled') {
        booking.cancelledBy = req.user.role === 'admin' ? 'admin' : 'user'
    }
    await booking.save()

    res.json({ success: true, booking })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

module.exports = router
