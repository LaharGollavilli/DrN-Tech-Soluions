import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  Download, 
  Layers, 
  Building2, 
  Cpu, 
  ShieldAlert, 
  Sun, 
  Moon, 
  Compass, 
  Eye, 
  CheckCircle2, 
  FileCheck2,
  Sparkles,
  Maximize2
} from 'lucide-react';

type DisciplineKey = 'architectural' | 'structural' | 'mep' | 'clash';
type ViewAngle = 'isometric' | 'top-down' | 'front';
type LightModel = 'day' | 'night';

export const TechnicalSnapshotExporter: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode = false }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeLayers, setActiveLayers] = useState<Record<DisciplineKey, boolean>>({
    architectural: true,
    structural: true,
    mep: true,
    clash: true
  });
  const [viewAngle, setViewAngle] = useState<ViewAngle>('isometric');
  const [lighting, setLighting] = useState<LightModel>('day');
  const [isExporting, setIsExporting] = useState(false);
  const [lastExportTime, setLastExportTime] = useState<string | null>(null);

  // Three.js References
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const groupsRef = useRef<{
    archGroup: THREE.Group;
    structGroup: THREE.Group;
    mepGroup: THREE.Group;
    clashGroup: THREE.Group;
  }>({
    archGroup: new THREE.Group(),
    structGroup: new THREE.Group(),
    mepGroup: new THREE.Group(),
    clashGroup: new THREE.Group()
  });

  const stateRef = useRef({
    layers: activeLayers,
    angle: viewAngle,
    lighting: lighting
  });

  useEffect(() => {
    stateRef.current = {
      layers: activeLayers,
      angle: viewAngle,
      lighting: lighting
    };
  }, [activeLayers, viewAngle, lighting]);

  const toggleLayer = (key: DisciplineKey) => {
    setActiveLayers((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 700;
    const height = 480;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(lighting === 'night' ? 0x0f172a : 0xf8fafc);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.5, 300);
    camera.position.set(34, 26, 38);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true, // Crucial for high-res PNG export!
      alpha: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 4. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.target.set(0, 7.5, 0);
    controls.maxPolarAngle = Math.PI / 2 - 0.02;
    controlsRef.current = controls;

    // 5. Lighting
    const ambientLight = new THREE.HemisphereLight(0xffffff, 0xe2e8f0, 1.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
    sunLight.position.set(35, 45, 25);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    rimLight.position.set(-25, 20, -30);
    scene.add(rimLight);

    // Grid Floor
    const gridHelper = new THREE.GridHelper(60, 30, 0x0284c7, 0xcbd5e1);
    gridHelper.position.y = -0.01;
    scene.add(gridHelper);

    // 6. Groups & Procedural Model Geometry
    const archGroup = new THREE.Group();
    const structGroup = new THREE.Group();
    const mepGroup = new THREE.Group();
    const clashGroup = new THREE.Group();

    groupsRef.current = { archGroup, structGroup, mepGroup, clashGroup };
    scene.add(archGroup);
    scene.add(structGroup);
    scene.add(mepGroup);
    scene.add(clashGroup);

    // Materials
    const slabMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.8 });
    const colMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.35, metalness: 0.8 });
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.45,
      roughness: 0.1,
      metalness: 0.1
    });

    const ductMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      roughness: 0.3,
      metalness: 0.85
    });

    const pipeMat = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      roughness: 0.3,
      metalness: 0.7
    });

    const trayMat = new THREE.MeshStandardMaterial({
      color: 0xeab308,
      roughness: 0.4,
      metalness: 0.6
    });

    const clashMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      roughness: 0.2,
      emissive: 0xef4444,
      emissiveIntensity: 0.6
    });

    // Floor Slabs & Columns (Structure)
    [0, 5, 10, 15].forEach((h) => {
      const slab = new THREE.Mesh(new THREE.BoxGeometry(22, 0.4, 16), slabMat);
      slab.position.set(0, h, 0);
      structGroup.add(slab);
    });

    // Concrete core
    const core = new THREE.Mesh(new THREE.BoxGeometry(5, 16, 5), slabMat);
    core.position.set(-3, 8, -2);
    structGroup.add(core);

    // Columns
    for (let x = -8; x <= 8; x += 5.3) {
      for (let z = -6; z <= 6; z += 6) {
        const col = new THREE.Mesh(new THREE.BoxGeometry(0.45, 15, 0.45), colMat);
        col.position.set(x, 7.5, z);
        structGroup.add(col);
      }
    }

    // Facade Glazing (Architecture)
    [0, 5, 10].forEach((h) => {
      const frontGlass = new THREE.Mesh(new THREE.BoxGeometry(21.5, 4.4, 0.1), glassMat);
      frontGlass.position.set(0, h + 2.5, 8);
      archGroup.add(frontGlass);

      const sideGlass = new THREE.Mesh(new THREE.BoxGeometry(0.1, 4.4, 15.5), glassMat);
      sideGlass.position.set(11, h + 2.5, 0);
      archGroup.add(sideGlass);
    });

    // Roof parapet
    const parapet = new THREE.Mesh(new THREE.BoxGeometry(22.2, 0.8, 16.2), colMat);
    parapet.position.set(0, 15.6, 0);
    archGroup.add(parapet);

    // MEP Ductwork & Piping
    [4.1, 9.1].forEach((h) => {
      // Main duct
      const duct = new THREE.Mesh(new THREE.BoxGeometry(18, 0.5, 0.7), ductMat);
      duct.position.set(0, h, 1.5);
      mepGroup.add(duct);

      // Chilled water pipe
      const pipeGeo = new THREE.CylinderGeometry(0.12, 0.12, 18, 12);
      pipeGeo.rotateZ(Math.PI / 2);
      const pipe = new THREE.Mesh(pipeGeo, pipeMat);
      pipe.position.set(0, h + 0.35, -2);
      mepGroup.add(pipe);

      // Cable tray
      const tray = new THREE.Mesh(new THREE.BoxGeometry(18, 0.12, 0.45), trayMat);
      tray.position.set(0, h + 0.2, 4);
      mepGroup.add(tray);
    });

    // Roof Chiller
    const chiller = new THREE.Mesh(new THREE.BoxGeometry(4, 2, 2.5), ductMat);
    chiller.position.set(4, 16.5, 2);
    mepGroup.add(chiller);

    // Clash Pins
    const pinGeo = new THREE.SphereGeometry(0.4, 16, 16);
    const pin1 = new THREE.Mesh(pinGeo, clashMat);
    pin1.position.set(0, 4.3, 1.5);
    clashGroup.add(pin1);

    const pin2 = new THREE.Mesh(pinGeo, clashMat);
    pin2.position.set(-5, 9.3, -2);
    clashGroup.add(pin2);

    // 7. Render Loop
    let animId = 0;
    const animate = () => {
      const current = stateRef.current;

      // Layer visibility
      archGroup.visible = current.layers.architectural;
      structGroup.visible = current.layers.structural;
      mepGroup.visible = current.layers.mep;
      clashGroup.visible = current.layers.clash;

      // Lighting Model
      if (current.lighting === 'night') {
        scene.background = new THREE.Color(0x0a1120);
        gridHelper.material.opacity = 0.2;
        ambientLight.intensity = 0.35;
        sunLight.intensity = 0.5;
        sunLight.color.setHex(0x38bdf8);
        ductMat.emissive.setHex(0x0284c7);
        ductMat.emissiveIntensity = 0.6;
        pipeMat.emissive.setHex(0x2563eb);
        pipeMat.emissiveIntensity = 0.7;
        trayMat.emissive.setHex(0xeab308);
        trayMat.emissiveIntensity = 0.55;
        glassMat.opacity = 0.2;
      } else {
        scene.background = new THREE.Color(0xf8fafc);
        ambientLight.intensity = 1.4;
        sunLight.intensity = 2.0;
        sunLight.color.setHex(0xffffff);
        ductMat.emissiveIntensity = 0;
        pipeMat.emissiveIntensity = 0;
        trayMat.emissiveIntensity = 0;
        glassMat.opacity = 0.45;
      }

      controls.update();
      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      camera.aspect = newWidth / height;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Change camera projection angle
  const handleAngleChange = (angle: ViewAngle) => {
    setViewAngle(angle);
    if (!cameraRef.current || !controlsRef.current) return;

    if (angle === 'isometric') {
      cameraRef.current.position.set(34, 26, 38);
      controlsRef.current.target.set(0, 7.5, 0);
    } else if (angle === 'top-down') {
      cameraRef.current.position.set(0, 52, 0.01);
      controlsRef.current.target.set(0, 7.5, 0);
    } else if (angle === 'front') {
      cameraRef.current.position.set(0, 8, 48);
      controlsRef.current.target.set(0, 7.5, 0);
    }
    controlsRef.current.update();
  };

  // High-Resolution Snapshot Export with Title Block
  const exportSnapshot = () => {
    const renderer = rendererRef.current;
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    if (!renderer || !scene || !camera) return;

    setIsExporting(true);

    // Force a fresh render
    renderer.render(scene, camera);

    // Create an export canvas with an engineering title block
    const exportWidth = 1920;
    const exportHeight = 1080;
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = exportWidth;
    exportCanvas.height = exportHeight;
    const ctx = exportCanvas.getContext('2d');

    if (!ctx) {
      setIsExporting(false);
      return;
    }

    // Fill background
    ctx.fillStyle = lighting === 'night' ? '#0b101e' : '#ffffff';
    ctx.fillRect(0, 0, exportWidth, exportHeight);

    // Draw the 3D model view
    ctx.drawImage(renderer.domElement, 0, 0, exportWidth, exportHeight);

    // Engineering Title Block (Bottom Right)
    const tbWidth = 460;
    const tbHeight = 160;
    const tbX = exportWidth - tbWidth - 40;
    const tbY = exportHeight - tbHeight - 40;

    // Title Block Background
    ctx.fillStyle = lighting === 'night' ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)';
    ctx.fillRect(tbX, tbY, tbWidth, tbHeight);
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 2;
    ctx.strokeRect(tbX, tbY, tbWidth, tbHeight);

    // Header bar
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(tbX, tbY, tbWidth, 32);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('DHARANI TECH SOLUTIONS • VDC ENGINEERING', tbX + 16, tbY + 21);

    // Details Text
    ctx.fillStyle = lighting === 'night' ? '#f1f5f9' : '#0f172a';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText(`SHEET: ${viewAngle.toUpperCase()} TECHNICAL SNAPSHOT`, tbX + 16, tbY + 60);

    ctx.font = '12px monospace';
    ctx.fillStyle = lighting === 'night' ? '#94a3b8' : '#475569';
    ctx.fillText(`DISCIPLINES: ${Object.entries(activeLayers).filter(([, v]) => v).map(([k]) => k.toUpperCase().slice(0, 4)).join(' + ')}`, tbX + 16, tbY + 84);
    ctx.fillText(`LIGHTING: ${lighting === 'night' ? 'LOW-LIGHT PLENUM AUDIT' : 'DAY SOLAR ENVIRONMENT'}`, tbX + 16, tbY + 104);
    ctx.fillText(`SPECIFICATION: AIA G202 / ISO 19650-2 • LOD 350`, tbX + 16, tbY + 124);
    ctx.fillText(`DATE: ${new Date().toISOString().split('T')[0]} • APPROVED FOR COORDINATION`, tbX + 16, tbY + 144);

    // Outer Blueprint Border
    ctx.strokeStyle = lighting === 'night' ? 'rgba(56, 189, 248, 0.4)' : '#cbd5e1';
    ctx.lineWidth = 2;
    ctx.strokeRect(20, 20, exportWidth - 40, exportHeight - 40);

    // Convert to PNG download
    const dataUrl = exportCanvas.toDataURL('image/png');
    const link = document.createElement('a');
    const fileName = `Dharani_BIM_Snapshot_${viewAngle}_${lighting}_${Date.now()}.png`;
    link.download = fileName;
    link.href = dataUrl;
    link.click();

    setLastExportTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    setIsExporting(false);
  };

  return (
    <div className="w-full rounded-2xl bg-white border border-slate-200 shadow-md p-6 sm:p-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 gap-4 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-semibold mb-1.5 font-mono">
            <FileCheck2 className="w-3.5 h-3.5 text-sky-600" />
            <span>TECHNICAL DRAWING & SNAPSHOT EXPORTER</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
            Export Model Sheets & Technical Snapshots
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Configure active trade layers and projection angles, then download a high-resolution PNG with official title block for client RFPs and coordination reviews.
          </p>
        </div>

        {/* Export CTA Button */}
        <div className="flex flex-col items-end gap-1.5 w-full sm:w-auto">
          <button
            onClick={exportSnapshot}
            disabled={isExporting}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 active:scale-98 text-white font-bold text-xs shadow-md shadow-sky-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Generating High-Res Sheet...' : 'Export High-Res Snapshot (.PNG)'}</span>
          </button>
          {lastExportTime && (
            <span className="text-[11px] font-mono text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Exported at {lastExportTime}
            </span>
          )}
        </div>
      </div>

      {/* Control Toolbar */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 p-3 rounded-xl bg-slate-50 border border-slate-200">
        {/* Layer Visibility Checkboxes */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono font-semibold text-slate-600 mr-1 uppercase">
            Discipline Layers:
          </span>

          <button
            onClick={() => toggleLayer('architectural')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer border ${
              activeLayers.architectural
                ? 'bg-white text-sky-900 border-sky-400 font-semibold shadow-xs'
                : 'bg-slate-100 text-slate-500 border-slate-200'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-sky-600" />
            <span>Architecture</span>
          </button>

          <button
            onClick={() => toggleLayer('structural')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer border ${
              activeLayers.structural
                ? 'bg-white text-sky-900 border-sky-400 font-semibold shadow-xs'
                : 'bg-slate-100 text-slate-500 border-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-sky-600" />
            <span>Structure</span>
          </button>

          <button
            onClick={() => toggleLayer('mep')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer border ${
              activeLayers.mep
                ? 'bg-white text-sky-900 border-sky-400 font-semibold shadow-xs'
                : 'bg-slate-100 text-slate-500 border-slate-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-sky-600" />
            <span>MEP Systems</span>
          </button>

          <button
            onClick={() => toggleLayer('clash')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer border ${
              activeLayers.clash
                ? 'bg-red-50 text-red-700 border-red-300 font-semibold'
                : 'bg-slate-100 text-slate-500 border-slate-200'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
            <span>Clashes</span>
          </button>
        </div>

        {/* View Angle & Lighting Switchers */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Angle buttons */}
          <div className="flex items-center gap-1 p-0.5 rounded-lg bg-white border border-slate-200">
            <button
              onClick={() => handleAngleChange('isometric')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                viewAngle === 'isometric' ? 'bg-sky-600 text-white font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Isometric 3D
            </button>
            <button
              onClick={() => handleAngleChange('top-down')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                viewAngle === 'top-down' ? 'bg-sky-600 text-white font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Floor Plan Cut
            </button>
            <button
              onClick={() => handleAngleChange('front')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                viewAngle === 'front' ? 'bg-sky-600 text-white font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Elevation
            </button>
          </div>

          {/* Lighting Mode toggle */}
          <div className="flex items-center gap-1 p-0.5 rounded-lg bg-white border border-slate-200">
            <button
              onClick={() => setLighting('day')}
              className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1 transition-all ${
                lighting === 'day' ? 'bg-amber-100 text-amber-900 font-semibold' : 'text-slate-600'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-amber-600" />
              <span>Day Solar</span>
            </button>
            <button
              onClick={() => setLighting('night')}
              className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1 transition-all ${
                lighting === 'night' ? 'bg-slate-800 text-sky-300 font-semibold' : 'text-slate-600'
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-sky-400" />
              <span>Night MEP</span>
            </button>
          </div>
        </div>
      </div>

      {/* Snapshot Viewport */}
      <div className="mt-4 relative w-full h-[480px] rounded-xl overflow-hidden border border-slate-300 shadow-inner bg-slate-50 select-none">
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Viewport Overlay Indicators */}
        <div className="absolute top-3 left-3 pointer-events-none flex items-center gap-2">
          <div className="px-3 py-1 rounded-md bg-white/90 backdrop-blur-sm border border-slate-200 text-xs font-mono text-slate-700 shadow-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-500" />
            <span>LOD 350 • {viewAngle.toUpperCase()} VIEW</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500">{lighting === 'day' ? 'Day Light' : 'Plenum Luminescence'}</span>
          </div>
        </div>

        <div className="absolute bottom-3 left-3 pointer-events-none text-[11px] font-mono text-slate-500 bg-white/80 px-2.5 py-1 rounded border border-slate-200 shadow-xs">
          Click & Drag to Orbit • Scroll to Zoom
        </div>
      </div>
    </div>
  );
};
