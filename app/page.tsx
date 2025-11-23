import UnicornStudioBackground from '@/components/3d/UnicornStudioBackground'
import Hero from '@/components/ui/Hero'
import About from '@/components/ui/About'
import Services from '@/components/ui/Services'
import Experience from '@/components/ui/Experience'
import PortfolioGrid from '@/components/ui/PortfolioGrid'
import Stats from '@/components/ui/Stats'

export default function Home() {
    return (
        <main className="relative min-h-screen w-full overflow-hidden bg-black">
            <UnicornStudioBackground />
            <Hero />
            <About />
            <Services />
            <Experience />
            <PortfolioGrid />
            <Stats />
        </main>
    );
}
