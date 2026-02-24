import { useState } from 'react';
import { MapPin } from 'lucide-react';

const AREAS = [
  {
    state: 'Madhya Pradesh',
    links: [
      'Natural Stone Manufacturer Indore',
      'Natural Stone Manufacturer Bhopal',
      'Cobblestone Manufacturer Bhopal',
      'Natural Stone Manufacturer Gwalior',
      'Natural Stone Manufacturer in Sagar',
      'Natural Stone Manufacturer in Ujjain',
      'Natural Stone Manufacturer in Raisen, India',
    ],
  },
  {
    state: 'Uttar Pradesh',
    links: [
      'Natural Stone Manufacturer in Ayodhya',
      'Natural Stone Manufacturer in Lucknow',
      'Natural Stone Manufacturer in Kanpur',
    ],
  },
  {
    state: 'Maharashtra',
    links: [
      'Natural Stone Manufacturer in Pune India',
      'Natural Stone Manufacturer in Mumbai, India',
    ],
  },
  {
    state: 'Uttarakhand',
    links: ['Natural Stone Manufacturer in Dehradun, India'],
  },
  {
    state: 'Chhattisgarh',
    links: [
      'Natural Stone Manufacturer in Bilaspur',
      'Natural Stone Manufacturer in Raipur, India',
    ],
  },
  {
    state: 'Goa',
    links: ['Natural Stone Manufacturer in Goa'],
  },
  {
    state: 'Delhi',
    links: ['Natural Stone Manufacturer in Delhi'],
  },
  {
    state: 'Himachal Pradesh',
    links: ['Natural Stone Manufacturer in Dharamsala, India'],
  },
  {
    state: 'Gujrat',
    links: [
      'Natural Stone Manufacturer in Ahmedabad',
      'Natural Stone Manufacturer in Surat',
      'Natural Stone Manufacturer in Dwarka, India',
      'Natural Stone Manufacturer in Diu, India',
    ],
  },
  {
    state: 'Jammu and Kashmir',
    links: [
      'Natural Stone Manufacturer in Srinagar',
      'Natural Stone Manufacturer in Jammu and Kashmir, India',
    ],
  },
  {
    state: 'Rajasthan',
    links: [
      'Natural Stone Manufacturer in Jaipur',
      'Natural Stone Manufacturer in Jodhpur',
      'Natural Stone Manufacturer in Udaipur',
      'Natural Stone Manufacturer in Kota',
    ],
  },
  {
    state: 'Karnataka',
    links: [
      'Natural Stone Manufacturer in Bangalore',
      'Natural Stone Manufacturer in Mysore, India',
    ],
  },
];

