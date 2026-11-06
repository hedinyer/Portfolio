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
    const work = await getTranslations({ locale, namespace: 'work' })

    return (
        <main>
            <WorkGallery
                heading={work('title')}
                indexLabel={work('index')}
                items={cases.map((project) => ({
                    slug: project.slug,
                    title: casesCopy(`${project.slug}.title`),
                    category: casesCopy(`${project.slug}.category`),
                    alt: casesCopy(`${project.slug}.alt`),
                    cover: project.cover,
                }))}
            />
        </main>
    )
}
