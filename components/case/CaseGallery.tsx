import type { Media } from '@/content/projects'
import { FadeIn } from './FadeIn'
import { CaseMedia } from './CaseMedia'
import { clampedRatio, type CaseRow } from './planGallery'

function Frame({
    media,
    alt,
    ratio,
    sizes,
    className,
}: {
    media: Media
    alt: string
    ratio: number
    sizes: string
    className: string
}) {
    return (
        <figure className={`relative overflow-hidden ${className}`} style={{ aspectRatio: String(ratio) }}>
            <CaseMedia media={media} alt={alt} sizes={sizes} />
        </figure>
    )
}

function RightRow({ row, alt, aside }: { row: Extract<CaseRow, { kind: 'right' }>; alt: string; aside: string | null }) {
    const width =
        row.frame === 'portrait'
            ? 'md:w-[calc(476*var(--u))]'
            : row.frame === 'portrait-narrow'
              ? 'md:w-[calc(352*var(--u))]'
              : 'md:w-[calc(668*var(--u))]'
    const ratio = row.frame === 'portrait' ? 476 / 513 : row.frame === 'portrait-narrow' ? 352 / 415 : 668 / 377

    return (
        <div className="relative">
            {aside ? (
                <FadeIn className="mb-[calc(8*var(--u))] md:absolute md:top-0 md:left-[calc(1*var(--u))] md:mb-0 md:w-[calc(310*var(--u))]">
                    <p className="t-text">{aside}</p>
                </FadeIn>
            ) : null}
            <Frame
                media={row.items[0]}
                alt={alt}
                ratio={ratio}
                sizes="(max-width: 767px) 95vw, 66vw"
                className={`w-full md:ml-auto ${width}`}
            />
        </div>
    )
}

export function CaseGallery({ rows, alt, aside }: { rows: CaseRow[]; alt: string; aside: string | null }) {
    const asideIndex = aside ? rows.findIndex((row) => row.kind === 'right') : -1
    const starts = rows.map((_, index) => 2 + rows.slice(0, index).reduce((sum, row) => sum + row.items.length, 0))

    return (
        <div className="order-3 mt-[calc(16*var(--u))] flex flex-col gap-[calc(8*var(--u))] px-[calc(8*var(--u))] md:mt-[calc(8*var(--u))] md:px-[calc(11*var(--u))]">
            {rows.map((row, rowIndex) => {
                const start = starts[rowIndex]
                const label = (offset: number) => `${alt} ${start + offset}`
                const showAside = rowIndex === asideIndex ? aside : null

                if (row.kind === 'full') {
                    const ratio = row.fit === 'natural' ? row.items[0].width / Math.max(1, row.items[0].height) : clampedRatio(row.items[0], 1.68, 2.05)
                    return (
                        <Frame
                            key={row.items[0].src}
                            media={row.items[0]}
                            alt={label(0)}
                            ratio={ratio}
                            sizes="(max-width: 767px) 95vw, 98vw"
                            className="w-full"
                        />
                    )
                }

                if (row.kind === 'right') {
                    return <RightRow key={row.items[0].src} row={row} alt={label(0)} aside={showAside} />
                }

                if (row.kind === 'three') {
                    return (
                        <div key={row.items[0].src} className="grid grid-cols-1 gap-[calc(8*var(--u))] md:grid-cols-3">
                            {row.items.map((media, index) => (
                                <Frame
                                    key={media.src}
                                    media={media}
                                    alt={label(index)}
                                    ratio={328 / 410}
                                    sizes="(max-width: 767px) 95vw, 32vw"
                                    className="w-full"
                                />
                            ))}
                        </div>
                    )
                }

                if (row.kind === 'two') {
                    return (
                        <div key={row.items[0].src} className="grid grid-cols-2 gap-[calc(8*var(--u))]">
                            {row.items.map((media, index) => (
                                <Frame
                                    key={media.src}
                                    media={media}
                                    alt={label(index)}
                                    ratio={497 / 565}
                                    sizes="(max-width: 767px) 46vw, 49vw"
                                    className="w-full"
                                />
                            ))}
                        </div>
                    )
                }

                if (row.kind === 'edges') {
                    return (
                        <div key={row.items[0].src} className="grid grid-cols-2 gap-[calc(8*var(--u))] md:flex md:justify-between md:gap-0">
                            {row.items.map((media, index) => (
                                <Frame
                                    key={media.src}
                                    media={media}
                                    alt={label(index)}
                                    ratio={300 / 375}
                                    sizes="(max-width: 767px) 46vw, 30vw"
                                    className="w-full md:w-[calc(300*var(--u))]"
                                />
                            ))}
                        </div>
                    )
                }

                return (
                    <div
                        key={row.items[0].src}
                        className="flex flex-col gap-[calc(8*var(--u))] md:ml-[calc(73*var(--u))] md:flex-row"
                    >
                        {row.items.map((media, index) => (
                            <Frame
                                key={media.src}
                                media={media}
                                alt={label(index)}
                                ratio={index === 0 ? 429 / 270 : 493 / 300}
                                sizes="(max-width: 767px) 95vw, 48vw"
                                className={index === 0 ? 'w-full md:w-[calc(429*var(--u))]' : 'w-full md:w-[calc(493*var(--u))]'}
                            />
                        ))}
                    </div>
                )
            })}
        </div>
    )
}
