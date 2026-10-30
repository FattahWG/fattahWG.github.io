import { useEffect } from 'react';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { Backdrop } from '@/components/Backdrop';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/showcase';
import { LangProvider } from '@/lib/i18n';
import Home from '@/pages/Home';
import Lab from '@/pages/Lab';
import NotFound from '@/pages/NotFound';
import ProjectDetail from '@/pages/ProjectDetail';
import RunView from '@/pages/RunView';

// Old page URLs from the earlier site. Each one opens the home page at its section.
export const SECTION_ROUTES: Record<string, string> = {
  '/about': 'about',
  '/experience': 'experience',
  '/projects': 'projects',
  '/contact': 'contact',
};

/** Scroll to the top on a new page, or to the section in the hash or in an old page URL. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const id = hash ? hash.slice(1) : SECTION_ROUTES[pathname.replace(/\/$/, '')];
    if (!id) {
      window.scrollTo(0, 0);
      return;
    }
    const frame = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: hash ? 'smooth' : 'auto' }));
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
  return null;
}

function Layout() {
  return (
    <>
      <a href="#main" className="sr-only z-[60] rounded-full bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <ScrollManager />
      <Backdrop />
      <Navbar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

/** The router comes from main.tsx (browser) or entry-server.tsx (prerender). */
export default function App() {
  return (
    <LangProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          {Object.keys(SECTION_ROUTES).map((path) => (
            <Route key={path} path={path.slice(1)} element={<Home />} />
          ))}
          <Route path="projects/:slug" element={<ProjectDetail />} />
          <Route path="lab" element={<Lab />} />
          <Route path="lab/run" element={<RunView />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </LangProvider>
  );
}
