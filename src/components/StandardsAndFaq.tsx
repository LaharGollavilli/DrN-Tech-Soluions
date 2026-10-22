import React, { useState } from 'react';
import { CLIENT_TESTIMONIALS, FAQ_ITEMS } from '../data/bimData';
import { 
  ChevronDown, 
  ChevronUp, 
  Quote, 
  HelpCircle,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Cpu
} from 'lucide-react';

export const StandardsAndFaq: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode = false }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="standards-faq" className="w-full space-y-8 sm:space-y-10">
      {/* 1. Client Project Testimonials - 100% Aligned Dividers */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className={`text-xs font-mono uppercase tracking-widest font-semibold ${
            isDarkMode ? 'text-cyan-400' : 'text-sky-600'
          }`}>
            PROJECT COLLABORATION
          </span>
          <h3 className={`text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Feedback from Architects & Engineers
          </h3>
          <p className={`mt-2 text-xs sm:text-sm ${
            isDarkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Precision building planning, 3D visualization, BIM modeling, and AutoCAD drafting delivered for AEC leaders.
          </p>
        </div>

        {/* 3 Testimonial Cards with Uniform Line Alignment */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CLIENT_TESTIMONIALS.map((test, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border flex flex-col justify-between shadow-xs transition-all h-full ${
                isDarkMode
                  ? 'bg-slate-900/80 border-slate-800/80 text-slate-300'
                  : 'bg-white border-slate-200/90 text-slate-700 hover:shadow-md'
              }`}
            >
              {/* Top Quote Container with Fixed Min-Height for Pixel-Perfect Divider Alignment */}
              <div className="flex-1 flex flex-col justify-start">
                <Quote className={`w-7 h-7 mb-3 flex-shrink-0 ${isDarkMode ? 'text-cyan-500/50' : 'text-sky-400/70'}`} />
                <div className="min-h-[110px] sm:min-h-[120px] flex items-start">
                  <p className="text-xs sm:text-sm italic leading-relaxed">
                    "{test.quote}"
                  </p>
                </div>
              </div>

              {/* Bottom Author Section - Divider sits at exact same horizontal line */}
              <div className={`mt-6 pt-4 border-t min-h-[110px] flex flex-col justify-between ${
                isDarkMode ? 'border-slate-800' : 'border-slate-100'
              }`}>
                <div>
                  <div className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {test.author}
                  </div>
                  <div className={`text-[11px] font-mono font-semibold ${isDarkMode ? 'text-cyan-400' : 'text-sky-600'}`}>
                    {test.role}
                  </div>
                  <div className={`text-[11px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {test.company}
                  </div>
                </div>
                <div className="mt-2.5">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded inline-block border ${
                    isDarkMode ? 'bg-slate-950 text-slate-400 border-slate-800' : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}>
                    {test.project}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Technical AEC FAQs - Curiosity-Sparking & Engineering-Grade */}
      <div className={`p-6 sm:p-10 rounded-3xl border ${
        isDarkMode
          ? 'bg-slate-900/60 border-slate-800'
          : 'bg-white border-slate-200/90 shadow-xs'
      }`}>
        <div className="max-w-3xl mx-auto text-center mb-8">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full font-mono text-xs font-semibold ${
            isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700 border border-slate-200'
          }`}>
            <Cpu className={`w-3.5 h-3.5 ${isDarkMode ? 'text-cyan-400' : 'text-sky-600'}`} /> TECHNICAL AEC SPECIFICATIONS & WORKFLOWS
          </div>
          <h3 className={`text-2xl sm:text-3xl font-extrabold tracking-tight mt-2 ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Technical Inquiries & Engineering Workflows
          </h3>
          <p className={`mt-2 text-xs sm:text-sm leading-relaxed ${
            isDarkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Explore our Revit coordinates discipline, OmniClass parameters, Navisworks clash hierarchies, and Bar Bending Schedule (BBS) extractions.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-xl border overflow-hidden transition-colors ${
                  isDarkMode
                    ? 'border-slate-800 bg-slate-950/70'
                    : 'border-slate-200 bg-slate-50/60'
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className={`w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 cursor-pointer transition-colors ${
                    isDarkMode ? 'hover:bg-slate-900/50' : 'hover:bg-slate-100/70'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span className={`text-xs font-mono font-bold mt-0.5 px-1.5 py-0.2 rounded border ${
                      isDarkMode ? 'bg-slate-900 border-slate-700 text-cyan-400' : 'bg-white border-slate-200 text-sky-700'
                    }`}>
                      Q{idx + 1}
                    </span>
                    <span className={`text-sm font-bold leading-snug ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {item.question}
                    </span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isDarkMode ? 'text-cyan-400' : 'text-sky-600'}`} />
                  ) : (
                    <ChevronDown className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
                  )}
                </button>

                {isOpen && (
                  <div className={`px-5 pb-5 text-xs sm:text-sm leading-relaxed border-t animate-in fade-in duration-200 ${
                    isDarkMode ? 'text-slate-300 border-slate-800' : 'text-slate-600 border-slate-200 bg-white'
                  }`}>
                    <p className="mt-3 pl-7">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
