import React from 'react';
import { TRUST_METRICS } from '../data/bimData';
import { ShieldCheck, Layers, Crosshair, Scan } from 'lucide-react';

const METRIC_ICONS = [ShieldCheck, Layers, Crosshair, Scan];

interface MetricsBarProps {
  isDarkMode?: boolean;
}

export const MetricsBar: React.FC<MetricsBarProps> = ({ isDarkMode = false }) => {
  return (
    <section className="relative z-20 -mt-2 mb-6 sm:mb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {TRUST_METRICS.map((metric, idx) => {
          const Icon = METRIC_ICONS[idx];
          return (
            <div
              key={metric.label}
              className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 shadow-xs relative overflow-hidden group hover:shadow-md flex flex-col justify-between ${
                isDarkMode 
                  ? 'bg-gradient-to-b from-slate-900/90 to-[#0c1220]/95 border-slate-800 hover:border-cyan-500/40' 
                  : 'bg-white border-slate-200 hover:border-sky-300'
              }`}
            >
              {/* Top Accent Line on Hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Metric Value & Icon - Strictly Single-Line & Aligned */}
                <div className="flex items-center justify-between gap-2 mb-3 min-h-[44px]">
                  <span className={`text-2xl sm:text-3xl font-black font-mono tracking-tight whitespace-nowrap ${
                    isDarkMode ? 'text-white' : 'text-sky-700'
                  }`}>
                    {metric.value}
                  </span>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                    isDarkMode 
                      ? 'bg-cyan-950/70 border border-cyan-500/30 text-cyan-400' 
                      : 'bg-sky-50 border border-sky-100 text-sky-600'
                  }`}>
                    <Icon className="w-5 h-5 shrink-0" />
                  </div>
                </div>

                {/* Metric Title */}
                <h4 className={`text-sm font-bold tracking-tight min-h-[20px] flex items-center ${
                  isDarkMode ? 'text-slate-200' : 'text-slate-900'
                }`}>
                  {metric.label}
                </h4>

                {/* Subtitle / Description */}
                <p className={`mt-1.5 text-xs leading-relaxed ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {metric.sublabel}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
