import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

/**
 * Autodesk Revit Official Product Icon
 * Dynamic 3D faceted isometric ribbon 'R' with royal blue, deep cyan, and sapphire planes.
 */
export const RevitLogo: React.FC<LogoProps> = ({ className = "w-10 h-10" }) => (
  <svg 
    viewBox="0 0 64 64" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    aria-label="Autodesk Revit"
  >
    <defs>
      <linearGradient id="rvt-card-bg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#F8FAFC" />
      </linearGradient>
    </defs>
    
    {/* Clean White Rounded Card Backdrop */}
    <rect width="64" height="64" rx="14" fill="url(#rvt-card-bg)" />
    <rect width="64" height="64" rx="14" stroke="#E2E8F0" strokeWidth="1.2" />
    <rect width="64" height="64" rx="14" stroke="#0284C7" strokeOpacity="0.3" strokeWidth="1" />

    {/* Authentic Autodesk Revit Asset */}
    <image 
      href="/assets/aistudio/revit_73d52bad.png" 
      x="8" 
      y="8" 
      width="48" 
      height="48" 
      preserveAspectRatio="xMidYMid meet" 
    />
  </svg>
);

/**
 * Autodesk Navisworks Manage Official Product Icon
 * Uses the authentic Autodesk Navisworks Manage emblem provided by user (/assets/aistudio/manage_a267b3e7.jpg).
 */
export const NavisworksLogo: React.FC<LogoProps> = ({ className = "w-10 h-10" }) => (
  <svg 
    viewBox="0 0 64 64" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    aria-label="Autodesk Navisworks Manage"
  >
    <defs>
      <linearGradient id="nav-card-bg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#F8FAFC" />
      </linearGradient>
      <clipPath id="nav-clip">
        <rect width="64" height="64" rx="14" />
      </clipPath>
    </defs>
    
    {/* Clean Rounded Card Backdrop */}
    <rect width="64" height="64" rx="14" fill="url(#nav-card-bg)" />

    {/* Authentic Autodesk Navisworks Manage Tile */}
    <g clipPath="url(#nav-clip)">
      <image 
        href="/assets/aistudio/manage_a267b3e7.jpg" 
        x="2" 
        y="2" 
        width="60" 
        height="60" 
        preserveAspectRatio="xMidYMid meet" 
      />
    </g>

    <rect width="64" height="64" rx="14" stroke="#E2E8F0" strokeWidth="1.2" />
    <rect width="64" height="64" rx="14" stroke="#10B981" strokeOpacity="0.35" strokeWidth="1" />
  </svg>
);

/**
 * Autodesk Construction Cloud (ACC) Official Logo
 * Uses authentic Autodesk Construction Cloud lockup provided by user (/assets/aistudio/image_afb67ee3.png).
 */
export const AccLogo: React.FC<LogoProps> = ({ className = "w-10 h-10" }) => (
  <svg 
    viewBox="0 0 64 64" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    aria-label="Autodesk Construction Cloud (ACC)"
  >
    <defs>
      <linearGradient id="acc-card-bg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#F8FAFC" />
      </linearGradient>
      <clipPath id="acc-clip">
        <rect width="64" height="64" rx="14" />
      </clipPath>
    </defs>
    
    {/* Clean White Rounded Card Backdrop */}
    <rect width="64" height="64" rx="14" fill="url(#acc-card-bg)" />
    
    {/* Authentic Autodesk Construction Cloud Asset */}
    <g clipPath="url(#acc-clip)">
      <image 
        href="/assets/aistudio/image_afb67ee3.png" 
        x="3" 
        y="14" 
        width="58" 
        height="36" 
        preserveAspectRatio="xMidYMid meet" 
      />
    </g>

    <rect width="64" height="64" rx="14" stroke="#E2E8F0" strokeWidth="1.2" />
    <rect width="64" height="64" rx="14" stroke="#0284C7" strokeOpacity="0.3" strokeWidth="1" />
  </svg>
);

/**
 * Autodesk BIM 360 Official Product Logo
 * Uses authentic Autodesk BIM 360 lockup provided by user (/assets/aistudio/image_71f8fd24.png).
 */
