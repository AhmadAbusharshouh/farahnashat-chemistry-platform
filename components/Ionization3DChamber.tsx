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
    const height = 340;

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
    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    // 1. Glass Beaker (Cylinder)
    const beakerGeo = new THREE.CylinderGeometry(1.8, 1.8, 3.2, 32, 1, true);
    const beakerMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.25,
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

    // 2. Liquid Level in Beaker
    const liquidGeo = new THREE.CylinderGeometry(1.75, 1.75, 2.2, 32);
    const liquidMat = new THREE.MeshPhysicalMaterial({
      color: 0x0284c7,
      transparent: true,
      opacity: 0.35,
      roughness: 0.2
    });
    const liquid = new THREE.Mesh(liquidGeo, liquidMat);
    liquid.position.set(0, -1.1, 0);
    scene.add(liquid);

    // 3. Dual Graphite Electrodes
    const electrodeGeo = new THREE.CylinderGeometry(0.12, 0.12, 3.0, 16);
    const electrodeMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.4,
      metalness: 0.8
    });

    const anode = new THREE.Mesh(electrodeGeo, electrodeMat);
    anode.position.set(-0.8, -0.4, 0);
    scene.add(anode);

    const cathode = new THREE.Mesh(electrodeGeo, electrodeMat);
    cathode.position.set(0.8, -0.4, 0);
    scene.add(cathode);

    // 4. Overhead Lightbulb Apparatus
    const bulbGeo = new THREE.SphereGeometry(0.45, 32, 32);
    const bulbMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      emissive: 0x000000,
      roughness: 0.2
    });
    const bulb = new THREE.Mesh(bulbGeo, bulbMat);
    bulb.position.set(0, 2.2, 0);
    scene.add(bulb);
    bulbMeshRef.current = bulb;

    const bulbSocketGeo = new THREE.CylinderGeometry(0.2, 0.25, 0.4, 16);
    const bulbSocketMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.8 });
    const bulbSocket = new THREE.Mesh(bulbSocketGeo, bulbSocketMat);
    bulbSocket.position.set(0, 2.6, 0);
    scene.add(bulbSocket);

    // Point Light from Bulb
    const bulbLight = new THREE.PointLight(0xfef08a, 0, 12);
    bulbLight.position.set(0, 2.2, 0);
    scene.add(bulbLight);
    bulbLightRef.current = bulbLight;

    // 5. Floating Ions Group
    const ionsGroup = new THREE.Group();
    scene.add(ionsGroup);
    ionsGroupRef.current = ionsGroup;

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Animate floating ions
      if (ionsGroupRef.current) {
        const time = Date.now() * 0.002;
        ionsGroupRef.current.children.forEach((ionMesh: any, i) => {
          ionMesh.position.y += Math.sin(time + i) * 0.003;
          if (circuitClosed) {
            // Cations move towards Cathode (+ -> -), Anions move towards Anode (- -> +)
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
      cameraRef.current.aspect = w / 340;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, 340);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // Update Ions & Bulb Glow when state changes
  useEffect(() => {
    if (!bulbLightRef.current || !bulbMeshRef.current || !ionsGroupRef.current) return;

    const bulbLight = bulbLightRef.current;
    const bulbMesh = bulbMeshRef.current;
    const ionsGroup = ionsGroupRef.current;

    // Clear old ions
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
      ionCount = 36; // Abundant ions in strong electrolyte
      bulbIntensity = 5.0; // Bright glow
      emissiveColor = 0xfef08a; // Warm bright white-yellow
    } else if (solutionType === 'weak_ch3cooh') {
      ionCount = 8; // Sparse ions in weak electrolyte
      bulbIntensity = 1.0; // Dim glow
      emissiveColor = 0xb45309; // Dim amber
    } else {
      ionCount = 0; // Pure distilled water
      bulbIntensity = 0;
      emissiveColor = 0x000000;
    }

    bulbLight.intensity = bulbIntensity;
    (bulbMesh.material as THREE.MeshStandardMaterial).emissive.setHex(emissiveColor);

    // Spawn 3D Ions
    const cationGeo = new THREE.SphereGeometry(0.1, 16, 16);
    const cationMat = new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0x991b1b }); // H+ (Red)

    const anionGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const anionMat = new THREE.MeshStandardMaterial({ color: 0x10b981, emissive: 0x065f46 }); // Cl- / CH3COO- (Green)

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
    <div className="bg-slate-950 text-white border border-slate-800 p-6 space-y-6">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-400"></span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">
              3D Real-Time Ion Mobility & Conductivity Simulator
            </span>
          </div>
          <h3 className="text-lg font-black tracking-tight text-white">
            محاكاة التأين ثلاثي الأبعاد وإضاءة المصباح (كولينز ص 52 - 53)
          </h3>
        </div>

        <button
          onClick={() => setCircuitClosed(!circuitClosed)}
          className={`px-4 py-2 font-mono text-xs font-bold border transition flex items-center gap-2 ${
            circuitClosed ? 'bg-amber-600 border-amber-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>{circuitClosed ? 'فتح الدارة (إيقاف)' : 'إغلاق الدارة (تشغيل)'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Solution Selector (4 cols) */}
        <div className="lg:col-span-4 space-y-2 text-right">
          <span className="text-[10px] font-mono text-slate-400 block px-1">اختر المحلول الكهرلي:</span>
          
          <button
            onClick={() => setSolutionType('strong_hcl')}
            className={`w-full p-3.5 border transition text-right ${
              solutionType === 'strong_hcl'
                ? 'bg-emerald-950/90 border-emerald-400 text-emerald-200'
                : 'bg-slate-900 border-slate-800 text-slate-300'
            }`}
          >
            <div className="font-bold text-xs">1. حمض قوي: HCl (0.1 M)</div>
            <div className="text-[11px] text-slate-400 mt-1">تأين كلي (→) • إضاءة مصباح ساطعة جداً • وفرة أيونات</div>
          </button>

          <button
            onClick={() => setSolutionType('weak_ch3cooh')}
            className={`w-full p-3.5 border transition text-right ${
              solutionType === 'weak_ch3cooh'
                ? 'bg-amber-950/90 border-amber-400 text-amber-200'
                : 'bg-slate-900 border-slate-800 text-slate-300'
            }`}
          >
            <div className="font-bold text-xs">2. حمض ضعيف: CH₃COOH (0.1 M)</div>
            <div className="text-[11px] text-slate-400 mt-1">تأين جزئي (⇌) • إضاءة خافتة • قلة أيونات حرة</div>
          </button>

          <button
            onClick={() => setSolutionType('water')}
            className={`w-full p-3.5 border transition text-right ${
              solutionType === 'water'
                ? 'bg-sky-950/90 border-sky-400 text-sky-200'
                : 'bg-slate-900 border-slate-800 text-slate-300'
            }`}
          >
            <div className="font-bold text-xs">3. ماء مقطر نقي (H₂O)</div>
            <div className="text-[11px] text-slate-400 mt-1">غير موصل • المصباح مطفأ تماماً</div>
          </button>
        </div>

        {/* 3D Visual Viewport (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 relative">
          <div ref={containerRef} className="w-full h-[340px]" />
          
          <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
            <span className="text-emerald-400 font-bold">
              {solutionType === 'strong_hcl' && '💡 حالة المصباح: متوهج ساطع (High Conductivity)'}
              {solutionType === 'weak_ch3cooh' && '💡 حالة المصباح: إضاءة خافتة وضعيفة (Low Conductivity)'}
              {solutionType === 'water' && '💡 حالة المصباح: مطفأ (Non-Conductive)'}
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
