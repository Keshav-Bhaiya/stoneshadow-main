import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  {
    url: 'https://i.pinimg.com/736x/26/84/43/2684430f21b532580c0eff821fb325bc.jpg',
    title: 'Luxury Villa Exterior',
    sub: 'Premium Stone Cladding',
  },
  {
    url: 'https://i.pinimg.com/736x/e4/e4/19/e4e419a78279284ae74e001bda8247e1.jpg',
    title: 'Modern Architecture',
    sub: 'Black Basalt Wall Panels',
  },
  {
    url: 'https://i.pinimg.com/736x/5f/23/b0/5f23b016402d9a6cead1bdb10a60a728.jpg',
    title: 'Elegant Interiors',
    sub: 'Natural Stone Flooring',
  },
  {
    url: 'https://i.pinimg.com/1200x/49/e2/c3/49e2c384c6d112eff88ff3ac47dd85cd.jpg',
    title: 'Landscape Design',
    sub: 'Sandstone Garden Pavers',
  },
  {
    url: 'https://i.pinimg.com/736x/15/49/98/154998014d65956f13c4297c4b6e2bf7.jpg',
    title: 'Stone Shadow Projects',
    sub: 'Crafted for Every Space',
  },
];

/* generate particle data once outside component so it's stable */
const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id:       i,
  size:     Math.random() * 11 + 4,
  left:     Math.random() * 100,
  delay:    Math.random() * 9,
  duration: Math.random() * 10 + 13,
  opacity:  Math.random() * 0.18 + 0.06,
  blurred:  i % 3 === 0,
  colorA:   i % 2 === 0 ? 'rgba(180,140,100,0.9)' : 'rgba(120,170,120,0.7)',
  colorB:   i % 2 === 0 ? 'rgba(180,130,60,0.4)'  : 'rgba(80,140,80,0.3)',
}));

