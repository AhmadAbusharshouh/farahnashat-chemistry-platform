'use client';

import { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Sparkles, RotateCw, Atom, Zap, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export interface HeroMolecule {
  id: string;
  formula: string;
  nameAr: string;
  nameEn: string;
  typeAr: string;
  reactionAr: string;
  atoms: Array<{
    symbol: 'H' | 'O' | 'Cl' | 'Na' | 'C' | 'N';
    pos: [number, number, number];
    color: string;
    radius: number;
    label: string;
  }>;
  bonds: Array<[number, number]>;
}

export const HERO_REAL_MOLECULES: HeroMolecule[] = [
  {
    id: 'h2o',
    formula: 'H₂O',
    nameAr: 'جزيء الماء النقي',
    nameEn: 'Water Molecule',
    typeAr: 'متعادل (pH 7.0)',
    reactionAr: 'رابطتان تساهميتان أحاديتان بزاوية 104.5° وقطبية كهربائية.',
    atoms: [
      { symbol: 'O', pos: [0, 0.15, 0], color: '#ef4444', radius: 0.55, label: 'O (أكسجين)' },
      { symbol: 'H', pos: [-0.85, -0.4, 0], color: '#f8fafc', radius: 0.35, label: 'H (هيدروجين)' },
      { symbol: 'H', pos: [0.85, -0.4, 0], color: '#f8fafc', radius: 0.35, label: 'H (هيدروجين)' }
    ],
    bonds: [[0, 1], [0, 2]]
  },
  {
    id: 'hcl',
    formula: 'HCl',
    nameAr: 'حمض الهيدروكلوريك',
    nameEn: 'Hydrochloric Acid',
    typeAr: 'حمض قوي (pH 1.0)',
    reactionAr: 'يتأين كلياً في الماء: HCl + H₂O → H₃O⁺ + Cl⁻',
    atoms: [
      { symbol: 'Cl', pos: [-0.45, 0, 0], color: '#10b981', radius: 0.65, label: 'Cl (كلور)' },
      { symbol: 'H', pos: [0.75, 0, 0], color: '#f8fafc', radius: 0.35, label: 'H (هيدروجين)' }
    ],
    bonds: [[0, 1]]
  },
  {
    id: 'h3o',
    formula: 'H₃O⁺',
    nameAr: 'أيون الهيدرونيوم',
    nameEn: 'Hydronium Ion',
    typeAr: 'أيون حمضي نشط',
    reactionAr: 'مسؤول الحموضة: ينتج من ارتباط بروتون H⁺ بجزيء H₂O برابطة تناسقية.',
    atoms: [
      { symbol: 'O', pos: [0, 0.25, 0], color: '#ef4444', radius: 0.55, label: 'O' },
      { symbol: 'H', pos: [-0.75, -0.35, 0.45], color: '#f8fafc', radius: 0.35, label: 'H' },
      { symbol: 'H', pos: [0.75, -0.35, 0.45], color: '#f8fafc', radius: 0.35, label: 'H' },
      { symbol: 'H', pos: [0, -0.35, -0.75], color: '#f8fafc', radius: 0.35, label: 'H' }
    ],
    bonds: [[0, 1], [0, 2], [0, 3]]
  },
  {
    id: 'naoh',
    formula: 'NaOH',
    nameAr: 'هيدروكسيد الصوديوم',
    nameEn: 'Sodium Hydroxide',
    typeAr: 'قاعدة قوية (pH 13.8)',
    reactionAr: 'تفكك أيوني كلي: NaOH (s) → Na⁺ (aq) + OH⁻ (aq)',
    atoms: [
      { symbol: 'Na', pos: [-0.85, 0, 0], color: '#6366f1', radius: 0.6, label: 'Na⁺ (صوديوم)' },
      { symbol: 'O', pos: [0.25, 0, 0], color: '#ef4444', radius: 0.5, label: 'O' },
      { symbol: 'H', pos: [0.95, 0, 0], color: '#f8fafc', radius: 0.32, label: 'H' }
    ],
    bonds: [[0, 1], [1, 2]]
  }
];

export function Hero3DMolecule({
  selectedId = 'h2o',
  onSelect
}: {
  selectedId?: string;
  onSelect?: (m: HeroMolecule) => void;
}) {
  const { t } = useLanguage();
  const [activeMolId, setActiveMolId] = useState<string>(selectedId);
  const [isIonized, setIsIonized] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const moleculeGroupRef = useRef<THREE.Group | null>(null);
  const atomMeshesRef = useRef<THREE.Mesh[]>([]);
  const bondMeshesRef = useRef<THREE.Mesh[]>([]);

  const currentMolecule = HERO_REAL_MOLECULES.find((m) => m.id === activeMolId) || HERO_REAL_MOLECULES[0];

  useEffect(() => {
    setActiveMolId(selectedId);
  }, [selectedId]);

  // Three.js Scene Setup
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(36, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0.5, 4.4);
    camera.lookAt(0, 0, 0);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const el = renderer.domElement;
    el.style.width = '100%';
    el.style.height = '100%';
    el.style.cursor = 'grab';
    el.style.touchAction = 'none';
    container.innerHTML = '';
    container.appendChild(el);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.3);
    keyLight.position.set(4, 6, 5);
    scene.add(keyLight);

    const backLight = new THREE.DirectionalLight(0x10b981, 0.5);
    backLight.position.set(-4, -2, -3);
    scene.add(backLight);

    // 5. Molecule Group
    const moleculeGroup = new THREE.Group();
    scene.add(moleculeGroup);
    moleculeGroupRef.current = moleculeGroup;

    // 6. Orbital Electron Ring
    const ringGeo = new THREE.TorusGeometry(1.6, 0.015, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.35 });
    const orbitRing = new THREE.Mesh(ringGeo, ringMat);
    orbitRing.rotation.x = Math.PI / 3;
    moleculeGroup.add(orbitRing);

    // Build Current Molecule Atoms & Bonds
    const buildMolecule = (mol: HeroMolecule) => {
      // Clear previous meshes
      while (moleculeGroup.children.length > 1) {
        const child = moleculeGroup.children[moleculeGroup.children.length - 1];
        moleculeGroup.remove(child);
      }
      atomMeshesRef.current = [];
      bondMeshesRef.current = [];

      // Create Atom Spheres
      mol.atoms.forEach((atom) => {
        const geo = new THREE.SphereGeometry(atom.radius, 32, 32);
        const mat = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(atom.color),
          roughness: 0.15,
          metalness: 0.1,
          clearcoat: 0.8,
          clearcoatRoughness: 0.1,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(...atom.pos);
        mesh.userData.home = new THREE.Vector3(...atom.pos);
        moleculeGroup.add(mesh);
        atomMeshesRef.current.push(mesh);
      });

      // Create Bond Cylinders
      mol.bonds.forEach(([idxA, idxB]) => {
        const posA = new THREE.Vector3(...mol.atoms[idxA].pos);
        const posB = new THREE.Vector3(...mol.atoms[idxB].pos);
        const distance = posA.distanceTo(posB);

        const cylinderGeo = new THREE.CylinderGeometry(0.08, 0.08, distance, 16);
        const cylinderMat = new THREE.MeshStandardMaterial({
          color: 0x94a3b8,
          roughness: 0.3,
          metalness: 0.2
        });
        const bondMesh = new THREE.Mesh(cylinderGeo, cylinderMat);

        // Position at midpoint and orient along the bond vector
        const midpoint = new THREE.Vector3().addVectors(posA, posB).multiplyScalar(0.5);
        bondMesh.position.copy(midpoint);
        bondMesh.quaternion.setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          new THREE.Vector3().subVectors(posB, posA).normalize()
        );
        moleculeGroup.add(bondMesh);
        bondMeshesRef.current.push(bondMesh);
      });
    };

    buildMolecule(currentMolecule);

    // Drag & Touch Orbit Controls (Smooth & Slow)
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let rotY = 0.2;
    let rotX = 0.1;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
      el.style.cursor = 'grabbing';
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      prevX = e.clientX;
      prevY = e.clientY;

      rotY += dx * 0.0035;
      rotX += dy * 0.0035;
      rotX = Math.max(-0.6, Math.min(0.6, rotX));
    };

    const onPointerUp = () => {
      isDragging = false;
      el.style.cursor = 'grab';
    };

    el.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Render Animation Loop
    let animId = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isDragging) {
        rotY += 0.003;
      }

      moleculeGroup.rotation.y = rotY;
      moleculeGroup.rotation.x = rotX;
      orbitRing.rotation.z += 0.005;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    const ro = new ResizeObserver(handleResize);
    ro.observe(container);

    return () => {
      cancelAnimationFrame(animId);
      el.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      ro.disconnect();
      renderer.dispose();
      if (el.parentNode === container) container.removeChild(el);
    };
  }, [activeMolId]);

  // Handle Molecule Switch
  const switchMolecule = (mol: HeroMolecule) => {
    setActiveMolId(mol.id);
    setIsIonized(false);
    if (onSelect) onSelect(mol);
  };

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* 3D Canvas Container */}
      <div className="relative w-full h-[220px] xs:h-[250px] sm:h-[280px] md:h-[320px] rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100/90 border border-slate-200 shadow-sm flex items-center justify-center overflow-hidden">
        
        {/* Floating Molecule Badge */}
        <div className="absolute top-2.5 right-3 z-10 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-xs border border-slate-200 text-[11px] font-bold text-slate-800 flex items-center gap-1.5 shadow-2xs">
          <Atom className="w-3.5 h-3.5 text-emerald-600" />
          <span>{currentMolecule.formula} • {currentMolecule.nameAr}</span>
        </div>

        <div 
          ref={containerRef}
          className="w-full h-full relative"
        />

        {/* Bottom Hint */}
        <div className="absolute bottom-2 left-3 z-10 text-[10px] text-slate-400 font-bold pointer-events-none">
          {t('اسحب لتدوير الجزيء 3D', 'Drag to rotate molecule 3D')}
        </div>
      </div>

      {/* Clean Minimal Molecule Switcher Pills */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2.5 w-full">
        {HERO_REAL_MOLECULES.map((mol) => {
          const isSelected = mol.id === activeMolId;
          return (
            <button
              key={mol.id}
              onClick={() => switchMolecule(mol)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all border ${
                isSelected
                  ? 'bg-emerald-700 text-white border-emerald-800 shadow-2xs scale-103'
                  : 'bg-white hover:bg-emerald-50 text-slate-700 border-slate-200'
              }`}
            >
              {mol.formula}
            </button>
          );
        })}
      </div>

    </div>
  );
}
