'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
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
                { name: 'fidu', description: 'Academic project logo', image: '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/LOGOFOLIO/Frame 71.png' },
                { name: 'Lumar Prestige', description: 'Luxury brand identity', image: '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/LOGOFOLIO/Frame 72.png' },
                { name: 'SNOW', description: 'Winter collection brand', image: '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/LOGOFOLIO/Frame 73.png' },
                { name: 'VIERCO', description: 'Corporate identity', image: '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/LOGOFOLIO/Frame 74.png' },
                { name: 'HUEVOS JVC', description: 'Agricultural brand', image: '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/LOGOFOLIO/Frame 75.png' },
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
                    description: "Seeking to connect more with its target audience, the brand aimed for a feminine, delicate, fresh image with a calm energy, creating an identity that flows through all brand elements, from stationery to clothing.",
                    images: [
                        '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/IDENTIDAD VISUAL/NÚA ELEGIDAS/Manual de Marca NÚA_compressed_page-0001.jpg',
                        '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/IDENTIDAD VISUAL/NÚA ELEGIDAS/Manual de Marca NÚA_compressed_page-0004.jpg',
                        '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/IDENTIDAD VISUAL/NÚA ELEGIDAS/Manual de Marca NÚA_compressed_page-0007.jpg',
                        '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/IDENTIDAD VISUAL/NÚA ELEGIDAS/Manual de Marca NÚA_compressed_page-0008.jpg',
                        '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/IDENTIDAD VISUAL/NÚA ELEGIDAS/Manual de Marca NÚA_compressed_page-0010.jpg',
                        '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/IDENTIDAD VISUAL/NÚA ELEGIDAS/Manual de Marca NÚA_compressed_page-0011.jpg',
                        '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/IDENTIDAD VISUAL/NÚA ELEGIDAS/Manual de Marca NÚA_compressed_page-0016.jpg',
                        '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/IDENTIDAD VISUAL/NÚA ELEGIDAS/Manual de Marca NÚA_compressed_page-0017.jpg',
                        '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/IDENTIDAD VISUAL/NÚA ELEGIDAS/Manual de Marca NÚA_compressed_page-0018.jpg',
                        '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/IDENTIDAD VISUAL/NÚA ELEGIDAS/Manual de Marca NÚA_compressed_page-0023.jpg',
                        '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/IDENTIDAD VISUAL/NÚA ELEGIDAS/Manual de Marca NÚA_compressed_page-0024.jpg',
                        '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/IDENTIDAD VISUAL/NÚA ELEGIDAS/Manual de Marca NÚA_compressed_page-0026.jpg',
                        '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/IDENTIDAD VISUAL/NÚA ELEGIDAS/Manual de Marca NÚA_compressed_page-0027.jpg',
                        '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/IDENTIDAD VISUAL/NÚA ELEGIDAS/Manual de Marca NÚA_compressed_page-0029.jpg',
                        '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/IDENTIDAD VISUAL/NÚA ELEGIDAS/Manual de Marca NÚA_compressed_page-0033.jpg'
                    ]
                },
                { 
                    name: 'SERES', 
                    description: "SERES is a wellness space located in the mountains that wanted to create a visual identity inviting its audience to experience transformation, reflection, and tranquility through colors, experiences, and concepts. A project created in collaboration with the support of Julián Uscategui.",
                    images: [
                        '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/IDENTIDAD VISUAL/SERES ELEGIDAS/MANUAL SERES_compressed_page-0001.jpg',
                        '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/IDENTIDAD VISUAL/SERES ELEGIDAS/MANUAL SERES_compressed_page-0004.jpg',
                        '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/IDENTIDAD VISUAL/SERES ELEGIDAS/MANUAL SERES_compressed_page-0008.jpg',
                        '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/IDENTIDAD VISUAL/SERES ELEGIDAS/MANUAL SERES_compressed_page-0010.jpg',
                        '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/IDENTIDAD VISUAL/SERES ELEGIDAS/MANUAL SERES_compressed_page-0012.jpg',
                        '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/IDENTIDAD VISUAL/SERES ELEGIDAS/MANUAL SERES_compressed_page-0018.jpg',
                        '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/IDENTIDAD VISUAL/SERES ELEGIDAS/MANUAL SERES_compressed_page-0019.jpg',
                        '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/IDENTIDAD VISUAL/SERES ELEGIDAS/MANUAL SERES_compressed_page-0024.jpg',
                        '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/IDENTIDAD VISUAL/SERES ELEGIDAS/MANUAL SERES_compressed_page-0026.jpg',
                        '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/IDENTIDAD VISUAL/SERES ELEGIDAS/MANUAL SERES_compressed_page-0033.jpg',
                        '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/IDENTIDAD VISUAL/SERES ELEGIDAS/MANUAL SERES_compressed_page-0035.jpg',
                        '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/IDENTIDAD VISUAL/SERES ELEGIDAS/MANUAL SERES_compressed_page-0036.jpg',
                        '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/IDENTIDAD VISUAL/SERES ELEGIDAS/MANUAL SERES_compressed_page-0038.jpg'
                    ]
                },
                { 
                    name: 'Geopark Canyon Chicamocha', 
                    description: "To meet UNESCO's requirements for registration as a geopark, this project was developed to capture the natural and community values of the Chicamocha Canyon in Santander, Colombia. It was a multidisciplinary effort with constant interaction with the local culture to establish a true connection with its people. Academic project in collaboration with Astrid Aillón and Ana Niño.",
                    images: [
                        '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/IDENTIDAD VISUAL/GEOPARQUE/1.png',
                        '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/IDENTIDAD VISUAL/GEOPARQUE/2.png',
                        '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/IDENTIDAD VISUAL/GEOPARQUE/3.png',
                        '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/IDENTIDAD VISUAL/GEOPARQUE/4.png',
                        '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/IDENTIDAD VISUAL/GEOPARQUE/5.png',
                        '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/IDENTIDAD VISUAL/GEOPARQUE/6.png',
                        '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/IDENTIDAD VISUAL/GEOPARQUE/7.png'
                    ]
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
                    description: "As part of a university app proposal, the team created \"Babilio,\" a character inspired by the caiman living on campus, to build a friendly connection with users and bring life to the app's blank spaces. The project included the creation of this character and six illustrations of it performing different activities for various occasions.",
                    images: [
                        '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/ILUSTRACION/Babilio/177871161.png',
                        '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/ILUSTRACION/Babilio/Frame 77.png'
                    ]
                },
                { 
                    name: 'Calendar', 
                    description: "As a personal project, I created this calendar with illustrations that evoke feelings of tranquility, freshness, and friendship through friendly, memorable characters depicted in picturesque everyday scenes from each season of the year.",
                    images: [
                        '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/ILUSTRACION/Calendario/177871160.png',
                        '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/ILUSTRACION/Calendario/Frame 76.png'
                    ]
                },
                { 
                    name: 'Personal digital artwork', 
                    description: "A collection of personal digital illustrations showcasing various styles and subjects, from fantasy landscapes to whimsical character designs and portraits.",
                    images: [
                        '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/ILUSTRACION/Otro/177871162.png',
                        '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/ILUSTRACION/Otro/177871163.png'
                    ]
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
            items: [
                {
                    name: 'Social Media Content',
                    description: "A collection of engaging social media content and campaigns designed to connect with audiences.",
                    images: [
                        '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/REDES SOCIALES/177871164.png',
                        '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/REDES SOCIALES/177871165.png',
                        '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/REDES SOCIALES/177871166.png'
                    ]
                }
            ]
        }
    },
    { 
        id: 'ux', 
        name: "06 UX UI Study",
        content: {
            title: "UX UI Study",
            description: "User experience and interface design studies focused on usability and aesthetics.",
            items: [
                {
                    name: 'Website',
                    description: "An end-to-end web design and development project, from the initial planning stage to final implementation. The focus was on creating a user interface that centralizes all information about the 'Geopark Canyon Chicamocha' project, making it engaging for those interested in learning about and exploring the site.",
                    images: [
                        '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/UX UI/177871168.png',
                        '/PORTAFOLIO PAGINA WEB/PORTAFOLIO PAGINA WEB/UX UI/177871167.png'
                    ]
                }
            ]
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
                                                    service.id === 'logofolio' ? (
                                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                                                            {service.content.items.map((item, idx) => (
                                                                'image' in item && item.image && (
                                                                    <motion.div
                                                                        key={idx}
                                                                        initial={{ opacity: 0, scale: 0.95 }}
                                                                        animate={{ opacity: 1, scale: 1 }}
                                                                        transition={{ delay: idx * 0.05 }}
                                                                        className="aspect-square flex items-center justify-center bg-white/5 rounded-lg p-3 sm:p-4"
                                                                    >
                                                                        <Image 
                                                                            src={item.image} 
                                                                            alt={item.name}
                                                                            width={400}
                                                                            height={400}
                                                                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                                                            className="w-full h-full object-contain"
                                                                            loading="lazy"
                                                                            quality={85}
                                                                        />
                                                                    </motion.div>
                                                                )
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <div className="space-y-12 sm:space-y-16">
                                                            {service.content.items.map((item, idx) => (
                                                                <motion.div
                                                                    key={idx}
                                                                    initial={{ opacity: 0, y: 20 }}
                                                                    animate={{ opacity: 1, y: 0 }}
                                                                    transition={{ delay: idx * 0.1 }}
                                                                    className="border-b border-blue-600/20 pb-8 sm:pb-12"
                                                                >
                                                                    {'image' in item && item.image && (
                                                                        <div className="w-full aspect-square flex items-center justify-center bg-white/5 rounded-lg p-4 sm:p-6">
                                                                            <Image 
                                                                                src={item.image} 
                                                                                alt={item.name}
                                                                                width={800}
                                                                                height={800}
                                                                                sizes="(max-width: 768px) 100vw, 50vw"
                                                                                className="w-full h-full object-contain max-h-full"
                                                                                loading="lazy"
                                                                                quality={85}
                                                                            />
                                                                        </div>
                                                                    )}
                                                                {'images' in item && item.images && item.images.length > 0 && (
                                                                    <div>
                                                                        {(item.name === 'Calendar' || item.name === 'Character design "Babilio"') ? (
                                                                            <>
                                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
                                                                                    <div>
                                                                                        <h5 className="text-xl sm:text-2xl md:text-3xl font-medium text-blue-600 mb-4 sm:mb-6 tracking-tighter">{item.name}</h5>
                                                                                        <p className="text-sm sm:text-base md:text-lg text-neutral-600 leading-relaxed">{item.description}</p>
                                                                                    </div>
                                                                                    {item.images.length > 1 && (
                                                                                        <motion.div
                                                                                            initial={{ opacity: 0, scale: 0.95 }}
                                                                                            animate={{ opacity: 1, scale: 1 }}
                                                                                            transition={{ delay: idx * 0.1 + 0.05 }}
                                                                                            className="w-full"
                                                                                        >
                                                                                            <Image 
                                                                                                src={item.images[1]} 
                                                                                                alt={`${item.name} - 2`}
                                                                                                width={1200}
                                                                                                height={800}
                                                                                                sizes="(max-width: 768px) 100vw, 50vw"
                                                                                                className="w-full h-auto object-contain rounded-lg"
                                                                                                loading="lazy"
                                                                                                quality={85}
                                                            />
                                                                                        </motion.div>
                                                                                    )}
                                                                                </div>
                                                                                {item.images.length > 0 && (
                                                                                    <motion.div
                                                                                        initial={{ opacity: 0, scale: 0.95 }}
                                                                                        animate={{ opacity: 1, scale: 1 }}
                                                                                        transition={{ delay: idx * 0.1 + 0.1 }}
                                                                                        className="w-full"
                                                                                    >
                                                                                        <Image 
                                                                                            src={item.images[0]} 
                                                                                            alt={`${item.name} - 1`}
                                                                                            width={1200}
                                                                                            height={800}
                                                                                            sizes="100vw"
                                                                                            className="w-full h-auto object-contain rounded-lg"
                                                                                            loading="lazy"
                                                                                            quality={85}
                                                                                        />
                                                                                    </motion.div>
                                                                                )}
                                                                            </>
                                                                        ) : item.name === 'Website' ? (
                                                                            <>
                                                                                <div className="space-y-2 sm:space-y-4">
                                                                                    {item.images.map((img: string, imgIdx: number) => (
                                                                                        <motion.div
                                                                                            key={imgIdx}
                                                                                            initial={{ opacity: 0, scale: 0.95 }}
                                                                                            animate={{ opacity: 1, scale: 1 }}
                                                                                            transition={{ delay: idx * 0.1 + imgIdx * 0.1 }}
                                                                                            className="w-full"
                                                                                        >
                                                                                            <Image 
                                                                                                src={img} 
                                                                                                alt={`${item.name} - ${imgIdx + 1}`}
                                                                                                width={1920}
                                                                                                height={1080}
                                                                                                sizes="100vw"
                                                                                                className="w-full h-auto object-contain rounded-lg"
                                                                                                loading="lazy"
                                                                                                quality={85}
                                                                                            />
                                                                                        </motion.div>
                                                                                    ))}
                                                                                </div>
                                                                            </>
                                                                        ) : (item.name === 'Personal digital artwork' || item.name === 'Social Media Content') ? (
                                                                            <>
                                                                                <h5 className="text-xl sm:text-2xl md:text-3xl font-medium text-blue-600 mb-4 sm:mb-6 tracking-tighter">{item.name}</h5>
                                                                                <p className="text-sm sm:text-base md:text-lg text-neutral-600 leading-relaxed mb-6 sm:mb-8">{item.description}</p>
                                                                                <div className="space-y-2 sm:space-y-4">
                                                                                    {item.images.map((img: string, imgIdx: number) => (
                                                                                        <motion.div
                                                                                            key={imgIdx}
                                                                                            initial={{ opacity: 0, scale: 0.95 }}
                                                                                            animate={{ opacity: 1, scale: 1 }}
                                                                                            transition={{ delay: idx * 0.1 + imgIdx * 0.1 }}
                                                                                            className="w-full"
                                                                                        >
                                                                                            <Image 
                                                                                                src={img} 
                                                                                                alt={`${item.name} - ${imgIdx + 1}`}
                                                                                                width={1920}
                                                                                                height={1080}
                                                                                                sizes="100vw"
                                                                                                className="w-full h-auto object-contain rounded-lg"
                                                                                                loading="lazy"
                                                                                                quality={85}
                                                                                            />
                                                                                        </motion.div>
                                                                                    ))}
                                                                                </div>
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <h5 className="text-xl sm:text-2xl md:text-3xl font-medium text-blue-600 mb-6 sm:mb-8 tracking-tighter">{item.name}</h5>
                                                                                <p className="text-sm sm:text-base md:text-lg text-neutral-600 leading-relaxed mb-6 sm:mb-8">{item.description}</p>
                                                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                                                                    {item.images.map((img: string, imgIdx: number) => (
                                                                                        <motion.div
                                                                                            key={imgIdx}
                                                                                            initial={{ opacity: 0, scale: 0.95 }}
                                                                                            animate={{ opacity: 1, scale: 1 }}
                                                                                            transition={{ delay: idx * 0.1 + imgIdx * 0.05 }}
                                                                                            className="w-full"
                                                                                        >
                                                                                            <Image 
                                                                                                src={img} 
                                                                                                alt={`${item.name} - ${imgIdx + 1}`}
                                                                                                width={1920}
                                                                                                height={1080}
                                                                                                sizes="100vw"
                                                                                                className="w-full h-auto object-contain rounded-lg"
                                                                                                loading="lazy"
                                                                                                quality={85}
                                                                                            />
                                                                                        </motion.div>
                                                                                    ))}
                                                                                </div>
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                    )
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
