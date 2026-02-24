import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id:       i,
  size:     Math.random() * 10 + 4,
  left:     Math.random() * 100,
  delay:    Math.random() * 9,
  duration: Math.random() * 10 + 13,
  opacity:  Math.random() * 0.15 + 0.05,
  blurred:  i % 3 === 0,
  colorA:   i % 2 === 0 ? 'rgba(180,140,100,0.9)' : 'rgba(120,170,120,0.7)',
  colorB:   i % 2 === 0 ? 'rgba(180,130,60,0.4)'  : 'rgba(80,140,80,0.3)',
}));

const filters = ['ALL', 'COBBLESTONES', 'WALL CLADDING', 'SANDSTONE FLOORING', 'STONE CRAFT', 'SPECIAL STONES'];

interface Project {
  image:     string;
  name:      string;
  category:  string;
  span:      string;
  fallback?: string;
}

const projects: Project[] = [
  // COBBLESTONES
  { image: 'https://i.pinimg.com/736x/58/6c/7a/586c7a850429e967b730a3981e520fa4.jpg',                                name: 'Cobble Stone',             category: 'COBBLESTONES',       span: 'row-span-2' },
  { image: 'https://i.pinimg.com/1200x/df/d5/b6/dfd5b662c66d731e0e15f9cb0322c1e8.jpg',                               name: 'Black Limestone Cobbles',  category: 'COBBLESTONES',       span: 'row-span-1' },
  { image: 'https://images.pexels.com/photos/1029243/pexels-photo-1029243.jpeg?auto=compress&cs=tinysrgb&w=600',      name: 'Sagr Black Cobbles',       category: 'COBBLESTONES',       span: 'row-span-1' },
  { image: 'https://images.pexels.com/photos/3934512/pexels-photo-3934512.jpeg?auto=compress&cs=tinysrgb&w=600',      name: 'Multicolor Cobbles',       category: 'COBBLESTONES',       span: 'row-span-1' },

  // WALL CLADDING
  { image: 'https://i.pinimg.com/1200x/60/80/4a/60804ac009ce365d492f3f6712e5c0a2.jpg',                                name: 'Wall Cladding Exterior',   category: 'WALL CLADDING',      span: 'row-span-2' },
  { image: 'https://i.pinimg.com/736x/83/53/54/835354608adf130aa25fd84286042cc3.jpg',                                 name: 'Wall Cladding',            category: 'WALL CLADDING',      span: 'row-span-1' },
  { image: 'https://i.pinimg.com/1200x/ec/05/54/ec0554f2a33129243fcb631add5f37d5.jpg',                                name: 'Crazy Sandstone Cladding', category: 'WALL CLADDING',      span: 'row-span-1' },
  { image: 'https://i.pinimg.com/736x/61/c7/9f/61c79f2dfdd7e9404d4642638bb0f683.jpg',                                 name: 'Stone Carving',            category: 'WALL CLADDING',      span: 'row-span-1' },

  // STONE CRAFT
  { image: 'https://i.pinimg.com/736x/da/d0/4d/dad04d14c805ba6ae6f9f3523c46831b.jpg',                                 name: 'Stone Craft',              category: 'STONE CRAFT',        span: 'row-span-2' },
  { image: 'https://i.pinimg.com/736x/cf/86/4c/cf864c7ff48cdbfd60a42cf3776d9fad.jpg',                                 name: 'Morals',                   category: 'STONE CRAFT',        span: 'row-span-1' },
  { image: 'https://images.pexels.com/photos/2227832/pexels-photo-2227832.jpeg?auto=compress&cs=tinysrgb&w=600',      name: 'Stone Table',              category: 'STONE CRAFT',        span: 'row-span-1' },
  { image: 'https://i.pinimg.com/1200x/3c/a8/bf/3ca8bff094f09eb6ec132ba301624a21.jpg',                                name: 'Wall Fountain',            category: 'STONE CRAFT',        span: 'row-span-1' },

  // SANDSTONE FLOORING
  { image: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=600',      name: 'Sandstone Flooring',       category: 'SANDSTONE FLOORING', span: 'row-span-2' },
  { image: 'https://i.pinimg.com/1200x/7d/0d/ea/7d0dea976355aac4603cbe5fa3ba55ef.jpg',                                name: 'Black Lime Stone',         category: 'SANDSTONE FLOORING', span: 'row-span-1' },
  { image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600',      name: 'Gwalior Mint Sandstone',   category: 'SANDSTONE FLOORING', span: 'row-span-1' },
  { image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=600',      name: 'Teak Sandstone',           category: 'SANDSTONE FLOORING', span: 'row-span-1' },
  { image: 'https://images.pexels.com/photos/3822843/pexels-photo-3822843.jpeg?auto=compress&cs=tinysrgb&w=600',      name: 'Rainbow Sandstone',        category: 'SANDSTONE FLOORING', span: 'row-span-1' },

  // SPECIAL STONES
  { image: 'https://i.pinimg.com/1200x/c8/3f/23/c83f236f7fa7fce7fc9094bf3f8ae061.jpg',                               name: 'Mandana Red Stone',        category: 'SPECIAL STONES',     span: 'row-span-2' },
  { image: 'https://images.pexels.com/photos/1029243/pexels-photo-1029243.jpeg?auto=compress&cs=tinysrgb&w=600',      name: 'Kandla Grey Stone',        category: 'SPECIAL STONES',     span: 'row-span-1' },
  { image: 'https://i.pinimg.com/736x/da/31/7a/da317a7a0500037fc5daf47b717cf451.jpg',                                 name: 'Kota Stone',               category: 'SPECIAL STONES',     span: 'row-span-1' },
  { image: 'https://i.pinimg.com/1200x/6e/be/7e/6ebe7e7f7b09d00371208c8329b6a806.jpg',                               name: 'Mandana Red Stone',        category: 'SPECIAL STONES',     span: 'row-span-1' },
  { image: 'https://i.pinimg.com/736x/7a/ee/16/7aee16df78e6c9bf61dc92ef2d73744a.jpg',                                 name: 'Dholpur sand stone',       category: 'SPECIAL STONES',     span: 'row-span-1' },
  { image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=600',      name: 'Basalt',                   category: 'SPECIAL STONES',     span: 'row-span-1' },
];

/* ══════════════════════════════════════
   GALLERY CARD
══════════════════════════════════════ */
interface GalleryCardProps {
  project: Project;
  index:   number;
}

function GalleryCard({ project, index }: GalleryCardProps) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${project.span} relative overflow-hidden cursor-pointer rounded-xl group`}
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.97)',
        transition: `opacity 0.6s ease ${index * 0.07}s, transform 0.6s ease ${index * 0.07}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <img
        src={project.image}
        alt={project.name}
        className="w-full h-full object-cover"
        style={{
          transform:  hovered ? 'scale(1.12)' : 'scale(1.0)',
          filter:     hovered ? 'brightness(0.65) saturate(1.2)' : 'brightness(0.78) saturate(1.0)',
          transition: 'transform 0.75s cubic-bezier(0.25,0.8,0.25,1), filter 0.5s ease',
        }}
        onError={(e) => {
          if (project.fallback) (e.target as HTMLImageElement).src = project.fallback;
        }}
      />

      {/* Category chip */}
      <div className="absolute top-3 left-3">
        <span
          className="text-[9px] font-black tracking-[2px] font-mono px-2.5 py-1 rounded"
          style={{
            background: 'rgba(255,255,255,0.9)',
            color:      '#5C3D2E',
            border:     '1px solid rgba(92,61,46,0.25)',
            boxShadow:  '0 2px 8px rgba(92,61,46,0.15)',
          }}
        >
          {project.category}
        </span>
      </div>

      {/* Hover gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: hovered
            ? 'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(92,61,46,0.82) 100%)'
            : 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.55) 100%)',
          transition: 'background 0.5s ease',
        }}
      />

      {/* Shimmer on hover */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:         'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.1) 48%, transparent 66%)',
          backgroundSize:     '200% 200%',
          backgroundPosition: hovered ? '0% 0%' : '200% 200%',
          transition:         'background-position 0.7s ease',
        }}
      />

      {/* Bottom info */}
      <div
        className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-8"
        style={{
          background: 'linear-gradient(transparent, rgba(0,0,0,0.75))',
          transform:  hovered ? 'translateY(0)' : 'translateY(8px)',
          opacity:    hovered ? 1 : 0.7,
          transition: 'transform 0.4s ease, opacity 0.4s ease',
        }}
      >
        <h4
          className="text-white font-bold text-base leading-tight mb-1.5"
          style={{
            fontFamily: "Palatino, 'Book Antiqua', Georgia, serif",
            textShadow: '0 2px 8px rgba(0,0,0,0.6)',
          }}
        >
          {project.name}
        </h4>
        <div
          className="h-0.5 rounded-full"
          style={{
            width:      hovered ? 36 : 16,
            background: '#d4a847',
            transition: 'width 0.4s ease',
          }}
        />
      </div>

      {/* Corner glow */}
      <div
        className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,168,71,0.3), transparent 70%)',
          opacity:    hovered ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      />
    </div>
  );
}

