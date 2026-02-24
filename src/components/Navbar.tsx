import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen]       = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const navigate  = useNavigate();
  const location  = useLocation();

  /* ── scroll shadow ── */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  /* ── smooth scroll to section ── */
  const scrollTo = (id: string) => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 350);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /* ── logo click → top of home ── */
  const goHome = () => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  /* ── nav links config ── */
  const NAV_LINKS = [
    { label: 'Home',        action: () => scrollTo('home')     },
    { label: 'About Us',   action: () => scrollTo('about')    },
    { label: 'Our Products', action: () => scrollTo('products') },
    { label: 'Projects',   action: () => scrollTo('gallery') },
    { label: 'Gallery',    action: () => { setIsOpen(false); navigate('/gallery'); }, isRoute: true },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_2px_24px_rgba(0,0,0,0.08)]'
            : 'bg-white/80 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[70px]">

            {/* ── LOGO ── */}
            <button
              onClick={goHome}
              className="flex items-center gap-3 group focus:outline-none"
            >
              {/* Icon box — matches screenshot exactly */}
              <div
                className="w-10 h-10 flex items-center justify-center rounded-sm shadow-md
                           transition-transform duration-300 group-hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #2c2016 0%, #5C3D2E 100%)' }}
              >
                <span className="font-serif font-bold text-[18px] text-white tracking-tight">S</span>
                <span className="font-serif font-bold text-[18px] text-white tracking-tight">S</span>
              </div>

              {/* Text */}
              <div className="flex flex-col leading-none">
                <span
                  className="font-serif font-bold tracking-[3px] text-[15px] text-gray-900
                             group-hover:text-[#5C3D2E] transition-colors duration-300"
                >
                  STONE
                </span>
                <span
                  className="font-serif font-bold tracking-[3px] text-[15px] text-gray-900
                             group-hover:text-[#5C3D2E] transition-colors duration-300"
                >
                  SHADOW
                </span>
              </div>
            </button>

            {/* ── DESKTOP LINKS ── */}
            <ul className="hidden lg:flex items-center gap-8 list-none">
              {NAV_LINKS.map((l) => (
                <li key={l.label}>
                  <button
                    onClick={l.action}
                    className="relative font-medium text-[13.5px] text-gray-700 tracking-wide
                               pb-1 transition-colors duration-300 hover:text-[#5C3D2E] group
                               focus:outline-none"
                  >
                    {l.label}
                    {/* underline on hover */}
                    <span
                      className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-[#5C3D2E] rounded-full
                                 transition-all duration-300 group-hover:w-full"
                    />
                  </button>
                </li>
              ))}
            </ul>

            {/* ── RIGHT: quick contact icons + CTA ── */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Phone icon — opens dialer */}
              <a
                href="tel:+919301570972"
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center
                           justify-center text-gray-500 hover:border-[#5C3D2E] hover:text-[#5C3D2E]
                           hover:-translate-y-0.5 transition-all duration-300"
                title="+91 93015 70972"
              >
                <Phone size={15} />
              </a>

              {/* Email icon — opens mail app */}
              <a
                href="mailto:keshavb266@gmail.com"
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center
                           justify-center text-gray-500 hover:border-[#5C3D2E] hover:text-[#5C3D2E]
                           hover:-translate-y-0.5 transition-all duration-300"
                title="keshavb266@gmail.com"
              >
                <Mail size={15} />
              </a>

              {/* Contact Us CTA */}
              <button
                onClick={() => scrollTo('contact')}
                className="relative overflow-hidden px-5 py-2.5 rounded-sm font-medium text-[12px]
                           tracking-widest uppercase text-white transition-all duration-300
                           hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(92,61,46,0.4)]
                           group"
                style={{ background: 'linear-gradient(135deg, #5C3D2E 0%, #7a5040 100%)' }}
              >
                {/* shimmer on hover */}
                <span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20
                             to-transparent -translate-x-full group-hover:translate-x-full
                             transition-transform duration-600"
                />
                Contact Us
              </button>
            </div>

            {/* ── HAMBURGER (mobile) ── */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-[#5C3D2E] transition-colors"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* ── MOBILE MENU ── */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-400 bg-white/97 backdrop-blur-md
                      border-t border-gray-100 ${isOpen ? 'max-h-[500px]' : 'max-h-0'}`}
        >
          <div className="px-5 py-4 space-y-1">
            {NAV_LINKS.map((l) => (
              <button
                key={l.label}
                onClick={l.action}
                className="block w-full text-left px-0 py-3.5 text-[14px] font-medium
                           text-gray-700 border-b border-gray-100 last:border-0
                           hover:text-[#5C3D2E] transition-colors duration-300"
              >
                {l.label}
              </button>
            ))}

            {/* Mobile contact info */}
            <div className="pt-4 space-y-3">
              <a
                href="tel:+919301570972"
                className="flex items-center gap-3 text-[13px] text-gray-500 hover:text-[#5C3D2E]
                           transition-colors"
              >
                <Phone size={14} /> +91 93015 70972
              </a>
              <a
                href="mailto:keshavb266@gmail.com"
                className="flex items-center gap-3 text-[13px] text-gray-500 hover:text-[#5C3D2E]
                           transition-colors"
              >
                <Mail size={14} /> keshavb266@gmail.com
              </a>
              <button
                onClick={() => scrollTo('contact')}
                className="w-full mt-2 py-3 text-white text-[12px] font-semibold tracking-widest
                           uppercase rounded-sm transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, #5C3D2E 0%, #7a5040 100%)' }}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* keyframes */}
      <style>{`
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0);     }
        }
      `}</style>
    </>
  );
};

export default Navbar;