const Hero = () => {
  const [current,     setCurrent]     = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction,   setDirection]   = useState<'left' | 'right'>('right');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => goTo('right'), 3500);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const goTo = (dir: 'left' | 'right') => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(dir);
    setTimeout(() => {
      setCurrent(prev =>
        dir === 'right'
          ? (prev + 1) % SLIDES.length
          : (prev - 1 + SLIDES.length) % SLIDES.length
      );
      setIsAnimating(false);
    }, 500);
    startTimer();
  };

  /* ── Fixed scroll helper ──────────────────────────────────────────
     "projects" doesn't exist as an id in Home.tsx.
     So we try a fallback chain: projects → gallery → stats
     Also offsets by 70px to account for the fixed navbar.
  ──────────────────────────────────────────────────────────────── */
  const scrollTo = (id: string) => {
    const fallbacks: Record<string, string[]> = {
      products: ['products', 'categories'],
      projects: ['gallery', 'projects', 'stats'],  // VIEW PROJECTS → gallery section
    };

    const chain = fallbacks[id] ?? [id];
    let el: HTMLElement | null = null;

    for (const key of chain) {
      el = document.getElementById(key);
      if (el) break;
    }

    if (el) {
      const navbarHeight = 70;
      const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative pt-20 min-h-screen overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #faf8f5 0%, #f0ebe3 45%, #f7f4ee 100%)' }}
    >

      {/* ════════════════════════════════════════════
          ░░  BACKGROUND EFFECTS LAYER  ░░
      ════════════════════════════════════════════ */}

      {/* Large soft-glow orbs */}
      <div className="absolute pointer-events-none"
           style={{ width: 480, height: 480, top: '-8%', left: '-6%',
             background: 'radial-gradient(circle, rgba(180,140,100,0.12) 0%, transparent 70%)',
             animation: 'orbFloat 18s ease-in-out infinite alternate' }} />
      <div className="absolute pointer-events-none"
           style={{ width: 360, height: 360, top: '50%', left: '65%',
             background: 'radial-gradient(circle, rgba(90,140,90,0.09) 0%, transparent 70%)',
             animation: 'orbFloat 22s ease-in-out infinite alternate-reverse', animationDelay: '4s' }} />
      <div className="absolute pointer-events-none"
           style={{ width: 280, height: 280, top: '25%', left: '35%',
             background: 'radial-gradient(circle, rgba(200,170,110,0.08) 0%, transparent 70%)',
             animation: 'orbFloat 15s ease-in-out infinite alternate', animationDelay: '2s' }} />

      {/* Diagonal light beam — top-left */}
      <div className="absolute pointer-events-none"
           style={{ top: '-12%', left: '-6%', width: '55%', height: '75%',
             background: 'linear-gradient(135deg, rgba(210,180,140,0.14) 0%, transparent 60%)',
             transform: 'rotate(-14deg)', animation: 'beamPulse 7s ease-in-out infinite' }} />

      {/* Diagonal light beam — bottom-right */}
      <div className="absolute pointer-events-none"
           style={{ bottom: '-18%', right: '-6%', width: '42%', height: '60%',
             background: 'linear-gradient(315deg, rgba(100,160,110,0.07) 0%, transparent 60%)',
             transform: 'rotate(-14deg)',
             animation: 'beamPulse 9s ease-in-out infinite reverse', animationDelay: '3s' }} />

      {/* Fine dot/grid texture */}
      <div className="absolute inset-0 pointer-events-none"
           style={{ backgroundImage: 'radial-gradient(circle, rgba(92,61,46,0.07) 1px, transparent 1px)',
             backgroundSize: '36px 36px' }} />

      {/* Shimmer sweep */}
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: 'linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.20) 50%, transparent 62%)',
             backgroundSize: '200% 100%', animation: 'shimmerSweep 8s linear infinite' }} />

      {/* Floating particles */}
      {PARTICLES.map(p => (
        <div key={p.id} className="absolute rounded-full pointer-events-none"
             style={{ width: p.size, height: p.size, left: `${p.left}%`, bottom: '-6%',
               opacity: p.opacity,
               background: `radial-gradient(circle, ${p.colorA} 0%, ${p.colorB} 100%)`,
               filter: p.blurred ? 'blur(2.5px)' : 'none',
               boxShadow: `0 0 ${p.size * 1.5}px ${p.colorA}`,
               animation: `floatUp ${p.duration}s ease-in-out ${p.delay}s infinite` }} />
      ))}

      {/* Spinning geometric accents */}
      <div className="absolute top-24 right-8 w-20 h-20 border border-[#5C3D2E]/12 rotate-12 pointer-events-none"
           style={{ animation: 'spinSlow 35s linear infinite' }} />
      <div className="absolute top-32 right-14 w-10 h-10 border border-[#5C3D2E]/10 pointer-events-none"
           style={{ animation: 'spinSlow 22s linear infinite reverse' }} />
      <div className="absolute bottom-28 left-8 w-16 h-16 border border-emerald-700/10 -rotate-12 pointer-events-none"
           style={{ animation: 'spinSlow 28s linear infinite' }} />
      <div className="absolute bottom-40 left-16 w-8 h-8 border border-amber-800/10 pointer-events-none"
           style={{ animation: 'spinSlow 18s linear infinite reverse' }} />

      {/* Small glowing dots */}
      {[
        { t: '18%', l: '8%',  s: 5, c: 'rgba(180,140,100,0.5)', dur: 4 },
        { t: '65%', l: '4%',  s: 4, c: 'rgba(90,140,90,0.4)',   dur: 5 },
        { t: '35%', l: '92%', s: 6, c: 'rgba(180,140,100,0.4)', dur: 6 },
        { t: '80%', l: '88%', s: 4, c: 'rgba(90,140,90,0.35)',  dur: 4 },
        { t: '12%', l: '52%', s: 5, c: 'rgba(180,140,100,0.3)', dur: 7 },
      ].map((d, i) => (
        <div key={i} className="absolute rounded-full pointer-events-none"
             style={{ top: d.t, left: d.l, width: d.s, height: d.s,
               background: d.c, boxShadow: `0 0 ${d.s * 3}px ${d.c}`,
               animation: `glowPulse ${d.dur}s ease-in-out infinite`,
               animationDelay: `${i * 1.2}s` }} />
      ))}

      {/* ════════════════════════════════════════════
          ░░  MAIN CONTENT  ░░
      ════════════════════════════════════════════ */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* ── LEFT TEXT ── */}
          <div className="relative z-10">
            <div className="space-y-6">

              {/* Badge */}
              <div className="inline-block opacity-0"
                   style={{ animation: 'fadeSlideUp 0.7s ease forwards 0.1s' }}>
                <span className="text-xs font-medium text-emerald-700 tracking-widest
                                 border border-emerald-700 px-4 py-1 bg-emerald-50/70 backdrop-blur-sm">
                PREMIUM QUALITY                  
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold
                             text-gray-800 leading-tight opacity-0"
                  style={{ animation: 'fadeSlideUp 0.8s ease forwards 0.25s' }}>
                <span className="text-gray-700">STONE SHADOW</span>
              </h1>

              {/* Italic tagline */}
              <p className="text-lg sm:text-xl italic text-amber-800 font-serif opacity-0"
                 style={{ animation: 'fadeSlideUp 0.8s ease forwards 0.4s' }}>
                Crafted for Interiors &amp; Exteriors
              </p>

              {/* Para */}
              <p className="text-gray-600 text-base leading-relaxed max-w-md opacity-0"
                 style={{ animation: 'fadeSlideUp 0.8s ease forwards 0.55s' }}>
                Discover the finest collection of marble, granite, and natural stones sourced
                globally for your architectural masterpieces.
              </p>

              {/* ── Buttons ── */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 opacity-0"
                   style={{ animation: 'fadeSlideUp 0.8s ease forwards 0.7s' }}>

                {/* EXPLORE STONES → #products (or #categories fallback) */}
                <button
                  onClick={() => scrollTo('products')}
                  className="relative overflow-hidden bg-[#5C3D2E] text-white px-8 py-3 font-medium
                             hover:bg-[#4a3124] transition-all duration-300 transform hover:scale-105
                             flex items-center justify-center group shadow-md
                             hover:shadow-[0_8px_24px_rgba(92,61,46,0.35)]"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15
                                   to-transparent -translate-x-full group-hover:translate-x-full
                                   transition-transform duration-700" />
                  EXPLORE STONES
                  <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
                </button>

                {/* VIEW PROJECTS → #gallery (fallback chain: gallery → stats) */}
                <button
                  onClick={() => scrollTo('projects')}
                  className="border-2 border-gray-800 text-gray-800 px-8 py-3 font-medium
                             hover:bg-gray-800 hover:text-white transition-all duration-300"
                >
                  VIEW PROJECTS
                </button>
              </div>

              {/* Slide dots */}
              <div className="flex gap-2 pt-2 opacity-0"
                   style={{ animation: 'fadeSlideUp 0.8s ease forwards 0.85s' }}>
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (isAnimating) return;
                      setDirection(i > current ? 'right' : 'left');
                      setIsAnimating(true);
                      setTimeout(() => { setCurrent(i); setIsAnimating(false); }, 500);
                      startTimer();
                    }}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === current ? 'w-8 bg-[#5C3D2E]' : 'w-3 bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT IMAGE SLIDER ── */}
          <div className="relative mt-8 lg:mt-0 opacity-0"
               style={{ animation: 'fadeSlideRight 1s ease forwards 0.3s' }}>
            <div className="relative rounded-lg overflow-hidden shadow-2xl group">

              <div className="relative w-full h-96 lg:h-[600px] overflow-hidden">
                <img
                  key={current}
                  src={SLIDES[current].url}
                  alt={SLIDES[current].title}
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    isAnimating
                      ? direction === 'right'
                        ? '-translate-x-4 opacity-0 scale-105'
                        : 'translate-x-4 opacity-0 scale-105'
                      : 'translate-x-0 opacity-100 scale-100'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 h-[3px] bg-[#5C3D2E]/80"
                     style={{ animation: 'progressBar 3.5s linear infinite' }} />
              </div>

              {/* Prev */}
              <button
                onClick={() => goTo('left')}
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 hover:bg-white
                           p-3 rounded-full shadow-lg transition-all duration-300
                           opacity-0 group-hover:opacity-100 hover:scale-110"
              >
                <ChevronLeft size={24} className="text-gray-800" />
              </button>

              {/* Next */}
              <button
                onClick={() => goTo('right')}
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-[#5C3D2E]/90
                           hover:bg-[#5C3D2E] p-3 rounded-full shadow-lg transition-all duration-300
                           opacity-0 group-hover:opacity-100 hover:scale-110"
              >
                <ChevronRight size={24} className="text-white" />
              </button>

              {/* Caption */}
              <div key={`caption-${current}`}
                   className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm p-4
                              shadow-xl max-w-xs animate-[fadeSlideUp_0.5s_ease_forwards]">
                <h3 className="font-serif font-bold text-gray-800 text-lg mb-1">
                  {SLIDES[current].title}
                </h3>
                <p className="text-sm text-gray-600">{SLIDES[current].sub}</p>
              </div>

              {/* Counter */}
              <div className="absolute top-5 left-5 bg-black/40 backdrop-blur-sm text-white
                              text-xs font-medium px-3 py-1.5 rounded-full">
                {String(current + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
              </div>
            </div>

            {/* Decorative border */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2
                            border-[#5C3D2E]/20 rounded-lg -z-10" />
          </div>
        </div>
      </div>

      {/* ── All keyframes ── */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes fadeSlideRight {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0);    }
        }
        @keyframes progressBar {
          from { width: 0%;   }
          to   { width: 100%; }
        }
        @keyframes floatUp {
          0%   { transform: translateY(0px) scale(1);      opacity: 0;   }
          8%   { opacity: 1; }
          92%  { opacity: 0.7; }
          100% { transform: translateY(-110vh) scale(0.5); opacity: 0;   }
        }
        @keyframes orbFloat {
          0%   { transform: translate(0px, 0px)    scale(1);    }
          50%  { transform: translate(22px, 16px)  scale(1.06); }
          100% { transform: translate(-12px, 22px) scale(0.96); }
        }
        @keyframes beamPulse {
          0%, 100% { opacity: 1;   }
          50%      { opacity: 0.3; }
        }
        @keyframes shimmerSweep {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(360deg); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.4; transform: scale(1);   }
          50%      { opacity: 1;   transform: scale(1.6); }
        }
      `}</style>
    </section>
  );
};

export default Hero;