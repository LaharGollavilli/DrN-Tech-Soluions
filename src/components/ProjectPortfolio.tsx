import React, { useState } from 'react';
import { 
  Building2, 
  Layers, 
  Sliders, 
  CheckCircle2, 
  Search, 
  ExternalLink, 
  X, 
  FileText, 
  Compass, 
  Box, 
  ShieldCheck, 
  ArrowRight,
  Maximize2,
  Cpu,
  Eye,
  Filter,
  ChevronDown
} from 'lucide-react';
import { LodLevel, Discipline } from '../types/bim';

interface ProjectPortfolioProps {
  isDarkMode?: boolean;
  onSelectProjectForQuote?: (lod: LodLevel, discipline: string) => void;
}

export interface PortfolioProject {
  id: string;
  title: string;
  sector: 'Commercial' | 'Industrial' | 'Residential' | 'Healthcare' | 'Infrastructure';
  location: string;
  builtUpArea: string;
  lodLevel: LodLevel;
  primaryDiscipline: string;
  softwareStack: string[];
  timeline: string;
  clientType: string;
  summary: string;
  challenges: string;
  engineeringSolution: string;
  deliverables: string[];
  fileFormats: string[];
  tolerances: string;
  category: 'lod100' | 'lod200' | 'lod300' | 'lod350' | 'lod400';
  blueprintType: 'high-rise' | 'industrial-steel' | 'hospital' | 'residential-mass' | 'masterplan' | 'cad-to-bim' | 'scan-to-cad' | 'mep-plant' | 'precast-bridge';
}

