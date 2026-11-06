'use client'
import { useRef, useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

const getExperiences = (t: any) => [
    {
        company: "Olfi Studio",
        role: t.experience.roles.graphicDesigner,
        period: t.experience.periods.olfi
    },
    {
        company: "Universidad Industrial de Santander",
        role: t.experience.roles.industrialDesigner,
        period: t.experience.periods.uisDegree
    },
    {
        company: "AMV SAS",
        role: t.experience.roles.graphicDesigner,
        period: t.experience.periods.amv
    },
    {
        company: "Universidad Industrial de Santander",
        role: t.experience.roles.industrialDesigner,
        period: t.experience.periods.uisProject
    },
    {
        company: "Screaming Color",
        role: t.experience.roles.industrialDesigner,
        period: t.experience.periods.screaming
    },
    {
        company: "Universidad Industrial de Santander",
        role: t.experience.roles.designAssistant,
        period: t.experience.periods.uisAssistant
    }
]

export default function Experience() {
    const { t } = useLanguage()
    const experiences = useMemo(() => getExperiences(t), [t])
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], [100, -100])

    return (
        <section ref={containerRef} className="relative z-10 min-h-screen flex flex-col justify-center py-12 sm:py-20 px-4 sm:px-8 md:px-20 bg-transparent text-blue-600">
            <motion.h2
                style={{ y }}
                className="text-4xl sm:text-5xl md:text-7xl font-bold mb-12 sm:mb-20 tracking-tighter"
            >
                {t.experience.title}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 sm:gap-x-20 gap-y-8 sm:gap-y-12">
                {experiences.map((exp, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex flex-col gap-2"
                    >
                        <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-black leading-tight">
                            {exp.company} - {exp.role}
                        </h3>
                        <p className="text-base sm:text-lg text-neutral-500">
                            {exp.period}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
