require('dotenv').config()
const mongoose = require('mongoose')
const User = require('./models/User')

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to MongoDB')

    const adminEmail = 'admin@glamour.com'
    const existingAdmin = await User.findOne({ email: adminEmail })

    if (existingAdmin) {
      console.log('Admin user already exists. Updating role to admin just in case...')
      existingAdmin.role = 'admin'
      await existingAdmin.save()
    } else {
      console.log('Creating new admin user...')
      await User.create({
        name: 'Admin User',
        email: adminEmail,
        password: 'admin123',
        role: 'admin'
      })
      console.log('Admin user created successfully!')
    }
    process.exit(0)
  } catch (err) {
    console.error('Error seeding admin:', err)
    process.exit(1)
  }
}

seedAdmin()
