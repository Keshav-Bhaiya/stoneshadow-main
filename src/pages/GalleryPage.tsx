import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {  X, ChevronLeft, ChevronRight } from 'lucide-react';

/* ── Particles (stable, generated once outside component) ── */
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

const FILTERS = ['ALL', 'COBBLESTONES', 'WALL CLADDING', 'SANDSTONE FLOORING', 'STONE CRAFT', 'SPECIAL STONES'];

interface Project {
  image:    string;
  name:     string;
  category: string;
  span:     string;
  desc:     string;
}

const PROJECTS: Project[] = [
  // COBBLESTONES
  { image: 'https://i.pinimg.com/1200x/0b/d5/2d/0bd52d036740cd746a2ec4638703af10.jpg',                                name: 'Cobble Stone',             category: 'COBBLESTONES',       span: 'row-span-2', desc: 'Classic cobblestone perfect for driveways, garden paths, and heritage streetscapes.' },
  { image: 'https://i.pinimg.com/736x/df/d5/b6/dfd5b662c66d731e0e15f9cb0322c1e8.jpg',      name: 'Black Limestone Cobbles',  category: 'COBBLESTONES',       span: 'row-span-1', desc: 'Elegant black limestone cobbles for premium outdoor flooring.' },
  { image: 'https://i.pinimg.com/736x/a1/d5/fc/a1d5fce3ef2ce9801eee9fcec0f3a971.jpg',      name: 'Sagar Black Cobbles',      category: 'COBBLESTONES',       span: 'row-span-1', desc: 'Deep black sagar stone cobbles, highly durable and weather resistant.' },
  { image: 'https://i.pinimg.com/1200x/4e/fe/fd/4efefd1a73b0546d0655ececfaa76c3e.jpg',      name: 'Multicolor Cobbles',       category: 'COBBLESTONES',       span: 'row-span-1', desc: 'Vibrant multicolor cobbles adding character to any outdoor space.' },

  // WALL CLADDING
  { image: 'https://i.pinimg.com/1200x/60/80/4a/60804ac009ce365d492f3f6712e5c0a2.jpg',                                name: 'Wall Cladding Exterior',   category: 'WALL CLADDING',      span: 'row-span-2', desc: 'Premium natural stone cladding for exterior walls and facades.' },
  { image: 'https://i.pinimg.com/736x/2c/f0/b6/2cf0b6317a0a075ccf55a5a7eb6f5db6.jpg',      name: 'Mosaic Pattern Interior',  category: 'WALL CLADDING',      span: 'row-span-1', desc: 'Intricate mosaic patterns bringing artistic flair to interior walls.' },
  { image: 'https://i.pinimg.com/1200x/ec/05/54/ec0554f2a33129243fcb631add5f37d5.jpg',                                name: 'Crazy Sandstone Cladding', category: 'WALL CLADDING',      span: 'row-span-1', desc: 'Rustic crazy-cut sandstone cladding for a natural, textured look.' },
  { image: 'https://i.pinimg.com/736x/61/c7/9f/61c79f2dfdd7e9404d4642638bb0f683.jpg',                                 name: 'Stone Carving Cladding',   category: 'WALL CLADDING',      span: 'row-span-1', desc: 'Hand-carved stone panels adding sculptural beauty to any wall.' },

  // STONE CRAFT
  { image: 'https://i.pinimg.com/736x/da/d0/4d/dad04d14c805ba6ae6f9f3523c46831b.jpg',                                 name: 'Stone Craft Collection',   category: 'STONE CRAFT',        span: 'row-span-2', desc: 'Handcrafted stone artifacts and decorative pieces by master artisans.' },
  { image: 'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=600',      name: 'Stone Statue',             category: 'STONE CRAFT',        span: 'row-span-1', desc: 'Exquisitely carved stone statues for gardens and interiors.' },
  { image: 'https://i.pinimg.com/1200x/37/2a/48/372a4827bc042d62ad906300c49fb7b7.jpg',      name: 'Stone Table',              category: 'STONE CRAFT',        span: 'row-span-1', desc: 'Solid stone tables combining functionality with natural elegance.' },
  { image: 'https://i.pinimg.com/1200x/3c/a8/bf/3ca8bff094f09eb6ec132ba301624a21.jpg',                                name: 'Wall Fountain',            category: 'STONE CRAFT',        span: 'row-span-1', desc: 'Beautiful stone wall fountains creating a serene water feature.' },

  // SANDSTONE FLOORING
  { image: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=600',      name: 'Sandstone Flooring',       category: 'SANDSTONE FLOORING', span: 'row-span-2', desc: 'Premium sandstone flooring tiles for both indoor and outdoor use.' },
  { image: 'https://i.pinimg.com/736x/f0/08/d4/f008d46aa6cc672163ebc795669ce707.jpg',        name: 'Dholpur Stone',            category: 'SANDSTONE FLOORING', span: 'row-span-1', desc: 'Classic Dholpur sandstone known for its warm beige tones.' },
  { image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600',      name: 'Gwalior Mint Sandstone',   category: 'SANDSTONE FLOORING', span: 'row-span-1', desc: 'Cool-toned mint sandstone from Gwalior quarries, ideal for patios.' },
  { image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=600',      name: 'Teak Sandstone',           category: 'SANDSTONE FLOORING', span: 'row-span-1', desc: 'Warm teak-toned sandstone with natural wood-like veining patterns.' },
  { image: 'https://i.pinimg.com/1200x/95/64/3c/95643cdd9c7ea5ac364f427620ed4f44.jpg',      name: 'Rainbow Sandstone',        category: 'SANDSTONE FLOORING', span: 'row-span-1', desc: 'Multi-toned rainbow sandstone with stunning natural color variation.' },

  // SPECIAL STONES
  { image: 'https://i.pinimg.com/736x/c2/85/7e/c2857ea661f5ee502e6150b5f73a91a2.jpg',      name: 'Mandana Red Stone',        category: 'SPECIAL STONES',     span: 'row-span-2', desc: 'Vibrant red Mandana stone from Rajasthan — iconic and long-lasting.' },
  { image: 'https://i.pinimg.com/1200x/84/bc/6d/84bc6d1e50f3a3d734795344bc02c458.jpg',      name: 'Kandla Grey Stone',        category: 'SPECIAL STONES',     span: 'row-span-1', desc: 'Cool grey Kandla stone perfect for contemporary outdoor designs.' },
  { image: 'https://i.pinimg.com/1200x/bd/4b/fc/bd4bfc93bf7126b81c13dd7a9d3de385.jpg',      name: 'Kota Stone',               category: 'SPECIAL STONES',     span: 'row-span-1', desc: 'Affordable and durable Kota stone widely used across India.' },
  { image: 'https://i.pinimg.com/736x/76/14/da/7614da590770f2ee1be981f5c99964de.jpg',      name: 'Kadappa Stone',            category: 'SPECIAL STONES',     span: 'row-span-1', desc: 'Dark Kadappa stone with a smooth finish for modern interiors.' },
  { image: 'https://i.pinimg.com/736x/37/87/db/3787db9f1b34df75d53450aff232c213.jpg',      name: 'Sagar Black',              category: 'SPECIAL STONES',     span: 'row-span-1', desc: 'Premium Sagar Black stone with a polished mirror finish.' },
  { image: 'https://i.pinimg.com/736x/11/bf/68/11bf68a841014079283c7194681dceac.jpg',      name: 'Basalt',                   category: 'SPECIAL STONES',     span: 'row-span-1', desc: 'Volcanic basalt stone — extremely hard and ideal for heavy traffic areas.' },
];

/* ══════════════════════════════════════
   GALLERY CARD
══════════════════════════════════════ */
interface GalleryCardProps {
  project:  Project;
  index:    number;
  onClick:  (p: Project) => void;
}

function GalleryCard({ project, index, onClick }: GalleryCardProps) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onClick={() => onClick(project)}
      className={`${project.span} relative overflow-hidden cursor-pointer rounded-xl`}
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.97)',
        transition: `opacity 0.6s ease ${index * 0.06}s, transform 0.6s ease ${index * 0.06}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={project.image}
        alt={project.name}
        className="w-full h-full object-cover"
        style={{
          transform:  hovered ? 'scale(1.1)' : 'scale(1.0)',
          filter:     hovered ? 'brightness(0.6) saturate(1.2)' : 'brightness(0.78)',
          transition: 'transform 0.7s cubic-bezier(0.25,0.8,0.25,1), filter 0.5s ease',
        }}
      />

      {/* Category chip */}
      <div className="absolute top-3 left-3">
        <span className="text-[9px] font-black tracking-[2px] font-mono px-2.5 py-1 rounded"
              style={{ background:'rgba(255,255,255,0.92)', color:'#5C3D2E', border:'1px solid rgba(92,61,46,0.2)' }}>
          {project.category}
        </span>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0" style={{
        background: hovered
          ? 'linear-gradient(180deg, rgba(0,0,0,0.06) 0%, rgba(92,61,46,0.80) 100%)'
          : 'linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.55) 100%)',
        transition: 'background 0.5s ease',
      }} />

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-8"
           style={{
             background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
             transform:  hovered ? 'translateY(0)' : 'translateY(6px)',
             opacity:    hovered ? 1 : 0.75,
             transition: 'transform 0.4s ease, opacity 0.4s ease',
           }}>
        <h4 className="text-white font-bold text-[15px] leading-tight mb-1"
            style={{ fontFamily:"Palatino,'Book Antiqua',Georgia,serif", textShadow:'0 2px 8px rgba(0,0,0,0.5)' }}>
          {project.name}
        </h4>
        <div className="h-0.5 rounded-full mb-2" style={{ width: hovered ? 36 : 16, background:'#d4a847', transition:'width 0.4s ease' }} />
        {hovered && (
          <p className="text-white/75 text-[11px] leading-snug" style={{ fontFamily:'Georgia,serif' }}>
            {project.desc}
          </p>
        )}
      </div>

      {/* Click hint */}
      {hovered && (
        <div className="absolute top-3 right-3 text-[9px] font-mono font-bold tracking-[1.5px] px-2 py-1 rounded"
             style={{ background:'rgba(92,61,46,0.85)', color:'#fff' }}>
          VIEW
        </div>
      )}

      {/* Corner glow */}
      <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full pointer-events-none"
           style={{ background:'radial-gradient(circle, rgba(212,168,71,0.25), transparent 70%)',
             opacity: hovered ? 1 : 0, transition:'opacity 0.5s ease' }} />
    </div>
  );
}

/* ══════════════════════════════════════
   LIGHTBOX
══════════════════════════════════════ */
interface LightboxProps {
  project:  Project;
  all:      Project[];
  onClose:  () => void;
  onNav:    (p: Project) => void;
}

function Lightbox({ project, all, onClose, onNav }: LightboxProps) {
  const idx   = all.findIndex(p => p.name === project.name);
  const hasPrev = idx > 0;
  const hasNext = idx < all.length - 1;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowLeft'  && hasPrev) onNav(all[idx - 1]);
      if (e.key === 'ArrowRight' && hasNext) onNav(all[idx + 1]);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [idx]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background:'rgba(0,0,0,0.92)', backdropFilter:'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full rounded-2xl overflow-hidden"
        style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center
                     text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
        >
          <X size={18} />
        </button>

        {/* Prev */}
        {hasPrev && (
          <button
            onClick={() => onNav(all[idx - 1])}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center
                       justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <ChevronLeft size={22} />
          </button>
        )}

        {/* Next */}
        {hasNext && (
          <button
            onClick={() => onNav(all[idx + 1])}
            className="absolute right-12 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center
                       justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <ChevronRight size={22} />
          </button>
        )}

        {/* Image */}
        <img src={project.image} alt={project.name}
             className="w-full max-h-[70vh] object-cover" />

        {/* Info */}
        <div className="p-6" style={{ background:'rgba(15,10,8,0.95)' }}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-[9px] font-mono font-bold tracking-[2px] px-2 py-0.5 rounded mb-2 inline-block"
                    style={{ background:'rgba(92,61,46,0.3)', color:'#d4a847', border:'1px solid rgba(212,168,71,0.3)' }}>
                {project.category}
              </span>
              <h3 className="text-white font-bold text-xl mb-2"
                  style={{ fontFamily:"Palatino,'Book Antiqua',Georgia,serif" }}>
                {project.name}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily:'Georgia,serif' }}>
                {project.desc}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="text-white/30 text-xs font-mono">{idx + 1} / {all.length}</span>
            </div>
          </div>
          <p className="text-white/30 text-[10px] font-mono mt-4">
            ← → arrow keys to navigate · ESC to close
          </p>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   GALLERY PAGE
══════════════════════════════════════ */
const GalleryPage = () => {
  const navigate = useNavigate();
  const [activeFilter,  setActiveFilter]  = useState('ALL');
  const [displayFilter, setDisplayFilter] = useState('ALL');
  const [animating,     setAnimating]     = useState(false);
  const [lightbox,      setLightbox]      = useState<Project | null>(null);

  /* scroll to top on mount */
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleFilter = (f: string) => {
    if (f === activeFilter) return;
    setAnimating(true);
    setTimeout(() => { setActiveFilter(f); setDisplayFilter(f); setAnimating(false); }, 280);
  };

  const filtered = displayFilter === 'ALL'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === displayFilter);

  return (
    <>
      <style>{`
        @keyframes floatUp {
          0%   { transform:translateY(0px) scale(1);      opacity:0; }
          8%   { opacity:1; }
          92%  { opacity:0.7; }
          100% { transform:translateY(-110vh) scale(0.5); opacity:0; }
        }
        @keyframes orbFloat {
          0%   { transform:translate(0px,0px) scale(1);     }
          50%  { transform:translate(22px,16px) scale(1.06);}
          100% { transform:translate(-12px,22px) scale(0.96);}
        }
        @keyframes beamPulse   { 0%,100%{opacity:1}    50%{opacity:0.3} }
        @keyframes shimmerSweep{ 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes spinSlow    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes glowPulse   { 0%,100%{opacity:0.4;transform:scale(1)} 50%{opacity:1;transform:scale(1.6)} }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmerTitle{ 0%{background-position:-200% center} 100%{background-position:200% center} }
      `}</style>

      {/* Lightbox */}
      {lightbox && (
        <Lightbox
          project={lightbox}
          all={filtered}
          onClose={() => setLightbox(null)}
          onNav={setLightbox}
        />
      )}

      <div
        className="min-h-screen pt-[70px] overflow-hidden"
        style={{ background:'linear-gradient(135deg, #faf8f5 0%, #f0ebe3 45%, #f7f4ee 100%)' }}
      >

        {/* ── Hero Banner ── */}
        <div className="relative h-[45vh] min-h-[300px] overflow-hidden">
          <img
            src="https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Gallery"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0"
               style={{ background:'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.65) 100%)' }} />


          {/* Banner text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <span
              className="text-[11px] font-semibold tracking-[4px] uppercase mb-4 opacity-0"
              style={{ color:'#d4a847', animation:'fadeSlideUp 0.7s ease forwards 0.1s' }}
            >
              Our Collection
            </span>
            <h1
              className="font-serif font-bold text-white text-4xl sm:text-5xl lg:text-6xl leading-tight opacity-0"
              style={{ animation:'fadeSlideUp 0.8s ease forwards 0.25s' }}
            >
              Stone Shadow <span style={{ color:'#d4a574' }}>Gallery</span>
            </h1>
            <p
              className="text-white/65 mt-4 text-base max-w-lg opacity-0"
              style={{ fontFamily:'Georgia,serif', animation:'fadeSlideUp 0.8s ease forwards 0.4s' }}
            >
              Explore our complete collection of premium natural stones
            </p>
          </div>
        </div>

        {/* ── Main Section ── */}
        <div className="relative py-16 overflow-hidden">

          {/* Background effects */}
          <div className="absolute pointer-events-none" style={{ width:460, height:460, top:'-8%', left:'-5%', background:'radial-gradient(circle, rgba(180,140,100,0.11) 0%, transparent 70%)', animation:'orbFloat 18s ease-in-out infinite alternate' }} />
          <div className="absolute pointer-events-none" style={{ width:340, height:340, top:'45%', left:'62%', background:'radial-gradient(circle, rgba(90,140,90,0.08) 0%, transparent 70%)', animation:'orbFloat 22s ease-in-out infinite alternate-reverse', animationDelay:'4s' }} />
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:'radial-gradient(circle, rgba(92,61,46,0.065) 1px, transparent 1px)', backgroundSize:'36px 36px' }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background:'linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.18) 50%, transparent 62%)', backgroundSize:'200% 100%', animation:'shimmerSweep 8s linear infinite' }} />
          <div className="absolute pointer-events-none" style={{ top:'-10%', left:'-4%', width:'50%', height:'70%', background:'linear-gradient(135deg, rgba(210,180,140,0.12) 0%, transparent 60%)', transform:'rotate(-14deg)', animation:'beamPulse 7s ease-in-out infinite' }} />

          {/* Spinning squares */}
          <div className="absolute top-16 right-8 w-16 h-16 pointer-events-none border border-[#5C3D2E]/10" style={{ animation:'spinSlow 32s linear infinite' }} />
          <div className="absolute bottom-16 left-8 w-12 h-12 pointer-events-none border border-emerald-800/10" style={{ animation:'spinSlow 24s linear infinite reverse' }} />

          {/* Particles */}
          {PARTICLES.map(p => (
            <div key={p.id} className="absolute rounded-full pointer-events-none"
                 style={{ width:p.size, height:p.size, left:`${p.left}%`, bottom:'-6%',
                   opacity:p.opacity, background:`radial-gradient(circle, ${p.colorA} 0%, ${p.colorB} 100%)`,
                   filter:p.blurred?'blur(2.5px)':'none', boxShadow:`0 0 ${p.size*1.5}px ${p.colorA}`,
                   animation:`floatUp ${p.duration}s ease-in-out ${p.delay}s infinite` }} />
          ))}

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Filter Tabs */}
            <div
              className="flex flex-wrap justify-center gap-2.5 mb-10 opacity-0"
              style={{ animation:'fadeSlideUp 0.8s ease 0.1s forwards' }}
            >
              {FILTERS.map(filter => {
                const active = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    onClick={() => handleFilter(filter)}
                    className="relative overflow-hidden px-5 py-2 text-xs font-bold tracking-[2px] font-mono rounded-sm transition-all duration-300"
                    style={{
                      background:     active ? '#5C3D2E' : 'rgba(255,255,255,0.85)',
                      color:          active ? '#fff'    : '#5C3D2E',
                      border:         active ? '1.5px solid #5C3D2E' : '1.5px solid rgba(92,61,46,0.25)',
                      boxShadow:      active ? '0 6px 20px rgba(92,61,46,0.3)' : '0 2px 8px rgba(92,61,46,0.08)',
                      transform:      active ? 'translateY(-2px)' : 'translateY(0)',
                      backdropFilter: 'blur(6px)',
                    }}
                  >
                    {filter}
                    {active && <span className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background:'#d4a847' }} />}
                  </button>
                );
              })}
            </div>

            {/* Count badge */}
            

            {/* Grid */}
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
                  onClick={setLightbox}
                />
              ))}
            </div>

            {/* CTA */}
            <div className="text-center mt-16 opacity-0" style={{ animation:'fadeSlideUp 0.9s ease 0.4s forwards' }}>
              <div className="inline-block bg-white/70 backdrop-blur-sm rounded-xl px-10 py-8 border border-white/80 shadow-sm">
                <h3 className="font-serif font-bold text-2xl text-gray-800 mb-2">Like What You See?</h3>
                <p className="text-gray-500 text-sm mb-6" style={{ fontFamily:'Georgia,serif' }}>
                  Get in touch for samples, pricing, and custom orders.
                </p>
                <button
                  onClick={() => { navigate('/'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior:'smooth' }), 300); }}
                  className="relative overflow-hidden px-8 py-3.5 text-white text-xs font-mono font-bold
                             tracking-[3px] uppercase rounded-sm transition-all duration-300
                             hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(92,61,46,0.4)] group"
                  style={{ background:'linear-gradient(135deg,#5C3D2E 0%,#7a5040 100%)' }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent
                                   -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  Contact Us →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GalleryPage;