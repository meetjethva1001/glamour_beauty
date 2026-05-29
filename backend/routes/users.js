const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Booking = require('../models/Booking')
const { protect, adminOnly } = require('../middleware/auth')

// GET /api/users/profile
router.get('/profile', protect, (req, res) => {
  res.json({ success: true, user: req.user })
})

// PUT /api/users/profile
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, phone } = req.body
    const user = await User.findByIdAndUpdate(req.user._id, { name, phone }, { new: true })
    res.json({ success: true, user })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// GET /api/users/bookings
router.get('/bookings', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('service', 'title price')
      .populate('package', 'name price')
      .sort({ createdAt: -1 })
    res.json({ success: true, bookings })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// Admin: GET /api/users — all users
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }).sort({ createdAt: -1 })
    res.json({ success: true, count: users.length, users })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// Admin: DELETE /api/users/:id
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { isActive: false })
    res.json({ success: true, message: 'User deactivated.' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router
