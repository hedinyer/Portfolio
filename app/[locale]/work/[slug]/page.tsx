import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { CaseStudy } from '@/components/case/CaseStudy'
import { cases, getProject } from '@/content/projects'
import { isLocale, routing } from '@/i18n/routing'

type CaseParams = { locale: string; slug: string }

export function generateStaticParams() {
    return routing.locales.flatMap((locale) => cases.map((item) => ({ locale, slug: item.slug })))
}

export async function generateMetadata({ params }: { params: Promise<CaseParams> }): Promise<Metadata> {
    const { locale, slug } = await params
    if (!isLocale(locale)) return {}
    if (!cases.some((item) => item.slug === slug)) return {}

    const t = await getTranslations({ locale, namespace: 'cases' })

    return {
        title: t(`${slug}.title`),
        description: t(`${slug}.summary`),
    }
}

export default async function CasePage({ params }: { params: Promise<CaseParams> }) {
    const { locale, slug } = await params
    if (!isLocale(locale)) notFound()

    const project = getProject(slug)
    const index = cases.findIndex((item) => item.slug === slug)
    if (!project || index === -1) notFound()

    setRequestLocale(locale)

    const t = await getTranslations({ locale, namespace: 'cases' })
    const work = await getTranslations({ locale, namespace: 'work' })
    const previous = index > 0 ? cases[index - 1] : null
    const next = index < cases.length - 1 ? cases[index + 1] : null

    const meta = [
        { label: work('role'), value: t(`${slug}.role`) },
        project.year ? { label: work('year'), value: project.year } : null,
        project.collaborators.length > 0
            ? { label: work('collaboration'), value: project.collaborators.join(', ') }
            : null,
        { label: t('categoryLabel'), value: t(`${slug}.category`) },
    ].filter((row): row is { label: string; value: string } => row !== null)

    return (
        <CaseStudy
            title={t(`${slug}.title`)}
            summary={t(`${slug}.summary`)}
            alt={t(`${slug}.alt`)}
            gallery={project.gallery}
            meta={meta}
            index={index + 1}
            total={cases.length}
            ofLabel={locale === 'es' ? 'de' : 'of'}
            previous={previous ? { href: `/work/${previous.slug}`, label: work('previous') } : null}
            next={next ? { href: `/work/${next.slug}`, label: work('next') } : null}
        />
    )
}
