require('dotenv').config()
const mongoose = require('mongoose')
const Service = require('./models/Service')
const Package = require('./models/Package')

const seedSamples = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    
    console.log('Adding sample data to verify database writes...')
    
    await Service.create({
      title: 'Database Test Service',
      description: 'If you see this, your database is connected correctly!',
      category: 'Hair',
      price: 1,
      duration: '1 min'
    })
    
    await Package.create({
      name: 'Database Test Package',
      price: 10,
      features: ['Test Feature 1', 'Test Feature 2']
    })
    
    console.log('Sample data added successfully!')
    process.exit(0)
  } catch (err) {
    console.error('Error seeding samples:', err)
    process.exit(1)
  }
}

seedSamples()
