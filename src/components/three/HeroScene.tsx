import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  ContactShadows,
  Environment,
  Float,
  Lightformer,
  MeshTransmissionMaterial,
  PerformanceMonitor,
  Sparkles,
} from '@react-three/drei'
import * as THREE from 'three'

type Props = { mobile: boolean; reduced: boolean; active: boolean }

const VIOLET = '#8B7CFF'
const MINT = '#35D6C2'

export default function HeroScene({ mobile, reduced, active }: Props) {
  // adaptive resolution: PerformanceMonitor drops DPR when frames fall
  const [dpr, setDpr] = useState(mobile ? 1.25 : 1.6)
  const animate = active && !reduced

  return (
    <Canvas
      dpr={[1, dpr]}
      frameloop={animate ? 'always' : 'demand'}
      camera={{ position: [0, 0, mobile ? 8.6 : 9], fov: 35 }}
      gl={{ antialias: !mobile, alpha: true, powerPreference: 'high-performance' }}
      eventSource={document.getElementById('root')!}
      eventPrefix="client"
      aria-hidden
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(mobile ? 1.5 : 1.75)} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 5, 4]} intensity={1.2} />

      <Rig reduced={reduced}>
        <Float speed={reduced ? 0 : 1.1} rotationIntensity={0.25} floatIntensity={0.6} floatingRange={[-0.08, 0.08]}>
          <GlassCore mobile={mobile} />
          <Rings reduced={reduced} mobile={mobile} />
        </Float>
        <Shards reduced={reduced} count={mobile ? 4 : 8} />
      </Rig>

      <PointerLight reduced={reduced} />

      {!mobile && !reduced && (
        <Sparkles count={36} scale={[9, 6, 4]} size={1.8} speed={0.2} opacity={0.55} color={VIOLET} />
      )}

      {!mobile && (
        <ContactShadows
          position={[0, -2.35, 0]}
          opacity={0.55}
          scale={9}
          blur={2.8}
          far={4}
          resolution={256}
          frames={reduced ? 1 : Infinity}
          color="#05070d"
        />
      )}

      {/* local studio lighting: no HDR download, so it works on slow connections */}
      <Environment resolution={mobile ? 64 : 256} frames={1}>
        <Lightformer form="rect" intensity={4} color={VIOLET} position={[-5, 1.5, -1]} scale={[3, 8, 1]} />
        <Lightformer form="rect" intensity={3} color={MINT} position={[5, -1, -1]} scale={[2.5, 6, 1]} />
        <Lightformer form="ring" intensity={5} color="#F4F5FA" position={[0, 5, -5]} scale={2.5} />
        <Lightformer form="rect" intensity={1.2} color="#F4F5FA" position={[0, 0, 9]} scale={[12, 1.5, 1]} />
        <Lightformer form="rect" intensity={1.5} color="#3b4cff" position={[0, -5, 2]} scale={[10, 2, 1]} />
      </Environment>
    </Canvas>
  )
}

/** Eases the whole composition toward the cursor: parallax + controlled 3D rotation. */
function Rig({ children, reduced }: { children: React.ReactNode; reduced: boolean }) {
  const ref = useRef<THREE.Group>(null)
  useFrame((state, dt) => {
    if (!ref.current || reduced) return
    const { x, y } = state.pointer
    const k = 1 - Math.exp(-dt * 2.2) // frame-rate independent damping
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, x * 0.35, k)
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -y * 0.22, k)
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, x * 0.18, k)
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, y * 0.12, k)
  })
  return <group ref={ref}>{children}</group>
}

function GlassCore({ mobile }: { mobile: boolean }) {
  const inner = useRef<THREE.Mesh>(null)
  useFrame((_, dt) => {
    if (!inner.current) return
    inner.current.rotation.x += dt * 0.12
    inner.current.rotation.y += dt * 0.18
  })
  return (
    <group>
      <mesh>
        <sphereGeometry args={[1.25, mobile ? 48 : 96, mobile ? 48 : 96]} />
        {mobile ? (
          <meshPhysicalMaterial
            transmission={1}
            thickness={1.2}
            roughness={0.05}
            ior={1.4}
            iridescence={0.6}
            iridescenceIOR={1.3}
            color="#e9e6ff"
            transparent
          />
        ) : (
          <MeshTransmissionMaterial
            samples={6}
            resolution={512}
            thickness={1.1}
            roughness={0.04}
            ior={1.35}
            chromaticAberration={0.35}
            anisotropicBlur={0.15}
            distortion={0.25}
            distortionScale={0.4}
            temporalDistortion={0.08}
            iridescence={0.7}
            iridescenceIOR={1.3}
            color="#efedff"
            backside
            backsideThickness={0.4}
          />
        )}
      </mesh>
      {/* the "lab specimen" floating inside the glass */}
      <mesh ref={inner} scale={0.55}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color={VIOLET} emissive={VIOLET} emissiveIntensity={0.9} metalness={0.4} roughness={0.25} flatShading />
      </mesh>
      <mesh scale={0.72}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color={MINT} wireframe transparent opacity={0.35} />
      </mesh>
    </group>
  )
}

