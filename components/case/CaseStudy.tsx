import type { Media } from '@/content/projects'
import { NextProject } from '@/components/work/NextProject'
import { CaseGallery } from './CaseGallery'
import { CaseMedia } from './CaseMedia'
import { FadeIn } from './FadeIn'
import { heroRatio, planGallery } from './planGallery'

export type CaseMeta = { label: string; value: string }
export type CaseLink = { href: string; label: string }

function splitSummary(summary: string) {
    const sentences = summary
        .split(/(?<=[.!?…])\s+/)
        .map((sentence) => sentence.trim())
        .filter(Boolean)
    if (sentences.length < 4) return { lead: summary, aside: null }
    const mid = Math.ceil(sentences.length / 2)
    return {
        lead: sentences.slice(0, mid).join(' '),
        aside: sentences.slice(mid).join(' '),
    }
}

function MetaList({ rows, className }: { rows: CaseMeta[]; className: string }) {
    return (
        <dl className={className}>
            {rows.map((row) => (
                <div key={row.label} className="contents">
                    <dt className="t-label">{row.label}</dt>
                    <dd className="t-label">{row.value}</dd>
                </div>
            ))}
        </dl>
    )
}

export function CaseStudy({
    title,
    summary,
    alt,
    gallery,
    meta,
    index,
    total,
    ofLabel,
    previous,
    next,
}: {
    title: string
    summary: string
    alt: string
    gallery: Media[]
    meta: CaseMeta[]
    index: number
    total: number
    ofLabel: string
    previous: CaseLink | null
    next: CaseLink | null
}) {
    const hero = gallery[0]
    const { lead, aside } = splitSummary(summary)
    const rows = planGallery(gallery.slice(1))

    return (
        <article className="relative flex w-full flex-col">
            <style>{`
                .case-fade { opacity: 0; }
                .case-fade.is-in { animation: case-text-in 0.8s ease-out forwards; }
                @keyframes case-text-in { from { opacity: 0; } to { opacity: 1; } }
                .case-title {
                    font-weight: 500;
                    letter-spacing: calc(-0.4 * var(--u));
                    color: #2b2b2b;
                    font-size: calc(15 * var(--u));
                    line-height: calc(18 * var(--u));
                }
                @media (min-width: 768px) {
                    .case-title {
                        font-size: calc(13 * var(--u));
                        line-height: calc(14 * var(--u));
                    }
                }
                @media (prefers-reduced-motion: reduce) {
                    .case-fade { opacity: 1; animation: none; }
                }
            `}</style>

            {hero ? (
                <figure
                    className="relative order-1 mx-[calc(8*var(--u))] mt-[calc(44*var(--u))] w-[calc(304*var(--u))] overflow-hidden md:order-2 md:mx-[calc(11*var(--u))] md:mt-0 md:w-[calc(1002*var(--u))]"
                    style={{ aspectRatio: String(heroRatio(hero)) }}
                >
                    <CaseMedia media={hero} alt={alt} sizes="(max-width: 767px) 95vw, 98vw" priority />
                </figure>
            ) : null}

            <header className="relative order-2 px-[calc(8*var(--u))] pt-[calc(16*var(--u))] md:order-1 md:min-h-[calc(223*var(--u))] md:px-0 md:pt-[calc(55*var(--u))] md:pb-[calc(47*var(--u))]">
                <h1 className="case-title t-title max-w-[calc(304*var(--u))] md:ml-[calc(12*var(--u))] md:max-w-[calc(640*var(--u))]">
                    {title}
                </h1>
                <FadeIn className="mt-[calc(8*var(--u))] w-full md:mt-[calc(3*var(--u))] md:ml-[calc(12*var(--u))] md:w-[calc(632*var(--u))] md:columns-2 md:gap-x-[calc(21*var(--u))] md:[column-fill:balance]">
                    <p className="t-text text-pretty">{lead}</p>
                </FadeIn>
                <MetaList
                    rows={meta}
                    className="absolute top-[calc(71.4*var(--u))] left-[calc(708*var(--u))] hidden w-[calc(277*var(--u))] grid-cols-[calc(133*var(--u))_calc(133*var(--u))] gap-x-[calc(11*var(--u))] gap-y-[calc(4*var(--u))] md:grid"
                />
            </header>

            <CaseGallery rows={rows} alt={alt} aside={aside} />

            <MetaList
                rows={meta}
                className="order-4 mx-[calc(8*var(--u))] mt-[calc(28*var(--u))] grid grid-cols-2 gap-x-[calc(16*var(--u))] gap-y-[calc(8*var(--u))] md:hidden"
            />

            <div className="order-5">
                <NextProject previous={previous} next={next} />
            </div>

            <p
                className="pointer-events-none fixed right-[calc(12*var(--u))] bottom-[calc(16*var(--u))] z-30 flex items-center justify-center font-serif text-[calc(18*var(--u))] leading-none font-normal tracking-normal text-white italic"
                style={{
                    width: 'calc(89 * var(--u))',
                    height: 'calc(45 * var(--u))',
                    borderRadius: '999px',
                    background: '#858585',
                }}
            >
                {index} {ofLabel} {total}
            </p>
        </article>
    )
}
