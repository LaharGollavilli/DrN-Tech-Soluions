import { ServiceDetail, LodDefinition } from '../types/bim';

export const BIM_SERVICES: ServiceDetail[] = [
  {
    id: 'building-planning',
    title: 'Building Planning & Architectural Design',
    tagline: 'Permit Layouts, Municipal Sanctions & Spatial Floor Plans',
    shortDescription: 'Comprehensive architectural building planning, residential and commercial municipal approval drawings, space optimization, floor layouts, and elevation design.',
    fullDescription: 'Our architectural planning engineers author precise, code-compliant architectural layouts and permit sets. From residential villas and apartment complexes to commercial buildings, we draft functional floor plans, site master layouts, sections, and municipal sanction drawings tailored to local building regulations and client specifications.',
    iconName: 'Building2',
    lodRange: 'Plan & Design',
    deliverables: [
      'Comprehensive Architectural Floor Plans (.DWG / .PDF)',
      'Municipal Approval & Permit Drawing Sets',
      'Exterior Elevations & Longitudinal Sections',
      'Site Layouts & Parking Circulation Plans',
      'Vastu & Spatial Area Optimization Schedules'
    ],
    keyCapabilities: [
      'Residential, commercial, and mixed-use layout design',
      'Municipal development authority compliance (G+ floors, setbacks, FSI/FAR)',
      'Detailed window and door schedules with hardware specifications',
      'Staircase, ramp, and utility core spatial planning',
      'Seamless conversion of client concept sketches into working drawings'
    ],
    softwareStack: ['AutoCAD 2025', 'Autodesk Revit', 'AutoCAD Architecture', 'Bluebeam'],
    useCases: ['Residential Villas & Apartments', 'Commercial Retail & Offices', 'Institutional Buildings', 'Gated Communities'],
    sampleMetric: '100% municipal authority zoning & dimension compliance'
  },
  {
    id: '3d-model-design',
    title: '3D Model Design & Visualization',
    tagline: 'Exterior Facades, Interior Renderings & Digital Walkthroughs',
    shortDescription: 'Transforming 2D CAD layouts and conceptual sketches into realistic 3D exterior facades, interior perspectives, and architectural presentation models.',
    fullDescription: 'Bring architectural concepts to life with high-precision 3D digital modeling. We craft realistic 3D building envelopes, daylighting studies, landscaping, interior finish representations, and architectural visualizations that help builders, architects, and owners visualize spaces and approve designs faster.',
    iconName: 'Compass',
    lodRange: '3D Viz & Massing',
    deliverables: [
      'High-Resolution 3D Exterior Facade Renderings',
      'Interior 3D Spatial Perspectives & Lighting Views',
      'Interactive 3D Architectural Presentation Assets',
      'Material & Texture Mapping Sheets',
      'Digital 3D Walkthrough Animation Models'
    ],
    keyCapabilities: [
      'Exterior elevations converted into dimensional 3D facades',
      'Interior living, kitchen, bedroom, and office spatial rendering',
      'Material texture simulation (granite, wood, glass, aluminum panels)',
      'Daylight and artificial lighting mood simulation',
      'Presentation boards ready for marketing and client approvals'
    ],
    softwareStack: ['Autodesk Revit 3D', '3ds Max', 'SketchUp', 'Enscape', 'AutoCAD 3D'],
    useCases: ['Client Approvals', 'Marketing & Real Estate Brochures', 'Architectural Design Reviews'],
    sampleMetric: 'Photorealistic perspective verification prior to physical execution'
  },
  {
    id: 'bim-arch-structure',
    title: 'BIM Architecture & Structure',
    tagline: 'LOD 100 to LOD 400 Parametric Revit Modeling',
    shortDescription: 'Data-rich Autodesk Revit models for architectural envelopes and structural reinforced concrete (RC), steel framing, rebar detailing, and foundations.',
    fullDescription: 'Our BIM division authors coordinated architectural and structural Revit models adhering strictly to international Level of Development standards (LOD 100 to LOD 400). We translate structural engineering drawings and architectural designs into integrated 3D models with true material properties, rebar scheduling, and foundation coordination.',
    iconName: 'Layers',
    lodRange: 'LOD 100–400',
    deliverables: [
      'Native Autodesk Revit (.RVT) Architecture & Structure Models',
      'OpenBIM Industry Foundation Classes (.IFC4 / .IFC 2x3)',
      'Structural Framing & Rebar Bending Schedules (.XLSX)',
      'Foundation & Column Setting Plans (.DWG / .PDF)',
      'Custom Parametric Revit Family (.RFA) Libraries'
    ],
    keyCapabilities: [
      'Schematic massing (LOD 100) to detailed fabrication models (LOD 400)',
      'Cast-in-place concrete, beam-column junctions, and slabs with rebar reinforcement',
      'Structural steel framing with connection details and baseplates',
      'Architectural curtain walls, partitions, and stair assemblies',
      'Bidirectional schedules for concrete volume and structural quantities'
    ],
    softwareStack: ['Autodesk Revit (Arch & Structure)', 'Tekla Structures', 'Navisworks Manage', 'AutoCAD Structural'],
    useCases: ['Commercial Complexes', 'Residential High-Rises', 'Industrial Structures', 'Infrastructure Nodes'],
    sampleMetric: 'Zero structural-to-architectural discrepancies in coordinated models'
  },
  {
    id: 'autocad-works',
    title: 'Complete AutoCAD 2D & 3D Drafting Works',
    tagline: 'Working Drawings, Shop Drawings, Detailing & CAD Conversions',
    shortDescription: 'Full-spectrum AutoCAD drafting services: working drawings, fabrication-ready shop drawings, structural reinforcement details, and legacy drawing digitizing.',
    fullDescription: 'Comprehensive Computer-Aided Design (CAD) drafting services executed with technical precision. We produce clean, layer-standardized 2D working drawings, structural reinforcement shop drawings, mechanical penetration sheets, and convert legacy paper drawings or PDFs into pristine DWG assets.',
    iconName: 'FileText',
    lodRange: '2D & 3D CAD',
    deliverables: [
      'Standardized 2D Working Drawing Packages (.DWG & .PDF)',
      'Fabrication-Ready Shop Drawings & General Arrangements',
      'Structural RC Detailing & Bar Bending Drawings',
      'CAD-to-CAD Cleanups & Layer Standardization',
      'Paper/PDF to Native Vector AutoCAD (.DWG) Conversion'
    ],
    keyCapabilities: [
      'Strict adherence to client CAD standards, line weights, and title blocks',
      'Detailed cross-sections, elevation callouts, and junction details',
      'Accurate dimensioning, coordinate tagging, and revision clouds',
      'As-built drawing updates from site redline markups',
      'Fast turnaround for high-volume drafting workloads'
    ],
    softwareStack: ['AutoCAD 2025', 'AutoCAD Mechanical', 'AutoCAD Architecture', 'Bluebeam Revu'],
    useCases: ['Architects & Civil Engineers', 'General Contractors', 'Fabricators & Detailers', 'Building Consultants'],
    sampleMetric: '100% layer discipline and dimensional accuracy on all exported sheets'
  },
  {
    id: 'interior-design',
    title: 'Interior Design (ID) Modeling',
    tagline: 'Custom Millwork, Joinery, Reflected Ceilings & Finishes',
    shortDescription: 'LOD 200 to LOD 350 interior architecture modeling including bespoke joinery, partitions, ceiling grids, lighting fixtures, and material finishes.',
    fullDescription: 'We translate interior designer concepts, sketches, and finish schedules into parametric 3D models. From custom cabinetry, reception counters, and acoustic wall paneling to complex ceiling drop designs, lighting layouts, and FF&E scheduling, our ID models guarantee seamless execution on site.',
    iconName: 'Building2',
    lodRange: 'LOD 200–350',
    deliverables: [
      'Detailed Interior 3D Revit (.RVT) Models',
      'Reflected Ceiling Plans (RCP) & Lighting Layouts',
      'Custom Millwork & Joinery Detail Sheets (.PDF / .DWG)',
      'Interior Section Elevations & Finish Schedules',
      'FF&E (Furniture, Fixtures & Equipment) Spatial Lists'
    ],
    keyCapabilities: [
      'Bespoke casework, custom wardrobes, and millwork shop-level modeling',
      'Reflected ceiling layouts integrated with lighting and electrical points',
      'Floor finish pattern layouts with accurate joint alignments and transitions',
      'Wall paneling, bulkheads, and decorative partition details',
      'Comprehensive room finish legends and door/hardware schedules'
    ],
    softwareStack: ['Autodesk Revit', 'AutoCAD', 'Enscape', 'SketchUp'],
    useCases: ['Commercial Office Fit-Outs', 'Hospitality & Restaurants', 'High-End Residential Interiors', 'Retail Outlets'],
    sampleMetric: '100% parametric interior components with finish schedules'
  },
  {
    id: 'clash-coordination',
    title: 'Clash Detection & Multi-Trade Coordination',
    tagline: 'Navisworks Interference Audits & Weekly Issue Tracking',
    shortDescription: 'Multi-disciplinary federated model coordination using Autodesk Navisworks. We run rigorous hard and soft clash audits to eliminate costly job-site rework.',
    fullDescription: 'We combine architectural, structural, and service layouts into a unified coordination environment. Using Autodesk Navisworks Manage, we execute hard clash tests (physical intersections) and clearance checks. We generate actionable clash reports with viewpoint coordinates to streamline trade resolutions.',
    iconName: 'ShieldAlert',
    lodRange: 'LOD 300–400',
    deliverables: [
      'Autodesk Navisworks Federated Models (.NWD / .NWC)',
      'Clash Progress Reports & Issue Resolution Matrices (.PDF / .XLSX)',
      'Interactive BCF (BIM Collaboration Format) Issue Logs',
      'Sectional Coordination Views & RFI Support Documentation',
      'Clearance & Maintenance Access Verification Notes'
    ],
    keyCapabilities: [
      'Identification of structural beam/column clashes with architectural features',
      'Clearance checks for door swings, corridors, and service ducts',
      'Automated clash grouping by trade, level, and grid line',
      'Resolution recommendations to minimize structural modifications',
      'Virtual coordination support for contractors and consulting engineers'
    ],
    softwareStack: ['Autodesk Navisworks Manage', 'Autodesk Revit', 'BIM Collab / BCF', 'AutoCAD'],
    useCases: ['Design-Build Contractors', 'Complex Commercial Buildings', 'Industrial Facilities'],
    sampleMetric: 'Eliminates up to 90% of on-site structural interferences prior to pouring'
  }
];

