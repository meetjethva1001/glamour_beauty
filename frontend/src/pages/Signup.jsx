import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import api from '../api'

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) return setError('Passwords do not match.')
    if (form.password.length < 6) return setError('Password must be at least 6 characters.')
    
    setLoading(true)
    try {
      const res = await api.post('/auth/signup', {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password
      })
      const { success, user, token, message } = res.data
      if (success) {
        login(user, token)
        navigate('/dashboard')
      } else {
        setError(message || 'Account creation failed')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating account. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center p-16 relative overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)' }}
      >
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #C9A96E, transparent)', transform: 'translate(-40%, -40%)' }} />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #C9A96E, transparent)', transform: 'translate(40%, 40%)' }} />

        <div className="relative z-10 text-center max-w-sm">
          <div className="text-7xl mb-8">✨</div>
          <h2 className="text-4xl font-serif text-white mb-4 leading-tight">
            Begin Your<br />
            <span className="gold-text italic">Beauty Journey</span>
          </h2>
          <p className="text-gray-400 font-light leading-relaxed text-base">
            Create your account and unlock exclusive beauty packages, booking history, and personalized recommendations.
          </p>

          <div className="mt-10 space-y-4">
            {['✓ Access exclusive member packages', '✓ Track your booking history', '✓ Save your favourite services', '✓ Get personalized recommendations'].map(item => (
              <p key={item} className="text-sm text-gray-400 font-light text-left">{item}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-white overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md py-8"
        >
          <Link to="/" className="flex flex-col mb-10">
            <span className="font-serif text-3xl font-bold tracking-widest text-gray-900">GLAMOUR</span>
            <span className="text-xs tracking-[0.5em] uppercase font-semibold mt-0.5" style={{ color: '#C9A96E' }}>Studio</span>
          </Link>

          <h1 className="font-serif text-4xl font-semibold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-500 font-light mb-10 text-base">Join the Glamour Studio family today</p>

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
              <label className="block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2">Full Name</label>
              <input type="text" name="name" value={form.name} onChange={handleChange}
                required placeholder="Your full name" className="input-field" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2">Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange}
                  required placeholder="your@email.com" className="input-field" />
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2">Phone</label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX" className="input-field" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2">Password</label>
              <input type="password" name="password" value={form.password} onChange={handleChange}
                required placeholder="Minimum 6 characters" className="input-field" />
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2">Confirm Password</label>
              <input type="password" name="confirm" value={form.confirm} onChange={handleChange}
                required placeholder="Repeat your password" className="input-field" />
            </div>

            <button
              type="submit" disabled={loading}
              className="btn-primary w-full mt-2"
              style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Account...
                </span>
              ) : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 font-light mt-8">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold" style={{ color: '#C9A96E' }}>Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
