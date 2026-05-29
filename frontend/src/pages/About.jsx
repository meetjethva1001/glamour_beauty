import { motion } from 'framer-motion'
import SectionHeader from '../components/SectionHeader'

const values = [
  { icon: '🌿', title: 'Natural Beauty', desc: 'We believe in enhancing your natural beauty, not masking it.' },
  { icon: '💎', title: 'Premium Quality', desc: 'Only the finest products and techniques make it into our studio.' },
  { icon: '🤝', title: 'Client First', desc: 'Every decision we make starts and ends with your satisfaction.' },
  { icon: '🌱', title: 'Sustainability', desc: 'We are committed to eco-friendly practices and cruelty-free products.' },
]

export default function About() {
  return (
    <div className='pt-20 overflow-hidden'>

      <section className='py-20 text-center relative overflow-hidden'
        style={{ background: 'linear-gradient(135deg, #FAF8F5 0%, #FFF6EE 100%)' }}>
        <div className='absolute inset-0 opacity-[0.04] pointer-events-none'
          style={{ backgroundImage: 'radial-gradient(#C9A96E 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className='max-w-3xl mx-auto px-4 sm:px-6 relative z-10'>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className='flex items-center justify-center gap-3 mb-5'>
              <div className='w-8 h-px' style={{ background: 'linear-gradient(90deg, #C9A96E, #E8D5B0)' }} />
              <span className='text-xs font-semibold tracking-widest uppercase' style={{ color: '#C9A96E' }}>Our Story</span>
              <div className='w-8 h-px' style={{ background: 'linear-gradient(90deg, #E8D5B0, #C9A96E)' }} />
            </div>
            <h1 className='font-serif text-5xl sm:text-6xl font-semibold text-gray-900 mb-4'>About Us</h1>
            <p className='text-base sm:text-lg text-gray-500 font-light leading-relaxed'>
              A passion for beauty, a commitment to excellence, and a love for making people feel their best.
            </p>
          </motion.div>
        </div>
      </section>

      <section className='py-16 sm:py-24 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-16'>
          <div className='grid lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <span className='text-xs font-semibold tracking-widest uppercase block mb-4' style={{ color: '#C9A96E' }}>Est. 2012</span>
              <h2 className='font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-6 leading-tight'>
                Where Beauty Meets Artistry
              </h2>
              <p className='text-gray-500 font-light leading-relaxed mb-5'>
                Glamour Studio was born from a simple belief — every person deserves to feel beautiful, confident, and celebrated. Founded in 2012, our studio started as a small boutique salon in Hyderabad and has grown into one of the city's most trusted beauty destinations.
              </p>
              <p className='text-gray-500 font-light leading-relaxed mb-5'>
                Over the years, we have served thousands of clients — from brides on their most special day to professionals who want to look their best every day.
              </p>
              <p className='text-gray-500 font-light leading-relaxed'>
                We are more than a salon — we are a sanctuary where you can relax, rejuvenate, and rediscover your beauty.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <div className='rounded-3xl overflow-hidden' style={{ background: 'linear-gradient(135deg, #FFF8EE 0%, #FFF0F5 100%)' }}>
                <div className='p-8 sm:p-12 text-center'>
                  <div className='text-7xl sm:text-8xl mb-6'>🌸</div>
                  <p className='font-serif text-xl sm:text-2xl text-gray-600 italic leading-relaxed'>
                    Beauty is not in the face; beauty is a light in the heart.
                  </p>
                  <p className='text-gray-400 font-light text-sm mt-4'>— Kahlil Gibran</p>
                </div>
                <div className='grid grid-cols-3 border-t border-gray-100'>
                  {[['5K+','Clients'],['12+','Years'],['4.9★','Rating']].map(([val, label]) => (
                    <div key={label} className='py-5 sm:py-6 text-center border-r border-gray-100 last:border-r-0'>
                      <p className='font-serif text-xl sm:text-2xl font-bold text-gray-900'>{val}</p>
                      <p className='text-xs text-gray-400 tracking-widest uppercase font-medium mt-1'>{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className='py-16 sm:py-20' style={{ background: '#FAFAFA' }}>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-16'>
          <div className='grid md:grid-cols-2 gap-6'>
            {[
              { icon: '🎯', title: 'Our Mission', text: 'To provide exceptional beauty services in a luxurious, welcoming environment that makes every client feel valued, beautiful, and confident. We are committed to using the best products and techniques to deliver results that exceed expectations.' },
              { icon: '🔭', title: 'Our Vision', text: 'To be the most trusted and beloved beauty studio in India — known for our artistry, integrity, and the transformative experiences we create. We envision a world where everyone has access to premium beauty care.' },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className='bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-gray-100'>
                <div className='text-4xl mb-5'>{item.icon}</div>
                <h3 className='font-serif text-2xl font-semibold text-gray-900 mb-4'>{item.title}</h3>
                <p className='text-gray-500 font-light leading-relaxed'>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className='py-16 sm:py-20 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-16'>
          <SectionHeader tag='What We Stand For' title='Our Core Values' />
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className='text-center p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white'>
                <div className='text-3xl sm:text-4xl mb-4'>{v.icon}</div>
                <h4 className='font-serif text-base sm:text-lg font-semibold text-gray-900 mb-2'>{v.title}</h4>
                <p className='text-xs text-gray-500 font-light leading-relaxed'>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className='py-16 sm:py-24 relative overflow-hidden'
        style={{ background: 'linear-gradient(135deg, #111111, #1a1a1a)' }}>
        <div className='absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none'
          style={{ background: 'radial-gradient(circle, #C9A96E, transparent)', transform: 'translate(30%, -30%)' }} />
        <div className='max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10'>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className='flex items-center justify-center gap-3 mb-5'>
              <div className='w-8 h-px' style={{ background: 'linear-gradient(90deg, #C9A96E, #E8D5B0)' }} />
              <span className='text-xs font-semibold tracking-widest uppercase' style={{ color: '#C9A96E' }}>Ready to Glow?</span>
              <div className='w-8 h-px' style={{ background: 'linear-gradient(90deg, #E8D5B0, #C9A96E)' }} />
            </div>
            <h2 className='font-serif text-4xl sm:text-5xl font-semibold text-white mb-5'>
              Experience the Glamour Difference
            </h2>
            <p className='text-base sm:text-lg text-gray-400 font-light mb-10 leading-relaxed'>
              Book your appointment today and let our experts take care of you.
            </p>
            <a href='/contact' className='btn-primary inline-flex'>Book Appointment</a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
