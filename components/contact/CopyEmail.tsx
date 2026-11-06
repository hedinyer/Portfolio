'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Magnetic } from '@/components/motion'
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
        <div className="mt-14 flex flex-col items-start gap-8 md:mt-20">
            <a
                href={`mailto:${site.email}`}
                className="max-w-full font-serif text-[clamp(2rem,7.4vw,6.75rem)] italic leading-[0.9] tracking-[-0.03em] break-words text-balance underline decoration-foreground/25 underline-offset-[0.12em]"
            >
                <span aria-live="polite">{copied ? t('copied') : site.email}</span>
            </a>
            <Magnetic>
                <button
                    type="button"
                    onClick={() => {
                        void copy()
                    }}
                    aria-label={t('copyLabel')}
                    className="min-h-11 text-[12px] uppercase tracking-[0.16em] underline underline-offset-4"
                >
                    {t('copyLabel')}
                </button>
            </Magnetic>
        </div>
    )
}
