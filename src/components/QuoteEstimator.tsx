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
  MapPin,
  MessageSquare,
  ExternalLink,
  Copy,
  Check,
  X,
  FileDown
} from 'lucide-react';
import { 
  formatProposalNotification, 
  triggerServerNotification, 
  ServerNotificationResult 
} from '../utils/notificationService';
import { ServiceDisciplineLogo } from './SoftwareLogos';

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
  { id: 'scan-to-cad', label: 'Scan-to-CAD Drafting Services', sub: 'Point clouds (.rcp/.e57) converted into precise 2D AutoCAD (.DWG) plans, elevations & sections' },
  { id: 'cad-to-bim', label: 'CAD-to-BIM Conversion Services', sub: 'Legacy 2D DWGs, blueprints & PDFs transformed into intelligent 3D BIM' },
  { id: 'autocad-rebar-detailing', label: 'AutoCAD Rebar Detailing & BBS', sub: 'Reinforced concrete (RCC) shop drawings, bar bending schedules, lap lengths & placement plans' },
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
  const [copiedWhatsApp, setCopiedWhatsApp] = useState(false);
  const [serverReceipt, setServerReceipt] = useState<ServerNotificationResult | null>(null);
  const [showInquiryDocModal, setShowInquiryDocModal] = useState(false);

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

  const handleCopyWhatsApp = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedWhatsApp(true);
    setTimeout(() => setCopiedWhatsApp(false), 3500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.clientPhone) {
      alert('Please provide your name and contact phone number.');
      return;
    }

    const payload = {
      clientName: formData.clientName,
      companyName: formData.companyName,
      clientPhone: formData.clientPhone,
      clientEmail: formData.clientEmail,
      facilityType: FACILITY_TYPES.find(f => f.id === formData.facilityType)?.label || formData.facilityType,
      floorArea: formData.floorArea,
      scaleUnit: formData.scaleUnit,
      disciplines: formData.disciplines.map(dId => DISCIPLINE_OPTIONS.find(d => d.id === dId)?.label || dId),
      lodLevel: formData.lodLevel,
      inputFiles: formData.inputFiles,
      timeline: TIMELINE_OPTIONS.find(t => t.id === formData.timeline)?.label || formData.timeline,
      ndaRequired: formData.ndaRequired,
      projectNotes: formData.projectNotes
    };

    const notif = formatProposalNotification(payload);

    // 1. Direct Web3Forms submission to info@drntechsolutions.in
    try {
      const web3FormData = new FormData();
      web3FormData.append('access_key', 'a9576476-752e-4557-bdf6-1f88189baa45');
      web3FormData.append('subject', `New Project Proposal Enquiry: ${payload.clientName} (${payload.facilityType})`);
      web3FormData.append('from_name', 'Dharani Tech Solutions Estimator');
      web3FormData.append('name', payload.clientName);
      web3FormData.append('company', payload.companyName || 'Not specified');
      web3FormData.append('email', payload.clientEmail || 'no-email-provided@drntechsolutions.in');
      web3FormData.append('phone', payload.clientPhone);
      web3FormData.append('facility_type', payload.facilityType);
      web3FormData.append('floor_area', `${payload.floorArea} ${payload.scaleUnit}`);
      web3FormData.append('disciplines', payload.disciplines.join(', '));
      web3FormData.append('target_lod', payload.lodLevel);
      web3FormData.append('timeline', payload.timeline);
      web3FormData.append('notes', payload.projectNotes || 'None');

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: web3FormData
      }).catch((err) => console.warn('Web3Forms dispatch error:', err));
    } catch (err) {
      console.warn('Web3Forms exception:', err);
    }

    // 2. Server-side notification trigger to info@drntechsolutions.in & hr@drntechsolutions.in
    triggerServerNotification('/api/notifications/proposal', payload)
      .then((receipt) => {
        setServerReceipt(receipt);
      })
      .catch((err) => {
        console.warn('Server notification handled:', err);
      });

    // 2. Client-side mailto protocol fallback
    try {
      window.location.href = notif.mailtoUrl;
    } catch {
      // browser fallback
    }

    setSubmitted(true);
  };

  const generateInquiryHtmlDocument = () => {
    const facilityLabel = FACILITY_TYPES.find(f => f.id === formData.facilityType)?.label || formData.facilityType;
    const lodObj = LOD_OPTIONS.find(l => l.level === formData.lodLevel);
    const timelineLabel = TIMELINE_OPTIONS.find(t => t.id === formData.timeline)?.label || formData.timeline;
    const dateStr = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DTS Project Inquiry & Scoping Record - ${formData.clientName || 'Client'}</title>
  <style>
    @page { size: A4; margin: 12mm 15mm; }
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      background: #f8fafc;
      margin: 0;
      padding: 24px;
      font-size: 13px;
      line-height: 1.5;
    }
    .sheet {
      max-width: 820px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 12px;
      padding: 32px 36px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
    }
    .top-actions {
      max-width: 820px;
      margin: 0 auto 16px auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      font-size: 12px;
      font-weight: 700;
      border-radius: 8px;
      text-decoration: none;
      cursor: pointer;
      border: 1px solid transparent;
      transition: background 0.15s ease;
    }
    .btn-primary { background: #0284c7; color: #ffffff; border-color: #0284c7; }
    .btn-primary:hover { background: #0369a1; }
    .btn-secondary { background: #ffffff; color: #334155; border-color: #cbd5e1; }
    .btn-secondary:hover { background: #f1f5f9; }
    .header {
      border-bottom: 2px solid #0284c7;
      padding-bottom: 16px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 20px;
    }
    .logo-title {
      font-size: 20px;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.3px;
      margin: 0;
    }
    .logo-subtitle {
      font-size: 10.5px;
      font-weight: 700;
      color: #0284c7;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      margin-top: 3px;
    }
    .header-meta {
      text-align: right;
      font-size: 11px;
      font-family: monospace;
      color: #64748b;
      white-space: nowrap;
    }
    .badge {
      display: inline-block;
      background: #e0f2fe;
      color: #0369a1;
      padding: 4px 10px;
      border-radius: 6px;
      font-weight: 700;
      font-size: 11px;
      letter-spacing: 0.3px;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    h2 { font-size: 17px; margin: 0 0 4px 0; color: #0f172a; }
    .lead-text { color: #64748b; font-size: 11.5px; margin: 0 0 20px 0; }
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 16px;
    }
    .card {
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 14px 16px;
      background: #f8fafc;
    }
    .card-title {
      font-size: 10px;
      font-family: monospace;
      text-transform: uppercase;
      color: #0284c7;
      font-weight: 800;
      letter-spacing: 0.5px;
      margin-bottom: 6px;
    }
    .card-val { font-size: 14px; font-weight: 700; color: #0f172a; }
    .card-sub { font-size: 11.5px; color: #475569; margin-top: 4px; }
    .pill {
      display: inline-block;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      padding: 3px 8px;
      font-size: 11px;
      font-weight: 600;
      margin: 2px 4px 2px 0;
      color: #1e293b;
    }
    .footer-note {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 10px;
      padding: 14px 16px;
      font-size: 11.5px;
      color: #166534;
      margin-top: 18px;
      line-height: 1.55;
    }
    .contact-footer {
      border-top: 1px solid #e2e8f0;
      margin-top: 24px;
      padding-top: 14px;
      font-size: 10.5px;
      color: #64748b;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
    }
    @media print {
      body { background: #ffffff; padding: 0; }
      .sheet { border: none; box-shadow: none; padding: 0; }
      .top-actions, .no-print { display: none !important; }
      * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    }
  </style>
</head>
<body>
  <div class="top-actions no-print">
    <div style="font-size: 12px; font-weight: 600; color: #475569;">
      Dharani Tech Solutions • Official Inquiry Verification Record
    </div>
    <div style="display: flex; gap: 8px;">
      <button onclick="window.print()" class="btn btn-primary">🖨️ Print / Save as PDF</button>
    </div>
  </div>

  <div class="sheet" id="inquiry-sheet">
    <div class="header">
      <div>
        <h1 class="logo-title">DHARANI TECH SOLUTIONS</h1>
        <div class="logo-subtitle">BIM MODELING • SCAN-TO-BIM • SCAN-TO-CAD • CAD-TO-BIM • AUTOCAD WORKS</div>
      </div>
      <div class="header-meta">
        <div><strong>Ref:</strong> DTS-BIM-2026-${Math.abs(formData.clientName.split('').reduce((acc, c) => acc + c.charCodeAt(0), 1000))}</div>
        <div><strong>Date:</strong> ${dateStr}</div>
        <div style="color: #0284c7; font-weight: 700; margin-top: 2px;">STATUS: SUBMITTED</div>
      </div>
    </div>

    <div class="badge">Official Project Scoping & Parameter Record</div>
    <h2>5-Step Engineering Scoping Parameters</h2>
    <p class="lead-text">
      This official record contains all 5 virtual modeling scoping specifications submitted for engineering review, workload calculation, and formal quotation assessment.
    </p>

    <div class="grid-2">
      <div class="card">
        <div class="card-title">Step 1 • Facility Type & Built-up Scale</div>
        <div class="card-val">${facilityLabel}</div>
        <div class="card-sub">Approx. Built-up Area: <strong>${formData.floorArea.toLocaleString()} ${formData.scaleUnit === 'sqft' ? 'sq ft' : 'm²'}</strong></div>
      </div>

      <div class="card">
        <div class="card-title">Step 2 • Modeling Disciplines (${formData.disciplines.length})</div>
        <div style="margin-top: 6px;">
          ${formData.disciplines.map(dId => {
            const disc = DISCIPLINE_OPTIONS.find(d => d.id === dId);
            return `<span class="pill">${disc?.label || dId}</span>`;
          }).join('')}
        </div>
      </div>

      <div class="card">
        <div class="card-title">Step 3 • Target Level of Development</div>
        <div class="card-val">${formData.lodLevel} (${lodObj?.name || ''})</div>
        <div class="card-sub">${lodObj?.desc || ''}</div>
      </div>

      <div class="card">
        <div class="card-title">Step 4 • Assets, Turnaround & Privacy</div>
        <div class="card-val">${timelineLabel}</div>
        <div class="card-sub"><strong>Available Files:</strong> ${formData.inputFiles.join(', ') || 'To be shared'}</div>
        <div class="card-sub"><strong>Confidentiality:</strong> ${formData.ndaRequired ? 'Strict Mutual NDA Requested' : 'Standard Engineering Privacy'}</div>
      </div>
    </div>

    <div class="card" style="margin-bottom: 16px;">
      <div class="card-title">Step 5 • Client Contact & Remarks</div>
      <div class="card-val">${formData.clientName} ${formData.companyName ? `(${formData.companyName})` : ''}</div>
      <div class="card-sub" style="font-family: monospace; font-size: 12px; margin-top: 4px;">
        Phone/WhatsApp: <strong>+91 ${formData.clientPhone}</strong> ${formData.clientEmail ? ` | Email: <strong>${formData.clientEmail}</strong>` : ''}
      </div>
      ${formData.projectNotes ? `<div class="card-sub" style="margin-top: 8px; font-style: italic; background: #ffffff; padding: 8px 12px; border-radius: 6px; border: 1px dashed #cbd5e1;">Client Notes: "${formData.projectNotes}"</div>` : ''}
    </div>

    <div class="footer-note">
      <strong>Engineering Review & Quotation Dispatch:</strong> Our lead BIM modeling engineers in Visakhapatnam will review these 5 parameters, estimate LOD drafting hours, and contact you with a formal engineering proposal and milestone schedule.
    </div>

    <div class="contact-footer">
      <div><strong>Office:</strong> Kurmannapalem, Duvvada Railway Station Road, Balaji Nagar, Road No-5, Visakhapatnam - 530046</div>
      <div style="font-weight: 700; color: #0f172a;">Ph: +91 8985829579 | 0891-4630073 | info@drntechsolutions.in</div>
    </div>
  </div>
</body>
</html>`;
  };

  const handleDownloadHtmlDoc = () => {
    const htmlContent = generateInquiryHtmlDocument();
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const sanitizedName = (formData.clientName || 'Inquiry').replace(/[^a-zA-Z0-9_-]/g, '_');
    link.download = `DTS_Project_Inquiry_${sanitizedName}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrintScope = () => {
    // Open the official inquiry document modal immediately so the user can inspect and download it
    setShowInquiryDocModal(true);

    // Also attempt native print cleanly
    try {
      setTimeout(() => {
        window.print();
      }, 400);
    } catch {
      // safe fallback
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
                          className={`w-5 h-5 mt-1.5 rounded flex items-center justify-center border transition-all shrink-0 ${
                            isSelected 
                              ? 'bg-sky-600 border-sky-600 text-white' 
                              : isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-100 border-slate-300'
                          }`}
                        >
                          {isSelected && <span className="text-xs font-bold">✓</span>}
                        </div>
                        <div className="w-9 h-9 rounded-xl shrink-0 overflow-hidden flex items-center justify-center shadow-xs">
                          <ServiceDisciplineLogo serviceId={disc.id} className="w-9 h-9" />
                        </div>
                        <div className="flex-1 min-w-0">
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
          (() => {
            const proposalNotification = formatProposalNotification({
              clientName: formData.clientName,
              companyName: formData.companyName,
              clientPhone: formData.clientPhone,
              clientEmail: formData.clientEmail,
              facilityType: FACILITY_TYPES.find(f => f.id === formData.facilityType)?.label || formData.facilityType,
              floorArea: formData.floorArea,
              scaleUnit: formData.scaleUnit,
              disciplines: formData.disciplines.map(dId => DISCIPLINE_OPTIONS.find(d => d.id === dId)?.label || dId),
              lodLevel: formData.lodLevel,
              inputFiles: formData.inputFiles,
              timeline: TIMELINE_OPTIONS.find(t => t.id === formData.timeline)?.label || formData.timeline,
              ndaRequired: formData.ndaRequired,
              projectNotes: formData.projectNotes
            });

            return (
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

                {/* Automatic Email & 'Copy to WhatsApp' Prompt Card */}
                <div className="no-print max-w-2xl mx-auto mb-6 p-5 rounded-2xl border bg-gradient-to-br from-emerald-500/10 via-sky-500/10 to-teal-500/10 border-emerald-500/30 text-center space-y-3.5 shadow-sm">
                  <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span>AUTOMATED NOTIFICATION DISPATCHED TO INFO@DRNTECHSOLUTIONS.IN & HR@DRNTECHSOLUTIONS.IN</span>
                  </div>

                  {serverReceipt && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                      <span className="font-bold">✓ Server Delivery Confirmed</span>
                      <span className="opacity-70">|</span>
                      <span>Ref: {serverReceipt.messageId}</span>
                    </div>
                  )}

                  <p className={`text-xs leading-relaxed max-w-lg mx-auto ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    An automated proposal notification has been routed directly to <strong>info@drntechsolutions.in</strong>. You can also copy the structured scope to WhatsApp or open chat directly with our lead BIM engineer at <strong>+91 8985829579</strong>:
                  </p>

                  {/* Primary WhatsApp & Action Prompts with Harmonious Styling */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-1">
                    {/* Open WhatsApp Web / App directly */}
                    <a
                      href={proposalNotification.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                      title="Open chat directly in WhatsApp (+91 8985829579)"
                    >
                      <MessageSquare className="w-4 h-4 fill-current" />
                      <span>Open in WhatsApp</span>
                    </a>

                    {/* Dedicated 'Copy to WhatsApp' Button */}
                    <button
                      type="button"
                      onClick={() => handleCopyWhatsApp(proposalNotification.messageText)}
                      className={`w-full sm:w-auto px-4 py-2.5 rounded-xl font-semibold text-xs border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        copiedWhatsApp
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-700 dark:text-emerald-300'
                          : isDarkMode
                            ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                      }`}
                      title="Copy structured message to clipboard to paste in WhatsApp"
                    >
                      {copiedWhatsApp ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedWhatsApp ? 'Copied to WhatsApp!' : 'Copy to WhatsApp'}</span>
                    </button>

                    {/* Email info@drntechsolutions.in button */}
                    <a
                      href={proposalNotification.mailtoUrl}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
                      title="Send formal email to info@drntechsolutions.in"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Email info@drntechsolutions.in</span>
                    </a>
                  </div>

                  {copiedWhatsApp && (
                    <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 animate-in fade-in pt-1">
                      ✓ Pre-formatted proposal text copied to clipboard! Paste directly into WhatsApp with Dharani Tech Solutions (+91 8985829579).
                    </div>
                  )}
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

              {/* Action Buttons with Harmonious Styling and Document Download */}
              <div className="no-print pt-4 flex flex-wrap items-center gap-2.5 sm:gap-3 border-t border-slate-200 dark:border-slate-800">
                {/* Print Summary / Save as PDF */}
                <button
                  type="button"
                  onClick={handlePrintScope}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
                  title="View and print official 5-step scoping summary document"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Summary</span>
                </button>

                {/* Download Official HTML Document */}
                <button
                  type="button"
                  onClick={handleDownloadHtmlDoc}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
                  title="Download complete official Project Inquiry Document as standalone HTML page"
                >
                  <FileDown className="w-4 h-4 text-sky-400" />
                  <span>Download Inquiry (.HTML)</span>
                </button>

                {/* Download Text Record */}
                <button
                  type="button"
                  onClick={handleDownloadScope}
                  className={`w-full sm:w-auto px-3.5 py-2.5 rounded-xl text-xs font-semibold border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isDarkMode
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 shadow-2xs'
                  }`}
                  title="Download copy of scoping parameters as structured text file"
                >
                  <Download className="w-4 h-4" />
                  <span>Download (.TXT)</span>
                </button>

                {/* Direct WhatsApp Alert */}
                <a
                  href={proposalNotification.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
                  title="Direct WhatsApp notification to lead engineer (+91 8985829579)"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Alert on WhatsApp</span>
                </a>

                {/* Send Email */}
                <a
                  href={proposalNotification.mailtoUrl}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-sky-700 hover:bg-sky-600 shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
                  title="Email inquiry parameters to info@drntechsolutions.in"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Email</span>
                </a>

                {/* New Inquiry Reset */}
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setCurrentStep(1);
                  }}
                  className={`w-full sm:w-auto px-3.5 py-2.5 rounded-xl text-xs font-mono text-center border transition-colors cursor-pointer ${
                    isDarkMode 
                      ? 'bg-slate-900 hover:bg-slate-800 text-slate-400 border-slate-800' 
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-300'
                  }`}
                >
                  New Inquiry
                </button>
              </div>
            </div>
          </div>
        );
      })()
    )}
      </div>

      {/* Official Project Inquiry & Scope Document Modal View */}
      {showInquiryDocModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Control Bar */}
            <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-sky-400" />
                <span className="font-bold text-xs sm:text-sm">Official Project Inquiry & Scoping Document</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    try {
                      window.print();
                    } catch {
                      // fallback
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Print this document or Save as PDF"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Print / Save as PDF</span>
                  <span className="sm:hidden">Print</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadHtmlDoc}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Download offline HTML document file"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download (.HTML)</span>
                  <span className="sm:hidden">HTML</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowInquiryDocModal(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer ml-1"
                  title="Close preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Document Body (Rendered as exact A4 preview sheet) */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-100 dark:bg-slate-950/60">
              <div id="printable-inquiry-document" className="max-w-3xl mx-auto bg-white text-slate-900 p-6 sm:p-10 rounded-xl shadow-lg border border-slate-200">
                {/* Document Header */}
                <div className="border-b-2 border-sky-600 pb-4 mb-5 flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div>
                    <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
                      DHARANI TECH SOLUTIONS
                    </h1>
                    <div className="text-[11px] font-bold text-sky-600 uppercase tracking-wider mt-1">
                      BIM MODELING • SCAN-TO-BIM • SCAN-TO-CAD • CAD-TO-BIM • AUTOCAD WORKS
                    </div>
                  </div>
                  <div className="text-left sm:text-right font-mono text-xs text-slate-500">
                    <div><strong>Ref:</strong> DTS-BIM-2026-{Math.abs(formData.clientName.split('').reduce((acc, c) => acc + c.charCodeAt(0), 1000))}</div>
                    <div><strong>Date:</strong> {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                    <div className="text-emerald-700 font-bold mt-0.5">STATUS: SUBMITTED</div>
                  </div>
                </div>

                {/* Badge & Title */}
                <div className="inline-block bg-sky-100 text-sky-800 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-md mb-2">
                  Official Project Scoping & Parameter Record
                </div>
                <h2 className="text-lg font-bold text-slate-900">5-Step Engineering Scoping Parameters</h2>
                <p className="text-xs text-slate-500 mb-5">
                  Submitted for formal engineering review, LOD workload assessment, and commercial quotation.
                </p>

                {/* 2x2 Grid of Parameters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="border border-slate-200 rounded-lg p-3.5 bg-slate-50/80">
                    <span className="text-[10px] font-mono font-bold uppercase text-sky-700 block mb-1">
                      Step 1 • Facility Type & Built-up Area
                    </span>
                    <span className="text-sm font-bold text-slate-900 block">
                      {FACILITY_TYPES.find(f => f.id === formData.facilityType)?.label || formData.facilityType}
                    </span>
                    <span className="text-xs text-slate-600 mt-1 block">
                      Approx. Built-up: <strong>{formData.floorArea.toLocaleString()} {formData.scaleUnit === 'sqft' ? 'sq ft' : 'm²'}</strong>
                    </span>
                  </div>

                  <div className="border border-slate-200 rounded-lg p-3.5 bg-slate-50/80">
                    <span className="text-[10px] font-mono font-bold uppercase text-sky-700 block mb-1">
                      Step 2 • Modeling Disciplines ({formData.disciplines.length})
                    </span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {formData.disciplines.map(dId => {
                        const disc = DISCIPLINE_OPTIONS.find(d => d.id === dId);
                        return (
                          <span key={dId} className="px-2 py-0.5 rounded text-[11px] font-medium bg-white border border-slate-300 text-slate-800">
                            {disc?.label || dId}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div className="border border-slate-200 rounded-lg p-3.5 bg-slate-50/80">
                    <span className="text-[10px] font-mono font-bold uppercase text-sky-700 block mb-1">
                      Step 3 • Target Level of Development
                    </span>
                    <span className="text-sm font-bold text-slate-900 block">
                      {formData.lodLevel} ({LOD_OPTIONS.find(l => l.level === formData.lodLevel)?.name || ''})
                    </span>
                    <span className="text-xs text-slate-600 mt-1 block">
                      {LOD_OPTIONS.find(l => l.level === formData.lodLevel)?.desc || ''}
                    </span>
                  </div>

                  <div className="border border-slate-200 rounded-lg p-3.5 bg-slate-50/80">
                    <span className="text-[10px] font-mono font-bold uppercase text-sky-700 block mb-1">
                      Step 4 • Assets, Turnaround & Privacy
                    </span>
                    <span className="text-sm font-bold text-slate-900 block">
                      {TIMELINE_OPTIONS.find(t => t.id === formData.timeline)?.label || formData.timeline}
                    </span>
                    <span className="text-xs text-slate-600 mt-1 block">
                      <strong>Files:</strong> {formData.inputFiles.join(', ') || 'To be shared'}
                    </span>
                    <span className="text-xs text-slate-600 block">
                      <strong>Privacy:</strong> {formData.ndaRequired ? 'Strict Mutual NDA Requested' : 'Standard Engineering Privacy'}
                    </span>
                  </div>
                </div>

                {/* Client Contact & Remarks */}
                <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/80 mb-4">
                  <span className="text-[10px] font-mono font-bold uppercase text-sky-700 block mb-1">
                    Step 5 • Client Contact & Remarks
                  </span>
                  <div className="text-sm font-bold text-slate-900">
                    {formData.clientName} {formData.companyName ? `(${formData.companyName})` : ''}
                  </div>
                  <div className="font-mono text-xs text-slate-700 mt-1">
                    Phone/WhatsApp: <strong>+91 {formData.clientPhone}</strong> {formData.clientEmail ? ` | Email: ${formData.clientEmail}` : ''}
                  </div>
                  {formData.projectNotes && (
                    <div className="mt-2 text-xs italic bg-white p-2.5 rounded border border-dashed border-slate-300 text-slate-700">
                      Notes: "{formData.projectNotes}"
                    </div>
                  )}
                </div>

                {/* Engineering Dispatch Note */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3.5 text-xs text-emerald-900 leading-relaxed mb-5">
                  <strong>Engineering Proposal Dispatch:</strong> Our lead BIM modeling engineers in Visakhapatnam will review these 5 parameters, estimate LOD drafting hours, and contact you directly with a formal proposal and milestone schedule.
                </div>

                {/* Office Contact Bar */}
                <div className="border-t border-slate-200 pt-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-[10.5px] text-slate-500 font-mono">
                  <span>DHARANI TECH SOLUTIONS • Kurmannapalem, Visakhapatnam - 530046</span>
                  <span className="font-bold text-slate-800">Ph: +91 8985829579 | info@drntechsolutions.in</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
