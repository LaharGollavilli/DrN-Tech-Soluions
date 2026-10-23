import React from 'react';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Lock, 
  Briefcase,
  ArrowUpRight
} from 'lucide-react';

export const Footer: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode = false }) => {
  return (
    <footer className={`w-full pt-16 pb-12 transition-colors border-t ${
      isDarkMode 
        ? 'bg-[#070b14] border-slate-800/80 text-slate-400' 
        : 'bg-slate-50 border-slate-200 text-slate-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b ${
          isDarkMode ? 'border-slate-800' : 'border-slate-200'
        }`}>
          {/* Brand Info & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className={`relative p-1.5 rounded-2xl border shadow-sm ${
                isDarkMode 
                  ? 'bg-slate-900/90 border-cyan-500/30 shadow-cyan-500/10' 
                  : 'bg-white border-slate-200 shadow-slate-200'
              }`}>
                <img
                  src={isDarkMode ? "/assets/aistudio/dtech_logo_dark.png" : "/assets/aistudio/dtech_logo_light.png"}
                  alt="Dharani Tech Solutions"
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className={`text-base font-extrabold tracking-tight ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  DHARANI TECH SOLUTIONS
                </span>
                <span className={`text-[10px] font-mono tracking-wider uppercase -mt-0.5 ${
                  isDarkMode ? 'text-cyan-400' : 'text-sky-600'
                }`}>
                  BIM MODELING • SCAN-TO-BIM • CAD-TO-BIM • AUTOCAD WORKS
                </span>
              </div>
            </div>

            <p className={`text-xs leading-relaxed max-w-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Professional engineering consultancy delivering BIM Architecture & Structure (LOD 100–400), Scan-to-BIM (point cloud conversion), CAD-to-BIM, and complete AutoCAD 2D & 3D Drafting Works for architects, civil engineers, and contractors.
            </p>

            {/* Office Contact Details */}
            <div className="flex flex-col gap-2.5 pt-2 text-xs">
              <div className={`flex items-start gap-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                <MapPin className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isDarkMode ? 'text-cyan-400' : 'text-sky-600'}`} />
                <span className="leading-relaxed">
                  Kurmannapalem, Duvvada Railway Station Road, Balaji Nagar, Road number-5, Pin code: 530046, Visakhapatnam, Andhra Pradesh, India
                </span>
              </div>

              <div className={`flex items-center gap-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                <Phone className={`w-4 h-4 flex-shrink-0 ${isDarkMode ? 'text-cyan-400' : 'text-sky-600'}`} />
                <span className="font-mono">
                  Mobile / WhatsApp: <a href="tel:8985829579" className="hover:underline font-bold text-sky-600 dark:text-cyan-400">+91 8985829579</a> | Landline: <a href="tel:08914630073" className="hover:underline font-bold">0891-4630073</a>
                </span>
              </div>

              <div className={`flex items-center gap-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                <Mail className={`w-4 h-4 flex-shrink-0 ${isDarkMode ? 'text-cyan-400' : 'text-sky-600'}`} />
                <div className="font-mono flex flex-wrap gap-2">
                  <a href="mailto:info@drntechsolutions.in" className="hover:underline font-semibold text-sky-600 dark:text-cyan-400">
                    info@drntechsolutions.in
                  </a>
                  <span>•</span>
                  <a href="mailto:careers@drntechsolutions.in" className="hover:underline text-slate-700 dark:text-slate-300">
                    careers@drntechsolutions.in
                  </a>
                </div>
              </div>

              {/* Direct Messaging & Social Connect Channels */}
              <div className="pt-2">
                <span className={`text-[10px] font-mono uppercase tracking-wider block mb-2 font-bold ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  Direct Channels & Connect
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {/* WhatsApp Quick Chat */}
                  <a
                    href="https://wa.me/918985829579?text=Hello%20Dharani%20Tech%20Solutions%2C%20I%20would%20like%20to%20inquire%20about%20your%20BIM%20services%20and%20Revit%20training%20programs."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs transition-all hover:scale-102"
                    title="Chat directly with Dharani Tech on WhatsApp (+91 8985829579)"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.073.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.203c.043.072.043.419-.101.824zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.176L2 22l4.954-1.399C8.423 21.492 10.153 22 12 22c5.523 0 10-4.477 10-10S17.523 2C12 2z" />
                    </svg>
                    <span>WhatsApp</span>
                  </a>

                  {/* Direct Phone Call */}
                  <a
                    href="tel:8985829579"
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all hover:scale-102 ${
                      isDarkMode
                        ? 'bg-slate-900 border-slate-700 text-slate-200 hover:text-white'
                        : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
                    }`}
                    title="Call Dharani Tech Desk"
                  >
                    <Phone className="w-3.5 h-3.5 text-sky-600" />
                    <span>Call +91 8985829579</span>
                  </a>

                  {/* LinkedIn Company Profile */}
                  <a
                    href="https://www.linkedin.com/company/dharani-tech-solutions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0a66c2] hover:bg-[#004182] text-white text-xs font-semibold shadow-xs transition-all hover:scale-102"
                    title="Connect with Dharani Tech Solutions on LinkedIn"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z" />
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Disciplines Links */}
          <div className="space-y-3">
            <h5 className={`text-xs font-mono uppercase tracking-wider font-bold ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Engineering Services
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className={`transition-colors ${isDarkMode ? 'hover:text-cyan-400' : 'hover:text-sky-600'}`}>
                  Building Planning & Design
                </a>
              </li>
              <li>
                <a href="#services" className={`transition-colors ${isDarkMode ? 'hover:text-cyan-400' : 'hover:text-sky-600'}`}>
                  3D Model Design & Visualization
                </a>
              </li>
              <li>
                <a href="#services" className={`transition-colors ${isDarkMode ? 'hover:text-cyan-400' : 'hover:text-sky-600'}`}>
                  BIM Architecture (LOD 100–400)
                </a>
              </li>
              <li>
                <a href="#services" className={`transition-colors ${isDarkMode ? 'hover:text-cyan-400' : 'hover:text-sky-600'}`}>
                  BIM Structure & Rebar Detailing
                </a>
              </li>
              <li>
                <a href="#services" className={`transition-colors ${isDarkMode ? 'hover:text-cyan-400' : 'hover:text-sky-600'}`}>
                  AutoCAD Working & Shop Drawings
                </a>
              </li>
              <li>
                <a href="#services" className={`transition-colors ${isDarkMode ? 'hover:text-cyan-400' : 'hover:text-sky-600'}`}>
                  Interior Design (ID) Modeling
                </a>
              </li>
            </ul>
          </div>

          {/* Site Navigation & Careers */}
          <div className="space-y-3">
            <h5 className={`text-xs font-mono uppercase tracking-wider font-bold ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Navigation & Academy
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className={`transition-colors ${isDarkMode ? 'hover:text-cyan-400' : 'hover:text-sky-600'}`}>
                  Core Services Matrix
                </a>
              </li>
              <li>
                <a href="#bim-training" className="text-amber-600 dark:text-amber-400 font-bold hover:underline flex items-center gap-1.5">
                  <span>Revit & BIM Training</span>
                  <span className="text-[9px] bg-emerald-600 text-white font-mono px-1.5 py-0.2 rounded font-bold">ADMISSIONS OPEN</span>
                </a>
              </li>
              <li>
                <a href="#software-stack" className={`transition-colors ${isDarkMode ? 'hover:text-cyan-400' : 'hover:text-sky-600'}`}>
                  Software Ecosystem (Revit, Navisworks, ACC)
                </a>
              </li>
              <li>
                <a href="#lod-spectrum" className={`transition-colors ${isDarkMode ? 'hover:text-cyan-400' : 'hover:text-sky-600'}`}>
                  LOD 100–400 Spectrum
                </a>
              </li>
              <li>
                <a href="#quote-estimator" className={`transition-colors ${isDarkMode ? 'hover:text-cyan-400' : 'hover:text-sky-600'}`}>
                  Project Scope Estimator
                </a>
              </li>
              <li>
                <a href="#careers" className="text-sky-600 font-bold hover:underline flex items-center gap-1">
                  <span>Careers in Vizag (Hiring!)</span>
                  <span className="text-[10px] bg-sky-100 text-sky-800 px-1.5 py-0.2 rounded font-mono">NEW</span>
                </a>
              </li>
              <li>
                <a href="#standards-faq" className={`transition-colors ${isDarkMode ? 'hover:text-cyan-400' : 'hover:text-sky-600'}`}>
                  FAQ & Inquiries
                </a>
              </li>
            </ul>
          </div>

          {/* Office & Training Academy */}
          <div className="space-y-3">
            <h5 className={`text-xs font-mono uppercase tracking-wider font-bold ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Office & Academy
            </h5>
            <div className="space-y-2.5 text-xs">
              <div className={`p-3 rounded-xl border text-[11px] ${
                isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <div className={`flex items-center gap-1.5 font-semibold mb-1 ${
                  isDarkMode ? 'text-cyan-400' : 'text-sky-700'
                }`}>
                  <Building2 className="w-3.5 h-3.5" /> Modeling Desk & Office
                </div>
                <span>Located at Balaji Nagar, Road No-5, Duvvada railway station road, Kurmannapalem, PIN 530046.</span>
              </div>

              <div className={`p-3 rounded-xl border text-[11px] ${
                isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <div className={`flex items-center gap-1.5 font-semibold mb-1 ${
                  isDarkMode ? 'text-amber-400' : 'text-amber-700'
                }`}>
                  <Lock className="w-3.5 h-3.5" /> Training Studio (Offline)
                </div>
                <span>Practical hands-on training with 100% live projects, weekday & weekend batches.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Service Boundary Notice */}
        <div className={`pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs ${
          isDarkMode ? 'text-slate-500' : 'text-slate-500'
        }`}>
          <p className="max-w-2xl leading-relaxed">
            &copy; {new Date().getFullYear()} Dharani Tech Solutions. All rights reserved. 
            <span className={`block mt-1 text-[11px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              * Notice: Dharani Tech Solutions specializes in virtual 3D BIM model authoring, Scan-to-BIM (point cloud conversion), CAD-to-BIM, building planning, 3D visualization, and AutoCAD drafting services.
            </span>
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-2 pr-2 border-r border-slate-300 dark:border-slate-800">
              {/* WhatsApp Small Circular Symbol */}
              <a
                href="https://wa.me/918985829579?text=Hello%20Dharani%20Tech%20Solutions%2C%20I%20would%20like%20to%20inquire%20about%20your%20BIM%20and%20engineering%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition-transform hover:scale-110 shadow-xs"
                title="Message us on WhatsApp (+91 8985829579)"
                aria-label="WhatsApp"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.073.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.203c.043.072.043.419-.101.824zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.176L2 22l4.954-1.399C8.423 21.492 10.153 22 12 22c5.523 0 10-4.477 10-10S17.523 2C12 2z" />
                </svg>
              </a>

              {/* LinkedIn Small Circular Symbol */}
              <a
                href="https://www.linkedin.com/company/dharani-tech-solutions"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-[#0a66c2] hover:bg-[#004182] text-white flex items-center justify-center transition-transform hover:scale-110 shadow-xs"
                title="Follow on LinkedIn"
                aria-label="LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z" />
                </svg>
              </a>

              {/* Email Small Circular Symbol */}
              <a
                href="mailto:info@drntechsolutions.in"
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-xs border ${
                  isDarkMode 
                    ? 'bg-slate-900 border-slate-700 text-cyan-400 hover:text-white' 
                    : 'bg-white border-slate-300 text-sky-600 hover:bg-slate-100'
                }`}
                title="Send Email (info@drntechsolutions.in)"
                aria-label="Email"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>

            <a href="#careers" className="text-sky-600 font-semibold hover:underline">Careers</a>
            <span>•</span>
            <a href="#standards-faq" className={`transition-colors ${isDarkMode ? 'hover:text-cyan-400' : 'hover:text-sky-600'}`}>Privacy & NDA</a>
            <span>•</span>
            <a href="#quote-estimator" className={`transition-colors ${isDarkMode ? 'hover:text-cyan-400' : 'hover:text-sky-600'}`}>Get Quote</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
