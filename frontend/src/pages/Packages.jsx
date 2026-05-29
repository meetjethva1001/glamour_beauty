import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { usePackages } from '../hooks/useStore'

export default function Packages() {
  const { packages, loading, error } = usePackages()
  
  const cardStyles = [
    { bg: '#FFFFFF', headerBg: 'linear-gradient(135deg, #FFF8EE, #FFF0DC)', accent: '#F59E0B', btnStyle: 'outline' },
    { bg: '#111111', headerBg: 'linear-gradient(135deg, #1a1a1a, #2a2a2a)', accent: '#C9A96E', btnStyle: 'gold', dark: true },
    { bg: '#FFFFFF', headerBg: 'linear-gradient(135deg, #F5F0FF, #EDE8FF)', accent: '#8B5CF6', btnStyle: 'outline' },
  ]

  if (loading) return <div className="pt-40 text-center font-serif text-2xl">Loading Packages...</div>
  if (error) return <div className="pt-40 text-center text-red-500">Error: {error}</div>

  return (
    <div className="pt-20 overflow-hidden">

      {/* Header */}
      <section
        className="py-24 text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #FAF8F5 0%, #FFF6EE 100%)' }}
      >
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#C9A96E 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #C9A96E, #E8D5B0)' }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#C9A96E' }}>Save More, Glow More</span>
              <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #E8D5B0, #C9A96E)' }} />
            </div>
            <h1 className="font-serif text-6xl font-semibold text-gray-900 mb-5">Beauty Packages</h1>
            <p className="text-lg text-gray-500 font-light leading-relaxed">
              Curated beauty packages designed to give you the complete experience at exceptional value.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {packages.map((pkg, i) => {
              const style = cardStyles[i] || cardStyles[0]

              return (
                <motion.div
                  key={pkg._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="relative rounded-3xl overflow-hidden flex flex-col"
                  style={{
                    background: style.bg,
                    boxShadow: pkg.popular
                      ? '0 30px 70px rgba(201,169,110,0.25)'
                      : '0 8px 40px rgba(0,0,0,0.08)',
                    border: pkg.popular ? '2px solid rgba(201,169,110,0.4)' : '1px solid rgba(0,0,0,0.06)',
                  }}
                >
                  {/* Popular ribbon */}
                  {pkg.popular && (
                    <div
                      className="absolute top-5 right-5 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10"
                      style={{ background: 'linear-gradient(135deg, #C9A96E, #A07840)', fontSize: '10px', letterSpacing: '0.1em' }}
                    >
                      ✦ Most Popular
                    </div>
                  )}

                  {/* Header */}
                  <div className="p-8 pb-6" style={{ background: style.headerBg }}>
                    <span
                      className="text-xs font-bold tracking-widest uppercase"
                      style={{ color: style.dark ? 'rgba(255,255,255,0.4)' : '#AAAAAA' }}
                    >
                      {pkg.tag}
                    </span>
                    <h3
                      className="font-serif text-3xl font-semibold mt-2 mb-6"
                      style={{ color: style.dark ? '#ffffff' : '#111111' }}
                    >
                      {pkg.name}
                    </h3>

                    <div className="flex items-end gap-3 mb-2">
                      <span
                        className="font-serif text-5xl font-bold"
                        style={{ color: style.dark ? '#C9A96E' : '#111111' }}
                      >
                        Rs.{pkg.price}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      {pkg.originalPrice && (
                        <>
                          <span
                            className="text-sm line-through font-light"
                            style={{ color: style.dark ? 'rgba(255,255,255,0.3)' : '#BBBBBB' }}
                          >
                            Rs.{pkg.originalPrice}
                          </span>
                          <span
                            className="text-xs font-bold px-2.5 py-1 rounded-full"
                            style={{
                              background: style.dark ? 'rgba(201,169,110,0.2)' : 'rgba(201,169,110,0.12)',
                              color: '#C9A96E',
                              letterSpacing: '0.05em',
                            }}
                          >
                            Save {Math.round((1 - pkg.price / pkg.originalPrice) * 100)}%
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="mx-8 h-px" style={{ background: style.dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }} />

                  {/* Features */}
                  <div className="p-8 flex-1 flex flex-col">
                    <p
                      className="text-xs font-bold tracking-widest uppercase mb-5"
                      style={{ color: style.dark ? 'rgba(255,255,255,0.35)' : '#AAAAAA' }}
                    >
                      Includes
                    </p>
                    <ul className="space-y-3 flex-1 mb-8">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex items-center gap-3">
                          <span
                            className="w-5 h-5 rounded-full flex items-center justify-center text-white flex-shrink-0"
                            style={{ background: `linear-gradient(135deg, ${style.accent}, ${style.accent}BB)`, fontSize: '10px' }}
                          >
                            ✓
                          </span>
                          <span
                            className="text-sm font-light"
                            style={{ color: style.dark ? 'rgba(255,255,255,0.75)' : '#444444' }}
                          >
                            {f}
                          </span>
                        </li>
                      ))}
                      {pkg.notIncluded?.map((f) => (
                        <li key={f} className="flex items-center gap-3 opacity-35">
                          <span
                            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: 'rgba(0,0,0,0.08)', fontSize: '10px', color: '#999' }}
                          >
                            ✗
                          </span>
                          <span className="text-sm font-light line-through text-gray-400">{f}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      to="/contact"
                      className="block text-center py-4 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300"
                      style={
                        style.btnStyle === 'gold'
                          ? {
                              background: 'linear-gradient(135deg, #C9A96E, #A07840)',
                              color: 'white',
                              boxShadow: '0 10px 30px rgba(201,169,110,0.35)',
                            }
                          : {
                              background: 'transparent',
                              color: style.accent,
                              border: `1.5px solid ${style.accent}`,
                            }
                      }
                    >
                      Book This Package
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Custom CTA */}
      <section
        className="py-24 text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #111111, #1a1a1a)' }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #C9A96E, transparent)', transform: 'translate(30%, -30%)' }} />
        <div className="max-w-2xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #C9A96E, #E8D5B0)' }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#C9A96E' }}>Need Something Special?</span>
              <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #E8D5B0, #C9A96E)' }} />
            </div>
            <h2 className="font-serif text-5xl font-semibold text-white mb-5">Custom Package</h2>
            <p className="text-lg text-gray-400 font-light mb-10 leading-relaxed">
              Can't find the perfect package? Let us create a bespoke beauty experience tailored exactly to your needs and budget.
            </p>
            <Link to="/contact" className="btn-primary">Request Custom Package</Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
