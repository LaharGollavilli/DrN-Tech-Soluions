import React, { useState } from 'react';
import { Discipline, LodLevel, EstimatorState } from '../types/bim';
import { 
  Building, 
  Layers, 
  CheckCircle2, 
  FileText, 
  Calendar, 
  Mail, 
  User, 
  Building2, 
  Phone, 
  Lock, 
  Sliders, 
  ArrowRight, 
  ArrowLeft,
  FileCheck,
  Send,
  Download,
  AlertCircle,
  MapPin
} from 'lucide-react';

const FACILITY_TYPES = [
  { id: 'residential', label: 'Residential Building / Villa', icon: '🏡', desc: 'Independent houses, villas & apartments' },
  { id: 'commercial', label: 'Commercial Complex / Office', icon: '🏢', desc: 'Multi-tenant commercial buildings & retail' },
  { id: 'industrial', label: 'Industrial Shed / Warehouse', icon: '🏭', desc: 'Warehouses, steel plants & manufacturing units' },
  { id: 'institutional', label: 'Institutional / Educational', icon: '🏫', desc: 'Schools, colleges & institutional facilities' },
  { id: 'hospitality', label: 'Hospitality & Healthcare', icon: '🏥', desc: 'Hotels, clinics & healthcare facilities' },
  { id: 'interior-fitout', label: 'Interior Fit-Out & Renovation', icon: '🛋️', desc: 'Commercial & residential interior projects' }
];

const DISCIPLINE_OPTIONS: { id: Discipline; label: string; sub: string }[] = [
  { id: 'building-planning', label: 'Building Planning & Architectural Design', sub: 'Floor plans, municipal permit drawings, sections & elevations' },
  { id: '3d-model-design', label: '3D Model Design & Architectural Visualization', sub: 'Exterior facade 3D renders, interior perspectives & walkthroughs' },
  { id: 'bim-arch-structure', label: 'BIM Architecture & Structure (LOD 100–400)', sub: 'Parametric Revit models, RC framing, rebar detailing & foundations' },
  { id: 'autocad-works', label: 'Complete AutoCAD 2D & 3D Drafting Works', sub: 'Working drawings, shop drawings, structural detailing & CAD cleanups' },
  { id: 'interior-design', label: 'Interior Design (ID) Modeling', sub: 'Custom millwork, joinery, reflected ceiling plans (RCP) & finishes' },
  { id: 'clash-coordination', label: 'Clash Detection & Multi-Trade Coordination', sub: 'Navisworks interference audits, clash matrices & issue logs' }
];

const LOD_OPTIONS: { level: LodLevel; name: string; desc: string }[] = [
  { level: 'LOD 200', name: 'Schematic Design', desc: 'Approximate quantities, size, shape, and spatial allocation' },
  { level: 'LOD 300', name: 'Detailed Design', desc: 'Accurate dimensions, specific assemblies, permit & CD sheets' },
  { level: 'LOD 350', name: 'Multi-Trade Coordination', desc: 'Includes connection details, interfaces, hangers, and clash verification' },
  { level: 'LOD 400', name: 'Fabrication & Shop Ready', desc: 'Extreme detail: spool drawings, rebar schedules, and direct assembly' }
];

const INPUT_FILE_OPTIONS = [
  '2D AutoCAD (.DWG / .DXF) Drawings',
  'Architectural & Engineering PDFs / Blueprints',
  'Design Sketches & Hand Redline Markups',
  'Existing Conceptual Revit / 3D Files',
  'Site Dimension Notes & Photographs'
];

const TIMELINE_OPTIONS = [
  { id: 'fast-track', label: 'Fast-Track (1–2 Weeks)', desc: 'Prioritized dedicated modeling team for urgent permit or tender deadlines' },
  { id: 'standard', label: 'Standard Milestone (3–4 Weeks)', desc: 'Balanced phased modeling and weekly review milestones' },
  { id: 'extended', label: 'Phased Project (5+ Weeks)', desc: 'Comprehensive model development aligned with construction milestones' }
];

