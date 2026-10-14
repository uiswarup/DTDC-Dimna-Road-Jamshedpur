import React, { useState, useRef } from 'react';
import { motion, useScroll } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  Copy, 
  Check, 
  Settings, 
  X,
  Compass,
  Target,
  ShieldCheck,
  Globe,
  MapPin,
  Users,
  Phone,
  Mail,
  Send,
  Truck
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'who' | 'vision' | 'mission'>('home');
  const [transparencyLevel, setTransparencyLevel] = useState<'subtle' | 'medium' | 'high'>('high');
  const [showSettings, setShowSettings] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();

  const handleCopyCode = () => {
    if (!containerRef.current) return;
    navigator.clipboard.writeText(containerRef.current.outerHTML);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const glassStyles = {
    subtle: 'bg-neutral-950/80 border-neutral-800 backdrop-blur-sm',
    medium: 'bg-neutral-950/50 border-neutral-800/80 backdrop-blur-md',
    high: 'bg-neutral-950/20 border-neutral-700/40 backdrop-blur-xl',
  };

  const pillGlassStyles = {
    subtle: 'bg-neutral-900/80 border-neutral-700 backdrop-blur-md shadow-2xl',
    medium: 'bg-neutral-900/40 border-neutral-700/50 backdrop-blur-2xl shadow-2xl',
    high: 'bg-neutral-900/15 border-white/20 backdrop-blur-3xl shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]',
  };

  const fadeInAnimation = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-black text-white font-['DM_Sans',sans-serif] selection:bg-white selection:text-black flex flex-col items-center p-4 md:p-8 relative overflow-x-hidden">
      {/* Thin White Scroll Progress Bar at the Very Top */}
      <motion.div 
        style={{ scaleX: scrollYProgress }} 
        className="fixed top-0 left-0 right-0 h-1 bg-white z-50 origin-left"
      />

      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900/30 via-black to-black pointer-events-none"></div>

      {/* Floating Settings Trigger (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="flex items-center gap-2 px-4 py-2.5 bg-neutral-900/90 hover:bg-neutral-800 text-white rounded-full border border-neutral-700 shadow-2xl backdrop-blur-xl text-xs font-medium transition-all"
        >
          <Settings className="w-4 h-4" />
          <span>{showSettings ? 'Close Controls' : 'Studio Controls'}</span>
        </button>
      </div>

      {/* Floating Settings Drawer */}
      {showSettings && (
        <div className="fixed bottom-20 right-6 z-50 bg-neutral-950/90 backdrop-blur-2xl border border-neutral-800 p-5 rounded-2xl shadow-2xl w-80 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-300">Banner Studio Controls</h3>
            <button onClick={() => setShowSettings(false)} className="text-neutral-500 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-neutral-400 mb-2">Glassmorphism Transparency</label>
            <div className="grid grid-cols-3 gap-1 bg-neutral-900 p-1 rounded-xl border border-neutral-800">
              {(['subtle', 'medium', 'high'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setTransparencyLevel(level)}
                  className={`py-1.5 text-xs font-medium rounded-lg capitalize transition-all ${
                    transparencyLevel === level ? 'bg-white text-black shadow' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-neutral-900">
            <button
              onClick={handleCopyCode}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-white hover:bg-neutral-200 text-black rounded-xl text-xs font-semibold transition-all shadow"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied HTML!' : 'Copy Page HTML'}</span>
            </button>
          </div>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <div 
        ref={containerRef}
        className="bg-black text-white w-full max-w-6xl rounded-3xl border border-neutral-900 overflow-hidden shadow-2xl relative flex flex-col z-10 my-auto"
      >
        {/* SECTION 1: HERO & NAVBAR */}
        <div className="py-8 px-6 md:px-12 min-h-[720px] flex flex-col justify-between border-b border-neutral-900">
          {/* TOP FULLY GLOSSY & TRANSPARENT NAVBAR */}
          <div className="relative z-10 w-full flex justify-center mb-12">
            <nav className={`w-full max-w-5xl flex items-center justify-between px-6 py-3.5 rounded-full border relative overflow-hidden transition-all duration-300 ${pillGlassStyles[transparencyLevel]}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50 pointer-events-none"></div>

              {/* Official DTDC Logo */}
              <div className="flex items-center gap-2 relative z-10">
                <svg className="h-7 w-auto" viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <text x="0" y="28" fill="#ffffff" fontFamily="'DM Sans', sans-serif" fontWeight="900" fontSize="24" fontStyle="italic" letterSpacing="-1">
                    DTDC
                  </text>
                  <rect x="138" y="16" width="8" height="8" fill="#ef4444" rx="1" />
                </svg>
              </div>

              {/* Navbar Menu Items */}
              <div className="hidden lg:flex items-center gap-7 text-xs text-white/90 font-medium relative z-10">
                <button onClick={() => setActiveTab('home')} className="hover:text-white transition-colors">Services</button>
                <button onClick={() => setActiveTab('home')} className="hover:text-white transition-colors">Solutions</button>
                <button onClick={() => setActiveTab('home')} className="hover:text-white transition-colors">Features</button>
                <button onClick={() => setActiveTab('home')} className="hover:text-white transition-colors">Track</button>
                <button onClick={() => setActiveTab('who')} className="hover:text-white transition-colors">Company</button>
                <button onClick={() => setActiveTab('home')} className="hover:text-white transition-colors">Support</button>
                <button onClick={() => setActiveTab('home')} className="hover:text-white transition-colors">Join Us</button>
              </div>

              {/* CTA Button */}
              <div className="relative z-10">
                <button 
                  onClick={() => setActiveTab('who')}
                  className="bg-white hover:bg-neutral-200 text-black text-xs font-semibold px-4 py-2 rounded-full transition-all shadow-md"
                >
                  Explore
                </button>
              </div>
            </nav>
          </div>

          {/* HERO CENTER CONTENT */}
          <div className="relative z-10 my-auto text-center max-w-4xl mx-auto flex flex-col items-center py-6">
            {activeTab === 'home' && (
              <div className="space-y-6">
                <div className={`inline-flex items-center gap-2 border px-4 py-1.5 rounded-full text-xs text-neutral-300 ${pillGlassStyles[transparencyLevel]}`}>
                  <ShieldCheck className="w-3.5 h-3.5 text-white" />
                  <span>India’s Leading Integrated Express Logistics Provider</span>
                </div>

                <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.15]">
                  Every parcel is{' '}
                  <span className="text-neutral-400">someone’s promise</span>{' '}
                  <br className="hidden sm:inline" />
                  and we deliver on it.
                </h1>

                <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                  Pioneering the franchise-based model with the largest number of access points in India and a growing international network, we are committed to reaching every doorstep.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                  <button 
                    onClick={() => setActiveTab('who')}
                    className={`px-6 py-3 rounded-full text-xs font-medium transition-all border ${pillGlassStyles[transparencyLevel]} text-white hover:bg-neutral-900`}
                  >
                    Who We Are
                  </button>
                  <button 
                    onClick={() => setActiveTab('vision')}
                    className={`px-6 py-3 rounded-full text-xs font-medium transition-all border ${pillGlassStyles[transparencyLevel]} text-white hover:bg-neutral-900`}
                  >
                    Our Vision & Mission
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'who' && (
              <div className="space-y-6 text-left max-w-3xl bg-neutral-950/40 p-8 rounded-3xl border border-neutral-800/80 backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-2xl bg-white text-black flex items-center justify-center font-bold">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Who We Are</h2>
                    <p className="text-xs text-neutral-400">DTDC Corporate Overview</p>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
                  DTDC is India’s leading integrated express logistics provider and a pioneer of the franchise-based model in the industry. With the largest number of access points in India and a growing international network, we are committed to reaching every doorstep. We believe that every parcel is someone’s promise and we deliver on it.
                </p>
                <div className="flex justify-end gap-3 pt-4 border-t border-neutral-900">
                  <button onClick={() => setActiveTab('home')} className="px-5 py-2 rounded-full text-xs font-medium bg-neutral-900 text-neutral-300 hover:text-white">
                    Back to Home
                  </button>
                  <button onClick={() => setActiveTab('vision')} className="px-5 py-2 rounded-full text-xs font-medium bg-white text-black hover:bg-neutral-200">
                    View Vision & Mission
                  </button>
                </div>
              </div>
            )}

            {(activeTab === 'vision' || activeTab === 'mission') && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-left">
                <div className="bg-neutral-950/50 border border-neutral-800/80 p-6 rounded-3xl backdrop-blur-xl flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-2xl bg-white text-black flex items-center justify-center font-bold mb-4 shadow-sm">
                      <Target className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Our Vision</h3>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                      To be the most admired logistics partner through closer connections - smarter solutions.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-neutral-900 text-[11px] text-neutral-500">
                    Vision Icon • Excellence in Logistics
                  </div>
                </div>

                <div className="bg-neutral-950/50 border border-neutral-800/80 p-6 rounded-3xl backdrop-blur-xl flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-2xl bg-white text-black flex items-center justify-center font-bold mb-4 shadow-sm">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Our Mission</h3>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                      To lead through innovation, fostering a culture of excellence, collaboration and adaptability.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-neutral-900 text-[11px] text-neutral-500">
                    Mission Icon • Innovation & Adaptability
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={`relative z-10 pt-6 mt-12 border-t flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-2 transition-all duration-300 ${glassStyles[transparencyLevel]}`}>
            <div>Section 1 • Hero Banner</div>
            <div className="flex items-center gap-4">
              <span>DM Sans Font</span>
              <span>•</span>
              <span>Pure White Text</span>
            </div>
          </div>
        </div>

        {/* SECTION 2: WHY SHOULD YOU CHOOSE US */}
        <motion.div {...fadeInAnimation} className="py-16 px-6 md:px-16 bg-neutral-950/60 relative overflow-hidden border-b border-neutral-900">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3">
                Why Should You <span className="text-red-500">Choose</span> Us
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400">
                Backed by decades of expertise, unmatched network coverage, and relentless dedication.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative flex flex-col items-center justify-center">
                <div className="relative w-full max-w-md bg-neutral-900/40 border border-neutral-800 p-6 rounded-3xl backdrop-blur-xl shadow-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center font-bold">
                      <Globe className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">10,000+</div>
                      <div className="text-xs text-neutral-400">Locations Over the Globe</div>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Seamless domestic and international connectivity ensuring your shipments move swiftly across borders and cities.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className={`p-6 rounded-3xl border transition-all duration-300 ${pillGlassStyles[transparencyLevel]} hover:border-neutral-500`}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center font-bold flex-shrink-0">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white mb-1">16,500+</div>
                      <h4 className="text-sm font-semibold text-neutral-200 mb-2">Channel Partners</h4>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        A wide network of customer access points across India that covers 96% of the Indian population.
                      </p>
                    </div>
                  </div>
                </div>

                <div className={`p-6 rounded-3xl border transition-all duration-300 ${pillGlassStyles[transparencyLevel]} hover:border-neutral-500`}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center font-bold flex-shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white mb-1">220+</div>
                      <h4 className="text-sm font-semibold text-neutral-200 mb-2">Global Destinations</h4>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        Connecting India to the world with reliable international shipping solutions and door-to-door express delivery.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* SECTION 3: WHAT IS DTDC WORLDWYDE? */}
        <motion.div {...fadeInAnimation} className="py-20 px-6 md:px-16 relative overflow-hidden bg-black border-b border-neutral-900">
          <div className="max-w-4xl mx-auto">
            <div className={`p-8 md:p-14 rounded-3xl border backdrop-blur-3xl ${pillGlassStyles[transparencyLevel]} text-center relative overflow-hidden shadow-2xl space-y-8`}>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>

              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-xs text-white">
                <Globe className="w-4 h-4 text-white animate-spin" style={{ animationDuration: '15s' }} />
                <span>Global Reach</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                What is DTDC WorldWyde?
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-neutral-300 leading-relaxed max-w-2xl mx-auto font-normal">
                DTDC WorldWyde stands with every Global Indian, connecting families, students, and businesses across <span className="text-white font-semibold underline underline-offset-4">220+ destinations</span> worldwide. Whether it’s love from home or business across borders, we make international shipping seamless, reliable, affordable, and always within your reach.
              </p>

              <div className="pt-4 border-t border-white/10">
                <span className="text-lg md:text-xl font-bold tracking-wide text-white italic">
                  “Global Reach, Indian Touch.”
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* SECTION 4: WHAT IS LTL SHIPPING? */}
        <motion.div {...fadeInAnimation} className="py-20 px-6 md:px-16 relative overflow-hidden bg-black border-b border-neutral-900">
          <div className="max-w-4xl mx-auto">
            <div className={`p-8 md:p-14 rounded-3xl border backdrop-blur-3xl ${pillGlassStyles[transparencyLevel]} text-center relative overflow-hidden shadow-2xl space-y-8`}>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>

              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-xs text-white">
                <Truck className="w-4 h-4 text-white" />
                <span>Cost-Effective Freight</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                What is LTL Shipping?
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-neutral-300 leading-relaxed max-w-2xl mx-auto font-normal">
                Less-than-Truckload (LTL) Shipping is a cost-effective logistics solution for businesses that need to transport smaller shipments without booking an entire truck. With DTDC’s LTL services, your cargo shares space with other shipments, ensuring you pay only for the space you use.
              </p>

              <div className="pt-4 border-t border-white/10">
                <span className="text-lg md:text-xl font-bold tracking-wide text-white italic">
                  “Freight Solutions Designed To Fit Your Shipment.”
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* SECTION 5: CONTACT US & FEEDBACK */}
        <motion.div {...fadeInAnimation} className="py-20 px-6 md:px-16 relative overflow-hidden bg-black">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Contact Us Card */}
              <div className={`lg:col-span-1 p-6 rounded-3xl border backdrop-blur-2xl ${pillGlassStyles[transparencyLevel]} flex flex-col justify-between`}>
                <div>
                  <h3 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-4">Contact Us</h3>
                  <div className="space-y-6 text-xs sm:text-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-white">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-neutral-400 text-[11px] mb-0.5">Call Support</div>
                        <div className="text-white font-medium">093343 37452</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-white">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-neutral-400 text-[11px] mb-0.5">Email Support</div>
                        <div className="text-white font-medium break-all">customersupport@dtdc.com</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-white">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-neutral-400 text-[11px] mb-0.5">Address</div>
                        <div className="text-white font-medium">Room No. 2, Transport Nagar Campus, Dimna Chowk, Transport Nagar, Mango, Jamshedpur, Jharkhand 831012</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Feedback Form Card */}
              <div className={`lg:col-span-2 p-8 rounded-3xl border backdrop-blur-2xl ${pillGlassStyles[transparencyLevel]}`}>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-1">We Value Your Feedback</h3>
                  <p className="text-xs text-neutral-400">Help us improve by sharing your experience with our services.</p>
                </div>

                {formSubmitted ? (
                  <div className="bg-emerald-950/40 border border-emerald-800/60 p-8 rounded-2xl text-center space-y-3">
                    <Check className="w-10 h-10 text-emerald-400 mx-auto" />
                    <h4 className="text-base font-bold text-white">Thank You for Your Feedback!</h4>
                    <p className="text-xs text-neutral-300">Your query has been submitted successfully. Our support team will connect with you shortly.</p>
                    <button onClick={() => setFormSubmitted(false)} className="mt-4 px-6 py-2 bg-white text-black text-xs font-medium rounded-full">
                      Submit Another Query
                    </button>
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-neutral-300 font-medium mb-1">Name *</label>
                        <input type="text" required placeholder="Enter Your Name" className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-all" />
                      </div>
                      <div>
                        <label className="block text-neutral-300 font-medium mb-1">Email Address *</label>
                        <input type="email" required placeholder="Enter Your Email ID" className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-all" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-neutral-300 font-medium mb-1">Mobile Number *</label>
                        <input type="tel" required placeholder="Enter Your Mobile Number" className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-all" />
                      </div>
                      <div>
                        <label className="block text-neutral-300 font-medium mb-1">I'm an Existing *</label>
                        <select className="w-full bg-neutral-900 border border-white/15 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white transition-all">
                          <option>Customer</option>
                          <option>Franchise Partner</option>
                          <option>Corporate Client</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-neutral-300 font-medium mb-1">Raise a Query for *</label>
                        <select className="w-full bg-neutral-900 border border-white/15 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white transition-all">
                          <option>Select</option>
                          <option>Shipment Delay</option>
                          <option>Pickup Request</option>
                          <option>Billing & Rates</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-neutral-300 font-medium mb-1">Shipment Number *</label>
                        <input type="text" placeholder="Enter Shipment Number" className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-all" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-neutral-300 font-medium mb-1">Description *</label>
                      <textarea rows={3} placeholder="Write Your Query in Detail..." className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-all resize-none"></textarea>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="bg-neutral-900 border border-white/20 px-4 py-2 rounded-xl font-mono tracking-widest text-emerald-400 font-bold">
                          73XUTF
                        </div>
                        <input type="text" placeholder="Enter captcha" className="bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-white placeholder-neutral-500 focus:outline-none w-32" />
                      </div>

                      <button type="submit" className="w-full sm:w-auto bg-red-600 hover:bg-red-500 text-white font-semibold px-8 py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2">
                        <span>SUBMIT NOW</span>
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer info */}
        <div className={`py-4 px-6 md:px-12 border-t flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-2 ${glassStyles[transparencyLevel]}`}>
          <div>DTDC Express Logistics • All Sections (Hero, Why Us, WorldWyde, LTL Shipping, Contact & Feedback)</div>
          <div>Fully Glossy Transparent Glassmorphism • Pure Black & White</div>
        </div>
      </div>
    </div>
  );
}
