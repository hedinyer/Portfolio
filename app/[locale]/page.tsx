import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { isLocale } from '@/i18n/routing'
import { HomeScreen } from '@/components/home/HomeScreen'

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    if (!isLocale(locale)) notFound()
    setRequestLocale(locale)

    return <HomeScreen />
}
