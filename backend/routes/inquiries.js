const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const Inquiry = require('../models/Inquiry')
const { protect, adminOnly } = require('../middleware/auth')

// POST /api/inquiries — public (contact form)
router.post('/', [
  body('name').trim().notEmpty().withMessage('Name required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('message').trim().notEmpty().withMessage('Message required'),
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() })

  try {
    const inquiry = await Inquiry.create(req.body)
    res.status(201).json({ success: true, message: 'Inquiry submitted successfully.', inquiry })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// GET /api/inquiries — admin only
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 })
    res.json({ success: true, inquiries })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// PUT /api/inquiries/:id — admin update status
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true })
    res.json({ success: true, inquiry })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

module.exports = router
