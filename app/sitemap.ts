import type { MetadataRoute } from 'next'
import { cases } from '@/content/projects'

const locales = ['es', 'en'] as const

export default function sitemap(): MetadataRoute.Sitemap {
    const base = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '')
    const paths = ['', '/work', '/archive', '/about', '/contact', ...cases.map((item) => `/work/${item.slug}`)]

    return paths.flatMap((path) =>
        locales.map((locale) => ({
            url: `${base}/${locale}${path}`,
            alternates: {
                languages: {
                    es: `${base}/es${path}`,
                    en: `${base}/en${path}`,
                },
            },
        })),
    )
}
