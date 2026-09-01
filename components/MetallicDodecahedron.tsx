"use client"

import * as React from "react"
import { useEffect, useRef, useImperativeHandle, forwardRef } from "react"
import * as THREE from "three"

/**
 * Metallic Chemical Dodecahedron — A 3D platonic solid in polished metal
 * with chemical formulas (HCl, NaOH, H₂SO₄, Ca(OH)₂, etc.) engraved on each face.
 * Faces lift off the body when clicked/tapped, hold apart and settle back,
 * draggable and tumbling smoothly on its own.
 */

const POLISHED_METAL_MATCAP =
  "https://framerusercontent.com/images/Wkm2ineJ1Md7Xb1oyjF6dqbAw.png"

const PERSPECTIVE = 0.15
const DRAG_SLOP = 5

export const CHEMICAL_FACES_DATA = [
  { formula: "HCl", nameAr: "حمض الهيدروكلوريك", typeAr: "حمض قوي", ph: "1.0", color: "#E11D48" },
  { formula: "NaOH", nameAr: "هيدروكسيد الصوديوم", typeAr: "قاعدة قوية", ph: "13.0", color: "#2563EB" },
  { formula: "H₂SO₄", nameAr: "حمض الكبريتيك", typeAr: "حمض قوي", ph: "0.5", color: "#DC2626" },
  { formula: "CH₃COOH", nameAr: "حمض الخل", typeAr: "حمض ضعيف", ph: "2.9", color: "#F59E0B" },
  { formula: "Ca(OH)₂", nameAr: "هيدروكسيد الكالسيوم", typeAr: "قاعدة قوية", ph: "12.4", color: "#3B82F6" },
  { formula: "NH₃", nameAr: "الأمونيا", typeAr: "قاعدة ضعيفة", ph: "11.1", color: "#06B6D4" },
  { formula: "H₂O", nameAr: "الماء النقي", typeAr: "متعادل", ph: "7.0", color: "#10B981" },
  { formula: "H₃O⁺", nameAr: "أيون الهيدرونيوم", typeAr: "أيون حمضي", ph: "< 7", color: "#F43F5E" },
  { formula: "OH⁻", nameAr: "أيون الهيدروكسيد", typeAr: "أيون قاعدي", ph: "> 7", color: "#6366F1" },
  { formula: "HNO₃", nameAr: "حمض النيتريك", typeAr: "حمض قوي", ph: "1.2", color: "#E11D48" },
  { formula: "NaCl", nameAr: "كلوريد الصوديوم", typeAr: "ملح متعادل", ph: "7.0", color: "#14B8A6" },
  { formula: "CO₂", nameAr: "أكسيد حمضي", typeAr: "غاز لا فلزي", ph: "5.6", color: "#8B5CF6" },
]

export type ShapeType = "tetrahedron" | "octahedron" | "dodecahedron" | "icosahedron"
export type FinishType = "metal" | "solid" | "wire"

export type Transition = {
  type?: string
  duration?: number
  delay?: number
  ease?: string | number[]
}

export type Config = {
  shape: ShapeType
  finish: FinishType
  tint: string
  color: string
  edges: boolean
  edgeColor: string
  burst: { enabled: boolean; distance: number; twist: number }
  transition: Transition
  rotation: { x: number; y: number; z: number }
  dragSensitivity: number
  sizePercent: number
  showChemicalLabels?: boolean
  selectedFormula?: string | null
}

const DEFAULTS: Config = {
  shape: "dodecahedron",
  finish: "metal",
  tint: "#FFFFFF",
  color: "#059669",
  edges: true,
  edgeColor: "#10B981",
  burst: {
    enabled: true,
    distance: 35,
    twist: 22,
  },
  transition: {
    type: "tween",
    duration: 0.65,
    delay: 0.55,
    ease: "easeOut",
  },
  rotation: { x: 2, y: 5, z: 0 },
  dragSensitivity: 10,
  sizePercent: 100,
  showChemicalLabels: true,
  selectedFormula: null,
}

