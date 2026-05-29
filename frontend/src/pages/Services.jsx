import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useServices } from '../hooks/useStore'
import { categories } from '../data/services'
import ServiceCard from '../components/ServiceCard'
import SectionHeader from '../components/SectionHeader'

export default function Services() {
  const [activeCategory, setActiveCategory] = useState('All')
  const { services, loading, error } = useServices()

  const filtered = activeCategory === 'All'
    ? services
    : services.filter(s => s.category === activeCategory)

  if (loading) return <div className="pt-40 text-center font-serif text-2xl">Loading Services...</div>
  if (error) return <div className="pt-40 text-center text-red-500">Error: {error}</div>

  return (
    <div className="pt-20 overflow-hidden">

      {/* Page Header */}
      <section
        className="py-24 text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #FAF8F5 0%, #FFF6EE 100%)' }}
      >
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#C9A96E 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #C9A96E, #E8D5B0)' }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#C9A96E' }}>What We Offer</span>
              <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #E8D5B0, #C9A96E)' }} />
            </div>
            <h1 className="font-serif text-6xl font-semibold text-gray-900 mb-5">Our Services</h1>
            <p className="text-lg text-gray-500 font-light leading-relaxed">
              A complete range of premium beauty services, each crafted with care and expertise to bring out your best self.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sticky Filter */}
      <div
        className="sticky top-20 z-30 py-5"
        style={{
          background: 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="px-6 py-2.5 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300"
                style={
                  activeCategory === cat
                    ? {
                        background: 'linear-gradient(135deg, #C9A96E, #A07840)',
                        color: 'white',
                        boxShadow: '0 8px 20px rgba(201,169,110,0.35)',
                      }
                    : {
                        background: 'white',
                        color: '#888888',
                        border: '1.5px solid #EEEEEE',
                      }
                }
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <p className="text-sm font-light text-center mb-10 text-gray-400">
            Showing{' '}
            <span className="font-semibold" style={{ color: '#C9A96E' }}>{filtered.length}</span>{' '}
            service{filtered.length !== 1 ? 's' : ''}
            {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((service, i) => (
                <ServiceCard key={service._id} service={service} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-xl mx-auto px-6">
          <h3 className="font-serif text-3xl font-semibold text-gray-900 mb-4">
            Can't find what you're looking for?
          </h3>
          <p className="text-gray-500 font-light mb-8 leading-relaxed">
            Contact us and we'll create a custom beauty experience just for you.
          </p>
          <a href="/contact" className="btn-primary">Get in Touch</a>
        </div>
      </section>
    </div>
  )
}