const ringSpecs = [
  { r: 1.85, tube: 0.035, tilt: [1.2, 0.2, 0], speed: 0.22, color: '#d9dce8', rough: 0.12 },
  { r: 2.2, tube: 0.018, tilt: [1.55, -0.5, 0.3], speed: -0.15, color: VIOLET, rough: 0.2 },
  { r: 2.55, tube: 0.012, tilt: [0.5, 0.9, 0.2], speed: 0.1, color: MINT, rough: 0.25 },
] as const

function Rings({ reduced, mobile }: { reduced: boolean; mobile: boolean }) {
  const refs = useRef<(THREE.Mesh | null)[]>([])
  useFrame((_, dt) => {
    if (reduced) return
    refs.current.forEach((m, i) => m && (m.rotation.z += dt * ringSpecs[i].speed))
  })
  return (
    <>
      {ringSpecs.map((s, i) => (
        <mesh key={i} ref={(m) => void (refs.current[i] = m)} rotation={s.tilt as unknown as THREE.Euler}>
          <torusGeometry args={[s.r, s.tube, 16, mobile ? 96 : 180]} />
          <meshStandardMaterial color={s.color} metalness={1} roughness={s.rough} envMapIntensity={1.4} />
        </mesh>
      ))}
      {/* orbiting node on the chrome ring */}
      <OrbitNode radius={1.85} reduced={reduced} />
    </>
  )
}

function OrbitNode({ radius, reduced }: { radius: number; reduced: boolean }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = reduced ? 0.6 : clock.elapsedTime * 0.5
    ref.current.position.set(Math.cos(t) * radius, Math.sin(t) * radius * 0.36, Math.sin(t) * radius * 0.93)
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.07, 16, 16]} />
      <meshStandardMaterial color={MINT} emissive={MINT} emissiveIntensity={2} />
    </mesh>
  )
}

const shardPositions: [number, number, number][] = [
  // kept inside |x| < 2.4 so nothing is sliced by the canvas edge
  [-2.2, 1.5, -0.6],
  [2.2, -1.5, 0.4],
  [-1.9, -1.8, 0.6],
  [2.1, 1.7, -1],
  [-2.4, 0.1, -1.6],
  [2.4, 0.3, -1.8],
  [0.6, 2.3, -1.4],
  [-0.6, -2.3, -0.8],
]

function Shards({ reduced, count }: { reduced: boolean; count: number }) {
  return (
    <>
      {shardPositions.slice(0, count).map((p, i) => (
        <Float key={i} speed={reduced ? 0 : 1 + (i % 3) * 0.4} rotationIntensity={1.4} floatIntensity={1.2}>
          <mesh position={p} scale={0.16 + (i % 3) * 0.06} rotation={[i, i * 0.6, 0]}>
            {i % 3 === 0 ? (
              <octahedronGeometry args={[1, 0]} />
            ) : i % 3 === 1 ? (
              <tetrahedronGeometry args={[1, 0]} />
            ) : (
              <boxGeometry args={[1, 1, 1]} />
            )}
            <meshStandardMaterial
              color={i % 4 === 0 ? VIOLET : '#e6e8f2'}
              metalness={1}
              roughness={0.15}
              envMapIntensity={1.5}
            />
          </mesh>
        </Float>
      ))}
    </>
  )
}

/** Violet key light that drifts with the cursor and brightens a touch while it moves. */
function PointerLight({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.PointLight>(null)
  const last = useRef(new THREE.Vector2())
  useFrame((state, dt) => {
    const l = ref.current
    if (!l || reduced) return
    const { x, y } = state.pointer
    const speed = last.current.distanceTo(state.pointer) / Math.max(dt, 0.001)
    last.current.copy(state.pointer)
    const k = 1 - Math.exp(-dt * 3)
    l.position.x = THREE.MathUtils.lerp(l.position.x, x * 4, k)
    l.position.y = THREE.MathUtils.lerp(l.position.y, y * 3, k)
    l.intensity = THREE.MathUtils.lerp(l.intensity, 14 + Math.min(speed, 4) * 5, k)
  })
  return <pointLight ref={ref} position={[2, 2, 3]} intensity={14} distance={12} color={VIOLET} />
}
