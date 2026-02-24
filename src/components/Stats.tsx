import { useEffect, useRef, useState } from 'react';

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id:       i,
  size:     Math.random() * 8 + 3,
  left:     Math.random() * 100,
  delay:    Math.random() * 8,
  duration: Math.random() * 10 + 12,
  opacity:  Math.random() * 0.12 + 0.04,
  blurred:  i % 3 === 0,
  colorA:   i % 2 === 0 ? 'rgba(250,220,160,0.9)' : 'rgba(255,255,255,0.6)',
  colorB:   i % 2 === 0 ? 'rgba(220,170,80,0.4)'  : 'rgba(255,255,255,0.2)',
}));

function useCountUp(target: string, duration = 1800, start = false): number {
  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    if (!start) return;
    const num = parseFloat(target.replace(/[^0-9.]/g, ''));
    if (!num) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * num));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function StatItem({ stat, index, inView }: { stat: { number: string; label: string }; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState<boolean>(false);
  const suffix = stat.number.replace(/[0-9.]/g, '');
  const count = useCountUp(stat.number, 1600 + index * 100, inView);

  return (
    <div
      className="text-center relative group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`,
      }}
    >
      {/* Hover glow blob */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.08) 0%, transparent 70%)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Number */}
      <div
        className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-2 relative"
        style={{
          fontFamily: "Palatino, 'Book Antiqua', Georgia, serif",
          textShadow: '0 4px 20px rgba(0,0,0,0.25)',
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
          transition: 'transform 0.35s cubic-bezier(0.25,0.8,0.25,1)',
        }}
      >
        {inView ? `${count}${suffix}` : `0${suffix}`}
      </div>

      {/* Gold divider line */}
      <div
        className="mx-auto mb-3 rounded-full"
        style={{
          height: 2,
          width: hovered ? 48 : 28,
          background: 'linear-gradient(90deg, transparent, #d4a847, transparent)',
          transition: 'width 0.4s ease',
        }}
      />

      {/* Label */}
      <div
        className="text-xs sm:text-sm font-semibold tracking-[3px] font-mono"
        style={{
          color: hovered ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.75)',
          transition: 'color 0.3s ease',
        }}
      >
        {stat.label}
      </div>
    </div>
  );
}

const Stats = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const stats = [
    { number: '5+',   label: 'YEARS EXPERIENCE'    },
    { number: '1+',   label: 'COUNTRIES EXPORTED'  },
    { number: '50+',  label: 'PROJECTS COMPLETED'  },
    { number: '100%', label: 'QUALITY GUARANTEE'   },
  ];

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-20 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #4a3124 0%, #5C3D2E 45%, #4a3124 100%)' }}
    >
      {/* Diagonal light beam top-left */}
      <div className="absolute pointer-events-none"
        style={{ top: '-10%', left: '-5%', width: '50%', height: '70%',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)',
          transform: 'rotate(-14deg)',
          animation: 'beamPulse 7s ease-in-out infinite' }} />

      {/* Diagonal light beam bottom-right */}
      <div className="absolute pointer-events-none"
        style={{ bottom: '-15%', right: '-5%', width: '40%', height: '60%',
          background: 'linear-gradient(315deg, rgba(212,168,71,0.08) 0%, transparent 60%)',
          transform: 'rotate(-14deg)',
          animation: 'beamPulse 9s ease-in-out infinite reverse',
          animationDelay: '3s' }} />

      {/* Dot grid texture */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '36px 36px' }} />

      {/* Shimmer sweep */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.06) 50%, transparent 62%)',
          backgroundSize: '200% 100%',
          animation: 'shimmerSweep 8s linear infinite' }} />

      {/* Floating particles */}
      {PARTICLES.map(p => (
        <div key={p.id} className="absolute rounded-full pointer-events-none"
          style={{ width: p.size, height: p.size, left: `${p.left}%`, bottom: '-6%',
            opacity: p.opacity,
            background: `radial-gradient(circle, ${p.colorA} 0%, ${p.colorB} 100%)`,
            filter: p.blurred ? 'blur(2px)' : 'none',
            boxShadow: `0 0 ${p.size * 1.5}px ${p.colorA}`,
            animation: `floatUp ${p.duration}s ease-in-out ${p.delay}s infinite` }} />
      ))}

      {/* Spinning squares */}
      <div className="absolute top-6 right-8 w-16 h-16 pointer-events-none border border-white/8"
        style={{ transform: 'rotate(12deg)', animation: 'spinSlow 35s linear infinite' }} />
      <div className="absolute top-12 right-16 w-8 h-8 pointer-events-none border border-white/6"
        style={{ animation: 'spinSlow 22s linear infinite reverse' }} />
      <div className="absolute bottom-6 left-8 w-12 h-12 pointer-events-none border border-white/6"
        style={{ transform: 'rotate(-12deg)', animation: 'spinSlow 28s linear infinite' }} />

      {/* Glowing dots */}
      {[
        { t: '20%', l: '6%',  s: 5, c: 'rgba(212,168,71,0.6)', dur: 4 },
        { t: '70%', l: '3%',  s: 4, c: 'rgba(255,255,255,0.3)', dur: 5 },
        { t: '30%', l: '93%', s: 5, c: 'rgba(212,168,71,0.5)', dur: 6 },
        { t: '75%', l: '90%', s: 4, c: 'rgba(255,255,255,0.25)', dur: 4 },
      ].map((d, i) => (
        <div key={i} className="absolute rounded-full pointer-events-none"
          style={{ top: d.t, left: d.l, width: d.s, height: d.s,
            background: d.c, boxShadow: `0 0 ${d.s * 3}px ${d.c}`,
            animation: `glowPulse ${d.dur}s ease-in-out infinite`, animationDelay: `${i * 1.2}s` }} />
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section label */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-2">
            <div style={{ width: 32, height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,168,71,0.8))' }} />
            <span className="text-[10px] font-mono font-bold tracking-[5px] text-amber-300/80 uppercase">
              Our Milestones
            </span>
            <div style={{ width: 32, height: 1, background: 'linear-gradient(90deg, rgba(212,168,71,0.8), transparent)' }} />
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((stat, index) => (
            <StatItem key={index} stat={stat} index={index} inView={inView} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(0px) scale(1);      opacity: 0;   }
          8%   { opacity: 1; }
          92%  { opacity: 0.7; }
          100% { transform: translateY(-110vh) scale(0.5); opacity: 0;   }
        }
        @keyframes beamPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
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
          50%       { opacity: 1;   transform: scale(1.6); }
        }
      `}</style>
    </section>
  );
};

export default Stats;