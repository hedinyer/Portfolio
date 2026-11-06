import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { CopyEmail } from '@/components/contact/CopyEmail'
import { RevealText } from '@/components/motion'
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
        <main className="page-inset">
            <div className="flex min-h-[calc(100dvh-9rem)] flex-col justify-end pb-6">
                <p className="text-[12px] uppercase tracking-[0.16em]">{t('title')}</p>
                <RevealText
                    as="h1"
                    className="mt-5 max-w-[12ch] font-serif text-[clamp(3rem,8vw,7.25rem)] italic leading-[0.9] tracking-[-0.03em] text-balance"
                >
                    {t('lead')}
                </RevealText>
                <p className="mt-8 max-w-[42ch] text-pretty text-[16px] leading-relaxed">{t('copy')}</p>
                <CopyEmail />
            </div>
        </main>
    )
}
