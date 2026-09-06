import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Rooms from './components/Rooms';
import Amenities from './components/Amenities';
import CinematicSection from './components/CinematicSection';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import Location from './components/Location';
import ContactCTA from './components/ContactCTA';
import Footer from './components/Footer';
import MobileBookingBar from './components/MobileBookingBar';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Rooms />
        <Amenities />
        <CinematicSection />
        <Gallery />
        <Reviews />
        <Location />
        <ContactCTA />
      </main>
      <Footer />
      <MobileBookingBar />
    </>
  );
}

export default App;
