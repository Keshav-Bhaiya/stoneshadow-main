import { useState, useRef } from "react";

const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id:       i,
  size:     Math.random() * 10 + 4,
  left:     Math.random() * 100,
  delay:    Math.random() * 9,
  duration: Math.random() * 10 + 13,
  opacity:  Math.random() * 0.15 + 0.05,
  blurred:  i % 3 === 0,
  colorA:   i % 2 === 0 ? "rgba(180,140,100,0.9)" : "rgba(120,170,120,0.7)",
  colorB:   i % 2 === 0 ? "rgba(180,130,60,0.4)"  : "rgba(80,140,80,0.3)",
}));

interface Category {
  title:       string;
  subtitle:    string;
  description: string;
  image:       string;
  tag:         string;
  color:       string;
  glow:        string;
  lightBg:     string;
}

const categories: Category[] = [
  {
    title:       "Cobble Stone",
    subtitle:    "NATURAL RIVER STONE",
    description: "Naturally rounded cobblestones sourced from ancient riverbeds and exclusive quarries — ideal for driveways, rustic pathways, and timeless landscaping.",
    image:       "https://i.pinimg.com/736x/58/6c/7a/586c7a850429e967b730a3981e520fa4.jpg",
    tag:         "CLASSIC",
    color:       "#5C3D2E",
    glow:        "rgba(92,61,46,0.22)",
    lightBg:     "rgba(92,61,46,0.06)",
  },
  {
    title:       "Crazy Sand Stone",
    subtitle:    "WILD PATTERN STONE",
    description: "Irregular sandstone pieces with untamed character — perfect for crazy paving, garden terraces, and flooring with a raw, earthy personality.",
    image:       "https://i.pinimg.com/736x/d7/18/9a/d7189a2256e73b8da1c94e03124f2c45.jpg",
    tag:         "EXOTIC",
    color:       "#92400e",
    glow:        "rgba(146,64,14,0.22)",
    lightBg:     "rgba(146,64,14,0.06)",
  },
  {
    title:       "Wall Fountain",
    subtitle:    "CARVED WATER FEATURE",
    description: "Hand-carved stone fountains that bring eternal tranquility to gardens, courtyards, and grand interiors — where water meets artistry.",
    image:       "https://i.pinimg.com/1200x/3c/a8/bf/3ca8bff094f09eb6ec132ba301624a21.jpg",
    tag:         "LUXURY",
    color:       "#065f46",
    glow:        "rgba(6,95,70,0.22)",
    lightBg:     "rgba(6,95,70,0.06)",
  },
  {
    title:       "Stone Carving",
    subtitle:    "ARTISAN SCULPTED",
    description: "Masterfully carved stone panels and reliefs by master artisans — intricate motifs for architectural facades, temples, and statement interiors.",
    image:       "https://i.pinimg.com/736x/61/c7/9f/61c79f2dfdd7e9404d4642638bb0f683.jpg",
    tag:         "ARTISAN",
    color:       "#78350f",
    glow:        "rgba(120,53,15,0.22)",
    lightBg:     "rgba(120,53,15,0.06)",
  },
  {
    title:       "Morals",
    subtitle:    "HANDMADE DÉCOR",
    description: "Bespoke handcrafted stone artifacts and home décor — each piece a one-of-a-kind expression of raw nature shaped by skilled hands.",
    image:       "https://i.pinimg.com/736x/9e/72/e0/9e72e04b366b426dc58d7ce5352da3b1.jpg",
    tag:         "BESPOKE",
    color:       "#3f6212",
    glow:        "rgba(63,98,18,0.22)",
    lightBg:     "rgba(63,98,18,0.06)",
  },
  {
    title:       "Wall Cladding",
    subtitle:    "EXTERIOR & INTERIOR",
    description: "Premium natural stone cladding panels — adding dramatic texture, warmth, and sophistication to accent walls and building facades.",
    image:       "https://i.pinimg.com/1200x/57/db/fe/57dbfe70e5bc4dd0e953c37d42c4aea4.jpg",
    tag:         "PREMIUM",
    color:       "#5C3D2E",
    glow:        "rgba(92,61,46,0.22)",
    lightBg:     "rgba(92,61,46,0.06)",
  },
];

/* ══════════════════════════════════════
   STONE CARD
══════════════════════════════════════ */
interface StoneCardProps {
  cat:   Category;
  index: number;
}

