import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Simulation from './pages/Simulation';
import Resources from './pages/Resources';
import Contact from './pages/Contact';
import './styles/globals.css';

// Scroll to top on route change
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppInner() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/"            element={<Home />} />
        <Route path="/simulation"  element={<Simulation />} />
        <Route path="/resources"   element={<Resources />} />
        <Route path="/contact"     element={<Contact />} />
        {/* Catch-all → home */}
        <Route path="*"            element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
