import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export default function NotFound() {
    const t = useTranslations('notFound')

    return (
        <main className="page-inset flex min-h-[70dvh] flex-col justify-end gap-6">
            <h1 className="font-serif text-5xl italic md:text-7xl">{t('title')}</h1>
            <Link href="/" className="text-[12px] uppercase tracking-[0.16em]">
                {t('back')}
            </Link>
        </main>
    )
}
