import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer style={{ background: 'linear-gradient(135deg, #0D0D0D 0%, #111111 100%)' }}>
      {/* Top border accent */}
      <div className="h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <span className="font-serif text-2xl font-bold tracking-[0.2em] uppercase text-white">Glamour</span>
              <br />
              <span className="text-[9px] tracking-[0.5em] uppercase font-semibold" style={{ color: '#C9A96E' }}>Studio</span>
            </div>
            <p className="text-sm leading-relaxed font-light mb-8" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Where beauty meets luxury. We craft experiences that make you feel confident, radiant, and truly beautiful.
            </p>
            <div className="flex gap-3">
              {['I', 'F', 'W'].map((s, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    color: 'rgba(255,255,255,0.4)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #C9A96E, #A07840)'
                    e.currentTarget.style.color = 'white'
                    e.currentTarget.style.border = 'none'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                    e.currentTarget.style.color = 'rgba(255,255,255,0.4)'
                    e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)'
                  }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] tracking-[0.35em] uppercase font-semibold mb-6" style={{ color: '#C9A96E' }}>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/services', label: 'Services' },
                { to: '/packages', label: 'Packages' },
                { to: '/gallery', label: 'Gallery' },
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm font-light transition-colors duration-200 flex items-center gap-2 group"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#C9A96E'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
                  >
                    <span
                      className="w-0 group-hover:w-3 h-[1px] transition-all duration-300"
                      style={{ background: '#C9A96E' }}
                    />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[10px] tracking-[0.35em] uppercase font-semibold mb-6" style={{ color: '#C9A96E' }}>
              Services
            </h4>
            <ul className="space-y-3">
              {['Hair Cut & Styling', 'Hair Coloring', 'Bridal Makeup', 'Facial & Cleanup', 'Nail Art', 'Keratin Treatment'].map((s) => (
                <li key={s}>
                  <Link
                    to="/services"
                    className="text-sm font-light transition-colors duration-200"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#C9A96E'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] tracking-[0.35em] uppercase font-semibold mb-6" style={{ color: '#C9A96E' }}>
              Visit Us
            </h4>
            <ul className="space-y-5">
              {[
                { icon: '📍', text: '123 Beauty Lane, Banjara Hills,\nHyderabad, Telangana 500034' },
                { icon: '📞', text: '+91 98765 43210' },
                { icon: '✉️', text: 'hello@glamourstudio.in' },
                { icon: '🕐', text: 'Mon–Sat: 9am – 8pm\nSunday: 10am – 6pm' },
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-base flex-shrink-0 mt-0.5">{item.icon}</span>
                  <span className="text-sm font-light whitespace-pre-line" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-xs font-light" style={{ color: 'rgba(255,255,255,0.25)' }}>
            © 2025 Glamour Studio. All rights reserved.
          </p>
          <p className="text-xs font-light" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Crafted with ♥ for beauty lovers
          </p>
        </div>
      </div>
    </footer>
  )
}