const PROJECTS_DATA: PortfolioProject[] = [
  {
    id: 'zenith-metro-tower',
    title: 'Zenith Apex Commercial Tower & Podium',
    sector: 'Commercial',
    location: 'Visakhapatnam / Hyderabad IT Corridor',
    builtUpArea: '485,000 sq.ft (G+32 Floors)',
    lodLevel: 'LOD 350',
    primaryDiscipline: 'Architectural, Structural & MEP Federated BIM',
    softwareStack: ['Autodesk Revit 2024', 'Navisworks Manage', 'AutoCAD', 'BIM 360 / ACC'],
    timeline: '14 Weeks',
    clientType: 'Commercial Real Estate Developer & MEP Contractor',
    summary: 'Full-scope federated BIM coordination across architectural envelope, post-tensioned slabs, and congested MEP service corridors.',
    challenges: 'High density of chilled-water risers, smoke exhaust ductwork, and cable trays competing with structural drop beams in basement parking levels.',
    engineeringSolution: 'Conducted weekly virtual coordination sessions in Navisworks Manage; resolved 340+ clashes prior to site pouring, generating clash-free sleeve penetration drawings.',
    deliverables: [
      'Federated Revit .RVT multi-discipline model',
      'Navisworks .NWD coordinated federated model with 0 unresolved hard clashes',
      '142 Permit-ready architectural & structural sheets (.DWG / .PDF)',
      'Coordinated MEP builders-work sleeve drawings with exact X/Y/Z coordinates',
      'COBie data parameters embedded for facility management handover'
    ],
    fileFormats: ['.RVT', '.NWD', '.IFC', '.DWG', '.PDF'],
    tolerances: '± 5 mm tolerance on coordinated service clearances',
    category: 'lod350',
    blueprintType: 'high-rise'
  },
  {
    id: 'coastal-logistics-peb',
    title: 'Maritime Cold Storage & PEB Logistics Hub',
    sector: 'Industrial',
    location: 'Visakhapatnam Port SEZ',
    builtUpArea: '185,000 sq.ft | High-Bay Warehouse',
    lodLevel: 'LOD 400',
    primaryDiscipline: 'Structural BIM & Rebar / Steel Fabrication Detailing',
    softwareStack: ['Autodesk Revit', 'Tekla Structures', 'AutoCAD Structural', 'Rebar CAD'],
    timeline: '8 Weeks',
    clientType: 'Turnkey Industrial EPC Contractor & Steel Fabricator',
    summary: 'Precision fabrication modeling of pre-engineered building (PEB) portal frames, overhead gantry crane brackets, and heavy equipment foundation rebar cages.',
    challenges: 'Extreme coastal soil conditions required complex isolated and pile raft foundations with dense bar bending requirements to prevent shear failures.',
    engineeringSolution: 'Authored LOD 400 structural concrete and steel models with accurate rebar couplers, stirrup spacing, and baseplate anchor bolt patterns directly exported to CNC shop saws.',
    deliverables: [
      'LOD 400 fabrication-ready structural Revit and Tekla models',
      'Automated Bar Bending Schedule (BBS) in Excel with precise cutting lengths',
      'Steel connection erection cut-sheets and bill of materials (BOM)',
      'Anchor bolt setting templates and embed plate coordinates for site engineers'
    ],
    fileFormats: ['.RVT', '.NC1', '.DWG', '.XLSX', '.PDF'],
    tolerances: '± 2 mm fabrication tolerance for structural steel connections',
    category: 'lod400',
    blueprintType: 'industrial-steel'
  },
  {
    id: 'sri-rama-medical-campus',
    title: 'Sri Rama Super Specialty Hospital & Research Wing',
    sector: 'Healthcare',
    location: 'Andhra Pradesh',
    builtUpArea: '320,000 sq.ft (600 Beds)',
    lodLevel: 'LOD 300',
    primaryDiscipline: 'Architectural BIM & Municipal Sanction Drawings',
    softwareStack: ['Autodesk Revit 2024', 'AutoCAD', 'Enscape 3D'],
    timeline: '12 Weeks',
    clientType: 'Healthcare Foundation & Lead Architecture Firm',
    summary: 'Comprehensive LOD 300 architectural model authoring covering patient wards, clean operating suites, radiation bunker walls, and fire-escape stairwells.',
    challenges: 'Stringent NABH healthcare guidelines requiring strict corridor clearances, sterile airlocks, and precise fire barrier fire-rating ratings.',
    engineeringSolution: 'Created parametric Revit families with built-in acoustic and fire-rating metadata; extracted automatic door/window/hardware schedules and permit sheets.',
    deliverables: [
      'Detailed LOD 300 Architectural .RVT Model with multi-layer wall assemblies',
      'Complete set of 68 Municipal Sanction & Working Drawing Sheets',
      'Automated Room Data Sheets (RDS) detailing finishes, ceiling heights, and door hardware',
      '3D Visual walkthroughs and sunlight shadow simulation reports'
    ],
    fileFormats: ['.RVT', '.DWG', '.PDF', '.IFC'],
    tolerances: '± 10 mm architectural construction tolerance',
    category: 'lod300',
    blueprintType: 'hospital'
  },
  {
    id: 'palm-crest-villas',
    title: 'Palm Crest Coastal Luxury Villa Enclave',
    sector: 'Residential',
    location: 'Bheemili Beach Corridor, Visakhapatnam',
    builtUpArea: '52,000 sq.ft (14 Luxury Units)',
    lodLevel: 'LOD 200',
    primaryDiscipline: 'Schematic 3D Design & Spatial Feasibility',
    softwareStack: ['Autodesk Revit', 'SketchUp Pro', 'Lumion', 'AutoCAD'],
    timeline: '4 Weeks',
    clientType: 'Boutique Real Estate Developer',
    summary: 'Preliminary schematic modeling of luxury beachfront duplexes emphasizing natural sea breeze ventilation, shaded pergolas, and optimal ocean views.',
    challenges: 'Balancing irregular coastal terrain contours with privacy sightlines and vehicular circulation.',
    engineeringSolution: 'Developed parametric LOD 200 massing layouts with generic walls, slabs, and window openings to rapidly validate floor plans and spatial volumes with the client.',
    deliverables: [
      'LOD 200 schematic Revit 3D building models',
      'Preliminary floor plans, schematic sections, and 4 exterior elevations',
      'Photorealistic 3D exterior visualization renders & landscape concept',
      'Gross Internal Area (GIA) and efficiency breakdown table'
    ],
    fileFormats: ['.RVT', '.SKP', '.DWG', '.JPEG'],
    tolerances: '± 25 mm schematic spatial layout tolerance',
    category: 'lod200',
    blueprintType: 'residential-mass'
  },
  {
    id: 'cybergateway-it-masterplan',
    title: 'CyberGateway Technology Park Urban Envelope',
    sector: 'Commercial',
    location: 'Madhurawada IT SEZ, Visakhapatnam',
    builtUpArea: '22 Acres Site | 1.8M sq.ft Massing',
    lodLevel: 'LOD 100',
    primaryDiscipline: 'Conceptual Massing & Site Feasibility Study',
    softwareStack: ['Autodesk Revit', 'FormIt', 'AutoCAD Civil 3D'],
    timeline: '2.5 Weeks',
    clientType: 'State IT Infrastructure Agency & Urban Planners',
    summary: 'Conceptual 3D building envelope volumes testing Floor Area Ratio (FAR), setback restrictions, and vehicular entry/exit access.',
    challenges: 'Steep hill gradient on the eastern boundary with strict environmental buffer zones near natural storm runoff drains.',
    engineeringSolution: 'Generated parametric LOD 100 massing blocks with real-time floor area and parking count calculators to compare 4 masterplan density options.',
    deliverables: [
      'LOD 100 3D volumetric massing model (.RVT / .DWG)',
      'Site circulation diagrams and building height zoning envelope studies',
      'Comparative FAR, ground coverage, and surface parking capacity matrix',
      'Executive masterplanning concept deck in high-res PDF'
    ],
    fileFormats: ['.RVT', '.DWG', '.PDF'],
    tolerances: '± 100 mm conceptual urban volume tolerance',
    category: 'lod100',
    blueprintType: 'masterplan'
  },
  {
    id: 'heritage-hospital-cad-to-bim',
    title: 'Heritage Civil Hospital Retrofit (CAD-to-BIM)',
    sector: 'Healthcare',
    location: 'Old Town, Visakhapatnam',
    builtUpArea: '92,000 sq.ft (Built 1968)',
    lodLevel: 'LOD 300',
    primaryDiscipline: 'CAD-to-BIM & As-Built Digital Twin Conversion',
    softwareStack: ['Autodesk Revit', 'AutoCAD', 'Autodesk Recap'],
    timeline: '6 Weeks',
    clientType: 'Public Works Department & Renovation General Contractor',
    summary: 'Conversion of fragile paper blueprints, scanned PDFs, and legacy 2D DWGs into an intelligent, error-checked 3D Revit architectural & structural model.',
    challenges: 'Missing historical structural elevations, non-orthogonal load-bearing stone walls, and outdated plumbing riser locations.',
    engineeringSolution: 'Digitally rectified and calibrated 2D CAD files; resolved dimensional discrepancies across floors and created an as-built LOD 300 parametric Revit model.',
    deliverables: [
      'LOD 300 As-Built Revit (.RVT) building model',
      'Synchronized 2D AutoCAD existing condition plans, sections, and roof layouts',
      'Structural wall thickness audit report highlighting unreinforced masonry zones',
      'Material quantity takeoffs for proposed MEP modernizations'
    ],
    fileFormats: ['.RVT', '.DWG', '.PDF', '.IFC'],
    tolerances: '± 10 mm as-built model calibration tolerance',
    category: 'lod300',
    blueprintType: 'cad-to-bim'
  },
  {
    id: 'heritage-arcade-scan-to-cad',
    title: 'Heritage Commercial Arcade (Scan-to-CAD Drafting)',
    sector: 'Commercial',
    location: 'Beach Road Heritage Quarter, Visakhapatnam',
    builtUpArea: '68,000 sq.ft (Historic Colonnade)',
    lodLevel: 'LOD 300',
    primaryDiscipline: 'Scan-to-CAD Point Cloud 2D Drafting & As-Built Plans',
    softwareStack: ['AutoCAD 2025', 'Autodesk ReCap Pro', 'CloudCompare', 'Bluebeam Revu'],
    timeline: '5 Weeks',
    clientType: 'Urban Heritage Conservation Trust & Lead Architect',
    summary: 'Vectorization of dense 3D terrestrial laser scan point clouds into millimeter-accurate 2D AutoCAD floor plans, ornate facade elevations, and wall deflection cross-sections.',
    challenges: 'Centuries-old stone masonry walls exhibited non-uniform outward leaning (up to 42mm), sagging arches, and irregular floor undulations invisible on legacy paper blueprints.',
    engineeringSolution: 'Created horizontal and vertical point cloud slice sections in Autodesk ReCap Pro; drafted layer-standardized 2D AutoCAD DWGs capturing true as-built wall thickness deviations and detailed cornice profiles.',
    deliverables: [
      'As-Built 2D Architectural Floor Plans (.DWG & .PDF) with millimeter dimensions',
      'Exterior Facade Elevations showing stone block course lines and ornate pediments',
      'Transverse & Longitudinal Sections documenting vault heights and floor deflections',
      'Structural Masonry Thickness Heatmap & Discrepancy Schedule (.PDF / .XLSX)',
      'Layer-standardized AutoCAD drawing set compliant with AIA CAD standards'
    ],
    fileFormats: ['.DWG', '.PDF', '.RCP', '.DXF'],
    tolerances: '± 3 mm accuracy calibrated against point cloud cross-sections',
    category: 'lod300',
    blueprintType: 'scan-to-cad'
  },
  {
    id: 'pharma-city-process-plant',
    title: 'BioPharma Cleanroom & Process Utility Wing',
    sector: 'Industrial',
    location: 'Jawaharlal Nehru Pharma City, Parawada',
    builtUpArea: '110,000 sq.ft | ISO 7 Cleanroom',
    lodLevel: 'LOD 350',
    primaryDiscipline: 'MEP BIM & Clash Detection Coordination',
    softwareStack: ['Autodesk Revit MEP', 'Navisworks Manage', 'Fabrication CADmep'],
    timeline: '9 Weeks',
    clientType: 'Pharmaceutical Manufacturer & Cleanroom Turnkey Contractor',
    summary: 'High-density MEP routing covering HEPA supply ducts, clean-in-place (CIP) stainless piping, purified water loops, and ceiling service catwalks.',
    challenges: 'Zero tolerance for dust traps or cross-contamination; tight 1.4m interstitial ceiling space with over 12 distinct mechanical systems.',
    engineeringSolution: 'Modeled ducts, pipes, and electrical trays with true insulation and hanger clearances; ran Navisworks hard & clearance clash matrix, delivering zero site clashes.',
    deliverables: [
      'LOD 350 Coordinated MEP Revit Model (.RVT)',
      'Navisworks Clash Matrix Audit Report (.HTML / .PDF) verifying 0 hard clashes',
      'Cleanroom ceiling penetration cutout templates for ceiling grid fabricators',
      'Spool drawings for pre-fabricated stainless steel process piping'
    ],
    fileFormats: ['.RVT', '.NWD', '.DWG', '.PDF'],
    tolerances: '± 3 mm clearance verification on sterile process lines',
    category: 'lod350',
    blueprintType: 'mep-plant'
  },
  {
    id: 'nh16-flyover-precast',
    title: 'Expressway Viaduct & Precast Pier Cap Framing',
    sector: 'Infrastructure',
    location: 'NH-16 National Highway Expansion Corridor',
    builtUpArea: '1.2 km Elevated Viaduct (42 Spans)',
    lodLevel: 'LOD 400',
    primaryDiscipline: 'Heavy Civil Structural BIM & Precast Shop Detailing',
    softwareStack: ['Autodesk Revit', 'AutoCAD', 'Civil 3D', 'Tekla'],
    timeline: '10 Weeks',
    clientType: 'National Highway Concessionaire & Precast Yard',
    summary: 'Detailed fabrication modeling of reinforced concrete piers, post-tensioned segmental box girders, and elastomeric bearing pad pedestals.',
    challenges: 'High rebar congestion at pier cap anchor zones where prestressed tendon anchors intersected multi-layered rebar stirrups.',
    engineeringSolution: 'Crafted full 3D LOD 400 rebar models with true bend radii and clash-checked tendon ducts; eliminated bar jamming during concrete placement.',
    deliverables: [
      'LOD 400 Structural Revit & Tekla precast segment models',
      'Detailed precast fabrication drawings with bar schedule (.DWG / .PDF)',
      'Tendon clash verification report and 3D reinforcement assembly views',
      'Prestressing elongation and jacking schedule documentation'
    ],
    fileFormats: ['.RVT', '.DWG', '.XLSX', '.PDF'],
    tolerances: '± 1.5 mm tolerance on tendon duct and reinforcement spacing',
    category: 'lod400',
    blueprintType: 'precast-bridge'
  }
];