function StoneCard({ cat, index }: StoneCardProps) {
  const [hovered,  setHovered]  = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top)  / rect.height,
    });
  };

  const rotateX = hovered ? (mousePos.y - 0.5) * -12 : 0;
  const rotateY = hovered ? (mousePos.x - 0.5) *  12 : 0;

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMousePos({ x: 0.5, y: 0.5 }); }}
      onMouseMove={handleMouseMove}
      className="opacity-0"
      style={{
        perspective:    1200,
        animationDelay: `${index * 0.12}s`,
        animation:      "fadeSlideUp 0.7s ease forwards",
      }}
    >
      <div
        className="relative rounded-xl overflow-hidden cursor-pointer"
        style={{
          background:     "rgba(255,255,255,0.93)",
          backdropFilter: "blur(8px)",
          border:         hovered ? `1px solid ${cat.color}44` : "1px solid rgba(92,61,46,0.1)",
          boxShadow:      hovered
            ? `0 32px 64px ${cat.glow}, 0 0 0 1px ${cat.color}22, 0 8px 20px rgba(0,0,0,0.06)`
            : "0 4px 20px rgba(92,61,46,0.08), 0 1px 4px rgba(0,0,0,0.04)",
          transform:      hovered
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`
            : "rotateX(0) rotateY(0) translateY(0) scale(1)",
          transition:     hovered
            ? "transform 0.1s ease, box-shadow 0.3s ease, border-color 0.3s ease"
            : "transform 0.55s cubic-bezier(0.25,0.8,0.25,1), box-shadow 0.55s ease, border-color 0.3s ease",
          transformStyle: "preserve-3d",
        }}
      >
        {/* ── Image ── */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={cat.image}
            alt={cat.title}
            className="w-full h-full object-cover"
            style={{
              transform:  hovered ? "scale(1.1)" : "scale(1.0)",
              transition: "transform 0.8s cubic-bezier(0.25,0.8,0.25,1)",
              filter:     hovered ? "brightness(0.72) saturate(1.15)" : "brightness(0.62) saturate(1.0)",
            }}
          />

          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: hovered
                ? `linear-gradient(180deg, transparent 15%, ${cat.color}99 100%)`
                : "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.75) 100%)",
              transition: "background 0.5s ease",
            }}
          />

          {/* Shimmer on hover */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:         "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.12) 48%, transparent 66%)",
              backgroundSize:     "200% 200%",
              backgroundPosition: hovered ? "0% 0%" : "200% 200%",
              transition:         "background-position 0.7s ease",
            }}
          />

          {/* Tag badge */}
          <div
            className="absolute top-3.5 left-3.5 text-[9px] font-black tracking-[2.5px] px-2.5 py-1 rounded font-mono"
            style={{
              background: "rgba(255,255,255,0.93)",
              color:      cat.color,
              border:     `1px solid ${cat.color}33`,
              boxShadow:  `0 2px 8px ${cat.glow}`,
              transform:  hovered ? "translateY(-2px)" : "translateY(0)",
              transition: "transform 0.3s ease",
            }}
          >
            {cat.tag}
          </div>

          {/* Title overlay on image */}
          <div
            className="absolute bottom-0 left-0 right-0 px-5 pb-4 pt-8"
            style={{
              background: "linear-gradient(transparent, rgba(0,0,0,0.86))",
              transform:  hovered ? "translateY(0)" : "translateY(6px)",
              transition: "transform 0.4s ease",
            }}
          >
            <p
              className="text-[9px] font-semibold tracking-[3.5px] font-mono mb-1"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              {cat.subtitle}
            </p>
            <h3
              className="text-2xl font-extrabold text-white m-0"
              style={{
                fontFamily:    "Palatino, 'Book Antiqua', Georgia, serif",
                textShadow:    "0 2px 10px rgba(0,0,0,0.5)",
                letterSpacing: "-0.2px",
              }}
            >
              {cat.title}
            </h3>
          </div>
        </div>

        {/* ── Card Body ── */}
        <div
          className="px-5 pt-4 pb-5 relative overflow-hidden"
          style={{
            background: hovered
              ? `linear-gradient(180deg, #ffffff 0%, ${cat.lightBg} 100%)`
              : "linear-gradient(180deg, #ffffff 0%, #faf8f5 100%)",
            transition: "background 0.4s ease",
          }}
        >
          {/* Accent line */}
          <div
            className="h-0.5 mb-3 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${cat.color}, transparent)`,
              width:      hovered ? "60%" : "24%",
              transition: "width 0.55s cubic-bezier(0.25,0.8,0.25,1)",
            }}
          />

          <p
            className="text-sm leading-relaxed mb-4"
            style={{
              color:      hovered ? "#374151" : "#6b7280",
              fontFamily: "Georgia, serif",
              transition: "color 0.3s ease",
            }}
          >
            {cat.description}
          </p>

          {/* CTA row */}
          <div className="flex items-center justify-between">
            <button
              className="flex items-center gap-2 bg-transparent border-0 p-0 cursor-pointer font-mono text-[0.68rem] font-bold tracking-[2.5px]"
              style={{
                color:      hovered ? cat.color : "#9ca3af",
                transition: "color 0.3s ease",
              }}
            >
              VIEW PRODUCTS
              <span
                className="inline-block rounded-full h-0.5"
                style={{
                  width:      hovered ? 28 : 10,
                  background: hovered ? cat.color : "#9ca3af",
                  transition: "width 0.4s ease, background 0.3s ease",
                }}
              />
            </button>

            {/* Arrow circle */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs"
              style={{
                border:     hovered ? `1.5px solid ${cat.color}` : "1.5px solid rgba(92,61,46,0.2)",
                background: hovered ? cat.lightBg : "transparent",
                color:      hovered ? cat.color : "rgba(92,61,46,0.35)",
                transform:  hovered ? "rotate(45deg)" : "rotate(0deg)",
                transition: "all 0.3s ease",
              }}
            >
              ↗
            </div>
          </div>

          {/* Corner glow */}
          <div
            className="absolute -bottom-5 -right-5 w-28 h-28 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${cat.glow}, transparent 70%)`,
              opacity:    hovered ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   DOWNLOAD BUTTON
══════════════════════════════════════ */
function DownloadButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden font-mono text-[0.75rem] font-bold tracking-[4px] px-12 py-3.5 rounded-sm cursor-pointer"
      style={{
        border:      "2px solid",
        borderColor: hovered ? "#5C3D2E" : "#374151",
        color:       hovered ? "#ffffff" : "#1f2937",
        background:  hovered ? "#5C3D2E" : "transparent",
        transition:  "all 0.35s cubic-bezier(0.25,0.8,0.25,1)",
        boxShadow:   hovered ? "0 8px 28px rgba(92,61,46,0.35)" : "none",
        transform:   hovered ? "translateY(-3px) scale(1.03)" : "translateY(0) scale(1)",
      }}
    >
      <span
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)",
          transform:  hovered ? "translateX(200%)" : "translateX(-200%)",
          transition: "transform 0.65s ease",
        }}
      />
      ↓ &nbsp; DOWNLOAD CATALOG
    </button>
  );
}

