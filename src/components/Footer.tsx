import { useNavigate, useLocation } from 'react-router-dom'
import { Mail, Phone, MapPin, Facebook, Instagram } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const navigate = useNavigate()
  const location = useLocation()

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        if (id === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        }
      }, 200)
    } else {
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

          {/* BRAND */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-white flex items-center justify-center rounded">
                <span className="text-gray-900 font-bold text-sm">S</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-serif font-bold text-white tracking-widest">STONE</span>
                <span className="text-xs text-gray-400 tracking-widest">SHADOW</span>
              </div>
            </div>

            <p className="text-sm leading-relaxed mb-5">
              Premium natural stone manufacturer and exporter, delivering excellence to
              architectural projects worldwide since 1998.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex gap-3">

              {/* Facebook */}
              <a
                href="#"
                className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center
                           text-gray-400 hover:text-white hover:border-white transition-all duration-300"
              >
                <Facebook className="w-4 h-4" />
              </a>

              {/* Instagram */}
              <a
                href="#"
                className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center
                           text-gray-400 hover:text-white hover:border-white transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/919109496156"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center
                           text-gray-400 hover:text-white hover:border-green-500 hover:bg-green-600
                           transition-all duration-300"
              >
                <svg viewBox="0 0 32 32" className="w-4 h-4 fill-current">
                  <path d="M16 .396C7.164.396 0 7.56 0 16.396c0 2.885.753 5.693 2.182 8.168L0 32l7.668-2.145a15.95 15.95 0 0 0 8.332 2.31c8.836 0 16-7.164 16-16S24.836.396 16 .396zm0 29.33a13.24 13.24 0 0 1-6.757-1.86l-.483-.287-4.548 1.273 1.214-4.435-.314-.457a13.234 13.234 0 0 1-2.042-7.165c0-7.314 5.948-13.263 13.263-13.263S29.595 9.48 29.595 16.795 23.647 30.058 16.333 30.058zm7.327-9.92c-.4-.2-2.367-1.167-2.734-1.3-.367-.133-.633-.2-.9.2-.267.4-1.033 1.3-1.267 1.567-.233.267-.467.3-.867.1-.4-.2-1.69-.623-3.22-1.987-1.19-1.06-1.994-2.367-2.227-2.767-.233-.4-.025-.617.175-.817.18-.18.4-.467.6-.7.2-.233.267-.4.4-.667.133-.267.067-.5-.033-.7-.1-.2-.9-2.167-1.233-2.967-.325-.78-.655-.673-.9-.687l-.767-.013c-.267 0-.7.1-1.067.5-.367.4-1.4 1.367-1.4 3.333 0 1.967 1.433 3.867 1.633 4.133.2.267 2.82 4.307 6.833 6.037.954.412 1.697.658 2.278.842.957.304 1.828.261 2.515.158.767-.114 2.367-.967 2.7-1.9.333-.933.333-1.733.233-1.9-.1-.167-.367-.267-.767-.467z"/>
                </svg>
              </a>

            </div>
          </div>

          {/* HELPFUL LINKS */}
          <div>
            <h3 className="text-sm font-semibold tracking-[2px] uppercase text-white mb-5">
              Helpful Links
            </h3>
            <ul className="space-y-3">
              <li><button onClick={() => scrollToSection('home')} className="text-sm hover:text-white">Home</button></li>
              <li><button onClick={() => scrollToSection('about')} className="text-sm hover:text-white">About Us</button></li>
              <li><button onClick={() => scrollToSection('products')} className="text-sm hover:text-white">Our Products</button></li>
              <li><button onClick={() => navigate('/gallery')} className="text-sm hover:text-white">Gallery</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="text-sm hover:text-white">Contact</button></li>
            </ul>
          </div>

          {/* OUR PRODUCTS */}
          <div>
            <h3 className="text-sm font-semibold tracking-[2px] uppercase text-white mb-5">
              Our Products
            </h3>
            <ul className="space-y-3">
              {[
                'Natural Stone Pavings',
                'Natural Wall Claddings',
                'Mosaic',
                'Cobbles Stones',
                'Wallings',
                'Natural Stone Crafts'
              ].map((p) => (
                <li key={p}>
                  <button
                    onClick={() => scrollToSection('products')}
                    className="text-sm hover:text-white transition-colors duration-300"
                  >
                    {p}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div>
            <h3 className="text-sm font-semibold tracking-[2px] uppercase text-white mb-5">
              Get In Touch
            </h3>
            <div className="space-y-4">
              <a
                href="mailto:stoneshadow.in@gmail.com"
                className="flex items-start gap-3 text-sm hover:text-white transition-colors duration-300"
              >
                <Mail className="w-4 h-4 shrink-0 mt-0.5" />
                stoneshadow.in@gmail.com
              </a>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 shrink-0 mt-0.5" />
                <a href="tel:+919109496156" className="text-sm hover:text-white">
                  +91 9109496156
                </a>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <p>Bhopal Madhya Pradesh</p>
                  <p>462001</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>&copy; {currentYear} Stone Shadow. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer