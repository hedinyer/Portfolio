import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Experience } from '@/components/about/Experience'
import { RevealImage, RevealText } from '@/components/motion'
import { portrait } from '@/content/projects'
import { Link } from '@/i18n/navigation'
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
    const nav = await getTranslations('nav')

    return (
        <main className="page-inset">
            <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
                <RevealImage
                    media={portrait}
                    alt={about('portraitAlt')}
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority
                    className="aspect-[800/946] w-full shadow-[inset_0_0_0_1px_oklch(0_0_0/0.1)] lg:col-span-5"
                />
                <div className="lg:col-span-7 lg:pt-2">
                    <p className="text-[12px] uppercase tracking-[0.16em]">{about('title')}</p>
                    <RevealText
                        as="h1"
                        className="mt-5 max-w-[16ch] font-serif text-[clamp(2.75rem,6vw,5.6rem)] italic leading-[0.92] tracking-[-0.03em] text-balance"
                    >
                        {about('role')}
                    </RevealText>
                    <RevealText className="mt-8 max-w-[66ch] text-pretty text-[16px] leading-relaxed">
                        {about('description')}
                    </RevealText>

                    <section className="mt-16 border-t border-line pt-8">
                        <h2 className="text-[12px] uppercase tracking-[0.16em]">{about('toolsTitle')}</h2>
                        <ul className="mt-6 grid gap-x-10 sm:grid-cols-2">
                            {toolKeys.map((tool) => (
                                <li key={tool} className="border-b border-line py-3 text-[15px]">
                                    {about(`tools.${tool}`)}
                                </li>
                            ))}
                        </ul>
                        <p className="mt-6 max-w-[58ch] text-pretty text-[14px] leading-relaxed text-muted">
                            {about('toolsDescription')}
                        </p>
                    </section>
                </div>
            </div>

            <Experience />

            <Link href="/contact" className="mt-2 inline-flex min-h-11 items-center text-[12px] uppercase tracking-[0.16em] underline underline-offset-4">
                {nav('contact')}
            </Link>
        </main>
    )
}
