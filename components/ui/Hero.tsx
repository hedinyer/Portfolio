'use client'
import { motion } from 'framer-motion'

export default function Hero() {
    return (
        <section className="relative z-10 flex min-h-screen flex-col items-center justify-center pointer-events-none bg-[#f5f5f0] text-blue-600">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
            >
                <h1 className="text-[12vw] leading-[0.8] font-black tracking-tighter">
                    ANDREA
                    <br />
                    <span className="text-transparent stroke-text-blue">RODRIGUEZ</span>
                </h1>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-8 flex flex-col items-center gap-2"
            >
                <p className="text-xl font-light tracking-[0.3em] uppercase text-blue-500">
                    Industrial Designer | Visualizer
                </p>
                <div className="h-16 w-[1px] bg-blue-600/50 mt-8" />
            </motion.div>
        </section>
    )
}
