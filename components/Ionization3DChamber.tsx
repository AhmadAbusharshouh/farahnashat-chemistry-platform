'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Zap, RotateCcw, Lightbulb, Activity, CheckCircle2 } from 'lucide-react';

export function Ionization3DChamber() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [solutionType, setSolutionType] = useState<'strong_hcl' | 'weak_ch3cooh' | 'water'>('strong_hcl');
  const [circuitClosed, setCircuitClosed] = useState(true);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const bulbLightRef = useRef<THREE.PointLight | null>(null);
  const bulbMeshRef = useRef<THREE.Mesh | null>(null);
  const ionsGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = 300;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 2, 7);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    // Glass Beaker
    const beakerGeo = new THREE.CylinderGeometry(1.8, 1.8, 3.2, 32, 1, true);
    const beakerMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.3,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.9,
      ior: 1.5,
      side: THREE.DoubleSide
    });
    const beaker = new THREE.Mesh(beakerGeo, beakerMat);
    beaker.position.set(0, -0.6, 0);
    scene.add(beaker);

    // Beaker Bottom
    const bottomGeo = new THREE.CircleGeometry(1.8, 32);
    const bottomMesh = new THREE.Mesh(bottomGeo, beakerMat);
    bottomMesh.rotation.x = -Math.PI / 2;
    bottomMesh.position.set(0, -2.2, 0);
    scene.add(bottomMesh);

    // Liquid in Beaker
    const liquidGeo = new THREE.CylinderGeometry(1.75, 1.75, 2.2, 32);
    const liquidMat = new THREE.MeshPhysicalMaterial({
      color: 0x0284c7,
      transparent: true,
      opacity: 0.25,
      roughness: 0.2
    });
    const liquid = new THREE.Mesh(liquidGeo, liquidMat);
    liquid.position.set(0, -1.1, 0);
    scene.add(liquid);

    // Electrodes
    const electrodeGeo = new THREE.CylinderGeometry(0.12, 0.12, 3.0, 16);
    const electrodeMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.4,
      metalness: 0.8
    });

    const anode = new THREE.Mesh(electrodeGeo, electrodeMat);
    anode.position.set(-0.8, -0.4, 0);
    scene.add(anode);

    const cathode = new THREE.Mesh(electrodeGeo, electrodeMat);
    cathode.position.set(0.8, -0.4, 0);
    scene.add(cathode);

    // Lightbulb
    const bulbGeo = new THREE.SphereGeometry(0.45, 32, 32);
    const bulbMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      emissive: 0x000000,
      roughness: 0.2
    });
    const bulb = new THREE.Mesh(bulbGeo, bulbMat);
    bulb.position.set(0, 2.2, 0);
    scene.add(bulb);
    bulbMeshRef.current = bulb;

    const bulbSocketGeo = new THREE.CylinderGeometry(0.2, 0.25, 0.4, 16);
    const bulbSocketMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8 });
    const bulbSocket = new THREE.Mesh(bulbSocketGeo, bulbSocketMat);
    bulbSocket.position.set(0, 2.6, 0);
    scene.add(bulbSocket);

    // Point Light from Bulb
    const bulbLight = new THREE.PointLight(0xfef08a, 0, 12);
    bulbLight.position.set(0, 2.2, 0);
    scene.add(bulbLight);
    bulbLightRef.current = bulbLight;

    // Floating Ions Group
    const ionsGroup = new THREE.Group();
    scene.add(ionsGroup);
    ionsGroupRef.current = ionsGroup;

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (ionsGroupRef.current) {
        const time = Date.now() * 0.002;
        ionsGroupRef.current.children.forEach((ionMesh: any, i) => {
          ionMesh.position.y += Math.sin(time + i) * 0.003;
          if (circuitClosed) {
            if (ionMesh.userData.isPositive) {
              ionMesh.position.x += 0.004;
              if (ionMesh.position.x > 0.7) ionMesh.position.x = -0.6;
            } else {
              ionMesh.position.x -= 0.004;
              if (ionMesh.position.x < -0.7) ionMesh.position.x = 0.6;
            }
          }
        });
      }

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      cameraRef.current.aspect = w / 300;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, 300);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // Update Ions & Bulb Glow
  useEffect(() => {
    if (!bulbLightRef.current || !bulbMeshRef.current || !ionsGroupRef.current) return;

    const bulbLight = bulbLightRef.current;
    const bulbMesh = bulbMeshRef.current;
    const ionsGroup = ionsGroupRef.current;

    while (ionsGroup.children.length > 0) {
      const child = ionsGroup.children[0];
      ionsGroup.remove(child);
      if ((child as any).geometry) (child as any).geometry.dispose();
    }

    if (!circuitClosed) {
      bulbLight.intensity = 0;
      (bulbMesh.material as THREE.MeshStandardMaterial).emissive.setHex(0x000000);
      return;
    }

    let ionCount = 0;
    let bulbIntensity = 0;
    let emissiveColor = 0x000000;

    if (solutionType === 'strong_hcl') {
      ionCount = 36;
      bulbIntensity = 5.0;
      emissiveColor = 0xfde047;
    } else if (solutionType === 'weak_ch3cooh') {
      ionCount = 8;
      bulbIntensity = 1.2;
      emissiveColor = 0xd97706;
    } else {
      ionCount = 0;
      bulbIntensity = 0;
      emissiveColor = 0x000000;
    }

    bulbLight.intensity = bulbIntensity;
    (bulbMesh.material as THREE.MeshStandardMaterial).emissive.setHex(emissiveColor);

    const cationGeo = new THREE.SphereGeometry(0.1, 16, 16);
    const cationMat = new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0x991b1b });

    const anionGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const anionMat = new THREE.MeshStandardMaterial({ color: 0x10b981, emissive: 0x065f46 });

    for (let i = 0; i < ionCount; i++) {
      const isCation = i % 2 === 0;
      const mesh = new THREE.Mesh(isCation ? cationGeo : anionGeo, isCation ? cationMat : anionMat);
      mesh.position.set(
        (Math.random() - 0.5) * 2.2,
        -1.8 + Math.random() * 1.4,
        (Math.random() - 0.5) * 1.8
      );
      mesh.userData = { isPositive: isCation };
      ionsGroup.add(mesh);
    }
  }, [solutionType, circuitClosed]);

  return (
    <div className="bg-white border border-slate-200 p-5 space-y-4 shadow-2xs">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
            <Zap className="w-4 h-4 text-amber-600" />
            <span>محاكاة التأين والموصلية الكهربائية (3D)</span>
          </div>
          <h3 className="text-base font-black text-slate-900">
            مقارنة شدة التوهج وحركة الأيونات
          </h3>
        </div>

        <button
          onClick={() => setCircuitClosed(!circuitClosed)}
          className={`px-3 py-1 text-xs font-bold border transition flex items-center gap-1.5 ${
            circuitClosed ? 'bg-amber-600 text-white border-amber-700' : 'bg-slate-100 text-slate-700 border-slate-300'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>{circuitClosed ? 'فتح الدارة' : 'إغلاق الدارة'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
        
        {/* Solution Selector (4 cols) */}
        <div className="sm:col-span-4 space-y-1.5 text-right">
          <button
            onClick={() => setSolutionType('strong_hcl')}
            className={`w-full p-2.5 border transition text-right ${
              solutionType === 'strong_hcl'
                ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold'
                : 'bg-white border-slate-200 text-slate-700'
            }`}
          >
            <div className="text-xs">1. حمض قوي: HCl (0.1 M)</div>
            <div className="text-[10px] text-slate-500">تأين كلي • إضاءة ساطعة</div>
          </button>

          <button
            onClick={() => setSolutionType('weak_ch3cooh')}
            className={`w-full p-2.5 border transition text-right ${
              solutionType === 'weak_ch3cooh'
                ? 'bg-amber-50 border-amber-400 text-amber-950 font-bold'
                : 'bg-white border-slate-200 text-slate-700'
            }`}
          >
            <div className="text-xs">2. حمض ضعيف: CH₃COOH</div>
            <div className="text-[10px] text-slate-500">تأين جزئي • إضاءة خافتة</div>
          </button>

          <button
            onClick={() => setSolutionType('water')}
            className={`w-full p-2.5 border transition text-right ${
              solutionType === 'water'
                ? 'bg-sky-50 border-sky-400 text-sky-950 font-bold'
                : 'bg-white border-slate-200 text-slate-700'
            }`}
          >
            <div className="text-xs">3. ماء مقطر (H₂O)</div>
            <div className="text-[10px] text-slate-500">غير موصل • المصباح مطفأ</div>
          </button>
        </div>

        {/* 3D Visual Viewport (8 cols) */}
        <div className="sm:col-span-8 bg-slate-50 border border-slate-200 relative">
          <div ref={containerRef} className="w-full h-[300px]" />
          
          <div className="p-2 bg-white border-t border-slate-200 flex items-center justify-between text-xs font-mono">
            <span className="text-emerald-800 font-bold text-[11px]">
              {solutionType === 'strong_hcl' && '💡 إضاءة المصباح: ساطعة وقوية'}
              {solutionType === 'weak_ch3cooh' && '💡 إضاءة المصباح: خافتة وضعيفة'}
              {solutionType === 'water' && '💡 إضاءة المصباح: مطفأ'}
            </span>
            <span className="text-slate-500 text-[10px]">
              {circuitClosed ? 'التيار الكهربائي سارٍ' : 'الدارة مفتوحة'}
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
