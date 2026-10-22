import React, { useState, useRef, useCallback } from 'react';
import { Layers, FileCode2, Sparkles, CheckCircle2, ArrowLeftRight } from 'lucide-react';

interface PresetScene {
  id: string;
  name: string;
  cadTag: string;
  bimTag: string;
  cadStats: string[];
  bimStats: string[];
}

const PRESET_SCENES: PresetScene[] = [
  {
    id: 'floor-plan',
    name: 'Level 03 Coordinated Floor Layout',
    cadTag: '2D DWG Flat CAD File (Uncoordinated)',
    bimTag: 'LOD 350 Intelligent Revit Model (Clash-Free)',
    cadStats: ['Static 2D Lines & Text', 'Hidden Elevation Collisions', 'Manual Dimension Scaling Needed'],
    bimStats: ['Parametric 3D Revit Families', 'Real-Time Slope & Space Verification', 'Automated Dynamic QTO Extraction']
  },
  {
    id: 'mep-plant',
    name: 'Primary MEP Chiller & Plant Room',
    cadTag: '2D Schematic P&ID / Single-Line Drawing',
    bimTag: 'Multi-Discipline LOD 400 Spool Coordination',
    cadStats: ['Zero Vertical Clearance Verification', 'No Flange or Valve Access Modeling', 'High Risk of Jobsite Rework'],
    bimStats: ['True Flange, Valve & Insulation Clearances', 'Spool Fabrication-Ready Drawings', '100% Navisworks Clash Clearance Certified']
  }
];

