import React from 'react';

interface ArchitecturalBackgroundOverlayProps {
  isDarkMode?: boolean;
}

export const ArchitecturalBackgroundOverlay: React.FC<ArchitecturalBackgroundOverlayProps> = ({ 
  isDarkMode = false 
}) => {
  const strokeColor = isDarkMode ? '#38bdf8' : '#0284c7';

  return (
    <div 
      aria-hidden="true" 
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-500 ${
        isDarkMode ? 'opacity-[0.055]' : 'opacity-[0.035]'
      }`}
    >
      <svg 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* 100px x 100px Primary Structural Grid Pattern */}
          <pattern id="arch-primary-grid" width="160" height="160" patternUnits="userSpaceOnUse">
            {/* Grid line intersections */}
            <path d="M 160 0 L 0 0 0 160" fill="none" stroke={strokeColor} strokeWidth="0.8" strokeDasharray="3 3" />
            <circle cx="0" cy="0" r="1.5" fill={strokeColor} />
            <circle cx="160" cy="0" r="1.5" fill={strokeColor} />
            <circle cx="0" cy="160" r="1.5" fill={strokeColor} />
            
            {/* Fine Subdivisions */}
            <path d="M 80 0 L 80 160 M 0 80 L 160 80" fill="none" stroke={strokeColor} strokeWidth="0.4" strokeDasharray="1 5" />
            
            {/* Subtle Crosshairs */}
            <path d="M 77 80 L 83 80 M 80 77 L 80 83" fill="none" stroke={strokeColor} strokeWidth="0.8" />
          </pattern>
        </defs>

        {/* Fill whole screen with CAD grid */}
        <rect width="100%" height="100%" fill="url(#arch-primary-grid)" />

        {/* Top-Right: Isometric 3D BIM Wireframe Frame */}
        <g transform="translate(850, 60) scale(0.9)" stroke={strokeColor} fill="none" strokeWidth="1.2">
          {/* Isometric Building Structure */}
          {/* Base */}
          <polygon points="120,60 240,120 120,180 0,120" strokeDasharray="4 2" />
          {/* First Tier Columns */}
          <line x1="0" y1="120" x2="0" y2="40" />
          <line x1="120" y1="180" x2="120" y2="100" />
          <line x1="240" y1="120" x2="240" y2="40" />
          <line x1="120" y1="60" x2="120" y2="-20" strokeDasharray="2 2" />
          {/* First Slab */}
          <polygon points="120,-20 240,40 120,100 0,40" />
          {/* Second Tier Columns */}
          <line x1="0" y1="40" x2="0" y2="-40" />
          <line x1="120" y1="100" x2="120" y2="20" />
          <line x1="240" y1="40" x2="240" y2="-40" />
          {/* Roof Slab */}
          <polygon points="120,-100 240,-40 120,20 0,-40" />
          {/* Grid annotations */}
          <text x="125" y="115" fill={strokeColor} fontSize="9" fontFamily="monospace">GRID B-2 (STR)</text>
          <text x="5" y="45" fill={strokeColor} fontSize="8" fontFamily="monospace">LOD 350 BEAM</text>
        </g>

        {/* Left Side: Architectural Column Grid Bubbles & Dimension Lines */}
        <g stroke={strokeColor} fill="none" strokeWidth="1">
          {/* Grid Line A */}
          <line x1="80" y1="20" x2="80" y2="900" strokeDasharray="6 3" />
          <circle cx="80" cy="40" r="14" />
          <text x="80" y="44" textAnchor="middle" fill={strokeColor} fontSize="11" fontFamily="monospace" fontWeight="bold">A</text>

          {/* Grid Line B */}
          <line x1="240" y1="20" x2="240" y2="900" strokeDasharray="6 3" />
          <circle cx="240" cy="40" r="14" />
          <text x="240" y="44" textAnchor="middle" fill={strokeColor} fontSize="11" fontFamily="monospace" fontWeight="bold">B</text>

          {/* Grid Line C */}
          <line x1="400" y1="20" x2="400" y2="900" strokeDasharray="6 3" />
          <circle cx="400" cy="40" r="14" />
          <text x="400" y="44" textAnchor="middle" fill={strokeColor} fontSize="11" fontFamily="monospace" fontWeight="bold">C</text>

          {/* Dimension string between A and B */}
          <line x1="80" y1="70" x2="240" y2="70" markerStart="url(#tick)" markerEnd="url(#tick)" />
          <path d="M 75 66 L 85 74 M 235 66 L 245 74" />
          <text x="160" y="65" textAnchor="middle" fill={strokeColor} fontSize="9" fontFamily="monospace">6000 mm</text>

          {/* Dimension string between B and C */}
          <line x1="240" y1="70" x2="400" y2="70" />
          <path d="M 235 66 L 245 74 M 395 66 L 405 74" />
          <text x="320" y="65" textAnchor="middle" fill={strokeColor} fontSize="9" fontFamily="monospace">4500 mm</text>

          {/* Level Markers on Left */}
          <g transform="translate(15, 300)">
            <polygon points="0,0 20,0 10,12" fill={strokeColor} />
            <line x1="0" y1="0" x2="60" y2="0" strokeWidth="1.2" />
            <text x="25" y="-4" fill={strokeColor} fontSize="9" fontFamily="monospace">▼ +7.200m LVL 2</text>
          </g>
          <g transform="translate(15, 520)">
            <polygon points="0,0 20,0 10,12" fill={strokeColor} />
            <line x1="0" y1="0" x2="60" y2="0" strokeWidth="1.2" />
            <text x="25" y="-4" fill={strokeColor} fontSize="9" fontFamily="monospace">▼ +3.600m LVL 1</text>
          </g>
          <g transform="translate(15, 740)">
            <polygon points="0,0 20,0 10,12" fill={strokeColor} />
            <line x1="0" y1="0" x2="60" y2="0" strokeWidth="1.2" />
            <text x="25" y="-4" fill={strokeColor} fontSize="9" fontFamily="monospace">▼ ±0.000m FFL</text>
          </g>
        </g>

        {/* Bottom Right: Architectural North Symbol & Scale */}
        <g transform="translate(1100, 720)" stroke={strokeColor} fill="none" strokeWidth="1.2">
          <circle cx="40" cy="40" r="30" />
          <polygon points="40,15 48,40 40,36" fill={strokeColor} />
          <polygon points="40,15 32,40 40,36" />
          <text x="40" y="10" textAnchor="middle" fill={strokeColor} fontSize="11" fontFamily="monospace" fontWeight="bold">N</text>
          <text x="40" y="82" textAnchor="middle" fill={strokeColor} fontSize="8" fontFamily="monospace">PROJECT NORTH (REVIT)</text>
        </g>
      </svg>
    </div>
  );
};