/* ══════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════ */
export default function StoneCategories() {
  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
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

      <section
        id="products"
        className="relative py-24 min-h-screen overflow-hidden"
        style={{ background: "linear-gradient(135deg, #faf8f5 0%, #f0ebe3 45%, #f7f4ee 100%)" }}
      >

        {/* ── Orbs ── */}
        <div className="absolute pointer-events-none"
             style={{ width: 480, height: 480, top: "-8%", left: "-6%",
               background: "radial-gradient(circle, rgba(180,140,100,0.12) 0%, transparent 70%)",
               animation: "orbFloat 18s ease-in-out infinite alternate" }} />
        <div className="absolute pointer-events-none"
             style={{ width: 360, height: 360, top: "50%", left: "65%",
               background: "radial-gradient(circle, rgba(90,140,90,0.09) 0%, transparent 70%)",
               animation: "orbFloat 22s ease-in-out infinite alternate-reverse", animationDelay: "4s" }} />
        <div className="absolute pointer-events-none"
             style={{ width: 280, height: 280, top: "25%", left: "35%",
               background: "radial-gradient(circle, rgba(200,170,110,0.08) 0%, transparent 70%)",
               animation: "orbFloat 15s ease-in-out infinite alternate", animationDelay: "2s" }} />

        {/* ── Diagonal beams ── */}
        <div className="absolute pointer-events-none"
             style={{ top: "-12%", left: "-6%", width: "55%", height: "75%",
               background: "linear-gradient(135deg, rgba(210,180,140,0.14) 0%, transparent 60%)",
               transform: "rotate(-14deg)", animation: "beamPulse 7s ease-in-out infinite" }} />
        <div className="absolute pointer-events-none"
             style={{ bottom: "-18%", right: "-6%", width: "42%", height: "60%",
               background: "linear-gradient(315deg, rgba(100,160,110,0.07) 0%, transparent 60%)",
               transform: "rotate(-14deg)",
               animation: "beamPulse 9s ease-in-out infinite reverse", animationDelay: "3s" }} />

        {/* ── Dot grid ── */}
        <div className="absolute inset-0 pointer-events-none"
             style={{ backgroundImage: "radial-gradient(circle, rgba(92,61,46,0.07) 1px, transparent 1px)",
               backgroundSize: "36px 36px" }} />

        {/* ── Shimmer sweep ── */}
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: "linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.20) 50%, transparent 62%)",
               backgroundSize: "200% 100%", animation: "shimmerSweep 8s linear infinite" }} />

        {/* ── Floating particles ── */}
        {PARTICLES.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              width:      p.size,
              height:     p.size,
              left:       `${p.left}%`,
              bottom:     "-6%",
              opacity:    p.opacity,
              background: `radial-gradient(circle, ${p.colorA} 0%, ${p.colorB} 100%)`,
              filter:     p.blurred ? "blur(2.5px)" : "none",
              boxShadow:  `0 0 ${p.size * 1.5}px ${p.colorA}`,
              animation:  `floatUp ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}

        {/* ── Spinning squares ── */}
        <div className="absolute top-24 right-8 w-20 h-20 pointer-events-none border border-[#5C3D2E]/10"
             style={{ transform: "rotate(12deg)", animation: "spinSlow 35s linear infinite" }} />
        <div className="absolute top-32 right-14 w-10 h-10 pointer-events-none border border-[#5C3D2E]/10"
             style={{ animation: "spinSlow 22s linear infinite reverse" }} />
        <div className="absolute bottom-28 left-8 w-16 h-16 pointer-events-none border border-emerald-800/10"
             style={{ transform: "rotate(-12deg)", animation: "spinSlow 28s linear infinite" }} />
        <div className="absolute bottom-40 left-16 w-8 h-8 pointer-events-none border border-amber-800/10"
             style={{ animation: "spinSlow 18s linear infinite reverse" }} />

        {/* ── Glowing dots ── */}
        {[
          { t: "18%", l: "8%",  s: 5, c: "rgba(180,140,100,0.5)", dur: 4 },
          { t: "65%", l: "4%",  s: 4, c: "rgba(90,140,90,0.4)",   dur: 5 },
          { t: "35%", l: "92%", s: 6, c: "rgba(180,140,100,0.4)", dur: 6 },
          { t: "80%", l: "88%", s: 4, c: "rgba(90,140,90,0.35)",  dur: 4 },
          { t: "12%", l: "52%", s: 5, c: "rgba(180,140,100,0.3)", dur: 7 },
        ].map((d, i) => (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              top:        d.t,
              left:       d.l,
              width:      d.s,
              height:     d.s,
              background: d.c,
              boxShadow:      `0 0 ${d.s * 3}px ${d.c}`,
              animation:      `glowPulse ${d.dur}s ease-in-out infinite`,
              animationDelay: `${i * 1.2}s`,
            }}
          />
        ))}

        {/* ══════════════════════════════════
            MAIN CONTENT
        ══════════════════════════════════ */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div
            className="text-center mb-16 opacity-0"
            style={{ animation: "fadeSlideUp 0.8s ease forwards" }}
          >
            <div className="inline-block mb-5">
              <span className="text-sm font-semibold text-emerald-700 tracking-[5px] border border-emerald-700
                               px-5 py-1.5 bg-emerald-50/70 backdrop-blur-sm font-mono uppercase">
                What We Do
              </span>
            </div>

            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-3"
              style={{ fontFamily: "Palatino, 'Book Antiqua', Georgia, serif" }}
            >
              Our Best{" "}
              <span style={{ color: "#5C3D2E" }}>Stone Categories</span>
            </h2>

            <p
              className="text-xl italic text-amber-800 mb-3"
              style={{ fontFamily: "Palatino, 'Book Antiqua', Georgia, serif" }}
            >
              Crafted for Interiors &amp; Exteriors
            </p>

            <p className="text-gray-600 text-base leading-relaxed max-w-xl mx-auto"
               style={{ fontFamily: "Georgia, serif" }}>
              Highlighting Stone Shadow's 25+ years of experience in curating the earth's finest textures.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
            {categories.map((cat, i) => (
              <StoneCard key={i} cat={cat} index={i} />
            ))}
          </div>

          {/* CTA */}
          <div
            className="text-center opacity-0"
            style={{ animation: "fadeSlideUp 0.9s ease 0.75s forwards" }}
          >
            <DownloadButton />
          </div>
        </div>
      </section>
    </>
  );
}