'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MatrixASCII from './MatrixASCII'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

const services = [
    { 
        id: 'logofolio', 
        name: "01 Logofolio",
        content: {
            title: "Logofolio",
            description: "Through my experience as a designer, I have created logos for academic projects, solo ventures, and businesses.",
            items: [
                { name: 'fidu', description: 'Academic project logo' },
                { name: 'Lumar Prestige', description: 'Luxury brand identity' },
                { name: 'SNOW', description: 'Winter collection brand' },
                { name: 'VIERCO', description: 'Corporate identity' },
                { name: 'HUEVOS JVC', description: 'Agricultural brand' },
                { name: 'sanfy', description: 'Modern tech brand' }
            ]
        }
    },
    { 
        id: 'visual', 
        name: "03 Visual Identity",
        content: {
            title: "Visual Identity",
            description: "Complete brand identity systems that communicate your brand's essence.",
            items: [
                { 
                    name: 'NÚA', 
                    description: "Seeking to connect more with its target audience, the brand aimed for a feminine, delicate, fresh image with a calm energy, creating an identity that flows through all brand elements, from stationery to clothing."
                },
                { 
                    name: 'SERES', 
                    description: "SERES is a wellness space located in the mountains that wanted to create a visual identity inviting its audience to experience transformation, reflection, and tranquility through colors, experiences, and concepts. A project created in collaboration with the support of Julián Uscategui."
                },
                { 
                    name: 'Geopark Canyon Chicamocha', 
                    description: "To meet UNESCO's requirements for registration as a geopark, this project was developed to capture the natural and community values of the Chicamocha Canyon in Santander, Colombia. It was a multidisciplinary effort with constant interaction with the local culture to establish a true connection with its people. Academic project in collaboration with Astrid Aillón and Ana Niño."
                }
            ]
        }
    },
    { 
        id: 'illustration', 
        name: "04 Illustration",
        content: {
            title: "Illustration",
            description: "Digital illustrations that bring ideas to life with style and creativity.",
            items: [
                { 
                    name: 'Character design "Babilio"', 
                    description: "As part of a university app proposal, the team created \"Babilio,\" a character inspired by the caiman living on campus, to build a friendly connection with users and bring life to the app's blank spaces. The project included the creation of this character and six illustrations of it performing different activities for various occasions."
                },
                { 
                    name: 'Calendar', 
                    description: "As a personal project, I created this calendar with illustrations that evoke feelings of tranquility, freshness, and friendship through friendly, memorable characters depicted in picturesque everyday scenes from each season of the year."
                }
            ]
        }
    },
    { 
        id: 'social', 
        name: "05 Social Media",
        content: {
            title: "Social Media",
            description: "Engaging social media content and campaigns that connect with your audience.",
            items: []
        }
    },
    { 
        id: 'ux', 
        name: "06 UX UI Study",
        content: {
            title: "UX UI Study",
            description: "User experience and interface design studies focused on usability and aesthetics.",
            items: []
        }
    },
]

export default function Services() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [expandedId, setExpandedId] = useState<string | null>(null)
    const canvasRefs = useRef<Map<string, HTMLDivElement>>(new Map())

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.service-item', {
                x: -50,
                opacity: 0,
                stagger: 0.1,
                duration: 1,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            })
        }, containerRef)
        return () => ctx.revert()
    }, [])

    // Three.js effect when expanded
    useEffect(() => {
        if (!expandedId) return
        const canvasRef = canvasRefs.current.get(expandedId)
        if (!canvasRef) return

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        camera.position.z = 5

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
        const width = canvasRef.offsetWidth || 800
        const height = canvasRef.offsetHeight || 400
        renderer.setSize(width, height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        canvasRef.appendChild(renderer.domElement)

        const particlesGeometry = new THREE.BufferGeometry()
        const particlesCount = 500
        const posArray = new Float32Array(particlesCount * 3)

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.015,
            color: 0x2563eb,
            transparent: true,
            opacity: 0.2,
            blending: THREE.AdditiveBlending
        })

        const particles = new THREE.Points(particlesGeometry, particlesMaterial)
        scene.add(particles)

        const animate = () => {
            requestAnimationFrame(animate)
            particles.rotation.y += 0.0005
            particles.rotation.x += 0.0003
            renderer.render(scene, camera)
        }
        animate()

        const handleResize = () => {
            if (!canvasRef) return
            const newWidth = canvasRef.offsetWidth || 800
            const newHeight = canvasRef.offsetHeight || 400
            camera.aspect = newWidth / newHeight
            camera.updateProjectionMatrix()
            renderer.setSize(newWidth, newHeight)
        }
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            if (canvasRef && renderer.domElement.parentElement) {
                canvasRef.removeChild(renderer.domElement)
            }
            particlesGeometry.dispose()
            particlesMaterial.dispose()
            renderer.dispose()
        }
    }, [expandedId])

    const toggleService = (id: string) => {
        setExpandedId(expandedId === id ? null : id)
    }

    return (
        <section ref={containerRef} className="relative z-10 min-h-screen flex flex-col justify-center py-12 sm:py-20 px-4 sm:px-8 md:px-20 bg-transparent text-blue-600">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-12 sm:mb-20 tracking-tighter">What you'll find here</h2>
            <div className="flex flex-col gap-2 sm:gap-4">
                {services.map((service, i) => {
                    const isExpanded = expandedId === service.id
                    return (
                        <div key={i} className="service-item border-b border-blue-600/20 overflow-hidden">
                            <div 
                                className="group cursor-pointer py-4 sm:py-8 flex items-center justify-between gap-4"
                                onClick={() => toggleService(service.id)}
                            >
                                <h3 className="text-xl sm:text-3xl md:text-5xl font-medium transition-all duration-300 group-hover:pl-4 sm:group-hover:pl-8 flex-1">
                                    {service.name}
                                </h3>
                                <motion.div
                                    animate={{ rotate: isExpanded ? 90 : 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="text-blue-600/40 text-xl sm:text-2xl font-light flex-shrink-0"
                                >
                                    +
                                </motion.div>
                            </div>
                            
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4 }}
                                        className="relative overflow-hidden"
                                    >
                                        <div className="relative pb-12 pt-8">
                                            {/* Three.js Background - subtle effect */}
                                            <div 
                                                ref={(el) => {
                                                    if (el) canvasRefs.current.set(service.id, el)
                                                    else canvasRefs.current.delete(service.id)
                                                }}
                                                className="absolute inset-0 opacity-5 pointer-events-none"
                                            />
                                            
                                            {/* Matrix ASCII Effect - very subtle */}
                                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                                                <MatrixASCII />
                                            </div>

                                            {/* Content */}
                                            <div className="relative z-10">
                                                <p className="text-base sm:text-lg md:text-xl leading-relaxed text-neutral-800 mb-8 sm:mb-12 max-w-3xl">
                                                    {service.content.description}
                                                </p>

                                                {service.content.items.length > 0 && (
                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                                                        {service.content.items.map((item, idx) => (
                                                            <motion.div
                                                                key={idx}
                                                                initial={{ opacity: 0, y: 20 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ delay: idx * 0.1 }}
                                                                className="border-b border-blue-600/20 pb-4 sm:pb-6"
                                                            >
                                                                <h5 className="text-xl sm:text-2xl md:text-3xl font-medium text-blue-600 mb-2 tracking-tighter">{item.name}</h5>
                                                                <p className="text-sm sm:text-base md:text-lg text-neutral-600 leading-relaxed">{item.description}</p>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