export const Bim360Logo: React.FC<LogoProps> = ({ className = "w-10 h-10" }) => (
  <svg 
    viewBox="0 0 64 64" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    aria-label="Autodesk BIM 360"
  >
    <defs>
      <linearGradient id="bim-card-bg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#F8FAFC" />
      </linearGradient>
      <clipPath id="bim-clip">
        <rect width="64" height="64" rx="14" />
      </clipPath>
    </defs>
    
    {/* Clean White Rounded Card Backdrop */}
    <rect width="64" height="64" rx="14" fill="url(#bim-card-bg)" />
    
    {/* Authentic Autodesk BIM 360 Asset */}
    <g clipPath="url(#bim-clip)">
      <image 
        href="/assets/aistudio/image_71f8fd24.png" 
        x="3" 
        y="14" 
        width="58" 
        height="36" 
        preserveAspectRatio="xMidYMid meet" 
      />
    </g>

    <rect width="64" height="64" rx="14" stroke="#E2E8F0" strokeWidth="1.2" />
    <rect width="64" height="64" rx="14" stroke="#0284C7" strokeOpacity="0.3" strokeWidth="1" />
  </svg>
);

/**
 * Autodesk AutoCAD Official Product Icon
 * Uses the authentic Autodesk AutoCAD 3D faceted ruby origami prism emblem and typography
 * provided by the user (/assets/aistudio/cad_272baca7.png).
 */
export const AutoCadLogo: React.FC<LogoProps> = ({ className = "w-10 h-10" }) => (
  <svg 
    viewBox="0 0 64 64" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    aria-label="Autodesk AutoCAD"
  >
    <defs>
      <linearGradient id="cad-card-bg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#F8FAFC" />
      </linearGradient>
    </defs>
    
    {/* Clean White Rounded Card Backdrop */}
    <rect width="64" height="64" rx="14" fill="url(#cad-card-bg)" />
    <rect width="64" height="64" rx="14" stroke="#E2E8F0" strokeWidth="1.2" />
    <rect width="64" height="64" rx="14" stroke="#E11D48" strokeOpacity="0.3" strokeWidth="1" />

    {/* The Official AutoCAD Asset Image Provided by the User */}
    <image 
      href="/assets/aistudio/cad_272baca7.png" 
      x="3.5" 
      y="3.5" 
      width="57" 
      height="57" 
      preserveAspectRatio="xMidYMid meet" 
    />
  </svg>
);

/**
 * Autodesk Dynamo Official Product Icon
 * Uses the authentic Autodesk Dynamo faceted parametric emblem with clean, transparent background
 * completely free of any checkerboard or honeycomb artifacts.
 */
export const DynamoLogo: React.FC<LogoProps> = ({ className = "w-10 h-10" }) => (
  <svg 
    viewBox="0 0 64 64" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    aria-label="Autodesk Dynamo"
  >
    <defs>
      <linearGradient id="dyn-card-bg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#F8FAFC" />
      </linearGradient>
      <clipPath id="dyn-clip">
        <rect width="64" height="64" rx="14" />
      </clipPath>
    </defs>

    {/* Clean White Rounded Card Backdrop */}
    <rect width="64" height="64" rx="14" fill="url(#dyn-card-bg)" />
    
    {/* Authentic Autodesk Dynamo Asset - Cleaned Transparent Icon */}
    <g clipPath="url(#dyn-clip)">
      <image 
        href="/assets/aistudio/dynamo_icon.png" 
        x="9" 
        y="9" 
        width="46" 
        height="46" 
        preserveAspectRatio="xMidYMid meet" 
      />
    </g>

    <rect width="64" height="64" rx="14" stroke="#E2E8F0" strokeWidth="1.2" />
    <rect width="64" height="64" rx="14" stroke="#0D9488" strokeOpacity="0.3" strokeWidth="1" />
  </svg>
);

/**
 * Autodesk ReCap Pro Official Product Icon
 * Uses the authentic Autodesk ReCap Pro emblem provided by the user (/assets/aistudio/recap_logo.png).
 */
export const RecapLogo: React.FC<LogoProps> = ({ className = "w-10 h-10" }) => (
  <svg 
    viewBox="0 0 64 64" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    aria-label="Autodesk ReCap Pro"
  >
    <defs>
      <linearGradient id="recap-card-bg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#F8FAFC" />
      </linearGradient>
      <clipPath id="recap-clip">
        <rect width="64" height="64" rx="14" />
      </clipPath>
    </defs>
    
    {/* Clean White Rounded Card Backdrop */}
    <rect width="64" height="64" rx="14" fill="url(#recap-card-bg)" />
    
    {/* Authentic Autodesk ReCap Pro Asset */}
    <g clipPath="url(#recap-clip)">
      <image 
        href="/assets/aistudio/recap_logo.png" 
        x="6" 
        y="6" 
        width="52" 
        height="52" 
        preserveAspectRatio="xMidYMid meet" 
      />
    </g>

    <rect width="64" height="64" rx="14" stroke="#E2E8F0" strokeWidth="1.2" />
    <rect width="64" height="64" rx="14" stroke="#A21CAF" strokeOpacity="0.3" strokeWidth="1" />
  </svg>
);

