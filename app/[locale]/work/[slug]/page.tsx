import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { RevealImage, RevealText } from '@/components/motion'
import { NextProject } from '@/components/work/NextProject'
import { cases, getNextCase, getProject } from '@/content/projects'
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
    if (!project || !cases.some((item) => item.slug === slug)) notFound()

    setRequestLocale(locale)

    const t = await getTranslations({ locale, namespace: 'cases' })
    const work = await getTranslations({ locale, namespace: 'work' })
    const next = getNextCase(slug)
    const hero = project.gallery[0]
    const label = `${work('next')} — ${t(`${next.slug}.title`)}`

    return (
        <article className="page-inset">
            <div className="w-full" style={{ aspectRatio: `${hero.width} / ${hero.height}` }}>
                <RevealImage
                    media={hero}
                    alt={t(`${slug}.alt`)}
                    sizes="(max-width: 768px) 100vw, 90vw"
                    priority
                    transitionName={`work-${slug}`}
                    className="h-full w-full"
                />
            </div>

            <div className="mt-8 grid gap-8 md:mt-12 md:grid-cols-12 md:items-end">
                <div className="md:col-span-7">
                    <RevealText
                        as="h1"
                        immediate
                        className="font-serif text-[clamp(3.5rem,8vw,7.25rem)] leading-[0.9] italic"
                    >
                        {t(`${slug}.title`)}
                    </RevealText>
                    <p className="mt-4 text-[11px] uppercase tracking-[0.16em]">{t(`${slug}.category`)}</p>
                </div>
                <RevealText className="max-w-[36rem] text-[17px] leading-relaxed md:col-span-5">
                    {t(`${slug}.summary`)}
                </RevealText>
            </div>

            <dl className="mt-12 flex flex-col gap-8 border-t border-line pt-6 md:mt-16 md:flex-row md:gap-16">
                <div>
                    <dt className="text-[11px] uppercase tracking-[0.16em]">{work('role')}</dt>
                    <dd className="mt-2">{t(`${slug}.role`)}</dd>
                </div>
                {project.collaborators.length > 0 ? (
                    <div>
                        <dt className="text-[11px] uppercase tracking-[0.16em]">{work('collaboration')}</dt>
                        <dd className="mt-2">{project.collaborators.join(', ')}</dd>
                    </div>
                ) : null}
                {project.year !== null ? (
                    <div>
                        <dt className="text-[11px] uppercase tracking-[0.16em]">{work('year')}</dt>
                        <dd className="mt-2">{project.year}</dd>
                    </div>
                ) : null}
            </dl>

            <div className="mt-16 flex flex-col gap-14 md:mt-28 md:gap-24">
                {project.gallery.slice(1).map((media, index) => (
                    <div key={media.src} className="w-full" style={{ aspectRatio: `${media.width} / ${media.height}` }}>
                        <RevealImage
                            media={media}
                            alt={`${t(`${slug}.alt`)} ${index + 1}`}
                            sizes="(max-width: 768px) 100vw, 80vw"
                            parallax
                            className="h-full w-full"
                        />
                    </div>
                ))}
            </div>

            <div className="-mx-5 mt-20 border-t border-line md:-mx-8 md:mt-28">
                <NextProject href={`/work/${next.slug}`} label={label} />
            </div>
        </article>
    )
}
