require('dotenv').config()
const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const path = require('path')
const connectDB = require('./config/db')

const app = express()

// Connect to MongoDB
connectDB()

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Increased for real-time dashboard
  message: { success: false, message: 'Too many requests. Please try again later.' },
})

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use('/api/', limiter)

// Static files (uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/users', require('./routes/users'))
app.use('/api/services', require('./routes/services'))
app.use('/api/packages', require('./routes/packages'))
app.use('/api/gallery', require('./routes/gallery'))
app.use('/api/inquiries', require('./routes/inquiries'))
app.use('/api/bookings', require('./routes/bookings'))
app.use('/api/analytics', require('./routes/analytics'))

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Glamour Studio API is running 🌸', env: process.env.NODE_ENV })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' })
})

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Internal server error.' : err.message,
  })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`)
})
