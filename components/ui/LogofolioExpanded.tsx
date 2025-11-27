'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'
import MatrixASCII from './MatrixASCII'

const logos = [
    {
        name: 'fidu',
        description: 'Academic project logo',
        image: '/logos/fidu.png' // You'll need to add these images
    },
    {
        name: 'Lumar Prestige',
        description: 'Luxury brand identity',
        image: '/logos/lumar.png'
    },
    {
        name: 'SNOW',
        description: 'Winter collection brand',
        image: '/logos/snow.png'
    },
    {
        name: 'VIERCO',
        description: 'Corporate identity',
        image: '/logos/vierco.png'
    },
    {
        name: 'HUEVOS JVC',
        description: 'Agricultural brand',
        image: '/logos/huevos.png'
    },
    {
        name: 'sanfy',
        description: 'Modern tech brand',
        image: '/logos/sanfy.png'
    }
]

type LogofolioExpandedProps = {
    isOpen: boolean
    onClose: () => void
}

export default function LogofolioExpanded({ isOpen, onClose }: LogofolioExpandedProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const sceneRef = useRef<THREE.Scene | null>(null)
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
    const particlesRef = useRef<THREE.Points | null>(null)
    const [showContent, setShowContent] = useState(false)

    useEffect(() => {
        if (!isOpen || !containerRef.current) return

        // Three.js scene setup
        const scene = new THREE.Scene()
        sceneRef.current = scene

        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        )
        camera.position.z = 5
        cameraRef.current = camera

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        
        const canvasContainer = document.createElement('div')
        canvasContainer.style.position = 'absolute'
        canvasContainer.style.top = '0'
        canvasContainer.style.left = '0'
        canvasContainer.style.width = '100%'
        canvasContainer.style.height = '100%'
        canvasContainer.style.pointerEvents = 'none'
        canvasContainer.style.zIndex = '1'
        canvasContainer.appendChild(renderer.domElement)
        containerRef.current.appendChild(canvasContainer)
        rendererRef.current = renderer

        // Create particle system
        const particlesGeometry = new THREE.BufferGeometry()
        const particlesCount = 2000
        const posArray = new Float32Array(particlesCount * 3)

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 20
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            color: 0x2563eb, // Blue
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        })

        const particles = new THREE.Points(particlesGeometry, particlesMaterial)
        scene.add(particles)
        particlesRef.current = particles

        // Animation
        let animationFrameId: number
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate)

            if (particlesRef.current) {
                particlesRef.current.rotation.y += 0.001
                particlesRef.current.rotation.x += 0.0005
            }

            renderer.render(scene, camera)
        }
        animate()

        // Show content after a brief delay for Matrix effect
        setTimeout(() => setShowContent(true), 500)

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
            if (canvasContainer.parentElement) {
                canvasContainer.parentElement.removeChild(canvasContainer)
            }
            particlesGeometry.dispose()
            particlesMaterial.dispose()
            renderer.dispose()
            setShowContent(false)
        }
    }, [isOpen])

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
                    ref={containerRef}
                >
                    {/* Matrix ASCII Effect */}
                    <MatrixASCII />

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 z-50 text-blue-400 hover:text-blue-300 text-4xl font-bold transition-colors"
                    >
                        ×
                    </button>

                    {/* Content */}
                    <AnimatePresence>
                        {showContent && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                className="relative z-10 min-h-screen flex flex-col justify-center py-20 px-8 md:px-20 overflow-y-auto"
                            >
                                <div className="max-w-7xl mx-auto w-full">
                                    <motion.h2
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-5xl md:text-7xl font-bold mb-4 text-blue-400 tracking-tighter"
                                    >
                                        Logofolio
                                    </motion.h2>
                                    <motion.p
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-xl text-blue-300 mb-16 max-w-2xl"
                                    >
                                        Through my experience as a designer, I have created logos for academic projects, solo ventures, and businesses.
                                    </motion.p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {logos.map((logo, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.4 + i * 0.1 }}
                                                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30 hover:border-blue-400/50 transition-all group"
                                            >
                                                <div className="aspect-square bg-white rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                                                    <div className="text-4xl font-bold text-blue-600 group-hover:scale-110 transition-transform">
                                                        {logo.name}
                                                    </div>
                                                </div>
                                                <h3 className="text-xl font-bold text-blue-300 mb-2">{logo.name}</h3>
                                                <p className="text-blue-400/80 text-sm">{logo.description}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    )
}




