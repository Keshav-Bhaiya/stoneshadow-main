import { MapPin, Phone, Mail } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id:       i,
  size:     Math.random() * 9 + 3,
  left:     Math.random() * 100,
  delay:    Math.random() * 9,
  duration: Math.random() * 10 + 13,
  opacity:  Math.random() * 0.13 + 0.04,
  blurred:  i % 3 === 0,
  colorA:   i % 2 === 0 ? 'rgba(180,140,100,0.9)' : 'rgba(120,170,120,0.7)',
  colorB:   i % 2 === 0 ? 'rgba(180,130,60,0.4)'  : 'rgba(80,140,80,0.3)',
}));

const contactInfo = [
  { icon: MapPin, title: 'Location', lines: ['Bhopal, Madhya Pradesh, India', '462001'] },
  { icon: Phone,  title: 'Phone',    lines: ['+91 9109496156'] },
  { icon: Mail,   title: 'Email',    lines: ['stoneshadow.in@gmail.com'] },
];

/* ── Types ── */
interface ContactItem  { icon: React.ElementType; title: string; lines: string[]; }
interface ContactInfoItemProps { item: ContactItem; index: number; inView: boolean; }
interface FormData  { firstName: string; lastName: string; email: string; interest: string; message: string; }
interface FormErrors { firstName?: string; lastName?: string; email?: string; interest?: string; message?: string; }

/* ── Validator ── */
function validate(d: FormData): FormErrors {
  const e: FormErrors = {};
  if (!d.firstName.trim())  e.firstName = 'First name is required.';
  if (!d.lastName.trim())   e.lastName  = 'Last name is required.';
  if (!d.email.trim())      e.email     = 'Email address is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim()))
                            e.email     = 'Please enter a valid email address.';
  if (!d.interest)          e.interest  = 'Please select a stone type.';
  if (!d.message.trim())    e.message   = 'Message is required.';
  else if (d.message.trim().length < 10)
                            e.message   = 'Message must be at least 10 characters.';
  return e;
}

/* ══════════════════════════════════════
   CONTACT INFO ITEM
══════════════════════════════════════ */
function ContactInfoItem({ item, index, inView }: ContactInfoItemProps) {
  const [hovered, setHovered] = useState(false);
  const Icon = item.icon;
  return (
    <div
      className="flex items-start gap-4"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity:    inView ? 1 : 0,
        transform:  inView ? 'translateX(0)' : 'translateX(-24px)',
        transition: `opacity 0.6s ease ${0.3 + index * 0.15}s, transform 0.6s ease ${0.3 + index * 0.15}s`,
      }}
    >
      <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
           style={{
             background: hovered ? '#5C3D2E' : 'rgba(92,61,46,0.1)',
             border:     `1.5px solid ${hovered ? '#5C3D2E' : 'rgba(92,61,46,0.2)'}`,
             boxShadow:  hovered ? '0 6px 20px rgba(92,61,46,0.3)' : 'none',
             transition: 'all 0.35s ease',
             transform:  hovered ? 'scale(1.08)' : 'scale(1)',
           }}>
        <Icon size={18} style={{ color: hovered ? '#ffffff' : '#5C3D2E', transition: 'color 0.3s ease' }} />
      </div>
      <div>
        <h3 className="font-bold text-gray-800 mb-1 text-sm"
            style={{ fontFamily: "Palatino, 'Book Antiqua', Georgia, serif" }}>
          {item.title}
        </h3>
        {item.lines.map((line, i) => (
          <p key={i} className="text-sm text-gray-600" style={{ fontFamily: 'Georgia, serif' }}>{line}</p>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   SUBMIT BUTTON
══════════════════════════════════════ */
function SubmitButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="submit"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden w-full font-mono text-xs font-bold tracking-[4px] py-4 rounded-md cursor-pointer"
      style={{
        background: hovered ? '#4a3124' : '#5C3D2E',
        color:      '#ffffff',
        border:     'none',
        boxShadow:  hovered ? '0 10px 32px rgba(92,61,46,0.45)' : '0 4px 16px rgba(92,61,46,0.25)',
        transform:  hovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'all 0.35s cubic-bezier(0.25,0.8,0.25,1)',
      }}
    >
      <span className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent 30%, rgba(255,255,255,0.12) 50%, transparent 70%)',
              transform:  hovered ? 'translateX(200%)' : 'translateX(-200%)',
              transition: 'transform 0.65s ease',
            }} />
      SEND MESSAGE →
    </button>
  );
}

