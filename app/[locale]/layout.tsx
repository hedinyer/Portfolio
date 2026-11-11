import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { Header } from '@/components/site/Header'
import { SiteFooter } from '@/components/site/Footer'
import { SiteChrome } from '@/components/site/SiteChrome'
import { HtmlLang } from '@/components/site/HtmlLang'
import { isLocale, routing } from '@/i18n/routing'

type LocaleParams = { locale: string }

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<LocaleParams> }): Promise<Metadata> {
    const { locale } = await params
    if (!isLocale(locale)) return {}

    const t = await getTranslations({ locale, namespace: 'meta' })

    return {
        metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
        title: {
            default: t('title'),
            template: `%s — ${t('name')}`,
        },
        description: t('description'),
        openGraph: {
            title: t('title'),
            description: t('description'),
            locale: locale === 'es' ? 'es_CO' : 'en_US',
            type: 'website',
            images: [{ url: '/portrait/andrea.webp', alt: t('ogAlt') }],
        },
        alternates: {
            languages: {
                es: '/es',
                en: '/en',
            },
        },
    }
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: Promise<LocaleParams>
}) {
    const { locale } = await params
    if (!isLocale(locale)) notFound()

    setRequestLocale(locale)
    const messages = await getMessages()

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <HtmlLang />
            <Header />
            <SiteChrome footer={<SiteFooter />}>{children}</SiteChrome>
        </NextIntlClientProvider>
    )
}