const NAMED_EASES: Record<string, number[]> = {
  linear: [0, 0, 1, 1],
  ease: [0.25, 0.1, 0.25, 1],
  easeIn: [0.42, 0, 1, 1],
  easeOut: [0, 0, 0.58, 1],
  easeInOut: [0.42, 0, 0.58, 1],
  circIn: [0.55, 0, 1, 0.45],
  circOut: [0, 0.55, 0.45, 1],
  circInOut: [0.85, 0, 0.15, 1],
  backIn: [0.36, 0, 0.66, -0.56],
  backOut: [0.34, 1.56, 0.64, 1],
  backInOut: [0.68, -0.6, 0.32, 1.6],
}

function makeEaseFn(transition?: Transition) {
  let pts: number[] = NAMED_EASES.easeOut
  const ease = transition?.ease
  if (Array.isArray(ease) && ease.length === 4 && ease.every(Number.isFinite))
    pts = ease as number[]
  else if (typeof ease === "string" && NAMED_EASES[ease])
    pts = NAMED_EASES[ease]

  const [x1, y1, x2, y2] = pts
  if (x1 === y1 && x2 === y2) return (t: number) => t

  const bez = (a: number, b: number, t: number) => {
    const u = 1 - t
    return 3 * u * u * t * a + 3 * u * t * t * b + t * t * t
  }
  return (t: number) => {
    const x = Math.max(0, Math.min(1, t))
    let s = x
    for (let i = 0; i < 8; i++) {
      const cx = bez(x1, x2, s) - x
      const u = 1 - s
      const dx = 3 * u * u * x1 + 6 * u * s * (x2 - x1) + 3 * s * s * (1 - x2)
      if (Math.abs(dx) < 1e-6) break
      s -= cx / dx
      s = Math.max(0, Math.min(1, s))
    }
    return bez(y1, y2, s)
  }
}

function clamp(v: number, lo: number, hi: number, fallback: number): number {
  const n = typeof v === "number" && isFinite(v) ? v : fallback
  return Math.max(lo, Math.min(hi, n))
}

function baseGeometry(shape: Config["shape"]): THREE.BufferGeometry {
  switch (shape) {
    case "tetrahedron":
      return new THREE.TetrahedronGeometry(1)
    case "octahedron":
      return new THREE.OctahedronGeometry(1)
    case "icosahedron":
      return new THREE.IcosahedronGeometry(1)
    default:
      return new THREE.DodecahedronGeometry(1)
  }
}

type Face = {
  mesh: THREE.Mesh
  normal: THREE.Vector3
  chemicalIndex: number
  material?: THREE.Material
}

let matcapTexture: THREE.Texture | null = null
let matcapPending: Promise<THREE.Texture | null> | null = null

function createFallbackMatcap(): THREE.Texture {
  const canvas = document.createElement("canvas")
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext("2d")
  if (ctx) {
    const grad = ctx.createRadialGradient(90, 80, 10, 128, 128, 120)
    grad.addColorStop(0, "#ffffff")
    grad.addColorStop(0.3, "#e2e8f0")
    grad.addColorStop(0.6, "#94a3b8")
    grad.addColorStop(0.85, "#475569")
    grad.addColorStop(1, "#1e293b")
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.arc(128, 128, 120, 0, Math.PI * 2)
    ctx.fill()
  }
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

function loadMatcap(): Promise<THREE.Texture | null> {
  if (matcapTexture) return Promise.resolve(matcapTexture)
  if (matcapPending) return matcapPending
  matcapPending = new Promise((resolve) => {
    const loader = new THREE.TextureLoader()
    loader.setCrossOrigin("anonymous")
    loader.load(
      POLISHED_METAL_MATCAP,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace
        matcapTexture = texture
        resolve(texture)
      },
      undefined,
      () => {
        const fallback = createFallbackMatcap()
        matcapTexture = fallback
        resolve(fallback)
      }
    )
  })
  return matcapPending
}

