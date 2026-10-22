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
