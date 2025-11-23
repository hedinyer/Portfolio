'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const experiences = [
    {
        company: "Olfi Studio",
        role: "Graphic Designer",
        period: "April 2025 - present"
    },
    {
        company: "Universidad Industrial de Santander",
        role: "Industrial designer",
        period: "February 2025"
    },
    {
        company: "AMV SAS",
        role: "Graphic Designer",
        period: "April 2024 - November 2024"
    },
    {
        company: "Universidad Industrial de Santander",
        role: "Industrial designer",
        period: "August 2024 - October 2024"
    },
    {
        company: "Screaming Color",
        role: "Industrial Designer",
        period: "December 2023 - March 2024"
    },
    {
        company: "Universidad Industrial de Santander",
        role: "Design assitant",
        period: "April 2022 - July 2023"
    }
]

export default function Experience() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], [100, -100])

    return (
        <section ref={containerRef} className="relative z-10 min-h-screen flex flex-col justify-center py-20 px-8 md:px-20 bg-[#f5f5f0] text-blue-600">
            <motion.h2
                style={{ y }}
                className="text-5xl md:text-7xl font-bold mb-20 tracking-tighter"
            >
                Where I've worked
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12">
                {experiences.map((exp, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex flex-col gap-2"
                    >
                        <h3 className="text-xl md:text-2xl font-medium text-black">
                            {exp.company} - {exp.role}
                        </h3>
                        <p className="text-lg text-neutral-500">
                            {exp.period}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
