'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { site } from '@/content/site'

export function CopyEmail() {
    const t = useTranslations('contact')
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        if (!copied) return
        const timeout = window.setTimeout(() => setCopied(false), 1600)
        return () => window.clearTimeout(timeout)
    }, [copied])

    async function copy() {
        try {
            await navigator.clipboard.writeText(site.email)
            setCopied(true)
        } catch {
            setCopied(false)
        }
    }

    return (
        <div className="mt-[calc(22*var(--u))] flex flex-col items-start gap-[calc(6*var(--u))]">
            <a
                href={`mailto:${site.email}`}
                className="t-body link underline decoration-current underline-offset-[0.15em] md:no-underline"
            >
                {site.email}
            </a>
            <button
                type="button"
                onClick={() => {
                    void copy()
                }}
                className="t-next link cursor-pointer border-0 bg-transparent p-0"
            >
                <span aria-live="polite">{copied ? t('copied') : t('copyLabel')}</span>
            </button>
        </div>
    )
}