/* ══════════════════════════════════════
   MAIN CONTACT COMPONENT
══════════════════════════════════════ */
const Contact = () => {
  const EMPTY: FormData = { firstName: '', lastName: '', email: '', interest: '', message: '' };

  const [formData,  setFormData]  = useState<FormData>(EMPTY);
  const [errors,    setErrors]    = useState<FormErrors>({});
  const [touched,   setTouched]   = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [focused,   setFocused]   = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [shake,     setShake]     = useState(false);
  const [inView,    setInView]    = useState(false);
  const ref = useRef<HTMLElement>(null);

  /* Intersection observer */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  /* Live-validate only touched fields */
  useEffect(() => {
    if (Object.keys(touched).length === 0) return;
    const allErrs = validate(formData);
    const visible: FormErrors = {};
    (Object.keys(touched) as (keyof FormData)[]).forEach(k => {
      if (touched[k] && allErrs[k]) visible[k] = allErrs[k];
    });
    setErrors(visible);
  }, [formData, touched]);

  const markTouched = (field: keyof FormData) =>
    setTouched(prev => ({ ...prev, [field]: true }));

  /* Submit handler */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    /* touch everything */
    const all = Object.fromEntries(
      (Object.keys(formData) as (keyof FormData)[]).map(k => [k, true])
    ) as Record<keyof FormData, boolean>;
    setTouched(all);

    const errs = validate(formData);
    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      /* shake the form to indicate errors */
      setShake(true);
      setTimeout(() => setShake(false), 500);
      /* scroll to first error */
      const first = document.querySelector('[data-error="true"]');
      first?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setSubmitted(true);
    setFormData(EMPTY);
    setTouched({});
    setErrors({});
    setTimeout(() => setSubmitted(false), 3500);
  };

  /* ── Style helpers ── */
  const inputStyle = (field: string): React.CSSProperties => {
    const hasErr = !!errors[field as keyof FormErrors];
    return {
      width:        '100%',
      padding:      '12px 16px',
      border:       `1.5px solid ${hasErr ? '#dc2626' : focused === field ? '#5C3D2E' : 'rgba(92,61,46,0.2)'}`,
      borderRadius: 6,
      outline:      'none',
      background:   hasErr ? 'rgba(220,38,38,0.025)' : focused === field ? 'rgba(92,61,46,0.02)' : '#ffffff',
      color:        '#1f2937',
      fontFamily:   'Georgia, serif',
      fontSize:     '0.9rem',
      transition:   'all 0.3s ease',
      boxShadow:    hasErr
        ? '0 0 0 3px rgba(220,38,38,0.10)'
        : focused === field ? '0 0 0 3px rgba(92,61,46,0.08)' : 'none',
    };
  };

  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: 10, fontWeight: 700,
    color: '#5C3D2E', letterSpacing: '2.5px', marginBottom: 6, fontFamily: 'monospace',
  };

  const errStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: 4,
    marginTop: 5, fontSize: 11, color: '#dc2626', fontFamily: 'monospace',
  };

  return (
    <>
      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(0px) scale(1);      opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 0.7; }
          100% { transform: translateY(-110vh) scale(0.5); opacity: 0; }
        }
        @keyframes orbFloat {
          0%   { transform: translate(0px,0px) scale(1);     }
          50%  { transform: translate(22px,16px) scale(1.06);}
          100% { transform: translate(-12px,22px) scale(0.96);}
        }
        @keyframes beamPulse   { 0%,100%{opacity:1}   50%{opacity:0.3} }
        @keyframes shimmerSweep{ 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes spinSlow    { from{transform:rotate(0deg)}  to{transform:rotate(360deg)} }
        @keyframes glowPulse   { 0%,100%{opacity:0.4;transform:scale(1)} 50%{opacity:1;transform:scale(1.6)} }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmerTitle{ 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes successPop  { 0%{transform:scale(0.85);opacity:0} 60%{transform:scale(1.04)} 100%{transform:scale(1);opacity:1} }
        @keyframes shakeX {
          0%,100%{ transform:translateX(0) }
          20%{ transform:translateX(-7px) }
          40%{ transform:translateX(7px) }
          60%{ transform:translateX(-4px) }
          80%{ transform:translateX(4px) }
        }
      `}</style>

      <section
        id="contact"
        ref={ref}
        className="relative py-24 min-h-screen overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #faf8f5 0%, #f0ebe3 45%, #f7f4ee 100%)' }}
      >
        {/* ── Orbs ── */}
        <div className="absolute pointer-events-none" style={{ width:480, height:480, top:'-8%', left:'-6%', background:'radial-gradient(circle, rgba(180,140,100,0.12) 0%, transparent 70%)', animation:'orbFloat 18s ease-in-out infinite alternate' }} />
        <div className="absolute pointer-events-none" style={{ width:360, height:360, top:'50%', left:'65%', background:'radial-gradient(circle, rgba(90,140,90,0.09) 0%, transparent 70%)', animation:'orbFloat 22s ease-in-out infinite alternate-reverse', animationDelay:'4s' }} />
        <div className="absolute pointer-events-none" style={{ width:280, height:280, top:'25%', left:'35%', background:'radial-gradient(circle, rgba(200,170,110,0.08) 0%, transparent 70%)', animation:'orbFloat 15s ease-in-out infinite alternate', animationDelay:'2s' }} />

        {/* ── Beams ── */}
        <div className="absolute pointer-events-none" style={{ top:'-12%', left:'-6%', width:'55%', height:'75%', background:'linear-gradient(135deg, rgba(210,180,140,0.14) 0%, transparent 60%)', transform:'rotate(-14deg)', animation:'beamPulse 7s ease-in-out infinite' }} />
        <div className="absolute pointer-events-none" style={{ bottom:'-18%', right:'-6%', width:'42%', height:'60%', background:'linear-gradient(315deg, rgba(100,160,110,0.07) 0%, transparent 60%)', transform:'rotate(-14deg)', animation:'beamPulse 9s ease-in-out infinite reverse', animationDelay:'3s' }} />

        {/* ── Dot grid ── */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:'radial-gradient(circle, rgba(92,61,46,0.07) 1px, transparent 1px)', backgroundSize:'36px 36px' }} />

        {/* ── Shimmer ── */}
        <div className="absolute inset-0 pointer-events-none" style={{ background:'linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.20) 50%, transparent 62%)', backgroundSize:'200% 100%', animation:'shimmerSweep 8s linear infinite' }} />

        {/* ── Particles ── */}
        {PARTICLES.map(p => (
          <div key={p.id} className="absolute rounded-full pointer-events-none"
               style={{ width:p.size, height:p.size, left:`${p.left}%`, bottom:'-6%',
                 opacity:p.opacity, background:`radial-gradient(circle, ${p.colorA} 0%, ${p.colorB} 100%)`,
                 filter:p.blurred?'blur(2.5px)':'none', boxShadow:`0 0 ${p.size*1.5}px ${p.colorA}`,
                 animation:`floatUp ${p.duration}s ease-in-out ${p.delay}s infinite` }} />
        ))}

        {/* ── Spinning squares ── */}
        <div className="absolute top-24 right-8 w-20 h-20 pointer-events-none border border-[#5C3D2E]/10" style={{ transform:'rotate(12deg)', animation:'spinSlow 35s linear infinite' }} />
        <div className="absolute top-32 right-14 w-10 h-10 pointer-events-none border border-[#5C3D2E]/10" style={{ animation:'spinSlow 22s linear infinite reverse' }} />
        <div className="absolute bottom-28 left-8 w-16 h-16 pointer-events-none border border-emerald-800/10" style={{ transform:'rotate(-12deg)', animation:'spinSlow 28s linear infinite' }} />
        <div className="absolute bottom-40 left-16 w-8 h-8 pointer-events-none border border-amber-800/10" style={{ animation:'spinSlow 18s linear infinite reverse' }} />

        {/* ── Glow dots ── */}
        {[
          { t:'18%', l:'8%',  s:5, c:'rgba(180,140,100,0.5)', dur:4 },
          { t:'65%', l:'4%',  s:4, c:'rgba(90,140,90,0.4)',   dur:5 },
          { t:'35%', l:'92%', s:6, c:'rgba(180,140,100,0.4)', dur:6 },
          { t:'80%', l:'88%', s:4, c:'rgba(90,140,90,0.35)',  dur:4 },
          { t:'12%', l:'52%', s:5, c:'rgba(180,140,100,0.3)', dur:7 },
        ].map((d, i) => (
          <div key={i} className="absolute rounded-full pointer-events-none"
               style={{ top:d.t, left:d.l, width:d.s, height:d.s, background:d.c,
                 boxShadow:`0 0 ${d.s*3}px ${d.c}`, animation:`glowPulse ${d.dur}s ease-in-out infinite`,
                 animationDelay:`${i*1.2}s` }} />
        ))}

        {/* ══════════════════════════
            MAIN CONTENT
        ══════════════════════════ */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-14"
               style={{ opacity:inView?1:0, transform:inView?'translateY(0)':'translateY(28px)', transition:'opacity 0.7s ease, transform 0.7s ease' }}>
            <div className="inline-block mb-5">
              <span className="text-sm font-semibold text-emerald-700 tracking-[5px] border border-emerald-700 px-5 py-1.5 bg-emerald-50/70 backdrop-blur-sm font-mono uppercase">
                Get In Touch
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-3"
                style={{ fontFamily:"Palatino,'Book Antiqua',Georgia,serif", background:'linear-gradient(135deg,#1f2937 20%,#5C3D2E 55%,#1f2937 90%)', backgroundSize:'300% auto', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', animation:inView?'shimmerTitle 5s linear infinite':'none' }}>
              Start Your Journey With Stone Shadow
            </h2>
            <p className="text-xl italic text-amber-800" style={{ fontFamily:"Palatino,'Book Antiqua',Georgia,serif" }}>
              Crafted for Interiors &amp; Exteriors
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* ── Left ── */}
            <div style={{ opacity:inView?1:0, transform:inView?'translateX(0)':'translateX(-32px)', transition:'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s' }}>
              <p className="text-gray-600 text-base leading-relaxed mb-10" style={{ fontFamily:'Georgia,serif' }}>
                Whether you are an architect, interior designer, or homeowner, our team is ready to assist you in selecting the perfect stone for your vision.
              </p>
              <div className="space-y-7">
                {contactInfo.map((item, i) => <ContactInfoItem key={i} item={item} index={i} inView={inView} />)}
              </div>

              {/* Working hours */}
              <div className="mt-10 p-5 rounded-xl"
                   style={{ background:'linear-gradient(135deg,rgba(92,61,46,0.08) 0%,rgba(92,61,46,0.04) 100%)', border:'1px solid rgba(92,61,46,0.15)', opacity:inView?1:0, transform:inView?'translateY(0)':'translateY(20px)', transition:'opacity 0.6s ease 0.65s, transform 0.6s ease 0.65s' }}>
                <div className="flex items-center gap-3 mb-2">
                  <div style={{ width:28, height:1.5, background:'linear-gradient(90deg,#5C3D2E,transparent)', borderRadius:2 }} />
                  <span className="text-[10px] font-mono font-bold tracking-[3px] text-[#5C3D2E]">WORKING HOURS</span>
                </div>
                <p className="text-sm text-gray-600" style={{ fontFamily:'Georgia,serif' }}>Mon – Sat: 9:00 AM – 6:00 PM</p>
                <p className="text-sm text-gray-600" style={{ fontFamily:'Georgia,serif' }}>Sunday: By Appointment Only</p>
              </div>
            </div>

            {/* ── Right: Form ── */}
            <div style={{ opacity:inView?1:0, transform:inView?'translateX(0)':'translateX(32px)', transition:'opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s' }}>
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  background:'rgba(255,255,255,0.92)', backdropFilter:'blur(12px)',
                  border:'1px solid rgba(92,61,46,0.12)',
                  boxShadow:'0 20px 60px rgba(92,61,46,0.1), 0 4px 16px rgba(0,0,0,0.05)',
                  padding:'36px 32px',
                  animation: shake ? 'shakeX 0.45s ease' : 'none',
                }}
              >
                {/* Accent line */}
                <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:'linear-gradient(90deg,#5C3D2E,#d4a847,#5C3D2E)' }} />

                {/* Success overlay */}
                {submitted && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl z-20"
                       style={{ background:'rgba(255,255,255,0.97)', animation:'successPop 0.45s ease forwards' }}>
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                         style={{ background:'rgba(92,61,46,0.1)', border:'2px solid #5C3D2E' }}>
                      <span style={{ fontSize:'1.8rem' }}>✓</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2" style={{ fontFamily:"Palatino,'Book Antiqua',Georgia,serif" }}>
                      Message Sent!
                    </h3>
                    <p className="text-sm text-gray-500" style={{ fontFamily:'Georgia,serif' }}>We'll get back to you shortly.</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5" noValidate>

                  {/* First + Last */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {([
                      { label:'FIRST NAME', field:'firstName' as keyof FormData, ph:'John' },
                      { label:'LAST NAME',  field:'lastName'  as keyof FormData, ph:'Doe'  },
                    ]).map(({ label, field, ph }) => (
                      <div key={field} data-error={!!errors[field] || undefined}>
                        <label style={labelStyle}>
                          {label} <span style={{ color:'#dc2626' }}>*</span>
                        </label>
                        <input
                          type="text" placeholder={ph}
                          value={formData[field]}
                          onChange={e => setFormData({ ...formData, [field]: e.target.value })}
                          onFocus={() => setFocused(field)}
                          onBlur={() => { setFocused(''); markTouched(field); }}
                          style={inputStyle(field)}
                        />
                        {errors[field] && (
                          <span style={errStyle}>⚠&nbsp;{errors[field]}</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Email */}
                  <div data-error={!!errors.email || undefined}>
                    <label style={labelStyle}>EMAIL ADDRESS <span style={{ color:'#dc2626' }}>*</span></label>
                    <input
                      type="email" placeholder="john@example.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      onFocus={() => setFocused('email')}
                      onBlur={() => { setFocused(''); markTouched('email'); }}
                      style={inputStyle('email')}
                    />
                    {errors.email && <span style={errStyle}>⚠&nbsp;{errors.email}</span>}
                  </div>

                  {/* Interest */}
                  <div data-error={!!errors.interest || undefined}>
                    <label style={labelStyle}>STONE INTEREST <span style={{ color:'#dc2626' }}>*</span></label>
                    <select
                      value={formData.interest}
                      onChange={e => setFormData({ ...formData, interest: e.target.value })}
                      onFocus={() => setFocused('interest')}
                      onBlur={() => { setFocused(''); markTouched('interest'); }}
                      style={{ ...inputStyle('interest'), cursor:'pointer' }}
                    >
                      <option value="">Select Stone Type</option>
                      <option value="cobblestone">Cobble Stone</option>
                      <option value="wallcladding">Wall Cladding</option>
                      <option value="sandstone">Sandstone Flooring</option>
                      <option value="stonecraft">Stone Craft</option>
                      <option value="special">Special Stones</option>
                      <option value="fountain">Wall Fountain</option>
                      <option value="carving">Stone Carving</option>
                    </select>
                    {errors.interest && <span style={errStyle}>⚠&nbsp;{errors.interest}</span>}
                  </div>

                  {/* Message */}
                  <div data-error={!!errors.message || undefined}>
                    <label style={labelStyle}>MESSAGE <span style={{ color:'#dc2626' }}>*</span></label>
                    <textarea
                      rows={4} placeholder="Tell us about your project requirements..."
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      onFocus={() => setFocused('message')}
                      onBlur={() => { setFocused(''); markTouched('message'); }}
                      style={{ ...inputStyle('message'), resize:'none' }}
                    />
                    {errors.message && <span style={errStyle}>⚠&nbsp;{errors.message}</span>}
                  </div>

                  {/* Required note */}
                  <p style={{ fontSize:11, color:'#9ca3af', fontFamily:'monospace' }}>
                    <span style={{ color:'#dc2626' }}>*</span> All fields are required
                  </p>

                  <SubmitButton />
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;