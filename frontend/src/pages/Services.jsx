import { motion, AnimatePresence } from 'framer-motion'
import { useServices } from '../hooks/useStore'
import ServiceCard from '../components/ServiceCard'
import { Link } from 'react-router-dom'

export default function Services() {
  const { services, loading, error } = useServices()

  if (loading) return <div className="pt-40 text-center font-serif text-2xl">Loading Services...</div>
  if (error) return <div className="pt-40 text-center text-red-500">Error: {error}</div>

  return (
    <div className="pt-20 overflow-hidden">
      
      {/* Page Header */}
      <section
        className="pt-32 pb-24 text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #111 100%)' }}
      >
        <div className="absolute inset-0 opacity-40">
           <img src="/hero_beauty_session_1780049333798.png" className="w-full h-full object-cover" alt="Services Header" />
           <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #C9A96E, #E8D5B0)' }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#C9A96E' }}>Our Experience</span>
              <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #E8D5B0, #C9A96E)' }} />
            </div>
            <h1 className="font-serif text-6xl font-semibold text-white mb-5">Beauty Gallery</h1>
            <p className="text-lg text-gray-300 font-light leading-relaxed">
              Explore our complete collection of premium beauty treatments. Each service is a masterpiece of care and artistry.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="flex items-center justify-center gap-3 mb-16">
            <div className="w-12 h-px bg-yellow-600/20" />
            <h2 className="font-serif text-2xl font-semibold text-gray-900 uppercase tracking-widest">Our Full Menu</h2>
            <div className="w-12 h-px bg-yellow-600/20" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {services.map((service, i) => (
                <ServiceCard key={service._id} service={service} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-28 bg-white text-center relative overflow-hidden">
        <div className="max-w-xl mx-auto px-6">
          <h3 className="font-serif text-4xl font-semibold text-gray-900 mb-6">
            Ready to Transform?
          </h3>
          <p className="text-gray-500 font-light mb-10 leading-relaxed text-lg">
            Book your session now or contact our experts to discuss your custom beauty plan.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary px-10 py-4">Book Appointment</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
