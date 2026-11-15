'use client'

import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { site } from '@/content/site'
import { LanguageToggle } from './LanguageToggle'

function isActivePath(pathname: string, href: string) {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(`${href}/`)
}

export function Header() {
    const t = useTranslations('nav')
    const pathname = usePathname()

    return (
        <header className="nav-in t-nav pointer-events-none fixed inset-x-0 top-0 z-40 h-[var(--header-h)] bg-[var(--background)] whitespace-nowrap">
            <nav className="relative flex items-start justify-between px-[calc(8*var(--u))] pt-[calc(16.4*var(--u))] md:block md:h-[calc(21*var(--u))] md:px-0 md:pt-[calc(8.6*var(--u))]">
                <Link
                    href="/"
                    aria-current={isActivePath(pathname, '/') ? 'page' : undefined}
                    className="nav-link pointer-events-auto md:absolute md:left-[calc(10.98*var(--u))]"
                >
                    {site.name}
                </Link>
                <Link
                    href="/work"
                    aria-current={isActivePath(pathname, '/work') ? 'page' : undefined}
                    className="nav-link pointer-events-auto md:absolute md:left-[calc(50%-147*var(--u))]"
                >
                    {t('work')}
                </Link>
                <Link
                    href="/archive"
                    aria-current={isActivePath(pathname, '/archive') ? 'page' : undefined}
                    className="nav-link pointer-events-auto md:absolute md:left-[calc(50%+175.12*var(--u))]"
                >
                    {t('archive')}
                </Link>
                <div className="pointer-events-auto flex items-start gap-[calc(14*var(--u))] md:absolute md:right-[calc(11.32*var(--u))]">
                    <span className="hidden md:block">
                        <LanguageToggle />
                    </span>
                    <Link
                        href="/contact"
                        aria-current={isActivePath(pathname, '/contact') ? 'page' : undefined}
                        className="nav-link"
                    >
                        {t('contact')}
                    </Link>
                </div>
            </nav>
        </header>
    )
}
