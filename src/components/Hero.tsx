import React from 'react';
import { 
  ArrowRight, 
  Layers, 
  ShieldCheck, 
  FileCheck2, 
  CheckCircle2, 
  Compass,
  Briefcase
} from 'lucide-react';

interface HeroProps {
  isDarkMode?: boolean;
  onOpenCareers?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ isDarkMode = false, onOpenCareers }) => {
  return (
    <section className="relative overflow-hidden w-full max-w-full pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-20">
      {/* Background Blueprint Grid Patterns */}
      <div className={`absolute inset-0 pointer-events-none ${
        isDarkMode ? 'bg-blueprint-grid opacity-35' : 'bg-blueprint-grid-light opacity-60'
      }`} />
      
      {/* Contained Glow */}
      <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] lg:w-[650px] h-[300px] sm:h-[400px] rounded-full blur-[100px] sm:blur-[140px] pointer-events-none ${
        isDarkMode ? 'bg-cyan-500/10' : 'bg-sky-100/70'
      }`} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Top Capability Pill (Responsive width and cleanly wrapped) */}
          <div className={`inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border backdrop-blur-md shadow-xs mb-6 max-w-full ${
            isDarkMode 
              ? 'bg-slate-900/95 border-cyan-500/40 text-cyan-300' 
              : 'bg-white border-slate-200 text-slate-800'
          }`}>
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse flex-shrink-0" />
            <span className={`text-[10.5px] sm:text-xs font-mono font-bold tracking-wide uppercase text-center leading-tight ${
              isDarkMode ? 'text-cyan-300' : 'text-sky-800'
            }`}>
              BIM MODELING • SCAN-TO-BIM • CAD-TO-BIM • AUTOCAD WORKS
            </span>
          </div>

          {/* Main Headline */}
          <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Virtual Design, Scan-to-BIM &{' '}
            <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 bg-clip-text text-transparent">
              BIM Architecture & Structure
            </span>{' '}
            Modeling.
          </h1>

          {/* Subheadline */}
          <p className={`mt-5 sm:mt-6 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            We deliver high-precision Autodesk Revit BIM modeling (LOD 100–400), Scan-to-BIM point cloud processing, CAD-to-BIM conversions, building planning, and complete AutoCAD 2D & 3D drafting works for architects, civil engineers, and contractors.
          </p>

          {/* Clean Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto flex-wrap">
            <a
              href="#services"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm transition-all shadow-md shadow-sky-600/20 flex items-center justify-center gap-2 cursor-pointer hover:scale-102"
            >
              <Layers className="w-4 h-4 text-white" />
              <span>Explore Services & Works</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </a>

            <a
              href="#bim-training"
              className={`w-full sm:w-auto px-5 py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 border shadow-xs cursor-pointer hover:scale-102 ${
                isDarkMode 
                  ? 'bg-amber-950/40 hover:bg-amber-900/50 text-amber-300 border-amber-500/40' 
                  : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Revit & BIM Training</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-600 text-white font-bold">
                ADMISSIONS OPEN
              </span>
            </a>

            <button
              onClick={onOpenCareers}
              className={`w-full sm:w-auto px-5 py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 border shadow-xs cursor-pointer ${
                isDarkMode 
                  ? 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700' 
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 hover:text-slate-900'
              }`}
            >
              <Briefcase className="w-4 h-4 text-sky-600" />
              <span>Careers (Hiring!)</span>
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className={`mt-10 pt-6 border-t flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-mono ${
            isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'
          }`}>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0" />
              <span>Autodesk Revit & AutoCAD Workflows</span>
            </div>
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-sky-600 flex-shrink-0" />
              <span>LOD 100 to LOD 400 Precision</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-sky-600 flex-shrink-0" />
              <span>100% Practical Training & Live Projects</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-sky-600 flex-shrink-0" />
              <span>100% Strict Confidentiality & NDA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