export const QuoteEstimator: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode = false }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState<EstimatorState>({
    facilityType: 'residential',
    disciplines: ['building-planning', '3d-model-design', 'bim-arch-structure', 'autocad-works'],
    lodLevel: 'LOD 300',
    scaleUnit: 'sqft',
    floorArea: 25000,
    inputFiles: ['2D AutoCAD (.DWG / .DXF) Drawings', 'Architectural & Engineering PDFs / Blueprints'],
    timeline: 'standard',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    companyName: '',
    projectNotes: '',
    ndaRequired: true
  });

  const toggleDiscipline = (disc: Discipline) => {
    setFormData((prev) => {
      const exists = prev.disciplines.includes(disc);
      if (exists) {
        if (prev.disciplines.length === 1) return prev;
        return { ...prev, disciplines: prev.disciplines.filter((d) => d !== disc) };
      } else {
        return { ...prev, disciplines: [...prev.disciplines, disc] };
      }
    });
  };

  const toggleInputFile = (fileType: string) => {
    setFormData((prev) => {
      const exists = prev.inputFiles.includes(fileType);
      if (exists) {
        return { ...prev, inputFiles: prev.inputFiles.filter((f) => f !== fileType) };
      } else {
        return { ...prev, inputFiles: [...prev.inputFiles, fileType] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.clientPhone) {
      alert('Please provide your name and contact phone number.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div id="quote-estimator" className="w-full">
      <div className={`p-6 md:p-10 rounded-3xl border shadow-xl relative overflow-hidden transition-colors ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-900 via-[#0a1120] to-slate-950 border-cyan-500/30' 
          : 'bg-white border-slate-200/90 shadow-slate-200/50'
      }`}>
        {/* Background Accent Grid */}
        <div className={`absolute top-0 right-0 w-96 h-96 bg-blueprint-grid pointer-events-none ${
          isDarkMode ? 'opacity-20' : 'opacity-10'
        }`} />

        {/* Section Header */}
        <div className="relative z-10 max-w-3xl mb-8">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full font-mono text-xs font-semibold ${
            isDarkMode 
              ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400' 
              : 'bg-sky-50 border border-sky-200 text-sky-700'
          }`}>
            <Sliders className="w-3.5 h-3.5" /> PROJECT INQUIRY & SCOPE ESTIMATOR
          </div>
          <h2 className={`text-3xl md:text-4xl font-extrabold tracking-tight mt-3 ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Scope Your Engineering Project
          </h2>
          <p className={`mt-2 text-sm leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Select your requirements to receive a detailed engineering proposal for building planning, 3D design, BIM architecture & structure, or AutoCAD drafting.
          </p>
        </div>

        {/* Step Indicator Bar */}
        <div className="relative z-10 flex items-center justify-between mb-8 overflow-x-auto pb-2 scrollbar-none">
          {[
            { step: 1, label: 'Project Type' },
            { step: 2, label: 'Disciplines' },
            { step: 3, label: 'Scale & LOD' },
            { step: 4, label: 'Drawings & Timeline' },
            { step: 5, label: 'Review & Submit' }
          ].map((item) => {
            const isCurrent = currentStep === item.step;
            const isCompleted = currentStep > item.step;

            return (
              <div
                key={item.step}
                onClick={() => !submitted && setCurrentStep(item.step)}
                className={`flex items-center gap-2 cursor-pointer transition-all ${
                  isCurrent
                    ? isDarkMode ? 'text-cyan-400 font-semibold' : 'text-sky-700 font-semibold'
                    : isCompleted
                    ? isDarkMode ? 'text-slate-300' : 'text-slate-600'
                    : isDarkMode ? 'text-slate-600' : 'text-slate-400'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono border transition-all ${
                    isCurrent
                      ? isDarkMode 
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/30' 
                        : 'bg-sky-600 text-white border-sky-500 shadow-md shadow-sky-500/20'
                      : isCompleted
                      ? isDarkMode 
                        ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40' 
                        : 'bg-sky-100 text-sky-800 border-sky-300'
                      : isDarkMode 
                        ? 'bg-slate-900 border-slate-800 text-slate-500' 
                        : 'bg-slate-100 border-slate-200 text-slate-500'
                  }`}
                >
                  {isCompleted ? '✓' : item.step}
                </div>
                <span className="text-xs whitespace-nowrap hidden sm:inline">{item.label}</span>
                {item.step < 5 && (
                  <div className={`w-6 h-px hidden md:block mx-1 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Form Body */}
        {!submitted ? (
          <div className="relative z-10">
            {/* STEP 1: Facility Type */}
            {currentStep === 1 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                  <h3 className={`text-lg font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    <Building className="w-5 h-5 text-sky-600" />
                    Step 1: Select Project Category
                  </h3>
                  <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Choose the type of structure for appropriate layout planning and drafting density.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {FACILITY_TYPES.map((fac) => {
                    const isSelected = formData.facilityType === fac.id;
                    return (
                      <div
                        key={fac.id}
                        onClick={() => setFormData({ ...formData, facilityType: fac.id })}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? isDarkMode
                              ? 'bg-cyan-950/40 border-cyan-400 shadow-md shadow-cyan-500/10'
                              : 'bg-sky-50 border-sky-500 shadow-sm'
                            : isDarkMode
                            ? 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                            : 'bg-white border-slate-200 hover:border-sky-300'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl">{fac.icon}</span>
                            {isSelected && (
                              <CheckCircle2 className="w-4 h-4 text-sky-600" />
                            )}
                          </div>
                          <h4 className={`mt-2 text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{fac.label}</h4>
                          <p className={`mt-1 text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{fac.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: Disciplines Needed */}
            {currentStep === 2 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                  <h3 className={`text-lg font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    <Layers className="w-5 h-5 text-sky-600" />
                    Step 2: Required Services & Disciplines
                  </h3>
                  <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Select one or more services (Building planning, 3D designs, Revit BIM, or AutoCAD works).
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {DISCIPLINE_OPTIONS.map((disc) => {
                    const isSelected = formData.disciplines.includes(disc.id);
                    return (
                      <div
                        key={disc.id}
                        onClick={() => toggleDiscipline(disc.id)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                          isSelected
                            ? isDarkMode
                              ? 'bg-cyan-950/40 border-cyan-400 shadow-md shadow-cyan-500/10'
                              : 'bg-sky-50 border-sky-500 shadow-xs'
                            : isDarkMode
                            ? 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                            : 'bg-white border-slate-200 hover:border-sky-300'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 mt-0.5 rounded flex items-center justify-center border transition-all ${
                            isSelected 
                              ? 'bg-sky-600 border-sky-600 text-white' 
                              : isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-100 border-slate-300'
                          }`}
                        >
                          {isSelected && <span className="text-xs font-bold">✓</span>}
                        </div>
                        <div>
                          <h4 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{disc.label}</h4>
                          <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{disc.sub}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 3: Scale & LOD */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                  <h3 className={`text-lg font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    <Sliders className="w-5 h-5 text-sky-600" />
                    Step 3: Approximate Project Scale & BIM LOD
                  </h3>
                  <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Specify approximate built-up area and target modeling detail.
                  </p>
                </div>

                {/* Scale Slider */}
                <div className={`p-5 rounded-2xl border ${
                  isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                    <div>
                      <span className={`text-xs font-mono uppercase block ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        Approximate Built-Up Area:
                      </span>
                      <div className={`text-2xl font-extrabold font-mono mt-0.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        {formData.floorArea.toLocaleString()}{' '}
                        <span className="text-sky-600 text-sm font-sans font-medium">
                          {formData.scaleUnit === 'sqft' ? 'sq ft' : 'sq meters (m²)'}
                        </span>
                      </div>
                    </div>

                    {/* Unit Switcher */}
                    <div className="flex items-center gap-1 p-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, scaleUnit: 'sqft', floorArea: formData.scaleUnit === 'sqm' ? formData.floorArea * 10 : formData.floorArea })}
                        className={`px-2.5 py-1 rounded text-xs font-mono font-bold ${
                          formData.scaleUnit === 'sqft' ? 'bg-sky-600 text-white' : 'text-slate-500'
                        }`}
                      >
                        SQ FT
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, scaleUnit: 'sqm', floorArea: formData.scaleUnit === 'sqft' ? Math.round(formData.floorArea / 10) : formData.floorArea })}
                        className={`px-2.5 py-1 rounded text-xs font-mono font-bold ${
                          formData.scaleUnit === 'sqm' ? 'bg-sky-600 text-white' : 'text-slate-500'
                        }`}
                      >
                        SQ METERS
                      </button>
                    </div>
                  </div>

                  <input
                    type="range"
                    min={formData.scaleUnit === 'sqft' ? 1000 : 100}
                    max={formData.scaleUnit === 'sqft' ? 250000 : 25000}
                    step={formData.scaleUnit === 'sqft' ? 2500 : 250}
                    value={formData.floorArea}
                    onChange={(e) => setFormData({ ...formData, floorArea: Number(e.target.value) })}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-600"
                  />

                  <div className={`flex justify-between text-[11px] font-mono mt-2 ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                    <span>Small Scale ({formData.scaleUnit === 'sqft' ? '1,000 sq ft' : '100 m²'})</span>
                    <span>Large Scale ({formData.scaleUnit === 'sqft' ? '250,000+ sq ft' : '25,000+ m²'})</span>
                  </div>
                </div>

                {/* LOD Selection */}
                <div>
                  <label className={`text-xs font-mono uppercase block mb-2.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Target Level of Development (For BIM Projects):
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {LOD_OPTIONS.map((lod) => {
                      const isSelected = formData.lodLevel === lod.level;
                      return (
                        <div
                          key={lod.level}
                          onClick={() => setFormData({ ...formData, lodLevel: lod.level })}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? isDarkMode
                                ? 'bg-cyan-950/40 border-cyan-400'
                                : 'bg-sky-50 border-sky-500'
                              : isDarkMode
                              ? 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                              : 'bg-white border-slate-200 hover:border-sky-300'
                          }`}
                        >
                          <div>
                            <span className="text-xs font-mono font-bold text-sky-600">{lod.level}</span>
                            <h5 className={`text-xs font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{lod.name}</h5>
                            <p className={`text-[11px] mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{lod.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Input Files & Turnaround */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                  <h3 className={`text-lg font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    <FileText className="w-5 h-5 text-sky-600" />
                    Step 4: Available Input Drawings & Timeline
                  </h3>
                  <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Tell us what files you have ready. (We work strictly from your digital drawings and sketches).
                  </p>
                </div>

                <div>
                  <label className={`text-xs font-mono uppercase block mb-2.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Available Documents:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {INPUT_FILE_OPTIONS.map((fileType) => {
                      const isSelected = formData.inputFiles.includes(fileType);
                      return (
                        <div
                          key={fileType}
                          onClick={() => toggleInputFile(fileType)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                            isSelected
                              ? isDarkMode
                                ? 'bg-cyan-950/40 border-cyan-400 text-white'
                                : 'bg-sky-50 border-sky-500 text-slate-900'
                              : isDarkMode
                              ? 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-sky-300'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] ${
                              isSelected 
                                ? 'bg-sky-600 border-sky-600 text-white font-bold' 
                                : isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-100 border-slate-300'
                            }`}
                          >
                            {isSelected && '✓'}
                          </div>
                          <span className="text-xs font-medium">{fileType}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className={`text-xs font-mono uppercase block mb-2.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Desired Turnaround:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {TIMELINE_OPTIONS.map((time) => {
                      const isSelected = formData.timeline === time.id;
                      return (
                        <div
                          key={time.id}
                          onClick={() => setFormData({ ...formData, timeline: time.id })}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? isDarkMode
                                ? 'bg-cyan-950/40 border-cyan-400'
                                : 'bg-sky-50 border-sky-500'
                              : isDarkMode
                              ? 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                              : 'bg-white border-slate-200 hover:border-sky-300'
                          }`}
                        >
                          <h5 className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{time.label}</h5>
                          <p className={`text-[11px] mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{time.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: Proposal Review & Contact Details */}
            {currentStep === 5 && (
              <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                  <h3 className={`text-lg font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    <FileCheck className="w-5 h-5 text-sky-600" />
                    Step 5: Contact Details for Project Proposal
                  </h3>
                  <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Our modeling engineer will review your specifications and send a formal quotation.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`text-xs font-mono uppercase block mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={formData.clientName}
                        onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border text-xs bg-slate-50 dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`text-xs font-mono uppercase block mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      Company / Architect Firm Name
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="e.g. Skyline Architecture & Builders"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border text-xs bg-slate-50 dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`text-xs font-mono uppercase block mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      Phone / WhatsApp Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        required
                        value={formData.clientPhone}
                        onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border text-xs bg-slate-50 dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`text-xs font-mono uppercase block mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        value={formData.clientEmail}
                        onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                        placeholder="ramesh@example.com"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border text-xs bg-slate-50 dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className={`text-xs font-mono uppercase block mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Specific Project Notes or Drawing Details:
                  </label>
                  <textarea
                    rows={3}
                    value={formData.projectNotes}
                    onChange={(e) => setFormData({ ...formData, projectNotes: e.target.value })}
                    placeholder="e.g., G+4 residential building planning with AutoCAD approval set and 3D exterior visualization."
                    className="w-full p-3 rounded-xl border text-xs bg-slate-50 dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                {/* Direct Office Contact Banner */}
                <div className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs ${
                  isDarkMode ? 'bg-slate-900/80 border-slate-800 text-slate-300' : 'bg-sky-50/80 border-sky-100 text-slate-700'
                }`}>
                  <div>
                    <span className="font-bold block text-sky-700 dark:text-cyan-400">Visakhapatnam Engineering Office:</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Kurmanpalem, Duvvada Railway Station Road, Balaji Nagar, Road No. 5, Visakhapatnam - 530046
                    </span>
                  </div>
                  <div className="font-mono text-xs text-sky-800 dark:text-cyan-300 whitespace-nowrap">
                    Ph: +91 898529579 | 0891-4630073
                  </div>
                </div>
              </form>
            )}

            {/* Bottom Form Navigation Controls */}
            <div className="mt-8 pt-5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isDarkMode ? 'text-slate-300 hover:text-white bg-slate-800' : 'text-slate-700 hover:text-slate-900 bg-slate-100'
                  }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>
              ) : <div />}

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => prev + 1)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Continue to Step {currentStep + 1}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 shadow-md flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry for Quotation</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          /* SUBMITTED SUCCESS VIEW */
          <div className="relative z-10 py-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="max-w-2xl mx-auto text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/60 border-2 border-emerald-500 flex items-center justify-center text-emerald-600 shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className={`text-2xl md:text-3xl font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Project Scope Inquiry Received!
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Thank you, <strong className="text-sky-600">{formData.clientName}</strong>. Your project parameters have been received by our engineering team at Dharani Tech Solutions.
              </p>
            </div>

            {/* Generated Scope Summary Card */}
            <div className={`mt-8 max-w-2xl mx-auto p-6 rounded-2xl border text-left space-y-4 ${
              isDarkMode ? 'bg-slate-950/90 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 text-xs font-mono text-sky-600">
                <span>PROJECT INQUIRY SUMMARY</span>
                <span>VIZAG ENGINEERING DESK</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block">Category:</span>
                  <span className={`font-medium capitalize ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{formData.facilityType}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Approx. Area:</span>
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {formData.floorArea.toLocaleString()} {formData.scaleUnit === 'sqft' ? 'sq ft' : 'm²'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">BIM Level:</span>
                  <span className="text-sky-600 font-bold font-mono">{formData.lodLevel}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Selected Services:</span>
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{formData.disciplines.length} Disciplines</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Target Timeline:</span>
                  <span className={`font-medium capitalize ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{formData.timeline}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Contact Phone:</span>
                  <span className="text-emerald-600 font-semibold">{formData.clientPhone}</span>
                </div>
              </div>

              <div className={`pt-3 border-t border-slate-200 dark:border-slate-800 text-xs ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                <span className={`font-semibold block mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Next Engineering Step:</span>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Our modeling engineer will review your project parameters and reach out to you directly at <strong>{formData.clientPhone}</strong> {formData.clientEmail ? `or ${formData.clientEmail}` : ''} with an engineering breakdown and quotation.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-mono flex items-center justify-center gap-2 border transition-colors ${
                    isDarkMode ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700' : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                  }`}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Print Inquiry Summary</span>
                </button>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    setCurrentStep(1);
                  }}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl text-slate-500 hover:text-slate-700 dark:hover:text-white text-xs font-mono text-center transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
