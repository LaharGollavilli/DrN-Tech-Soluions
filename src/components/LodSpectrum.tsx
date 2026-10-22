import React, { useState } from 'react';
import { LodLevel } from '../types/bim';
import { 
  Box, 
  Layers, 
  CheckCircle2, 
  FileText, 
  Sparkles, 
  ArrowRight,
  HelpCircle,
  Building2,
  Compass
} from 'lucide-react';

interface LodSpectrumProps {
  isDarkMode?: boolean;
}

interface SimpleLodItem {
  level: LodLevel;
  name: string;
  badge?: string;
  oneLiner: string;
  bestFor: string;
  deliverables: string[];
  visualIcon: React.ElementType;
  popular?: boolean;
}

const SIMPLE_LOD_ITEMS: SimpleLodItem[] = [
  {
    level: 'LOD 100',
    name: 'Concept & Massing',
    oneLiner: 'Basic 3D building shape, height, and overall volume.',
    bestFor: 'Site feasibility, zoning permits & initial client concept presentation.',
    deliverables: ['3D massing model', 'Gross floor area calculation', 'Site layout outline'],
    visualIcon: Box
  },
  {
    level: 'LOD 200',
    name: 'Schematic Layout',
    oneLiner: 'Approximate walls, floors, and preliminary room arrangements.',
    bestFor: 'Spatial planning, preliminary budgeting & client review sessions.',
    deliverables: ['Generic 3D floor slabs and walls', 'Basic door & window openings', 'Preliminary spatial plans'],
    visualIcon: Compass
  },
  {
    level: 'LOD 300',
    name: 'Detailed Design & Permits',
    badge: 'MOST POPULAR',
    popular: true,
    oneLiner: 'Exact dimensions, true wall assemblies, and permit-ready drawing sheets.',
    bestFor: 'Municipal sanctions, working drawings, construction approval & contractor bidding.',
    deliverables: ['Parametric Revit (.RVT) model', 'Permit-ready 2D drawing sheets', 'Accurate material schedules'],
    visualIcon: CheckCircle2
  },
  {
    level: 'LOD 350',
    name: 'Coordinated Construction',
    badge: 'FOR SITE EXECUTION',
    oneLiner: 'Multi-discipline coordination with clash-checked beam, column & service interfaces.',
    bestFor: 'On-site execution, avoiding costly rework, and cross-trade clash resolution.',
    deliverables: ['Clash-free federated models', 'Slab penetration details', 'Connection & hanger interfaces'],
    visualIcon: Layers
  },
  {
    level: 'LOD 400',
    name: 'Fabrication & Shop Level',
    oneLiner: 'Manufacturing-level detailing including rebar bending schedules & steel assemblies.',
    bestFor: 'Fabricators, precast manufacturers, and bar bending site teams.',
    deliverables: ['Rebar bending schedules (.XLSX)', 'Structural steel shop drawings', 'Direct fabrication cut-sheets'],
    visualIcon: FileText
  }
];

