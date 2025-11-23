'use client'

import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import { Suspense, useRef, useMemo } from 'react'
import { DitherMaterial } from './DitherMaterial'
import * as THREE from 'three'

extend({ DitherMaterial })

function DitherPlane() {
    const materialRef = useRef<THREE.ShaderMaterial>(null)
    const { size, viewport } = useThree()

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime()
            materialRef.current.uniforms.uResolution.value.set(size.width, size.height)
            // Map mouse to 0-1 range
            materialRef.current.uniforms.uMouse.value.set(
                (state.pointer.x + 1) / 2,
                (state.pointer.y + 1) / 2
            )
        }
    })

    return (
        <mesh scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1]} />
            <ditherMaterial ref={materialRef} transparent />
        </mesh>
    )
}

export default function Scene() {
    return (
        <div className="fixed inset-0 -z-10">
            <Canvas
                camera={{ position: [0, 0, 1] }}
                gl={{ antialias: false }} // Dither handles AA style
                dpr={[1, 2]}
            >
                <Suspense fallback={null}>
                    <DitherPlane />
                </Suspense>
            </Canvas>
        </div>
    )
}
