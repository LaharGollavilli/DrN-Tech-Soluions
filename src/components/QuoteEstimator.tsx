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
  Printer,
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
  { id: 'scan-to-bim', label: 'Scan-to-BIM & Point Cloud Modeling', sub: '3D laser scans (.rcp/.rcs/.e57/LiDAR) converted into parametric Revit models' },
  { id: 'cad-to-bim', label: 'CAD-to-BIM Conversion Services', sub: 'Legacy 2D DWGs, blueprints & PDFs transformed into intelligent 3D BIM' },
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
  '3D Laser Scan / LiDAR Point Clouds (.RCP, .RCS, .E57, .LAS)',
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

  const handlePrintScope = () => {
    const facilityLabel = FACILITY_TYPES.find(f => f.id === formData.facilityType)?.label || formData.facilityType;
    const lodObj = LOD_OPTIONS.find(l => l.level === formData.lodLevel);
    const timelineLabel = TIMELINE_OPTIONS.find(t => t.id === formData.timeline)?.label || formData.timeline;
    const dateStr = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>DTS Project Scope Summary - ${formData.clientName || 'Inquiry'}</title>
          <style>
            @page { size: A4; margin: 15mm; }
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #0f172a; margin: 0; padding: 20px; font-size: 13px; line-height: 1.5; background: #fff; }
            .header { border-bottom: 2px solid #0284c7; padding-bottom: 12px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-start; }
            .logo-text { font-size: 20px; font-weight: 800; color: #0f172a; letter-spacing: -0.5px; }
            .logo-sub { font-size: 11px; font-weight: 700; color: #0284c7; letter-spacing: 0.5px; text-transform: uppercase; margin-top: 2px; }
            .meta { text-align: right; font-size: 11px; color: #64748b; font-family: monospace; }
            .badge { display: inline-block; background: #e0f2fe; color: #0369a1; padding: 3px 8px; border-radius: 4px; font-weight: 600; font-size: 11px; margin-bottom: 16px; }
            h2 { font-size: 16px; margin: 0 0 4px 0; color: #0f172a; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 20px; }
            .card { border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 14px; background: #f8fafc; }
            .card-title { font-size: 10px; font-family: monospace; text-transform: uppercase; color: #0369a1; font-weight: 700; margin-bottom: 6px; letter-spacing: 0.5px; }
            .card-val { font-size: 13px; font-weight: 700; color: #0f172a; }
            .card-sub { font-size: 11px; color: #475569; margin-top: 4px; }
            .disc-pill { display: inline-block; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 4px; padding: 2px 7px; font-size: 11px; margin: 2px 3px 2px 0; font-weight: 600; }
            .footer-note { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 12px; font-size: 11px; color: #166534; margin-top: 15px; }
            .contact-bar { border-top: 1px solid #e2e8f0; margin-top: 25px; padding-top: 12px; font-size: 10px; color: #64748b; display: flex; justify-content: space-between; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="logo-text">DHARANI TECH SOLUTIONS</div>
              <div class="logo-sub">BIM MODELING • SCAN-TO-BIM • CAD-TO-BIM • AUTOCAD WORKS</div>
            </div>
            <div class="meta">
              <div>Ref: DTS-BIM-2026</div>
              <div>Date: ${dateStr}</div>
            </div>
          </div>

          <div class="badge">Official Project Scoping & Parameter Record</div>
          <h2>5-Step Engineering Scoping Parameters</h2>
          <p style="color: #64748b; font-size: 11px; margin-top: 2px; margin-bottom: 16px;">
            Submitted for formal engineering review and quotation assessment.
          </p>

          <div class="grid">
            <div class="card">
              <div class="card-title">Step 1 • Facility Type & Built-up Scale</div>
              <div class="card-val">${facilityLabel}</div>
              <div class="card-sub">Approx. Built-up Area: <strong>${formData.floorArea.toLocaleString()} ${formData.scaleUnit === 'sqft' ? 'sq ft' : 'm²'}</strong></div>
            </div>

            <div class="card">
              <div class="card-title">Step 2 • Disciplines (${formData.disciplines.length})</div>
              <div style="margin-top: 4px;">
                ${formData.disciplines.map(dId => {
                  const disc = DISCIPLINE_OPTIONS.find(d => d.id === dId);
                  return `<span class="disc-pill">${disc?.label || dId}</span>`;
                }).join(' ')}
              </div>
            </div>

            <div class="card">
              <div class="card-title">Step 3 • Target Level of Development</div>
              <div class="card-val">${formData.lodLevel} (${lodObj?.name || ''})</div>
              <div class="card-sub">${lodObj?.desc || ''}</div>
            </div>

            <div class="card">
              <div class="card-title">Step 4 • Assets & Turnaround</div>
              <div class="card-val">${timelineLabel}</div>
              <div class="card-sub">Available Files: ${formData.inputFiles.join(', ') || 'To be shared'}</div>
              <div class="card-sub">Confidentiality: ${formData.ndaRequired ? 'Strict Mutual NDA Requested' : 'Standard Engineering Privacy'}</div>
            </div>
          </div>

          <div class="card" style="margin-bottom: 16px;">
            <div class="card-title">Step 5 • Client Contact & Remarks</div>
            <div class="card-val">${formData.clientName} ${formData.companyName ? `(${formData.companyName})` : ''}</div>
            <div class="card-sub" style="font-family: monospace; font-size: 12px; margin-top: 4px;">
              Phone/WhatsApp: <strong>+91 ${formData.clientPhone}</strong> ${formData.clientEmail ? ` | Email: ${formData.clientEmail}` : ''}
            </div>
            ${formData.projectNotes ? `<div class="card-sub" style="margin-top: 6px; font-style: italic;">Notes: "${formData.projectNotes}"</div>` : ''}
          </div>

          <div class="footer-note">
            <strong>Engineering Proposal Dispatch:</strong> Our modeling engineering desk in Visakhapatnam will review these parameters, calculate LOD hours, and contact you with a formal quotation and milestone timeline.
          </div>

          <div class="contact-bar">
            <div>DHARANI TECH SOLUTIONS • Kurmannapalem, Visakhapatnam - 530046</div>
            <div style="font-weight: 700;">Ph: +91 8985829579 | info@drntechsolutions.in</div>
          </div>
        </body>
      </html>
    `;

    try {
      const iframe = document.createElement('iframe');
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = '0';
      document.body.appendChild(iframe);

      const doc = iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(htmlContent);
        doc.close();
        iframe.contentWindow?.focus();
        setTimeout(() => {
          try {
            iframe.contentWindow?.print();
          } catch (err) {
            console.warn('Iframe print failed, falling back to window.print():', err);
            window.print();
          } finally {
            setTimeout(() => {
              if (document.body.contains(iframe)) {
                document.body.removeChild(iframe);
              }
            }, 2000);
          }
        }, 300);
      } else {
        window.print();
      }
    } catch (err) {
      console.warn('Print error, falling back to window.print():', err);
      window.print();
    }
  };

  const handleDownloadScope = () => {
    const facilityLabel = FACILITY_TYPES.find(f => f.id === formData.facilityType)?.label || formData.facilityType;
    const lodObj = LOD_OPTIONS.find(l => l.level === formData.lodLevel);
    const timelineLabel = TIMELINE_OPTIONS.find(t => t.id === formData.timeline)?.label || formData.timeline;
    
    const content = `================================================================================
DHARANI TECH SOLUTIONS - ENGINEERING CONSULTANCY & BIM SERVICES
Official Project Scoping & Parameter Verification Slip
================================================================================
Ref ID: DTS-BIM-2026
Date: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
Status: Submitted for Formal Engineering Quotation

--------------------------------------------------------------------------------
STEP 1: PROJECT CLASSIFICATION & SCALE
--------------------------------------------------------------------------------
Facility Type: ${facilityLabel}
Approximate Built-up Area: ${formData.floorArea.toLocaleString()} ${formData.scaleUnit === 'sqft' ? 'Square Feet (sq ft)' : 'Square Meters (m²)'}

--------------------------------------------------------------------------------
STEP 2: MODELING DISCIPLINE SCOPE (${formData.disciplines.length} Disciplines Selected)
--------------------------------------------------------------------------------
${formData.disciplines.map(dId => {
  const disc = DISCIPLINE_OPTIONS.find(d => d.id === dId);
  return `• ${disc?.label || dId}`;
}).join('\n')}

--------------------------------------------------------------------------------
STEP 3: LEVEL OF DEVELOPMENT (LOD) & PRECISION
--------------------------------------------------------------------------------
Selected BIM Stage: ${formData.lodLevel} (${lodObj?.name || ''})
Tolerance & Scope: ${lodObj?.desc || ''}

--------------------------------------------------------------------------------
STEP 4: INPUT ASSETS & PROJECT TIMELINE
--------------------------------------------------------------------------------
Available Input Files:
${formData.inputFiles.map(f => `• ${f}`).join('\n')}
Target Timeline: ${timelineLabel}
Confidentiality: ${formData.ndaRequired ? 'Strict Mutual NDA Required' : 'Standard Engineering Privacy'}

--------------------------------------------------------------------------------
STEP 5: CLIENT CONTACT & SPECIAL NOTES
--------------------------------------------------------------------------------
Contact Person: ${formData.clientName}
Company / Organization: ${formData.companyName || 'Client / Engineering Consultant'}
Phone / WhatsApp: ${formData.clientPhone}
Email: ${formData.clientEmail || 'Not specified'}
Project Notes: ${formData.projectNotes || 'None'}

--------------------------------------------------------------------------------
OFFICE CONTACT & NEXT STEPS
--------------------------------------------------------------------------------
Our lead BIM modeling engineer will review these 5 scoping parameters, calculate LOD workload hours, and contact you directly with a formal proposal.

Office: Kurmannapalem, Duvvada Railway Station Road, Balaji Nagar, Road number-5, Visakhapatnam - 530046
Mobile/WhatsApp: +91 8985829579
Landline: 0891-4630073
Email: info@drntechsolutions.in
================================================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `DTS_Project_Scope_${(formData.clientName || 'Inquiry').replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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

        {/* Step Indicator Bar - Perfectly Aligned Selection Tabs */}
        <div className="relative z-10 flex items-center justify-between gap-1.5 sm:gap-3 mb-8 overflow-x-auto pb-2 scrollbar-none w-full">
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
              <React.Fragment key={item.step}>
                <div
                  onClick={() => !submitted && setCurrentStep(item.step)}
                  className={`flex items-center gap-2 cursor-pointer transition-all shrink-0 ${
                    isCurrent
                      ? isDarkMode ? 'text-cyan-400 font-semibold' : 'text-sky-700 font-semibold'
                      : isCompleted
                      ? isDarkMode ? 'text-slate-300' : 'text-slate-600'
                      : isDarkMode ? 'text-slate-500' : 'text-slate-400'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono border transition-all shrink-0 ${
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
                </div>
                {item.step < 5 && (
                  <div className={`flex-1 min-w-[8px] max-w-[36px] h-px hidden md:block ${
                    isDarkMode ? 'bg-slate-800' : 'bg-slate-200'
                  }`} />
                )}
              </React.Fragment>
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
                      Kurmannapalem, Duvvada Railway Station Road, Balaji Nagar, Road number-5, Visakhapatnam - 530046
                    </span>
                  </div>
                  <div className="font-mono text-xs text-sky-800 dark:text-cyan-300 whitespace-nowrap">
                    Ph: +91 8985829579 | 0891-4630073
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
          /* SUBMITTED SUCCESS VIEW & DEDICATED 5-STEP PRINTABLE SUMMARY */
          <div className="relative z-10 py-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="no-print max-w-2xl mx-auto text-center space-y-3 mb-6">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/60 border-2 border-emerald-500 flex items-center justify-center text-emerald-600 shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className={`text-2xl md:text-3xl font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Project Scope Inquiry Received!
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Thank you, <strong className="text-sky-600">{formData.clientName}</strong>. Your 5 project parameters have been recorded for formal engineering quotation.
              </p>
            </div>

            {/* Generated Scope Summary Card & Dedicated Printable Slip */}
            <div 
              id="printable-inquiry-summary"
              className={`max-w-3xl mx-auto p-6 sm:p-8 rounded-2xl border text-left space-y-5 shadow-md transition-colors ${
                isDarkMode ? 'bg-slate-900/95 border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
              }`}
            >
              {/* Header for Screen & Print */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl border border-sky-500/30 bg-white dark:bg-slate-900 flex items-center justify-center p-1.5 shrink-0 shadow-xs">
                    <img 
                      src="/assets/aistudio/dtech_favicon.png" 
                      alt="DTS Logo" 
                      className="w-full h-full object-contain" 
                    />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-extrabold uppercase tracking-tight text-sky-700 dark:text-cyan-400">
                      DHARANI TECH SOLUTIONS
                    </h4>
                    <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      Engineering Consultancy & BIM Services • Visakhapatnam Office
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right text-xs font-mono space-y-0.5">
                  <div className="font-bold text-sky-600 dark:text-cyan-300">
                    INQUIRY SCOPING SLIP
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Ref: DTS-BIM-2026
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Date: {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </div>
                </div>
              </div>

              {/* 5-Step Detailed Engineering Parameter Checklist */}
              <div className="space-y-3.5">
                <div className={`text-xs font-mono font-bold tracking-wider uppercase border-b pb-1.5 ${
                  isDarkMode ? 'text-cyan-400/90 border-slate-800' : 'text-slate-500 border-slate-200'
                }`}>
                  SUBMITTED TECHNICAL PARAMETERS (5-STEP VERIFICATION)
                </div>

                {/* Step 1: Facility Type & Built-up Area */}
                <div className={`p-4 rounded-xl border transition-colors ${
                  isDarkMode 
                    ? 'bg-slate-900/90 border-slate-800 text-slate-200' 
                    : 'bg-slate-50/90 border-slate-200 text-slate-800'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-bold font-mono ${
                      isDarkMode ? 'text-cyan-400' : 'text-sky-800'
                    }`}>
                      STEP 1: PROJECT CLASSIFICATION & SCALE
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${
                      isDarkMode 
                        ? 'bg-cyan-950/90 text-cyan-300 border-cyan-500/40' 
                        : 'bg-sky-100 text-sky-800 border-sky-200'
                    }`}>
                      VERIFIED
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className={`block text-[11px] font-mono mb-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        Facility Type:
                      </span>
                      <span className={`font-bold capitalize ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        {FACILITY_TYPES.find(f => f.id === formData.facilityType)?.label || formData.facilityType}
                      </span>
                    </div>
                    <div>
                      <span className={`block text-[11px] font-mono mb-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        Approximate Built-up Area:
                      </span>
                      <span className={`font-bold font-mono ${isDarkMode ? 'text-cyan-300' : 'text-sky-700'}`}>
                        {formData.floorArea.toLocaleString()} {formData.scaleUnit === 'sqft' ? 'Square Feet (sq ft)' : 'Square Meters (m²)'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Step 2: Selected Engineering Disciplines */}
                <div className={`p-4 rounded-xl border transition-colors ${
                  isDarkMode 
                    ? 'bg-slate-900/90 border-slate-800 text-slate-200' 
                    : 'bg-slate-50/90 border-slate-200 text-slate-800'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-bold font-mono ${
                      isDarkMode ? 'text-cyan-400' : 'text-sky-800'
                    }`}>
                      STEP 2: MODELING DISCIPLINE SCOPE ({formData.disciplines.length} Disciplines Selected)
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${
                      isDarkMode 
                        ? 'bg-cyan-950/90 text-cyan-300 border-cyan-500/40' 
                        : 'bg-sky-100 text-sky-800 border-sky-200'
                    }`}>
                      VERIFIED
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {formData.disciplines.map(dId => {
                      const disc = DISCIPLINE_OPTIONS.find(d => d.id === dId);
                      return (
                        <span 
                          key={dId}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${
                            isDarkMode 
                              ? 'bg-slate-950/90 border-slate-700/80 text-slate-200' 
                              : 'bg-white border-slate-200 text-slate-800 shadow-xs'
                          }`}
                        >
                          ✓ {disc?.label || dId}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Step 3: Level of Development (LOD) & Precision */}
                <div className={`p-4 rounded-xl border transition-colors ${
                  isDarkMode 
                    ? 'bg-slate-900/90 border-slate-800 text-slate-200' 
                    : 'bg-slate-50/90 border-slate-200 text-slate-800'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-bold font-mono ${
                      isDarkMode ? 'text-cyan-400' : 'text-sky-800'
                    }`}>
                      STEP 3: LEVEL OF DEVELOPMENT (LOD) & MODELING FIDELITY
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${
                      isDarkMode 
                        ? 'bg-cyan-950/90 text-cyan-300 border-cyan-500/40' 
                        : 'bg-sky-100 text-sky-800 border-sky-200'
                    }`}>
                      VERIFIED
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className={`block text-[11px] font-mono mb-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        Selected BIM Stage:
                      </span>
                      <span className={`font-bold font-mono ${isDarkMode ? 'text-cyan-300' : 'text-sky-700'}`}>
                        {formData.lodLevel} — {LOD_OPTIONS.find(l => l.level === formData.lodLevel)?.name}
                      </span>
                    </div>
                    <div>
                      <span className={`block text-[11px] font-mono mb-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        Model Tolerance & Scope:
                      </span>
                      <span className={`text-[11px] leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        {LOD_OPTIONS.find(l => l.level === formData.lodLevel)?.desc}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Step 4: Input Files & Delivery Timeline */}
                <div className={`p-4 rounded-xl border transition-colors ${
                  isDarkMode 
                    ? 'bg-slate-900/90 border-slate-800 text-slate-200' 
                    : 'bg-slate-50/90 border-slate-200 text-slate-800'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-bold font-mono ${
                      isDarkMode ? 'text-cyan-400' : 'text-sky-800'
                    }`}>
                      STEP 4: INPUT ASSETS & PROJECT TIMELINE
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${
                      isDarkMode 
                        ? 'bg-cyan-950/90 text-cyan-300 border-cyan-500/40' 
                        : 'bg-sky-100 text-sky-800 border-sky-200'
                    }`}>
                      VERIFIED
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className={`block text-[11px] font-mono mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        Available Input Files:
                      </span>
                      <ul className="space-y-1">
                        {formData.inputFiles.map((file, i) => (
                          <li key={i} className={`text-[11px] font-medium flex items-center gap-1.5 ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                            {file}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className={`block text-[11px] font-mono mb-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        Delivery Milestone:
                      </span>
                      <span className={`font-bold capitalize block mb-1.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        {TIMELINE_OPTIONS.find(t => t.id === formData.timeline)?.label || formData.timeline}
                      </span>
                      <span className={`block text-[11px] font-mono mb-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        Confidentiality:
                      </span>
                      <span className={`text-[11px] font-mono font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
                        {formData.ndaRequired ? 'Strict Mutual NDA Required' : 'Standard Engineering Privacy'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Step 5: Client Contact Details & Project Notes */}
                <div className={`p-4 rounded-xl border transition-colors ${
                  isDarkMode 
                    ? 'bg-slate-900/90 border-slate-800 text-slate-200' 
                    : 'bg-slate-50/90 border-slate-200 text-slate-800'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-bold font-mono ${
                      isDarkMode ? 'text-cyan-400' : 'text-sky-800'
                    }`}>
                      STEP 5: CLIENT CONTACT & SPECIAL NOTES
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${
                      isDarkMode 
                        ? 'bg-cyan-950/90 text-cyan-300 border-cyan-500/40' 
                        : 'bg-sky-100 text-sky-800 border-sky-200'
                    }`}>
                      VERIFIED
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className={`block text-[11px] font-mono mb-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        Contact Person:
                      </span>
                      <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        {formData.clientName}
                      </span>
                    </div>
                    <div>
                      <span className={`block text-[11px] font-mono mb-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        Company / Organization:
                      </span>
                      <span className={`font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        {formData.companyName || 'Client / Engineering Consultant'}
                      </span>
                    </div>
                    <div>
                      <span className={`block text-[11px] font-mono mb-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        Phone / WhatsApp:
                      </span>
                      <span className={`font-bold font-mono ${isDarkMode ? 'text-cyan-300' : 'text-sky-700'}`}>
                        {formData.clientPhone}
                      </span>
                    </div>
                  </div>
                  {formData.clientEmail && (
                    <div className="mt-2.5 text-xs">
                      <span className={`block text-[11px] font-mono mb-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        Email Address:
                      </span>
                      <span className={`font-mono font-medium ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                        {formData.clientEmail}
                      </span>
                    </div>
                  )}
                  {formData.projectNotes && (
                    <div className={`mt-2.5 pt-2.5 border-t text-xs ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                      <span className={`block text-[11px] font-mono mb-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        Client Project Notes:
                      </span>
                      <p className={`text-[11px] italic mt-0.5 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        "{formData.projectNotes}"
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Engineering Desk Next Steps Note */}
              <div className={`p-4 rounded-xl border text-xs leading-relaxed transition-colors ${
                isDarkMode 
                  ? 'border-cyan-500/30 bg-cyan-950/30 text-slate-300' 
                  : 'border-sky-200 bg-sky-50/80 text-slate-700'
              }`}>
                <span className={`font-bold block text-xs mb-1 ${
                  isDarkMode ? 'text-cyan-300' : 'text-sky-800'
                }`}>
                  Engineering Proposal Dispatch:
                </span>
                <p className="text-[11px] leading-relaxed">
                  Our lead BIM modeling engineer at the Visakhapatnam engineering desk will review these 5 scoping parameters, calculate LOD workload hours, and contact you directly at <strong className={isDarkMode ? 'text-cyan-300' : 'text-sky-700'}>{formData.clientPhone}</strong> {formData.clientEmail ? `or ${formData.clientEmail}` : ''} with a formal commercial proposal and milestone schedule.
                </p>
              </div>

              {/* Office Contact Info for Print and Records */}
              <div className={`text-[10px] font-mono pt-3 border-t flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 ${
                isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'
              }`}>
                <span>DHARANI TECH SOLUTIONS • Kurmannapalem, Duvvada Railway Station Road, Balaji Nagar, Road number-5, Visakhapatnam - 530046</span>
                <span className={`font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Ph: +91 8985829579 | info@drntechsolutions.in
                </span>
              </div>

              {/* Action Buttons (Hidden when printing via .no-print) */}
              <div className="no-print pt-3 flex flex-wrap items-center gap-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={handlePrintScope}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-102"
                  title="Print clean 5-step scoping summary"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Scope Summary</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadScope}
                  className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isDarkMode
                      ? 'bg-slate-800 hover:bg-slate-700 text-cyan-400 border-slate-700'
                      : 'bg-white hover:bg-slate-50 text-sky-700 border-slate-300 shadow-sm'
                  }`}
                  title="Download copy of 5-step scoping parameters as text file"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Summary (.TXT)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setCurrentStep(1);
                  }}
                  className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-mono text-center border transition-colors cursor-pointer ${
                    isDarkMode 
                      ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800' 
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                  }`}
                >
                  Submit Another Project Inquiry
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
