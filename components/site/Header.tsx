'use client'

import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { site } from '@/content/site'
import { Magnetic } from '@/components/motion'
import { LanguageToggle } from './LanguageToggle'

const links = [
    { href: '/work' as const, key: 'work' as const },
    { href: '/archive' as const, key: 'archive' as const },
]

export function Header() {
    const t = useTranslations('nav')
    const pathname = usePathname()

    return (
        <header className="fixed inset-x-0 top-0 z-40 mix-blend-difference text-white">
            <nav className="grid grid-cols-2 items-start gap-x-4 gap-y-2 px-5 py-4 text-[12px] uppercase tracking-[0.16em] md:grid-cols-4 md:px-8">
                <Magnetic>
                    <Link href="/" className={pathname === '/' ? 'underline underline-offset-4' : undefined}>
                        {site.name}
                    </Link>
                </Magnetic>
                {links.map((link) => {
                    const active = pathname === link.href || pathname.startsWith(`${link.href}/`)
                    return (
                        <Link key={link.href} href={link.href} className={active ? 'underline underline-offset-4' : undefined}>
                            {t(link.key)}
                        </Link>
                    )
                })}
                <div className="flex items-center justify-between gap-4 md:justify-end">
                    <Link
                        href="/contact"
                        className={pathname === '/contact' ? 'underline underline-offset-4' : undefined}
                    >
                        {t('contact')}
                    </Link>
                    <LanguageToggle />
                </div>
            </nav>
        </header>
    )
}
