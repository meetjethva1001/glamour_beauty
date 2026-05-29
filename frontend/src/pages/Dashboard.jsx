import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { bookingsApi } from '../api'

const tabs = ['Overview', 'Bookings', 'Favorites', 'Profile']

export default function Dashboard() {
  const { user, updateUser } = useAuth()
  const [activeTab, setActiveTab] = useState('Overview')
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [profileForm, setProfileForm] = useState({ name: user?.name || '', phone: user?.phone || '' })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetchMyBookings()
  }, [])

  const fetchMyBookings = async () => {
    try {
      const res = await bookingsApi.getMy()
      setBookings(res.data.bookings)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveProfile = (e) => {
    e.preventDefault()
    updateUser(profileForm)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="pt-20 min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-3xl font-light text-stone-800">
                Welcome, {user?.name?.split(' ')[0]} 🌸
              </h1>
              <p className="text-stone-500 font-light text-sm mt-1">{user?.email}</p>
            </div>
            <div className="w-14 h-14 bg-amber-100 flex items-center justify-center text-lg font-serif text-amber-700">
              {user?.name?.charAt(0) || 'U'}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 mt-8 border-b border-stone-100 -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-xs tracking-[0.2em] uppercase font-light transition-colors border-b-2 ${activeTab === tab
                    ? 'border-amber-500 text-amber-600'
                    : 'border-transparent text-stone-500 hover:text-stone-700'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        {/* Overview */}
        {activeTab === 'Overview' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Bookings', value: bookings.length, icon: '📅' },
                { label: 'Completed', value: bookings.filter(b => b.status === 'completed').length, icon: '✅' },
                { label: 'Confirmed', value: bookings.filter(b => b.status === 'confirmed').length, icon: '⏰' },
                { label: 'Pending', value: bookings.filter(b => b.status === 'pending').length, icon: '⏳' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white border border-stone-100 p-6">
                  <div className="text-2xl mb-3">{stat.icon}</div>
                  <p className="font-serif text-3xl text-stone-800 font-light">{stat.value}</p>
                  <p className="text-xs tracking-widest uppercase text-stone-400 font-light mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="bg-white border border-stone-100 p-8">
              <h3 className="font-serif text-xl font-light text-stone-800 mb-6">Recent Bookings</h3>
              <div className="space-y-4">
                {bookings.slice(0, 3).map((b) => (
                  <div key={b._id} className="flex items-center justify-between py-3 border-b border-stone-50">
                    <div>
                      <p className="text-sm text-stone-700 font-light">{b.service?.title || (b.package?.name + ' (Pkg)')}</p>
                      <p className="text-xs text-stone-400 font-light mt-0.5">{new Date(b.date).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-serif text-stone-700">Rs.{b.amount}</span>
                      <span className={`text-[10px] tracking-widest uppercase px-2.5 py-1 font-light ${b.status === 'completed' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                        {b.status}
                      </span>
                    </div>
                  </div>
                ))}
                {bookings.length === 0 && <p className="text-stone-400 text-sm italic py-4">No bookings yet.</p>}
              </div>
            </div>
          </motion.div>
        )}

        {/* Bookings */}
        {activeTab === 'Bookings' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="bg-white border border-stone-100 p-8">
              <h3 className="font-serif text-xl font-light text-stone-800 mb-6">Booking History</h3>
              <div className="space-y-4">
                {bookings.map((b) => (
                  <div key={b._id} className="flex items-center justify-between py-4 border-b border-stone-50 last:border-0">
                    <div>
                      <p className="text-sm text-stone-700 font-light">{b.service?.title || (b.package?.name + ' (Pkg)')}</p>
                      <p className="text-xs text-stone-400 font-light mt-0.5">{new Date(b.date).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-serif text-stone-700">Rs.{b.amount}</span>
                      <span className={`text-[10px] tracking-widest uppercase px-2.5 py-1 font-light ${b.status === 'completed' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                        {b.status}
                      </span>
                    </div>
                  </div>
                ))}
                {bookings.length === 0 && <p className="text-stone-400 text-sm italic py-4">No booking history available.</p>}
              </div>
            </div>
          </motion.div>
        )}

        {/* Favorites */}
        {/* {activeTab === 'Favorites' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteServices.map((s) => (
                <div key={s.id} className="bg-white border border-stone-100 p-6">
                  <div className="text-3xl mb-3">{s.icon}</div>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-amber-500 font-light">{s.category}</span>
                  <h4 className="font-serif text-lg font-light text-stone-800 mt-1 mb-2">{s.title}</h4>
                  <p className="text-sm text-stone-500 font-light">{s.price} · {s.duration}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )} */}

        {/* Profile */}
        {activeTab === 'Profile' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="bg-white border border-stone-100 p-8 max-w-lg">
              <h3 className="font-serif text-xl font-light text-stone-800 mb-6">Account Settings</h3>
              <form onSubmit={handleSaveProfile} className="space-y-5">
                <div>
                  <label className="block text-xs tracking-[0.2em] uppercase text-stone-500 font-light mb-2">Full Name</label>
                  <input type="text" value={profileForm.name} onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full border border-stone-200 px-4 py-3 text-sm font-light text-stone-700 focus:outline-none focus:border-amber-400 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.2em] uppercase text-stone-500 font-light mb-2">Email</label>
                  <input type="email" value={user?.email} disabled
                    className="w-full border border-stone-100 px-4 py-3 text-sm font-light text-stone-400 bg-stone-50 cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.2em] uppercase text-stone-500 font-light mb-2">Phone</label>
                  <input type="tel" value={profileForm.phone} onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full border border-stone-200 px-4 py-3 text-sm font-light text-stone-700 focus:outline-none focus:border-amber-400 transition-colors" />
                </div>
                <button type="submit"
                  className="px-8 py-3 bg-stone-900 text-white text-xs tracking-widest uppercase font-light hover:bg-amber-600 transition-all duration-300">
                  {saved ? '✓ Saved!' : 'Save Changes'}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
