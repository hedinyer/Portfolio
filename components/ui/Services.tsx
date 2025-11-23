'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
    "01 Logofolio",
    "03 Visual Identity",
    "04 Illustration",
    "05 Social Media",
    "06 UX UI Study",
]

export default function Services() {
    const containerRef = useRef<HTMLDivElement>(null)

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

    return (
        <section ref={containerRef} className="relative z-10 min-h-screen flex flex-col justify-center py-20 px-8 md:px-20 bg-[#f5f5f0] text-blue-600">
            <h2 className="text-5xl md:text-7xl font-bold mb-20 tracking-tighter">What you'll find here</h2>
            <div className="flex flex-col gap-4">
                {services.map((service, i) => (
                    <div key={i} className="service-item group cursor-pointer border-b border-blue-600/20 py-8">
                        <h3 className="text-3xl md:text-5xl font-medium transition-all duration-300 group-hover:pl-8">
                            {service}
                        </h3>
                    </div>
                ))}
            </div>
        </section>
    )
}
