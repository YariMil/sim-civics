import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import SimCivicsTop from './components/SimCivicsTop';
import SimCivicsBottom from './components/SimCivicsBottom';
import Home from './pages/Home';
import Simulation from './pages/Simulation';
import Resources from './pages/Resources';
import ModuleViewer from './pages/ModuleViewer';
import Contact from './pages/Contact';
import SignUp from './pages/SignUp';
import Privacy from './pages/Privacy';
import LogIn from './pages/LogIn';
import Account from './pages/Account';
import IdeasIntro, { IdeasHome } from './pages/ideas/IdeasIntro';
import IdeaDetail from './pages/ideas/IdeaDetail';
import IdeaEditor from './pages/ideas/IdeaEditor';
import SimilarIdeas from './pages/ideas/SimilarIdeas';
import RequireAuth from './components/RequireAuth';
import { AuthProvider } from './auth/AuthContext';
import { ACCOUNTS_ENABLED } from './config/features';
import './styles/globals.css';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppInner() {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/+$/, '') || '/';
  // ModuleViewer is full-screen, so it is the only page without the shared header/footer
  const hideChrome = path.startsWith('/resources/');

  return (
    <>
      <ScrollToTop />
      {!hideChrome && <SimCivicsTop />}
      <Routes>
        <Route path="/"                    element={<Home />} />
        <Route path="/simulation"          element={<Simulation />} />
        <Route path="/resources"           element={<Resources />} />
        <Route path="/resources/:moduleId" element={<ModuleViewer />} />
        <Route path="/contact"             element={<Contact />} />
        <Route path="/sign-up"             element={<SignUp />} />
        <Route path="/privacy"             element={<Privacy />} />
        {ACCOUNTS_ENABLED && <Route path="/log-in"  element={<LogIn />} />}
        {ACCOUNTS_ENABLED && <Route path="/account" element={<Account />} />}
        {ACCOUNTS_ENABLED && (
          <>
            <Route path="/ideas"          element={<IdeasHome />} />
            <Route path="/ideas/intro"    element={<IdeasIntro />} />
            <Route path="/ideas/new"      element={<RequireAuth><IdeaEditor /></RequireAuth>} />
            <Route path="/ideas/:id"      element={<RequireAuth><IdeaDetail /></RequireAuth>} />
            <Route path="/ideas/:id/edit" element={<RequireAuth><IdeaEditor /></RequireAuth>} />
            <Route path="/ideas/:id/similar" element={<RequireAuth><SimilarIdeas /></RequireAuth>} />
          </>
        )}
        {/* Catch-all → home */}
        <Route path="*"                    element={<Home />} />
      </Routes>
      {!hideChrome && <SimCivicsBottom />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppInner />
      </AuthProvider>
    </BrowserRouter>
  );
}