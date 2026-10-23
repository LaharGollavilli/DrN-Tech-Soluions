export type Discipline = 
  | 'building-planning'
  | '3d-model-design'
  | 'bim-arch-structure'
  | 'autocad-works'
  | 'scan-to-bim'
  | 'cad-to-bim'
  | 'interior-design'
  | 'shop-drawings'
  | 'clash-coordination'
  | 'architectural'
  | 'structural'
  | 'quantity-takeoff';

export interface ServiceDetail {
  id: Discipline;
  title: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  lodRange: string;
  deliverables: string[];
  keyCapabilities: string[];
  softwareStack: string[];
  useCases: string[];
  sampleMetric: string;
}

export type LodLevel = 'LOD 100' | 'LOD 200' | 'LOD 300' | 'LOD 350' | 'LOD 400';

export interface LodDefinition {
  level: LodLevel;
  title: string;
  subtitle: string;
  purpose: string;
  geometricDetail: string;
  metadataDetail: string;
  tolerance: string;
  exampleElements: string[];
  deliverablePhase: string;
}

export interface EstimatorState {
  facilityType: string;
  disciplines: Discipline[];
  lodLevel: LodLevel;
  scaleUnit: 'sqft' | 'sqm';
  floorArea: number;
  inputFiles: string[];
  timeline: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  companyName: string;
  projectNotes: string;
  ndaRequired: boolean;
}
