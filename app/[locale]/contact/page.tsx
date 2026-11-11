import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { CopyEmail } from '@/components/contact/CopyEmail'
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
        <main className="page-inset box-border flex min-h-dvh animate-[fade-in_0.5s_ease-out_both] flex-col items-start">
            <div className="max-w-[calc(492*var(--u))]">
                <h1 className="t-body text-pretty">{t('lead')}</h1>
                <p className="t-body mt-[calc(14*var(--u))] text-pretty">{t('copy')}</p>
                <CopyEmail />
            </div>
        </main>
    )
}
