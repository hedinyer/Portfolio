'use client'
import { useRef } from 'react'
import { motion } from 'framer-motion'

export default function About() {
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
                            <img 
                                src="/andrea.jpg" 
                                alt="Andrea Rodriguez" 
                                className="w-full h-full object-cover"
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
                        <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-3 sm:mb-4 tracking-tighter">About me</h2>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-light mb-4 sm:mb-8 text-blue-500">
                            Graphic designer | visulizer
                        </h3>
                        <p className="text-base sm:text-lg md:text-xl leading-relaxed text-neutral-800 max-w-3xl">
                            I am a Industrial designer based in Colombia, specialized in branding and
                            digital illustration. My passion is to create and strengthen projects that
                            stand out for their unique style, conveying authentic messages full of
                            personality. Inspired by boundless creativity, I believe in the power of
                            every idea to be transformed into an image that connects with people.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 sm:mb-8 tracking-tighter">My tools</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                            <ul className="text-lg sm:text-xl leading-loose text-neutral-800">
                                <li>Adobe Suite</li>
                                <li>Figma</li>
                                <li>Blender</li>
                                <li>Clip Studio Paint</li>
                            </ul>
                            <p className="text-lg sm:text-xl leading-relaxed text-neutral-600">
                                Also using <span className="font-bold text-black">AI tools</span> across process of ideation,
                                coordinaation, concept development and creative
                                exploration
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