function createChemicalFaceTexture(chem: (typeof CHEMICAL_FACES_DATA)[0], isSelected: boolean): THREE.CanvasTexture {
  const canvas = document.createElement("canvas")
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext("2d")
  if (!ctx) return new THREE.CanvasTexture(canvas)

  // Background Metallic Plate
  const bgGrad = ctx.createRadialGradient(256, 256, 50, 256, 256, 250)
  if (isSelected) {
    bgGrad.addColorStop(0, "#065f46")
    bgGrad.addColorStop(0.7, "#047857")
    bgGrad.addColorStop(1, "#022c22")
  } else {
    bgGrad.addColorStop(0, "#f8fafc")
    bgGrad.addColorStop(0.6, "#e2e8f0")
    bgGrad.addColorStop(1, "#cbd5e1")
  }
  ctx.fillStyle = bgGrad
  ctx.fillRect(0, 0, 512, 512)

  // Subtle border ring
  ctx.strokeStyle = isSelected ? "#34d399" : "rgba(100, 116, 139, 0.4)"
  ctx.lineWidth = isSelected ? 12 : 6
  ctx.beginPath()
  ctx.arc(256, 256, 230, 0, Math.PI * 2)
  ctx.stroke()

  // Inner decorative ring
  ctx.strokeStyle = isSelected ? "rgba(255,255,255,0.4)" : "rgba(148, 163, 184, 0.3)"
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.arc(256, 256, 200, 0, Math.PI * 2)
  ctx.stroke()

  // Chemical Formula Text
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"

  // Formula
  ctx.fillStyle = isSelected ? "#ffffff" : "#0f172a"
  ctx.font = "bold 90px 'Outfit', sans-serif"
  ctx.fillText(chem.formula, 256, 220)

  // Arabic Name & Type
  ctx.fillStyle = isSelected ? "#a7f3d0" : "#047857"
  ctx.font = "bold 32px 'Zain', sans-serif"
  ctx.fillText(chem.nameAr, 256, 310)

  // pH Tag Pill
  ctx.fillStyle = isSelected ? "rgba(255,255,255,0.2)" : "rgba(15, 23, 42, 0.08)"
  ctx.beginPath()
  ctx.roundRect(176, 350, 160, 44, 22)
  ctx.fill()

  ctx.fillStyle = isSelected ? "#ffffff" : "#334155"
  ctx.font = "bold 24px 'Outfit', monospace"
  ctx.fillText(`pH: ${chem.ph}`, 256, 372)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

class SolidScene {
  private container: HTMLElement
  private cfg: Config
  private ease: (t: number) => number

  private renderer: THREE.WebGLRenderer
  private scene = new THREE.Scene()
  private camera = new THREE.PerspectiveCamera(30, 1, 0.1, 2000)
  private group = new THREE.Group()

  private faces: Face[] = []
  private edgeLines: THREE.LineSegments | null = null
  private matcapMaterial: THREE.MeshMatcapMaterial
  private solidMaterial: THREE.MeshLambertMaterial
  private wireMaterial: THREE.MeshBasicMaterial
  private edgeMaterial: THREE.LineBasicMaterial
  private faceTextures: THREE.CanvasTexture[] = []
  private ambient = new THREE.AmbientLight(0xffffff, 0.7)
  private key = new THREE.DirectionalLight(0xffffff, 1.0)

  private phase = -1
  private clock = 0

  private ax = 0.4
  private ay = 0.5
  private isDragging = false
  private lastX = 0
  private lastY = 0
  private travelled = 0

  private width = 0
  private height = 0
  private frameId = 0
  private lastT = 0
  private disposed = false
  public onFaceBurst?: () => void

  constructor(container: HTMLElement, cfg: Config) {
    this.container = container
    this.cfg = cfg
    this.ease = makeEaseFn(cfg.transition)

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    const el = this.renderer.domElement
    el.style.position = "absolute"
    el.style.inset = "0"
    el.style.width = "100%"
    el.style.height = "100%"
    el.style.cursor = "grab"
    el.style.touchAction = "none"
    container.appendChild(el)

    this.matcapMaterial = new THREE.MeshMatcapMaterial({
      color: new THREE.Color(cfg.tint || "#ffffff"),
    })
    this.solidMaterial = new THREE.MeshLambertMaterial({
      color: new THREE.Color(cfg.color || "#059669"),
      flatShading: true,
    })
    this.wireMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(cfg.color || "#059669"),
      wireframe: true,
    })
    this.edgeMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color(cfg.edgeColor || "#10b981"),
      transparent: true,
      opacity: 0.65,
    })

    this.key.position.set(0.6, 0.8, 1)
    this.camera.add(this.key)
    this.scene.add(this.ambient, this.camera, this.group)

    this.build()
    this.bindEvents()
    if (cfg.finish === "metal") this.ensureMatcap()
  }

  private ensureMatcap() {
    if (this.matcapMaterial.matcap) return
    loadMatcap().then((t) => {
      if (this.disposed || !t) return
      this.matcapMaterial.matcap = t
      this.matcapMaterial.needsUpdate = true
    })
  }

  private materialForFace(chemIdx: number) {
    if (this.cfg.finish === "wire") return this.wireMaterial
    if (this.cfg.finish === "solid") return this.solidMaterial

    const chem = CHEMICAL_FACES_DATA[chemIdx % CHEMICAL_FACES_DATA.length]
    const isSelected = this.cfg.selectedFormula === chem.formula

    if (this.cfg.showChemicalLabels) {
      const texture = createChemicalFaceTexture(chem, isSelected)
      this.faceTextures.push(texture)
      return new THREE.MeshMatcapMaterial({
        map: texture,
        matcap: this.matcapMaterial.matcap || undefined,
        color: isSelected ? new THREE.Color("#6ee7b7") : new THREE.Color(this.cfg.tint || "#ffffff"),
      })
    }

    return this.matcapMaterial
  }

  private build() {
    this.clear()
    const source = baseGeometry(this.cfg.shape).toNonIndexed()
    const pos = source.getAttribute("position") as THREE.BufferAttribute

    const q = (v: number) => (Math.abs(v) < 1e-6 ? 0 : v).toFixed(3)

    const a = new THREE.Vector3()
    const b = new THREE.Vector3()
    const c = new THREE.Vector3()
    const ab = new THREE.Vector3()
    const ac = new THREE.Vector3()
    const fn = new THREE.Vector3()

    const buckets = new Map<string, { starts: number[]; normal: THREE.Vector3 }>()
    for (let t = 0; t < pos.count; t += 3) {
      a.fromBufferAttribute(pos, t)
      b.fromBufferAttribute(pos, t + 1)
      c.fromBufferAttribute(pos, t + 2)
      ab.subVectors(b, a)
      ac.subVectors(c, a)
      fn.crossVectors(ab, ac).normalize()
      const key = `${q(fn.x)}|${q(fn.y)}|${q(fn.z)}`
      const entry = buckets.get(key)
      if (entry) entry.starts.push(t)
      else buckets.set(key, { starts: [t], normal: fn.clone() })
    }

    let faceIndex = 0
    for (const { starts, normal } of buckets.values()) {
      const verts: number[] = []
      const uvs: number[] = []
      const centroid = new THREE.Vector3()
      for (const t of starts) {
        for (let k = 0; k < 3; k++) {
          const i = t + k
          centroid.x += pos.getX(i)
          centroid.y += pos.getY(i)
          centroid.z += pos.getZ(i)
        }
      }
      centroid.divideScalar(starts.length * 3)

      // Project planar UV coordinates for pentagon/triangle face
      const up = new THREE.Vector3(0, 1, 0)
      if (Math.abs(normal.dot(up)) > 0.99) up.set(1, 0, 0)
      const uAxis = new THREE.Vector3().crossVectors(normal, up).normalize()
      const vAxis = new THREE.Vector3().crossVectors(normal, uAxis).normalize()

      for (const t of starts) {
        for (let k = 0; k < 3; k++) {
          const i = t + k
          const px = pos.getX(i) - centroid.x
          const py = pos.getY(i) - centroid.y
          const pz = pos.getZ(i) - centroid.z
          verts.push(px, py, pz)

          const pVec = new THREE.Vector3(px, py, pz)
          const u = pVec.dot(uAxis) * 1.2 + 0.5
          const v = pVec.dot(vAxis) * 1.2 + 0.5
          uvs.push(u, v)
        }
      }

      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3))
      geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2))
      geometry.computeVertexNormals()

      const material = this.materialForFace(faceIndex)
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.copy(centroid)
      mesh.userData.home = centroid.clone()
      mesh.userData.chemIndex = faceIndex

      this.faces.push({ mesh, normal: normal.clone(), chemicalIndex: faceIndex, material })
      this.group.add(mesh)
      faceIndex++
    }

    const edgeGeometry = new THREE.EdgesGeometry(source, 1)
    this.edgeLines = new THREE.LineSegments(edgeGeometry, this.edgeMaterial)
    this.edgeLines.visible = this.cfg.edges
    this.group.add(this.edgeLines)

    source.dispose()
  }

  private clear() {
    for (const f of this.faces) {
      f.mesh.removeFromParent()
      f.mesh.geometry.dispose()
      if (f.material && f.material !== this.matcapMaterial && f.material !== this.solidMaterial && f.material !== this.wireMaterial) {
        f.material.dispose()
      }
    }
    for (const t of this.faceTextures) {
      t.dispose()
    }
    this.faceTextures = []
    this.faces = []
    if (this.edgeLines) {
      this.edgeLines.removeFromParent()
      this.edgeLines.geometry.dispose()
      this.edgeLines = null
    }
  }

  public triggerBurst() {
    if (this.phase < 0) {
      this.phase = 0
      this.clock = 0
      if (this.onFaceBurst) this.onFaceBurst()
    }
  }

  private bindEvents() {
    const el = this.renderer.domElement
    const down = (e: PointerEvent) => {
      this.isDragging = true
      this.lastX = e.clientX
      this.lastY = e.clientY
      this.travelled = 0
      el.style.cursor = "grabbing"
    }
    const move = (e: PointerEvent) => {
      if (!this.isDragging) return
      const dx = e.clientX - this.lastX
      const dy = e.clientY - this.lastY
      this.lastX = e.clientX
      this.lastY = e.clientY
      this.travelled += Math.hypot(dx, dy)
      const s = clamp(this.cfg.dragSensitivity, 0, 10, 3) * 0.008
      this.ay += dx * s
      this.ax += dy * s
    }
    const up = () => {
      this.isDragging = false
      el.style.cursor = "grab"
    }
    const click = () => {
      if (this.travelled > DRAG_SLOP) return
      if (this.cfg.burst.enabled) {
        this.triggerBurst()
      }
    }
    el.addEventListener("pointerdown", down)
    window.addEventListener("pointermove", move)
    window.addEventListener("pointerup", up)
    el.addEventListener("pointerleave", up)
    el.addEventListener("click", click)
    this.unbind = () => {
      el.removeEventListener("pointerdown", down)
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerup", up)
      el.removeEventListener("pointerleave", up)
      el.removeEventListener("click", click)
    }
  }

  private unbind = () => {}

  start() {
    this.lastT = performance.now()
    const loop = () => {
      this.frameId = requestAnimationFrame(loop)
      this.step()
    }
    loop()
  }

  setSize(width: number, height: number) {
    if (this.disposed || width <= 0 || height <= 0) return
    this.width = width
    this.height = height
    this.renderer.setSize(width, height, false)
    this.updateCamera()
  }

  updateConfig(cfg: Config) {
    if (this.disposed) return
    const prev = this.cfg
    this.cfg = cfg
    this.ease = makeEaseFn(cfg.transition)
    if (cfg.finish === "metal") this.ensureMatcap()

    this.matcapMaterial.color.set(cfg.tint || "#ffffff")
    this.solidMaterial.color.set(cfg.color || "#059669")
    this.wireMaterial.color.set(cfg.color || "#059669")
    this.edgeMaterial.color.set(cfg.edgeColor || "#10b981")

    if (
      cfg.shape !== prev.shape ||
      cfg.showChemicalLabels !== prev.showChemicalLabels ||
      cfg.selectedFormula !== prev.selectedFormula ||
      cfg.finish !== prev.finish
    ) {
      this.build()
    } else {
      if (this.edgeLines) this.edgeLines.visible = cfg.edges
    }
    if (!cfg.burst.enabled) this.phase = -1
    this.updateCamera()
  }

  private updateCamera() {
    const w = Math.max(1, this.width)
    const h = Math.max(1, this.height)
    const aspect = w / h
    const distance = 1 / PERSPECTIVE
    const sizePct = clamp(this.cfg.sizePercent, 20, 200, 90)
    const reach = 1 + clamp(this.cfg.burst.distance, 0, 100, 35) / 100
    const span = reach * 2.9 * (100 / sizePct)
    const visibleHeight = aspect < 1 ? span / aspect : span

    this.camera.aspect = aspect
    this.camera.position.set(0, 0, distance)
    this.camera.lookAt(0, 0, 0)
    this.camera.fov = 2 * Math.atan(visibleHeight / 2 / distance) * (180 / Math.PI)
    this.camera.near = Math.max(0.1, distance - 20)
    this.camera.far = distance + 20
    this.camera.updateProjectionMatrix()
  }

  private step() {
    if (this.disposed) return
    const now = performance.now()
    let dt = (now - this.lastT) / 1000
    this.lastT = now
    if (!isFinite(dt) || dt < 0) dt = 0
    if (dt > 0.05) dt = 0.05

    if (!this.isDragging) {
      const rot = this.cfg.rotation
      const k = 0.06
      this.ax += clamp(rot?.x ?? 0, -12, 12, 0) * k * dt
      this.ay += clamp(rot?.y ?? 0, -12, 12, 0) * k * dt
      this.group.rotation.z += clamp(rot?.z ?? 0, -12, 12, 0) * k * dt
    }
    this.group.rotation.x = this.ax
    this.group.rotation.y = this.ay

    const duration = Math.max(0.05, this.cfg.transition?.duration ?? 0.65)
    const hold = clamp(this.cfg.transition?.delay ?? 0, 0, 10, 0.55)
    let raw = 0
    if (this.phase >= 0) {
      this.clock += dt
      if (this.clock < duration) {
        raw = this.clock / duration
      } else if (this.clock < duration + hold) {
        raw = 1
      } else if (this.clock < duration * 2 + hold) {
        raw = 1 - (this.clock - duration - hold) / duration
      } else {
        raw = 0
        this.phase = -1
      }
    }
    const eased = this.ease(Math.max(0, Math.min(1, raw)))
    const distance = (clamp(this.cfg.burst.distance, 0, 100, 35) / 100) * eased
    const twist = (clamp(this.cfg.burst.twist, 0, 90, 22) * Math.PI) / 180

    for (const f of this.faces) {
      const home = f.mesh.userData.home as THREE.Vector3
      f.mesh.position.copy(home).addScaledVector(f.normal, distance)
      f.mesh.setRotationFromAxisAngle(f.normal, twist * eased)
    }
    if (this.edgeLines) this.edgeLines.visible = this.cfg.edges

    this.renderer.render(this.scene, this.camera)
  }

  dispose() {
    this.disposed = true
    cancelAnimationFrame(this.frameId)
    this.unbind()
    this.clear()
    this.matcapMaterial.dispose()
    this.solidMaterial.dispose()
    this.wireMaterial.dispose()
    this.edgeMaterial.dispose()
    this.renderer.dispose()
    const el = this.renderer.domElement
    if (el.parentNode === this.container) this.container.removeChild(el)
  }
}