/**
 * Universal Engineering Background & Grid for Technical Discipline Icons
 */
const TechIconFrame: React.FC<{ id: string; accentColor?: string; children: React.ReactNode }> = ({ 
  id, 
  accentColor = "#0284C7", 
  children 
}) => (
  <>
    <defs>
      <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#080E1A" />
        <stop offset="100%" stopColor="#121D33" />
      </linearGradient>
    </defs>
    
    {/* Clean Blueprint Dark Card Base */}
    <rect width="64" height="64" rx="14" fill={`url(#${id}-bg)`} />
    
    {/* Precision Engineering Border */}
    <rect width="64" height="64" rx="14" stroke={accentColor} strokeOpacity="0.45" strokeWidth="1.2" />

    {/* Engineering Millimeter Reference Grid */}
    <path 
      d="M16 8V56M32 8V56M48 8V56M8 16H56M8 32H56M8 48H56" 
      stroke="#38BDF8" 
      strokeWidth="0.5" 
      strokeOpacity="0.15" 
      strokeDasharray="1.5 2" 
    />

    {/* Corner Titleblock Calibration Marks */}
    <path 
      d="M6 11V6H11M58 11V6H53M6 53V58H11M58 53V58H53" 
      stroke="#38BDF8" 
      strokeWidth="0.8" 
      strokeOpacity="0.4" 
    />

    {children}
  </>
);

/**
 * 1. Architectural Planning & Municipal Design Icon
 * Orthographic floor plan with cavity walls, partition, 90° door swing arc, dimension string & North arrow.
 */
export const ArchitecturalPlanningLogo: React.FC<LogoProps> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Architectural Planning">
    <TechIconFrame id="arch-plan" accentColor="#38BDF8">
      {/* Structural Bearing Outer Walls */}
      <rect x="15" y="17" width="34" height="32" rx="1" stroke="#F8FAFC" strokeWidth="2" fill="#0284C7" fillOpacity="0.12" />
      <rect x="18" y="20" width="28" height="26" stroke="#94A3B8" strokeWidth="1" strokeDasharray="1 1" fill="none" />

      {/* Interior Partition Wall */}
      <path d="M18 33H33M33 20V46" stroke="#38BDF8" strokeWidth="1.8" />

      {/* Standard 90° Door Swing Arc & Swing Leaf */}
      <path d="M22 33A9 9 0 0 1 31 24" stroke="#60A5FA" strokeWidth="1.4" strokeDasharray="2 1.5" fill="none" />
      <line x1="22" y1="33" x2="31" y2="33" stroke="#F8FAFC" strokeWidth="1.5" strokeLinecap="round" />

      {/* Window Opening Symbol on Right Wall */}
      <line x1="49" y1="27" x2="49" y2="39" stroke="#38BDF8" strokeWidth="2.5" />
      <line x1="51" y1="29" x2="51" y2="37" stroke="#BAE6FD" strokeWidth="0.8" />

      {/* Top Dimension String with 45° Architectural Slashes */}
      <line x1="15" y1="12" x2="49" y2="12" stroke="#60A5FA" strokeWidth="1" />
      <path d="M13 14L17 10M47 14L51 10M32 14L32 10" stroke="#F8FAFC" strokeWidth="1.2" strokeLinecap="round" />

      {/* North Compass Orientation Datum */}
      <circle cx="53" cy="51" r="5" stroke="#38BDF8" strokeWidth="0.8" fill="#080E1A" />
      <path d="M53 47L55 52H51L53 47Z" fill="#38BDF8" />
      <text x="53" y="55" fontSize="3.2" fill="#BAE6FD" fontFamily="monospace" textAnchor="middle" fontWeight="bold">N</text>
    </TechIconFrame>
  </svg>
);

/**
 * 2. 3D Model Design & Architectural Visualization Icon
 * Isometric axonometric volume with curtain wall fenestration, entrance canopy, and 3D coordinate axes.
 */
