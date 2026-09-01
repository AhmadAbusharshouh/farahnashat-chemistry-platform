'use client';

import { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { 
  FlaskConical, 
  Pipette, 
  Sparkles, 
  RotateCcw, 
  Info, 
  CheckCircle2, 
  AlertCircle, 
  Droplets, 
  Award, 
  Flame, 
  Layers, 
  Check, 
  HelpCircle,
  Trophy,
  ArrowLeft,
  ArrowRight,
  Eye
} from 'lucide-react';
import { SUBSTANCES_DATA, ChemicalSubstance, INDICATORS_DATA, IndicatorData } from '@/lib/types';
import { useLanguage } from '@/lib/LanguageContext';

export interface IndicatorReactionResult {
  color: string;
  nameAr: string;
  nameEn: string;
  explanationAr: string;
  explanationEn: string;
  phValue: number;
}

// Helper to compute exact indicator reaction color & scientific description based on curriculum
export function getIndicatorReaction(indicatorId: string, sub: ChemicalSubstance): IndicatorReactionResult {
  const ph = sub.ph;

  if (indicatorId === 'litmus') {
    if (ph < 7) {
      return {
        color: '#ef4444',
        nameAr: 'أحمر قاني (Red)',
        nameEn: 'Bright Red',
        explanationAr: 'في الوسط الحمضي (pH < 7)، يكتسب كاشف تباع الشمس بروتونات H⁺ ويتحول إلى اللون الأحمر المميز.',
        explanationEn: 'In acidic media (pH < 7), litmus molecules are protonated turning distinctly red.',
        phValue: ph
      };
    } else if (ph > 7) {
      return {
        color: '#2563eb',
        nameAr: 'أزرق داكن (Blue)',
        nameEn: 'Deep Blue',
        explanationAr: 'في الوسط القاعدي (pH > 7)، يفقد الكاشف بروتونات ويتأين متحولاً إلى اللون الأزرق الصريح.',
        explanationEn: 'In basic media (pH > 7), litmus deprotonates exhibiting a clear blue color.',
        phValue: ph
      };
    } else {
      return {
        color: '#a855f7',
        nameAr: 'أرجواني / بنفسجي متعادل (Purple)',
        nameEn: 'Neutral Purple',
        explanationAr: 'في الوسط المتعادل (pH = 7)، يبقى الكاشف في لون الاتزان الأرجواني دون تغيير.',
        explanationEn: 'In neutral solution (pH = 7), litmus stays in its equilibrium purple state.',
        phValue: ph
      };
    }
  }

  if (indicatorId === 'cabbage') {
    if (ph < 3) {
      return {
        color: '#e11d48',
        nameAr: 'أحمر قرمزي فاقع (Bright Red)',
        nameEn: 'Bright Crimson Red',
        explanationAr: 'حمض قوي: تكون صبغة الأنثوسيانين (Anthocyanin) في صورة أيون الفلافيليوم (Flavylium cation) أحمر اللون.',
        explanationEn: 'Strong Acid: Anthocyanin exists as flavylium cation producing an intense crimson red.',
        phValue: ph
      };
    } else if (ph < 7) {
      return {
        color: '#ec4899',
        nameAr: 'وردي / بنفسجي فاتح (Pink / Violet)',
        nameEn: 'Pink / Violet',
        explanationAr: 'حمض ضعيف: خليط متوازن بين الصورة الحمراء والبنفسجية لصبغة الملفوف الطبيعية.',
        explanationEn: 'Weak Acid: Balanced equilibrium between red and purple forms of cabbage extract.',
        phValue: ph
      };
    } else if (ph === 7) {
      return {
        color: '#8b5cf6',
        nameAr: 'أرجواني بنفسجي طبيعي (Natural Purple)',
        nameEn: 'Natural Purple',
        explanationAr: 'وسط متعادل: اللون الطبيعي لمستخلص الملفوف الأحمر المسلوق عند pH = 7.',
        explanationEn: 'Neutral: Natural boiling color of red cabbage extract at exact pH 7.',
        phValue: ph
      };
    } else if (ph <= 9) {
      return {
        color: '#06b6d4',
        nameAr: 'أزرق مخضر (Blue-Cyan)',
        nameEn: 'Blue-Cyan',
        explanationAr: 'قاعدة ضعيفة: تتحول صبغة الأنثوسيانين إلى القاعدة الأنيونية الزرقاء.',
        explanationEn: 'Weak Base: Anthocyanin converts into its blue anionic conjugate base.',
        phValue: ph
      };
    } else if (ph <= 12) {
      return {
        color: '#10b981',
        nameAr: 'أخضر زمردي (Emerald Green)',
        nameEn: 'Emerald Green',
        explanationAr: 'قاعدة قوية: يتشكل مركب الكينويد ثنائي الشحنة السالبة ذو اللون الأخضر الزاهي.',
        explanationEn: 'Strong Base: Divalent quinoidal green complex forms in moderately high alkalinity.',
        phValue: ph
      };
    } else {
      return {
        color: '#eab308',
        nameAr: 'أصفر فاقع (Yellow / Golden)',
        nameEn: 'Vibrant Yellow',
        explanationAr: 'قاعدة شديدة القوة (pH > 12): يتحلل هيكل الأنثوسيانين مكوناً مركبات الكالكون الصفراء (Chalcones).',
        explanationEn: 'Extremely Strong Base: Anthocyanin ring opens into yellow chalcone compounds.',
        phValue: ph
      };
    }
  }

  if (indicatorId === 'phenolphthalein') {
    if (ph < 8.2) {
      return {
        color: '#f8fafc',
        nameAr: 'عديم اللون تماماً (شفاف Clear)',
        nameEn: 'Colorless / Transparent',
        explanationAr: 'في الوسط الحمضي والمتعادل والقواعد الضعيفة (pH < 8.2)، يكون جزيء الفينولفثالين غير متأين وعديم اللون.',
        explanationEn: 'In acidic, neutral, and mild media (pH < 8.2), phenolphthalein remains non-ionized and completely clear.',
        phValue: ph
      };
    } else {
      return {
        color: '#f43f5e',
        nameAr: 'وردي فوشيا ساطع (Vibrant Fuchsia Pink)',
        nameEn: 'Vibrant Fuchsia Pink',
        explanationAr: 'في الوسط القاعدي (pH > 8.2)، يفقد الفينولفثالين بروتونين ويتغير تركيبه الإلكتروني مطلقاً اللون الوردي الفاقع.',
        explanationEn: 'In basic media (pH > 8.2), phenolphthalein loses two protons causing conjugated resonance pink color.',
        phValue: ph
      };
    }
  }

  if (indicatorId === 'bromothymol') {
    if (ph < 6.0) {
      return {
        color: '#eab308',
        nameAr: 'أصفر صريح (Yellow)',
        nameEn: 'Clear Yellow',
        explanationAr: 'في الوسط الحمضي (pH < 6.0)، يسود الشكل البروتوني HInd باللون الأصفر.',
        explanationEn: 'In acidic media (pH < 6.0), the yellow protonated form HInd dominates.',
        phValue: ph
      };
    } else if (ph <= 7.6) {
      return {
        color: '#22c55e',
        nameAr: 'أخضر زمردي عند التعادل (Green at Neutral)',
        nameEn: 'Emerald Green',
        explanationAr: 'عند نقطة التعادل الدقيقة (pH 6.0 - 7.6)، يتواجد خليط متساوٍ من الأصفر والأزرق فينتج اللون الأخضر المميز.',
        explanationEn: 'At exact neutralization (pH 6.0 - 7.6), equal mix of yellow and blue produces green.',
        phValue: ph
      };
    } else {
      return {
        color: '#1d4ed8',
        nameAr: 'أزرق داكن (Blue)',
        nameEn: 'Deep Blue',
        explanationAr: 'في الوسط القاعدي (pH > 7.6)، يتأين الكاشف إلى الصورة الأنيونية Ind⁻ ذات اللون الأزرق.',
        explanationEn: 'In alkaline media (pH > 7.6), deprotonated Ind⁻ dominant form is deep blue.',
        phValue: ph
      };
    }
  }

  // Universal Indicator
  let uColor = '#dc2626';
  let uName = 'أحمر قاني (pH 0-2)';
  if (ph >= 3 && ph < 6) {
    uColor = '#ea580c';
    uName = 'برتقالي مصفر (pH 3-5)';
  } else if (ph >= 6 && ph < 8) {
    uColor = '#16a34a';
    uName = 'أخضر ناصع عند التعادل (pH 7)';
  } else if (ph >= 8 && ph < 11) {
    uColor = '#2563eb';
    uName = 'أزرق مخضر (pH 8-10)';
  } else if (ph >= 11) {
    uColor = '#7c3aed';
    uName = 'بنفسجي داكن (pH 11-14)';
  }

  return {
    color: uColor,
    nameAr: uName,
    nameEn: `Universal Spectrum pH ${ph.toFixed(1)}`,
    explanationAr: `الكاشف العام يعطي طيفاً مستمراً يطابق بدقة درجة الحموضة pH = ${ph.toFixed(1)}.`,
    explanationEn: `Universal indicator displays exact standardized continuous chromatic matching at pH ${ph.toFixed(1)}.`,
    phValue: ph
  };
}

export function Indicators3DLab() {
  const { t, lang } = useLanguage();

  const [labMode, setLabMode] = useState<'explore' | 'game' | 'rack'>('explore');
  const [selectedIndicator, setSelectedIndicator] = useState<IndicatorData>(INDICATORS_DATA[1]); // Default to Cabbage Natural Extract
  const [selectedSubstance, setSelectedSubstance] = useState<ChemicalSubstance>(SUBSTANCES_DATA[1]); // Default to HCl
  const [dropCount, setDropCount] = useState<number>(0);
  const [isDropping, setIsDropping] = useState<boolean>(false);

  // Game Mode States
  const [mysterySample, setMysterySample] = useState<ChemicalSubstance>(SUBSTANCES_DATA[0]);
  const [gameIndicator, setGameIndicator] = useState<IndicatorData>(INDICATORS_DATA[1]);
  const [gameTested, setGameTested] = useState<boolean>(false);
  const [gameScore, setGameScore] = useState<number>(0);
  const [gameStreak, setGameStreak] = useState<number>(0);
  const [gameFeedback, setGameFeedback] = useState<{ isCorrect: boolean; messageAr: string; messageEn: string } | null>(null);

  // 3D Canvas Ref
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const liquidMeshRef = useRef<THREE.Mesh | null>(null);
  const dropperGroupRef = useRef<THREE.Group | null>(null);
  const dropParticleRef = useRef<THREE.Mesh | null>(null);
  const ripplesGroupRef = useRef<THREE.Group | null>(null);

  const currentResult = getIndicatorReaction(selectedIndicator.id, selectedSubstance);
  const liquidColorTarget = dropCount > 0 ? currentResult.color : '#e2e8f0';

  // Generate random mystery sample for game
  const generateNewMystery = () => {
    const randomIndex = Math.floor(Math.random() * Math.min(SUBSTANCES_DATA.length, 8));
    setMysterySample(SUBSTANCES_DATA[randomIndex]);
    setGameTested(false);
    setGameFeedback(null);
    setDropCount(0);
  };

  useEffect(() => {
    if (labMode === 'game') {
      generateNewMystery();
    }
  }, [labMode]);

  // Three.js 3D Beaker & Dropper Simulation Engine
  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(38, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 1.8, 5.2);
    camera.lookAt(0, 0.2, 0);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    const el = renderer.domElement;
    el.style.width = '100%';
    el.style.height = '100%';
    el.style.cursor = 'grab';
    container.innerHTML = '';
    container.appendChild(el);

    // 3. Lighting (Clean Laboratory Light)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(3, 6, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xecfdf5, 0.6);
    fillLight.position.set(-4, 3, -2);
    scene.add(fillLight);

    // 4. Lab Platform Table
    const tableGeo = new THREE.CylinderGeometry(2.4, 2.5, 0.2, 32);
    const tableMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.2,
      metalness: 0.1,
    });
    const table = new THREE.Mesh(tableGeo, tableMat);
    table.position.y = -1.1;
    table.receiveShadow = true;
    scene.add(table);

    // 5. 3D Glass Beaker
    const beakerGroup = new THREE.Group();

    // Glass Wall Cylinder
    const glassGeo = new THREE.CylinderGeometry(1.05, 0.95, 2.2, 32, 1, true);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.88,
      opacity: 0.6,
      transparent: true,
      roughness: 0.1,
      ior: 1.5,
      thickness: 0.3,
      side: THREE.DoubleSide
    });
    const glassBeaker = new THREE.Mesh(glassGeo, glassMat);
    beakerGroup.add(glassBeaker);

    // Glass Bottom
    const bottomGeo = new THREE.CylinderGeometry(0.95, 0.95, 0.08, 32);
    const bottomMesh = new THREE.Mesh(bottomGeo, glassMat);
    bottomMesh.position.y = -1.06;
    beakerGroup.add(bottomMesh);

    // Graduation Lines on Beaker
    const linesGroup = new THREE.Group();
    for (let i = -0.6; i <= 0.6; i += 0.3) {
      const ringGeo = new THREE.RingGeometry(1.052, 1.06, 32);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x94a3b8, side: THREE.DoubleSide });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = i;
      linesGroup.add(ring);
    }
    beakerGroup.add(linesGroup);

    // 6. 3D Liquid in Beaker
    const liquidGeo = new THREE.CylinderGeometry(0.98, 0.92, 1.4, 32);
    const liquidMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(liquidColorTarget),
      roughness: 0.15,
      metalness: 0.1,
      transparent: true,
      opacity: 0.88,
    });
    const liquidMesh = new THREE.Mesh(liquidGeo, liquidMat);
    liquidMesh.position.y = -0.35;
    beakerGroup.add(liquidMesh);
    liquidMeshRef.current = liquidMesh;

    // Liquid Top Meniscus Disc
    const meniscusGeo = new THREE.CircleGeometry(0.98, 32);
    const meniscusMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(liquidColorTarget),
      roughness: 0.1,
      transparent: true,
      opacity: 0.92,
    });
    const meniscus = new THREE.Mesh(meniscusGeo, meniscusMat);
    meniscus.rotation.x = -Math.PI / 2;
    meniscus.position.y = 0.35;
    liquidMesh.add(meniscus);

    // 7. Ripples Group
    const ripplesGroup = new THREE.Group();
    ripplesGroup.position.y = 0.36;
    liquidMesh.add(ripplesGroup);
    ripplesGroupRef.current = ripplesGroup;

    scene.add(beakerGroup);

    // 8. 3D Pipette Dropper Hanging Above
    const dropperGroup = new THREE.Group();
    dropperGroup.position.set(0, 2.4, 0);

    // Pipette Glass Tube
    const tubeGeo = new THREE.CylinderGeometry(0.08, 0.04, 1.2, 16);
    const tubeMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.9,
      transparent: true,
      roughness: 0.1
    });
    const tube = new THREE.Mesh(tubeGeo, tubeMat);
    dropperGroup.add(tube);

    // Rubber Bulb
    const bulbGeo = new THREE.SphereGeometry(0.2, 16, 16);
    bulbGeo.scale(1, 1.4, 1);
    const bulbMat = new THREE.MeshStandardMaterial({ color: 0x059669, roughness: 0.6 });
    const bulb = new THREE.Mesh(bulbGeo, bulbMat);
    bulb.position.y = 0.7;
    dropperGroup.add(bulb);

    // Liquid in Pipette Tip
    const tipLiquidGeo = new THREE.CylinderGeometry(0.05, 0.02, 0.5, 16);
    const tipLiquidMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(selectedIndicator.acidColor || '#059669'),
      roughness: 0.2
    });
    const tipLiquid = new THREE.Mesh(tipLiquidGeo, tipLiquidMat);
    tipLiquid.position.y = -0.35;
    dropperGroup.add(tipLiquid);

    scene.add(dropperGroup);
    dropperGroupRef.current = dropperGroup;

    // 9. Droplet Mesh (For animated drop)
    const dropGeo = new THREE.SphereGeometry(0.08, 16, 16);
    dropGeo.scale(1, 1.3, 1);
    const dropMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(selectedIndicator.acidColor || '#10b981'),
      roughness: 0.1,
      transparent: true,
      opacity: 0.9
    });
    const dropParticle = new THREE.Mesh(dropGeo, dropMat);
    dropParticle.visible = false;
    scene.add(dropParticle);
    dropParticleRef.current = dropParticle;

    // Mouse Interaction for 3D Camera Orbit Drag
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let rotY = 0;
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

      rotY += dx * 0.005;
      rotX += dy * 0.005;
      rotX = Math.max(-0.2, Math.min(0.6, rotX));
    };

    const onPointerUp = () => {
      isDragging = false;
      el.style.cursor = 'grab';
    };

    el.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Animation Loop
    let animId = 0;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth idle rotation
      if (!isDragging) {
        rotY += 0.002;
      }

      beakerGroup.rotation.y = rotY;
      beakerGroup.rotation.x = rotX;

      // Animate ripples if present
      if (ripplesGroupRef.current) {
        for (let i = ripplesGroupRef.current.children.length - 1; i >= 0; i--) {
          const r = ripplesGroupRef.current.children[i] as THREE.Mesh;
          r.scale.x += 0.03;
          r.scale.y += 0.03;
          (r.material as THREE.Material).opacity -= 0.02;
          if ((r.material as THREE.Material).opacity <= 0) {
            ripplesGroupRef.current.remove(r);
          }
        }
      }

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
  }, []);

  // Update Liquid Color smoothly when indicator or substance changes
  useEffect(() => {
    if (liquidMeshRef.current) {
      const mat = liquidMeshRef.current.material as THREE.MeshStandardMaterial;
      mat.color.set(liquidColorTarget);

      // Also update meniscus child
      if (liquidMeshRef.current.children[0]) {
        const mMat = (liquidMeshRef.current.children[0] as THREE.Mesh).material as THREE.MeshStandardMaterial;
        mMat.color.set(liquidColorTarget);
      }
    }
  }, [liquidColorTarget]);

  // Animated 3D Droplet Action
  const trigger3DDroplet = () => {
    if (isDropping) return;
    setIsDropping(true);

    const dropper = dropperGroupRef.current;
    const drop = dropParticleRef.current;
    const ripples = ripplesGroupRef.current;

    if (!drop || !dropper) {
      setDropCount((c) => c + 1);
      setIsDropping(false);
      return;
    }

    // Dip dropper down
    let startTime = performance.now();
    const duration = 600;

    drop.position.set(0, 1.8, 0);
    drop.visible = true;

    const dropAnim = () => {
      const now = performance.now();
      const progress = (now - startTime) / duration;

      if (progress < 1) {
        // Fall down towards beaker liquid
        drop.position.y = 1.8 - progress * 1.8;
        requestAnimationFrame(dropAnim);
      } else {
        drop.visible = false;
        setIsDropping(false);
        setDropCount((c) => c + 1);

        // Add 3D ripple ring on liquid surface
        if (ripples) {
          const ringGeo = new THREE.RingGeometry(0.05, 0.08, 32);
          const ringMat = new THREE.MeshBasicMaterial({
            color: new THREE.Color(currentResult.color),
            transparent: true,
            opacity: 0.9,
            side: THREE.DoubleSide
          });
          const ringMesh = new THREE.Mesh(ringGeo, ringMat);
          ringMesh.rotation.x = Math.PI / 2;
          ripples.add(ringMesh);
        }
      }
    };
    requestAnimationFrame(dropAnim);
  };

  const resetBeaker = () => {
    setDropCount(0);
  };

  // Game Deduction Check
  const handleGameGuess = (guessType: string) => {
    const actual = mysterySample.type.startsWith('acid_strong')
      ? 'strong_acid'
      : mysterySample.type.startsWith('acid_weak')
      ? 'weak_acid'
      : mysterySample.type === 'neutral'
      ? 'neutral'
      : mysterySample.type.startsWith('base_weak')
      ? 'weak_base'
      : 'strong_base';

    const isCorrect = guessType === actual;
    if (isCorrect) {
      setGameScore((s) => s + 10);
      setGameStreak((st) => st + 1);
      setGameFeedback({
        isCorrect: true,
        messageAr: `🎉 إجابة علمية عبقرية وصحيحة! العينة هي بالفعل: ${mysterySample.name} (pH = ${mysterySample.ph}).`,
        messageEn: `Brilliant! The mystery sample is indeed ${mysterySample.nameEn} (pH = ${mysterySample.ph}).`
      });
    } else {
      setGameStreak(0);
      setGameFeedback({
        isCorrect: false,
        messageAr: `❌ محاولة قريبة، لكن العينة الحقيقية هي: ${mysterySample.name} (pH = ${mysterySample.ph}) وليست كذلك.`,
        messageEn: `Not quite! The true sample was ${mysterySample.nameEn} (pH = ${mysterySample.ph}).`
      });
    }
  };

  return (
    <div className="bg-white border border-slate-200 p-4 sm:p-6 space-y-6 shadow-sm">
      
      {/* Top Banner & Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-emerald-700 text-white shadow-xs">
              <FlaskConical className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-950">
                {t('محطة الكواشف الكيميائية الخمسة والمختبر التفاعلي (3D)', 'The 5 Chemical Indicators 3D Interactive Lab')}
              </h2>
              <p className="text-xs text-slate-500">
                {t('محاكاة حية لتغير الألوان، قطارة 3D، ولعبة المحقق الكيميائي', 'Live 3D colorimetric transitions, interactive pipette, & detective game')}
              </p>
            </div>
          </div>
        </div>

        {/* Lab Mode Pills */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-bold">
          <button
            onClick={() => setLabMode('explore')}
            className={`px-3 py-1.5 rounded-md transition flex items-center gap-1.5 ${
              labMode === 'explore'
                ? 'bg-emerald-700 text-white shadow-2xs'
                : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Pipette className="w-3.5 h-3.5" />
            <span>{t('الاستقصاء وإسقاط القطرات 3D', '3D Dropper Lab')}</span>
          </button>

          <button
            onClick={() => setLabMode('game')}
            className={`px-3 py-1.5 rounded-md transition flex items-center gap-1.5 ${
              labMode === 'game'
                ? 'bg-amber-600 text-white shadow-2xs'
                : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>{t('لعبة المحقق الكيميائي 🎮', 'Detective Game 🎮')}</span>
          </button>

          <button
            onClick={() => setLabMode('rack')}
            className={`px-3 py-1.5 rounded-md transition flex items-center gap-1.5 ${
              labMode === 'rack'
                ? 'bg-emerald-700 text-white shadow-2xs'
                : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{t('مصفوفة الكواشف الخمسة', '5-Indicators Matrix')}</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: FREE 3D EXPLORATION & DROPPER LAB */}
      {/* ========================================================================= */}
      {labMode === 'explore' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Controls Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4 text-right">
            
            {/* 1. Choose from 5 Indicators */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px]">1</span>
                <span>{t('اختر أحد الكواشف الخمسة المعتمدة:', 'Select one of the 5 indicators:')}</span>
              </label>

              <div className="grid grid-cols-1 gap-1.5">
                {INDICATORS_DATA.map((ind) => {
                  const isSelected = selectedIndicator.id === ind.id;
                  return (
                    <button
                      key={ind.id}
                      onClick={() => {
                        setSelectedIndicator(ind);
                        setDropCount(0);
                      }}
                      className={`p-2.5 rounded-lg border text-right transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-2xs'
                          : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-black">{ind.name}</div>
                        <div className="text-[10px] text-slate-500">{ind.curriculumReference} • {ind.phTransitionRange}</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded-full border border-slate-300" style={{ backgroundColor: ind.acidColor }} title="حمض" />
                        <span className="w-3 h-3 rounded-full border border-slate-300" style={{ backgroundColor: ind.neutralColor }} title="متعادل" />
                        <span className="w-3 h-3 rounded-full border border-slate-300" style={{ backgroundColor: ind.baseColor }} title="قاعدة" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Choose Substance */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px]">2</span>
                <span>{t('اختر المحلول والعينة المراد فحصها:', 'Select chemical solution to test:')}</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-48 overflow-y-auto p-1 border border-slate-200 rounded-lg bg-slate-50">
                {SUBSTANCES_DATA.slice(0, 9).map((sub) => {
                  const isSelected = selectedSubstance.id === sub.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => {
                        setSelectedSubstance(sub);
                        setDropCount(0);
                      }}
                      className={`p-2 rounded-md border text-xs font-bold transition text-right truncate ${
                        isSelected
                          ? 'bg-emerald-700 text-white border-emerald-800 shadow-2xs'
                          : 'bg-white border-slate-200 text-slate-800 hover:bg-emerald-50'
                      }`}
                    >
                      <div className="truncate">{sub.name.split('(')[0]}</div>
                      <div className={`text-[10px] font-mono ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>
                        pH = {sub.ph}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dropper Actions */}
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={trigger3DDroplet}
                disabled={isDropping}
                className="flex-1 py-3 bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-300 text-white font-bold text-xs rounded-lg transition shadow-xs flex items-center justify-center gap-2 active:scale-98"
              >
                <Pipette className="w-4 h-4" />
                <span>{t('إسقاط قطرة كاشف بالقطارة 3D', 'Drop Indicator 3D')}</span>
              </button>

              <button
                onClick={resetBeaker}
                className="px-3.5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg border border-slate-300 transition"
                title={t('تفريغ وتنظيف الكأس', 'Reset & Wash Beaker')}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right 3D Visualizer & Results Column (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* 3D Beaker Stage */}
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200/90 border border-slate-300 p-4 shadow-inner overflow-hidden">
              
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs px-1">
                <div className="flex items-center gap-2 text-slate-800 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: liquidColorTarget }} />
                  <span>{selectedSubstance.name} + {selectedIndicator.name}</span>
                </div>
                <span className="text-[11px] text-slate-500">
                  {t('اسحب لتدوير الكأس 3D', 'Drag to inspect 3D beaker')}
                </span>
              </div>

              {/* 3D Viewport Container */}
              <div 
                ref={canvasContainerRef}
                className="w-full h-[320px] sm:h-[360px] relative flex items-center justify-center"
              />

              {/* Status Ribbon Underneath 3D */}
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-slate-300 shadow-md flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span>{t('اللون الناتج:', 'Resulting Color:')}</span>
                    <span className="font-black text-emerald-800">{dropCount > 0 ? currentResult.nameAr : t('شفاف / لم يُضف كاشف بعد', 'Clear (No indicator added yet)')}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {dropCount > 0 ? currentResult.explanationAr : t('انقر زر القطارة لإسقاط قطرات الكاشف ورؤية التحول اللوني في الكأس 3D', 'Press the dropper button to drop indicator')}
                  </div>
                </div>

                <div className="text-center px-3 py-1 bg-emerald-50 border border-emerald-300 rounded-lg shrink-0">
                  <div className="text-[10px] text-slate-500">{t('الرقم الهيدروجيني', 'pH Value')}</div>
                  <div className="font-mono font-black text-emerald-900 text-sm">pH {selectedSubstance.ph}</div>
                </div>
              </div>

            </div>

            {/* Scientific Explanation & Curriculum Link */}
            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1.5 text-xs text-right">
              <div className="font-black text-emerald-950 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-emerald-700" />
                <span>{t('التفسير العلمي وتطبيقات المنهاج (ص 49، 51، 55):', 'Curriculum Scientific Analysis:')}</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                {selectedIndicator.description}
              </p>
              <div className="pt-1 font-mono text-[11px] text-emerald-900 font-bold dir-ltr">
                {selectedSubstance.ionizationEquation}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: CHEMICAL MYSTERY DETECTIVE GAME 🎮 */}
      {/* ========================================================================= */}
      {labMode === 'game' && (
        <div className="space-y-6 text-right">
          
          {/* Game Header Bar */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-600" />
              <div>
                <h3 className="font-black text-amber-950 text-sm">
                  {t('تحدي المحقق الكيميائي: كشف العينة المجهولة 🕵️‍♂️', 'Chemical Detective Mystery Challenge')}
                </h3>
                <p className="text-amber-800 text-[11px]">
                  {t('أمامك عينة مجهولة الهوية! استخدم الكاشف المناسب واستنتج نوع المادة ودرجة حموضتها.', 'An unknown sample is before you! Drop indicators and deduce the substance.')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-3 py-1.5 bg-white border border-amber-300 rounded-lg text-center font-bold">
                <div className="text-[10px] text-slate-500">{t('النقاط', 'Score')}</div>
                <div className="text-amber-900 text-sm font-black">{gameScore} pts</div>
              </div>
              <div className="px-3 py-1.5 bg-white border border-amber-300 rounded-lg text-center font-bold">
                <div className="text-[10px] text-slate-500">{t('التتابع', 'Streak')}</div>
                <div className="text-emerald-700 text-sm font-black">🔥 {gameStreak}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Investigation Control (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              
              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                <h4 className="font-bold text-xs text-slate-800">
                  {t('1. اختر الكاشف لإضافته على العينة المجهولة:', '1. Pick an indicator to drop on the mystery sample:')}
                </h4>

                <div className="grid grid-cols-1 gap-1.5">
                  {INDICATORS_DATA.map((ind) => (
                    <button
                      key={ind.id}
                      onClick={() => {
                        setGameIndicator(ind);
                        setSelectedIndicator(ind);
                        setSelectedSubstance(mysterySample);
                        setGameTested(true);
                        setDropCount(1);
                      }}
                      className={`p-2.5 rounded-lg border text-right text-xs font-bold transition flex items-center justify-between ${
                        gameIndicator.id === ind.id && gameTested
                          ? 'bg-amber-100 border-amber-500 text-amber-950 shadow-2xs'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <span>{ind.name}</span>
                      <span className="text-[10px] text-slate-400">{ind.curriculumReference}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Deduction Choices */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                <h4 className="font-bold text-xs text-slate-800">
                  {t('2. بناءً على اللون الناتج، ما هو التصنيف الكيميائي للعينة المجهولة؟', '2. Based on color, what is the chemical class of this mystery sample?')}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={() => handleGameGuess('strong_acid')}
                    className="p-3 bg-red-50 hover:bg-red-100 border border-red-300 text-red-900 rounded-lg text-xs font-bold text-center transition"
                  >
                    🔴 {t('حمض قوي (pH 0-2)', 'Strong Acid (pH 0-2)')}
                  </button>

                  <button
                    onClick={() => handleGameGuess('weak_acid')}
                    className="p-3 bg-orange-50 hover:bg-orange-100 border border-orange-300 text-orange-900 rounded-lg text-xs font-bold text-center transition"
                  >
                    🟠 {t('حمض ضعيف (pH 3-6)', 'Weak Acid (pH 3-6)')}
                  </button>

                  <button
                    onClick={() => handleGameGuess('neutral')}
                    className="p-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-lg text-xs font-bold text-center transition"
                  >
                    🟢 {t('متعادل تماماً (pH = 7)', 'Neutral (pH = 7)')}
                  </button>

                  <button
                    onClick={() => handleGameGuess('strong_base')}
                    className="p-3 bg-blue-50 hover:bg-blue-100 border border-blue-300 text-blue-900 rounded-lg text-xs font-bold text-center transition"
                  >
                    🔵 {t('قاعدة قوية (pH 12-14)', 'Strong Base (pH 12-14)')}
                  </button>
                </div>
              </div>

              {/* Next Mystery Button */}
              <button
                onClick={generateNewMystery}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t('توليد عينة كيميائية مجهولة جديدة', 'Generate New Mystery Sample')}</span>
              </button>

            </div>

            {/* Right Mystery Stage & Reaction Result (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              
              <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 text-white border border-slate-800 text-center space-y-4 shadow-xl">
                <div className="text-xs font-bold text-amber-400">
                  🧪 {t('كأس فحص العينة المجهولة (Sample X)', 'Mystery Reaction Chamber')}
                </div>

                <div className="w-32 h-44 mx-auto rounded-xl border-2 border-slate-600 relative overflow-hidden bg-slate-800 flex flex-col justify-end p-2 shadow-2xl">
                  <div
                    className="w-full rounded-lg transition-all duration-700 relative"
                    style={{
                      height: '75%',
                      backgroundColor: gameTested ? getIndicatorReaction(gameIndicator.id, mysterySample).color : '#cbd5e1'
                    }}
                  >
                    {gameTested && (
                      <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    )}
                  </div>
                </div>

                <div className="text-xs text-slate-300">
                  {gameTested ? (
                    <span className="font-bold text-emerald-300">
                      ✨ {t('اللون الملاحظ بعد إضافة الكاشف:', 'Observed Color:')}{' '}
                      {getIndicatorReaction(gameIndicator.id, mysterySample).nameAr}
                    </span>
                  ) : (
                    <span>{t('اختر كاشفاً لإضافته ومشاهدة التغير اللوني', 'Select indicator to drop onto mystery sample')}</span>
                  )}
                </div>
              </div>

              {/* Game Feedback Result Card */}
              {gameFeedback && (
                <div
                  className={`p-4 rounded-xl border space-y-1 text-xs text-right animate-in fade-in duration-300 ${
                    gameFeedback.isCorrect
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : 'bg-red-50 border-red-300 text-red-950'
                  }`}
                >
                  <div className="font-black text-sm flex items-center gap-1.5">
                    {gameFeedback.isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-700" /> : <AlertCircle className="w-4 h-4 text-red-700" />}
                    <span>{lang === 'ar' ? gameFeedback.messageAr : gameFeedback.messageEn}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {mysterySample.realWorldNote}
                  </p>
                </div>
              )}

            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: 5-TEST-TUBE SIMULTANEOUS COMPARISON MATRIX */}
      {/* ========================================================================= */}
      {labMode === 'rack' && (
        <div className="space-y-6 text-right">
          
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-black text-slate-900 text-sm">
                {t('مصفوفة الكواشف الخمسة لنفس المادة بالتزامن', 'Simultaneous 5-Indicators Spectrum for Chosen Substance')}
              </h3>
              <p className="text-xs text-slate-500">
                {t('شاهد ألوان الكواشف الخمسة مجتمعة لمقارنة استجابتها لدرجة حموضة نفس العينة', 'Compare all 5 indicators reacting side-by-side')}
              </p>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto max-w-md py-1">
              {SUBSTANCES_DATA.slice(0, 6).map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubstance(sub)}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold border transition ${
                    selectedSubstance.id === sub.id
                      ? 'bg-emerald-700 text-white border-emerald-800'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-emerald-50'
                  }`}
                >
                  {sub.name.split('(')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* 5 Test Tubes Rack Display */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3.5">
            {INDICATORS_DATA.map((ind) => {
              const res = getIndicatorReaction(ind.id, selectedSubstance);
              return (
                <div
                  key={ind.id}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center space-y-3 shadow-2xs hover:shadow-sm transition"
                >
                  <div className="font-bold text-xs text-slate-900 h-8 flex items-center justify-center">
                    {ind.name}
                  </div>

                  {/* 3D Test Tube Visual */}
                  <div className="w-16 h-36 mx-auto rounded-b-full border-2 border-slate-300 relative overflow-hidden bg-white shadow-inner flex flex-col justify-end p-1">
                    <div
                      className="w-full rounded-b-full transition-all duration-500"
                      style={{ height: '70%', backgroundColor: res.color }}
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs font-black text-emerald-900">
                      {res.nameAr}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {ind.phTransitionRange}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Red Cabbage Anthocyanin Natural Spectrum Table */}
          <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 space-y-2">
            <h4 className="font-black text-xs text-purple-950 flex items-center gap-1.5">
              <span>🌿</span>
              <span>{t('طيف مستخلص الملفوف الأحمر الطبيعي (صبغة الأنثوسيانين ص 55):', 'Red Cabbage Anthocyanin Complete Spectrum:')}</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs">
              <div className="p-2 rounded bg-rose-600 text-white font-bold">
                <div>pH 1 - 2</div>
                <div className="text-[10px]">أحمر قاني</div>
              </div>
              <div className="p-2 rounded bg-pink-500 text-white font-bold">
                <div>pH 3 - 6</div>
                <div className="text-[10px]">وردي / بنفسجي</div>
              </div>
              <div className="p-2 rounded bg-purple-600 text-white font-bold">
                <div>pH 7</div>
                <div className="text-[10px]">أرجواني متعادل</div>
              </div>
              <div className="p-2 rounded bg-cyan-600 text-white font-bold">
                <div>pH 8 - 9</div>
                <div className="text-[10px]">أزرق مخضر</div>
              </div>
              <div className="p-2 rounded bg-emerald-600 text-white font-bold">
                <div>pH 10 - 12</div>
                <div className="text-[10px]">أخضر زمردي</div>
              </div>
              <div className="p-2 rounded bg-amber-500 text-white font-bold">
                <div>pH 13 - 14</div>
                <div className="text-[10px]">أصفر ذهبي</div>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}