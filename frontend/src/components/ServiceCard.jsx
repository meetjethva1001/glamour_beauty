import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const categoryConfig = {
  Hair:     { bg: '#FFF8EE', accent: '#F59E0B', dot: '#FDE68A' },
  Skin:     { bg: '#FFF0F5', accent: '#EC4899', dot: '#FBCFE8' },
  Nails:    { bg: '#F5F0FF', accent: '#8B5CF6', dot: '#DDD6FE' },
  Wellness: { bg: '#F0FFF4', accent: '#10B981', dot: '#A7F3D0' },
}

export default function ServiceCard({ service, index = 0 }) {
  const cfg = categoryConfig[service.category] || { bg: '#F9F9F9', accent: '#C9A96E', dot: '#E8D5B0' }

  return (
    <Link to={`/services/${service._id}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: index * 0.07 }}
        whileHover={{ y: -6, transition: { duration: 0.25 } }}
        className="relative bg-white rounded-3xl overflow-hidden group cursor-pointer h-full"
        style={{
          boxShadow: '0 10px 30px -5px rgba(0,0,0,0.08)',
          border: '1px solid rgba(0,0,0,0.08)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = '0 25px 60px -12px rgba(0,0,0,0.15)'
          e.currentTarget.style.borderColor = 'rgba(201,169,110,0.4)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = '0 10px 30px -5px rgba(0,0,0,0.08)'
          e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'
        }}
      >
        {/* Top accent bar */}
        <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${cfg.accent}, ${cfg.dot})` }} />

      {/* Popular badge */}
      {service.popular && (
        <div
          className="absolute top-5 right-5 text-white text-xs font-semibold px-3 py-1 rounded-full"
          style={{ background: 'linear-gradient(135deg, #C9A96E, #A07840)', fontSize: '10px', letterSpacing: '0.1em' }}
        >
          Popular
        </div>
      )}

      <div className="p-7">
        {/* Icon */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 transition-transform duration-300 group-hover:scale-110"
          style={{ background: cfg.bg }}
        >
          {service.icon}
        </div>

        {/* Category */}
        <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: cfg.accent }}>
          {service.category}
        </span>

        {/* Title */}
        <h3
          className="font-serif text-xl font-semibold mt-2 mb-3 text-gray-900 transition-colors duration-300 group-hover:text-yellow-700"
          style={{ lineHeight: 1.3 }}
        >
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 font-light leading-relaxed mb-6">
          {service.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-5 border-t border-gray-100">
          <span className="font-serif text-2xl font-bold text-gray-900">Rs.{service.price}</span>
          <span className="text-xs text-gray-400 font-medium">⏱ {service.duration}</span>
        </div>
      </div>
      </motion.div>
    </Link>
  )
}
