import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useServices, usePackages } from '../hooks/useStore'
import { servicesApi, packagesApi, bookingsApi } from '../api'

const CATEGORIES = ['Hair', 'Skin', 'Nails', 'Wellness']
const TABS = ['Dashboard', 'Services', 'Packages', 'Bookings', 'Inquiries', 'Users']

const Modal = ({ title, onClose, children }) => (
  <div className='fixed inset-0 z-50 flex items-center justify-center p-4' style={{ background: 'rgba(0,0,0,0.6)' }}>
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
      className='bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl'>
      <div className='flex items-center justify-between px-8 py-5 border-b border-gray-100'>
        <h3 className='font-serif text-xl font-semibold text-gray-900'>{title}</h3>
        <button onClick={onClose} className='text-gray-400 hover:text-gray-700 text-xl font-light'>x</button>
      </div>
      <div className='p-8'>{children}</div>
    </motion.div>
  </div>
)

export default function AdminPanel() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('Dashboard')

  const { services, refresh: refreshServices } = useServices()
  const { packages, refresh: refreshPackages } = usePackages()
  const [bookings, setBookings] = useState([])
  const [inquiries, setInquiries] = useState([])

  useEffect(() => {
    if (activeTab === 'Bookings') {
      fetchBookings()
    } else if (activeTab === 'Inquiries') {
      fetchInquiries()
    }
  }, [activeTab])

  const fetchInquiries = async () => {
    try {
      const res = await inquiriesApi.getAll()
      setInquiries(res.data.inquiries)
    } catch (err) {
      console.error(err)
    }
  }

  const changeInquiryStatus = async (id, status) => {
    try {
      await inquiriesApi.updateStatus(id, status)
      fetchInquiries()
    } catch (err) {
      alert('Error updating inquiry status')
    }
  }

  const fetchBookings = async () => {
    try {
      const res = await bookingsApi.getAll()
      setBookings(res.data.bookings)
    } catch (err) {
      console.error(err)
    }
  }

  const updateBookingStatus = async (id, status) => {
    try {
      await bookingsApi.updateStatus(id, status)
      fetchBookings()
    } catch (err) {
      alert('Error updating status')
    }
  }

  const [showServiceModal, setShowServiceModal] = useState(false)
  const [editingService, setEditingService] = useState(null)
  const [serviceForm, setServiceForm] = useState({ title: '', category: 'Hair', price: '', duration: '', description: '', popular: false })

  const [showPackageModal, setShowPackageModal] = useState(false)
  const [editingPackage, setEditingPackage] = useState(null)
  const [pkgForm, setPkgForm] = useState({ name: '', tag: '', price: '', originalPrice: '', features: '', popular: false })

  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const openAddService = () => { setEditingService(null); setServiceForm({ title: '', category: 'Hair', price: '', duration: '', description: '', popular: false }); setShowServiceModal(true) }
  const openEditService = (s) => { setEditingService(s); setServiceForm({ title: s.title, category: s.category, price: s.price, duration: s.duration, description: s.description || '', popular: s.popular }); setShowServiceModal(true) }

  const saveService = async () => {
    try {
      if (editingService) {
        await servicesApi.update(editingService._id, serviceForm)
      } else {
        await servicesApi.create(serviceForm)
      }
      refreshServices()
      setShowServiceModal(false)
    } catch (err) {
      alert('Error saving service: ' + err.message)
    }
  }

  const deleteService = async (id) => {
    try {
      await servicesApi.delete(id)
      refreshServices()
      setDeleteConfirm(null)
    } catch (err) {
      alert('Error deleting service: ' + err.message)
    }
  }

  const openAddPackage = () => { setEditingPackage(null); setPkgForm({ name: '', tag: '', price: '', originalPrice: '', features: '', popular: false }); setShowPackageModal(true) }
  const openEditPackage = (p) => { setEditingPackage(p); setPkgForm({ name: p.name, tag: p.tag, price: p.price, originalPrice: p.originalPrice, features: p.features.join(', '), popular: p.popular }); setShowPackageModal(true) }

  const savePackage = async () => {
    try {
      const pkg = { ...pkgForm, features: pkgForm.features.split(',').map(f => f.trim()).filter(Boolean) }
      if (editingPackage) {
        await packagesApi.update(editingPackage._id, pkg)
      } else {
        await packagesApi.create(pkg)
      }
      refreshPackages()
      setShowPackageModal(false)
    } catch (err) {
      alert('Error saving package: ' + err.message)
    }
  }

  const deletePackage = async (id) => {
    try {
      await packagesApi.delete(id)
      refreshPackages()
      setDeleteConfirm(null)
    } catch (err) {
      alert('Error deleting package: ' + err.message)
    }
  }

  const inputCls = 'w-full px-4 py-3 rounded-xl text-sm outline-none border border-gray-200 focus:border-yellow-500 bg-gray-50'

  return (
    <div className='pt-20 min-h-screen' style={{ background: '#F8F8F8' }}>
      <div style={{ background: 'linear-gradient(135deg, #111 0%, #1a1a1a 100%)' }}>
        <div className='max-w-7xl mx-auto px-6 lg:px-10 py-8'>
          <div className='flex items-center justify-between'>
            <div>
              <span className='text-xs tracking-widest uppercase font-semibold' style={{ color: '#C9A96E' }}>Admin Panel</span>
              <h1 className='font-serif text-3xl font-semibold text-white mt-1'>Glamour Studio</h1>
            </div>
            <div className='text-right'>
              <p className='text-sm text-gray-300 font-medium'>{user?.name}</p>
              <p className='text-xs text-gray-500'>{user?.email}</p>
            </div>
          </div>
          <div className='flex gap-1 mt-8 overflow-x-auto'>
            {TABS.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className='px-5 py-2.5 text-xs font-semibold tracking-widest uppercase rounded-lg transition-all duration-200 whitespace-nowrap'
                style={activeTab === tab ? { background: '#C9A96E', color: 'white' } : { color: 'rgba(255,255,255,0.5)', background: 'transparent' }}>
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-6 lg:px-10 py-10'>

        {activeTab === 'Dashboard' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='space-y-8'>
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-5'>
              {[
                { label: 'Services', value: services.length, color: '#FFF8EE' },
                { label: 'Bookings', value: bookings.length, color: '#F0F5FF' },
                { label: 'Inquiries', value: inquiries.length, color: '#FFF0F5' },
                { label: 'Pending Bookings', value: bookings.filter(b => b.status === 'pending').length, color: '#F0FFF4' },
              ].map(s => (
                <div key={s.label} className='bg-white rounded-2xl p-6 shadow-sm border border-gray-100'>
                  <p className='font-serif text-4xl font-bold text-gray-900'>{s.value}</p>
                  <p className='text-xs font-semibold tracking-widest uppercase text-gray-400 mt-2'>{s.label}</p>
                </div>
              ))}
            </div>
            <div className='bg-white rounded-2xl p-8 shadow-sm border border-gray-100'>
              <h3 className='font-serif text-xl font-semibold text-gray-900 mb-6'>Revenue Overview</h3>
              <div className='flex items-end gap-3 h-40 px-2'>
                {[['Jan', '40'], ['Feb', '65'], ['Mar', '55'], ['Apr', '80'], ['May', '70'], ['Jun', '90']].map(([m, h]) => (
                  <div key={m} className='flex-1 flex flex-col items-center gap-2'>
                    <div className='w-full rounded-t-lg' style={{ height: h + '%', background: 'linear-gradient(to top, #C9A96E, #E8D5B0)' }} />
                    <span className='text-xs text-gray-400 font-medium'>{m}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className='bg-white rounded-2xl p-8 shadow-sm border border-gray-100'>
              <h3 className='font-serif text-xl font-semibold text-gray-900 mb-5'>Recent Inquiries</h3>
              {inquiries.length === 0 ? (
                <p className='text-gray-400 text-sm font-light text-center py-8'>No inquiries yet. They will appear here when users submit the contact form.</p>
              ) : (
                <div className='space-y-3'>
                  {inquiries.slice(0, 5).map(inq => (
                    <div key={inq._id} className='flex items-center justify-between py-3 border-b border-gray-50'>
                      <div>
                        <p className='text-sm font-semibold text-gray-800'>{inq.name}</p>
                        <p className='text-xs text-gray-400 mt-0.5'>{inq.service || 'General Inquiry'} · {new Date(inq.createdAt).toLocaleDateString()}</p>
                      </div>
                      <span className='text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded-md'
                        style={{
                          background: inq.status === 'New' ? '#FFF8EE' : inq.status === 'Contacted' ? '#F0F5FF' : '#F0FFF4',
                          color: inq.status === 'New' ? '#C9A96E' : inq.status === 'Contacted' ? '#6366F1' : '#22C55E'
                        }}>
                        {inq.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'Services' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6'>
              <h2 className='font-serif text-2xl font-semibold text-gray-900'>Manage Services</h2>
              <button onClick={openAddService} className='btn-primary text-xs px-6 py-3'>+ Add Service</button>
            </div>
            <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
              <div className='overflow-x-auto'>
                <table className='w-full min-w-[600px]'>
                  <thead style={{ background: '#FAFAFA' }}>
                    <tr>
                      {['Service', 'Category', 'Price', 'Duration', 'Popular', 'Actions'].map(h => (
                        <th key={h} className='text-left px-6 py-4 text-xs font-semibold tracking-widest uppercase text-gray-400'>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {services.map(s => (
                      <tr key={s._id} className='border-t border-gray-50 hover:bg-gray-50 transition-colors'>
                        <td className='px-6 py-4 text-sm font-medium text-gray-800'>{s.title}</td>
                        <td className='px-6 py-4'>
                          <span className='text-xs font-semibold px-2.5 py-1 rounded-full' style={{ background: '#FFF8EE', color: '#C9A96E' }}>{s.category}</span>
                        </td>
                        <td className='px-6 py-4 text-sm font-semibold text-gray-800'>Rs.{s.price}</td>
                        <td className='px-6 py-4 text-xs text-gray-500'>{s.duration}</td>
                        <td className='px-6 py-4'>
                          {s.popular && <span className='text-xs font-semibold px-2.5 py-1 rounded-full' style={{ background: '#F0FFF4', color: '#22C55E' }}>Yes</span>}
                        </td>
                        <td className='px-6 py-4'>
                          <div className='flex gap-3'>
                            <button onClick={() => openEditService(s)} className='text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors' style={{ background: '#FFF8EE', color: '#C9A96E' }}>Edit</button>
                            <button onClick={() => setDeleteConfirm({ type: 'service', id: s._id, name: s.title })} className='text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors' style={{ background: '#FFF0F0', color: '#EF4444' }}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'Packages' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6'>
              <h2 className='font-serif text-2xl font-semibold text-gray-900'>Manage Packages</h2>
              <button onClick={openAddPackage} className='btn-primary text-xs px-6 py-3'>+ Add Package</button>
            </div>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
              {packages.map(pkg => (
                <div key={pkg._id} className='bg-white rounded-2xl p-6 shadow-sm border border-gray-100'>
                  <div className='flex items-start justify-between mb-4'>
                    <div>
                      <span className='text-xs font-semibold tracking-widest uppercase text-gray-400'>{pkg.tag}</span>
                      <h4 className='font-serif text-xl font-semibold text-gray-900 mt-1'>{pkg.name}</h4>
                    </div>
                    {pkg.popular && <span className='text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0' style={{ background: '#FFF8EE', color: '#C9A96E' }}>Popular</span>}
                  </div>
                  <p className='font-serif text-2xl font-bold text-gray-900 mb-1'>Rs.{pkg.price}</p>
                  <p className='text-xs text-gray-400 line-through mb-3'>Rs.{pkg.originalPrice}</p>
                  <p className='text-xs text-gray-500 mb-5'>{pkg.features.length} services included</p>
                  <div className='flex gap-3'>
                    <button onClick={() => openEditPackage(pkg)} className='flex-1 text-xs font-semibold py-2.5 rounded-xl transition-colors' style={{ background: '#FFF8EE', color: '#C9A96E' }}>Edit</button>
                    <button onClick={() => setDeleteConfirm({ type: 'package', id: pkg._id, name: pkg.name })} className='flex-1 text-xs font-semibold py-2.5 rounded-xl transition-colors' style={{ background: '#FFF0F0', color: '#EF4444' }}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'Bookings' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className='font-serif text-2xl font-semibold text-gray-900 mb-6'>Manage Bookings</h2>
            <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
              <div className='overflow-x-auto'>
                <table className='w-full min-w-[800px]'>
                  <thead style={{ background: '#FAFAFA' }}>
                    <tr>
                      {['Customer', 'Service', 'Date', 'Amount', 'Status', 'Action'].map(h => (
                        <th key={h} className='text-left px-5 py-4 text-xs font-semibold tracking-widest uppercase text-gray-400'>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(book => (
                      <tr key={book._id} className='border-t border-gray-50 hover:bg-gray-50 transition-colors'>
                        <td className='px-5 py-4'>
                          <p className='text-sm font-semibold text-gray-800'>{book.user?.name}</p>
                          <p className='text-xs text-gray-400'>{book.user?.email}</p>
                        </td>
                        <td className='px-5 py-4'>
                          <p className='text-sm text-gray-700'>{book.service?.title || (book.package ? book.package.name + ' (Pkg)' : '-')}</p>
                        </td>
                        <td className='px-5 py-4 text-xs text-gray-500'>
                          {new Date(book.date).toLocaleString()}
                        </td>
                        <td className='px-5 py-4 text-sm font-semibold text-gray-800'>Rs.{book.amount}</td>
                        <td className='px-5 py-4'>
                          <span className='text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded-md'
                            style={{
                              background: book.status === 'pending' ? '#FFF8EE' : book.status === 'confirmed' ? '#F0F5FF' : book.status === 'completed' ? '#F0FFF4' : '#FFF0F0',
                              color: book.status === 'pending' ? '#C9A96E' : book.status === 'confirmed' ? '#6366F1' : book.status === 'completed' ? '#22C55E' : '#EF4444'
                            }}>
                            {book.status}
                          </span>
                        </td>
                        <td className='px-5 py-4'>
                          <select
                            className='text-xs bg-gray-50 border-none outline-none rounded-lg px-2 py-1'
                            value={book.status}
                            onChange={(e) => updateBookingStatus(book._id, e.target.value)}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirm</option>
                            <option value="completed">Complete</option>
                            <option value="cancelled">Cancel</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                    {bookings.length === 0 && (
                      <tr>
                        <td colSpan={6} className='py-20 text-center text-gray-400 italic text-sm'>No bookings found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'Inquiries' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className='font-serif text-2xl font-semibold text-gray-900 mb-6'>Contact Inquiries</h2>
            {inquiries.length === 0 ? (
              <div className='bg-white rounded-2xl p-16 text-center shadow-sm border border-gray-100'>
                <div className='text-5xl mb-4'>📬</div>
                <h3 className='font-serif text-xl font-semibold text-gray-700 mb-2'>No Inquiries Yet</h3>
                <p className='text-gray-400 text-sm font-light'>When users submit the contact form, their messages will appear here.</p>
              </div>
            ) : (
              <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
                <div className='overflow-x-auto'>
                  <table className='w-full min-w-[700px]'>
                    <thead style={{ background: '#FAFAFA' }}>
                      <tr>
                        {['Name', 'Email', 'Phone', 'Service', 'Message', 'Date', 'Status', 'Action'].map(h => (
                          <th key={h} className='text-left px-5 py-4 text-xs font-semibold tracking-widest uppercase text-gray-400'>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {inquiries.map(inq => (
                        <tr key={inq._id} className='border-t border-gray-50 hover:bg-gray-50 transition-colors'>
                          <td className='px-5 py-4 text-sm font-semibold text-gray-800'>{inq.name}</td>
                          <td className='px-5 py-4 text-sm text-gray-500'>{inq.email}</td>
                          <td className='px-5 py-4 text-sm text-gray-500'>{inq.phone || '-'}</td>
                          <td className='px-5 py-4 text-xs text-gray-500'>{inq.service || '-'}</td>
                          <td className='px-5 py-4 text-xs text-gray-500 max-w-xs truncate' title={inq.message}>{inq.message}</td>
                          <td className='px-5 py-4 text-xs text-gray-400'>
                            {new Date(inq.createdAt).toLocaleDateString()}
                          </td>
                          <td className='px-5 py-4'>
                            <span className='text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded-md'
                              style={{
                                background: inq.status === 'New' ? '#FFF8EE' : inq.status === 'Contacted' ? '#F0F5FF' : '#F0FFF4',
                                color: inq.status === 'New' ? '#C9A96E' : inq.status === 'Contacted' ? '#6366F1' : '#22C55E'
                              }}>
                              {inq.status}
                            </span>
                          </td>
                          <td className='px-5 py-4'>
                            <select
                              className='text-xs bg-gray-50 border-none outline-none rounded-lg px-2 py-1'
                              value={inq.status}
                              onChange={(e) => changeInquiryStatus(inq._id, e.target.value)}
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Resolved">Resolved</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'Users' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className='font-serif text-2xl font-semibold text-gray-900 mb-6'>Manage Users</h2>
            <div className='bg-white rounded-2xl p-16 text-center shadow-sm border border-gray-100'>
              <div className='text-5xl mb-4'>👥</div>
              <h3 className='font-serif text-xl font-semibold text-gray-700 mb-2'>User Management</h3>
              <p className='text-gray-400 text-sm font-light'>Connect the backend API to see registered users here.</p>
            </div>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {showServiceModal && (
          <Modal title={editingService ? 'Edit Service' : 'Add New Service'} onClose={() => setShowServiceModal(false)}>
            <div className='space-y-4'>
              <div>
                <label className='block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2'>Service Title *</label>
                <input className={inputCls} value={serviceForm.title} onChange={e => setServiceForm({ ...serviceForm, title: e.target.value })} placeholder='e.g. Hair Cut and Styling' />
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2'>Category *</label>
                  <select className={inputCls} value={serviceForm.category} onChange={e => setServiceForm({ ...serviceForm, category: e.target.value })}>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className='block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2'>Price (Rs.) *</label>
                  <input className={inputCls} value={serviceForm.price} onChange={e => setServiceForm({ ...serviceForm, price: e.target.value })} placeholder='e.g. 499' />
                </div>
              </div>
              <div>
                <label className='block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2'>Duration</label>
                <input className={inputCls} value={serviceForm.duration} onChange={e => setServiceForm({ ...serviceForm, duration: e.target.value })} placeholder='e.g. 45 min' />
              </div>
              <div>
                <label className='block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2'>Description *</label>
                <textarea className={inputCls} rows={3} value={serviceForm.description} onChange={e => setServiceForm({ ...serviceForm, description: e.target.value })} placeholder='Brief description of the service' />
              </div>
              <label className='flex items-center gap-3 cursor-pointer'>
                <input type='checkbox' checked={serviceForm.popular} onChange={e => setServiceForm({ ...serviceForm, popular: e.target.checked })} className='w-4 h-4 accent-yellow-500' />
                <span className='text-sm font-medium text-gray-700'>Mark as Popular</span>
              </label>
              <div className='flex gap-3 pt-2'>
                <button onClick={saveService} className='btn-primary flex-1 py-3 text-xs'>
                  {editingService ? 'Save Changes' : 'Add Service'}
                </button>
                <button onClick={() => setShowServiceModal(false)} className='flex-1 py-3 text-xs font-semibold rounded border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors'>
                  Cancel
                </button>
              </div>
            </div>
          </Modal>
        )}

        {showPackageModal && (
          <Modal title={editingPackage ? 'Edit Package' : 'Add New Package'} onClose={() => setShowPackageModal(false)}>
            <div className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2'>Package Name *</label>
                  <input className={inputCls} value={pkgForm.name} onChange={e => setPkgForm({ ...pkgForm, name: e.target.value })} placeholder='e.g. Glow Starter' />
                </div>
                <div>
                  <label className='block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2'>Tag</label>
                  <input className={inputCls} value={pkgForm.tag} onChange={e => setPkgForm({ ...pkgForm, tag: e.target.value })} placeholder='e.g. Basic' />
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2'>Price (Rs.) *</label>
                  <input className={inputCls} value={pkgForm.price} onChange={e => setPkgForm({ ...pkgForm, price: e.target.value })} placeholder='e.g. 1999' />
                </div>
                <div>
                  <label className='block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2'>Original Price</label>
                  <input className={inputCls} value={pkgForm.originalPrice} onChange={e => setPkgForm({ ...pkgForm, originalPrice: e.target.value })} placeholder='e.g. 2800' />
                </div>
              </div>
              <div>
                <label className='block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2'>Features (comma separated)</label>
                <textarea className={inputCls} rows={3} value={pkgForm.features} onChange={e => setPkgForm({ ...pkgForm, features: e.target.value })} placeholder='Hair Cut, Facial, Manicure' />
              </div>
              <label className='flex items-center gap-3 cursor-pointer'>
                <input type='checkbox' checked={pkgForm.popular} onChange={e => setPkgForm({ ...pkgForm, popular: e.target.checked })} className='w-4 h-4 accent-yellow-500' />
                <span className='text-sm font-medium text-gray-700'>Mark as Most Popular</span>
              </label>
              <div className='flex gap-3 pt-2'>
                <button onClick={savePackage} className='btn-primary flex-1 py-3 text-xs'>
                  {editingPackage ? 'Save Changes' : 'Add Package'}
                </button>
                <button onClick={() => setShowPackageModal(false)} className='flex-1 py-3 text-xs font-semibold rounded border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors'>
                  Cancel
                </button>
              </div>
            </div>
          </Modal>
        )}

        {deleteConfirm && (
          <div className='fixed inset-0 z-50 flex items-center justify-center p-4' style={{ background: 'rgba(0,0,0,0.6)' }}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className='bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center'>
              <div className='text-5xl mb-4'>🗑️</div>
              <h3 className='font-serif text-xl font-semibold text-gray-900 mb-2'>Delete {deleteConfirm.type === 'service' ? 'Service' : 'Package'}?</h3>
              <p className='text-gray-500 text-sm font-light mb-6'>Are you sure you want to delete <strong>{deleteConfirm.name}</strong>? This cannot be undone.</p>
              <div className='flex gap-3'>
                <button onClick={() => deleteConfirm.type === 'service' ? deleteService(deleteConfirm.id) : deletePackage(deleteConfirm.id)}
                  className='flex-1 py-3 text-xs font-semibold rounded-xl text-white transition-colors' style={{ background: '#EF4444' }}>
                  Yes, Delete
                </button>
                <button onClick={() => setDeleteConfirm(null)} className='flex-1 py-3 text-xs font-semibold rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors'>
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
