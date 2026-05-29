import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useServices } from '../hooks/useStore'
import { testimonials } from '../data/services'
import ServiceCard from '../components/ServiceCard'
import SectionHeader from '../components/SectionHeader'

const stats = [
  { value: '50+', label: 'Happy Clients' },
  { value: '4+', label: 'Years Experience' },
  { value: '20+', label: 'Services' },
  { value: '4.5 ★', label: 'Star Rating' },
]

const whyUs = [
  { icon: '🌿', title: 'Premium Products', desc: 'Top-tier, skin-safe products from trusted international brands only.' },
  { icon: '👩‍🎨', title: 'Expert Artists', desc: 'Certified professionals with years of expertise in every service.' },
  { icon: '✨', title: 'Luxury Ambience', desc: 'A serene, luxurious environment from the moment you walk in.' },
  { icon: '💯', title: 'Guaranteed Results', desc: 'Your satisfaction is our top priority — always and every time.' },
]

export default function Home() {
  const { services, loading } = useServices()
  const featured = services.filter(s => s.popular).slice(0, 6)

  return (
    <div className="overflow-hidden">

      {/* ─── HERO ─── */}
      <section
        className="relative min-h-screen flex items-center"
        style={{ background: 'linear-gradient(135deg, #FAF8F5 0%, #FFF6EE 50%, #FDF2F5 100%)' }}
      >
        {/* Decorative blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-25"
            style={{ background: 'radial-gradient(circle, #E8D5B0 0%, transparent 70%)', transform: 'translate(20%, -20%)' }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #F0C8D0 0%, transparent 70%)', transform: 'translate(-20%, 20%)' }} />
        </div>

        <div className="w-full max-w-7xl mx-auto px-6 lg:px-16 pt-28 pb-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* Left */}
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
                style={{ background: 'rgba(201,169,110,0.12)', border: '1px solid rgba(201,169,110,0.3)' }}
              >
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#C9A96E' }} />
                <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#C9A96E' }}>
                  Premium Beauty Studio
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-serif font-semibold leading-[1.1] mb-6 text-gray-900"
                style={{ fontSize: 'clamp(3rem, 5.5vw, 5.5rem)' }}
              >
                Reveal Your
                <span className="block italic gold-text">Natural Beauty</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-gray-600 font-medium leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0"
              >
                Experience the art of beauty at Glamour Studio. Where every visit is a luxurious journey crafted just for you.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
              >
                <Link to="/services" className="btn-primary">Explore Services</Link>
                <Link to="/packages" className="btn-secondary">View Packages</Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-4 gap-6 mt-14 pt-10 border-t border-gray-200"
              >
                {stats.map((s) => (
                  <div key={s.label} className="text-center lg:text-left">
                    <p className="font-serif text-2xl font-bold text-gray-900">{s.value}</p>
                    <p className="text-xs text-gray-400 tracking-widest uppercase font-medium mt-1">{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="relative hidden lg:flex justify-center"
            >
              <div
                className="relative w-[420px] h-[520px] rounded-3xl flex items-center justify-center overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #FFF0E8 0%, #FFE8F0 50%, #F0E8FF 100%)',
                  boxShadow: '0 40px 80px rgba(0,0,0,0.12)',
                }}
              >
                <div className="text-center px-10">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className="relative rounded-[40px] overflow-hidden shadow-2xl group"
                  >
                    <img 
                      src="/hero_beauty_session_1780049333798.png" 
                      alt="Luxury Beauty Session" 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                  </motion.div>
                  <p className="font-serif text-xl text-gray-600 italic leading-relaxed mt-10">
                    "Beauty is an art,<br />we are the artists."
                  </p>
                </div>
              </div>

              {/* Badge 1 */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -left-8 bg-white rounded-2xl p-5 shadow-2xl"
                style={{ border: '1px solid rgba(0,0,0,0.06)' }}
              >
                <p className="text-xs text-gray-400 tracking-widest uppercase font-medium">Trusted by</p>
                <p className="font-serif text-3xl font-bold text-gray-900 mt-0.5">120+</p>
                <p className="text-xs font-semibold mt-0.5" style={{ color: '#C9A96E' }}>Happy Clients</p>
              </motion.div>

              {/* Badge 2 */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-6 rounded-2xl p-5 text-white"
                style={{
                  background: 'linear-gradient(135deg, #C9A96E, #A07840)',
                  boxShadow: '0 20px 40px rgba(201,169,110,0.4)',
                }}
              >
                <p className="text-xs tracking-widest uppercase font-medium text-white/70">Rating</p>
                <p className="font-serif text-3xl font-bold mt-0.5">4.5 ★</p>
                <p className="text-xs font-medium text-white/80">Excellence</p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-gray-400 tracking-widest uppercase font-medium">Scroll</span>
          <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, #C9A96E, transparent)' }} />
        </motion.div>
      </section>

      {/* ─── MARQUEE ─── */}
      <div className="py-5 overflow-hidden bg-gray-900">
        <motion.div
          animate={{ x: [0, -1400] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          className="flex gap-0 whitespace-nowrap"
        >
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center gap-10 flex-shrink-0 px-5">
              {['Hair Styling', 'Bridal Makeup', 'Nail Art', 'Facials', 'Keratin', 'Waxing', 'Packages'].map((t) => (
                <span key={t} className="flex items-center gap-5">
                  <span className="text-xs tracking-widest uppercase font-medium text-gray-500">{t}</span>
                  <span style={{ color: '#C9A96E' }}>✦</span>
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* ─── FEATURED SERVICES ─── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <SectionHeader
            tag="What We Offer"
            title="Our Signature Services"
            subtitle="From hair to nails, a complete range of premium beauty services designed to make you look and feel your absolute best."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full py-20 text-center font-serif text-xl text-gray-400">Discovering services...</div>
            ) : (
              featured.map((service, i) => (
                <ServiceCard key={service._id} service={service} index={i} />
              ))
            )}
          </div>
          <div className="text-center mt-12">
            <Link to="/services" className="btn-secondary">View All Services</Link>
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ─── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #C9A96E, #E8D5B0)' }} />
                <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#C9A96E' }}>
                  Why Glamour Studio
                </span>
              </div>
              <h2 className="font-serif text-5xl font-semibold text-gray-900 leading-tight mb-6">
                The Glamour<br />
                <span className="italic gold-text">Difference</span>
              </h2>
              <p className="text-gray-500 font-light leading-relaxed text-lg mb-10">
                We don't just offer beauty services — we create transformative experiences that leave you glowing inside and out.
              </p>
              <Link to="/about" className="btn-primary">Our Story</Link>
            </motion.div>

            <div className="grid grid-cols-2 gap-5">
              {whyUs.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="p-7 rounded-2xl"
                  style={{
                    background: i % 2 === 0 ? '#FAF8F5' : '#FFFFFF',
                    border: '1px solid rgba(0,0,0,0.06)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                  }}
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h4 className="font-serif text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-500 font-light leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── GALLERY / EXPERIENCE ─── */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-yellow-600/30" />
                <span className="text-xs font-semibold tracking-widest uppercase text-yellow-600">Our Atmosphere</span>
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-gray-900 leading-tight">
                Experience Luxury In<br />
                <span className="italic gold-text">Every Detail</span>
              </h2>
            </div>
            <p className="text-gray-500 font-light max-w-sm">From serene spa rooms to modern styling stations, we've created a sanctuary for your beauty journey.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:col-span-2 h-[500px] rounded-[40px] overflow-hidden relative group"
            >
              <img src="/hair_salon_modern_1780049470169.png" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Modern Styling Station" />
              <div className="absolute inset-x-8 bottom-8 p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/80">Styling</span>
                <h4 className="text-xl font-serif text-white mt-1">Modern Styling Stations</h4>
              </div>
            </motion.div>
            
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="h-[238px] rounded-[32px] overflow-hidden relative group"
              >
                <img src="/spa_treatment_room_1780049390324.png" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Wellness Suite" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <h4 className="text-lg font-serif text-white tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">Wellness Suites</h4>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="h-[238px] rounded-[32px] overflow-hidden relative group"
              >
                <img src="/nail_art_luxurious_1780049597844.png" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Nail Art Precision" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <h4 className="text-lg font-serif text-white tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">Nail Artistry</h4>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #111111 0%, #1a1a1a 100%)' }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #C9A96E, transparent)', transform: 'translate(30%, -30%)' }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
          <SectionHeader
            tag="Client Love"
            title="What Our Clients Say"
            subtitle="Real stories from real clients who experienced the Glamour Studio difference."
            light
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="p-7 rounded-2xl"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <span key={j} style={{ color: '#C9A96E' }}>★</span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-6 italic font-light text-gray-400">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #C9A96E, #A07840)' }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs font-medium" style={{ color: '#C9A96E' }}>{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section
        className="py-28 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #FAF8F5 0%, #FFF6EE 100%)' }}
      >
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#C9A96E 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #C9A96E, #E8D5B0)' }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#C9A96E' }}>Ready to Glow?</span>
              <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #E8D5B0, #C9A96E)' }} />
            </div>
            <h2 className="font-serif text-5xl font-semibold text-gray-900 leading-tight mb-6">
              Book Your Beauty<br />
              <span className="italic gold-text">Experience Today</span>
            </h2>
            <p className="text-lg text-gray-500 font-light mb-10 leading-relaxed">
              Treat yourself to the luxury you deserve. Our experts are ready to transform your look.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact" className="btn-primary">Book Appointment</Link>
              <Link to="/packages" className="btn-secondary">View Packages</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
