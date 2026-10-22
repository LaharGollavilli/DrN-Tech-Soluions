import React, { useState } from 'react';
import { BIM_SERVICES } from '../data/bimData';
import { Discipline, ServiceDetail } from '../types/bim';
import { 
  Building2, 
  Layers, 
  Cpu, 
  ShieldAlert, 
  FileCode2, 
  BarChart3, 
  ArrowRight, 
  CheckCircle2, 
  X, 
  FileCheck, 
  Laptop2,
  Workflow,
  Compass,
  FileText
} from 'lucide-react';

const ICONS: Record<string, React.ElementType> = {
  Building2,
  Layers,
  Cpu,
  ShieldAlert,
  FileCode2,
  BarChart3,
  Compass,
  FileText
};

interface ServicesMatrixProps {
  onSelectServiceForQuote?: (disciplineId: Discipline) => void;
  isDarkMode?: boolean;
}

export const ServicesMatrix: React.FC<ServicesMatrixProps> = ({ 
  onSelectServiceForQuote,
  isDarkMode = false 
}) => {
  const [activeTab, setActiveTab] = useState<Discipline | 'all'>('all');
  const [inspectedService, setInspectedService] = useState<ServiceDetail | null>(null);

  const filteredServices = activeTab === 'all' 
    ? BIM_SERVICES 
    : BIM_SERVICES.filter((s) => s.id === activeTab);

  return (
    <div className="w-full">
      {/* Discipline Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
            activeTab === 'all'
              ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
              : isDarkMode 
                ? 'bg-slate-900 text-slate-400 hover:text-white border-slate-800' 
                : 'bg-white text-slate-700 hover:text-slate-950 border-slate-200 hover:bg-slate-50 shadow-xs'
          }`}
        >
          All Disciplines (6)
        </button>

        {BIM_SERVICES.map((srv) => {
          const Icon = ICONS[srv.iconName] || Building2;
          const isActive = activeTab === srv.id;
          return (
            <button
              key={srv.id}
              onClick={() => setActiveTab(srv.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer border ${
                isActive
                  ? 'bg-sky-600 text-white border-sky-600 shadow-xs font-semibold'
                  : isDarkMode 
                    ? 'bg-slate-900 text-slate-400 hover:text-white border-slate-800' 
                    : 'bg-white text-slate-700 hover:text-slate-950 border-slate-200 hover:bg-slate-50 shadow-xs'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : isDarkMode ? 'text-cyan-400' : 'text-sky-600'}`} />
              <span>{srv.title}</span>
            </button>
          );
        })}
      </div>

      {/* Services Grid Cards */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => {
          const Icon = ICONS[service.iconName] || Building2;
          return (
            <div
              key={service.id}
              className={`group relative p-6 rounded-2xl border transition-all duration-300 shadow-xs flex flex-col justify-between hover:-translate-y-0.5 hover:shadow-md ${
                isDarkMode 
                  ? 'bg-gradient-to-b from-slate-900/90 to-[#0c1220]/90 border-slate-800 hover:border-cyan-500/50' 
                  : 'bg-white border-slate-200 hover:border-sky-300'
              }`}
            >
              <div>
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 border ${
                    isDarkMode 
                      ? 'bg-cyan-950/70 border-cyan-500/30 text-cyan-400' 
                      : 'bg-sky-50 border-sky-100 text-sky-600'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`px-2.5 py-1 rounded-md text-[11px] font-mono border ${
                    isDarkMode 
                      ? 'bg-slate-950 border-slate-700/60 text-cyan-300' 
                      : 'bg-slate-100 border-slate-200 text-slate-700 font-semibold'
                  }`}>
                    {service.lodRange}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className={`text-xl font-bold transition-colors ${
                  isDarkMode 
                    ? 'text-white group-hover:text-cyan-300' 
                    : 'text-slate-900 group-hover:text-sky-600'
                }`}>
                  {service.title}
                </h3>
                <p className={`mt-1 text-xs font-medium font-mono ${
                  isDarkMode ? 'text-slate-400' : 'text-sky-700 font-semibold'
                }`}>
                  {service.tagline}
                </p>

                {/* Description */}
                <p className={`mt-3 text-sm leading-relaxed line-clamp-3 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {service.shortDescription}
                </p>

                {/* Key Deliverables Bullet Preview */}
                <div className={`mt-4 pt-4 border-t space-y-1.5 ${
                  isDarkMode ? 'border-slate-800/80' : 'border-slate-100'
                }`}>
                  <span className={`text-[10px] font-mono uppercase tracking-wider ${
                    isDarkMode ? 'text-slate-500' : 'text-slate-600'
                  }`}>
                    Core Deliverables:
                  </span>
                  {service.deliverables.slice(0, 2).map((item, idx) => (
                    <div key={idx} className={`flex items-center gap-2 text-xs ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 ${
                        isDarkMode ? 'text-cyan-400' : 'text-sky-600'
                      }`} />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className={`mt-6 pt-4 border-t flex items-center justify-between ${
                isDarkMode ? 'border-slate-800' : 'border-slate-100'
              }`}>
                <button
                  onClick={() => setInspectedService(service)}
                  className={`text-xs font-semibold flex items-center gap-1 group/btn cursor-pointer ${
                    isDarkMode ? 'text-cyan-400 hover:text-cyan-300' : 'text-sky-600 hover:text-sky-700'
                  }`}
                >
                  <span>View Specifications</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>

                <a
                  href="#quote-estimator"
                  onClick={() => onSelectServiceForQuote?.(service.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isDarkMode 
                      ? 'bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-300' 
                      : 'bg-slate-100 hover:bg-sky-600 hover:text-white text-slate-700'
                  }`}
                >
                  Scope This Trade
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Service Specification Modal */}
      {inspectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className={`relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 md:p-8 shadow-2xl border ${
            isDarkMode 
              ? 'bg-slate-900 border-cyan-500/40 text-white' 
              : 'bg-white border-slate-200 text-slate-900'
          }`}>
            {/* Close Button */}
            <button
              onClick={() => setInspectedService(null)}
              className={`absolute top-5 right-5 p-2 rounded-lg transition-colors cursor-pointer ${
                isDarkMode 
                  ? 'bg-slate-800 text-slate-400 hover:text-white' 
                  : 'bg-slate-100 text-slate-500 hover:text-slate-900'
              }`}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3.5">
              <div className={`p-3 rounded-xl border ${
                isDarkMode 
                  ? 'bg-cyan-950 border-cyan-500/30 text-cyan-400' 
                  : 'bg-sky-50 border-sky-100 text-sky-600'
              }`}>
                {React.createElement(ICONS[inspectedService.iconName] || Building2, { className: 'w-6 h-6' })}
              </div>
              <div>
                <span className={`text-xs font-mono uppercase font-semibold ${
                  isDarkMode ? 'text-cyan-400' : 'text-sky-700'
                }`}>
                  DISCIPLINE BREAKDOWN • {inspectedService.lodRange}
                </span>
                <h3 className={`text-2xl font-bold mt-0.5 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  {inspectedService.title}
                </h3>
              </div>
            </div>

            <p className={`mt-4 text-sm leading-relaxed ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {inspectedService.fullDescription}
            </p>

            {/* Deliverables & Capabilities Columns */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-4 rounded-xl border ${
                isDarkMode ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <h4 className={`text-xs font-mono uppercase font-semibold flex items-center gap-2 pb-2 border-b ${
                  isDarkMode ? 'text-cyan-400 border-slate-800' : 'text-sky-700 border-slate-200'
                }`}>
                  <FileCheck className="w-4 h-4" /> Native Deliverables
                </h4>
                <ul className="mt-3 space-y-2">
                  {inspectedService.deliverables.map((item, idx) => (
                    <li key={idx} className={`flex items-start gap-2 text-xs ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${
                        isDarkMode ? 'text-cyan-400' : 'text-sky-600'
                      }`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`p-4 rounded-xl border ${
                isDarkMode ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <h4 className={`text-xs font-mono uppercase font-semibold flex items-center gap-2 pb-2 border-b ${
                  isDarkMode ? 'text-cyan-400 border-slate-800' : 'text-sky-700 border-slate-200'
                }`}>
                  <Workflow className="w-4 h-4" /> Technical Capabilities
                </h4>
                <ul className="mt-3 space-y-2">
                  {inspectedService.keyCapabilities.map((item, idx) => (
                    <li key={idx} className={`flex items-start gap-2 text-xs ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${
                        isDarkMode ? 'bg-cyan-400' : 'bg-sky-600'
                      }`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Software Stack & Verified Performance */}
            <div className={`mt-6 p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
              isDarkMode ? 'bg-cyan-950/30 border-cyan-500/20' : 'bg-sky-50 border-sky-100'
            }`}>
              <div>
                <span className={`text-[10px] font-mono uppercase ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  Software Environment:
                </span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {inspectedService.softwareStack.map((sw, idx) => (
                    <span key={idx} className={`px-2.5 py-0.5 rounded text-xs font-mono border ${
                      isDarkMode 
                        ? 'bg-slate-900 border-slate-700 text-cyan-300' 
                        : 'bg-white border-slate-200 text-sky-800 shadow-xs'
                    }`}>
                      {sw}
                    </span>
                  ))}
                </div>
              </div>

              <div className={`text-right sm:border-l sm:pl-4 ${
                isDarkMode ? 'sm:border-slate-800' : 'sm:border-slate-200'
              }`}>
                <span className={`text-[10px] font-mono uppercase ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  Engineering Metric:
                </span>
                <p className={`text-xs font-semibold mt-0.5 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  {inspectedService.sampleMetric}
                </p>
              </div>
            </div>

            {/* Modal Bottom CTA */}
            <div className={`mt-6 pt-4 border-t flex items-center justify-end gap-3 ${
              isDarkMode ? 'border-slate-800' : 'border-slate-200'
            }`}>
              <button
                onClick={() => setInspectedService(null)}
                className={`px-4 py-2 rounded-xl text-xs font-medium cursor-pointer ${
                  isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Close
              </button>

              <a
                href="#quote-estimator"
                onClick={() => {
                  onSelectServiceForQuote?.(inspectedService.id);
                  setInspectedService(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all shadow-md shadow-sky-600/20"
              >
                Configure {inspectedService.title} Quote
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
