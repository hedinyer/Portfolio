'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing, type Locale } from '@/i18n/routing'

export function LanguageToggle() {
    const locale = useLocale()
    const pathname = usePathname()
    const router = useRouter()

    return (
        <div className="flex gap-[0.4em]" aria-label="Language">
            {routing.locales.map((item) => {
                const active = item === locale
                return (
                    <button
                        key={item}
                        type="button"
                        lang={item}
                        aria-current={active ? 'true' : undefined}
                        onClick={() => router.replace(pathname, { locale: item as Locale })}
                        className={`capitalize ${active ? 'text-link' : 'text-link-hover hover:text-link'}`}
                    >
                        {item}
                    </button>
                )
            })}
        </div>
    )
}