// Technical Blueprint SVG Renderer - Visualizing realistic architectural and BIM drafts
const BlueprintGraphic: React.FC<{
  type: PortfolioProject['blueprintType'];
  lod: LodLevel;
  isDarkMode: boolean;
}> = ({ type, lod, isDarkMode }) => {
  // Theme color accents
  const strokeColor = isDarkMode ? '#38bdf8' : '#0284c7';
  const subStroke = isDarkMode ? '#1e293b' : '#e2e8f0';
  const gridLine = isDarkMode ? '#0f172a' : '#f1f5f9';
  const accentGold = '#f59e0b';
  const accentRed = '#ef4444';
  const accentGreen = '#10b981';

  return (
    <div className={`relative w-full h-52 sm:h-56 overflow-hidden select-none border-b transition-colors ${
      isDarkMode ? 'bg-[#080d1a] border-slate-800' : 'bg-slate-900 border-slate-200'
    }`}>
      {/* CAD Grid Background Overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`cad-grid-${type}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" strokeWidth="0.5" />
          </pattern>
          <pattern id={`cad-major-${type}`} width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="2,2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#cad-grid-${type})`} />
        <rect width="100%" height="100%" fill={`url(#cad-major-${type})`} />
      </svg>

      {/* Blueprint Specific Vector Geometry */}
      <div className="absolute inset-0 p-4 flex items-center justify-center">
        {type === 'high-rise' && (
          <svg viewBox="0 0 400 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Structural Core & High Rise Elevations */}
            <rect x="150" y="20" width="100" height="160" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="none" />
            <rect x="175" y="20" width="50" height="160" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="3,3" />
            {/* Floor Slabs */}
            {[40, 60, 80, 100, 120, 140, 160].map((y, i) => (
              <g key={i}>
                <line x1="140" y1={y} x2="260" y2={y} stroke="#38bdf8" strokeWidth="1.2" />
                <line x1="120" y1={y + 5} x2="140" y2={y + 5} stroke={accentGreen} strokeWidth="0.8" />
                <line x1="260" y1={y + 5} x2="280" y2={y + 5} stroke={accentGold} strokeWidth="0.8" />
              </g>
            ))}
            {/* Podium Base */}
            <rect x="90" y="140" width="220" height="40" stroke="#38bdf8" strokeWidth="1.5" />
            <line x1="90" y1="160" x2="310" y2="160" stroke="#64748b" strokeWidth="1" />
            {/* Column Grid Lines with Axis Callouts */}
            <line x1="150" y1="10" x2="150" y2="190" stroke="#94a3b8" strokeWidth="0.75" strokeDasharray="4,2" />
            <line x1="200" y1="10" x2="200" y2="190" stroke="#94a3b8" strokeWidth="0.75" strokeDasharray="4,2" />
            <line x1="250" y1="10" x2="250" y2="190" stroke="#94a3b8" strokeWidth="0.75" strokeDasharray="4,2" />
            <circle cx="150" cy="12" r="5" fill="#0369a1" stroke="#38bdf8" strokeWidth="1" />
            <text x="150" y="15" textAnchor="middle" fill="#ffffff" fontSize="6" fontFamily="monospace">A</text>
            <circle cx="200" cy="12" r="5" fill="#0369a1" stroke="#38bdf8" strokeWidth="1" />
            <text x="200" y="15" textAnchor="middle" fill="#ffffff" fontSize="6" fontFamily="monospace">B</text>
            <circle cx="250" cy="12" r="5" fill="#0369a1" stroke="#38bdf8" strokeWidth="1" />
            <text x="250" y="15" textAnchor="middle" fill="#ffffff" fontSize="6" fontFamily="monospace">C</text>
            {/* Dimension Strings */}
            <line x1="70" y1="20" x2="70" y2="180" stroke="#f59e0b" strokeWidth="0.8" />
            <line x1="66" y1="20" x2="74" y2="20" stroke="#f59e0b" strokeWidth="1" />
            <line x1="66" y1="180" x2="74" y2="180" stroke="#f59e0b" strokeWidth="1" />
            <text x="58" y="105" textAnchor="middle" fill="#f59e0b" fontSize="7" fontFamily="monospace" transform="rotate(-90 58 105)">H = +118.50 M</text>
            {/* Navisworks Clash Checked Tag */}
            <g transform="translate(285, 30)">
              <rect x="0" y="0" width="105" height="20" rx="3" fill="#0f172a" stroke="#10b981" strokeWidth="1" />
              <text x="52" y="13" textAnchor="middle" fill="#34d399" fontSize="7.5" fontFamily="monospace" fontWeight="bold">0 HARD CLASHES</text>
            </g>
          </svg>
        )}

        {type === 'industrial-steel' && (
          <svg viewBox="0 0 400 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* PEB Portal Frame & Rebar Detailing */}
            {/* Columns */}
            <line x1="80" y1="160" x2="80" y2="70" stroke={strokeColor} strokeWidth="2.5" />
            <line x1="320" y1="160" x2="320" y2="70" stroke={strokeColor} strokeWidth="2.5" />
            {/* Roof Rafters Pitched */}
            <line x1="80" y1="70" x2="200" y2="30" stroke={strokeColor} strokeWidth="2" />
            <line x1="320" y1="70" x2="200" y2="30" stroke={strokeColor} strokeWidth="2" />
            {/* Steel Truss Web Members */}
            {[
              [110, 60, 110, 80],
              [140, 50, 140, 80],
              [170, 40, 170, 80],
              [230, 40, 230, 80],
              [260, 50, 260, 80],
              [290, 60, 290, 80],
              [80, 70, 110, 80],
              [110, 80, 140, 50],
              [140, 80, 170, 40],
              [170, 80, 200, 30],
              [200, 30, 230, 80],
              [230, 80, 260, 50],
              [260, 80, 290, 60],
              [290, 80, 320, 70]
            ].map(([x1, y1, x2, y2], i) => (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#38bdf8" strokeWidth="0.8" />
            ))}
            {/* Crane Runway Beam */}
            <rect x="70" y="90" width="260" height="6" fill="#0369a1" stroke="#38bdf8" strokeWidth="0.75" />
            <text x="200" y="95" textAnchor="middle" fill="#ffffff" fontSize="5" fontFamily="monospace">OVERHEAD CRANE 25T CLEARANCE</text>
            {/* Foundation Rebar Cage Callout */}
            <rect x="60" y="160" width="40" height="30" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2,2" />
            <rect x="300" y="160" width="40" height="30" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2,2" />
            <line x1="80" y1="160" x2="80" y2="190" stroke="#ef4444" strokeWidth="1" />
            <line x1="320" y1="160" x2="320" y2="190" stroke="#ef4444" strokeWidth="1" />
            {/* Technical Detail Callout bubble */}
            <g transform="translate(18, 115)">
              <rect x="0" y="0" width="75" height="18" rx="2" fill="#0f172a" stroke="#f59e0b" strokeWidth="0.8" />
              <text x="37" y="12" textAnchor="middle" fill="#fcd34d" fontSize="6.5" fontFamily="monospace">LOD 400 REBAR CAGE</text>
            </g>
          </svg>
        )}

        {type === 'hospital' && (
          <svg viewBox="0 0 400 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Architectural Healthcare Floor Layout & Clean Rooms */}
            <rect x="50" y="30" width="300" height="140" stroke={strokeColor} strokeWidth="1.5" />
            {/* Central Corridor */}
            <rect x="50" y="90" width="300" height="25" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3,3" />
            <text x="200" y="106" textAnchor="middle" fill="#38bdf8" fontSize="7" fontFamily="monospace" letterSpacing="2">CENTRAL STERILE CORRIDOR (2.4M CLR)</text>
            {/* Operating Theatres & Patient Bays */}
            <rect x="60" y="40" width="60" height="40" stroke="#94a3b8" strokeWidth="1" />
            <text x="90" y="62" textAnchor="middle" fill="#ffffff" fontSize="6.5" fontFamily="monospace">OT SUITE 1</text>
            <rect x="130" y="40" width="60" height="40" stroke="#94a3b8" strokeWidth="1" />
            <text x="160" y="62" textAnchor="middle" fill="#ffffff" fontSize="6.5" fontFamily="monospace">OT SUITE 2</text>
            <rect x="200" y="40" width="70" height="40" stroke="#94a3b8" strokeWidth="1" />
            <text x="235" y="62" textAnchor="middle" fill="#ffffff" fontSize="6.5" fontFamily="monospace">ICU WING</text>
            <rect x="280" y="40" width="60" height="40" stroke="#ef4444" strokeWidth="1" />
            <text x="310" y="62" textAnchor="middle" fill="#f87171" fontSize="6" fontFamily="monospace">FIRE AIRLOCK</text>

            <rect x="60" y="125" width="70" height="35" stroke="#94a3b8" strokeWidth="1" />
            <text x="95" y="145" textAnchor="middle" fill="#ffffff" fontSize="6.5" fontFamily="monospace">PATIENT BAY A</text>
            <rect x="140" y="125" width="70" height="35" stroke="#94a3b8" strokeWidth="1" />
            <text x="175" y="145" textAnchor="middle" fill="#ffffff" fontSize="6.5" fontFamily="monospace">PATIENT BAY B</text>
            <rect x="220" y="125" width="60" height="35" stroke="#94a3b8" strokeWidth="1" />
            <text x="250" y="145" textAnchor="middle" fill="#ffffff" fontSize="6.5" fontFamily="monospace">NURSE STN</text>
            <rect x="290" y="125" width="50" height="35" stroke="#10b981" strokeWidth="1" />
            <text x="315" y="145" textAnchor="middle" fill="#34d399" fontSize="6" fontFamily="monospace">PHARMACY</text>
            {/* Dimensions */}
            <line x1="50" y1="180" x2="350" y2="180" stroke="#f59e0b" strokeWidth="0.8" />
            <text x="200" y="192" textAnchor="middle" fill="#f59e0b" fontSize="7" fontFamily="monospace">SPAN = 45,000 MM (LOD 300 PARAMETRIC)</text>
          </svg>
        )}

        {type === 'residential-mass' && (
          <svg viewBox="0 0 400 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Isometric Villa Massing */}
            {/* Ground Plane */}
            <polygon points="200,20 340,90 200,170 60,90" stroke="#334155" strokeWidth="1" fill="#0f172a" />
            {/* Villa 1 Block */}
            <polygon points="150,80 210,50 250,70 190,100" fill="#0369a1" stroke="#38bdf8" strokeWidth="1.2" />
            <polygon points="150,80 190,100 190,140 150,120" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.2" />
            <polygon points="250,70 190,100 190,140 250,110" fill="#075985" stroke="#38bdf8" strokeWidth="1.2" />
            {/* Cantilevered Balcony */}
            <polygon points="130,90 170,70 180,75 140,95" fill="#f59e0b" stroke="#fcd34d" strokeWidth="1" />
            {/* Sun Vector Vector */}
            <line x1="310" y1="30" x2="250" y2="70" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,3" />
            <circle cx="310" cy="30" r="8" fill="#f59e0b" />
            <text x="310" y="16" textAnchor="middle" fill="#fcd34d" fontSize="6.5" fontFamily="monospace">SOLAR PATH 10:30 AM</text>
            {/* LOD 200 Label */}
            <g transform="translate(70, 30)">
              <rect x="0" y="0" width="85" height="18" rx="2" fill="#0f172a" stroke="#38bdf8" strokeWidth="0.8" />
              <text x="42" y="12" textAnchor="middle" fill="#38bdf8" fontSize="7" fontFamily="monospace">LOD 200 SCHEMATIC</text>
            </g>
          </svg>
        )}

        {type === 'masterplan' && (
          <svg viewBox="0 0 400 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Masterplan Zoning Boundary & Volumetric Massing Envelopes */}
            {/* Site Boundary */}
            <polygon points="40,30 360,20 330,170 60,180" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,2" />
            <text x="180" y="22" textAnchor="middle" fill="#f59e0b" fontSize="7" fontFamily="monospace">MUNICIPAL PROPERTY SETBACK LINE</text>
            {/* Building Envelopes */}
            <rect x="80" y="50" width="70" height="50" fill="#0369a1" stroke="#38bdf8" strokeWidth="1" />
            <text x="115" y="77" textAnchor="middle" fill="#ffffff" fontSize="6.5" fontFamily="monospace">BLOCK A (G+14)</text>
            <rect x="170" y="45" width="80" height="60" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" />
            <text x="210" y="77" textAnchor="middle" fill="#ffffff" fontSize="6.5" fontFamily="monospace">BLOCK B (G+22)</text>
            <rect x="270" y="60" width="55" height="65" fill="#0369a1" stroke="#38bdf8" strokeWidth="1" />
            <text x="297" y="95" textAnchor="middle" fill="#ffffff" fontSize="6.5" fontFamily="monospace">BLOCK C (G+18)</text>
            {/* Roadway & Green Corridors */}
            <path d="M 50,140 Q 180,110 340,150" stroke="#10b981" strokeWidth="3" strokeDasharray="none" />
            <text x="200" y="145" textAnchor="middle" fill="#34d399" fontSize="6" fontFamily="monospace">CENTRAL ARTERIAL SPINE (24M ROW)</text>
            {/* Metric Stamp */}
            <g transform="translate(80, 115)">
              <rect x="0" y="0" width="100" height="18" rx="2" fill="#0f172a" stroke="#64748b" strokeWidth="0.8" />
              <text x="50" y="12" textAnchor="middle" fill="#cbd5e1" fontSize="6.5" fontFamily="monospace">FAR 3.20 ACHIEVED</text>
            </g>
          </svg>
        )}

        {type === 'cad-to-bim' && (
          <svg viewBox="0 0 400 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Split Screen: Left = Flat 2D CAD DWG lines; Right = Parametric 3D Revit Model */}
            {/* Split line */}
            <line x1="200" y1="10" x2="200" y2="190" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="4,3" />
            
            {/* Left Side: 2D CAD Drawings */}
            <text x="100" y="24" textAnchor="middle" fill="#94a3b8" fontSize="7.5" fontFamily="monospace" fontWeight="bold">INPUT: 2D CAD DRAWINGS</text>
            <rect x="30" y="35" width="140" height="120" stroke="#64748b" strokeWidth="1" strokeDasharray="none" />
            <line x1="30" y1="75" x2="170" y2="75" stroke="#64748b" strokeWidth="0.75" />
            <line x1="100" y1="35" x2="100" y2="155" stroke="#64748b" strokeWidth="0.75" />
            {/* CAD Door Arc */}
            <path d="M 80,75 A 20,20 0 0,1 100,55" stroke="#38bdf8" strokeWidth="0.8" />
            <line x1="80" y1="75" x2="100" y2="75" stroke="#38bdf8" strokeWidth="0.8" />
            <circle cx="50" cy="115" r="4" stroke="#94a3b8" strokeWidth="0.5" />
            <text x="50" y="117" textAnchor="middle" fill="#94a3b8" fontSize="5" fontFamily="monospace">W1</text>
            <text x="100" y="170" textAnchor="middle" fill="#ef4444" fontSize="6" fontFamily="monospace">LEGACY UNCHECKED 2D DWG</text>

            {/* Right Side: Intelligent 3D Parametric BIM */}
            <text x="300" y="24" textAnchor="middle" fill="#38bdf8" fontSize="7.5" fontFamily="monospace" fontWeight="bold">OUTPUT: LOD 300 PARAMETRIC BIM</text>
            <polygon points="230,120 300,75 370,120 300,165" fill="#0369a1" stroke="#38bdf8" strokeWidth="1.2" />
            <polygon points="230,120 230,70 300,25 300,75" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.2" />
            <polygon points="300,75 300,25 370,70 370,120" fill="#075985" stroke="#38bdf8" strokeWidth="1.2" />
            {/* Parametric Window */}
            <polygon points="250,90 270,78 270,62 250,74" fill="#38bdf8" stroke="#ffffff" strokeWidth="0.8" />
            <text x="300" y="180" textAnchor="middle" fill="#10b981" fontSize="6.5" fontFamily="monospace">INTELLIGENT PARAMETRIC .RVT</text>
          </svg>
        )}

        {type === 'scan-to-cad' && (
          <svg viewBox="0 0 400 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Split Screen: 3D Laser Scan Point Cloud (Left) to 2D AutoCAD Vector Plan (Right) */}
            <line x1="200" y1="20" x2="200" y2="185" stroke="#334155" strokeWidth="1" strokeDasharray="3,3" />

            {/* Left Side: Laser Scan Point Cloud (.RCP) */}
            <text x="100" y="24" textAnchor="middle" fill="#34d399" fontSize="7.5" fontFamily="monospace" fontWeight="bold">INPUT: 3D LASER POINT CLOUD</text>
            
            {/* Cloud of Points / Sliced Wall Nodes */}
            {[
              [35, 55], [45, 54], [55, 56], [65, 55], [75, 57], [85, 55], [95, 56], [105, 54], [115, 55], [125, 57], [135, 55], [145, 56], [155, 54],
              [35, 145], [45, 146], [55, 144], [65, 145], [75, 147], [85, 145], [95, 146], [105, 144], [115, 145], [125, 147], [135, 145], [145, 146], [155, 145],
              [35, 70], [36, 85], [34, 100], [35, 115], [36, 130],
              [155, 70], [156, 85], [154, 100], [155, 115], [156, 130],
              [95, 70], [96, 85], [94, 100], [95, 115], [96, 130]
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="1.3" fill="#34d399" opacity="0.85" />
            ))}

            {/* Scatter Noise Points Representing Real Scan Data */}
            {[
              [50, 80], [60, 95], [120, 85], [130, 110], [70, 125], [140, 75]
            ].map(([cx, cy], i) => (
              <circle key={`noise-${i}`} cx={cx} cy={cy} r="0.9" fill="#10b981" opacity="0.45" />
            ))}

            {/* Reticle Scanner Origin */}
            <circle cx="95" cy="100" r="14" stroke="#34d399" strokeWidth="0.8" strokeDasharray="2,2" />
            <line x1="95" y1="80" x2="95" y2="120" stroke="#34d399" strokeWidth="0.6" strokeDasharray="1,2" opacity="0.6" />
            <line x1="75" y1="100" x2="115" y2="100" stroke="#34d399" strokeWidth="0.6" strokeDasharray="1,2" opacity="0.6" />
            <text x="100" y="172" textAnchor="middle" fill="#6ee7b7" fontSize="6.5" fontFamily="monospace">E57 / RCP DENSE SLICE</text>

            {/* Right Side: Clean 2D AutoCAD Vector Plan (.DWG) */}
            <text x="300" y="24" textAnchor="middle" fill="#38bdf8" fontSize="7.5" fontFamily="monospace" fontWeight="bold">OUTPUT: 2D AUTOCAD (.DWG)</text>
            
            {/* Main Outer Walls - AutoCAD Red/Cyan Layer */}
            <rect x="235" y="55" width="130" height="90" fill="#0f172a" stroke="#ef4444" strokeWidth="1.6" />
            <rect x="242" y="62" width="116" height="76" fill="#0b132b" stroke="#cbd5e1" strokeWidth="1" />
            
            {/* Interior Partition Wall */}
            <line x1="298" y1="62" x2="298" y2="138" stroke="#ef4444" strokeWidth="1.5" />
            
            {/* Door Opening with Swing Arc */}
            <line x1="260" y1="138" x2="276" y2="138" stroke="#0b132b" strokeWidth="3" />
            <path d="M 260,138 Q 260,122 276,122" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2,1" fill="none" />
            <line x1="260" y1="138" x2="260" y2="122" stroke="#38bdf8" strokeWidth="1.2" />

            {/* Window Openings */}
            <line x1="242" y1="80" x2="242" y2="105" stroke="#38bdf8" strokeWidth="2.5" />
            <line x1="358" y1="80" x2="358" y2="105" stroke="#38bdf8" strokeWidth="2.5" />

            {/* Dimension Lines */}
            <line x1="235" y1="46" x2="365" y2="46" stroke="#f59e0b" strokeWidth="0.8" />
            <line x1="235" y1="42" x2="235" y2="50" stroke="#f59e0b" strokeWidth="0.8" />
            <line x1="365" y1="42" x2="365" y2="50" stroke="#f59e0b" strokeWidth="0.8" />
            <text x="300" y="43" textAnchor="middle" fill="#fde047" fontSize="5.5" fontFamily="monospace">12,450 MM (±3MM ACCURACY)</text>

            <text x="300" y="172" textAnchor="middle" fill="#38bdf8" fontSize="6.5" fontFamily="monospace">STANDARDIZED AIA LAYERS</text>
          </svg>
        )}

        {type === 'mep-plant' && (
          <svg viewBox="0 0 400 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* High-Density Coordinated MEP Piping & Ductwork */}
            {/* Supply Air Duct (Cyan/Blue) */}
            <rect x="40" y="40" width="320" height="28" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="200" y="58" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontFamily="monospace" fontWeight="bold">SUPPLY AIR DUCT 1200 x 600 MM</text>
            {/* Duct Hangers */}
            {[60, 120, 180, 240, 300, 340].map((x, i) => (
              <line key={i} x1={x} y1="20" x2={x} y2="40" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
            ))}
            {/* Chilled Water Supply & Return (Deep Blue / Teal) */}
            <line x1="40" y1="90" x2="360" y2="90" stroke="#0ea5e9" strokeWidth="6" />
            <line x1="40" y1="105" x2="360" y2="105" stroke="#0284c7" strokeWidth="6" />
            <text x="80" y="100" fill="#ffffff" fontSize="6" fontFamily="monospace">CHW-S / CHW-R 150ø</text>
            {/* Fire Protection Sprinkler Main (Red) */}
            <line x1="40" y1="130" x2="360" y2="130" stroke="#ef4444" strokeWidth="3.5" />
            {[80, 150, 220, 290].map((x, i) => (
              <g key={i}>
                <line x1={x} y1="130" x2={x} y2="148" stroke="#ef4444" strokeWidth="2" />
                <circle cx={x} cy="150" r="3" fill="#fca5a5" stroke="#ef4444" strokeWidth="1" />
              </g>
            ))}
            <text x="180" y="126" fill="#fca5a5" fontSize="6" fontFamily="monospace">FIRE PROTECTION SPRINKLER MAIN 100ø</text>
            {/* Cable Tray (Yellow/Amber) */}
            <rect x="40" y="160" width="320" height="12" fill="#78350f" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,3" />
            <text x="200" y="169" textAnchor="middle" fill="#fde047" fontSize="6" fontFamily="monospace">ELECTRICAL LADDER TRAY 450 MM</text>
            {/* Navisworks Clearance Verification Box */}
            <g transform="translate(260, 80)">
              <rect x="0" y="0" width="95" height="18" rx="2" fill="#0f172a" stroke="#10b981" strokeWidth="1" />
              <text x="47" y="12" textAnchor="middle" fill="#34d399" fontSize="6.5" fontFamily="monospace">LOD 350 VERIFIED</text>
            </g>
          </svg>
        )}

        {type === 'precast-bridge' && (
          <svg viewBox="0 0 400 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Civil Precast Pier Cap & Prestressing Tendon Ducting */}
            {/* Pier Shaft */}
            <rect x="170" y="110" width="60" height="80" fill="#0f172a" stroke={strokeColor} strokeWidth="1.5" />
            <line x1="170" y1="140" x2="230" y2="140" stroke="#64748b" strokeWidth="1" strokeDasharray="2,2" />
            {/* Pier Cap Cantilever */}
            <polygon points="60,60 340,60 310,110 90,110" fill="#0369a1" stroke="#38bdf8" strokeWidth="1.5" />
            {/* Bearing Pedestals */}
            <rect x="90" y="48" width="35" height="12" fill="#0f172a" stroke="#f59e0b" strokeWidth="1" />
            <rect x="150" y="48" width="35" height="12" fill="#0f172a" stroke="#f59e0b" strokeWidth="1" />
            <rect x="215" y="48" width="35" height="12" fill="#0f172a" stroke="#f59e0b" strokeWidth="1" />
            <rect x="275" y="48" width="35" height="12" fill="#0f172a" stroke="#f59e0b" strokeWidth="1" />
            {/* Parabolic Post-Tensioning Cable Profile */}
            <path d="M 70,70 Q 200,105 330,70" stroke="#ef4444" strokeWidth="2.5" fill="none" />
            <text x="200" y="88" textAnchor="middle" fill="#fca5a5" fontSize="6" fontFamily="monospace">POST-TENSIONED TENDON DUCT 19T15</text>
            {/* Rebar Stirrup Cage Lines */}
            {[100, 130, 160, 190, 220, 250, 280, 300].map((x, i) => (
              <line key={i} x1={x} y1="65" x2={x} y2="105" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="2,1" />
            ))}
            <g transform="translate(18, 18)">
              <rect x="0" y="0" width="105" height="18" rx="2" fill="#0f172a" stroke="#f59e0b" strokeWidth="0.8" />
              <text x="52" y="12" textAnchor="middle" fill="#fcd34d" fontSize="6.5" fontFamily="monospace">LOD 400 SHOP DRAWINGS</text>
            </g>
          </svg>
        )}
      </div>

      {/* Blueprint Coordinates & Ticks Header Banner */}
      <div className="absolute top-2 left-3 right-3 flex items-center justify-between text-[9px] font-mono tracking-wider text-slate-400 pointer-events-none">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
          GRID: X_REF {type.toUpperCase().slice(0, 8)}
        </span>
        <span className="bg-slate-950/80 px-2 py-0.5 rounded text-cyan-300 border border-slate-800">
          {lod} CAD/BIM
        </span>
      </div>

      {/* Bottom Scale Rule Marker */}
      <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[8px] font-mono text-slate-500 pointer-events-none">
        <span>0.00 M</span>
        <span className="h-0.5 flex-1 mx-3 bg-slate-700/60 relative">
          <span className="absolute left-1/4 top-[-2px] w-[1px] h-[5px] bg-slate-500"></span>
          <span className="absolute left-2/4 top-[-2px] w-[1px] h-[5px] bg-slate-500"></span>
          <span className="absolute left-3/4 top-[-2px] w-[1px] h-[5px] bg-slate-500"></span>
        </span>
        <span>SCALE: 1:100 (METRIC)</span>
      </div>
    </div>
  );
};

