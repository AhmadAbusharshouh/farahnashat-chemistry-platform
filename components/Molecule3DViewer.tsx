'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, ZoomIn, ZoomOut, Box, Sparkles, Eye, Boxes } from 'lucide-react';

export interface MoleculeDefinition {
  id: string;
  name: string;
  nameEn: string;
  formula: string;
  type: 'acid' | 'base' | 'neutral';
  description: string;
  atoms: Array<{
    elem: 'H' | 'O' | 'Cl' | 'Na' | 'C' | 'N';
    pos: [number, number, number];
  }>;
  bonds: Array<[number, number]>;
}

export const MOLECULES_3D_LIBRARY: MoleculeDefinition[] = [
  {
    id: 'h3o_plus',
    name: 'أيون الهيدرونيوم (H₃O⁺)',
    nameEn: 'Hydronium Ion (H₃O⁺)',
    formula: 'H₃O⁺',
    type: 'acid',
    description: 'الأيون المسؤول عن الخصائص الحمضية؛ يتكون من ارتباط أيون الهيدروجين H⁺ بجزيء الماء برابطة تناسقية.',
    atoms: [
      { elem: 'O', pos: [0, 0.2, 0] },
      { elem: 'H', pos: [-0.8, -0.4, 0.5] },
      { elem: 'H', pos: [0.8, -0.4, 0.5] },
      { elem: 'H', pos: [0, -0.4, -0.9] }
    ],
    bonds: [[0, 1], [0, 2], [0, 3]]
  },
  {
    id: 'oh_minus',
    name: 'أيون الهيدروكسيد (OH⁻)',
    nameEn: 'Hydroxide Ion (OH⁻)',
    formula: 'OH⁻',
    type: 'base',
    description: 'الأيون المسؤول عن الخصائص القاعدية والقلويات؛ يمنح المحاليل ملمسها الصابوني الزلق وطعمها المر.',
    atoms: [
      { elem: 'O', pos: [-0.3, 0, 0] },
      { elem: 'H', pos: [0.7, 0, 0] }
    ],
    bonds: [[0, 1]]
  },
  {
    id: 'hcl',
    name: 'حمض الهيدروكلوريك (HCl)',
    nameEn: 'Hydrochloric Acid (HCl)',
    formula: 'HCl',
    type: 'acid',
    description: 'حمض قوي يتأين كلياً في الماء (→) إلى H⁺ و Cl⁻؛ يفرز في المعدة ويصنع منه 20 مليون طن سنوياً.',
    atoms: [
      { elem: 'Cl', pos: [-0.4, 0, 0] },
      { elem: 'H', pos: [0.9, 0, 0] }
    ],
    bonds: [[0, 1]]
  },
  {
    id: 'ch3cooh',
    name: 'حمض الإيثانويك / الأسيتيك (CH₃COOH)',
    nameEn: 'Ethanoic / Acetic Acid',
    formula: 'CH₃COOH',
    type: 'acid',
    description: 'حمض عضوي ضعيف (الخل المنزلي)؛ يتأين جزئياً فقط في حالة اتزان ديناميكي (⇌).',
    atoms: [
      { elem: 'C', pos: [-0.8, 0, 0] },
      { elem: 'H', pos: [-1.4, 0.7, 0] },
      { elem: 'H', pos: [-1.4, -0.7, 0.5] },
      { elem: 'H', pos: [-1.0, 0, -0.9] },
      { elem: 'C', pos: [0.6, 0.2, 0] },
      { elem: 'O', pos: [1.1, 1.2, 0] },
      { elem: 'O', pos: [1.3, -0.9, 0] },
      { elem: 'H', pos: [2.1, -0.7, 0] }
    ],
    bonds: [
      [0, 1], [0, 2], [0, 3], [0, 4],
      [4, 5], [4, 6], [6, 7]
    ]
  },
  {
    id: 'nh3',
    name: 'غاز الأمونيا (NH₃)',
    nameEn: 'Ammonia (NH₃)',
    formula: 'NH₃',
    type: 'base',
    description: 'قاعدة ضعيفة لا تحتوي على OH⁻ في صيغتها الأولية، لكنها تتفاعل مع الماء منتجة OH⁻.',
    atoms: [
      { elem: 'N', pos: [0, 0.3, 0] },
      { elem: 'H', pos: [-0.8, -0.3, 0.5] },
      { elem: 'H', pos: [0.8, -0.3, 0.5] },
      { elem: 'H', pos: [0, -0.3, -0.9] }
    ],
    bonds: [[0, 1], [0, 2], [0, 3]]
  },
  {
    id: 'naoh',
    name: 'هيدروكسيد الصوديوم (NaOH)',
    nameEn: 'Sodium Hydroxide (NaOH)',
    formula: 'NaOH',
    type: 'base',
    description: 'قاعدة صناعية قوية وقلوي ذائب يتأين كلياً (→)؛ يُصنع منه 60 مليون طن سنوياً.',
    atoms: [
      { elem: 'Na', pos: [-1.0, 0, 0] },
      { elem: 'O', pos: [0.4, 0, 0] },
      { elem: 'H', pos: [1.3, 0, 0] }
    ],
    bonds: [[0, 1], [1, 2]]
  },
  {
    id: 'h2o',
    name: 'الماء النقي المتعادل (H₂O)',
    nameEn: 'Pure Water (H₂O)',
    formula: 'H₂O',
    type: 'neutral',
    description: 'مادة متعادلة بزاوية انحناء 104.5° يتساوى فيها تركيز [H⁺] = [OH⁻] = 1×10⁻⁷ M.',
    atoms: [
      { elem: 'O', pos: [0, 0.2, 0] },
      { elem: 'H', pos: [-0.8, -0.4, 0] },
      { elem: 'H', pos: [0.8, -0.4, 0] }
    ],
    bonds: [[0, 1], [0, 2]]
  }
];

