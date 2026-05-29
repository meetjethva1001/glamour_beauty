import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-rose-50 flex items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-block mb-6">
            <span className="font-serif text-2xl font-light tracking-widest text-stone-800">GLAMOUR</span>
            <br />
            <span className="text-[10px] tracking-[0.35em] text-amber-600 font-light uppercase">Studio</span>
          </Link>
          <h1 className="font-serif text-3xl font-light text-stone-800">Reset Password</h1>
          <p className="text-stone-500 font-light text-sm mt-2">We'll send you a reset link</p>
        </div>

        <div className="bg-white border border-stone-100 p-10 shadow-sm">
          {sent ? (
            <div className="text-center">
              <div className="text-5xl mb-4">📧</div>
              <h3 className="font-serif text-xl font-light text-stone-800 mb-2">Check Your Email</h3>
              <p className="text-stone-500 font-light text-sm">We've sent a password reset link to <strong>{email}</strong></p>
              <Link to="/login" className="inline-block mt-6 text-xs tracking-widest uppercase font-light text-amber-600 hover:text-amber-700">
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs tracking-[0.2em] uppercase text-stone-500 font-light mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  className="w-full border border-stone-200 px-4 py-3 text-sm font-light text-stone-700 placeholder-stone-300 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-4 bg-stone-900 text-white text-sm tracking-widest uppercase font-light hover:bg-amber-600 transition-all duration-300 disabled:opacity-60">
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
              <p className="text-center">
                <Link to="/login" className="text-xs text-stone-400 hover:text-stone-600 font-light">← Back to Login</Link>
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  )
}