export const LOD_SPECTRUM: LodDefinition[] = [
  {
    level: 'LOD 100',
    title: 'Conceptual Design / Massing',
    subtitle: 'Overall building volume, spatial zones & massing',
    purpose: 'Feasibility analysis, zoning envelope verification, and orientation studies.',
    geometricDetail: 'Conceptual massing shapes with approximate overall height, floor area, volume, and location.',
    metadataDetail: 'General building type, total gross floor area, zoning limits.',
    tolerance: '± 500 mm (Approximate)',
    exampleElements: [
      'Mass building envelope solids',
      'Site property boundary outlines',
      'Basic vertical core representations'
    ],
    deliverablePhase: 'Concept & Schematic Design (SD)'
  },
  {
    level: 'LOD 200',
    title: 'Schematic Design / Generic Systems',
    subtitle: 'Generic model elements with approximate size, shape & quantity',
    purpose: 'Spatial allocation, discipline segregation, and early cost estimation.',
    geometricDetail: 'Generic wall thicknesses, basic column grids, simplified floor slabs, generic equipment bounding boxes.',
    metadataDetail: 'System type categorization (e.g. Interior Partition Type A), initial performance requirements.',
    tolerance: '± 50 mm',
    exampleElements: [
      'Generic 200mm concrete slabs and masonry walls',
      'Main structural column grid locations',
      'Generic placeholder chillers, AHUs, and main duct runs'
    ],
    deliverablePhase: 'Design Development (DD)'
  },
  {
    level: 'LOD 300',
    title: 'Detailed Design / Specific Assemblies',
    subtitle: 'Accurate dimensions, precise orientation & engineering specs',
    purpose: 'Permit submission, comprehensive clash detection, and construction documentation.',
    geometricDetail: 'Elements are modeled as specific assemblies with accurate dimensions, location, slope, and quantity.',
    metadataDetail: 'Specific manufacturer specs, material fire ratings, UniFormat and MasterFormat codes, acoustic ratings.',
    tolerance: '± 10 mm',
    exampleElements: [
      'Layered multi-material wall assemblies (drywall, insulation, studs, brick)',
      'Sized structural beams with true depths, flange sizes, and level offsets',
      'Ductwork with exact bends, transitions, dampers, and insulation'
    ],
    deliverablePhase: 'Construction Documentation (CD) & Permit Sets'
  },
  {
    level: 'LOD 350',
    title: 'Construction Coordination / Interface Detailing',
    subtitle: 'Cross-trade interface modeling, connections & support hangers',
    purpose: 'Multi-discipline clash coordination, MEP penetrations, and pre-fabrication planning.',
    geometricDetail: 'Includes physical connection details, seismic bracing, pipe hangers, and slab sleeves where elements interface with other trades.',
    metadataDetail: 'Subcontractor trade ownership, clash status, clearance envelopes, installation sequence.',
    tolerance: '± 5 mm',
    exampleElements: [
      'Structural steel base plates, stiffeners, gusset plates, and anchor bolts',
      'MEP pipe hangers, trapeze supports, seismic restraints, and sleeve penetrations',
      'Curtain wall embeds and bracket anchor points to edge of slab'
    ],
    deliverablePhase: 'Pre-Construction & Multi-Trade Coordination'
  },
  {
    level: 'LOD 400',
    title: 'Fabrication & Assembly / Shop Level',
    subtitle: 'Complete manufacturing, spooling & direct fabrication data',
    purpose: 'Direct shop fabrication, rebar bending schedules, spool drawings, and field assembly.',
    geometricDetail: 'Extreme detailing: exact weld symbols, bolt threads, sheet metal duct seams, rebar bends, and pre-fab spools.',
    metadataDetail: 'Part numbers, mill test reports, fabrication batches, spool IDs, installation sequencing codes.',
    tolerance: '± 2 mm (Fabrication grade)',
    exampleElements: [
      'Individual rebar bars with hook bends, bar mark tags, and lap splices',
      'Pre-fabricated MEP pipe spools with flanges, gaskets, and weld callouts',
      'Precast concrete panels with lifting anchors, grout tubes, and embedded plates'
    ],
    deliverablePhase: 'Shop Drawings & Direct Manufacturing'
  }
];