export const Visualization3dLogo: React.FC<LogoProps> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="3D Model Design & Visualization">
    <TechIconFrame id="viz-3d" accentColor="#38BDF8">
      {/* Isometric 3D Massing Prism */}
      {/* Top Roof Plane */}
      <path d="M32 14L49 23.5L32 33L15 23.5Z" fill="#0284C7" fillOpacity="0.4" stroke="#F8FAFC" strokeWidth="1.6" />
      <path d="M23.5 18.75L40.5 28.25" stroke="#BAE6FD" strokeWidth="0.8" strokeOpacity="0.6" strokeDasharray="1.5 1.5" />

      {/* Left Facade with Curtain Wall Mullions */}
      <path d="M15 23.5L32 33V50L15 40.5Z" fill="#0369A1" fillOpacity="0.3" stroke="#F8FAFC" strokeWidth="1.6" />
      <line x1="23.5" y1="28.25" x2="23.5" y2="45.25" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.8" />
      <line x1="15" y1="32" x2="32" y2="41.5" stroke="#38BDF8" strokeWidth="0.8" strokeOpacity="0.6" />

      {/* Right Facade with Floor Levels */}
      <path d="M32 33L49 23.5V40.5L32 50Z" fill="#0C4A6E" fillOpacity="0.4" stroke="#F8FAFC" strokeWidth="1.6" />
      <line x1="40.5" y1="28.25" x2="40.5" y2="45.25" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.8" />
      <line x1="32" y1="41.5" x2="49" y2="32" stroke="#38BDF8" strokeWidth="0.8" strokeOpacity="0.6" />

      {/* Cantilever Entrance Canopy Box */}
      <path d="M25 41L32 45L36 43L29 39Z" fill="#38BDF8" stroke="#F8FAFC" strokeWidth="1" />

      {/* 3D Coordinate Triad (X, Y, Z) */}
      <path d="M9 55H14M9 55V50M9 55L12.5 52.5" stroke="#38BDF8" strokeWidth="1.2" strokeLinecap="round" />
      <text x="16" y="56" fontSize="3.5" fill="#38BDF8" fontFamily="monospace">X</text>
      <text x="9" y="48" fontSize="3.5" fill="#38BDF8" fontFamily="monospace">Z</text>
    </TechIconFrame>
  </svg>
);

/**
 * 3. BIM Architecture & Structural RC Frame Icon
 * Parametric structural column-beam moment bay with floor slab edge and elevation level datum marker.
 */
export const BimArchStructureLogo: React.FC<LogoProps> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="BIM Architecture & Structure">
    <TechIconFrame id="bim-struct" accentColor="#0284C7">
      {/* Left Reinforced Concrete Column */}
      <rect x="14" y="16" width="9" height="36" fill="#0284C7" fillOpacity="0.25" stroke="#F8FAFC" strokeWidth="1.8" />
      <line x1="18.5" y1="12" x2="18.5" y2="55" stroke="#60A5FA" strokeWidth="0.8" strokeDasharray="3 1.5" />

      {/* Right Column */}
      <rect x="41" y="16" width="9" height="36" fill="#0284C7" fillOpacity="0.25" stroke="#F8FAFC" strokeWidth="1.8" />
      <line x1="45.5" y1="12" x2="45.5" y2="55" stroke="#60A5FA" strokeWidth="0.8" strokeDasharray="3 1.5" />

      {/* Horizontal Structural Concrete Beam */}
      <rect x="14" y="24" width="36" height="8" fill="#0369A1" fillOpacity="0.35" stroke="#F8FAFC" strokeWidth="1.8" />
      
      {/* Moment Connection Flange Plates with Fastener Centers */}
      <rect x="22" y="24" width="3" height="8" fill="#38BDF8" />
      <circle cx="23.5" cy="26" r="0.8" fill="#080E1A" />
      <circle cx="23.5" cy="30" r="0.8" fill="#080E1A" />
      
      <rect x="39" y="24" width="3" height="8" fill="#38BDF8" />
      <circle cx="40.5" cy="26" r="0.8" fill="#080E1A" />
      <circle cx="40.5" cy="30" r="0.8" fill="#080E1A" />

      {/* Structural Floor Slab Extension */}
      <line x1="10" y1="24" x2="54" y2="24" stroke="#38BDF8" strokeWidth="1.4" />
      <line x1="10" y1="21" x2="54" y2="21" stroke="#60A5FA" strokeWidth="0.9" strokeDasharray="2 1.5" />

      {/* Parametric Level Datum Indicator (▽ +3.60m) */}
      <line x1="30" y1="41" x2="56" y2="41" stroke="#38BDF8" strokeWidth="1" strokeDasharray="2 1.5" />
      <path d="M30 41L33 37H27L30 41Z" fill="#38BDF8" />
      <text x="35" y="40" fontSize="3.8" fill="#F8FAFC" fontFamily="monospace" fontWeight="bold">LVL +3.60</text>
    </TechIconFrame>
  </svg>
);

