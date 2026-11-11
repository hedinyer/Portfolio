'use client'

import { useTranslations } from 'next-intl'
import { LanguageToggle } from './LanguageToggle'

export function SiteFooter() {
    const t = useTranslations('footer')

    return (
        <footer className="flex items-baseline justify-between px-[calc(8*var(--u))] pb-[calc(24*var(--u))] md:px-[calc(12*var(--u))] md:pb-[calc(36*var(--u))]">
            <button
                type="button"
                onClick={() => window.scrollTo({ top: 0 })}
                className="link t-text underline underline-offset-2"
            >
                {t('backToTop')}
            </button>
            <span className="t-text md:hidden">
                <LanguageToggle />
            </span>
        </footer>
    )
}