export const TRUST_METRICS = [
  {
    value: '100%',
    label: 'Precision CAD & BIM Delivery',
    sublabel: 'Strict dimensional fidelity in building planning, AutoCAD, and Revit models'
  },
  {
    value: 'LOD 100–400',
    label: 'Parametric BIM Modeling',
    sublabel: 'Standardized architectural and structural Revit model authoring'
  },
  {
    value: 'Fast & Agile',
    label: 'Turnaround Timelines',
    sublabel: 'Dedicated engineering focus with milestone delivery commitments'
  },
  {
    value: 'Digital Only',
    label: 'Pure Modeling Workflows',
    sublabel: 'All modeling derived from drawings & designs—no expensive scanning hardware needed'
  }
];

export const CLIENT_TESTIMONIALS = [
  {
    quote: "Dharani Tech Solutions converted our 2D architectural layouts and structural drawings into a coordinated Revit model and detailed shop drawing sheets. The precision and speed exceeded our expectations.",
    author: "R. K. Varma",
    role: "Senior Project Consultant",
    company: "Varma Infra & Architects",
    project: "Commercial & Residential Mixed-Use Project"
  },
  {
    quote: "Their team handled our building planning drawings, municipal sanction sets, and 3D exterior visualization. Very clear communication and dependable turnaround on revisions.",
    author: "S. Rao",
    role: "Managing Director",
    company: "Coastal Builders & Developers",
    project: "Gated Residential Community"
  },
  {
    quote: "The rebar detailing and structural modeling from Dharani Tech Solutions helped our site engineers execute reinforced concrete work with zero dimensional confusion. Great work from the Vizag team.",
    author: "M. Venkatesh",
    role: "Chief Structural Engineer",
    company: "Apex Engineering Associates",
    project: "Industrial Warehouse Facility"
  }
];