/**
 * 4. Scan-to-BIM & Point Cloud Modeling Icon
 * 3D Laser scanner instrument on tripod emitting radial LiDAR pulses, generating spatial points into a solid BIM wall.
 */
export const ScanToBimLogo: React.FC<LogoProps> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Scan-to-BIM & Point Cloud">
    <TechIconFrame id="scan-bim" accentColor="#10B981">
      {/* Survey Tripod Legs */}
      <line x1="18" y1="35" x2="11" y2="54" stroke="#94A3B8" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="18" y1="35" x2="18" y2="54" stroke="#94A3B8" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="18" y1="35" x2="25" y2="54" stroke="#94A3B8" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="13" y1="47" x2="23" y2="47" stroke="#64748B" strokeWidth="1" />

      {/* 3D Laser Scanner Head */}
      <rect x="14" y="27" width="8" height="8" rx="1.5" fill="#0284C7" stroke="#F8FAFC" strokeWidth="1.5" />
      <circle cx="18" cy="31" r="2" fill="#34D399" />
      <circle cx="18" cy="31" r="0.75" fill="#FFFFFF" />

      {/* Radial Laser Scan Emitter Cone */}
      <path d="M22 31L34 19M22 31L37 27M22 31L36 37" stroke="#34D399" strokeWidth="1.2" strokeDasharray="2 1.5" strokeOpacity="0.85" />

      {/* Spatial 3D Point Cloud Density Array */}
      <circle cx="33" cy="20" r="1.3" fill="#34D399" />
      <circle cx="37" cy="23" r="1.5" fill="#38BDF8" />
      <circle cx="34" cy="27" r="1.2" fill="#34D399" />
      <circle cx="38" cy="30" r="1.4" fill="#38BDF8" />
      <circle cx="35" cy="35" r="1.3" fill="#34D399" />
      <circle cx="38" cy="38" r="1.5" fill="#38BDF8" />

      {/* Parametric Solid BIM Assembly Extracted from Scan */}
      <path d="M42 16L53 22L42 27L31 21Z" fill="#0284C7" fillOpacity="0.4" stroke="#F8FAFC" strokeWidth="1.4" />
      <path d="M31 21L42 27V44L31 38Z" fill="#0369A1" stroke="#F8FAFC" strokeWidth="1.4" />
      <path d="M42 27L53 22V39L42 44Z" fill="#0C4A6E" stroke="#F8FAFC" strokeWidth="1.4" />

      {/* Calibration Target Tag */}
      <path d="M51 49L47 53H42" stroke="#34D399" strokeWidth="1" strokeLinecap="round" />
      <text x="35" y="55" fontSize="3.6" fill="#34D399" fontFamily="monospace">Δ 0.002m</text>
    </TechIconFrame>
  </svg>
);

/**
 * 5. Scan-to-CAD Drafting Services Icon
 * Precision laser benchmark prism target converting into orthographic 2D CAD vectors and dimension string.
 */
export const ScanToCadLogo: React.FC<LogoProps> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Scan-to-CAD Drafting">
    <TechIconFrame id="scan-cad" accentColor="#10B981">
      {/* Geodetic Survey Benchmark Reticle Target */}
      <circle cx="21" cy="25" r="8" stroke="#34D399" strokeWidth="1.2" strokeDasharray="3 1.5" fill="none" />
      <circle cx="21" cy="25" r="3.5" stroke="#34D399" strokeWidth="1.2" fill="#080E1A" />
      <line x1="21" y1="13" x2="21" y2="37" stroke="#34D399" strokeWidth="1" />
      <line x1="9" y1="25" x2="33" y2="25" stroke="#34D399" strokeWidth="1" />
      <circle cx="21" cy="25" r="1.2" fill="#F8FAFC" />

      {/* CAD Vectorization Direction Arrow */}
      <path d="M30 33L36 33M36 33L33 30M36 33L33 36" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

      {/* 2D AutoCAD Orthographic Drawing Sheets & Layered Walls */}
      <rect x="37" y="17" width="18" height="30" rx="1.5" fill="#0F172A" stroke="#F8FAFC" strokeWidth="1.6" />
      
      {/* CAD Layer 1: Red Bearing Wall (.DWG Layer A-WALL) */}
      <path d="M41 22H51V41H41V22Z" stroke="#EF4444" strokeWidth="1.4" fill="none" />
      
      {/* CAD Layer 2: Cyan Architectural Feature */}
      <line x1="41" y1="31" x2="51" y2="31" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="2 1.5" />
      
      {/* CAD Dimension String with Ticks */}
      <line x1="37" y1="51" x2="55" y2="51" stroke="#60A5FA" strokeWidth="0.9" />
      <path d="M37 49L37 53M55 49L55 53M46 49L46 53" stroke="#F8FAFC" strokeWidth="1.2" />

      {/* CAD Object Snap Marker */}
      <rect x="39.5" y="20.5" width="3" height="3" stroke="#34D399" strokeWidth="1" fill="none" />
    </TechIconFrame>
  </svg>
);