const ELEMENT_COLORS: Record<string, number> = {
  H: 0xe2e8f0,    // Light Platinum
  O: 0xef4444,    // Red
  Cl: 0x10b981,   // Emerald Green
  Na: 0x8b5cf6,   // Violet/Purple
  C: 0x475569,    // Slate
  N: 0x2563eb     // Blue
};

const ELEMENT_RADII: Record<string, number> = {
  H: 0.28,
  O: 0.45,
  Cl: 0.55,
  Na: 0.52,
  C: 0.42,
  N: 0.44
};

export function Molecule3DViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedMolecule, setSelectedMolecule] = useState<MoleculeDefinition>(MOLECULES_3D_LIBRARY[0]);
  const [autoRotate, setAutoRotate] = useState(true);
  const [displayMode, setDisplayMode] = useState<'ball_stick' | 'space_fill'>('ball_stick');

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const moleculeGroupRef = useRef<THREE.Group | null>(null);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = 320;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.5;
    cameraRef.current = camera;

    // Renderer (Light & transparent)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x047857, 1.2);
    dirLight2.position.set(-5, -5, -5);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 1.0, 10);
    pointLight.position.set(0, 0, 4);
    scene.add(pointLight);

    // Molecule Root Group
    const moleculeGroup = new THREE.Group();
    scene.add(moleculeGroup);
    moleculeGroupRef.current = moleculeGroup;

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (autoRotate && moleculeGroupRef.current && !isDraggingRef.current) {
        moleculeGroupRef.current.rotation.y += 0.012;
        moleculeGroupRef.current.rotation.x += 0.005;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Mouse Controls
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !moleculeGroupRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      moleculeGroupRef.current.rotation.y += deltaX * 0.008;
      moleculeGroupRef.current.rotation.x += deltaY * 0.008;

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (!cameraRef.current) return;
      cameraRef.current.position.z = Math.max(2.5, Math.min(10, cameraRef.current.position.z + e.deltaY * 0.005));
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    dom.addEventListener('wheel', handleWheel, { passive: false });

    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      cameraRef.current.aspect = newWidth / 320;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, 320);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      dom.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      dom.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // Update Geometry
  useEffect(() => {
    if (!moleculeGroupRef.current) return;
    const group = moleculeGroupRef.current;

    while (group.children.length > 0) {
      const obj = group.children[0];
      group.remove(obj);
      if ((obj as any).geometry) (obj as any).geometry.dispose();
    }

    const isSpaceFill = displayMode === 'space_fill';

    selectedMolecule.atoms.forEach((atom) => {
      const baseRadius = ELEMENT_RADII[atom.elem] || 0.4;
      const radius = isSpaceFill ? baseRadius * 1.8 : baseRadius;
      const color = ELEMENT_COLORS[atom.elem] || 0xcccccc;

      const sphereGeo = new THREE.SphereGeometry(radius, 32, 32);
      const sphereMat = new THREE.MeshPhysicalMaterial({
        color,
        roughness: 0.15,
        metalness: 0.1,
        clearcoat: 0.8,
        clearcoatRoughness: 0.1
      });

      const atomMesh = new THREE.Mesh(sphereGeo, sphereMat);
      atomMesh.position.set(...atom.pos);
      group.add(atomMesh);
    });

    if (!isSpaceFill) {
      selectedMolecule.bonds.forEach(([aIdx, bIdx]) => {
        const atomA = selectedMolecule.atoms[aIdx];
        const atomB = selectedMolecule.atoms[bIdx];
        if (!atomA || !atomB) return;

        const posA = new THREE.Vector3(...atomA.pos);
        const posB = new THREE.Vector3(...atomB.pos);
        const distance = posA.distanceTo(posB);
        const direction = new THREE.Vector3().subVectors(posB, posA).normalize();

        const cylinderGeo = new THREE.CylinderGeometry(0.08, 0.08, distance, 16);
        const cylinderMat = new THREE.MeshStandardMaterial({
          color: 0x94a3b8,
          roughness: 0.3,
          metalness: 0.2
        });

        const cylinderMesh = new THREE.Mesh(cylinderGeo, cylinderMat);
        const midPoint = new THREE.Vector3().addVectors(posA, posB).multiplyScalar(0.5);
        cylinderMesh.position.copy(midPoint);

        const up = new THREE.Vector3(0, 1, 0);
        const quaternion = new THREE.Quaternion().setFromUnitVectors(up, direction);
        cylinderMesh.quaternion.copy(quaternion);

        group.add(cylinderMesh);
      });
    }

    group.rotation.set(0.3, 0.5, 0);
  }, [selectedMolecule, displayMode]);

  return (
    <div className="bg-white border border-slate-200 p-5 space-y-4 shadow-2xs">
      
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
            <Boxes className="w-4 h-4 text-emerald-700" />
            <span>نمذجة الجزيئات ثلاثية الأبعاد (3D)</span>
          </div>
          <h3 className="text-base font-black text-slate-900">
            {selectedMolecule.name}
          </h3>
        </div>

        <div className="flex items-center gap-1 font-mono text-xs">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-2.5 py-1 border text-[11px] font-bold transition ${
              autoRotate ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}
          >
            {autoRotate ? 'دوران تلقائي ON' : 'دوران OFF'}
          </button>
          <button
            onClick={() => setDisplayMode(displayMode === 'ball_stick' ? 'space_fill' : 'ball_stick')}
            className="px-2.5 py-1 bg-white border border-slate-200 hover:border-slate-400 text-slate-700 text-[11px] font-bold transition"
          >
            {displayMode === 'ball_stick' ? 'الكرات والعصي' : 'ملء الفراغ'}
          </button>
        </div>
      </div>

      {/* Main 3D Stage & Molecule Chooser Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
        
        {/* Molecule Selector (4 cols) */}
        <div className="sm:col-span-4 space-y-1 max-h-[300px] overflow-y-auto pr-1">
          {MOLECULES_3D_LIBRARY.map((m) => {
            const isSelected = selectedMolecule.id === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedMolecule(m)}
                className={`w-full text-right p-2.5 border transition flex items-center justify-between ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="truncate">
                  <div className="text-xs">{m.name}</div>
                </div>
                <span className="font-mono text-[10px] px-1.5 py-0.2 bg-white border border-slate-200 text-emerald-800 shrink-0">
                  {m.formula}
                </span>
              </button>
            );
          })}
        </div>

        {/* 3D WebGL Canvas Viewport (8 cols) */}
        <div className="sm:col-span-8 bg-slate-50 border border-slate-200 relative overflow-hidden flex flex-col justify-between">
          <div 
            ref={containerRef} 
            className="w-full h-[300px] cursor-grab active:cursor-grabbing"
          />

          <div className="p-2 bg-white border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500 font-mono">
            <span>اسحب بالماوس للتدوير ثلاثي الأبعاد</span>
            <span className="text-emerald-800 font-bold">{selectedMolecule.formula}</span>
          </div>
        </div>

      </div>

      {/* Description */}
      <div className="p-3 bg-emerald-50/60 border border-emerald-200 text-xs text-slate-700 space-y-1 text-right">
        <p className="leading-relaxed">{selectedMolecule.description}</p>
      </div>

    </div>
  );
}
