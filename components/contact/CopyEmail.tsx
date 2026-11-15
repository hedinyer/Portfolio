'use client'

import { useTranslations } from 'next-intl'
import { site } from '@/content/site'

export function CopyEmail() {
    const t = useTranslations('contact')

    return (
        <div className="mt-[calc(22*var(--u))] flex flex-col items-start gap-[calc(6*var(--u))]">
            <a
                href={`mailto:${site.email}`}
                className="t-body underline decoration-current underline-offset-[0.15em] text-[var(--nav-active)] md:no-underline"
            >
                {site.email}
            </a>
            <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="t-next text-[var(--nav-active)]"
            >
                {t('linkedin')}
            </a>
        </div>
    )
}