/**
 * 6. CAD-to-BIM Conversion Services Icon
 * 2D DWG drawing title sheet projecting parametric vertical rays into an intelligent 3D BIM model element.
 */
export const CadToBimLogo: React.FC<LogoProps> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="CAD-to-BIM Conversion">
    <TechIconFrame id="cad-bim" accentColor="#38BDF8">
      {/* Base 2D CAD Blueprint Sheet in Perspective */}
      <polygon points="12,48 38,48 52,38 26,38" fill="#0F172A" stroke="#60A5FA" strokeWidth="1.5" />
      <polygon points="16,46 36,46 48,39 28,39" stroke="#93C5FD" strokeWidth="0.8" strokeDasharray="2 1.5" fill="none" />
      
      {/* 2D Vector CAD Linework on Sheet */}
      <line x1="20" y1="44" x2="32" y2="44" stroke="#EF4444" strokeWidth="1.2" />
      <line x1="26" y1="44" x2="38" y2="40" stroke="#38BDF8" strokeWidth="1.2" />

      {/* Upward Vertical Parametric Extrusion Guidelines */}
      <line x1="24" y1="38" x2="24" y2="24" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="2 2" />
      <line x1="38" y1="44" x2="38" y2="30" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="2 2" />
      <line x1="48" y1="36" x2="48" y2="22" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="2 2" />

      {/* Converted 3D BIM Parametric Solid Element */}
      <path d="M34 14L48 20L34 26L20 20Z" fill="#38BDF8" stroke="#F8FAFC" strokeWidth="1.6" />
      <path d="M20 20L34 26V37L20 31Z" fill="#0284C7" stroke="#F8FAFC" strokeWidth="1.6" />
      <path d="M34 26L48 20V31L34 37Z" fill="#0369A1" stroke="#F8FAFC" strokeWidth="1.6" />

      {/* Conversion Process Tag */}
      <path d="M12 28L15 25L18 28" stroke="#38BDF8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="15" y1="25" x2="15" y2="34" stroke="#38BDF8" strokeWidth="1.4" strokeLinecap="round" />
      <text x="11" y="21" fontSize="3.6" fill="#F8FAFC" fontFamily="monospace" fontWeight="bold">2D➔3D</text>
    </TechIconFrame>
  </svg>
);

/**
 * 7. AutoCAD Rebar Detailing & BBS Icon
 * Structural reinforced concrete cross-section: closed stirrup tie with 135° seismic hooks, corner rebars, and BBS schedule leader.
 */
export const AutoCadRebarLogo: React.FC<LogoProps> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="AutoCAD Rebar Detailing & BBS">
    <TechIconFrame id="rebar-det" accentColor="#F59E0B">
      {/* Outer Concrete Boundary Profile (Column/Beam Section) */}
      <rect x="13" y="13" width="38" height="38" rx="2" stroke="#64748B" strokeWidth="1.4" strokeDasharray="3 1.5" fill="#0F172A" fillOpacity="0.6" />

      {/* Closed Rectangular Rebar Stirrup Tie with 135° Seismic Anchor Hook */}
      <rect x="18" y="18" width="28" height="28" rx="2" stroke="#F59E0B" strokeWidth="2.2" fill="none" />
      <path d="M44 24L46 20L41 21" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />

      {/* 4 Main Longitudinal Rebar Nodes at Corners */}
      <circle cx="23" cy="23" r="3.2" fill="#F8FAFC" stroke="#F59E0B" strokeWidth="1.4" />
      <circle cx="41" cy="23" r="3.2" fill="#F8FAFC" stroke="#F59E0B" strokeWidth="1.4" />
      <circle cx="23" cy="41" r="3.2" fill="#F8FAFC" stroke="#F59E0B" strokeWidth="1.4" />
      <circle cx="41" cy="41" r="3.2" fill="#F8FAFC" stroke="#F59E0B" strokeWidth="1.4" />

      {/* Intermediate Face Reinforcement Bars */}
      <circle cx="32" cy="23" r="2.2" fill="#94A3B8" />
      <circle cx="32" cy="41" r="2.2" fill="#94A3B8" />
      <circle cx="23" cy="32" r="2.2" fill="#94A3B8" />
      <circle cx="41" cy="32" r="2.2" fill="#94A3B8" />

      {/* Bar Bending Schedule (BBS) Dimension Callout Leader */}
      <path d="M41 41L52 52H57" stroke="#38BDF8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="41" cy="41" r="1.2" fill="#38BDF8" />
      <text x="46" y="49" fontSize="3.6" fill="#38BDF8" fontFamily="monospace" fontWeight="bold">4-T16</text>
    </TechIconFrame>
  </svg>
);