export const LodSpectrum: React.FC<LodSpectrumProps> = ({ isDarkMode = false }) => {
  const [activeLevel, setActiveLevel] = useState<LodLevel>('LOD 300');
  const activeItem = SIMPLE_LOD_ITEMS.find((item) => item.level === activeLevel) || SIMPLE_LOD_ITEMS[2];
  const IconComponent = activeItem.visualIcon;

  return (
    <div className="w-full space-y-6">
      {/* Friendly Level Selection Pills */}
      <div className={`p-1.5 rounded-2xl border flex flex-wrap sm:flex-nowrap gap-1.5 ${
        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
      }`}>
        {SIMPLE_LOD_ITEMS.map((item) => {
          const isSelected = item.level === activeLevel;
          return (
            <button
              key={item.level}
              onClick={() => setActiveLevel(item.level)}
              className={`flex-1 min-w-[120px] py-3 px-3 rounded-xl text-center transition-all cursor-pointer relative ${
                isSelected
                  ? isDarkMode
                    ? 'bg-sky-600 text-white font-bold shadow-md'
                    : 'bg-white text-slate-950 font-bold shadow-sm border border-slate-200'
                  : isDarkMode
                  ? 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-white/60'
              }`}
            >
              <div className="flex items-center justify-center gap-1.5">
                <span className="text-xs font-mono">{item.level}</span>
                {item.popular && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase tracking-wider ${
                    isSelected ? 'bg-amber-400 text-slate-950' : 'bg-amber-100 text-amber-800'
                  }`}>
                    Popular
                  </span>
                )}
              </div>
              <div className="text-[11px] truncate mt-0.5">
                {item.name.split('&')[0]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Simple, Clean Detail Card */}
      <div className={`p-6 sm:p-8 rounded-2xl border transition-all ${
        isDarkMode 
          ? 'bg-slate-900/90 border-slate-800 text-white' 
          : 'bg-white border-slate-200 text-slate-900 shadow-xs'
      }`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Details */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                isDarkMode 
                  ? 'bg-sky-950 border-sky-500/40 text-sky-300' 
                  : 'bg-sky-50 border-sky-200 text-sky-700'
              }`}>
                {activeItem.level}
              </span>

              {activeItem.badge && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                  {activeItem.badge}
                </span>
              )}

              <span className={`text-xs font-mono ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Level of Development Guide
              </span>
            </div>

            <div>
              <h3 className={`text-2xl font-extrabold tracking-tight ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                {activeItem.name}
              </h3>
              <p className={`mt-2 text-sm sm:text-base leading-relaxed ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {activeItem.oneLiner}
              </p>
            </div>

            {/* When to choose this level */}
            <div className={`p-4 rounded-xl border ${
              isDarkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className={`text-xs font-mono uppercase font-bold block mb-1 ${
                isDarkMode ? 'text-sky-400' : 'text-sky-700'
              }`}>
                When should you choose {activeItem.level}?
              </span>
              <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                {activeItem.bestFor}
              </p>
            </div>

            {/* Deliverables */}
            <div>
              <span className={`text-xs font-mono uppercase tracking-wider block mb-2 font-semibold ${
                isDarkMode ? 'text-slate-400' : 'text-slate-500'
              }`}>
                What you receive at this level:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {activeItem.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border flex items-center gap-2 text-xs font-medium ${
                      isDarkMode 
                        ? 'bg-slate-950/50 border-slate-800 text-slate-300' 
                        : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Visual Box: Clean & Simple Graphic Card */}
          <div className="lg:col-span-4">
            <div className={`p-6 rounded-2xl border text-center flex flex-col items-center justify-between gap-4 ${
              isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border shadow-xs ${
                isDarkMode ? 'bg-slate-900 border-sky-500/30 text-sky-400' : 'bg-white border-slate-200 text-sky-600'
              }`}>
                <IconComponent className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono text-slate-500 block">SELECTED FIDELITY</span>
                <span className={`text-xl font-bold font-mono ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {activeItem.level}
                </span>
                <p className="text-xs text-slate-500 mt-1 max-w-[200px] mx-auto">
                  {activeItem.name}
                </p>
              </div>

              <div className={`w-full pt-3 border-t text-xs ${
                isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'
              }`}>
                {activeLevel === 'LOD 300' || activeLevel === 'LOD 350' ? (
                  <span className="text-emerald-600 font-semibold block">
                    ✓ Recommended for municipal sanctions & construction
                  </span>
                ) : (
                  <span>Standard architectural milestone specification</span>
                )}
              </div>

              <a
                href="#quote-estimator"
                className="w-full py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold text-center transition-all shadow-xs flex items-center justify-center gap-1.5"
              >
                <span>Select in Estimator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Quick 1-Minute LOD Cheat Sheet for Clients */}
      <div className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs ${
        isDarkMode ? 'bg-slate-900/50 border-slate-800 text-slate-300' : 'bg-sky-50/60 border-sky-100 text-slate-700'
      }`}>
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-sky-600 flex-shrink-0" />
          <span>
            <strong>Simple rule of thumb:</strong> If you need municipal approval or building plans, choose <strong>LOD 300</strong>. If you want cross-trade clash coordination, choose <strong>LOD 350</strong>.
          </span>
        </div>
        <a href="#quote-estimator" className="text-sky-600 font-bold hover:underline whitespace-nowrap">
          Ask our engineers &rarr;
        </a>
      </div>
    </div>
  );
};
