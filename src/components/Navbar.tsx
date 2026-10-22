import React, { useState } from 'react';
import { 
  Building2, 
  Layers, 
  Compass, 
  FileText, 
  Sliders, 
  ShieldCheck, 
  Menu, 
  X, 
  Moon, 
  Sun,
  ArrowRight,
  Briefcase
} from 'lucide-react';

interface NavbarProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  activeView: 'home' | 'careers';
  onNavigateView: (view: 'home' | 'careers') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  isDarkMode, 
  onToggleTheme,
  activeView,
  onNavigateView
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href === '#careers') {
      onNavigateView('careers');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (activeView !== 'home') {
        onNavigateView('home');
        setTimeout(() => {
          const el = document.querySelector(href);
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`sticky top-0 z-40 w-full backdrop-blur-xl border-b transition-colors ${
      isDarkMode 
        ? 'bg-[#0b0f19]/90 border-slate-800' 
        : 'bg-white/95 border-slate-200 shadow-xs'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Corporate Identity */}
        <button 
          onClick={() => {
            onNavigateView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 group cursor-pointer text-left mr-6 lg:mr-8 xl:mr-12 shrink-0"
        >
          <div className={`relative p-1 rounded-xl border transition-all duration-300 shadow-sm shrink-0 ${
            isDarkMode 
              ? 'bg-slate-900 border-cyan-500/30' 
              : 'bg-white border-slate-200 hover:border-sky-300'
          }`}>
            <img
              src={isDarkMode ? '/assets/aistudio/dtech_logo_dark.png' : '/assets/aistudio/dtech_logo_light.png'}
              alt="Dharani Tech Solutions"
              className="h-10 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className={`text-sm sm:text-base xl:text-lg font-black tracking-tight uppercase transition-colors ${
                isDarkMode ? 'text-white group-hover:text-cyan-400' : 'text-slate-900 group-hover:text-sky-600'
              }`}>
                DHARANI TECH SOLUTIONS
              </span>
              <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-extrabold uppercase shrink-0 ${
                isDarkMode 
                  ? 'bg-cyan-950/90 text-cyan-300 border border-cyan-500/40' 
                  : 'bg-sky-50 text-sky-700 border border-sky-200'
              }`}>
                ENGINEERING
              </span>
            </div>
            <span className={`text-[9px] sm:text-[10px] font-mono tracking-wider uppercase -mt-0.5 transition-colors whitespace-nowrap ${
              isDarkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>
              PLANNING • 3D DESIGN • BIM ARCH & STR • AUTOCAD
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-3.5 xl:gap-5 shrink-0">
          <button
            onClick={() => handleNavClick('#services')}
            className={`text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              activeView === 'home'
                ? isDarkMode ? 'text-slate-200 hover:text-cyan-400' : 'text-slate-700 hover:text-sky-600'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Services & Works
          </button>

          {/* BIM Training Academy Link with Admissions Open Badge */}
          <button
            onClick={() => handleNavClick('#bim-training')}
            className={`text-xs font-bold transition-all px-2.5 py-1 rounded-xl flex items-center gap-1.5 cursor-pointer border shrink-0 ${
              isDarkMode
                ? 'bg-amber-950/30 border-amber-500/40 text-amber-300 hover:border-amber-400'
                : 'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100'
            }`}
          >
            <span className="whitespace-nowrap">BIM Training</span>
            <span className="text-[9px] font-mono font-bold bg-emerald-600 text-white px-1.5 py-0.5 rounded leading-none shrink-0">
              ADMISSIONS OPEN
            </span>
          </button>

          <button
            onClick={() => handleNavClick('#software-stack')}
            className={`text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              activeView === 'home'
                ? isDarkMode ? 'text-slate-200 hover:text-cyan-400' : 'text-slate-700 hover:text-sky-600'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Softwares
          </button>

          <button
            onClick={() => handleNavClick('#lod-spectrum')}
            className={`text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              activeView === 'home'
                ? isDarkMode ? 'text-slate-200 hover:text-cyan-400' : 'text-slate-700 hover:text-sky-600'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            LOD Guide
          </button>

          <button
            onClick={() => handleNavClick('#quote-estimator')}
            className={`text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              activeView === 'home'
                ? isDarkMode ? 'text-slate-200 hover:text-cyan-400' : 'text-slate-700 hover:text-sky-600'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Estimator
          </button>

          <button
            onClick={() => handleNavClick('#standards-faq')}
            className={`text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap hidden xl:inline-block ${
              activeView === 'home'
                ? isDarkMode ? 'text-slate-200 hover:text-cyan-400' : 'text-slate-700 hover:text-sky-600'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            FAQ
          </button>

          {/* Dedicated Careers Tab with Active Hiring Tag */}
          <button
            onClick={() => handleNavClick('#careers')}
            className={`text-xs font-bold transition-all px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 cursor-pointer border shrink-0 ${
              activeView === 'careers'
                ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                : isDarkMode
                ? 'bg-slate-900 border-slate-700 text-cyan-300 hover:border-cyan-400'
                : 'bg-sky-50 border-sky-200 text-sky-800 hover:bg-sky-100'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">Careers</span>
            <span className="text-[9px] font-mono font-bold bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded leading-none shrink-0">
              HIRING
            </span>
          </button>
        </nav>

        {/* Right Action Container: Single Theme Toggle & Proposal CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Single Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              isDarkMode 
                ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white' 
                : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
            }`}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-600" />}
          </button>

          {/* Proposal CTA Button */}
          <button
            onClick={() => handleNavClick('#quote-estimator')}
            className="hidden sm:inline-flex px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all shadow-sm shadow-sky-600/20 items-center gap-1.5 cursor-pointer hover:scale-102"
          >
            <span>Request Proposal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-xl border cursor-pointer ${
              isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-b px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200 ${
          isDarkMode ? 'border-slate-800 bg-[#0b0f19]' : 'border-slate-200 bg-white'
        }`}>
          <button
            onClick={() => handleNavClick('#services')}
            className="block w-full text-left py-2 text-sm font-semibold"
          >
            Services & Works
          </button>
          <button
            onClick={() => handleNavClick('#bim-training')}
            className="block w-full text-left py-2 text-sm font-bold text-amber-600 dark:text-amber-400 flex items-center justify-between"
          >
            <span>Revit & BIM Training (Vizag)</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-600 text-white font-bold">ADMISSIONS OPEN</span>
          </button>
          <button
            onClick={() => handleNavClick('#software-stack')}
            className="block w-full text-left py-2 text-sm font-semibold"
          >
            Software Ecosystem
          </button>
          <button
            onClick={() => handleNavClick('#lod-spectrum')}
            className="block w-full text-left py-2 text-sm font-semibold"
          >
            LOD Guide
          </button>
          <button
            onClick={() => handleNavClick('#quote-estimator')}
            className="block w-full text-left py-2 text-sm font-semibold"
          >
            Scope Estimator
          </button>
          <button
            onClick={() => handleNavClick('#careers')}
            className="block w-full text-left py-2 text-sm font-bold text-sky-600 flex items-center justify-between"
          >
            <span>Careers in Vizag (Current Openings)</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 font-bold">HIRING</span>
          </button>
          <button
            onClick={() => handleNavClick('#standards-faq')}
            className="block w-full text-left py-2 text-sm font-semibold"
          >
            FAQ
          </button>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('#quote-estimator')}
              className="w-full py-2.5 rounded-xl bg-sky-600 text-white text-xs font-bold text-center"
            >
              Request Project Proposal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
