const express = require('express')
const router = express.Router()
const Service = require('../models/Service')
const { protect, adminOnly } = require('../middleware/auth')

// GET /api/services — public
router.get('/', async (req, res) => {
  try {
    const { category } = req.query
    const filter = { isActive: true }
    if (category && category !== 'All') filter.category = category
    const services = await Service.find(filter).sort({ popular: -1, createdAt: -1 })
    res.json({ success: true, count: services.length, services })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// GET /api/services/:id — public
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
    if (!service) return res.status(404).json({ success: false, message: 'Service not found.' })
    res.json({ success: true, service })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// POST /api/services — admin only
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const service = await Service.create(req.body)
    res.status(201).json({ success: true, service })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// PUT /api/services/:id — admin only
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!service) return res.status(404).json({ success: false, message: 'Service not found.' })
    res.json({ success: true, service })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// DELETE /api/services/:id — admin only
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await Service.findByIdAndUpdate(req.params.id, { isActive: false })
    res.json({ success: true, message: 'Service removed.' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router
