const express = require('express')
const router = express.Router()
const Package = require('../models/Package')
const { protect, adminOnly } = require('../middleware/auth')

router.get('/', async (req, res) => {
  try {
    const packages = await Package.find({ isActive: true }).sort({ price: 1 })
    res.json({ success: true, packages })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const pkg = await Package.create(req.body)
    res.status(201).json({ success: true, package: pkg })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const pkg = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!pkg) return res.status(404).json({ success: false, message: 'Package not found.' })
    res.json({ success: true, package: pkg })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await Package.findByIdAndUpdate(req.params.id, { isActive: false })
    res.json({ success: true, message: 'Package removed.' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router
