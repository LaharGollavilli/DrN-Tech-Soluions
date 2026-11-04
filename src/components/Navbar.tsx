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
      <div className="w-full max-w-7xl 2xl:max-w-[1720px] mx-auto px-3 sm:px-4 md:px-6 lg:px-6 xl:px-8 h-18 sm:h-20 flex items-center justify-between gap-2">
        {/* Brand Logo & Corporate Identity */}
        <button 
          onClick={() => {
            onNavigateView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 sm:gap-2.5 group cursor-pointer text-left shrink min-w-0"
        >
          <div className={`relative p-1 sm:p-1.5 rounded-xl border transition-all duration-300 shadow-xs shrink-0 ${
            isDarkMode 
              ? 'bg-slate-900 border-cyan-500/30' 
              : 'bg-white border-slate-200 hover:border-sky-300'
          }`}>
            <img
              src={isDarkMode ? '/assets/aistudio/dtech_logo_dark.png' : '/assets/aistudio/dtech_logo_light.png'}
              alt="Dharani Tech Solutions"
              className="h-8 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 flex-nowrap">
              <span className={`text-xs sm:text-sm md:text-base 2xl:text-lg font-black tracking-tight uppercase transition-colors truncate ${
                isDarkMode ? 'text-white group-hover:text-cyan-400' : 'text-slate-900 group-hover:text-sky-600'
              }`}>
                DHARANI TECH SOLUTIONS
              </span>
              <span className={`text-[8px] sm:text-[8.5px] font-mono px-1 py-0.5 rounded font-extrabold uppercase shrink-0 ${
                isDarkMode 
                  ? 'bg-cyan-950/90 text-cyan-300 border border-cyan-500/40' 
                  : 'bg-sky-50 text-sky-700 border border-sky-200'
              }`}>
                ENG
              </span>
            </div>
            {/* Desktop Full Tagline on 2xl screens */}
            <span className={`hidden 2xl:block text-[9.5px] font-mono tracking-wider uppercase -mt-0.5 transition-colors whitespace-nowrap ${
              isDarkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>
              BIM MODELING • SCAN-TO-BIM • SCAN-TO-CAD • CAD-TO-BIM • AUTOCAD WORKS
            </span>
            {/* Compact Subtitle on md to xl screens */}
            <span className={`hidden md:block 2xl:hidden text-[9px] font-mono tracking-wider uppercase -mt-0.5 transition-colors whitespace-nowrap ${
              isDarkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>
              BIM & CAD CONSULTANCY • VIZAG
            </span>
            {/* Mobile Compact Subtitle */}
            <span className={`block md:hidden text-[8.5px] font-mono tracking-wide uppercase transition-colors truncate ${
              isDarkMode ? 'text-cyan-400' : 'text-sky-600'
            }`}>
              BIM & CAD CONSULTANCY
            </span>
          </div>
        </button>

        {/* Desktop Nav Links - Streamlined to fit comfortably at 100% zoom without overflow */}
        <nav className="hidden xl:flex items-center gap-0.5 2xl:gap-1.5 shrink-0">
          <button
            onClick={() => handleNavClick('#services')}
            className={`h-8.5 px-2.5 rounded-lg text-xs font-semibold flex items-center transition-colors cursor-pointer whitespace-nowrap ${
              activeView === 'home'
                ? isDarkMode ? 'text-slate-200 hover:text-cyan-400 hover:bg-slate-800/50' : 'text-slate-700 hover:text-sky-600 hover:bg-slate-100/70'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Services
          </button>

          <button
            onClick={() => handleNavClick('#portfolio')}
            className={`h-8.5 px-2.5 rounded-lg text-xs font-semibold flex items-center transition-colors cursor-pointer whitespace-nowrap ${
              activeView === 'home'
                ? isDarkMode ? 'text-slate-200 hover:text-cyan-400 hover:bg-slate-800/50' : 'text-slate-700 hover:text-sky-600 hover:bg-slate-100/70'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Portfolio
          </button>

          {/* BIM Training Academy Link with compact pulse dot */}
          <button
            onClick={() => handleNavClick('#bim-training')}
            className={`h-8.5 px-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border shrink-0 ${
              isDarkMode
                ? 'bg-amber-950/30 border-amber-500/40 text-amber-300 hover:border-amber-400'
                : 'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100'
            }`}
          >
            <span className="whitespace-nowrap">BIM Training</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
            <span className="hidden 2xl:inline text-[8.5px] font-mono font-bold bg-emerald-600 text-white px-1 py-0.5 rounded leading-none shrink-0">
              OPEN
            </span>
          </button>

          <button
            onClick={() => handleNavClick('#software-stack')}
            className={`h-8.5 px-2 rounded-lg text-xs font-semibold flex items-center transition-colors cursor-pointer whitespace-nowrap ${
              activeView === 'home'
                ? isDarkMode ? 'text-slate-200 hover:text-cyan-400 hover:bg-slate-800/50' : 'text-slate-700 hover:text-sky-600 hover:bg-slate-100/70'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Softwares
          </button>

          <button
            onClick={() => handleNavClick('#lod-spectrum')}
            className={`h-8.5 px-2 rounded-lg text-xs font-semibold flex items-center transition-colors cursor-pointer whitespace-nowrap ${
              activeView === 'home'
                ? isDarkMode ? 'text-slate-200 hover:text-cyan-400 hover:bg-slate-800/50' : 'text-slate-700 hover:text-sky-600 hover:bg-slate-100/70'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            LOD Guide
          </button>

          <button
            onClick={() => handleNavClick('#standards-faq')}
            className={`h-8.5 px-2 rounded-lg text-xs font-semibold flex items-center transition-colors cursor-pointer whitespace-nowrap ${
              activeView === 'home'
                ? isDarkMode ? 'text-slate-200 hover:text-cyan-400 hover:bg-slate-800/50' : 'text-slate-700 hover:text-sky-600 hover:bg-slate-100/70'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            FAQ
          </button>

          {/* Dedicated Careers Tab with Active Hiring Tag */}
          <button
            onClick={() => handleNavClick('#careers')}
            className={`h-8.5 px-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border shrink-0 ${
              activeView === 'careers'
                ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                : isDarkMode
                ? 'bg-slate-900 border-slate-700 text-cyan-300 hover:border-cyan-400'
                : 'bg-sky-50 border-sky-200 text-sky-800 hover:bg-sky-100'
            }`}
          >
            <Briefcase className="w-3 h-3 shrink-0" />
            <span className="whitespace-nowrap">Careers</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
            <span className="hidden 2xl:inline text-[8.5px] font-mono font-bold bg-amber-400 text-slate-950 px-1 py-0.5 rounded leading-none shrink-0">
              HIRING
            </span>
          </button>
        </nav>

        {/* Right Action Container: Theme Toggle & Request Proposal CTA - Fully Inside Viewport at 100% Zoom */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Single Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className={`h-8.5 w-8.5 sm:h-9 sm:w-9 rounded-xl border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
              isDarkMode 
                ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700' 
                : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-sky-600" />}
          </button>

          {/* Request Proposal CTA Button - Precision Sized to Never Overflow */}
          <button
            onClick={() => handleNavClick('#quote-estimator')}
            className="inline-flex h-8.5 sm:h-9 px-3 sm:px-3.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-[11px] sm:text-xs font-bold transition-all shadow-xs shadow-sky-600/20 items-center justify-center gap-1 cursor-pointer shrink-0 hover:scale-102"
          >
            <span className="hidden sm:inline whitespace-nowrap">Request Proposal</span>
            <span className="sm:hidden whitespace-nowrap">Quote</span>
            <ArrowRight className="w-3 h-3 shrink-0" />
          </button>

          {/* Mobile/Tablet Menu Hamburger - Appears below xl screens */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`xl:hidden h-8.5 w-8.5 sm:h-9 sm:w-9 rounded-xl border flex items-center justify-center cursor-pointer transition-colors shrink-0 ${
              isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className={`xl:hidden border-b px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200 ${
          isDarkMode ? 'border-slate-800 bg-[#0b0f19]' : 'border-slate-200 bg-white'
        }`}>
          <button
            onClick={() => handleNavClick('#services')}
            className="block w-full text-left py-2 text-sm font-semibold"
          >
            Services & Works
          </button>
          <button
            onClick={() => handleNavClick('#portfolio')}
            className="block w-full text-left py-2 text-sm font-semibold text-sky-600 dark:text-cyan-400"
          >
            Portfolio (LOD 100–400 Projects)
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
