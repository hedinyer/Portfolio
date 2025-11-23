'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function AnimatedBackground() {
    const containerRef = useRef<HTMLDivElement>(null)
    const sceneRef = useRef<THREE.Scene | null>(null)
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
    const particlesRef = useRef<THREE.Points | null>(null)

    useEffect(() => {
        if (!containerRef.current) return

        // Scene setup
        const scene = new THREE.Scene()
        sceneRef.current = scene

        // Camera setup
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        )
        camera.position.z = 5
        cameraRef.current = camera

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        containerRef.current.appendChild(renderer.domElement)
        rendererRef.current = renderer

        // Create particles
        const particlesGeometry = new THREE.BufferGeometry()
        const particlesCount = 1500
        const posArray = new Float32Array(particlesCount * 3)

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

        // Material with blue color
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.015,
            color: 0x2563eb, // Blue color
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        })

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
        scene.add(particlesMesh)
        particlesRef.current = particlesMesh

        // Animation
        let animationFrameId: number
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate)

            // Rotate particles slowly
            if (particlesRef.current) {
                particlesRef.current.rotation.y += 0.0005
                particlesRef.current.rotation.x += 0.0002
            }

            renderer.render(scene, camera)
        }
        animate()

        // Handle resize
        const handleResize = () => {
            if (!cameraRef.current || !rendererRef.current) return

            cameraRef.current.aspect = window.innerWidth / window.innerHeight
            cameraRef.current.updateProjectionMatrix()
            rendererRef.current.setSize(window.innerWidth, window.innerHeight)
        }
        window.addEventListener('resize', handleResize)

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize)
            cancelAnimationFrame(animationFrameId)

            if (containerRef.current && rendererRef.current) {
                containerRef.current.removeChild(rendererRef.current.domElement)
            }

            particlesGeometry.dispose()
            particlesMaterial.dispose()
            rendererRef.current?.dispose()
        }
    }, [])

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 w-full h-full -z-10"
            style={{
                pointerEvents: 'none',
                opacity: 0.15
            }}
        />
    )
}
