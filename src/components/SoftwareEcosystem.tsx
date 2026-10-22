import React, { useState } from 'react';
import { 
  Layers, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink, 
  Cpu, 
  Share2, 
  FileCode, 
  Compass,
  ArrowRight
} from 'lucide-react';
import {
  RevitLogo,
  NavisworksLogo,
  AccLogo,
  Bim360Logo,
  AutoCadLogo,
  DynamoLogo
} from './SoftwareLogos';

export const renderSoftwareLogo = (id: string, className?: string) => {
  switch (id) {
    case 'revit':
      return <RevitLogo className={className} />;
    case 'navisworks':
      return <NavisworksLogo className={className} />;
    case 'acc':
      return <AccLogo className={className} />;
    case 'bim360':
      return <Bim360Logo className={className} />;
    case 'autocad':
      return <AutoCadLogo className={className} />;
    case 'dynamo':
      return <DynamoLogo className={className} />;
    default:
      return null;
  }
};

interface SoftwareItem {
  id: string;
  name: string;
  shortName: string;
  vendor: string;
  category: string;
  iconBg: string;
  badgeColor: string;
  description: string;
  howWeUseIt: string;
  deliverables: string[];
  keyBenefit: string;
  formats: string[];
}

const softwares: SoftwareItem[] = [
  {
    id: 'revit',
    name: 'Autodesk Revit',
    shortName: 'Revit',
    vendor: 'Autodesk',
    category: 'Core BIM Authoring (LOD 100–400)',
    iconBg: 'from-blue-600 to-indigo-700',
    badgeColor: 'text-blue-500 border-blue-500/30 bg-blue-500/10',
    description: 'The industry-standard parametric BIM engine for complete architectural and structural virtual construction.',
    howWeUseIt: 'Our primary BIM authoring platform. We build parametric 3D models from LOD 100 conceptual masses up to LOD 400 construction models, detailing reinforced concrete, steel framing, architectural partitions, custom families (.rfa), and automated material takeoff schedules.',
    deliverables: ['Parametric 3D BIM Model (.rvt)', 'Architectural & Structural Sheet Sets', 'Custom Revit Families (.rfa)', 'Quantity Schedules & BOQs'],
    keyBenefit: 'Guarantees bidirectional associativity: any change in plan automatically updates all elevations, sections, and quantities.',
    formats: ['.RVT', '.RFA', '.IFC', '.DWG']
  },
  {
    id: 'navisworks',
    name: 'Autodesk Navisworks Manage',
    shortName: 'Navisworks Manage',
    vendor: 'Autodesk',
    category: 'Clash Detection & Federated Coordination',
    iconBg: 'from-cyan-600 to-teal-700',
    badgeColor: 'text-cyan-500 border-cyan-500/30 bg-cyan-500/10',
    description: 'High-performance model aggregation, spatial clearance checking, and interference resolution engine.',
    howWeUseIt: 'We federate multi-discipline models (Architectural, Structural, and MEP) into unified coordination sessions. We run automated clash tests between structural beams, slabs, ductwork, and plumbing risers, generating prioritized clash reports with exact coordinates.',
    deliverables: ['Federated Coordination Models (.nwd, .nwf)', 'Clash Detection Matrix & Heatmaps', 'Resolution Action Reports (PDF/Excel)', 'Hard & Soft Clearance Verification'],
    keyBenefit: 'Identifies design interferences in the virtual environment before concrete is poured, eliminating expensive site rework.',
    formats: ['.NWD', '.NWF', '.NWC', '.BCF']
  },
  {
    id: 'acc',
    name: 'Autodesk Construction Cloud (ACC)',
    shortName: 'Autodesk ACC',
    vendor: 'Autodesk',
    category: 'Common Data Environment (CDE) & Cloud Collaboration',
    iconBg: 'from-sky-500 to-blue-600',
    badgeColor: 'text-sky-500 border-sky-500/30 bg-sky-500/10',
    description: 'Cloud-native project ecosystem connecting design offices, consulting engineers, and general contractors.',
    howWeUseIt: 'We leverage ACC Docs and Design Collaboration for multi-user Revit Cloud Worksharing. This enables transparent revision tracking, permission-controlled drawing sharing, and live model reviews with client project managers.',
    deliverables: ['Cloud Workshared Central Models', 'Controlled Drawing Package Releases', 'Automated Sheet Version Comparisons', 'Online 3D Model Review Portals'],
    keyBenefit: 'Single source of truth accessible anywhere via web or tablet, preventing out-of-date drawings from reaching site teams.',
    formats: ['Cloud Revit (.rvt)', 'Sheets Hub', 'ISO 19650 CDE']
  },
  {
    id: 'bim360',
    name: 'Autodesk BIM 360',
    shortName: 'BIM 360',
    vendor: 'Autodesk',
    category: 'Field-to-Office Model Coordination & Issue Tracking',
    iconBg: 'from-amber-500 to-orange-600',
    badgeColor: 'text-amber-500 border-amber-500/30 bg-amber-500/10',
    description: 'Mobile and desktop project collaboration tool for coordination issues, RFIs, and model inspection.',
    howWeUseIt: 'We link Navisworks and Revit models directly to BIM 360 Model Coordination, allowing team leads to pin spatial issues to exact 3D coordinates, assign responsibility, and track clash close-outs in real time.',
    deliverables: ['Live Spatial Issue Trackers', 'Coordination Meeting Dashboards', 'RFI Visual Documentation', 'Field Coordination Views'],
    keyBenefit: 'Accelerates turnaround times by directly linking engineering resolutions to site contractor inquiries.',
    formats: ['BIM 360 Cloud', 'Mobile 3D Viewer', 'BCF Issues']
  },
  {
    id: 'autocad',
    name: 'AutoCAD & AutoCAD Architecture',
    shortName: 'AutoCAD',
    vendor: 'Autodesk',
    category: '2D/3D Precision Drafting & Working Drawings',
    iconBg: 'from-red-600 to-rose-700',
    badgeColor: 'text-rose-500 border-rose-500/30 bg-rose-500/10',
    description: 'The global benchmark for computer-aided drafting, statutory approval drawings, and structural details.',
    howWeUseIt: 'We create municipal sanction drawings, architectural working layouts, structural reinforcement bar bending details, and perform CAD-to-BIM conversion from legacy paper blueprints and DWGs into clean digital assets.',
    deliverables: ['Architectural Working Plans & Elevations', 'Structural Reinforcement Details', 'CAD-to-BIM Conversion DWG Packages', 'Municipal Submission Sets'],
    keyBenefit: 'Absolute drafting precision with millimeter accuracy, verified layer standards, and universal compatibility across all contractors.',
    formats: ['.DWG', '.DXF', '.DWF', '.PDF']
  },
  {
    id: 'dynamo',
    name: 'Dynamo BIM & Custom Scripts',
    shortName: 'Dynamo & Python',
    vendor: 'Autodesk / Open Source',
    category: 'Parametric Automation & Model Auditing',
    iconBg: 'from-emerald-600 to-teal-800',
    badgeColor: 'text-emerald-500 border-emerald-500/30 bg-emerald-500/10',
    description: 'Visual programming and custom algorithmic scripts for high-speed modeling workflows and data extraction.',
    howWeUseIt: 'Our engineers run custom Dynamo scripts to audit model health, automatically populate element parameters, batch-generate floor plans and sections, and extract accurate reinforcement schedules directly into Excel.',
    deliverables: ['Automated Model Health Audit Reports', 'Algorithmic Sheet Generation Scripts', 'Custom Parameter Mapping Routines', 'Automated Quantity Extraction Data'],
    keyBenefit: 'Reduces turnaround time on repetitive modeling tasks by up to 60% while eliminating human data-entry errors.',
    formats: ['.DYN', '.PYTHON', '.JSON', '.XLSX']
  }
];

