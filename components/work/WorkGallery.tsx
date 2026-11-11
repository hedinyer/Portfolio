import Image from 'next/image'
import { useTranslations } from 'next-intl'
import type { CSSProperties } from 'react'
import type { Media, ProjectCategory } from '@/content/projects'
import { Link } from '@/i18n/navigation'

const COLUMN_COUNT = 3
const MIN_RATIO = 0.74
const MAX_RATIO = 0.87

/**
 * Reference frames sit in this portrait band. Every current cover is landscape,
 * so a hard clamp would pin them all at 0.87 and flatten the masonry.
 */
const PORTRAIT_BAND = [0.744, 0.839, 0.78, 0.82, 0.742, 0.837] as const

export type WorkTile = {
    slug: string
    title: string
    category: string
    categoryKey: ProjectCategory
    alt: string
    cover: Media
    hover: Media | null
}

type PlacedTile = WorkTile & {
    index: number
    position: number
}

function frameRatio(cover: Media, index: number) {
    const raw = cover.width / Math.max(cover.height, 1)
    if (raw >= MIN_RATIO && raw <= MAX_RATIO) return raw
    return PORTRAIT_BAND[index % PORTRAIT_BAND.length]
}

function groupByCategory(items: WorkTile[]) {
    const groups: { key: ProjectCategory; items: PlacedTile[] }[] = []

    items.forEach((item, index) => {
        const current = groups.find((group) => group.key === item.categoryKey)
        const placed: PlacedTile = { ...item, index, position: 0 }
        if (!current) {
            placed.position = 0
            groups.push({ key: item.categoryKey, items: [placed] })
            return
        }
        placed.position = current.items.length
        current.items.push(placed)
    })

    return groups
}

function columnsOf(items: PlacedTile[]) {
    const columns: PlacedTile[][] = Array.from({ length: COLUMN_COUNT }, () => [])
    items.forEach((item, position) => {
        columns[position % COLUMN_COUNT].push(item)
    })
    return columns
}

function sectionLabel(
    t: ReturnType<typeof useTranslations<'work'>>,
    key: ProjectCategory,
    fallback: string,
) {
    if (key === 'identity' || key === 'illustration' || key === 'ux') return t(`filters.${key}`)
    return fallback
}

function WorkCard({ item, priority }: { item: PlacedTile; priority: boolean }) {
    const ratio = frameRatio(item.cover, item.index)

    return (
        <Link
            href={`/work/${item.slug}`}
            data-cursor="view"
            style={{ '--i': item.position } as CSSProperties}
            className="group block w-full min-w-0 cursor-pointer max-md:[order:var(--i)]"
        >
            <div
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: ratio, viewTransitionName: `work-${item.slug}` }}
            >
                <Image
                    src={item.cover.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 767px) calc(100vw * 304 / 320), calc(328 * min(100vw, 3600px) / 1024)"
                    priority={priority}
                    placeholder="blur"
                    blurDataURL={item.cover.blurDataURL}
                    draggable={false}
                    className="object-cover"
                />
                {item.hover ? (
                    <Image
                        src={item.hover.src}
                        alt=""
                        fill
                        sizes="(max-width: 767px) calc(100vw * 304 / 320), calc(328 * min(100vw, 3600px) / 1024)"
                        placeholder="blur"
                        blurDataURL={item.hover.blurDataURL}
                        draggable={false}
                        aria-hidden
                        className="object-cover opacity-0 transition-opacity duration-200 ease-[ease-in-out] max-md:hidden md:group-hover:opacity-100"
                    />
                ) : null}
            </div>
            <p className="t-caption mt-[calc(4*var(--u))]">
                {item.title}. {item.category}.
            </p>
        </Link>
    )
}

export function WorkGallery({ items }: { items: WorkTile[] }) {
    const t = useTranslations('work')
    const groups = groupByCategory(items)

    return (
        <div>
            <h1 className="sr-only">{t('title')}</h1>
            {groups.map((group, groupIndex) => (
                <section
                    key={group.key}
                    aria-labelledby={`work-group-${group.key}`}
                    className={groupIndex === 0 ? undefined : 'mt-[calc(48*var(--u))]'}
                >
                    <h2 id={`work-group-${group.key}`} className="t-label mb-[calc(8*var(--u))]">
                        {sectionLabel(t, group.key, group.items[0]?.category ?? group.key)}
                    </h2>
                    <div className="flex flex-col gap-[calc(40*var(--u))] md:flex-row md:items-start md:gap-[calc(9*var(--u))]">
                        {columnsOf(group.items).map((column, columnIndex) => (
                            <div
                                key={columnIndex}
                                className="contents md:flex md:min-w-0 md:flex-1 md:flex-col md:gap-[calc(55*var(--u))]"
                            >
                                {column.map((item) => (
                                    <WorkCard key={item.slug} item={item} priority={item.index < 3} />
                                ))}
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    )
}
