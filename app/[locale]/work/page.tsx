import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { WorkGallery } from '@/components/work/WorkGallery'
import { cases } from '@/content/projects'
import { isLocale } from '@/i18n/routing'

export default async function WorkPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    if (!isLocale(locale)) notFound()
    setRequestLocale(locale)

    const casesCopy = await getTranslations({ locale, namespace: 'cases' })

    return (
        <main className="page-inset">
            <WorkGallery
                items={cases.map((project) => {
                    const hover = project.gallery[1]
                    return {
                        slug: project.slug,
                        title: casesCopy(`${project.slug}.title`),
                        category: casesCopy(`${project.slug}.category`),
                        categoryKey: project.category,
                        alt: casesCopy(`${project.slug}.alt`),
                        cover: project.cover,
                        hover: hover && hover.src !== project.cover.src ? hover : null,
                    }
                })}
            />
        </main>
    )
}