export const FAQ_ITEMS = [
  {
    question: "How do your engineers synchronize 2D AutoCAD Project North with Revit Shared Coordinates and Survey Benchmarks?",
    answer: "We establish a fixed geodetic benchmark based on the site boundary and municipal datum. In Autodesk Revit, we lock the Survey Point and Project Base Point with true Northing/Easting coordinates and True North angle rotation. Linked 2D AutoCAD DWGs are ingested via 'By Shared Coordinates' rather than Center-to-Center, completely eliminating coordinate drift, level discrepancies, and rotation mismatches between architectural layouts and structural foundation grids."
  },
  {
    question: "What parametric metadata, UniFormat codes, and OmniClass parameters are embedded in your LOD 300–400 Revit families?",
    answer: "Our models go far beyond visual 3D geometry. We embed OmniClass Table 21 / UniFormat II classification codes, material fire resistance ratings, acoustic STC ratings, concrete characteristic compressive strengths (e.g. M25, M30, M40), rebar tensile yield grades (Fe500D), and dimensional schedule tags. This parameter discipline enables contractors to extract automated, audit-ready Bill of Quantities (BOQ) with zero manual scaling errors."
  },
  {
    question: "How do you configure Navisworks clash matrix detection rules to eliminate thousands of false-positive clashes?",
    answer: "We structure federated clash tests using strict trade clearance hierarchies: (1) Gravity Drainage & Waste Slopes > (2) HVAC Primary Supply Air Ducts > (3) Primary RC Structural Framing > (4) Pressurized Water/Firefighting > (5) Cable Trays & Conduit Banks. We apply automated tolerance filtering to ignore soft insulation compression touches and verify dedicated dynamic maintenance access zones (filter pullout envelopes, valve clearance radii). Issues are exported into BIM Collaboration Format (BCF) matrices with exact 3D camera viewpoints."
  },
  {
    question: "Can your team model full 3D parametric rebar detailing and generate automated Bar Bending Schedules (BBS)?",
    answer: "Yes. In structural concrete modeling (LOD 350–400), we detail individual rebar elements—including main longitudinal bars, stirrup ties, column links, cranked bars, lap splices, and mechanical couplers adhering strictly to IS 456 / SP 34 / ACI 318 code detailing. We extract automated Bar Bending Schedules (BBS) directly from Revit geometry, detailing exact cut lengths, bend diameters, shape code designations, and steel tonnage by bar diameter."
  },
  {
    question: "When converting legacy 2D CAD DWGs or PDF drawings to 3D Revit models, how do you resolve cross-sheet dimensional anomalies?",
    answer: "Legacy 2D drawing sets frequently contain conflicting dimensions between floor plans, section cuts, and structural framing sheets. Before model authoring begins, our engineers execute a Grid & Level Discrepancy Audit. We map all cross-sheet conflicts onto an engineering RFI log with grid line coordinates, model the true structural geometry, and flag anomalies to the client for recorded resolution."
  },
  {
    question: "How are 2D working drawings and fabrication shop sheets extracted to guarantee 100% bidirectional revision synchronization?",
    answer: "Every floor plan, section elevation, reflected ceiling plan, and detail callout is generated as a live, bidirectionally linked model view inside the central Revit model (.RVT). When an engineer or client updates a wall thickness, column dimension, or opening coordinate, all associated 2D AutoCAD DWG sheets, annotation tags, and schedules update dynamically in real time, preventing conflicting drawings on site."
  },
  {
    question: "What OpenBIM exchange protocols and file formats do you deliver for cross-software collaboration?",
    answer: "We deliver native Autodesk Revit (.RVT versioned 2020 through 2025), Autodesk Navisworks federated packages (.NWD / .NWC), standardized OpenBIM Industry Foundation Classes (.IFC 2x3 and .IFC4), BCF issue logs (.BCFZIP / .BCF), vector AutoCAD (.DWG / .DXF), print-ready PDF packages, and tabular BOQ spreadsheets (.XLSX / .CSV)."
  },
  {
    question: "Where is Dharani Tech Solutions based, and can we schedule an in-person technical scoping session?",
    answer: "Our primary engineering modeling office is based in Visakhapatnam (Vizag), Andhra Pradesh, situated at: Kurmanpalem, Duvvada Railway Station Road, Balaji Nagar, Road No. 5, Pin Code: 530046. Consulting engineers, architects, and contractors can schedule in-person technical reviews or reach our engineering desk directly at Landline: 0891-4630073 or Mobile: +91 898529579."
  }
];

