import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MetricsBar } from './components/MetricsBar';
import { ServicesMatrix } from './components/ServicesMatrix';
import { SoftwareEcosystem } from './components/SoftwareEcosystem';
import { BimTrainingSection } from './components/BimTrainingSection';
import { LodSpectrum } from './components/LodSpectrum';
import { ProjectPortfolio } from './components/ProjectPortfolio';
import { CareersSection } from './components/CareersSection';
import { QuoteEstimator } from './components/QuoteEstimator';
import { StandardsAndFaq } from './components/StandardsAndFaq';
import { QuickJumpDock } from './components/QuickJumpDock';
import { Footer } from './components/Footer';
import { TechnicalAdvisorModal } from './components/TechnicalAdvisorModal';
import { ArchitecturalBackgroundOverlay } from './components/ArchitecturalBackgroundOverlay';
import { Discipline, LodLevel } from './types/bim';
import { Layers, Sliders, Briefcase, ArrowRight, GraduationCap } from 'lucide-react';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeView, setActiveView] = useState<'home' | 'careers'>('home');

  // Handle URL hash on load and hash changes
  useEffect(() => {
    const handleHashCheck = () => {
      if (window.location.hash === '#careers') {
        setActiveView('careers');
      } else if (window.location.hash === '#home' || !window.location.hash) {
        // stay on home
      }
    };

    handleHashCheck();
    window.addEventListener('hashchange', handleHashCheck);
    return () => window.removeEventListener('hashchange', handleHashCheck);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Synchronize 'dark' class on html root element for Tailwind dark: variants
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const navigateToView = (view: 'home' | 'careers') => {
    setActiveView(view);
    if (view === 'careers') {
      window.location.hash = 'careers';
    } else {
      if (window.location.hash === '#careers') {
        history.pushState("", document.title, window.location.pathname + window.location.search);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectServiceForQuote = (_disciplineId?: Discipline) => {
    if (activeView !== 'home') {
      setActiveView('home');
      setTimeout(() => {
        const el = document.getElementById('quote-estimator');
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('quote-estimator');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectProjectForQuote = (_lod?: LodLevel, _discipline?: string) => {
    if (activeView !== 'home') {
      setActiveView('home');
      setTimeout(() => {
        const el = document.getElementById('quote-estimator');
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('quote-estimator');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen w-full max-w-full overflow-x-hidden relative transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-[#0b0f19] text-[#f3f4f6]' 
        : 'bg-[#f8fafc] text-[#0f172a]'
    }`}>
      {/* Background CAD / BIM Blueprint Overlay (Technical Architectural Atmosphere) */}
      <ArchitecturalBackgroundOverlay isDarkMode={isDarkMode} />

      {/* Top Engineering Navbar with Careers Tab Routing */}
      <div className="relative z-30">
        <Navbar 
          isDarkMode={isDarkMode} 
          onToggleTheme={toggleTheme} 
          activeView={activeView}
          onNavigateView={navigateToView}
        />
      </div>

      <main className="w-full max-w-full relative z-10 overflow-x-hidden">
        {activeView === 'careers' ? (
          /* ============================================================
             DEDICATED CAREERS PORTAL VIEW (CURRENT OPENINGS IN VIZAG)
             ============================================================ */
          <div className="animate-in fade-in duration-300 w-full max-w-full overflow-x-hidden">
            <CareersSection 
              isDarkMode={isDarkMode} 
              isStandaloneTab={true}
              onBackToHome={() => navigateToView('home')}
            />
          </div>
        ) : (
          /* ============================================================
             MAIN SERVICES & CLIENT LANDING PAGE VIEW
             ============================================================ */
          <div className="animate-in fade-in duration-300 w-full max-w-full overflow-x-hidden">
            {/* Hero Section */}
            <Hero 
              isDarkMode={isDarkMode} 
              onOpenCareers={() => navigateToView('careers')} 
            />

            {/* Value Proposition / Metrics Bar */}
            <MetricsBar isDarkMode={isDarkMode} />

            {/* SECTION 1: Core Services Matrix */}
            <section id="services" className="pt-2 sm:pt-4 pb-8 sm:pb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-6 sm:mb-8">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-xs font-semibold mb-2 border ${
                  isDarkMode 
                    ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' 
                    : 'bg-sky-50 border-sky-200 text-sky-700'
                }`}>
                  <Layers className="w-3.5 h-3.5" /> CORE DISCIPLINES & CAPABILITIES
                </div>
                <h2 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  Building Planning, 3D Design, BIM & AutoCAD Services
                </h2>
                <p className={`mt-2 text-xs sm:text-sm max-w-2xl leading-relaxed ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  From architectural permit planning to photorealistic 3D visualization, LOD 100–400 Revit BIM modeling, and complete AutoCAD working drawings.
                </p>
              </div>

              <ServicesMatrix isDarkMode={isDarkMode} onSelectServiceForQuote={handleSelectServiceForQuote} />
            </section>

            {/* SECTION: Past Architectural & BIM Project Portfolio (LOD 100–400) */}
            <ProjectPortfolio 
              isDarkMode={isDarkMode} 
              onSelectProjectForQuote={handleSelectProjectForQuote} 
            />

            {/* SECTION 2: Industry-Standard Software Ecosystem */}
            <SoftwareEcosystem isDarkMode={isDarkMode} />

            {/* SECTION 3: Revit & BIM Training Academy (Corporate & Student Programs) */}
            <BimTrainingSection isDarkMode={isDarkMode} />

            {/* SECTION 3: Level of Development (LOD) Spectrum - Simplified & Clean */}
            <section id="lod-spectrum" className="pt-2 sm:pt-4 pb-6 sm:pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-6 sm:mb-8">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-xs font-semibold mb-2 border ${
                  isDarkMode 
                    ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' 
                    : 'bg-sky-50 border-sky-200 text-sky-700'
                }`}>
                  <Sliders className="w-3.5 h-3.5" /> LEVEL OF DEVELOPMENT (LOD) GUIDE
                </div>
                <h2 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  Simple Guide to BIM Modeling Levels
                </h2>
                <p className={`mt-2 text-xs sm:text-sm max-w-2xl leading-relaxed ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Not sure which level of modeling your project needs? Here is a straightforward breakdown of what is delivered at each stage.
                </p>
              </div>

              <LodSpectrum isDarkMode={isDarkMode} />
            </section>

            {/* SECTION 3: Interactive Project Scoping & Quote Estimator */}
            <section className="pt-2 sm:pt-4 pb-8 sm:pb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <QuoteEstimator isDarkMode={isDarkMode} />
            </section>

            {/* SECTION 4: FAQs & Client Feedback */}
            <section className="pt-2 sm:pt-4 pb-12 sm:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <StandardsAndFaq isDarkMode={isDarkMode} />
            </section>
          </div>
        )}
      </main>

      {/* Corporate AEC Footer */}
      <div className="relative z-20">
        <Footer isDarkMode={isDarkMode} />
      </div>

      {/* Floating Quick Jump Dock (Effortless Navigation & Back-to-Top - ONLY on Home view) */}
      {activeView === 'home' && (
        <QuickJumpDock 
          isDarkMode={isDarkMode} 
          onNavigateCareers={() => navigateToView('careers')} 
        />
      )}

      {/* Floating BIM Engineering Assistant Modal - Adapts Dynamically to Theme */}
      <TechnicalAdvisorModal isDarkMode={isDarkMode} />
    </div>
  );
}
