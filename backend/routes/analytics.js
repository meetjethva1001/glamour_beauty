const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Booking = require('../models/Booking')
const Inquiry = require('../models/Inquiry')
const { protect, adminOnly } = require('../middleware/auth')

// GET /api/analytics — admin only
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const [totalUsers, totalBookings, pendingInquiries, completedBookings] = await Promise.all([
      User.countDocuments({ role: 'user', isActive: true }),
      Booking.countDocuments(),
      Inquiry.countDocuments({ status: 'new' }),
      Booking.countDocuments({ status: 'completed' }),
    ])

    // Revenue from completed bookings
    const revenueData = await Booking.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ])
    const totalRevenue = revenueData[0]?.total || 0

    res.json({
      success: true,
      analytics: {
        totalUsers,
        totalBookings,
        pendingInquiries,
        completedBookings,
        totalRevenue,
      },
    })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router