/* ══════════════════════════════════════
   LOAD MORE BUTTON
══════════════════════════════════════ */
function LoadMoreButton() {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/gallery')}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden font-mono text-xs font-bold tracking-[4px]
                 px-12 py-3.5 rounded-sm cursor-pointer"
      style={{
        border:      '2px solid',
        borderColor: hovered ? '#5C3D2E' : '#374151',
        color:       hovered ? '#ffffff' : '#1f2937',
        background:  hovered ? '#5C3D2E' : 'transparent',
        transition:  'all 0.35s cubic-bezier(0.25,0.8,0.25,1)',
        boxShadow:   hovered ? '0 8px 28px rgba(92,61,46,0.35)' : 'none',
        transform:   hovered ? 'translateY(-3px) scale(1.03)' : 'translateY(0) scale(1)',
      }}
    >
      <span
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)',
          transform:  hovered ? 'translateX(200%)' : 'translateX(-200%)',
          transition: 'transform 0.65s ease',
        }}
      />
      ↓ &nbsp; VIEW STONES
    </button>
  );
}

/* ══════════════════════════════════════
   MAIN GALLERY COMPONENT
══════════════════════════════════════ */
const Gallery = () => {
  const [activeFilter,  setActiveFilter]  = useState('ALL');
  const [animating,     setAnimating]     = useState(false);
  const [displayFilter, setDisplayFilter] = useState('ALL');

  const handleFilter = (f: string) => {
    if (f === activeFilter) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveFilter(f);
      setDisplayFilter(f);
      setAnimating(false);
    }, 280);
  };

  const filtered = (() => {
    if (displayFilter !== 'ALL') return projects.filter(p => p.category === displayFilter);
    const excluded = ['Mandana Red Stone', 'Kandla Grey Stone'];
    const seen: Record<string, number> = {};
    return projects.filter(p => {
      if (excluded.includes(p.name)) return false;
      seen[p.category] = (seen[p.category] || 0) + 1;
      return seen[p.category] <= 2;
    });
  })();

  return (
    <>
      <style>{`
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
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes shimmerTitle {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
      `}</style>

      <section
        id="gallery"
        className="relative py-24 min-h-screen overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #faf8f5 0%, #f0ebe3 45%, #f7f4ee 100%)' }}
      >

        {/* ── Orbs ── */}
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

        {/* ── Diagonal beams ── */}
        <div className="absolute pointer-events-none"
             style={{ top: '-12%', left: '-6%', width: '55%', height: '75%',
               background: 'linear-gradient(135deg, rgba(210,180,140,0.14) 0%, transparent 60%)',
               transform: 'rotate(-14deg)', animation: 'beamPulse 7s ease-in-out infinite' }} />
        <div className="absolute pointer-events-none"
             style={{ bottom: '-18%', right: '-6%', width: '42%', height: '60%',
               background: 'linear-gradient(315deg, rgba(100,160,110,0.07) 0%, transparent 60%)',
               transform: 'rotate(-14deg)',
               animation: 'beamPulse 9s ease-in-out infinite reverse',
               animationDelay: '3s' }} />

        {/* ── Dot grid ── */}
        <div className="absolute inset-0 pointer-events-none"
             style={{ backgroundImage: 'radial-gradient(circle, rgba(92,61,46,0.07) 1px, transparent 1px)',
               backgroundSize: '36px 36px' }} />

        {/* ── Shimmer sweep ── */}
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: 'linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.20) 50%, transparent 62%)',
               backgroundSize: '200% 100%', animation: 'shimmerSweep 8s linear infinite' }} />

        {/* ── Floating particles ── */}
        {PARTICLES.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              width:      p.size,
              height:     p.size,
              left:       `${p.left}%`,
              bottom:     '-6%',
              opacity:    p.opacity,
              background: `radial-gradient(circle, ${p.colorA} 0%, ${p.colorB} 100%)`,
              filter:     p.blurred ? 'blur(2.5px)' : 'none',
              boxShadow:  `0 0 ${p.size * 1.5}px ${p.colorA}`,
              animation:  `floatUp ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}

        {/* ── Spinning squares ── */}
        <div className="absolute top-24 right-8 w-20 h-20 pointer-events-none border border-[#5C3D2E]/10"
             style={{ transform: 'rotate(12deg)', animation: 'spinSlow 35s linear infinite' }} />
        <div className="absolute top-32 right-14 w-10 h-10 pointer-events-none border border-[#5C3D2E]/10"
             style={{ animation: 'spinSlow 22s linear infinite reverse' }} />
        <div className="absolute bottom-28 left-8 w-16 h-16 pointer-events-none border border-emerald-800/10"
             style={{ transform: 'rotate(-12deg)', animation: 'spinSlow 28s linear infinite' }} />
        <div className="absolute bottom-40 left-16 w-8 h-8 pointer-events-none border border-amber-800/10"
             style={{ animation: 'spinSlow 18s linear infinite reverse' }} />

        {/* ── Glowing dots ── */}
        {[
          { t: '18%', l: '8%',  s: 5, c: 'rgba(180,140,100,0.5)', dur: 4 },
          { t: '65%', l: '4%',  s: 4, c: 'rgba(90,140,90,0.4)',   dur: 5 },
          { t: '35%', l: '92%', s: 6, c: 'rgba(180,140,100,0.4)', dur: 6 },
          { t: '80%', l: '88%', s: 4, c: 'rgba(90,140,90,0.35)',  dur: 4 },
          { t: '12%', l: '52%', s: 5, c: 'rgba(180,140,100,0.3)', dur: 7 },
        ].map((d, i) => (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              top:            d.t,
              left:           d.l,
              width:          d.s,
              height:         d.s,
              background:     d.c,
              boxShadow:      `0 0 ${d.s * 3}px ${d.c}`,
              animation:      `glowPulse ${d.dur}s ease-in-out infinite`,
              animationDelay: `${i * 1.2}s`,
            }}
          />
        ))}

        {/* ══════════════════════════════════════
            MAIN CONTENT
        ══════════════════════════════════════ */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div
            className="text-center mb-14 opacity-0"
            style={{ animation: 'fadeSlideUp 0.8s ease forwards' }}
          >
            <div className="inline-block mb-5">
              <span className="text-sm font-semibold text-emerald-700 tracking-[5px] border
                               border-emerald-700 px-5 py-1.5 bg-emerald-50/70 backdrop-blur-sm
                               font-mono uppercase">
                Our Collection
              </span>
            </div>

            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-3"
              style={{
                fontFamily:           "Palatino, 'Book Antiqua', Georgia, serif",
                background:           'linear-gradient(135deg, #1f2937 30%, #5C3D2E 60%, #1f2937 90%)',
                backgroundSize:       '300% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor:  'transparent',
                backgroundClip:       'text',
                animation:            'shimmerTitle 5s linear infinite',
              }}
            >
              Stone Shadow Gallery
            </h2>

            <p
              className="text-xl italic text-amber-800 mb-3"
              style={{ fontFamily: "Palatino, 'Book Antiqua', Georgia, serif" }}
            >
              Explore Our Premium Natural Stone Collection
            </p>

            <p className="text-gray-600 text-base leading-relaxed max-w-xl mx-auto"
               style={{ fontFamily: 'Georgia, serif' }}>
              From ancient cobblestones to exotic sandstones — every stone tells a story of the earth's finest artistry.
            </p>
          </div>

          {/* Filter Tabs */}
          <div
            className="flex flex-wrap justify-center gap-2.5 mb-12 opacity-0"
            style={{ animation: 'fadeSlideUp 0.8s ease 0.2s forwards' }}
          >
            {filters.map((filter) => {
              const active = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => handleFilter(filter)}
                  className="relative overflow-hidden px-5 py-2 text-xs font-bold tracking-[2px]
                             font-mono transition-all duration-300 rounded-sm"
                  style={{
                    background:     active ? '#5C3D2E' : 'rgba(255,255,255,0.85)',
                    color:          active ? '#ffffff' : '#5C3D2E',
                    border:         active ? '1.5px solid #5C3D2E' : '1.5px solid rgba(92,61,46,0.25)',
                    boxShadow:      active ? '0 6px 20px rgba(92,61,46,0.3)' : '0 2px 8px rgba(92,61,46,0.08)',
                    transform:      active ? 'translateY(-2px)' : 'translateY(0)',
                    backdropFilter: 'blur(6px)',
                  }}
                >
                  {filter}
                  {active && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ background: '#d4a847' }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Gallery Grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[200px]"
            style={{
              opacity:    animating ? 0 : 1,
              transform:  animating ? 'translateY(10px)' : 'translateY(0)',
              transition: 'opacity 0.28s ease, transform 0.28s ease',
            }}
          >
            {filtered.map((project, index) => (
              <GalleryCard
                key={`${project.name}-${index}`}
                project={project}
                index={index}
              />
            ))}
          </div>

          {/* Stone count badge */}
          <div className="flex justify-center mt-8 mb-2">
            <span
              className="text-xs font-mono tracking-[2px] px-4 py-1.5 rounded-full"
              style={{
                color:      '#5C3D2E',
                background: 'rgba(92,61,46,0.08)',
                border:     '1px solid rgba(92,61,46,0.2)',
              }}
            >
              SHOWING {filtered.length} STONES
            </span>
          </div>

          {/* CTA */}
          <div
            className="text-center mt-10 opacity-0"
            style={{ animation: 'fadeSlideUp 0.9s ease 0.5s forwards' }}
          >
            <LoadMoreButton />
          </div>
        </div>
      </section>
    </>
  );
};

export default Gallery;