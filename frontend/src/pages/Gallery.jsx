import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const galleryItems = [
  { id: 1, category: 'Hair', title: 'Balayage Transformation', emoji: '💇‍♀️', bg: 'linear-gradient(135deg, #FFF8E8, #FFE8C8)' },
  { id: 2, category: 'Makeup', title: 'Bridal Glow', emoji: '👰', bg: 'linear-gradient(135deg, #FFE8F0, #FFD0E8)' },
  { id: 3, category: 'Nails', title: 'Floral Nail Art', emoji: '💅', bg: 'linear-gradient(135deg, #F0E8FF, #E0D0FF)' },
  { id: 4, category: 'Hair', title: 'Keratin Smoothing', emoji: '✨', bg: 'linear-gradient(135deg, #F8F8F0, #F0ECD8)' },
  { id: 5, category: 'Makeup', title: 'Party Glam', emoji: '💄', bg: 'linear-gradient(135deg, #FFE8E8, #FFD0D0)' },
  { id: 6, category: 'Skin', title: 'Glow Facial', emoji: '🌸', bg: 'linear-gradient(135deg, #E8FFE8, #D0F0D0)' },
  { id: 7, category: 'Hair', title: 'Ombre Color', emoji: '🎨', bg: 'linear-gradient(135deg, #E8F0FF, #D0E0FF)' },
  { id: 8, category: 'Nails', title: 'Gel Extensions', emoji: '🌺', bg: 'linear-gradient(135deg, #FFE8F8, #FFD0F0)' },
  { id: 9, category: 'Makeup', title: 'Engagement Look', emoji: '💍', bg: 'linear-gradient(135deg, #FFF0E0, #FFE0C0)' },
  { id: 10, category: 'Skin', title: 'Skin Brightening', emoji: '⭐', bg: 'linear-gradient(135deg, #FFFFF0, #FFFFE0)' },
  { id: 11, category: 'Hair', title: 'Bridal Updo', emoji: '👑', bg: 'linear-gradient(135deg, #F0E8FF, #E8D8FF)' },
  { id: 12, category: 'Nails', title: 'French Manicure', emoji: '🤍', bg: 'linear-gradient(135deg, #F8F8F8, #F0F0F0)' },
]

const galleryCategories = ['All', 'Hair', 'Makeup', 'Nails', 'Skin']

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered = activeCategory === 'All' ? galleryItems : galleryItems.filter(g => g.category === activeCategory)

  return (
    <div className="pt-20 overflow-hidden">

      {/* Header */}
      <section
        className="py-24 text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #111111, #1a1a1a)' }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #C9A96E, transparent)', transform: 'translate(30%, -30%)' }} />
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #C9A96E, #E8D5B0)' }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#C9A96E' }}>Our Work</span>
              <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #E8D5B0, #C9A96E)' }} />
            </div>
            <h1 className="font-serif text-6xl font-semibold text-white mb-5">Gallery</h1>
            <p className="text-lg text-gray-400 font-light leading-relaxed">
              A glimpse into the transformations we create every day. Real clients, real results, real beauty.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <div
        className="sticky top-20 z-30 py-5"
        style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="flex flex-wrap gap-3 justify-center">
            {galleryCategories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="px-6 py-2.5 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300"
                style={
                  activeCategory === cat
                    ? { background: 'linear-gradient(135deg, #C9A96E, #A07840)', color: 'white', boxShadow: '0 8px 20px rgba(201,169,110,0.35)' }
                    : { background: 'white', color: '#888888', border: '1.5px solid #EEEEEE' }
                }
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  onClick={() => setSelected(item)}
                  className="group cursor-pointer relative overflow-hidden rounded-2xl aspect-square"
                  style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                >
                  <div
                    className="w-full h-full flex flex-col items-center justify-center transition-transform duration-500 group-hover:scale-105"
                    style={{ background: item.bg }}
                  >
                    <span className="text-5xl mb-3 transition-transform duration-300 group-hover:scale-110">{item.emoji}</span>
                    <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">{item.category}</span>
                  </div>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col justify-end p-5 rounded-2xl"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)' }}
                  >
                    <p className="font-serif text-white text-lg font-semibold translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {item.title}
                    </p>
                    <p className="text-xs font-semibold tracking-widest uppercase translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75"
                      style={{ color: '#C9A96E' }}>
                      {item.category}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(12px)' }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-md w-full overflow-hidden"
              style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.5)' }}
            >
              <div className="aspect-video flex items-center justify-center" style={{ background: selected.bg }}>
                <span className="text-8xl">{selected.emoji}</span>
              </div>
              <div className="p-8">
                <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#C9A96E' }}>
                  {selected.category}
                </span>
                <h3 className="font-serif text-2xl font-semibold text-gray-900 mt-2 mb-3">{selected.title}</h3>
                <p className="text-sm text-gray-500 font-light leading-relaxed">
                  A beautiful transformation by our expert team at Glamour Studio.
                </p>
                <button
                  onClick={() => setSelected(null)}
                  className="mt-6 text-xs font-semibold tracking-widest uppercase text-gray-400 hover:text-gray-700 transition-colors"
                >
                  ✕ Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="py-8 text-center bg-gray-50 border-t border-gray-100">
        <p className="text-sm text-gray-400 font-light">
          📸 Real client transformation photos coming soon. These are placeholder visuals.
        </p>
      </div>
    </div>
  )
}
