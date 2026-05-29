import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/packages', label: 'Packages' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = () => { logout(); navigate('/'); setMenuOpen(false) }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
      style={{
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.08)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link to="/" className="flex flex-col leading-none">
            <span className="font-serif text-xl font-bold tracking-[0.15em] uppercase text-gray-900">GLAMOUR</span>
            <span className="text-[9px] tracking-[0.5em] uppercase font-semibold" style={{ color: '#C9A96E' }}>Studio</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `text-xs font-semibold tracking-widest uppercase transition-all duration-300 relative group ${
                    isActive ? '' : 'text-gray-600 hover:text-gray-900'
                  }`
                }
                style={({ isActive }) => ({ color: isActive ? '#C9A96E' : undefined })}
              >
                {({ isActive }) => (
                  <>
                    {label}
                    <span
                      className="absolute -bottom-1 left-0 h-0.5 rounded-full transition-all duration-300"
                      style={{
                        background: 'linear-gradient(90deg, #C9A96E, #E8D5B0)',
                        width: isActive ? '100%' : '0%',
                      }}
                    />
                    <span
                      className="absolute -bottom-1 left-0 h-0.5 rounded-full w-0 group-hover:w-full transition-all duration-300"
                      style={{ background: 'linear-gradient(90deg, #C9A96E, #E8D5B0)' }}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Auth */}
          <div className="hidden lg:flex items-center gap-5">
            {user ? (
              <>
                <Link
                  to={user.role === 'admin' ? '/admin' : '/dashboard'}
                  className="text-xs font-semibold tracking-widest uppercase text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {user.name?.split(' ')[0]}
                </Link>
                <button onClick={handleLogout} className="btn-secondary text-xs py-2.5 px-5">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-xs font-semibold tracking-widest uppercase text-gray-600 hover:text-gray-900 transition-colors">
                  Login
                </Link>
                <Link to="/signup" className="btn-primary text-xs py-3 px-6">Book Now</Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-5">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  onClick={() => setMenuOpen(false)}
                  className="text-xs font-semibold tracking-widest uppercase text-gray-600"
                  style={({ isActive }) => ({ color: isActive ? '#C9A96E' : undefined })}
                >
                  {label}
                </NavLink>
              ))}
              <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
                {user ? (
                  <>
                    <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} onClick={() => setMenuOpen(false)}
                      className="text-xs font-semibold tracking-widest uppercase text-gray-600">My Account</Link>
                    <button onClick={handleLogout} className="btn-secondary text-center">Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMenuOpen(false)}
                      className="text-xs font-semibold tracking-widest uppercase text-gray-600 text-center">Login</Link>
                    <Link to="/signup" onClick={() => setMenuOpen(false)} className="btn-primary text-center">Book Now</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
