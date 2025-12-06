'use client';

import { useState, useEffect, useRef } from 'react';
import { Linkedin, ArrowRight, Menu, X, Globe, MoveUpRight, Check, Zap } from 'lucide-react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  // Case Study Scroll Lock Logic (downward only)
  const caseStudyRef = useRef<HTMLElement>(null);
  const [slideIndex, setSlideIndex] = useState(0); // 0, 1, or 2 (discrete steps)
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const scrollLockPosition = useRef<number>(0);
  const lastScrollY = useRef<number>(0);
  const scrollCooldown = 400; // ms between scroll events
  const lastScrollTime = useRef<number>(0);

  const caseStudies = [
    {
      client: "Apex.com",
      tag: "SaaS",
      desc: "Redefining visual language for a Series-B SaaS, resulting in a 300% increase in inbound leads.",
      stat: "+45k Followers",
      color: "#D8C6A5"
    },
    {
      client: "Linear",
      tag: "Productivity",
      desc: "Creating a cult-like following through minimalist, high-velocity product release trailers.",
      stat: "2.5M Views",
      color: "#A5B4D8"
    },
    {
      client: "Raycast",
      tag: "Tools",
      desc: "Developer-focused storytelling that turned a launcher utility into a productivity lifestyle brand.",
      stat: "12% Conv. Rate",
      color: "#D8A5A5"
    }
  ];

  // Scroll lock for case studies (downward scrolling only)
  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        const currentScroll = window.scrollY;
        const scrollDirection = currentScroll > lastScrollY.current ? 'down' : 'up';
        lastScrollY.current = currentScroll;
        setScrollY(currentScroll);

        if (!caseStudyRef.current) return;

        const rect = caseStudyRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Check if section is in viewport
        const isSectionActive = rect.top <= 0 && rect.bottom >= viewportHeight * 0.5;

        // Lock scrolling when entering section and scrolling down
        if (isSectionActive && !isScrollLocked && scrollDirection === 'down') {
          setIsScrollLocked(true);
          scrollLockPosition.current = window.scrollY;
          document.body.style.overflow = 'hidden';
          document.body.style.position = 'fixed';
          document.body.style.width = '100%';
          document.body.style.top = `-${scrollLockPosition.current}px`;
        }
        
        // Unlock if scrolling up (always allow scrolling up)
        if (isScrollLocked && scrollDirection === 'up') {
          setIsScrollLocked(false);
          const savedScroll = scrollLockPosition.current;
          document.body.style.overflow = '';
          document.body.style.position = '';
          document.body.style.width = '';
          document.body.style.top = '';
          window.scrollTo(0, savedScroll);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (isScrollLocked) {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
      }
    };
  }, [isScrollLocked]);

  // Handle wheel events for step-by-step case study navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isScrollLocked || !caseStudyRef.current) return;

      const rect = caseStudyRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const isSectionActive = rect.top <= 0 && rect.bottom >= viewportHeight * 0.5;

      if (!isSectionActive) return;

      // Only lock on downward scroll
      if (e.deltaY > 0) {
        e.preventDefault();
        e.stopPropagation();

        const now = Date.now();
        if (now - lastScrollTime.current < scrollCooldown) {
          return;
        }
        lastScrollTime.current = now;

        // Advance to next case study
        setSlideIndex((prev) => {
          const next = Math.min(prev + 1, caseStudies.length - 1);
          
          // If we've reached the last slide, unlock scrolling
          if (next === caseStudies.length - 1 && prev === caseStudies.length - 1) {
            setTimeout(() => {
              setIsScrollLocked(false);
              document.body.style.overflow = '';
              document.body.style.position = '';
              document.body.style.width = '';
              document.body.style.top = '';
              // Allow page to continue scrolling down
              window.scrollBy(0, 10);
            }, 200);
          }
          return next;
        });
      } else {
        // Scrolling up - unlock and allow normal scroll
        setIsScrollLocked(false);
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        // Go back to previous case study if not at first
        setSlideIndex((prev) => Math.max(prev - 1, 0));
      }
    };

    if (isScrollLocked) {
      window.addEventListener('wheel', handleWheel, { passive: false });
      return () => {
        window.removeEventListener('wheel', handleWheel);
      };
    }
  }, [isScrollLocked, caseStudies.length]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#EBE9E4] font-sans selection:bg-[#D8C6A5] selection:text-[#080808] overflow-x-hidden">
      
      {/* Texture Overlay - Film Grain */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.04]" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* Ambient Light */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-[#D8C6A5]/5 rounded-full blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-[#050505]/80 backdrop-blur-xl border-b border-[#D8C6A5]/10 py-4' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-8 h-8 bg-[#D8C6A5] rounded-sm flex items-center justify-center font-serif text-xl font-bold text-[#080808]">
              D
            </div>
            <span className="text-xl font-bold tracking-tight group-hover:text-[#D8C6A5] transition-colors">DistroHQ</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10 text-sm font-medium text-[#888]">
            <a href="#capabilities" className="hover:text-[#D8C6A5] transition-colors">Services</a>
            <a href="#case-studies" className="hover:text-[#D8C6A5] transition-colors">Curated Work</a>
            <a href="#pricing" className="hover:text-[#D8C6A5] transition-colors">Pricing</a>
            <button className="bg-[#D8C6A5] text-[#080808] px-6 py-2.5 rounded-sm font-semibold hover:bg-[#C4B291] transition-colors">
              Start Project
            </button>
          </div>
          
           <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-[#D8C6A5]/10 rounded-full transition-colors md:hidden text-[#D8C6A5]"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

       {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#080808] flex items-center justify-center md:hidden">
          <div className="flex flex-col items-center gap-8 text-2xl font-serif italic text-[#D8C6A5]">
            <a href="#capabilities" onClick={() => setIsMenuOpen(false)}>Services</a>
            <a href="#case-studies" onClick={() => setIsMenuOpen(false)}>Curated Work</a>
             <a href="#pricing" onClick={() => setIsMenuOpen(false)}>Pricing</a>
            <button className="bg-[#D8C6A5] text-[#080808] px-8 py-3 rounded-sm font-sans font-bold not-italic mt-4">Start Project</button>
          </div>
        </div>
      )}

      <main className="relative z-10 pt-32 pb-20">
        
        {/* Hero Section with TV Illustration */}
        <section className="container mx-auto px-6 mb-32 relative">
          <div className="flex flex-col md:flex-row items-center gap-12">
            
            {/* Hero Text */}
            <div className="md:w-3/5 relative z-10">
              <h1 className="text-6xl md:text-8xl font-medium leading-[0.95] mb-8 tracking-tight text-[#EBE9E4]">
                Your Content. <br />
                <span className="font-serif italic text-[#D8C6A5]">Distributed</span> <span className="border-b-2 border-[#D8C6A5]/30 pb-2">Right.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-[#888] leading-relaxed max-w-xl font-light mb-10">
                DistroHQ is your headquarters for producing, packaging and distributing high-performance content, consistently.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <button className="group bg-[#EBE9E4] hover:bg-[#D8C6A5] text-[#080808] px-8 py-4 rounded-sm font-bold transition-all flex items-center justify-center gap-3">
                  Start Scaling
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Thematic TV Illustration */}
            <div className="md:w-2/5 flex justify-center md:justify-end relative">
               {/* Glowing backing */}
               <div className="absolute inset-0 bg-[#D8C6A5]/10 blur-[60px] rounded-full transform scale-75"></div>
               
               <svg width="400" height="340" viewBox="0 0 400 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 drop-shadow-2xl" aria-hidden="true">
                  {/* TV Housing */}
                  <rect x="2" y="2" width="396" height="300" rx="40" stroke="#333" strokeWidth="2" fill="#0A0A0A"/>
                  <rect x="15" y="15" width="370" height="274" rx="28" fill="#050505" stroke="#111" strokeWidth="2"/>
                  
                  {/* Screen Glare/Noise Lines */}
                  <path d="M40 80 H360" stroke="#D8C6A5" strokeWidth="1" strokeOpacity="0.1" />
                  <path d="M40 120 H360" stroke="#D8C6A5" strokeWidth="1" strokeOpacity="0.05" />
                  <path d="M40 160 H360" stroke="#D8C6A5" strokeWidth="1" strokeOpacity="0.1" />
                  <path d="M40 200 H360" stroke="#D8C6A5" strokeWidth="1" strokeOpacity="0.05" />
                  <path d="M40 240 H360" stroke="#D8C6A5" strokeWidth="1" strokeOpacity="0.1" />

                  {/* Abstract Waveform (The "Content") */}
                  <path d="M60 150 Q 100 100, 140 150 T 220 150 T 300 150 T 340 150" 
                        stroke="#D8C6A5" strokeWidth="2" fill="none" 
                        className="animate-pulse" style={{filter: 'drop-shadow(0 0 8px rgba(216, 198, 165, 0.5))'}} />
                  
                  {/* Stand/Legs */}
                  <path d="M120 302 L 100 330" stroke="#333" strokeWidth="4" strokeLinecap="round"/>
                  <path d="M280 302 L 300 330" stroke="#333" strokeWidth="4" strokeLinecap="round"/>
                  
                  {/* Antenna */}
                  <path d="M200 2 L 140 -40" stroke="#444" strokeWidth="2"/>
                  <path d="M200 2 L 260 -40" stroke="#444" strokeWidth="2"/>
                  <circle cx="140" cy="-40" r="4" fill="#666"/>
                  <circle cx="260" cy="-40" r="4" fill="#666"/>
               </svg>
            </div>
          </div>
        </section>

        {/* Marquee Divider */}
        <div className="w-full border-y border-[#222] bg-[#050505] py-6 mb-32 overflow-hidden relative group">
           <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10"></div>
           <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10"></div>
           <div className="flex gap-16 whitespace-nowrap text-sm font-bold tracking-[0.2em] uppercase text-[#444] group-hover:text-[#666] transition-colors duration-700">
              {[...Array(8)].map((_, i) => (
                  <span key={i} className="inline-flex gap-4">
                      <span>Strategy</span> • <span>Production</span> • <span>Distribution</span> • <span>Growth</span> •
                  </span>
              ))}
           </div>
        </div>

        {/* Services Grid */}
        <section id="capabilities" className="container mx-auto px-6 mb-40">
           <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-[#222] pb-6">
            <h2 className="text-4xl md:text-5xl font-serif italic text-[#D8C6A5]">Capabilities</h2>
            <p className="text-[#666] mb-2 md:mb-0">Selected works & offerings</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-px bg-[#222] border border-[#222]">
            {[
              { title: "Short-Form", num: "01", desc: "Hooks and retention loops optimized for algorithms." },
              { title: "Authority", num: "02", desc: "Narrative-driven LinkedIn carousels for founders." },
              { title: "Cinema", num: "03", desc: "Turning boring demos into product trailers." }
            ].map((item, i) => (
              <div key={i} className="group bg-[#080808] p-10 hover:bg-[#0A0A0A] transition-all duration-500 relative overflow-hidden cursor-pointer">
                <div className="mb-12 flex justify-between items-start z-10 relative">
                  <span className="text-xs font-bold tracking-widest text-[#444] group-hover:text-[#D8C6A5] transition-colors">{item.num}</span>
                  <ArrowRight className="text-[#333] group-hover:text-[#D8C6A5] -rotate-45 group-hover:rotate-0 transition-all duration-500" />
                </div>
                <h3 className="text-2xl font-serif italic mb-4 text-[#EBE9E4] z-10 relative">{item.title}</h3>
                <p className="text-[#888] text-sm leading-relaxed mb-8 z-10 relative group-hover:text-[#aaa] transition-colors">
                  {item.desc}
                </p>
                {/* Micro-interaction: Corner glow */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#D8C6A5]/5 rounded-full blur-2xl group-hover:bg-[#D8C6A5]/10 transition-all duration-700"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Horizontal Scroll Case Studies Section */}
        <section id="case-studies" ref={caseStudyRef} className="relative" style={{ height: '100vh' }}>
          <div className="sticky top-0 h-screen overflow-hidden flex flex-col pt-32">
             
             {/* Header */}
             <div className="absolute top-10 md:top-20 left-0 w-full px-6 z-20">
               <div className="container mx-auto">
                 <div>
                    <span className="inline-block px-3 py-1 mb-6 border border-[#D8C6A5]/20 text-[#D8C6A5] text-[10px] font-bold uppercase tracking-wider">
                         Select Works
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif italic text-[#EBE9E4]">Case Studies</h2>
                 </div>
               </div>
             </div>

             {/* Navigation Indicators */}
             <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
               {caseStudies.map((_, index) => (
                 <div
                   key={index}
                   className={`h-2 rounded-full transition-all duration-300 ${
                     slideIndex === index
                       ? 'bg-[#D8C6A5] w-8'
                       : 'bg-[#333] w-2'
                   }`}
                   aria-label={`Case study ${index + 1}`}
                 />
               ))}
             </div>

             {/* Moving Track */}
             <div 
               className="flex h-full items-center will-change-transform transition-transform duration-500 ease-in-out"
               style={{ 
                 transform: `translateX(-${slideIndex * 100}vw)` 
               }}
             >
               {caseStudies.map((study, index) => (
                 <div 
                   key={index} 
                   className="w-screen h-[60vh] shrink-0 px-4 md:px-20 relative flex items-center justify-center transition-opacity duration-500"
                   style={{ 
                      // Simple opacity: Always visible. The scroll 'Hold' effectively handles the focus.
                     opacity: 1
                   }}
                 >
                    <div className="w-full max-w-6xl bg-[#0A0A0A] border border-[#222] rounded-sm overflow-hidden flex flex-col md:flex-row h-full shadow-2xl">
                      
                      {/* Content Side */}
                      <div className="md:w-5/12 p-8 md:p-12 flex flex-col justify-center border-r border-[#222] bg-[#080808] relative z-10">
                         <div className="mb-auto pt-4">
                            <div className="flex gap-2 mb-6">
                              <span className="px-3 py-1 border border-[#333] text-[#888] text-xs font-bold uppercase tracking-wider">{study.tag}</span>
                            </div>
                            <h3 className="text-4xl md:text-5xl font-serif text-[#EBE9E4] mb-6">{study.client}</h3>
                            <p className="text-[#888] text-lg leading-relaxed">
                               {study.desc}
                            </p>
                         </div>
                         <div className="mt-8 pt-8 border-t border-[#222]">
                            <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: study.color }}>Result</div>
                            <div className="text-3xl font-light text-white">{study.stat}</div>
                         </div>
                      </div>
                      
                      {/* Image/Visual Side */}
                      <div className="md:w-7/12 relative overflow-hidden bg-[#111]">
                          <div className="absolute inset-0 opacity-20"
                               style={{ background: `radial-gradient(circle at center, ${study.color}, transparent 70%)` }}>
                          </div>
                          
                          {/* Abstract geometric composition different for each card */}
                          <div className="absolute inset-0 flex items-center justify-center">
                             {index === 0 && (
                               <div className="w-64 h-64 border border-white/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-1000">
                                  <div className="w-48 h-48 border border-white/20 rounded-full"></div>
                               </div>
                             )}
                             {index === 1 && (
                               <div className="w-48 h-64 border border-white/10 skew-x-12 group-hover:skew-x-0 transition-transform duration-1000"></div>
                             )}
                             {index === 2 && (
                               <div className="grid grid-cols-2 gap-4">
                                  <div className="w-20 h-20 border border-white/10 rounded-lg group-hover:translate-y-4 transition-transform duration-700"></div>
                                  <div className="w-20 h-20 border border-white/10 rounded-lg group-hover:-translate-y-4 transition-transform duration-700"></div>
                               </div>
                             )}
                          </div>
                          
                          <div className="absolute bottom-8 right-8">
                             <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center bg-black/50 backdrop-blur-md group-hover:bg-[#EBE9E4] group-hover:text-black transition-all cursor-pointer">
                                <MoveUpRight size={24} />
                             </div>
                          </div>
                      </div>
                    </div>
                 </div>
               ))}
             </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="container mx-auto px-6 mb-32 pt-20 -mt-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif italic text-[#D8C6A5] mb-4">Partnership Models</h2>
            <p className="text-[#666]">Select the velocity that fits your roadmap.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            
            {/* Tier 1 */}
            <div className="border border-[#222] bg-[#0A0A0A] p-8 flex flex-col hover:border-[#333] transition-colors duration-300">
               <div className="mb-4 text-[#888] font-bold tracking-widest text-xs uppercase">Editorial</div>
               <div className="text-3xl font-serif text-[#EBE9E4] mb-2">$3,000<span className="text-sm font-sans text-[#444] font-normal">/mo</span></div>
               <p className="text-[#666] text-sm mb-8 min-h-[40px]">Perfect for founders who record their own raw footage.</p>
               <div className="space-y-4 mb-8 flex-1">
                  {['4 Short-Form Videos', 'Professional Editing', 'Thumbnail Design', 'Slack Support'].map(feat => (
                     <div key={feat} className="flex gap-3 text-sm text-[#999]">
                        <Check size={16} className="text-[#333]" /> {feat}
                     </div>
                  ))}
               </div>
               <button className="w-full py-3 border border-[#333] text-[#888] hover:border-[#D8C6A5] hover:text-[#D8C6A5] transition-colors text-sm font-bold tracking-wide">Select Plan</button>
            </div>

            {/* Tier 2 - Highlighted */}
            <div className="border border-[#D8C6A5]/40 bg-[#0C0C0C] p-8 flex flex-col relative transform md:-translate-y-4 shadow-[0_0_40px_-10px_rgba(216,198,165,0.1)]">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#D8C6A5] text-[#080808] text-[10px] font-bold uppercase px-3 py-1 tracking-widest">Most Common</div>
               <div className="mb-4 text-[#D8C6A5] font-bold tracking-widest text-xs uppercase flex items-center gap-2">
                  <Zap size={14} fill="currentColor" /> Growth
               </div>
               <div className="text-4xl font-serif text-[#EBE9E4] mb-2">$6,500<span className="text-sm font-sans text-[#444] font-normal">/mo</span></div>
               <p className="text-[#888] text-sm mb-8 min-h-[40px]">Full-stack production. We handle strategy, scripts, and editing.</p>
               <div className="space-y-4 mb-8 flex-1">
                  {['8 Short-Form Videos', '2 LinkedIn Carousels', 'Strategy Workshops', 'Dedicated Creative Director', '48h Turnaround'].map(feat => (
                     <div key={feat} className="flex gap-3 text-sm text-[#EBE9E4]">
                        <Check size={16} className="text-[#D8C6A5]" /> {feat}
                     </div>
                  ))}
               </div>
               <button className="w-full py-3 bg-[#D8C6A5] text-[#080808] hover:bg-[#C4B291] transition-colors text-sm font-bold tracking-wide">Start Growth</button>
            </div>

            {/* Tier 3 */}
            <div className="border border-[#222] bg-[#0A0A0A] p-8 flex flex-col hover:border-[#333] transition-colors duration-300">
               <div className="mb-4 text-[#888] font-bold tracking-widest text-xs uppercase">Scale</div>
               <div className="text-3xl font-serif text-[#EBE9E4] mb-2">Custom</div>
               <p className="text-[#666] text-sm mb-8 min-h-[40px]">For Series-B+ teams needing high-volume throughput.</p>
               <div className="space-y-4 mb-8 flex-1">
                  {['Daily Content Output', 'Product Demo Suites', 'Podcast Production', 'Multi-Channel Distribution', 'Priority Slack Channel'].map(feat => (
                     <div key={feat} className="flex gap-3 text-sm text-[#999]">
                        <Check size={16} className="text-[#333]" /> {feat}
                     </div>
                  ))}
               </div>
               <button className="w-full py-3 border border-[#333] text-[#888] hover:border-[#D8C6A5] hover:text-[#D8C6A5] transition-colors text-sm font-bold tracking-wide">Contact Us</button>
            </div>

          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-6 pt-20 border-t border-[#222]">
          <div className="grid md:grid-cols-2 gap-20 mb-20">
             <div>
                <h2 className="text-6xl font-serif italic text-[#EBE9E4] mb-8">Ready to evolve?</h2>
                <div className="flex flex-col gap-6">
                   <a href="mailto:hello@distrohq.com" className="text-2xl text-[#666] hover:text-[#D8C6A5] transition-colors flex items-center gap-4 group">
                      <span className="w-2 h-2 rounded-full bg-[#333] group-hover:bg-[#D8C6A5] transition-colors"></span>
                      Book a discovery call
                   </a>
                </div>
             </div>
             
             <div className="flex flex-col justify-end items-start md:items-end">
                <div className="text-right">
                   <div className="text-[#D8C6A5] font-serif text-2xl mb-2">DistroHQ</div>
                   <address className="text-[#666] not-italic mb-8">
                      San Francisco, CA<br/>
                      <a href="mailto:hello@distrohq.com" className="hover:text-[#D8C6A5] transition-colors">hello@distrohq.com</a>
                   </address>
                   <div className="flex gap-4">
                      <a href="https://linkedin.com/company/distrohq" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-[#333] hover:border-[#D8C6A5] rounded-full flex items-center justify-center text-[#666] hover:text-[#D8C6A5] transition-colors cursor-pointer" aria-label="LinkedIn">
                         <Linkedin size={16} />
                      </a>
                      <a href="https://distrohq.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-[#333] hover:border-[#D8C6A5] rounded-full flex items-center justify-center text-[#666] hover:text-[#D8C6A5] transition-colors cursor-pointer" aria-label="Website">
                         <Globe size={16} />
                      </a>
                   </div>
                </div>
             </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center py-8 border-t border-[#222] text-xs text-[#444] uppercase tracking-widest font-bold">
             <div>© 2025 DistroHQ Systems</div>
             <div className="flex gap-8 mt-4 md:mt-0">
                <a href="/privacy" className="hover:text-[#666]">Privacy</a>
                <a href="/terms" className="hover:text-[#666]">Terms</a>
             </div>
          </div>
        </footer>

      </main>
    </div>
  );
}

