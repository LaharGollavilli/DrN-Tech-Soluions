import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { 
  Building2, 
  Layers, 
  Cpu, 
  ShieldAlert, 
  RotateCw, 
  Eye, 
  Maximize2, 
  ChevronDown, 
  ChevronUp, 
  Compass, 
  Sparkles,
  Info,
  Sun,
  Moon
} from 'lucide-react';

type DisciplineFilter = 'all' | 'architectural' | 'structural' | 'mep' | 'clash';
type ViewMode = 'shaded' | 'wireframe' | 'xray' | 'exploded';
type FloorLevel = 'all' | 'roof' | 'level3' | 'level2' | 'ground';
type LightingMode = 'day' | 'night';

export const BimViewer3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeDiscipline, setActiveDiscipline] = useState<DisciplineFilter>('all');
  const [activeViewMode, setActiveViewMode] = useState<ViewMode>('shaded');
  const [activeFloor, setActiveFloor] = useState<FloorLevel>('all');
  const [lightingMode, setLightingMode] = useState<LightingMode>('day');
  const [isRotating, setIsRotating] = useState(true);
  const [isDockCollapsed, setIsDockCollapsed] = useState(false);
  const [activeClashCount, setActiveClashCount] = useState(4);
  const [selectedElementInfo, setSelectedElementInfo] = useState<string | null>(null);

  // References for Three.js instance
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animFrameRef = useRef<number>(0);
  const groupsRef = useRef<{
    archGroup: THREE.Group;
    structGroup: THREE.Group;
    mepGroup: THREE.Group;
    clashGroup: THREE.Group;
    levels: { [key in FloorLevel]?: THREE.Group };
  }>({
    archGroup: new THREE.Group(),
    structGroup: new THREE.Group(),
    mepGroup: new THREE.Group(),
    clashGroup: new THREE.Group(),
    levels: {}
  });

  // State refs to access inside animation loop without stale closures
  const stateRef = useRef({
    discipline: activeDiscipline,
    viewMode: activeViewMode,
    floor: activeFloor,
    lightingMode: lightingMode,
    rotating: isRotating
  });

  useEffect(() => {
    stateRef.current = {
      discipline: activeDiscipline,
      viewMode: activeViewMode,
      floor: activeFloor,
      lightingMode: lightingMode,
      rotating: isRotating
    };
  }, [activeDiscipline, activeViewMode, activeFloor, lightingMode, isRotating]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 560;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color('#0b101e');
    scene.fog = new THREE.FogExp2('#0b101e', 0.015);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.5, 300);
    camera.position.set(38, 28, 42);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: false
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 4. Studio Environment
    try {
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
      pmremGenerator.dispose();
    } catch {
      // Fallback if RoomEnvironment fails
    }

    // 5. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 8, 0);
    controls.maxPolarAngle = Math.PI / 2 - 0.02; // Don't go below ground
    controls.minDistance = 12;
    controls.maxDistance = 100;
    controlsRef.current = controls;

    // 6. Lighting Rig
    const ambientLight = new THREE.HemisphereLight(0x90b8ff, 0x081020, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff8ee, 2.4);
    keyLight.position.set(40, 50, 30);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.camera.near = 10;
      keyLight.shadow.camera.far = 120;
      keyLight.shadow.camera.left = -25;
      keyLight.shadow.camera.right = 25;
      keyLight.shadow.camera.top = 25;
      keyLight.shadow.camera.bottom = -25;
    }
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x06b6d4, 1.8);
    rimLight.position.set(-30, 25, -35);
    scene.add(rimLight);

    // MEP Low-Light Inspection Luminaires (Active in Night Mode)
    const mepNightLightsGroup = new THREE.Group();
    mepNightLightsGroup.visible = false;
    scene.add(mepNightLightsGroup);

    // Ceiling plenum worklights for Level 2 & 3 MEP routing
    const nightLight1 = new THREE.PointLight(0x38bdf8, 2.5, 22);
    nightLight1.position.set(0, 4.3, 1);
    mepNightLightsGroup.add(nightLight1);

    const nightLight2 = new THREE.PointLight(0x06b6d4, 2.5, 22);
    nightLight2.position.set(-5, 9.3, -1);
    mepNightLightsGroup.add(nightLight2);

    const nightLight3 = new THREE.PointLight(0x38bdf8, 2.5, 22);
    nightLight3.position.set(5, 9.3, 1);
    mepNightLightsGroup.add(nightLight3);

    // Rooftop chiller plant inspection light
    const nightLightRoof = new THREE.PointLight(0x38bdf8, 3.0, 18);
    nightLightRoof.position.set(0, 18, 3);
    mepNightLightsGroup.add(nightLightRoof);

    // 7. Ground Grid & Contact Shadow
    const gridHelper = new THREE.GridHelper(70, 35, 0x0284c7, 0x1e293b);
    gridHelper.position.y = -0.01;
    scene.add(gridHelper);

    // Radial ground contact shadow
    const shadowGeo = new THREE.PlaneGeometry(36, 36);
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(64, 64, 10, 64, 64, 60);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
    grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.3)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
    const shadowTexture = new THREE.CanvasTexture(canvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.8,
      depthWrite: false
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = 0.01;
    scene.add(shadowPlane);

    // 8. PROCEDURAL BIM MODEL GENERATION (Composite 3-12 Part Groups)
    const archGroup = new THREE.Group();
    const structGroup = new THREE.Group();
    const mepGroup = new THREE.Group();
    const clashGroup = new THREE.Group();

    const groundLevel = new THREE.Group();
    const level2Group = new THREE.Group();
    const level3Group = new THREE.Group();
    const roofGroup = new THREE.Group();

    groupsRef.current = {
      archGroup,
      structGroup,
      mepGroup,
      clashGroup,
      levels: {
        ground: groundLevel,
        level2: level2Group,
        level3: level3Group,
        roof: roofGroup
      }
    };

    scene.add(archGroup);
    scene.add(structGroup);
    scene.add(mepGroup);
    scene.add(clashGroup);

    // Materials
    const concreteMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.8,
      metalness: 0.1
    });

    const steelColumnMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.35,
      metalness: 0.85
    });

    const glassCurtainMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      roughness: 0.1,
      metalness: 0.1,
      transmission: isSoftwareGl ? 0 : 0.8,
      transparent: true,
      opacity: isSoftwareGl ? 0.35 : 0.65,
      ior: 1.5,
      thickness: 0.5
    });

    const ductMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4, // Cyan galvanized duct
      roughness: 0.25,
      metalness: 0.9
    });

    const chilledPipeMat = new THREE.MeshStandardMaterial({
      color: 0x2563eb, // Cobalt blue chilled water
      roughness: 0.3,
      metalness: 0.8
    });

    const hotPipeMat = new THREE.MeshStandardMaterial({
      color: 0xf97316, // Orange heating hydronic
      roughness: 0.3,
      metalness: 0.8
    });

    const trayMat = new THREE.MeshStandardMaterial({
      color: 0xeab308, // Yellow electrical tray
      roughness: 0.4,
      metalness: 0.7
    });

    const clashMat = new THREE.MeshStandardMaterial({
      color: 0xef4444, // Red clash indicator
      roughness: 0.2,
      metalness: 0.5,
      emissive: 0xef4444,
      emissiveIntensity: 0.6
    });

    // Floor parameters
    const buildingWidth = 24;
    const buildingDepth = 18;
    const floorHeights = [0, 5, 10, 15]; // Ground, L2, L3, Roof

    // --- STRUCTURAL DISCIPLINE ---
    // Concrete slabs at each floor
    floorHeights.forEach((h, idx) => {
      const slabGeo = new THREE.BoxGeometry(buildingWidth, 0.45, buildingDepth);
      const slab = new THREE.Mesh(slabGeo, concreteMat);
      slab.position.set(0, h, 0);
      slab.castShadow = !isSoftwareGl;
      slab.receiveShadow = !isSoftwareGl;
      slab.userData = { name: `Concrete Floor Slab - Level ${idx + 1}`, discipline: 'structural' };
      structGroup.add(slab);

      if (idx === 0) groundLevel.add(slab.clone());
      else if (idx === 1) level2Group.add(slab.clone());
      else if (idx === 2) level3Group.add(slab.clone());
      else roofGroup.add(slab.clone());
    });

    // Concrete core / elevator shaft in center
    const coreGeo = new THREE.BoxGeometry(5, 17, 5);
    const coreMesh = new THREE.Mesh(coreGeo, concreteMat);
    coreMesh.position.set(-3, 8.5, -2);
    coreMesh.castShadow = !isSoftwareGl;
    coreMesh.userData = { name: 'Reinforced Concrete Elevator Shear Core', discipline: 'structural' };
    structGroup.add(coreMesh);

    // Structural steel column grid (4x3 columns)
    const colGeo = new THREE.BoxGeometry(0.5, 15, 0.5);
    for (let x = -buildingWidth / 2 + 2; x <= buildingWidth / 2 - 2; x += 6.6) {
      for (let z = -buildingDepth / 2 + 2; z <= buildingDepth / 2 - 2; z += 7) {
        const col = new THREE.Mesh(colGeo, steelColumnMat);
        col.position.set(x, 7.5, z);
        col.castShadow = !isSoftwareGl;
        col.userData = { name: `W14x90 Structural Steel Column (Grid ${x.toFixed(0)},${z.toFixed(0)})`, discipline: 'structural' };
        structGroup.add(col);
      }
    }

    // Steel primary beams beneath Level 2 and Level 3
    [5, 10, 15].forEach((h) => {
      for (let x = -buildingWidth / 2 + 2; x <= buildingWidth / 2 - 2; x += 6.6) {
        const beamGeo = new THREE.BoxGeometry(0.3, 0.4, buildingDepth - 4);
        const beam = new THREE.Mesh(beamGeo, steelColumnMat);
        beam.position.set(x, h - 0.4, 0);
        structGroup.add(beam);
      }
      for (let z = -buildingDepth / 2 + 2; z <= buildingDepth / 2 - 2; z += 7) {
        const beamGeo = new THREE.BoxGeometry(buildingWidth - 4, 0.4, 0.3);
        beamGeo.translate(0, 0, 0);
        const beam = new THREE.Mesh(beamGeo, steelColumnMat);
        beam.position.set(0, h - 0.4, z);
        structGroup.add(beam);
      }
    });

    // --- ARCHITECTURAL DISCIPLINE ---
    // Exterior curtain wall glazing panels
    [0, 5, 10].forEach((h) => {
      // Front and back facade
      const facadeGeo = new THREE.BoxGeometry(buildingWidth - 0.5, 4.4, 0.1);
      const frontGlass = new THREE.Mesh(facadeGeo, glassCurtainMat);
      frontGlass.position.set(0, h + 2.5, buildingDepth / 2);
      frontGlass.userData = { name: `Architectural Double-Glazed Curtain Wall (Elev +${h}m)`, discipline: 'architectural' };
      archGroup.add(frontGlass);

      const backGlass = new THREE.Mesh(facadeGeo, glassCurtainMat);
      backGlass.position.set(0, h + 2.5, -buildingDepth / 2);
      archGroup.add(backGlass);

      // Sides
      const sideGeo = new THREE.BoxGeometry(0.1, 4.4, buildingDepth - 0.5);
      const leftGlass = new THREE.Mesh(sideGeo, glassCurtainMat);
      leftGlass.position.set(-buildingWidth / 2, h + 2.5, 0);
      archGroup.add(leftGlass);

      const rightGlass = new THREE.Mesh(sideGeo, glassCurtainMat);
      rightGlass.position.set(buildingWidth / 2, h + 2.5, 0);
      archGroup.add(rightGlass);
    });

    // Roof architectural parapet & skylight
    const parapetGeo = new THREE.BoxGeometry(buildingWidth + 0.2, 0.9, buildingDepth + 0.2);
    const parapetMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.5 });
    const parapet = new THREE.Mesh(parapetGeo, parapetMat);
    parapet.position.set(0, 15.6, 0);
    archGroup.add(parapet);

    // --- MEP DISCIPLINE ---
    // 1. Main HVAC Supply Duct running along Level 2 and Level 3 ceilings
    [4.1, 9.1].forEach((h, idx) => {
      // Main rectangular spine
      const mainDuctGeo = new THREE.BoxGeometry(buildingWidth - 6, 0.55, 0.7);
      const mainDuct = new THREE.Mesh(mainDuctGeo, ductMat);
      mainDuct.position.set(0, h, 2);
      mainDuct.userData = { name: `L${idx + 2} Primary Supply Air Duct (1200x500mm)`, discipline: 'mep' };
      mepGroup.add(mainDuct);

      // Branch ducts
      [-6, 0, 6].forEach((bx) => {
        const branchGeo = new THREE.BoxGeometry(0.4, 0.4, 6);
        const branch = new THREE.Mesh(branchGeo, ductMat);
        branch.position.set(bx, h, -1);
        mepGroup.add(branch);

        // Terminal diffuser box
        const diffGeo = new THREE.BoxGeometry(0.6, 0.1, 0.6);
        const diffuser = new THREE.Mesh(diffGeo, ductMat);
        diffuser.position.set(bx, h - 0.25, -4);
        mepGroup.add(diffuser);
      });

      // 2. Chilled Water & Heating Hydronic Piping
      const pipeGeo = new THREE.CylinderGeometry(0.12, 0.12, buildingWidth - 6, 12);
      pipeGeo.rotateZ(Math.PI / 2);
      const chwSupply = new THREE.Mesh(pipeGeo, chilledPipeMat);
      chwSupply.position.set(0, h + 0.35, -2);
      chwSupply.userData = { name: 'CHW Supply Pipe Ø150mm Carbon Steel', discipline: 'mep' };
      mepGroup.add(chwSupply);

      const chwReturn = new THREE.Mesh(pipeGeo, chilledPipeMat);
      chwReturn.position.set(0, h + 0.35, -2.4);
      mepGroup.add(chwReturn);

      // 3. Electrical Cable Tray Run
      const trayGeo = new THREE.BoxGeometry(buildingWidth - 8, 0.12, 0.5);
      const tray = new THREE.Mesh(trayGeo, trayMat);
      tray.position.set(0, h + 0.2, 4.5);
      tray.userData = { name: 'Perforated Galvanized Cable Ladder 450mm', discipline: 'mep' };
      mepGroup.add(tray);
    });

    // Rooftop Chillers and Mechanical Plant
    const chillerGeo = new THREE.BoxGeometry(4.5, 2.2, 2.6);
    const chillerMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.3, metalness: 0.8 });
    const chiller1 = new THREE.Mesh(chillerGeo, chillerMat);
    chiller1.position.set(5, 16.5, 3);
    chiller1.userData = { name: 'Roof Chiller Unit #1 (250 Ton Capacity)', discipline: 'mep' };
    mepGroup.add(chiller1);

    const chiller2 = new THREE.Mesh(chillerGeo, chillerMat);
    chiller2.position.set(-5, 16.5, 3);
    chiller2.userData = { name: 'Roof Chiller Unit #2 (250 Ton Capacity)', discipline: 'mep' };
    mepGroup.add(chiller2);

    // Chiller fans
    [-5, 5].forEach((cx) => {
      [-1, 1].forEach((cz) => {
        const fanGeo = new THREE.CylinderGeometry(0.7, 0.7, 0.3, 16);
        const fan = new THREE.Mesh(fanGeo, new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9 }));
        fan.position.set(cx + cz * 1.2, 17.7, 3);
        mepGroup.add(fan);
      });
    });

    // --- CLASH DETECTION AUDIT PINS ---
    // Hard clash 1: Level 2 Duct intersecting beam
    const createClashPin = (x: number, y: number, z: number, label: string) => {
      const pinGroup = new THREE.Group();
      pinGroup.position.set(x, y, z);

      const sphereGeo = new THREE.SphereGeometry(0.45, 16, 16);
      const sphere = new THREE.Mesh(sphereGeo, clashMat);
      pinGroup.add(sphere);

      // Warning ring
      const ringGeo = new THREE.RingGeometry(0.6, 0.75, 24);
      ringGeo.rotateX(Math.PI / 2);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0xef4444, side: THREE.DoubleSide, transparent: true, opacity: 0.8 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      pinGroup.add(ring);

      pinGroup.userData = { isClash: true, label };
      clashGroup.add(pinGroup);
      return pinGroup;
    };

    const clash1 = createClashPin(0, 4.3, 2, 'CLASH #01: Supply Duct vs W14x90 Steel Beam (-85mm collision)');
    const clash2 = createClashPin(-6, 9.3, -2, 'CLASH #02: CHW Pipe 150mm vs Primary Shear Wall Penetration');
    const clash3 = createClashPin(4.2, 4.2, 4.5, 'CLASH #03: Cable Tray vs Structural Concrete Column Drop');
    const clash4 = createClashPin(-4.5, 9.1, 2, 'CLASH #04: Return Duct Elbow vs Fire Sprinkler Main');

    // Raycasting for interactive BIM element inspection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerDown = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        let info = hit.userData?.name;
        if (!info && hit.parent?.userData?.label) {
          info = hit.parent.userData.label;
        }
        if (info) {
          setSelectedElementInfo(info);
        }
      }
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);

    // 9. ANIMATION LOOP
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const current = stateRef.current;

      // Handle auto rotation
      if (current.rotating) {
        scene.rotation.y += delta * 0.15;
      }

      // Handle pulsing of clash markers
      const time = clock.getElapsedTime();
      clashGroup.children.forEach((child) => {
        child.scale.setScalar(1 + Math.sin(time * 5) * 0.15);
      });

      // Handle View Mode Materials & Exploded Views
      if (current.viewMode === 'exploded') {
        // Smoothly interpolate floor positions upward
        level2Group.position.y = THREE.MathUtils.damp(level2Group.position.y, 3, 4, delta);
        level3Group.position.y = THREE.MathUtils.damp(level3Group.position.y, 7, 4, delta);
        roofGroup.position.y = THREE.MathUtils.damp(roofGroup.position.y, 11, 4, delta);
      } else {
        level2Group.position.y = THREE.MathUtils.damp(level2Group.position.y, 0, 4, delta);
        level3Group.position.y = THREE.MathUtils.damp(level3Group.position.y, 0, 4, delta);
        roofGroup.position.y = THREE.MathUtils.damp(roofGroup.position.y, 0, 4, delta);
      }

      // Handle Discipline Visibility
      if (current.discipline === 'all') {
        archGroup.visible = true;
        structGroup.visible = true;
        mepGroup.visible = true;
        clashGroup.visible = true;
      } else if (current.discipline === 'architectural') {
        archGroup.visible = true;
        structGroup.visible = false;
        mepGroup.visible = false;
        clashGroup.visible = false;
      } else if (current.discipline === 'structural') {
        archGroup.visible = false;
        structGroup.visible = true;
        mepGroup.visible = false;
        clashGroup.visible = false;
      } else if (current.discipline === 'mep') {
        archGroup.visible = false;
        structGroup.visible = false;
        mepGroup.visible = true;
        clashGroup.visible = false;
      } else if (current.discipline === 'clash') {
        archGroup.visible = false;
        structGroup.visible = true;
        mepGroup.visible = true;
        clashGroup.visible = true;
      }

      // Handle Day vs Night Lighting Model
      const isNight = current.lightingMode === 'night';
      const targetBg = isNight ? new THREE.Color(0x030712) : new THREE.Color(0x0b101e);
      (scene.background as THREE.Color).lerp(targetBg, delta * 4);
      if (scene.fog && scene.fog instanceof THREE.FogExp2) {
        scene.fog.color.lerp(targetBg, delta * 4);
        scene.fog.density = THREE.MathUtils.damp(scene.fog.density, isNight ? 0.022 : 0.015, 4, delta);
      }

      // Smoothly adjust ambient and directional lights
      const targetAmbIntensity = isNight ? 0.28 : 1.2;
      ambientLight.intensity = THREE.MathUtils.damp(ambientLight.intensity, targetAmbIntensity, 4, delta);
      ambientLight.color.lerp(isNight ? new THREE.Color(0x1e293b) : new THREE.Color(0x90b8ff), delta * 4);

      const targetKeyIntensity = isNight ? 0.45 : 2.4;
      keyLight.intensity = THREE.MathUtils.damp(keyLight.intensity, targetKeyIntensity, 4, delta);
      keyLight.color.lerp(isNight ? new THREE.Color(0x60a5fa) : new THREE.Color(0xfff8ee), delta * 4);

      const targetRimIntensity = isNight ? 1.0 : 1.8;
      rimLight.intensity = THREE.MathUtils.damp(rimLight.intensity, targetRimIntensity, 4, delta);
      rimLight.color.lerp(isNight ? new THREE.Color(0x2563eb) : new THREE.Color(0x06b6d4), delta * 4);

      // Toggle MEP Low-Light Inspection Luminaires
      mepNightLightsGroup.visible = isNight;

      // Enhance MEP Luminescence & High Contrast in Night Mode to demonstrate low-light visibility
      if (isNight) {
        ductMat.emissive.setHex(0x06b6d4);
        ductMat.emissiveIntensity = THREE.MathUtils.damp(ductMat.emissiveIntensity, 0.55, 4, delta);

        chilledPipeMat.emissive.setHex(0x2563eb);
        chilledPipeMat.emissiveIntensity = THREE.MathUtils.damp(chilledPipeMat.emissiveIntensity, 0.7, 4, delta);

        hotPipeMat.emissive.setHex(0xea580c);
        hotPipeMat.emissiveIntensity = THREE.MathUtils.damp(hotPipeMat.emissiveIntensity, 0.7, 4, delta);

        trayMat.emissive.setHex(0xca8a04);
        trayMat.emissiveIntensity = THREE.MathUtils.damp(trayMat.emissiveIntensity, 0.6, 4, delta);

        // Subdued architectural curtain glass so interior glowing MEP systems pop from outside
        glassCurtainMat.color.lerp(new THREE.Color(0x0f172a), delta * 4);
        glassCurtainMat.opacity = THREE.MathUtils.damp(glassCurtainMat.opacity, isSoftwareGl ? 0.2 : 0.35, 4, delta);
      } else {
        // Return to standard day PBR reflection
        ductMat.emissiveIntensity = THREE.MathUtils.damp(ductMat.emissiveIntensity, 0, 4, delta);
        chilledPipeMat.emissiveIntensity = THREE.MathUtils.damp(chilledPipeMat.emissiveIntensity, 0, 4, delta);
        hotPipeMat.emissiveIntensity = THREE.MathUtils.damp(hotPipeMat.emissiveIntensity, 0, 4, delta);
        trayMat.emissiveIntensity = THREE.MathUtils.damp(trayMat.emissiveIntensity, 0, 4, delta);

        glassCurtainMat.color.lerp(new THREE.Color(0x38bdf8), delta * 4);
        glassCurtainMat.opacity = THREE.MathUtils.damp(glassCurtainMat.opacity, isSoftwareGl ? 0.35 : 0.65, 4, delta);
      }

      // Wireframe & Xray modes
      const isWire = current.viewMode === 'wireframe';
      concreteMat.wireframe = isWire;
      steelColumnMat.wireframe = isWire;
      ductMat.wireframe = isWire;

      if (current.viewMode === 'xray') {
        concreteMat.transparent = true;
        concreteMat.opacity = 0.25;
        archGroup.visible = false; // Reveal MEP inside
      } else {
        concreteMat.transparent = false;
        concreteMat.opacity = 1.0;
      }

      controls.update();
      renderer.render(scene, camera);
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    // 10. Responsive resize handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const resetCamera = () => {
    if (cameraRef.current && controlsRef.current && sceneRef.current) {
      cameraRef.current.position.set(38, 28, 42);
      controlsRef.current.target.set(0, 8, 0);
      sceneRef.current.rotation.y = 0;
      controlsRef.current.update();
    }
  };

  return (
    <div className="relative w-full h-[580px] lg:h-[660px] rounded-2xl overflow-hidden border border-cyan-500/20 shadow-2xl bg-[#0b101e] select-none">
      {/* 3D Canvas Mount */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Left: Model HUD Badge */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none flex flex-col gap-2">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md border border-slate-700/60 shadow-lg text-xs font-mono text-cyan-400">
          <span className="inline-block w-2 h-2 rounded-full bg-cyan-400" />
          <span>AUTODESK REVIT / NAVISWORKS FEDERATION</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300">LOD 350 LIVE MODEL</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400 px-1">
          <span>Grid: 6.6m x 7.0m</span>
          <span>•</span>
          <span>4-Tier Commercial Core</span>
          <span>•</span>
          <span className="text-red-400 font-semibold">{activeClashCount} Active Collisions Identified</span>
        </div>
        {lightingMode === 'night' && (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/90 border border-cyan-500/50 text-[11px] font-mono text-cyan-300 shadow-lg shadow-cyan-950/50 w-fit">
            <Moon className="w-3.5 h-3.5 text-cyan-400" />
            <span>Low-Light Inspection: MEP Plenum Luminescence & Service Runs Active</span>
          </div>
        )}
      </div>

      {/* Top Right: Quick Actions */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        {/* Day / Night Lighting Model Toggle */}
        <button
          onClick={() => setLightingMode(lightingMode === 'day' ? 'night' : 'day')}
          title={lightingMode === 'day' ? 'Switch to Night Mode (Inspect MEP in Low-Light)' : 'Switch to Day Mode (Solar Environment)'}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all border cursor-pointer ${
            lightingMode === 'night'
              ? 'bg-cyan-950/90 text-cyan-300 border-cyan-400/60 shadow-md shadow-cyan-500/20'
              : 'bg-slate-900/80 text-amber-300 border-slate-700/60 hover:text-white'
          }`}
        >
          {lightingMode === 'night' ? (
            <>
              <Moon className="w-3.5 h-3.5 text-cyan-400" />
              <span>Night MEP Mode</span>
            </>
          ) : (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>Day Model</span>
            </>
          )}
        </button>

        <button
          onClick={() => setIsRotating(!isRotating)}
          title="Toggle Auto Orbit"
          className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all border ${
            isRotating
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm'
              : 'bg-slate-900/80 text-slate-400 border-slate-700/60 hover:text-white'
          }`}
        >
          <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          <span>{isRotating ? 'Orbit Active' : 'Orbit Paused'}</span>
        </button>

        <button
          onClick={resetCamera}
          title="Reset Camera View"
          className="p-1.5 rounded-lg bg-slate-900/80 text-slate-400 border border-slate-700/60 hover:text-white transition-all cursor-pointer"
        >
          <Compass className="w-4 h-4" />
        </button>
      </div>

      {/* Selected Element Tooltip Inspector */}
      {selectedElementInfo && (
        <div className="absolute top-16 left-4 z-10 max-w-sm p-3.5 rounded-xl bg-slate-900/95 backdrop-blur-md border border-cyan-500/40 shadow-2xl text-xs">
          <div className="flex items-center justify-between pb-1 border-b border-slate-800 text-cyan-400 font-mono text-[11px]">
            <span className="flex items-center gap-1">
              <Info className="w-3.5 h-3.5" /> BIM ELEMENT PARAMETERS
            </span>
            <button
              onClick={() => setSelectedElementInfo(null)}
              className="text-slate-400 hover:text-white ml-2 text-sm"
            >
              ×
            </button>
          </div>
          <p className="mt-2 text-slate-200 font-medium">{selectedElementInfo}</p>
          <div className="mt-2 grid grid-cols-2 gap-1 text-[10px] font-mono text-slate-400">
            <div>Fidelity: <span className="text-white">LOD 350</span></div>
            <div>Format: <span className="text-cyan-400">Autodesk Revit</span></div>
            <div>Tolerance: <span className="text-white">±5mm</span></div>
            <div>Classification: <span className="text-white">UniFormat II</span></div>
          </div>
        </div>
      )}

      {/* Center Guidance Hint */}
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 pointer-events-none text-[11px] font-mono text-slate-400/70 tracking-wide uppercase">
        Click & Drag to Rotate • Scroll to Zoom • Click Elements to Inspect
      </div>

      {/* Ergonomic Collapsible Bottom Control Dock */}
      <div 
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-3xl transition-transform duration-300 ${
          isDockCollapsed ? 'translate-y-[calc(100%-36px)]' : 'translate-y-0'
        }`}
      >
        {/* Toggle Collapse Button */}
        <div className="flex justify-center -mb-2">
          <button
            onClick={() => setIsDockCollapsed(!isDockCollapsed)}
            className="px-4 py-1 rounded-t-lg bg-slate-900/90 border-t border-x border-slate-700/80 text-[11px] font-mono text-slate-300 hover:text-cyan-400 flex items-center gap-1 transition-colors shadow-lg cursor-pointer"
          >
            {isDockCollapsed ? (
              <>
                <ChevronUp className="w-3.5 h-3.5 text-cyan-400" />
                <span>Show Model Controls</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />
                <span>Hide Controls (Zen Mode)</span>
              </>
            )}
          </button>
        </div>

        {/* Dock Card */}
        <div className="p-3.5 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 shadow-2xl flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Discipline Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1 w-full md:w-auto">
            <span className="text-[10px] font-mono uppercase text-slate-500 mr-1 hidden sm:inline">Layers:</span>
            
            <button
              onClick={() => setActiveDiscipline('all')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                activeDiscipline === 'all'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/20'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Federated All</span>
            </button>

            <button
              onClick={() => setActiveDiscipline('architectural')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                activeDiscipline === 'architectural'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/20'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Architecture</span>
            </button>

            <button
              onClick={() => setActiveDiscipline('structural')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                activeDiscipline === 'structural'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/20'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Structure</span>
            </button>

            <button
              onClick={() => setActiveDiscipline('mep')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                activeDiscipline === 'mep'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/20'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>MEP Systems</span>
            </button>

            <button
              onClick={() => setActiveDiscipline('clash')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                activeDiscipline === 'clash'
                  ? 'bg-red-500 text-white font-semibold shadow-md shadow-red-500/30'
                  : 'text-red-400 hover:bg-red-950/40'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Clashes ({activeClashCount})</span>
            </button>
          </div>

          {/* Lighting & View Modes (Day/Night & Shaded, Wireframe, X-Ray, Exploded) */}
          <div className="flex flex-wrap items-center gap-2 border-t md:border-t-0 md:border-l border-slate-800 pt-2 md:pt-0 md:pl-3 w-full md:w-auto justify-end">
            {/* Lighting Model Selector */}
            <div className="flex items-center gap-1 bg-slate-950/80 p-0.5 rounded-lg border border-slate-800">
              <button
                onClick={() => setLightingMode('day')}
                title="Solar Day Environment"
                className={`px-2 py-1 rounded text-[11px] font-mono flex items-center gap-1 transition-all cursor-pointer ${
                  lightingMode === 'day'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sun className="w-3 h-3 text-amber-400" />
                <span>Day</span>
              </button>

              <button
                onClick={() => setLightingMode('night')}
                title="Low-Light Night MEP Inspection"
                className={`px-2 py-1 rounded text-[11px] font-mono flex items-center gap-1 transition-all cursor-pointer ${
                  lightingMode === 'night'
                    ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-400/50 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Moon className="w-3 h-3 text-cyan-400" />
                <span>Night MEP</span>
              </button>
            </div>

            <span className="text-[10px] font-mono uppercase text-slate-500 hidden lg:inline">|</span>

            {/* View Modes */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveViewMode('shaded')}
                className={`px-2 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                  activeViewMode === 'shaded' ? 'bg-slate-800 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                PBR
              </button>

              <button
                onClick={() => setActiveViewMode('wireframe')}
                className={`px-2 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                  activeViewMode === 'wireframe' ? 'bg-slate-800 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                Wire
              </button>

              <button
                onClick={() => setActiveViewMode('xray')}
                className={`px-2 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                  activeViewMode === 'xray' ? 'bg-slate-800 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                X-Ray
              </button>

              <button
                onClick={() => setActiveViewMode('exploded')}
                className={`px-2 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                  activeViewMode === 'exploded' ? 'bg-slate-800 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                Exploded
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