export const CadToBimSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const [activeScene, setActiveScene] = useState<PresetScene>(PRESET_SCENES[0]);
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = () => {
    isDragging.current = true;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clamped = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(clamped);
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    updatePosition(e.touches[0].clientX);
  };

  return (
    <div className="w-full">
      {/* Header with Scene Presets */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 gap-3">
        <div>
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5 font-semibold">
            <ArrowLeftRight className="w-3.5 h-3.5" /> Interactive CAD vs BIM Paradigm Shift
          </span>
          <h3 className="text-xl font-bold text-white tracking-tight mt-0.5">
            {activeScene.name}
          </h3>
        </div>

        {/* Scene Selector */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800">
          {PRESET_SCENES.map((scene) => (
            <button
              key={scene.id}
              onClick={() => setActiveScene(scene)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeScene.id === scene.id
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {scene.name.split(' ')[0]} {scene.name.split(' ')[1]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Comparison Viewport */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        onTouchStart={handlePointerDown}
        onTouchEnd={handlePointerUp}
        onTouchMove={handleTouchMove}
        className="relative w-full h-[460px] md:h-[520px] rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl select-none cursor-ew-resize bg-[#070b14]"
      >
        {/* RIGHT LAYER: 3D Parametric BIM Model (Full Container) */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-900 via-[#0a1224] to-[#071328] overflow-hidden">
          {/* Stylized 3D Model Rendering Graphic */}
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <svg viewBox="0 0 800 500" className="w-full h-full drop-shadow-2xl">
              <defs>
                <linearGradient id="wall3D" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.9" />
                </linearGradient>
                <linearGradient id="slab3D" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#64748b" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#334155" stopOpacity="0.95" />
                </linearGradient>
                <linearGradient id="duct3D" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="50%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#0891b2" />
                </linearGradient>
                <linearGradient id="pipe3D" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#1d4ed8" />
                </linearGradient>
              </defs>

              {/* Perspective Grid Plane */}
              <g stroke="#1e293b" strokeWidth="1" opacity="0.6">
                {[0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500].map((y) => (
                  <line key={`grid-${y}`} x1="0" y1={y} x2="800" y2={y} />
                ))}
                {[0, 80, 160, 240, 320, 400, 480, 560, 640, 720, 800].map((x) => (
                  <line key={`gridx-${x}`} x1={x} y1="0" x2={x} y2="500" />
                ))}
              </g>

              {/* Concrete Slab Floor (Perspective Isometric) */}
              <polygon points="120,400 680,400 740,430 180,430" fill="url(#slab3D)" stroke="#94a3b8" strokeWidth="1.5" />
              <polygon points="180,430 740,430 740,445 180,445" fill="#1e293b" stroke="#64748b" strokeWidth="1" />

              {/* 3D Extruded Architectural Walls */}
              <polygon points="180,180 220,160 220,400 180,400" fill="#334155" stroke="#475569" strokeWidth="1.5" />
              <polygon points="220,160 480,160 480,400 220,400" fill="url(#wall3D)" stroke="#38bdf8" strokeWidth="1.5" opacity="0.85" />
              <polygon points="480,160 520,180 520,400 480,400" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />

              {/* Glass Curtain Window Inset with Reflections */}
              <rect x="250" y="210" width="180" height="130" fill="#0284c7" fillOpacity="0.35" stroke="#38bdf8" strokeWidth="2" />
              <line x1="340" y1="210" x2="340" y2="340" stroke="#bae6fd" strokeWidth="2" />
              <line x1="250" y1="275" x2="430" y2="275" stroke="#bae6fd" strokeWidth="1.5" />

              {/* Structural Steel Columns */}
              <rect x="190" y="140" width="22" height="260" fill="#1e293b" stroke="#94a3b8" strokeWidth="1.5" />
              <rect x="470" y="140" width="22" height="260" fill="#1e293b" stroke="#94a3b8" strokeWidth="1.5" />
              <rect x="620" y="140" width="22" height="260" fill="#1e293b" stroke="#94a3b8" strokeWidth="1.5" />

              {/* 3D Galvanized Air Duct Routing */}
              <path d="M 100,110 L 660,110 L 660,150 L 100,150 Z" fill="url(#duct3D)" stroke="#22d3ee" strokeWidth="1.5" />
              {/* Duct Segment Flanges */}
              {[200, 320, 440, 560].map((dx) => (
                <rect key={`flange-${dx}`} x={dx} y="105" width="8" height="50" fill="#0e7490" stroke="#a5f3fc" strokeWidth="1" />
              ))}
              {/* Branch Duct Drop */}
              <path d="M 330,150 L 330,220 L 370,220 L 370,150 Z" fill="url(#duct3D)" stroke="#22d3ee" strokeWidth="1.5" />
              {/* Supply Air Diffuser */}
              <rect x="315" y="220" width="70" height="15" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />

              {/* 3D Chilled Water Piping Lines */}
              <path d="M 110,80 L 650,80" stroke="url(#pipe3D)" strokeWidth="10" strokeLinecap="round" />
              <path d="M 110,95 L 650,95" stroke="#f97316" strokeWidth="7" strokeLinecap="round" />

              {/* Revit Parametric Smart Tags / Callouts */}
              <g transform="translate(500, 110)">
                <circle cx="0" cy="0" r="4" fill="#22d3ee" />
                <line x1="0" y1="0" x2="40" y2="-30" stroke="#22d3ee" strokeWidth="1.5" />
                <line x1="40" y1="-30" x2="160" y2="-30" stroke="#22d3ee" strokeWidth="1.5" />
                <rect x="40" y="-55" width="140" height="24" rx="4" fill="#0f172a" stroke="#22d3ee" strokeWidth="1" />
                <text x="46" y="-39" fill="#e2e8f0" fontSize="10" fontFamily="monospace" fontWeight="bold">
                  DUCT: 1200x500mm [LOD 350]
                </text>
              </g>

              <g transform="translate(300, 320)">
                <circle cx="0" cy="0" r="4" fill="#38bdf8" />
                <line x1="0" y1="0" x2="-40" y2="40" stroke="#38bdf8" strokeWidth="1.5" />
                <line x1="-40" y1="40" x2="-140" y2="40" stroke="#38bdf8" strokeWidth="1.5" />
                <rect x="-165" y="45" width="135" height="24" rx="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
                <text x="-158" y="61" fill="#e2e8f0" fontSize="10" fontFamily="monospace" fontWeight="bold">
                  WALL: CW-101 Glazing [U=0.28]
                </text>
              </g>
            </svg>
          </div>

          {/* Top Right BIM Tag */}
          <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-lg bg-cyan-950/80 backdrop-blur-md border border-cyan-500/40 text-cyan-300 font-mono text-xs flex items-center gap-1.5 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-semibold">{activeScene.bimTag}</span>
          </div>

          {/* Bottom Right BIM Spec Callout */}
          <div className="absolute bottom-4 right-4 z-10 max-w-xs p-3 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-xs hidden md:block shadow-xl">
            <span className="text-[10px] font-mono text-cyan-400 uppercase font-semibold">BIM Advantages:</span>
            <ul className="mt-1 space-y-1 text-slate-300 text-[11px]">
              {activeScene.bimStats.map((stat, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                  <span>{stat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* LEFT LAYER: 2D Raw AutoCAD DWG Drawing (Clipped by sliderPosition) */}
        <div
          className="absolute inset-0 h-full overflow-hidden border-r-2 border-cyan-400 bg-[#020617]"
          style={{ width: `${sliderPosition}%` }}
        >
          {/* Inner wrapper sized 100% of container so vectors don't squish */}
          <div className="w-[800px] h-full relative" style={{ width: containerRef.current?.clientWidth || '100%' }}>
            {/* Dark AutoCAD Classic Blueprint Grid Background */}
            <div className="absolute inset-0 bg-[#020617] bg-blueprint-grid opacity-70" />

            {/* Flat 2D CAD Vector Graphic */}
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <svg viewBox="0 0 800 500" className="w-full h-full opacity-90">
                {/* 2D Architectural Wall Footprint (Cyan Linework) */}
                <rect x="180" y="160" width="340" height="240" fill="none" stroke="#00ffff" strokeWidth="2.5" />
                <rect x="195" y="175" width="310" height="210" fill="none" stroke="#00ffff" strokeWidth="1.2" strokeDasharray="6 3" />

                {/* Interior Wall Partitions */}
                <line x1="330" y1="175" x2="330" y2="385" stroke="#00ffff" strokeWidth="2" />
                <line x1="195" y1="280" x2="330" y2="280" stroke="#00ffff" strokeWidth="2" />

                {/* 2D Door Swings (Quarter Circles) */}
                <path d="M 230,280 A 35,35 0 0,1 265,315" fill="none" stroke="#ffff00" strokeWidth="1.5" />
                <line x1="230" y1="280" x2="230" y2="315" stroke="#ffff00" strokeWidth="1.5" />

                {/* 2D Structural Column Grid Crosses */}
                {[
                  [190, 160], [330, 160], [520, 160],
                  [190, 280], [330, 280], [520, 280],
                  [190, 400], [330, 400], [520, 400]
                ].map(([cx, cy], i) => (
                  <g key={`cad-col-${i}`} stroke="#ff0055" strokeWidth="1.5">
                    <rect x={cx - 10} y={cy - 10} width="20" height="20" fill="none" />
                    <line x1={cx - 14} y1={cy} x2={cx + 14} y2={cy} />
                    <line x1={cx} y1={cy - 14} x2={cx} y2={cy + 14} />
                  </g>
                ))}

                {/* CAD Dimension Witness Lines & Ticks (Yellow/Green) */}
                <g stroke="#22c55e" strokeWidth="1.2">
                  <line x1="180" y1="130" x2="520" y2="130" />
                  <line x1="180" y1="120" x2="180" y2="140" />
                  <line x1="520" y1="120" x2="520" y2="140" />
                  <line x1="175" y1="125" x2="185" y2="135" strokeWidth="2" />
                  <line x1="515" y1="125" x2="525" y2="135" strokeWidth="2" />
                  <text x="325" y="122" fill="#22c55e" fontSize="12" fontFamily="monospace" fontWeight="bold">
                    8,450 mm
                  </text>
                </g>

                {/* 2D Single Line MEP schematic with no Z-axis */}
                <line x1="100" y1="110" x2="660" y2="110" stroke="#00ffff" strokeWidth="1.5" strokeDasharray="10 5" />
                <text x="110" y="105" fill="#00ffff" fontSize="10" fontFamily="monospace">
                  - - SUPPLY AIR LINE (NO ELEV) - -
                </text>

                {/* 2D Discrepancy Note Callout */}
                <g transform="translate(190, 340)">
                  <rect x="0" y="0" width="130" height="35" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                  <text x="8" y="16" fill="#fca5a5" fontSize="9" fontFamily="monospace" fontWeight="bold">
                    [!] UNVERIFIED CLEARANCE
                  </text>
                  <text x="8" y="28" fill="#f87171" fontSize="8" fontFamily="monospace">
                    Beam drop not coordinated
                  </text>
                </g>
              </svg>
            </div>

            {/* Top Left 2D CAD Tag */}
            <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-lg bg-slate-950/90 backdrop-blur-md border border-slate-700 text-slate-300 font-mono text-xs flex items-center gap-1.5 shadow-lg">
              <FileCode2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>{activeScene.cadTag}</span>
            </div>

            {/* Bottom Left CAD Pain Points */}
            <div className="absolute bottom-4 left-4 z-10 max-w-xs p-3 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-800 text-xs hidden md:block shadow-xl">
              <span className="text-[10px] font-mono text-red-400 uppercase font-semibold">Legacy 2D Risks:</span>
              <ul className="mt-1 space-y-1 text-slate-400 text-[11px]">
                {activeScene.cadStats.map((stat, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                    <span>{stat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* DRAGGABLE DIVIDER HANDLE */}
        <div
          className="absolute top-0 bottom-0 z-30 flex items-center justify-center -translate-x-1/2 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Vertical Glowing Line */}
          <div className="w-[3px] h-full bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.8)]" />

          {/* Central Circular Knob */}
          <div className="absolute w-10 h-10 rounded-full bg-slate-950 border-2 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.7)] flex items-center justify-center text-cyan-400 pointer-events-auto cursor-ew-resize hover:scale-110 active:scale-95 transition-transform">
            <ArrowLeftRight className="w-4 h-4" />
          </div>

          {/* Percentage Indicator Badge */}
          <div className="absolute bottom-8 px-2 py-0.5 rounded bg-slate-950/90 border border-cyan-500/50 text-[10px] font-mono text-cyan-400 shadow-md">
            {sliderPosition.toFixed(0)}%
          </div>
        </div>
      </div>
    </div>
  );
};
