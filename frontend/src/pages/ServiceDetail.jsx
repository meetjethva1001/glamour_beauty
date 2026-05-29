import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { servicesApi, bookingsApi } from '../api'
import { useAuth } from '../context/AuthContext'

export default function ServiceDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [bookingDate, setBookingDate] = useState('')
  const [bookingTime, setBookingTime] = useState('')
  const [notes, setNotes] = useState('')
  const [bookingLoading, setBookingLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await servicesApi.getOne(id)
        setService(res.data.service)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchService()
  }, [id])

  const handleBooking = async (e) => {
    e.preventDefault()
    if (!user) {
      navigate('/login', { state: { from: `/services/${id}` } })
      return
    }

    if (!bookingDate || !bookingTime) {
      alert('Please select a date and time')
      return
    }

    setBookingLoading(true)
    try {
      const combinedDate = new Date(`${bookingDate}T${bookingTime}`)
      await bookingsApi.create({
        service: id,
        date: combinedDate,
        amount: selectedVariant ? selectedVariant.price : service.price,
        variant: selectedVariant ? selectedVariant.title : null,
        notes
      })
      setSuccess(true)
    } catch (err) {
      alert(err.response?.data?.message || 'Booking failed')
    } finally {
      setBookingLoading(false)
    }
  }

  if (loading) return <div className="pt-40 text-center font-serif text-2xl">Loading Service Details...</div>
  if (!service) return <div className="pt-40 text-center font-serif text-2xl text-red-500">Service not found</div>

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Left: Service Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6" style={{ background: '#FAF8F5' }}>
                {service.icon}
              </div>
              <span className="text-xs font-semibold tracking-widest uppercase text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full mb-4 inline-block">
                {service.category}
              </span>
              <h1 className="font-serif text-4xl font-bold text-gray-900 mb-4">{service.title}</h1>
              <p className="text-gray-500 font-light leading-relaxed text-lg mb-8">{service.description}</p>
              
              <div className="flex items-center gap-10 py-6 border-t border-gray-50">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Price</p>
                  <p className="font-serif text-3xl font-bold text-gray-900">Rs.{selectedVariant ? selectedVariant.price : service.price}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Duration</p>
                  <p className="font-sans text-xl font-medium text-gray-700">{selectedVariant ? selectedVariant.duration : service.duration}</p>
                </div>
              </div>

              {service.variants && service.variants.length > 0 && (
                <div className="mt-8 pt-8 border-t border-gray-50">
                  <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4">Choose Variation</p>
                  <div className="grid gap-3">
                    <button 
                      onClick={() => setSelectedVariant(null)}
                      className={`p-4 rounded-2xl border text-left transition-all ${!selectedVariant ? 'border-yellow-500 bg-yellow-50/30' : 'border-gray-100'}`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-900">Standard / Base</span>
                        <span className="text-sm font-bold text-gray-900">Rs.{service.price}</span>
                      </div>
                    </button>
                    {service.variants.map((v, i) => (
                      <button 
                        key={i}
                        onClick={() => setSelectedVariant(v)}
                        className={`p-4 rounded-2xl border text-left transition-all ${selectedVariant?.title === v.title ? 'border-yellow-500 bg-yellow-50/30' : 'border-gray-100'}`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-900">{v.title}</span>
                          <span className="text-sm font-bold text-gray-900">Rs.{v.price}</span>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">⏱ {v.duration}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right: Booking Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="bg-white rounded-3xl p-10 shadow-xl border border-yellow-100 relative overflow-hidden">
              {success ? (
                <div className="text-center py-10">
                  <div className="text-6xl mb-6">🗓️</div>
                  <h2 className="font-serif text-3xl font-bold text-gray-900 mb-4">Booking Successful!</h2>
                  <p className="text-gray-500 mb-8">Your appointment has been scheduled. We look forward to seeing you!</p>
                  <button onClick={() => navigate('/services')} className="btn-primary">Back to Services</button>
                </div>
              ) : (
                <>
                  <h3 className="font-serif text-2xl font-bold text-gray-900 mb-6">Book an Appointment</h3>
                  <form onSubmit={handleBooking} className="space-y-6">
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2">Preferred Date</label>
                      <input type="date" value={bookingDate} onChange={e => setBookingDate(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 outline-none focus:border-yellow-500" required min={new Date().toISOString().split('T')[0]} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2">Preferred Time</label>
                      <input type="time" value={bookingTime} onChange={e => setBookingTime(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 outline-none focus:border-yellow-500" required />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2">Notes (Optional)</label>
                      <textarea value={notes} onChange={e => setNotes(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 outline-none focus:border-yellow-500" rows={3} placeholder="Any special requests?"></textarea>
                    </div>
                    <button type="submit" disabled={bookingLoading} className="btn-primary w-full py-4 text-sm tracking-widest">
                      {bookingLoading ? 'Processing...' : 'Confirm My Booking'}
                    </button>
                    {!user && <p className="text-center text-xs text-gray-400">You will need to login to confirm your booking.</p>}
                  </form>
                </>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}
