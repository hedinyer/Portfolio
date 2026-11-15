import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Experience } from '@/components/about/Experience'
import { Reveal } from '@/components/motion/Reveal'
import { portrait } from '@/content/projects'
import { isLocale } from '@/i18n/routing'

const toolKeys = ['adobe', 'figma', 'blender', 'clipStudio'] as const

type PageProps = {
    params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale } = await params
    if (!isLocale(locale)) return {}

    const t = await getTranslations({ locale, namespace: 'about' })

    return {
        title: t('title'),
        description: t('description'),
        alternates: {
            languages: {
                es: '/es/about',
                en: '/en/about',
            },
        },
    }
}

export default async function AboutPage({ params }: PageProps) {
    const { locale } = await params
    if (!isLocale(locale)) notFound()
    setRequestLocale(locale)

    const about = await getTranslations('about')

    return (
        <main className="page-inset">
            <div className="grid items-start gap-y-[calc(24*var(--u))] md:grid-cols-[calc(328*var(--u))_minmax(0,1fr)] md:gap-x-[calc(9*var(--u))] md:gap-y-0">
                <Reveal eager className="relative aspect-[4/5] w-full overflow-hidden">
                    <Image
                        src={portrait.src}
                        alt={about('portraitAlt')}
                        fill
                        sizes="(max-width: 767px) 95vw, 32vw"
                        priority
                        placeholder="blur"
                        blurDataURL={portrait.blurDataURL}
                        className="object-cover"
                    />
                </Reveal>

                <div className="min-w-0 md:max-w-[calc(492*var(--u))]">
                    <Reveal eager delay={40}>
                        <p className="t-body text-pretty">{about('description')}</p>
                    </Reveal>

                    <Reveal eager delay={80} className="mt-[calc(28*var(--u))] flex flex-col gap-[calc(16*var(--u))]">
                        <div>
                            <h1 className="t-label">{about('title')}</h1>
                            <p className="t-label">{about('role')}</p>
                        </div>
                        <div>
                            <h2 className="t-label">{about('toolsTitle')}</h2>
                            <ul>
                                {toolKeys.map((tool) => (
                                    <li key={tool} className="t-label">
                                        {about(`tools.${tool}`)}
                                    </li>
                                ))}
                            </ul>
                            <p className="t-text mt-[calc(8*var(--u))] text-pretty">{about('toolsDescription')}</p>
                        </div>
                    </Reveal>

                    <Reveal>
                        <Experience />
                    </Reveal>
                </div>
            </div>
        </main>
    )
}