// Interactive LOD Capability Visualizer Slider (Comparing LOD 100 -> LOD 400 on an architectural building element)
const LodEvolutionSandbox: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const [selectedLod, setSelectedLod] = useState<LodLevel>('LOD 300');

  const lodDescriptions: Record<LodLevel, {
    title: string;
    description: string;
    details: string[];
    geometry: string;
    tolerance: string;
  }> = {
    'LOD 100': {
      title: 'Conceptual Massing & Site Envelopes',
      description: 'Building elements modeled as conceptual 3D mass volumes, overall height, and gross floor areas without detailed interior geometry.',
      details: ['Gross volume & envelope', 'Site setback zoning check', 'Conceptual orientation & shade study'],
      geometry: 'Generic solid bounding box',
      tolerance: '± 100 mm to ± 500 mm'
    },
    'LOD 200': {
      title: 'Schematic Design & Spatial Geometry',
      description: 'Building elements modeled with approximate dimensions, shape, location, and orientation. Used for preliminary layouts.',
      details: ['Approximate wall & slab thickness', 'Generic door and window openings', 'Preliminary structural grid spacing'],
      geometry: 'Simplified 3D solids with basic openings',
      tolerance: '± 25 mm to ± 50 mm'
    },
    'LOD 300': {
      title: 'Detailed Design & Permit Documentation',
      description: 'Elements modeled with specific dimensions, true layered assemblies (drywall, insulation, masonry), and permit-ready drawing sheets.',
      details: ['Parametric Revit families with true assemblies', 'Exact door/window schedules & tags', 'Municipal sanction-ready sheets & BOQs'],
      geometry: 'Fully defined multi-layer assemblies',
      tolerance: '± 10 mm to ± 15 mm'
    },
    'LOD 350': {
      title: 'Coordinated Construction & Clash-Free Model',
      description: 'Cross-discipline interfaces modeled to resolve interferences between structural beams, slabs, and MEP ducts/piping/hangers.',
      details: ['Slab penetration sleeves with coordinates', 'MEP hanger and support clearance checks', '0 hard clashes in Navisworks federated model'],
      geometry: 'Coordinated geometry with exact interfaces',
      tolerance: '± 5 mm'
    },
    'LOD 400': {
      title: 'Fabrication, Shop Level & Rebar Detailing',
      description: 'Elements modeled with fabrication-level precision including individual rebar bars, stirrups, weld plates, anchor bolts, and shop cut-sheets.',
      details: ['Bar Bending Schedule (BBS) direct export', 'Precast embed plates & bolt hole patterns', 'Direct CNC and fabrication machine output'],
      geometry: 'Fabrication-level parts with true rebar & fasteners',
      tolerance: '± 1.5 mm to ± 2 mm'
    }
  };

  const current = lodDescriptions[selectedLod];

  return (
    <div className={`p-5 sm:p-7 rounded-2xl border transition-colors mb-10 ${
      isDarkMode 
        ? 'bg-slate-900/80 border-slate-800' 
        : 'bg-white border-slate-200 shadow-xs'
    }`}>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-sky-600 dark:text-cyan-400 uppercase tracking-wider mb-1">
            <Cpu className="w-4 h-4" />
            <span>Interactive Modeling Fidelity Inspector</span>
          </div>
          <h3 className={`text-lg sm:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            How an Architectural & Structural Assembly Evolves Across LOD 100–400
          </h3>
          <p className={`text-xs sm:text-sm mt-1 max-w-2xl ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Select an LOD stage below to inspect the geometric fidelity, model data depth, and construction deliverables authored by Dharani Tech Solutions.
          </p>
        </div>

        {/* LOD Switcher Tabs */}
        <div className={`flex items-center p-1 rounded-xl border flex-wrap sm:flex-nowrap gap-1 ${
          isDarkMode ? 'bg-[#080d1a] border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          {(['LOD 100', 'LOD 200', 'LOD 300', 'LOD 350', 'LOD 400'] as LodLevel[]).map((level) => {
            const isSelected = selectedLod === level;
            return (
              <button
                key={level}
                onClick={() => setSelectedLod(level)}
                className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-sky-600 text-white shadow-xs'
                    : isDarkMode
                    ? 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                }`}
              >
                {level}
              </button>
            );
          })}
        </div>
      </div>

      {/* Visual Sandbox Comparison Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-center">
        {/* Interactive SVG Diagram Illustrating the Element at selected LOD */}
        <div className="lg:col-span-6">
          <div className={`p-4 rounded-xl border relative h-64 sm:h-72 overflow-hidden flex items-center justify-center ${
            isDarkMode ? 'bg-[#080d1a] border-slate-800' : 'bg-slate-950 border-slate-800'
          }`}>
            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>

            {/* Dynamic Visual Representation of the Element */}
            <svg viewBox="0 0 320 220" className="w-full h-full relative z-10" fill="none">
              {/* Floor Slab Datum */}
              <line x1="30" y1="180" x2="290" y2="180" stroke="#475569" strokeWidth="1.5" />
              <text x="40" y="195" fill="#64748b" fontSize="7" fontFamily="monospace">FFL +0.00 M</text>
              <line x1="30" y1="40" x2="290" y2="40" stroke="#475569" strokeWidth="1.5" />
              <text x="40" y="32" fill="#64748b" fontSize="7" fontFamily="monospace">TOB +3.60 M</text>

              {selectedLod === 'LOD 100' && (
                /* Simple Massing Cuboid */
                <g>
                  <polygon points="120,60 200,60 220,90 140,90" fill="#0369a1" stroke="#38bdf8" strokeWidth="1.5" />
                  <polygon points="120,60 140,90 140,180 120,150" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
                  <polygon points="200,60 220,90 220,180 200,150" fill="#075985" stroke="#38bdf8" strokeWidth="1.5" />
                  <rect x="140" y="90" width="80" height="90" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" opacity="0.6" />
                  <text x="160" y="130" textAnchor="middle" fill="#ffffff" fontSize="9" fontFamily="monospace" fontWeight="bold">LOD 100</text>
                  <text x="160" y="142" textAnchor="middle" fill="#93c5fd" fontSize="7" fontFamily="monospace">MASS VOLUME</text>
                </g>
              )}

              {selectedLod === 'LOD 200' && (
                /* Schematic Wall with Approximate Window Cutout */
                <g>
                  <rect x="100" y="50" width="120" height="130" fill="#0369a1" stroke="#38bdf8" strokeWidth="1.5" />
                  <rect x="130" y="80" width="60" height="50" fill="#080d1a" stroke="#93c5fd" strokeWidth="1" strokeDasharray="3,3" />
                  <text x="160" y="105" textAnchor="middle" fill="#93c5fd" fontSize="7" fontFamily="monospace">GENERIC OPENING</text>
                  <line x1="80" y1="50" x2="80" y2="180" stroke="#f59e0b" strokeWidth="1" />
                  <text x="70" y="115" textAnchor="middle" fill="#f59e0b" fontSize="7" fontFamily="monospace" transform="rotate(-90 70 115)">H ≈ 3600 MM</text>
                  <text x="160" y="165" textAnchor="middle" fill="#ffffff" fontSize="8" fontFamily="monospace">LOD 200 SCHEMATIC</text>
                </g>
              )}

              {selectedLod === 'LOD 300' && (
                /* Detailed Layered Wall + Parametric Window + Beam Assembly */
                <g>
                  {/* Concrete Core Column */}
                  <rect x="90" y="40" width="45" height="140" fill="#075985" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="112" y="110" textAnchor="middle" fill="#ffffff" fontSize="6.5" fontFamily="monospace" transform="rotate(-90 112 110)">RCC COL 450x450</text>
                  {/* Multi-Layer Wall Assembly */}
                  <rect x="135" y="50" width="12" height="130" fill="#334155" stroke="#94a3b8" strokeWidth="0.8" />
                  <rect x="147" y="50" width="20" height="130" fill="#f59e0b" stroke="#fcd34d" strokeWidth="0.8" opacity="0.8" />
                  <rect x="167" y="50" width="10" height="130" fill="#0284c7" stroke="#38bdf8" strokeWidth="0.8" />
                  {/* Parametric Window with Aluminum Frame & Double Glazing */}
                  <rect x="177" y="70" width="75" height="70" fill="#080d1a" stroke="#38bdf8" strokeWidth="1.2" />
                  <line x1="214" y1="70" x2="214" y2="140" stroke="#38bdf8" strokeWidth="1" />
                  <line x1="177" y1="105" x2="252" y2="105" stroke="#38bdf8" strokeWidth="1" />
                  {/* Callout lines */}
                  <line x1="157" y1="50" x2="190" y2="30" stroke="#fcd34d" strokeWidth="0.8" />
                  <text x="195" y="32" fill="#fcd34d" fontSize="6.5" fontFamily="monospace">INSULATION LAYER 50mm</text>
                  <line x1="214" y1="70" x2="245" y2="55" stroke="#38bdf8" strokeWidth="0.8" />
                  <text x="250" y="57" fill="#38bdf8" fontSize="6.5" fontFamily="monospace">DGU ALUMINUM MULLION</text>
                </g>
              )}

              {selectedLod === 'LOD 350' && (
                /* Multi-discipline Coordinated: Beam + MEP Duct Passing through Sleeve + Hanger Rod */
                <g>
                  {/* Structural Concrete Beam */}
                  <rect x="70" y="40" width="180" height="50" fill="#075985" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="120" y="68" fill="#ffffff" fontSize="7" fontFamily="monospace">RCC BEAM 450x600</text>
                  {/* Coordinated Sleeve Penetration */}
                  <circle cx="210" cy="65" r="16" fill="#080d1a" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2,2" />
                  <text x="210" y="67" textAnchor="middle" fill="#ef4444" fontSize="5.5" fontFamily="monospace">SLEEVE 300ø</text>
                  {/* MEP HVAC Duct Passing */}
                  <rect x="40" y="110" width="240" height="30" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="160" y="128" textAnchor="middle" fill="#ffffff" fontSize="7" fontFamily="monospace" fontWeight="bold">HVAC SUPPLY DUCT 600x300</text>
                  {/* Trapeze Hanger Supports */}
                  <line x1="60" y1="40" x2="60" y2="150" stroke="#f59e0b" strokeWidth="1.2" />
                  <line x1="260" y1="40" x2="260" y2="150" stroke="#f59e0b" strokeWidth="1.2" />
                  <line x1="50" y1="145" x2="270" y2="145" stroke="#f59e0b" strokeWidth="1.5" />
                  {/* Clash Clearance Verification Tag */}
                  <rect x="180" y="155" width="100" height="16" rx="2" fill="#0f172a" stroke="#10b981" strokeWidth="1" />
                  <text x="230" y="166" textAnchor="middle" fill="#34d399" fontSize="6.5" fontFamily="monospace">75mm CLEARANCE OK</text>
                </g>
              )}

              {selectedLod === 'LOD 400' && (
                /* Fabrication & Rebar Level: Steel Cage, Stirrup Ties, Anchor Plates */
                <g>
                  {/* Column Profile Outline */}
                  <rect x="100" y="40" width="120" height="140" fill="#080d1a" stroke="#64748b" strokeWidth="1" strokeDasharray="3,3" />
                  {/* Longitudinal Main Rebar Bars (8-T25) */}
                  {[
                    [115, 55], [160, 55], [205, 55],
                    [115, 110], [205, 110],
                    [115, 165], [160, 165], [205, 165]
                  ].map(([x, y], i) => (
                    <circle key={i} cx={x} cy={y} r="5" fill="#ef4444" stroke="#fca5a5" strokeWidth="1" />
                  ))}
                  {/* Rebar Stirrups / Ties (T10 @ 100mm c/c) */}
                  <rect x="110" y="50" width="100" height="120" rx="4" fill="none" stroke="#f59e0b" strokeWidth="1.8" />
                  <rect x="112" y="52" width="96" height="116" rx="3" fill="none" stroke="#38bdf8" strokeWidth="0.8" />
                  {/* Rebar Ties & Diamond Tie */}
                  <polygon points="160,50 210,110 160,170 110,110" fill="none" stroke="#10b981" strokeWidth="1" />
                  {/* Fabrication Embed Plate with Welded Studs */}
                  <rect x="80" y="90" width="12" height="40" fill="#94a3b8" stroke="#ffffff" strokeWidth="1" />
                  <line x1="92" y1="98" x2="110" y2="98" stroke="#ffffff" strokeWidth="1.5" />
                  <line x1="92" y1="122" x2="110" y2="122" stroke="#ffffff" strokeWidth="1.5" />
                  {/* Fabrication Callout */}
                  <text x="250" y="80" fill="#fca5a5" fontSize="6.5" fontFamily="monospace">8-T25 (Fe500D)</text>
                  <text x="250" y="95" fill="#fcd34d" fontSize="6.5" fontFamily="monospace">T10 STIRRUPS @ 100 c/c</text>
                  <text x="250" y="110" fill="#ffffff" fontSize="6.5" fontFamily="monospace">BBS CUT-SHEET READY</text>
                </g>
              )}
            </svg>

            {/* Current Level Badge */}
            <div className="absolute bottom-3 left-3 bg-slate-950/90 border border-slate-700 px-2.5 py-1 rounded text-xs font-mono text-cyan-300">
              {selectedLod} • {current.geometry}
            </div>
          </div>
        </div>

        {/* Detailed Specs Panel */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-base sm:text-lg font-bold text-sky-600 dark:text-cyan-400 font-mono">
              {selectedLod}:
            </span>
            <span className={`text-sm sm:text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {current.title}
            </span>
          </div>

          <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            {current.description}
          </p>

          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-[#080d1a] border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                Engineering Tolerance
              </span>
              <span className="font-bold text-sky-600 dark:text-cyan-300 font-mono">
                {current.tolerance}
              </span>
            </div>

            <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-[#080d1a] border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                Typical Deliverable
              </span>
              <span className="font-bold text-slate-800 dark:text-slate-200">
                {selectedLod === 'LOD 400' ? 'Bar Bending Schedule & Shop Sheets' : selectedLod === 'LOD 350' ? 'Clash-Free Navisworks & Sleeves' : selectedLod === 'LOD 300' ? 'Permit Drawing Sheets (.DWG/.PDF)' : selectedLod === 'LOD 200' ? 'Schematic Spatial Floor Plans' : 'Massing Envelope & Feasibility'}
              </span>
            </div>
          </div>

          <div className="pt-1">
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block mb-1.5">
              Key Capabilities Delivered:
            </span>
            <ul className="space-y-1">
              {current.details.map((detail, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProjectPortfolio: React.FC<ProjectPortfolioProps> = ({
  isDarkMode = false,
  onSelectProjectForQuote
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProject, setActiveModalProject] = useState<PortfolioProject | null>(null);
  const [portfolioViewMode, setPortfolioViewMode] = useState<'projects' | 'fidelity'>('projects');
  const [showAllProjects, setShowAllProjects] = useState<boolean>(false);

  // Filter logic
  const filteredProjects = PROJECTS_DATA.filter((proj) => {
    // LOD filter
    const matchesCategory = selectedCategory === 'all' || proj.category === selectedCategory;
    // Sector filter
    const matchesSector = selectedSector === 'all' || proj.sector === selectedSector;
    // Search filter
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      proj.title.toLowerCase().includes(q) ||
      proj.summary.toLowerCase().includes(q) ||
      proj.primaryDiscipline.toLowerCase().includes(q) ||
      proj.lodLevel.toLowerCase().includes(q) ||
      proj.location.toLowerCase().includes(q);

    return matchesCategory && matchesSector && matchesSearch;
  });

  const isFiltering = selectedCategory !== 'all' || selectedSector !== 'all' || Boolean(searchQuery.trim());
  const displayedProjects = (!isFiltering && !showAllProjects) 
    ? filteredProjects.slice(0, 4) 
    : filteredProjects;

  const handleRequestQuoteForProject = (project: PortfolioProject) => {
    setActiveModalProject(null);
    if (onSelectProjectForQuote) {
      onSelectProjectForQuote(project.lodLevel, project.primaryDiscipline);
    } else {
      const quoteEl = document.getElementById('quote-estimator');
      quoteEl?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="portfolio" className="pt-6 sm:pt-10 pb-12 sm:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="mb-6 sm:mb-8">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-xs font-semibold mb-2 border ${
          isDarkMode 
            ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' 
            : 'bg-sky-50 border-sky-200 text-sky-700'
        }`}>
          <Building2 className="w-3.5 h-3.5" /> PAST WORK & PROJECT PORTFOLIO
        </div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Architectural, Structural & BIM Project Highlights
            </h2>
            <p className={`mt-2 text-xs sm:text-sm max-w-2xl leading-relaxed ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Explore visual examples of our Level of Development (LOD 100 to LOD 400) capabilities, multi-trade clash detection, and CAD-to-BIM digital transformation.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            {/* View Mode Switcher */}
            <div className={`p-1 rounded-xl border inline-flex items-center gap-1 ${
              isDarkMode ? 'bg-[#080d1a] border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}>
              <button
                onClick={() => setPortfolioViewMode('projects')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  portfolioViewMode === 'projects'
                    ? 'bg-sky-600 text-white shadow-xs'
                    : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Box className="w-3.5 h-3.5" />
                <span>Project Gallery ({PROJECTS_DATA.length})</span>
              </button>
              <button
                onClick={() => setPortfolioViewMode('fidelity')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  portfolioViewMode === 'fidelity'
                    ? 'bg-sky-600 text-white shadow-xs'
                    : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>LOD Inspector</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Conditionally rendered LOD 100–400 Evolution Sandbox */}
      {portfolioViewMode === 'fidelity' && (
        <LodEvolutionSandbox isDarkMode={isDarkMode} />
      )}

      {/* Filter and Search Controls */}
      <div className={`p-4 rounded-xl border mb-8 transition-colors ${
        isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Category / LOD Level Segmented Filter */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-mono uppercase text-slate-400 font-bold mr-1 hidden sm:inline">
              Fidelity:
            </span>
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'lod100', label: 'LOD 100 (Massing)' },
              { id: 'lod200', label: 'LOD 200 (Schematic)' },
              { id: 'lod300', label: 'LOD 300 (Design & Permits)' },
              { id: 'lod350', label: 'LOD 350 (Coordination)' },
              { id: 'lod400', label: 'LOD 400 (Fabrication)' }
            ].map((btn) => {
              const isActive = selectedCategory === btn.id;
              return (
                <button
                  key={btn.id}
                  onClick={() => setSelectedCategory(btn.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-sky-600 text-white font-bold shadow-xs'
                      : isDarkMode
                      ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/70'
                  }`}
                >
                  {btn.label}
                </button>
              );
            })}
          </div>

          {/* Sector Filter & Search Box */}
          <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className={`text-xs px-3 py-2 rounded-lg border font-medium cursor-pointer transition-colors ${
                isDarkMode 
                  ? 'bg-slate-800 border-slate-700 text-slate-200 focus:border-cyan-400' 
                  : 'bg-white border-slate-300 text-slate-800 focus:border-sky-500'
              }`}
            >
              <option value="all">All Sectors</option>
              <option value="Commercial">Commercial</option>
              <option value="Industrial">Industrial</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Residential">Residential</option>
              <option value="Infrastructure">Infrastructure</option>
            </select>

            {/* Keyword Search */}
            <div className="relative flex-1 sm:w-56">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border transition-colors ${
                  isDarkMode
                    ? 'bg-slate-800 border-slate-700 text-slate-200 placeholder:text-slate-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none'
                    : 'bg-white border-slate-300 text-slate-800 placeholder:text-slate-400 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none'
                }`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className={`p-12 text-center rounded-2xl border ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <Building2 className="w-10 h-10 mx-auto text-slate-400 mb-3" />
          <h4 className="text-base font-bold mb-1">No Projects Match Your Selection</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
            Try adjusting your search criteria or resetting filters to browse all our architectural and BIM project milestones.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedSector('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-sky-600 text-white rounded-lg text-xs font-semibold cursor-pointer hover:bg-sky-500 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {displayedProjects.map((project) => (
            <div
              key={project.id}
              className={`group rounded-2xl border overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg ${
                isDarkMode 
                  ? 'bg-slate-900/90 border-slate-800 hover:border-cyan-500/50 hover:shadow-cyan-950/20' 
                  : 'bg-white border-slate-200 hover:border-sky-300 hover:shadow-slate-200'
              }`}
            >
              {/* Technical Blueprint Placeholder Graphic */}
              <BlueprintGraphic
                type={project.blueprintType}
                lod={project.lodLevel}
                isDarkMode={isDarkMode}
              />

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Clean Unboxed Metadata with Typographic Separator (Zero-Pill Compliance) */}
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 mb-2.5 flex-wrap">
                    <span className="font-bold text-sky-600 dark:text-cyan-400">{project.lodLevel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.sector}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.builtUpArea}</span>
                  </div>

                  {/* Project Title */}
                  <h3 className={`text-base font-bold leading-snug group-hover:text-sky-600 dark:group-hover:text-cyan-400 transition-colors ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    {project.title}
                  </h3>

                  {/* Summary */}
                  <p className={`mt-2 text-xs leading-relaxed line-clamp-2 ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {project.summary}
                  </p>

                  {/* Technical Discipline Line */}
                  <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-[11px]">
                    <span className="font-mono text-slate-400 block mb-0.5">Primary Discipline:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-200 line-clamp-1">
                      {project.primaryDiscipline}
                    </span>
                  </div>
                </div>

                {/* Card Actions & Software Footnote */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 truncate max-w-[55%]">
                    <span>{project.softwareStack.slice(0, 2).join(' • ')}</span>
                  </div>

                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-sky-600 dark:text-cyan-400 hover:bg-sky-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <span>Inspect Specs</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Expand / Collapse All Projects Toggle */}
      {!isFiltering && filteredProjects.length > 4 && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowAllProjects(!showAllProjects)}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold transition-all shadow-xs cursor-pointer border ${
              isDarkMode 
                ? 'bg-slate-900 border-slate-700 text-cyan-300 hover:border-cyan-400 hover:bg-slate-800' 
                : 'bg-white border-slate-300 text-slate-800 hover:border-sky-400 hover:bg-sky-50/50'
            }`}
          >
            <span>{showAllProjects ? 'Show Featured 4 Projects' : `View All ${filteredProjects.length} Verified Project Case Studies`}</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showAllProjects ? 'rotate-180' : ''}`} />
          </button>
        </div>
      )}

      {/* Interactive Project Technical Specification Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div 
            className={`relative w-full max-w-3xl rounded-2xl border shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col ${
              isDarkMode ? 'bg-[#0b0f19] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`p-5 sm:p-6 border-b flex items-start justify-between gap-4 ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 mb-1">
                  <span className="font-bold text-sky-600 dark:text-cyan-400">{activeModalProject.lodLevel}</span>
                  <span>·</span>
                  <span>{activeModalProject.sector}</span>
                  <span>·</span>
                  <span>{activeModalProject.location}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold tracking-tight">
                  {activeModalProject.title}
                </h3>
              </div>

              <button
                onClick={() => setActiveModalProject(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body with Blueprint & Technical Details */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
              {/* Graphic Blueprint Banner */}
              <BlueprintGraphic
                type={activeModalProject.blueprintType}
                lod={activeModalProject.lodLevel}
                isDarkMode={isDarkMode}
              />

              {/* Summary & Core Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-slate-400 block text-[10px] uppercase">Built-Up Area</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">{activeModalProject.builtUpArea}</span>
                </div>
                <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-slate-400 block text-[10px] uppercase">Modeling Turnaround</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">{activeModalProject.timeline}</span>
                </div>
                <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-slate-400 block text-[10px] uppercase">Client Category</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 mt-0.5 block truncate">{activeModalProject.clientType}</span>
                </div>
                <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-slate-400 block text-[10px] uppercase">Tolerance Checked</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 block">{activeModalProject.tolerances}</span>
                </div>
              </div>

              {/* Engineering Challenge & Solution */}
              <div className={`p-4 rounded-xl border space-y-3 ${
                isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50/80 border-slate-200'
              }`}>
                <div>
                  <h4 className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
                    Project Engineering Challenge
                  </h4>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                    {activeModalProject.challenges}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                  <h4 className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
                    Dharani Tech Solutions Engineering Workflow
                  </h4>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                    {activeModalProject.engineeringSolution}
                  </p>
                </div>
              </div>

              {/* Deliverables Breakdown */}
              <div>
                <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                  Verified Engineering Deliverables Handed Over:
                </h4>
                <ul className="grid grid-cols-1 gap-2 text-xs">
                  {activeModalProject.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Software Ecosystem & Formats */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 font-mono text-[10px] uppercase block mb-1">Software Stack:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {activeModalProject.softwareStack.join(' • ')}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-mono text-[10px] uppercase block mb-1">Delivered Formats:</span>
                  <span className="font-mono font-bold text-sky-600 dark:text-cyan-400">
                    {activeModalProject.fileFormats.join('  ')}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer Action */}
            <div className={`p-4 sm:p-5 border-t flex items-center justify-between gap-3 ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <button
                onClick={() => setActiveModalProject(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 cursor-pointer"
              >
                Close View
              </button>

              <button
                onClick={() => handleRequestQuoteForProject(activeModalProject)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white flex items-center gap-2 cursor-pointer shadow-sm transition-colors"
              >
                <span>Request Quotation for Similar Scope</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
