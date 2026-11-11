import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export default function NotFound() {
    const t = useTranslations('notFound')

    return (
        <main className="page-inset box-border flex min-h-dvh animate-[fade-in_0.5s_ease-out_both] flex-col items-start">
            <h1 className="t-body">{t('title')}</h1>
            <Link href="/" className="t-next link mt-[calc(14*var(--u))] inline-block">
                {t('back')}
            </Link>
        </main>
    )
}