/**
 * 8. Complete AutoCAD 2D & 3D Drafting Works Icon
 * Technical drafting triangle, precision centerlines, radial arc, and coordinate dimensioning.
 */
export const AutoCadWorksLogo: React.FC<LogoProps> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="AutoCAD Drafting Works">
    <TechIconFrame id="cad-works" accentColor="#E11D48">
      {/* Technical 45° Drafting Triangle / Set-Square */}
      <polygon points="12,50 48,50 12,14" fill="#0284C7" fillOpacity="0.25" stroke="#F8FAFC" strokeWidth="2" strokeLinejoin="round" />
      <polygon points="18,46 36,46 18,28" stroke="#38BDF8" strokeWidth="1.2" fill="#080E1A" />

      {/* Concentric Precision Radial Geometry Arc */}
      <path d="M30 20A18 18 0 0 1 50 40" stroke="#38BDF8" strokeWidth="1.6" fill="none" />
      
      {/* Radius Dimension Leader Line with 'R' Callout */}
      <line x1="38" y1="32" x2="47" y2="23" stroke="#F8FAFC" strokeWidth="1.2" />
      <path d="M47 23L42 24M47 23L46 28" stroke="#F8FAFC" strokeWidth="1.2" strokeLinecap="round" />
      <text x="48" y="21" fontSize="4.2" fill="#F8FAFC" fontFamily="monospace" fontWeight="bold">R25</text>

      {/* Orthographic Centerlines (— · — · —) */}
      <line x1="28" y1="40" x2="54" y2="40" stroke="#60A5FA" strokeWidth="0.8" strokeDasharray="4 1.5 1 1.5" />
      <line x1="41" y1="27" x2="41" y2="53" stroke="#60A5FA" strokeWidth="0.8" strokeDasharray="4 1.5 1 1.5" />

      {/* CAD Endpoint Snap Node Indicator */}
      <rect x="46.5" y="48.5" width="3" height="3" stroke="#10B981" strokeWidth="1" fill="none" />
    </TechIconFrame>
  </svg>
);

/**
 * 9. Interior Design (ID) Modeling Icon
 * Architectural interior section: suspended ceiling plenum, recessed luminaire slot, millwork wall elevation & floor datum.
 */
export const InteriorDesignLogo: React.FC<LogoProps> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Interior Design Modeling">
    <TechIconFrame id="int-design" accentColor="#D97706">
      {/* Structural Ceiling Slab & Reflected Ceiling Drop Plenum */}
      <path d="M12 16H52" stroke="#94A3B8" strokeWidth="2.4" />
      <path d="M18 22H46V26H18V22Z" fill="#292524" stroke="#F59E0B" strokeWidth="1.4" />

      {/* Recessed Architectural Linear Luminaire Slot */}
      <line x1="24" y1="24" x2="40" y2="24" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" />
      
      {/* Downward Light Spread Cones */}
      <path d="M26 26L21 44M38 26L43 44" stroke="#FDE68A" strokeWidth="0.8" strokeDasharray="2 1.5" strokeOpacity="0.7" />

      {/* Vertical Architectural Partition Wall / Millwork Panel */}
      <rect x="18" y="26" width="5" height="24" fill="#44403C" stroke="#F59E0B" strokeWidth="1.2" />
      <line x1="20.5" y1="26" x2="20.5" y2="50" stroke="#FDE68A" strokeWidth="0.8" strokeDasharray="2 2" />

      {/* Interior Cabinetry / Joinery Elevation */}
      <rect x="23" y="38" width="18" height="12" fill="#1C1917" stroke="#38BDF8" strokeWidth="1.2" />
      <line x1="32" y1="38" x2="32" y2="50" stroke="#38BDF8" strokeWidth="1" />
      <circle cx="28" cy="44" r="0.8" fill="#F8FAFC" />
      <circle cx="36" cy="44" r="0.8" fill="#F8FAFC" />

      {/* Finished Floor Level (FFL) Slab with Diagonal Hatch */}
      <path d="M12 50H52" stroke="#94A3B8" strokeWidth="2.4" />
      <path d="M44 54L48 50M48 54L52 50M40 54L44 50" stroke="#64748B" strokeWidth="1" />

      {/* Finished Floor Level Datum Marker (▽ FFL 0.00) */}
      <path d="M47 38L50 34H44L47 38Z" fill="#F59E0B" />
      <text x="41" y="32" fontSize="3.4" fill="#F59E0B" fontFamily="monospace" fontWeight="bold">FFL±0.0</text>
    </TechIconFrame>
  </svg>
);

