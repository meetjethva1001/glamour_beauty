import { motion } from 'framer-motion'

export default function SectionHeader({ tag, title, subtitle, center = true, light = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className={`mb-16 ${center ? 'text-center' : ''}`}
    >
      {tag && (
        <div className={`flex items-center gap-3 mb-5 ${center ? 'justify-center' : ''}`}>
          <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #C9A96E, #E8D5B0)' }} />
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#C9A96E' }}>
            {tag}
          </span>
          <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #E8D5B0, #C9A96E)' }} />
        </div>
      )}

      <h2
        className="font-serif font-semibold leading-tight"
        style={{
          fontSize: 'clamp(2rem, 3.5vw, 3rem)',
          color: light ? '#ffffff' : '#111111',
        }}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`mt-5 text-base font-light leading-relaxed max-w-2xl ${center ? 'mx-auto' : ''}`}
          style={{ color: light ? 'rgba(255,255,255,0.6)' : '#777777' }}
        >
          {subtitle}
        </p>
      )}

      <div className={`flex items-center gap-2 mt-6 ${center ? 'justify-center' : ''}`}>
        <div className="w-10 h-0.5 rounded-full" style={{ background: '#C9A96E' }} />
        <div className="w-2 h-2 rounded-full" style={{ background: '#C9A96E', opacity: 0.4 }} />
        <div className="w-4 h-0.5 rounded-full" style={{ background: '#C9A96E', opacity: 0.25 }} />
      </div>
    </motion.div>
  )
}
