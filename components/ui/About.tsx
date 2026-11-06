'use client'
import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'

export default function About() {
    const { t } = useLanguage()
    return (
        <section className="relative z-10 min-h-screen flex flex-col justify-center py-12 sm:py-20 px-4 sm:px-8 md:px-20 bg-transparent text-blue-600">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
                {/* Left Column - Image/Card */}
                <div className="lg:col-span-4">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        className="relative aspect-[3/4] rounded-[1.5rem] sm:rounded-[2rem] border-2 border-blue-600 p-3 sm:p-4 bg-white"
                    >
                        <div className="w-full h-full rounded-[1rem] sm:rounded-[1.5rem] overflow-hidden bg-neutral-100 relative">
                            <Image 
                                src="/andrea.jpg" 
                                alt="Andrea Rodriguez" 
                                width={600}
                                height={800}
                                sizes="(max-width: 1024px) 100vw, 33vw"
                                className="w-full h-full object-cover"
                                priority
                                quality={90}
                            />
                        </div>
                    </motion.div>
                    <div className="mt-6 sm:mt-8 text-center">
                        <a href="mailto:andreacrodriguez99@gmail.com" className="text-sm sm:text-lg hover:underline break-all">
                            andreacrodriguez99@gmail.com
                        </a>
                    </div>
                </div>

                {/* Right Column - Content */}
                <div className="lg:col-span-8 flex flex-col gap-10 sm:gap-16 pt-4 sm:pt-8">
                    <div>
                        <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-3 sm:mb-4 tracking-tighter">{t.about.title}</h2>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-light mb-4 sm:mb-8 text-blue-500">
                            {t.about.subtitle}
                        </h3>
                        <p className="text-base sm:text-lg md:text-xl leading-relaxed text-neutral-800 max-w-3xl">
                            {t.about.description}
                        </p>
                    </div>

                    <div>
                        <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 sm:mb-8 tracking-tighter">{t.about.toolsTitle}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                            <ul className="text-lg sm:text-xl leading-loose text-neutral-800">
                                <li>{t.about.tools.adobe}</li>
                                <li>{t.about.tools.figma}</li>
                                <li>{t.about.tools.blender}</li>
                                <li>{t.about.tools.clipStudio}</li>
                            </ul>
                            <p className="text-lg sm:text-xl leading-relaxed text-neutral-600">
                                {t.about.toolsDescription}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
