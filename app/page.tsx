'use client'

import ColorBends from '@/components/3d/ColorBends'
import Hero from '@/components/ui/Hero'
import About from '@/components/ui/About'
import Services from '@/components/ui/Services'
import Experience from '@/components/ui/Experience'
import Footer from '@/components/ui/Footer'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'

export default function Home() {
    return (
        <main className="relative min-h-screen w-full overflow-hidden">
            <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50">
                <LanguageSwitcher />
            </div>
            <div className="fixed inset-0 -z-10 w-full h-full">
                <ColorBends
                    colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
                    rotation={30}
                    speed={0.3}
                    scale={1.2}
                    frequency={1.4}
                    warpStrength={1.2}
                    mouseInfluence={0.8}
                    parallax={0.6}
                    noise={0.08}
                    transparent
                    style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
                />
            </div>
            <Hero />
            <About />
            <Services />
            <Experience />
            <Footer />
        </main>
    );
}
