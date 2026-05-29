require('dotenv').config()
const mongoose = require('mongoose')
const User = require('./models/User')
const Service = require('./models/Service')
const Package = require('./models/Package')

const checkDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('--- Database Check ---')
    console.log('URI:', process.env.MONGO_URI.split('@')[1]) // show only host part for privacy
    
    const userCount = await User.countDocuments()
    const serviceCount = await Service.countDocuments()
    const packageCount = await Package.countDocuments()
    
    console.log('Users:', userCount)
    console.log('Services:', serviceCount)
    console.log('Packages:', packageCount)
    
    if (userCount > 0) {
      const users = await User.find().select('email role')
      console.log('User list:', users)
    }

    process.exit(0)
  } catch (err) {
    console.error('Error checking DB:', err)
    process.exit(1)
  }
}

checkDB()
