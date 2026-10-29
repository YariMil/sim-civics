import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Simulation from './pages/Simulation';
import Resources from './pages/Resources';
import ModuleViewer from './pages/ModuleViewer';
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
  const { pathname } = useLocation();
  // ModuleViewer is full-screen — hide the shared nav/footer
  const isViewer = pathname.startsWith('/resources/');
  // The redesigned home page is a standalone layout (no shared nav/footer)
  const isHome = pathname === '/';
  const hideChrome = isViewer || isHome;

  return (
    <>
      <ScrollToTop />
      {!hideChrome && <Navbar />}
      <Routes>
        <Route path="/"                      element={<Home />} />
        <Route path="/simulation"            element={<Simulation />} />
        <Route path="/resources"             element={<Resources />} />
        <Route path="/resources/:moduleId"   element={<ModuleViewer />} />
        <Route path="/contact"              element={<Contact />} />
        {/* Catch-all → home */}
        <Route path="*"                      element={<Home />} />
      </Routes>
      {!hideChrome && <Footer />}
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
