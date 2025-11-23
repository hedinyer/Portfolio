'use client'
import { useRef } from 'react'
import { motion } from 'framer-motion'

export default function About() {
    return (
        <section className="relative z-10 min-h-screen flex flex-col justify-center py-20 px-8 md:px-20 bg-[#f5f5f0] text-blue-600">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Left Column - Image/Card */}
                <div className="lg:col-span-4">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        className="relative aspect-[3/4] rounded-[2rem] border-2 border-blue-600 p-4 bg-white"
                    >
                        <div className="w-full h-full rounded-[1.5rem] overflow-hidden bg-neutral-100 relative">
                            {/* Placeholder for user image - using a colored div for now as per plan */}
                            <div className="w-full h-full bg-neutral-200 flex items-center justify-center text-neutral-400">
                                [Image Placeholder]
                            </div>
                        </div>
                        <div className="absolute -bottom-12 left-0 w-full text-center">
                            <div className="text-4xl font-bold tracking-tighter bg-[#f5f5f0] px-4 inline-block">
                                good
                                <br />
                                <span className="ml-8">design!</span>
                            </div>
                        </div>
                    </motion.div>
                    <div className="mt-20 text-center">
                        <a href="mailto:andreacrodriguez99@gmail.com" className="text-lg hover:underline">
                            andreacrodriguez99@gmail.com
                        </a>
                    </div>
                </div>

                {/* Right Column - Content */}
                <div className="lg:col-span-8 flex flex-col gap-16 pt-8">
                    <div>
                        <h2 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter">About me</h2>
                        <h3 className="text-3xl md:text-4xl font-light mb-8 text-blue-500">
                            Graphic designer | visulizer
                        </h3>
                        <p className="text-xl leading-relaxed text-neutral-800 max-w-3xl">
                            I am a Industrial designer based in Colombia, specialized in branding and
                            digital illustration. My passion is to create and strengthen projects that
                            stand out for their unique style, conveying authentic messages full of
                            personality. Inspired by boundless creativity, I believe in the power of
                            every idea to be transformed into an image that connects with people.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">My tools</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <ul className="text-xl leading-loose text-neutral-800">
                                <li>Adobe Suite</li>
                                <li>Figma</li>
                                <li>Blender</li>
                                <li>Clip Studio Paint</li>
                            </ul>
                            <p className="text-xl leading-relaxed text-neutral-600">
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