const ServiceAreas = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <>
      <style>{`
        @keyframes orbFloat {
          0%   { transform: translate(0px, 0px)    scale(1);    }
          50%  { transform: translate(18px, 14px)  scale(1.04); }
          100% { transform: translate(-10px, 18px) scale(0.97); }
        }
        @keyframes beamPulse {
          0%, 100% { opacity: 1;   }
          50%      { opacity: 0.3; }
        }
        @keyframes shimmerSweep {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        @keyframes shimmerTitle {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
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

      <section
        id="service-areas"
        className="relative py-24 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #faf8f5 0%, #f0ebe3 45%, #f7f4ee 100%)' }}
      >

        {/* ── Background Effects ── */}

        {/* Orbs */}
        <div className="absolute pointer-events-none"
             style={{ width: 450, height: 450, top: '-8%', right: '-5%',
               background: 'radial-gradient(circle, rgba(180,140,100,0.11) 0%, transparent 70%)',
               animation: 'orbFloat 20s ease-in-out infinite alternate' }} />
        <div className="absolute pointer-events-none"
             style={{ width: 320, height: 320, bottom: '5%', left: '-4%',
               background: 'radial-gradient(circle, rgba(90,140,90,0.08) 0%, transparent 70%)',
               animation: 'orbFloat 25s ease-in-out infinite alternate-reverse',
               animationDelay: '5s' }} />
        <div className="absolute pointer-events-none"
             style={{ width: 240, height: 240, top: '40%', left: '45%',
               background: 'radial-gradient(circle, rgba(200,170,110,0.07) 0%, transparent 70%)',
               animation: 'orbFloat 17s ease-in-out infinite alternate',
               animationDelay: '2s' }} />

        {/* Diagonal beams */}
        <div className="absolute pointer-events-none"
             style={{ top: '-12%', left: '-6%', width: '55%', height: '70%',
               background: 'linear-gradient(135deg, rgba(210,180,140,0.12) 0%, transparent 60%)',
               transform: 'rotate(-14deg)', animation: 'beamPulse 8s ease-in-out infinite' }} />
        <div className="absolute pointer-events-none"
             style={{ bottom: '-15%', right: '-5%', width: '40%', height: '55%',
               background: 'linear-gradient(315deg, rgba(100,160,110,0.07) 0%, transparent 60%)',
               transform: 'rotate(-14deg)',
               animation: 'beamPulse 10s ease-in-out infinite reverse',
               animationDelay: '4s' }} />

        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none"
             style={{ backgroundImage: 'radial-gradient(circle, rgba(92,61,46,0.06) 1px, transparent 1px)',
               backgroundSize: '36px 36px' }} />

        {/* Shimmer sweep */}
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: 'linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.17) 50%, transparent 62%)',
               backgroundSize: '200% 100%', animation: 'shimmerSweep 9s linear infinite' }} />

        {/* Spinning squares */}
        <div className="absolute top-16 left-8 w-14 h-14 pointer-events-none border border-[#5C3D2E]/10"
             style={{ animation: 'spinSlow 32s linear infinite' }} />
        <div className="absolute bottom-16 right-10 w-9 h-9 pointer-events-none border border-emerald-700/10"
             style={{ animation: 'spinSlow 24s linear infinite reverse' }} />
        <div className="absolute top-1/2 right-6 w-7 h-7 pointer-events-none border border-[#5C3D2E]/08"
             style={{ animation: 'spinSlow 19s linear infinite' }} />

        {/* Glow dots */}
        {[
          { t: '12%', l: '4%',  s: 5, c: 'rgba(180,140,100,0.5)', dur: 4 },
          { t: '72%', l: '2%',  s: 4, c: 'rgba(90,140,90,0.4)',   dur: 5 },
          { t: '22%', l: '96%', s: 6, c: 'rgba(180,140,100,0.4)', dur: 6 },
          { t: '78%', l: '94%', s: 4, c: 'rgba(90,140,90,0.35)',  dur: 4 },
        ].map((d, i) => (
          <div key={i} className="absolute rounded-full pointer-events-none"
               style={{ top: d.t, left: d.l, width: d.s, height: d.s,
                 background: d.c, boxShadow: `0 0 ${d.s * 3}px ${d.c}`,
                 animation: `glowPulse ${d.dur}s ease-in-out infinite`,
                 animationDelay: `${i * 1.4}s` }} />
        ))}

        {/* ── Content ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div
            className="text-center mb-16 opacity-0"
            style={{ animation: 'fadeSlideUp 0.8s ease forwards' }}
          >
            <div className="inline-flex items-center gap-2 mb-5">
              <MapPin size={14} className="text-emerald-700" />
              <span className="text-sm font-semibold text-emerald-700 tracking-[5px]
                               border border-emerald-700 px-5 py-1.5 bg-emerald-50/70
                               backdrop-blur-sm font-mono uppercase">
                Our Reach
              </span>
              <MapPin size={14} className="text-emerald-700" />
            </div>

            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4"
              style={{
                fontFamily:           "Palatino, 'Book Antiqua', Georgia, serif",
                background:           'linear-gradient(135deg, #1f2937 25%, #5C3D2E 55%, #1f2937 85%)',
                backgroundSize:       '300% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor:  'transparent',
                backgroundClip:       'text',
                animation:            'shimmerTitle 5s linear infinite',
              }}
            >
              Areas We Serve
            </h2>

            <p className="text-xl italic text-amber-800 mb-4"
               style={{ fontFamily: "Palatino, 'Book Antiqua', Georgia, serif" }}>
              Delivering Premium Natural Stone Across India
            </p>

            <p className="text-gray-600 text-base leading-relaxed max-w-2xl mx-auto"
               style={{ fontFamily: 'Georgia, serif' }}>
              Stone Shadow proudly serves architects, builders, and homeowners across India.
              Find your nearest stone supply centre or request a quote for your city.
            </p>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-3 mt-6">
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#5C3D2E]/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#5C3D2E]/50" />
              <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#5C3D2E]/40" />
            </div>
          </div>

          {/* State grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 opacity-0"
            style={{ animation: 'fadeSlideUp 0.9s ease 0.2s forwards' }}
          >
            {AREAS.map((area) => (
              <div
                key={area.state}
                className="bg-white/65 backdrop-blur-sm rounded-xl p-6
                           border border-white/80 shadow-sm
                           hover:shadow-md hover:-translate-y-0.5
                           transition-all duration-300"
              >
                {/* State heading */}
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-1 h-5 rounded-full flex-shrink-0"
                    style={{ background: 'linear-gradient(to bottom, #5C3D2E, #d4a847)' }}
                  />
                  <h3
                    className="font-bold text-[15px]"
                    style={{
                      fontFamily: "Palatino, 'Book Antiqua', Georgia, serif",
                      color: '#5C3D2E',
                    }}
                  >
                    {area.state}
                  </h3>
                </div>

                {/* Links */}
                <ul className="space-y-2">
                  {area.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#contact"
                        onMouseEnter={() => setHoveredLink(link)}
                        onMouseLeave={() => setHoveredLink(null)}
                        className="flex items-start gap-2 text-[13px] leading-snug
                                   transition-colors duration-300 group"
                        style={{
                          fontFamily: 'Georgia, serif',
                          color: hoveredLink === link ? '#5C3D2E' : '#4b5563',
                        }}
                      >
                        <span
                          className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0 transition-all duration-300"
                          style={{
                            background: hoveredLink === link ? '#5C3D2E' : '#9ca3af',
                            transform:  hoveredLink === link ? 'scale(1.5)' : 'scale(1)',
                          }}
                        />
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom CTA strip */}
          <div
            className="mt-14 text-center opacity-0"
            style={{ animation: 'fadeSlideUp 0.9s ease 0.4s forwards' }}
          >
            <div
              className="inline-block px-8 py-5 rounded-xl"
              style={{
                background: 'rgba(255,255,255,0.70)',
                border:     '1px solid rgba(92,61,46,0.15)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <p className="text-gray-600 text-[14px] mb-4"
                 style={{ fontFamily: 'Georgia, serif' }}>
                Don't see your city? We deliver pan-India. Contact us for a custom quote.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3 text-white text-xs
                           font-mono font-bold tracking-[3px] uppercase rounded-sm
                           transition-all duration-300 hover:-translate-y-0.5
                           hover:shadow-[0_8px_24px_rgba(92,61,46,0.4)]"
                style={{ background: 'linear-gradient(135deg, #5C3D2E 0%, #7a5040 100%)' }}
              >
                <MapPin size={14} /> Request a Quote
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceAreas;