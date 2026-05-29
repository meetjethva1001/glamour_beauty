const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const Gallery = require('../models/Gallery')
const { protect, adminOnly } = require('../middleware/auth')

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/gallery/'),
  filename: (req, file, cb) => cb(null, `gallery-${Date.now()}${path.extname(file.originalname)}`),
})
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/
    if (allowed.test(path.extname(file.originalname).toLowerCase())) cb(null, true)
    else cb(new Error('Only image files allowed.'))
  },
})

router.get('/', async (req, res) => {
  try {
    const { category } = req.query
    const filter = { isActive: true }
    if (category && category !== 'All') filter.category = category
    const images = await Gallery.find(filter).sort({ createdAt: -1 })
    res.json({ success: true, images })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

router.post('/', protect, adminOnly, upload.single('image'), async (req, res) => {
  try {
    const imageUrl = req.file ? `/uploads/gallery/${req.file.filename}` : req.body.imageUrl
    const image = await Gallery.create({ ...req.body, imageUrl })
    res.status(201).json({ success: true, image })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await Gallery.findByIdAndUpdate(req.params.id, { isActive: false })
    res.json({ success: true, message: 'Image removed.' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router