export interface MetallicDodecahedronProps {
  shape?: ShapeType
  finish?: FinishType
  tint?: string
  color?: string
  edges?: boolean
  edgeColor?: string
  burst?: { enabled: boolean; distance: number; twist: number }
  transition?: Transition
  rotation?: { x: number; y: number; z: number }
  dragSensitivity?: number
  sizePercent?: number
  showChemicalLabels?: boolean
  selectedFormula?: string | null
  style?: React.CSSProperties
  onBurst?: () => void
}

export interface MetallicDodecahedronHandle {
  burst: () => void
}

const MetallicDodecahedron = forwardRef<MetallicDodecahedronHandle, MetallicDodecahedronProps>(
  (props, ref) => {
    const {
      shape = DEFAULTS.shape,
      finish = DEFAULTS.finish,
      tint = DEFAULTS.tint,
      color = DEFAULTS.color,
      edges = DEFAULTS.edges,
      edgeColor = DEFAULTS.edgeColor,
      burst = DEFAULTS.burst,
      transition = DEFAULTS.transition,
      rotation = { x: 2, y: 5, z: 0 },
      dragSensitivity = DEFAULTS.dragSensitivity,
      sizePercent = DEFAULTS.sizePercent,
      showChemicalLabels = true,
      selectedFormula = null,
      style,
      onBurst,
    } = props

    const containerRef = useRef<HTMLDivElement | null>(null)
    const sceneRef = useRef<SolidScene | null>(null)

    useImperativeHandle(ref, () => ({
      burst: () => {
        sceneRef.current?.triggerBurst()
      },
    }))

    const cfgRef = useRef<Config>(null as any)
    cfgRef.current = {
      shape,
      finish,
      tint,
      color,
      edges,
      edgeColor,
      burst,
      transition,
      rotation,
      dragSensitivity,
      sizePercent,
      showChemicalLabels,
      selectedFormula,
    }

    useEffect(() => {
      const container = containerRef.current
      if (!container) return
      let scene: SolidScene
      try {
        scene = new SolidScene(container, cfgRef.current)
        if (onBurst) scene.onFaceBurst = onBurst
      } catch {
        return
      }
      sceneRef.current = scene
      scene.setSize(container.clientWidth, container.clientHeight)
      scene.start()

      const ro = new ResizeObserver(() => {
        scene.setSize(container.clientWidth, container.clientHeight)
      })
      ro.observe(container)
      return () => {
        ro.disconnect()
        scene.dispose()
        sceneRef.current = null
      }
    }, [])

    useEffect(() => {
      if (sceneRef.current) {
        sceneRef.current.updateConfig(cfgRef.current)
      }
    }, [
      shape,
      finish,
      tint,
      color,
      edges,
      edgeColor,
      burst?.enabled,
      burst?.distance,
      burst?.twist,
      transition,
      rotation?.x,
      rotation?.y,
      rotation?.z,
      dragSensitivity,
      sizePercent,
      showChemicalLabels,
      selectedFormula,
    ])

    return (
      <div
        ref={containerRef}
        role="img"
        aria-label="Metallic Chemical Dodecahedron 3D Model"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          minWidth: 200,
          minHeight: 200,
          overflow: "hidden",
          ...style,
        }}
      />
    )
  }
)

MetallicDodecahedron.displayName = "MetallicDodecahedron"
export default MetallicDodecahedron
