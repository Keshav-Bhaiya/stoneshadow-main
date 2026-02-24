import Hero from "../components/Hero";
import About from "../components/About";
import Categories from "../components/Categories";
import Gallery from "../components/Gallery";
import Stats from "../components/Stats";
import Contact from "../components/Contact";
import ServiceAreas from "../components/ServiceAreas";

const Home = () => {
  return (
    <>
      {/* HERO */}
      <section id="home" className="scroll-mt-24">
        <Hero />
      </section>

      {/* ABOUT */}
      <section id="about" className="scroll-mt-24">
        <About />
      </section>

      {/* PRODUCTS */}
      <section id="products" className="scroll-mt-24">
        <Categories />
      </section>

      {/* GALLERY PREVIEW */}
      <section id="gallery" className="scroll-mt-24">
        <Gallery />
      </section>

      {/* STATS */}
      <section id="stats" className="scroll-mt-24">
        <Stats />
      </section>

      {/* CONTACT */}
      <section id="contact" className="scroll-mt-24">
        <Contact />
      </section>

      {/* SERVICE AREAS */}
      <section id="service-areas" className="scroll-mt-24">
        <ServiceAreas />
      </section>
    </>
  );
};

export default Home;