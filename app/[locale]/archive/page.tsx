import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { ArchiveGrid } from '@/components/archive/ArchiveGrid'
import { isLocale } from '@/i18n/routing'

export default async function ArchivePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    if (!isLocale(locale)) notFound()
    setRequestLocale(locale)
    return <ArchiveGrid />
}