/**
 * 10. Clash Detection & Multi-Trade Coordination Icon
 * 3D HVAC duct intersecting with structural/plumbing run, interference collision highlight box, and audit reticle.
 */
export const ClashCoordinationLogo: React.FC<LogoProps> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Clash Detection & Coordination">
    <TechIconFrame id="clash-coord" accentColor="#EF4444">
      {/* Primary Trade: Horizontal HVAC Ductwork Run (Cyan) */}
      <rect x="10" y="24" width="44" height="12" rx="1.5" fill="#0284C7" fillOpacity="0.25" stroke="#38BDF8" strokeWidth="1.8" />
      <line x1="10" y1="28" x2="54" y2="28" stroke="#BAE6FD" strokeWidth="0.8" strokeDasharray="2 1.5" />
      <line x1="10" y1="32" x2="54" y2="32" stroke="#BAE6FD" strokeWidth="0.8" strokeDasharray="2 1.5" />

      {/* Secondary Trade: Vertical Structural Steel / MEP Pipe Run (Blue) */}
      <rect x="27" y="11" width="10" height="42" rx="1.5" fill="#1E3A8A" fillOpacity="0.35" stroke="#60A5FA" strokeWidth="1.8" />
      <line x1="32" y1="11" x2="32" y2="53" stroke="#93C5FD" strokeWidth="0.8" strokeDasharray="3 1.5" />

      {/* Spatial Interference Clash Zone Bounding Box */}
      <rect x="25" y="22" width="14" height="16" rx="2" stroke="#EF4444" strokeWidth="2.2" strokeDasharray="3 1.5" fill="#EF4444" fillOpacity="0.25" />

      {/* High-Visibility Interference Crosshair Marker (✕) */}
      <line x1="28" y1="26" x2="36" y2="34" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="36" y1="26" x2="28" y2="34" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="32" cy="30" r="1.2" fill="#FFFFFF" />

      {/* Navisworks-Style Clash Audit Reticle Arc */}
      <circle cx="32" cy="30" r="15" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 2" fill="none" strokeOpacity="0.75" />

      {/* Clearance Resolution Callout */}
      <path d="M41 24L52 16H57" stroke="#EF4444" strokeWidth="1.4" strokeLinecap="round" />
      <text x="44" y="14" fontSize="3.6" fill="#EF4444" fontFamily="monospace" fontWeight="bold">CLASH #1</text>
    </TechIconFrame>
  </svg>
);

/**
 * Universal Service Discipline Logo Component
 * Precision-matches each service to its authoritative, technical-style engineering documentation icon.
 */
export const ServiceDisciplineLogo: React.FC<{ serviceId: string; className?: string }> = ({ 
  serviceId, 
  className = "w-10 h-10" 
}) => {
  switch (serviceId) {
    case 'building-planning':
      return <ArchitecturalPlanningLogo className={className} />;
    case '3d-model-design':
      return <Visualization3dLogo className={className} />;
    case 'bim-arch-structure':
      return <BimArchStructureLogo className={className} />;
    case 'scan-to-bim':
      return <ScanToBimLogo className={className} />;
    case 'scan-to-cad':
      return <ScanToCadLogo className={className} />;
    case 'cad-to-bim':
      return <CadToBimLogo className={className} />;
    case 'autocad-rebar-detailing':
      return <AutoCadRebarLogo className={className} />;
    case 'autocad-works':
      return <AutoCadWorksLogo className={className} />;
    case 'interior-design':
      return <InteriorDesignLogo className={className} />;
    case 'clash-coordination':
      return <ClashCoordinationLogo className={className} />;
    default:
      return <ArchitecturalPlanningLogo className={className} />;
  }
};
