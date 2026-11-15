import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { CopyEmail } from '@/components/contact/CopyEmail'
import { Reveal } from '@/components/motion/Reveal'
import { isLocale } from '@/i18n/routing'

type PageProps = {
    params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale } = await params
    if (!isLocale(locale)) return {}

    const t = await getTranslations({ locale, namespace: 'contact' })

    return {
        title: t('title'),
        description: t('copy'),
        alternates: {
            languages: {
                es: '/es/contact',
                en: '/en/contact',
            },
        },
    }
}

export default async function ContactPage({ params }: PageProps) {
    const { locale } = await params
    if (!isLocale(locale)) notFound()
    setRequestLocale(locale)

    const t = await getTranslations('contact')

    return (
        <main className="page-inset relative box-border flex min-h-dvh flex-col items-start overflow-hidden">
            <video
                className="pointer-events-none fixed bottom-0 left-1/2 z-0 h-[70dvh] w-auto max-w-none -translate-x-1/2 origin-bottom object-contain object-bottom opacity-45"
                src="/contact/ascii.mp4"
                autoPlay
                muted
                loop
                playsInline
                aria-hidden
            />
            <div className="relative z-10 max-w-[calc(492*var(--u))]">
                <Reveal
                    eager
                    as="h1"
                    className="text-pretty font-bold text-[calc(42*var(--u))] leading-[calc(46*var(--u))] tracking-[calc(-1.2*var(--u))] text-foreground md:text-[calc(52*var(--u))] md:leading-[calc(56*var(--u))]"
                >
                    {t('lead')}
                </Reveal>
                <Reveal eager delay={50} as="p" className="t-body mt-[calc(14*var(--u))] text-pretty">
                    {t('copy')}
                </Reveal>
                <Reveal eager delay={90}>
                    <CopyEmail />
                </Reveal>
            </div>
        </main>
    )
}
