'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { site } from '@/content/site'
import { HomeCarousel } from './HomeCarousel'

const serviceKeys = ['ux', 'branding', 'logofolio', 'editorial', 'graphic'] as const

function Bio() {
    const t = useTranslations('home')

    return (
        <p className="t-body">
            {t.rich('bio', {
                about: (chunks) => (
                    <Link href="/about" className="link underline underline-offset-[0.12em] md:no-underline">
                        {chunks}
                    </Link>
                ),
                email: (chunks) => (
                    <a className="link" href={`mailto:${site.email}`}>
                        {chunks}
                    </a>
                ),
            })}
        </p>
    )
}

function Services() {
    const t = useTranslations('home')

    return (
        <div className="t-label">
            <p>{t('servicesLabel')}</p>
            <ul>
                {serviceKeys.map((key) => (
                    <li key={key}>{t(`services.${key}`)}</li>
                ))}
            </ul>
        </div>
    )
}

export function HomeScreen() {
    return (
        <main className="text-foreground">
            <div
                aria-hidden
                data-home-spacer
                className="w-px max-md:h-[calc(100vh+2339*var(--u))] md:h-[calc(100vh+2734*var(--u))]"
            />

            <div className="fixed z-20 w-[calc(305*var(--u))] max-md:top-[calc(51.22*var(--u))] max-md:left-[calc(7.91*var(--u))] md:bottom-[calc(0.43*var(--u))] md:left-[calc(11.97*var(--u))] md:w-[calc(492.3*var(--u))]">
                <div data-home-copy className="md:hidden">
                    <Bio />
                    <div className="mt-[calc(14*var(--u))]">
                        <Services />
                    </div>
                </div>
                <div className="hidden md:block">
                    <Bio />
                </div>
            </div>

            <div className="fixed z-20 hidden w-[calc(114.94*var(--u))] md:right-[calc(243.08*var(--u))] md:bottom-[calc(31.98*var(--u))] md:block">
                <Services />
            </div>

            <HomeCarousel />
        </main>
    )
}
