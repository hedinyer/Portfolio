import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { WorkGallery } from '@/components/work/WorkGallery'
import { cases, homeImages } from '@/content/projects'
import { isLocale } from '@/i18n/routing'

export default async function WorkPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    if (!isLocale(locale)) notFound()
    setRequestLocale(locale)

    const casesCopy = await getTranslations({ locale, namespace: 'cases' })
    const geoparqueHomeCover = homeImages[1]

    return (
        <main className="page-inset">
            <WorkGallery
                items={cases.map((project) => {
                    const cover =
                        project.slug === 'geoparque-web' && geoparqueHomeCover
                            ? geoparqueHomeCover
                            : project.slug === 'cortteza' && project.gallery[28]
                              ? project.gallery[28]
                              : project.cover
                    const hoverIndex =
                        project.slug === 'seres'
                            ? 7
                            : project.slug === 'andrea-amarillo'
                              ? 14
                              : project.slug === 'magic-decisions'
                                ? 15
                                : project.slug === 'cortteza'
                                  ? 29
                                  : project.slug === 'nua'
                                    ? 15
                                    : 1
                    const hover =
                        project.slug === 'geoparque-web'
                            ? (project.gallery[8] ?? project.gallery[0])
                            : (project.gallery[hoverIndex] ?? project.gallery[1])
                    return {
                        slug: project.slug,
                        title: casesCopy(`${project.slug}.title`),
                        category: casesCopy(`${project.slug}.category`),
                        categoryKey: project.category,
                        alt: casesCopy(`${project.slug}.alt`),
                        cover,
                        coverPosition:
                            project.slug === 'geoparque-web' ? '62% 50%' : undefined,
                        hoverPosition:
                            project.slug === 'geoparque-web' ? 'center' : undefined,
                        frameRatio: project.slug === 'nua' ? 1 : undefined,
                        hover: hover && hover.src !== cover.src ? hover : null,
                    }
                })}
            />
        </main>
    )
}
