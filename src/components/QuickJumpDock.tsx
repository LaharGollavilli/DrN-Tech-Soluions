import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  Box, 
  Sliders, 
  GraduationCap, 
  Calculator, 
  HelpCircle, 
  ChevronUp, 
  Compass, 
  X,
  Briefcase
} from 'lucide-react';

interface QuickJumpDockProps {
  isDarkMode: boolean;
  onNavigateCareers?: () => void;
}

export const QuickJumpDock: React.FC<QuickJumpDockProps> = ({ 
  isDarkMode, 
  onNavigateCareers 
}) => {
  const [activeSection, setActiveSection] = useState<string>('services');
  const [isVisible, setIsVisible] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Monitor scroll position to show dock after scrolling past hero and update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Show dock after scrolling down 350px
      if (scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Check current visible section
      const sections = ['services', 'portfolio', 'software-stack', 'bim-training', 'lod-spectrum', 'quote-estimator', 'standards-faq'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Element is in upper-mid viewport
          if (rect.top <= 260 && rect.bottom >= 150) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90; // offset for sticky navbar
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <aside 
      aria-label="Quick Page Navigation Dock"
      className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[95vw] transition-all duration-300 pointer-events-auto"
    >
      {isCollapsed ? (
        <button
          onClick={() => setIsCollapsed(false)}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full border shadow-2xl backdrop-blur-xl text-xs font-mono font-bold transition-transform hover:scale-105 cursor-pointer ${
            isDarkMode 
              ? 'bg-slate-900/95 border-cyan-500/40 text-cyan-300 shadow-cyan-950/60' 
              : 'bg-white/95 border-slate-300 text-slate-800 shadow-slate-400/30'
          }`}
          title="Open Quick Navigation Dock"
        >
          <Compass className="w-4 h-4 text-sky-500 animate-spin-slow" />
          <span>Quick Jump</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        </button>
      ) : (
        <div className={`flex items-center p-1.5 sm:p-2 rounded-2xl border shadow-2xl backdrop-blur-xl transition-all ${
          isDarkMode 
            ? 'bg-[#090e1a]/95 border-cyan-500/30 text-slate-200 shadow-cyan-950/70' 
            : 'bg-white/95 border-slate-200 text-slate-700 shadow-slate-900/15'
        }`}>
          {/* Quick Jump Links */}
          <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto scrollbar-none px-1">
            {/* Services */}
            <button
              onClick={() => scrollTo('services')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                activeSection === 'services'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : isDarkMode ? 'hover:bg-slate-800/80 hover:text-white' : 'hover:bg-slate-100 hover:text-slate-950'
              }`}
              title="Jump to Services Matrix"
            >
              <Layers className="w-3.5 h-3.5 shrink-0" />
              <span>Services</span>
            </button>

            {/* Portfolio */}
            <button
              onClick={() => scrollTo('portfolio')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                activeSection === 'portfolio'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : isDarkMode ? 'hover:bg-slate-800/80 hover:text-white' : 'hover:bg-slate-100 hover:text-slate-950'
              }`}
              title="Jump to Project Portfolio"
            >
              <Box className="w-3.5 h-3.5 shrink-0" />
              <span>Portfolio</span>
            </button>

            {/* BIM Training Academy */}
            <button
              onClick={() => scrollTo('bim-training')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                activeSection === 'bim-training'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : isDarkMode ? 'hover:bg-slate-800/80 text-amber-300' : 'hover:bg-amber-50 text-amber-800'
              }`}
              title="Jump to Revit & BIM Training"
            >
              <GraduationCap className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">BIM</span>
              <span>Training</span>
            </button>

            {/* LOD Spectrum */}
            <button
              onClick={() => scrollTo('lod-spectrum')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap hidden md:flex ${
                activeSection === 'lod-spectrum'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : isDarkMode ? 'hover:bg-slate-800/80 hover:text-white' : 'hover:bg-slate-100 hover:text-slate-950'
              }`}
              title="Jump to LOD Guide"
            >
              <Sliders className="w-3.5 h-3.5 shrink-0" />
              <span>LOD Guide</span>
            </button>

            {/* Quote Estimator */}
            <button
              onClick={() => scrollTo('quote-estimator')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                activeSection === 'quote-estimator'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : isDarkMode ? 'bg-cyan-950/40 text-cyan-300 hover:bg-cyan-900/50' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
              }`}
              title="Jump to Project Quote Estimator"
            >
              <Calculator className="w-3.5 h-3.5 shrink-0 text-emerald-500 dark:text-cyan-400" />
              <span>Get Quote</span>
            </button>

            {/* FAQ */}
            <button
              onClick={() => scrollTo('standards-faq')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap hidden lg:flex ${
                activeSection === 'standards-faq'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : isDarkMode ? 'hover:bg-slate-800/80 hover:text-white' : 'hover:bg-slate-100 hover:text-slate-950'
              }`}
              title="Jump to FAQ"
            >
              <HelpCircle className="w-3.5 h-3.5 shrink-0" />
              <span>FAQ</span>
            </button>

            {/* Divider */}
            <div className={`h-4 w-px mx-0.5 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`}></div>

            {/* Scroll to Top */}
            <button
              onClick={scrollToTop}
              className={`p-1.5 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center ${
                isDarkMode ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'
              }`}
              title="Back to Top of Page"
            >
              <ChevronUp className="w-4 h-4" />
            </button>

            {/* Minimize */}
            <button
              onClick={() => setIsCollapsed(true)}
              className={`p-1.5 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center ${
                isDarkMode ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'
              }`}
              title="Minimize Navigation Dock"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};
