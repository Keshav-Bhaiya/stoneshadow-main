import { Gem, Globe } from 'lucide-react';

const About = () => {
  return (
    <section
      id="about"
      className="relative py-24 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #faf8f5 0%, #f0ebe3 45%, #f7f4ee 100%)' }}
    >

      {/* ── Background Effects (matching Hero) ── */}

      {/* Soft glow orbs */}
      <div className="absolute pointer-events-none"
           style={{
             width: 400, height: 400, top: '-10%', right: '-5%',
             background: 'radial-gradient(circle, rgba(180,140,100,0.10) 0%, transparent 70%)',
             animation: 'orbFloat 18s ease-in-out infinite alternate',
           }} />
      <div className="absolute pointer-events-none"
           style={{
             width: 300, height: 300, bottom: '-5%', left: '-4%',
             background: 'radial-gradient(circle, rgba(90,140,90,0.08) 0%, transparent 70%)',
             animation: 'orbFloat 22s ease-in-out infinite alternate-reverse',
             animationDelay: '3s',
           }} />
      <div className="absolute pointer-events-none"
           style={{
             width: 220, height: 220, top: '40%', left: '50%',
             background: 'radial-gradient(circle, rgba(200,170,110,0.07) 0%, transparent 70%)',
             animation: 'orbFloat 16s ease-in-out infinite alternate',
             animationDelay: '6s',
           }} />

      {/* Light beam top-right */}
      <div className="absolute pointer-events-none"
           style={{
             top: '-15%', right: '-8%',
             width: '50%', height: '70%',
             background: 'linear-gradient(225deg, rgba(210,180,140,0.12) 0%, transparent 60%)',
             transform: 'rotate(14deg)',
             animation: 'beamPulse 7s ease-in-out infinite',
           }} />

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none"
           style={{
             backgroundImage: 'radial-gradient(circle, rgba(92,61,46,0.06) 1px, transparent 1px)',
             backgroundSize: '36px 36px',
           }} />

      {/* Shimmer sweep */}
      <div className="absolute inset-0 pointer-events-none"
           style={{
             background: 'linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.18) 50%, transparent 62%)',
             backgroundSize: '200% 100%',
             animation: 'shimmerSweep 9s linear infinite',
           }} />

      {/* Spinning squares */}
      <div className="absolute top-16 left-8 w-16 h-16 border border-[#5C3D2E]/10 pointer-events-none"
           style={{ animation: 'spinSlow 30s linear infinite' }} />
      <div className="absolute bottom-16 right-10 w-10 h-10 border border-emerald-700/10 pointer-events-none"
           style={{ animation: 'spinSlow 22s linear infinite reverse' }} />
      <div className="absolute top-1/2 right-8 w-8 h-8 border border-[#5C3D2E]/10 pointer-events-none"
           style={{ animation: 'spinSlow 18s linear infinite' }} />

      {/* Glow dots */}
      {[
        { t: '15%', l: '5%',  s: 5, c: 'rgba(180,140,100,0.5)', dur: 4 },
        { t: '70%', l: '3%',  s: 4, c: 'rgba(90,140,90,0.4)',   dur: 5 },
        { t: '20%', l: '95%', s: 6, c: 'rgba(180,140,100,0.4)', dur: 6 },
        { t: '75%', l: '93%', s: 4, c: 'rgba(90,140,90,0.35)',  dur: 4 },
      ].map((d, i) => (
        <div key={i} className="absolute rounded-full pointer-events-none"
             style={{
               top: d.t, left: d.l,
               width: d.s, height: d.s,
               background: d.c,
               boxShadow:      `0 0 ${d.s * 3}px ${d.c}`,
               animation:      `glowPulse ${d.dur}s ease-in-out infinite`,
               animationDelay: `${i * 1.3}s`,
             }} />
      ))}

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── LEFT: Image ── */}
          <div
            className="relative group opacity-0"
            style={{ animation: 'fadeSlideLeft 0.9s ease forwards 0.2s' }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://i.pinimg.com/1200x/57/db/fe/57dbfe70e5bc4dd0e953c37d42c4aea4.jpg"
                alt="Stone Shadow"
                className="w-full h-96 lg:h-[520px] object-cover transform group-hover:scale-105
                           transition-transform duration-700"
              />
              {/* image gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              {/* Badge */}
              <div className="absolute bottom-8 left-8 bg-white/96  p-5 shadow-xl
                              border-l-[3px] border-[#dcccab] max-w-[220px]
                              animate-[fadeSlideUp_0.8s_ease_forwards_0.5s] opacity-0">
                <div className="text-5xl font-bold font-serif mb-1"
                     style={{ color:  '#dcccab' }}>
                  10+
                </div>
                <div
    className="text-[11px] font-semibold tracking-[1.5px] leading-[1.6] uppercase"
    style={{ color: '#dcccab' }}   // slightly darker warm gold
  >
    Years of Excellence<br />in Stone Export
  </div>
              </div>
            </div>

            {/* decorative border behind image */}
            <div className="absolute -bottom-4 -left-4 w-full h-full border-2
                            border-[#5C3D2E]/15 rounded-2xl -z-10" />
          </div>

          {/* ── RIGHT: Text ── */}
          <div
            className="space-y-7 opacity-0"
            style={{ animation: 'fadeSlideRight 0.9s ease forwards 0.35s' }}
          >
            {/* Label */}
            <span className="text-[11px] font-semibold tracking-[3px] uppercase text-[#5C3D2E] block">
              In the Beginning
            </span>

            {/* Heading */}
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-800 leading-tight">
              Stone Shadow<br />Journey
            </h2>

            {/* Italic quote */}
            <p className="text-xl italic text-emerald-700 font-serif">
              "Finest Quality Natural Stone Exporters"
            </p>

            {/* Divider */}
            <div className="w-16 h-[2px] rounded-full"
                 style={{ background: 'linear-gradient(90deg,#5C3D2E,transparent)' }} />

            {/* Para */}
            <p className="text-gray-600 text-[15px] leading-[1.9]">
              Founded on the principles of integrity and quality, Stone Shadow has evolved into
              a global leader in the natural stone industry. We source raw blocks from the finest
              quarries worldwide and process them with state-of-the-art technology to deliver
              masterpieces that stand the test of time.
            </p>

            {/* Feature cards */}
            <div className="grid sm:grid-cols-2 gap-5 pt-2">
              <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm
                              border border-white/80 hover:shadow-lg hover:-translate-y-1
                              transition-all duration-300 group/card">
                <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center
                                justify-center mb-4 group-hover/card:scale-110 transition-transform duration-300">
                  <Gem className="text-emerald-700" size={22} />
                </div>
                <h3 className="font-bold text-gray-800 mb-2 text-[15px]">Precision Processing</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">
                  Processing natural stone with Italian machinery for over 25 years.
                </p>
              </div>

              <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm
                              border border-white/80 hover:shadow-lg hover:-translate-y-1
                              transition-all duration-300 group/card">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4
                                group-hover/card:scale-110 transition-transform duration-300"
                     style={{ background: 'rgba(92,61,46,0.1)' }}>
                  <Globe style={{ color: '#5C3D2E' }} size={22} />
                </div>
                <h3 className="font-bold text-gray-800 mb-2 text-[15px]">Global Export</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">
                  Delivering premium quality stone to over 40 countries worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes fadeSlideLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0);     }
        }
        @keyframes fadeSlideRight {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0);    }
        }
        @keyframes orbFloat {
          0%   { transform: translate(0px, 0px)    scale(1);    }
          50%  { transform: translate(20px, 15px)  scale(1.05); }
          100% { transform: translate(-10px, 20px) scale(0.97); }
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

export default About;