import { useState } from 'react'
import { motion } from 'framer-motion'
import { inquiriesApi } from '../api'

const contactInfo = [
  { icon: '📍', label: 'Address', value: '123 Beauty Lane, Banjara Hills, Hyderabad, Telangana 500034' },
  { icon: '📞', label: 'Phone', value: '+91 98765 43210' },
  { icon: '✉️', label: 'Email', value: 'hello@glamourstudio.in' },
  { icon: '🕐', label: 'Hours', value: 'Mon–Sat: 9am – 8pm  |  Sunday: 10am – 6pm' },
]

function validate(form) {
  const errors = {}
  if (!form.name.trim()) {
    errors.name = 'Name is required'
  } else if (form.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters'
  }
  if (!form.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^s@]+@[^s@]+.[^s@]+$/.test(form.email)) {
    errors.email = 'Enter a valid email address'
  }
  if (form.phone && !/^[+]?[0-9s-]{8,15}$/.test(form.phone)) {
    errors.phone = 'Enter a valid phone number'
  }
  if (!form.message.trim()) {
    errors.message = 'Message is required'
  } else if (form.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters'
  }
  return errors
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const updated = { ...form, [e.target.name]: e.target.value }
    setForm(updated)
    if (touched[e.target.name]) {
      setErrors(validate(updated))
    }
  }

  const handleBlur = (e) => {
    setTouched(prev => ({ ...prev, [e.target.name]: true }))
    setErrors(validate(form))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const allTouched = { name: true, email: true, phone: true, message: true }
    setTouched(allTouched)
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setLoading(true)
    try {
      await inquiriesApi.create(form)
      setSubmitted(true)
    } catch (err) {
      setErrors({ message: err.response?.data?.message || 'Failed to send message. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const inputCls = (name) => {
    const base = 'w-full px-5 py-4 rounded-xl text-sm font-light outline-none transition-all duration-300 '
    if (touched[name] && errors[name]) {
      return base + 'border-2 border-red-400 bg-red-50'
    }
    return base + 'border border-gray-200 bg-gray-50 focus:border-yellow-500 focus:bg-white'
  }

  const resetForm = () => {
    setSubmitted(false)
    setForm({ name: '', email: '', phone: '', service: '', message: '' })
    setTouched({})
    setErrors({})
  }

  return (
    <div className="pt-20 overflow-hidden">

      <section className="py-20 text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #FAF8F5 0%, #FFF6EE 100%)' }}>
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#C9A96E 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #C9A96E, #E8D5B0)' }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#C9A96E' }}>Get in Touch</span>
              <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #E8D5B0, #C9A96E)' }} />
            </div>
            <h1 className="font-serif text-5xl sm:text-6xl font-semibold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-base sm:text-lg text-gray-500 font-light leading-relaxed">
              Ready to book your beauty experience? We would love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">

            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-gray-900 mb-2">Send Us a Message</h2>
              <p className="text-gray-500 font-light mb-8">We will get back to you within 24 hours.</p>

              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="rounded-3xl p-10 sm:p-12 text-center"
                  style={{ background: 'linear-gradient(135deg, #FAF8F5, #FFF6EE)', border: '1px solid rgba(201,169,110,0.2)' }}>
                  <div className="text-6xl mb-5">🌸</div>
                  <h3 className="font-serif text-2xl font-semibold text-gray-900 mb-3">Message Sent!</h3>
                  <p className="text-gray-500 font-light mb-1">Your message has been received by our team.</p>
                  <p className="text-gray-400 text-sm font-light">We will get back to you within 24 hours.</p>
                  <button onClick={resetForm} className="mt-8 text-xs font-semibold tracking-widest uppercase" style={{ color: '#C9A96E' }}>
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2">
                        Full Name <span style={{ color: '#C9A96E' }}>*</span>
                      </label>
                      <input type="text" name="name" value={form.name} onChange={handleChange} onBlur={handleBlur}
                        placeholder="Your full name" className={inputCls('name')} />
                      {touched.name && errors.name && (
                        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                          className="text-xs font-medium mt-1.5" style={{ color: '#EF4444' }}>
                          ⚠ {errors.name}
                        </motion.p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2">
                        Email <span style={{ color: '#C9A96E' }}>*</span>
                      </label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} onBlur={handleBlur}
                        placeholder="your@email.com" className={inputCls('email')} />
                      {touched.email && errors.email && (
                        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                          className="text-xs font-medium mt-1.5" style={{ color: '#EF4444' }}>
                          ⚠ {errors.email}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2">Phone</label>
                      <input type="tel" name="phone" value={form.phone} onChange={handleChange} onBlur={handleBlur}
                        placeholder="+91 XXXXX XXXXX" className={inputCls('phone')} />
                      {touched.phone && errors.phone && (
                        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                          className="text-xs font-medium mt-1.5" style={{ color: '#EF4444' }}>
                          ⚠ {errors.phone}
                        </motion.p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2">Service</label>
                      <select name="service" value={form.service} onChange={handleChange} className={inputCls('service')}>
                        <option value="">Select a service</option>
                        <option>Hair Cut and Styling</option>
                        <option>Hair Coloring</option>
                        <option>Bridal Makeup</option>
                        <option>Facial and Cleanup</option>
                        <option>Nail Art</option>
                        <option>Packages</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2">
                      Message <span style={{ color: '#C9A96E' }}>*</span>
                    </label>
                    <textarea name="message" value={form.message} onChange={handleChange} onBlur={handleBlur}
                      rows={5} placeholder="Tell us about your requirements (min. 10 characters)..."
                      className={inputCls('message') + ' resize-none'} />
                    {touched.message && errors.message && (
                      <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                        className="text-xs font-medium mt-1.5" style={{ color: '#EF4444' }}>
                        ⚠ {errors.message}
                      </motion.p>
                    )}
                  </div>

                  {Object.keys(errors).length > 0 && Object.keys(touched).length > 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="flex items-center gap-3 p-4 rounded-xl text-sm font-medium"
                      style={{ background: '#FFF0F0', border: '1px solid #FFCCCC', color: '#CC3333' }}>
                      ⚠️ Please fix the errors above before submitting.
                    </motion.div>
                  )}

                  <button type="submit" disabled={loading} className="btn-primary w-full py-4"
                    style={{ opacity: loading ? 0.7 : 1 }}>
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : 'Send Message'}
                  </button>
                </form>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-gray-900 mb-2">Visit Our Studio</h2>
              <p className="text-gray-500 font-light mb-8">We would love to see you in person.</p>

              <div className="space-y-3 mb-8">
                {contactInfo.map(info => (
                  <div key={info.label} className="flex gap-4 p-4 sm:p-5 rounded-2xl"
                    style={{ background: '#FAFAFA', border: '1px solid rgba(0,0,0,0.05)' }}>
                    <span className="text-xl sm:text-2xl flex-shrink-0 mt-0.5">{info.icon}</span>
                    <div>
                      <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: '#C9A96E' }}>{info.label}</p>
                      <p className="text-sm text-gray-600 font-light leading-relaxed">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl overflow-hidden mb-8"
                style={{ background: 'linear-gradient(135deg, #F0F0F0, #E8E8E8)', border: '1px solid rgba(0,0,0,0.06)', aspectRatio: '16/9' }}>
                <div className="w-full h-full flex items-center justify-center p-6">
                  <div className="text-center">
                    <div className="text-4xl sm:text-5xl mb-3">🗺️</div>
                    <p className="text-sm font-semibold text-gray-500">Google Maps Integration</p>
                    <p className="text-xs text-gray-400 font-light mt-1">123 Beauty Lane, Banjara Hills, Hyderabad</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4">Follow Us</p>
                <div className="flex flex-wrap gap-3">
                  {[{ name: 'Instagram', icon: '📸' }, { name: 'Facebook', icon: '👍' }, { name: 'WhatsApp', icon: '💬' }].map(s => (
                    <a key={s.name} href="#"
                      className="flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold tracking-widest uppercase transition-all duration-300"
                      style={{ background: '#F8F8F8', border: '1px solid #EEEEEE', color: '#666666' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg, #C9A96E, #A07840)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.border = 'none' }}
                      onMouseLeave={e => { e.currentTarget.style.background = '#F8F8F8'; e.currentTarget.style.color = '#666666'; e.currentTarget.style.border = '1px solid #EEEEEE' }}>
                      <span>{s.icon}</span> {s.name}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
