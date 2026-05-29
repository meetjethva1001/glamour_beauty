import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import api from '../api'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await api.post('/auth/login', form)
      const { success, user, token, message } = res.data
      
      if (success) {
        login(user, token)
        if (user.role === 'admin') {
          navigate('/admin')
        } else {
          navigate('/dashboard')
        }
      } else {
        setError(message || 'Invalid credentials')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Connection to server failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Decorative */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center p-16 relative overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)' }}
      >
        {/* Background circles */}
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #C9A96E, transparent)', transform: 'translate(-40%, -40%)' }} />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #C9A96E, transparent)', transform: 'translate(40%, 40%)' }} />

        <div className="relative z-10 text-center max-w-sm">
          <div className="text-7xl mb-8">💆‍♀️</div>
          <h2 className="text-4xl font-serif text-white mb-4 leading-tight">
            Your Beauty,<br />
            <span className="gold-text italic">Our Passion</span>
          </h2>
          <p className="text-gray-400 font-light leading-relaxed text-base">
            Join thousands of clients who trust Glamour Studio for their beauty needs.
          </p>

          <div className="flex justify-center gap-8 mt-12 pt-8 border-t border-white/10">
            {[['5K+', 'Clients'], ['12+', 'Years'], ['4.9★', 'Rating']].map(([val, label]) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-serif font-bold" style={{ color: '#C9A96E' }}>{val}</p>
                <p className="text-xs text-gray-500 tracking-widest uppercase mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-white">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <Link to="/" className="flex flex-col mb-10">
            <span className="font-serif text-3xl font-bold tracking-widest text-gray-900">GLAMOUR</span>
            <span className="text-xs tracking-[0.5em] uppercase font-semibold mt-0.5" style={{ color: '#C9A96E' }}>Studio</span>
          </Link>

          <h1 className="font-serif text-4xl font-semibold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-500 font-light mb-10 text-base">Sign in to your account to continue</p>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 p-4 rounded-xl mb-6 text-sm"
              style={{ background: '#FFF0F0', border: '1px solid #FFCCCC', color: '#CC3333' }}
            >
              <span>⚠️</span> {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2">
                Email Address
              </label>
              <input
                type="email" name="email" value={form.email} onChange={handleChange}
                required placeholder="your@email.com"
                className="input-field"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold tracking-widest uppercase text-gray-400">
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs font-medium" style={{ color: '#C9A96E' }}>
                  Forgot password?
                </Link>
              </div>
              <input
                type="password" name="password" value={form.password} onChange={handleChange}
                required placeholder="Enter your password"
                className="input-field"
              />
            </div>

            <button
              type="submit" disabled={loading}
              className="btn-primary w-full mt-2"
              style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing In...
                </span>
              ) : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 font-light mt-8">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold" style={{ color: '#C9A96E' }}>
              Create one free
            </Link>
          </p>

          <div className="mt-8 p-4 rounded-xl text-center" style={{ background: '#FAFAFA', border: '1px solid #F0F0F0' }}>
            <p className="text-xs text-gray-400 font-light">
              Demo Admin: <span className="font-medium text-gray-600">admin@glamour.com</span> / <span className="font-medium text-gray-600">admin123</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
