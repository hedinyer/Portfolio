'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { homeFrames } from '@/content/projects'
import { site } from '@/content/site'
import { HomeFrame } from './HomeFrame'

const serviceKeys = ['identity', 'branding', 'illustration', 'logofolio', 'ux'] as const

export function HomeScreen() {
    const t = useTranslations('home')

    return (
        <main className="flex h-dvh flex-col overflow-hidden px-5 pt-[var(--header-h)] pb-5 md:px-8 md:pb-7">
            <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden">
                <div className="grid w-full grid-cols-3 items-center gap-1.5 md:flex md:w-auto md:justify-center md:gap-7 lg:gap-10">
                    {homeFrames.map((frame, index) => (
                        <HomeFrame key={frame.map((item) => item.src).join('|')} media={frame} frameIndex={index} />
                    ))}
                </div>
            </div>
            <div className="flex shrink-0 flex-col gap-6 pt-4 md:flex-row md:items-end md:justify-between md:gap-16 md:pt-8">
                <p className="max-w-md text-left text-[13px] leading-[1.45]">
                    {t.rich('bio', {
                        about: (chunks) => (
                            <Link href="/about" className="underline underline-offset-4">
                                {chunks}
                            </Link>
                        ),
                        email: (chunks) => (
                            <a className="underline underline-offset-4" href={`mailto:${site.email}`}>
                                {chunks}
                            </a>
                        ),
                    })}
                </p>
                <div className="text-[11px] uppercase tracking-[0.18em] md:text-right">
                    <p>{t('servicesLabel')}</p>
                    <ul className="mt-2 space-y-1">
                        {serviceKeys.map((key) => (
                            <li key={key}>{t(`services.${key}`)}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </main>
    )
}