export const SoftwareEcosystem: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode = false }) => {
  const [selectedSoftware, setSelectedSoftware] = useState<SoftwareItem>(softwares[0]);

  return (
    <section id="software-stack" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="mb-10 sm:mb-12">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-xs font-semibold mb-3 border ${
          isDarkMode 
            ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' 
            : 'bg-sky-50 border-sky-200 text-sky-700'
        }`}>
          <Cpu className="w-3.5 h-3.5" /> INDUSTRY-STANDARD SOFTWARE ECOSYSTEM
        </div>
        
        <h2 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}>
          The Engineering Softwares We Work With
        </h2>
        
        <p className={`mt-2 text-xs sm:text-sm max-w-3xl leading-relaxed ${
          isDarkMode ? 'text-slate-400' : 'text-slate-600'
        }`}>
          At Dharani Tech Solutions, we execute every model, drawing, and clash review using genuine, industry-leading virtual design software. Explore how our engineering team utilizes each platform to guarantee high model fidelity, zero site clashes, and seamless project collaboration.
        </p>
      </div>

      {/* Software Badges Grid - Clickable & Interactive */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-8">
        {softwares.map((sw) => {
          const isSelected = selectedSoftware.id === sw.id;
          return (
            <button
              key={sw.id}
              onClick={() => setSelectedSoftware(sw)}
              className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between relative group ${
                isSelected
                  ? isDarkMode
                    ? 'bg-slate-900 border-cyan-500 shadow-md shadow-cyan-500/10 ring-1 ring-cyan-500'
                    : 'bg-sky-50/90 border-sky-600 shadow-md shadow-sky-600/10 ring-1 ring-sky-600'
                  : isDarkMode
                  ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div>
                {/* Official Software Logo */}
                <div className="w-12 h-12 mb-3.5 group-hover:scale-105 transition-transform drop-shadow-sm">
                  {renderSoftwareLogo(sw.id, "w-12 h-12")}
                </div>
                
                <h4 className={`text-xs sm:text-sm font-bold tracking-tight line-clamp-1 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  {sw.shortName}
                </h4>
                
                <span className="text-[10px] font-mono text-slate-500 block mt-0.5">
                  {sw.vendor}
                </span>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-[10px]">
                <span className={`font-semibold ${isSelected ? (isDarkMode ? 'text-cyan-400' : 'text-sky-600') : 'text-slate-400'}`}>
                  {isSelected ? 'Active View' : 'Explore'}
                </span>
                <ArrowRight className={`w-3 h-3 ${isSelected ? (isDarkMode ? 'text-cyan-400' : 'text-sky-600') : 'text-slate-400'}`} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Software Deep Dive Card */}
      <div className={`rounded-3xl border p-6 sm:p-8 lg:p-10 transition-all duration-300 relative overflow-hidden ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-900 via-slate-900/95 to-[#0b1322] border-slate-800' 
          : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Software Identity & Role */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 shrink-0 drop-shadow-md">
                {renderSoftwareLogo(selectedSoftware.id, "w-14 h-14")}
              </div>
              <div>
                <span className={`text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full border ${selectedSoftware.badgeColor}`}>
                  {selectedSoftware.category}
                </span>
                <h3 className={`text-xl sm:text-2xl font-extrabold tracking-tight mt-1.5 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  {selectedSoftware.name}
                </h3>
              </div>
            </div>

            <p className={`text-xs sm:text-sm leading-relaxed ${
              isDarkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
              {selectedSoftware.description}
            </p>

            {/* Official Revit Brand Lockup */}
            {selectedSoftware.id === 'revit' && (
              <div className={`p-3 rounded-2xl border flex items-center gap-3.5 ${
                isDarkMode ? 'bg-slate-950/80 border-blue-500/30' : 'bg-blue-50/60 border-blue-200'
              }`}>
                <div className="bg-white px-2.5 py-1.5 rounded-xl border border-slate-200 shadow-xs shrink-0 flex items-center">
                  <img
                    src="/assets/aistudio/revit_73d52bad.png"
                    alt="Official Autodesk Revit"
                    className="h-8 w-auto object-contain"
                  />
                </div>
                <div className="text-[11px] leading-tight">
                  <span className={`font-bold block ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    Official Autodesk Revit Brand Emblem
                  </span>
                  <span className={isDarkMode ? 'text-blue-300' : 'text-blue-700'}>
                    3D faceted sapphire origami & parametric LOD 100–400 architectural/structural engine
                  </span>
                </div>
              </div>
            )}

            {/* Official Navisworks Manage Brand Lockup */}
            {selectedSoftware.id === 'navisworks' && (
              <div className={`p-3 rounded-2xl border flex items-center gap-3.5 ${
                isDarkMode ? 'bg-slate-950/80 border-emerald-500/30' : 'bg-emerald-50/60 border-emerald-200'
              }`}>
                <div className="bg-white p-1 rounded-xl border border-slate-200 shadow-xs shrink-0 flex items-center overflow-hidden">
                  <img
                    src="/assets/aistudio/manage_a267b3e7.jpg"
                    alt="Official Autodesk Navisworks Manage"
                    className="h-9 w-9 object-contain rounded-lg"
                  />
                </div>
                <div className="text-[11px] leading-tight">
                  <span className={`font-bold block ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    Official Autodesk Navisworks Manage Mark
                  </span>
                  <span className={isDarkMode ? 'text-emerald-300' : 'text-emerald-700'}>
                    Multi-disciplinary clash detective, hard/soft clearance checking & federated models
                  </span>
                </div>
              </div>
            )}

            {/* Official ACC Brand Lockup */}
            {selectedSoftware.id === 'acc' && (
              <div className={`p-3 rounded-2xl border flex items-center gap-3.5 ${
                isDarkMode ? 'bg-slate-950/80 border-sky-500/30' : 'bg-sky-50/60 border-sky-200'
              }`}>
                <div className="bg-white px-2.5 py-1.5 rounded-xl border border-slate-200 shadow-xs shrink-0 flex items-center">
                  <img
                    src="/assets/aistudio/image_afb67ee3.png"
                    alt="Official Autodesk Construction Cloud"
                    className="h-7 w-auto object-contain"
                  />
                </div>
                <div className="text-[11px] leading-tight">
                  <span className={`font-bold block ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    Official Autodesk Construction Cloud (ACC) Lockup
                  </span>
                  <span className={isDarkMode ? 'text-sky-300' : 'text-sky-700'}>
                    Revit Cloud Worksharing, ISO 19650 Common Data Environment (CDE) & model review
                  </span>
                </div>
              </div>
            )}

            {/* Official BIM 360 Brand Lockup */}
            {selectedSoftware.id === 'bim360' && (
              <div className={`p-3 rounded-2xl border flex items-center gap-3.5 ${
                isDarkMode ? 'bg-slate-950/80 border-blue-500/30' : 'bg-sky-50/60 border-sky-200'
              }`}>
                <div className="bg-white px-2.5 py-1.5 rounded-xl border border-slate-200 shadow-xs shrink-0 flex items-center">
                  <img
                    src="/assets/aistudio/image_71f8fd24.png"
                    alt="Official Autodesk BIM 360"
                    className="h-7 w-auto object-contain"
                  />
                </div>
                <div className="text-[11px] leading-tight">
                  <span className={`font-bold block ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    Official Autodesk BIM 360 Brand Lockup
                  </span>
                  <span className={isDarkMode ? 'text-sky-300' : 'text-sky-700'}>
                    Spatial coordinate issue tracking, field-to-office model coordination & visual RFIs
                  </span>
                </div>
              </div>
            )}

            {/* Official AutoCAD Brand Lockup */}
            {selectedSoftware.id === 'autocad' && (
              <div className={`p-3 rounded-2xl border flex items-center gap-3.5 ${
                isDarkMode ? 'bg-slate-950/80 border-rose-500/30' : 'bg-rose-50/60 border-rose-200'
              }`}>
                <div className="bg-white px-2.5 py-1.5 rounded-xl border border-slate-200 shadow-xs shrink-0 flex items-center">
                  <img
                    src="/assets/aistudio/cad_272baca7.png"
                    alt="Official Autodesk AutoCAD"
                    className="h-8 w-auto object-contain"
                  />
                </div>
                <div className="text-[11px] leading-tight">
                  <span className={`font-bold block ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    Official Autodesk AutoCAD Brand Emblem
                  </span>
                  <span className={isDarkMode ? 'text-rose-300' : 'text-rose-700'}>
                    3D faceted ruby origami prism & precision CAD drafting standards
                  </span>
                </div>
              </div>
            )}

            {/* Official Dynamo Brand Lockup */}
            {selectedSoftware.id === 'dynamo' && (
              <div className={`p-3 rounded-2xl border flex items-center gap-3.5 ${
                isDarkMode ? 'bg-slate-950/80 border-teal-500/30' : 'bg-teal-50/60 border-teal-200'
              }`}>
                <div className="bg-white px-2.5 py-1.5 rounded-xl border border-slate-200 shadow-xs shrink-0 flex items-center">
                  <img
                    src="/assets/aistudio/dynamo_trimmed.png"
                    alt="Official Autodesk Dynamo"
                    className="h-7 w-auto object-contain"
                  />
                </div>
                <div className="text-[11px] leading-tight">
                  <span className={`font-bold block ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    Official Autodesk Dynamo Brand Lockup
                  </span>
                  <span className={isDarkMode ? 'text-teal-300' : 'text-teal-700'}>
                    Computational parametric engine & custom Python automation
                  </span>
                </div>
              </div>
            )}

            {/* Key Deliverable Formats */}
            <div className={`p-4 rounded-2xl border ${
              isDarkMode ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className={`text-[10px] font-mono uppercase tracking-wider block mb-2 font-bold ${
                isDarkMode ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Supported File Formats & Deliverables
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedSoftware.formats.map((fmt, idx) => (
                  <span
                    key={idx}
                    className={`px-2 py-0.5 rounded font-mono text-[11px] font-semibold border ${
                      isDarkMode 
                        ? 'bg-slate-900 border-slate-700 text-cyan-300' 
                        : 'bg-white border-slate-300 text-slate-800'
                    }`}
                  >
                    {fmt}
                  </span>
                ))}
              </div>
            </div>

            {/* Client Strategic Value */}
            <div className={`p-4 rounded-2xl border flex items-start gap-3 ${
              isDarkMode 
                ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300' 
                : 'bg-emerald-50 border-emerald-200 text-emerald-900'
            }`}>
              <ShieldCheck className="w-5 h-5 flex-shrink-0 mt-0.5 text-emerald-500" />
              <div className="text-xs">
                <strong className="block font-bold mb-0.5">Engineering Impact:</strong>
                <span className="leading-relaxed">{selectedSoftware.keyBenefit}</span>
              </div>
            </div>
          </div>

          {/* Right Column: How Dharani Tech Utilizes It & Tangible Deliverables */}
          <div className={`lg:col-span-7 p-6 sm:p-7 rounded-2xl border ${
            isDarkMode ? 'bg-slate-950/50 border-slate-800/80' : 'bg-slate-50/70 border-slate-200'
          }`}>
            <h4 className={`text-xs font-mono uppercase tracking-wider font-bold mb-3 flex items-center gap-2 ${
              isDarkMode ? 'text-cyan-400' : 'text-sky-700'
            }`}>
              <Compass className="w-4 h-4" /> How Dharani Tech Leverages {selectedSoftware.shortName}
            </h4>

            <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${
              isDarkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
              {selectedSoftware.howWeUseIt}
            </p>

            <h5 className={`text-xs font-mono uppercase tracking-wider font-bold mb-3 ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Standard Output Handed Over To Client
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedSoftware.deliverables.map((item, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs transition-colors ${
                    isDarkMode 
                      ? 'bg-slate-900/80 border-slate-800 text-slate-200' 
                      : 'bg-white border-slate-200 text-slate-800 shadow-xs'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* Quick Consultation Callout */}
            <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className={`text-slate-500 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Need your project modeled or coordinated in {selectedSoftware.shortName}?
              </span>
              <a
                href="#quote-estimator"
                className="font-bold text-sky-600 hover:text-sky-500 flex items-center gap-1 group"
              >
                <span>Select in Scope Estimator</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Assurance Note */}
      <div className={`mt-6 p-4 rounded-2xl border text-center text-xs flex flex-wrap items-center justify-center gap-3 sm:gap-6 ${
        isDarkMode 
          ? 'bg-slate-900/50 border-slate-800 text-slate-400' 
          : 'bg-slate-100/70 border-slate-200 text-slate-600'
      }`}>
        <span className="font-mono text-[11px] font-bold text-sky-600 uppercase">
          100% Native Files Guarantee
        </span>
        <span>•</span>
        <span>All models and drawings delivered with zero proprietary software lock-in</span>
        <span>•</span>
        <span>Compliant with open IFC2x3, IFC4, DWG, and Autodesk workshared ecosystems</span>
      </div>
    </section>
  );
};
