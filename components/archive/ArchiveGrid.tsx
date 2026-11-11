import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { archive, type Media, type Project, type ProjectCategory } from '@/content/projects'
import styles from './archive.module.css'

const COL_X = [11, 262, 515, 768] as const
const COL_OFFSET = [0, 120, 40, 260] as const
const GAPS = [45, 60, 90, 52] as const
const COLUMN_WIDTH = 245
const CAPTION_BLOCK = 15
const PHONE_X = 9
const PHONE_FULL = 302

type ArchiveCategory = 'logo' | 'illustration' | 'social'

type PieceStyle = React.CSSProperties & {
    '--x': number
    '--y': number
    '--w': number
    '--mx': number
    '--mw': number
    '--mgap': number
}

type BoardStyle = React.CSSProperties & {
    '--h': number
}

type PlacedPiece = {
    item: Project
    x: number
    y: number
    width: number
    phoneX: number
    phoneWidth: number
    phoneGap: number
    caption: boolean
}

function isArchiveCategory(category: ProjectCategory): category is ArchiveCategory {
    return category === 'logo' || category === 'illustration' || category === 'social'
}

function round(value: number) {
    return Math.round(value * 100) / 100
}

function isVideo(src: string) {
    return /\.(mp4|webm|mov)$/i.test(src)
}

function pieceWidth(index: number) {
    if (index % 6 === 2) return { width: 140, offset: COLUMN_WIDTH - 140 }
    if (index % 6 === 4) return { width: 186, offset: 0 }
    return { width: COLUMN_WIDTH, offset: 0 }
}

function phoneFrame(index: number) {
    if (index % 4 === 1) {
        const width = 242
        return { width, x: PHONE_X + (PHONE_FULL - width) }
    }
    if (index % 4 === 2) {
        const width = 222
        return { width, x: PHONE_X }
    }
    if (index % 4 === 3) {
        const width = 171
        return { width, x: PHONE_X + (PHONE_FULL - width) }
    }
    return { width: PHONE_FULL, x: PHONE_X }
}

function placeGroup(items: Project[]) {
    const cursors: number[] = [...COL_OFFSET]
    let height = 0

    const pieces: PlacedPiece[] = items.map((item, index) => {
        const column = index % COL_X.length
        const { width, offset } = pieceWidth(index)
        const caption = index % 4 === 0
        const y = cursors[column] ?? 0
        const imageHeight = width * (item.cover.height / item.cover.width)
        const gap = GAPS[index % GAPS.length] ?? GAPS[0]
        const bottom = y + imageHeight + (caption ? CAPTION_BLOCK : 0)
        cursors[column] = y + imageHeight + gap
        height = Math.max(height, bottom)

        const phone = phoneFrame(index)

        return {
            item,
            x: round((COL_X[column] ?? COL_X[0]) + offset),
            y: round(y),
            width,
            phoneX: phone.x,
            phoneWidth: phone.width,
            phoneGap: index === items.length - 1 ? 0 : caption ? 7 : 8,
            caption,
        }
    })

    return { pieces, height: round(height) }
}

function groupArchive(items: readonly Project[]) {
    const groups: { category: ArchiveCategory; items: Project[] }[] = []

    for (const item of items) {
        if (!isArchiveCategory(item.category)) continue
        const current = groups[groups.length - 1]
        if (!current || current.category !== item.category) {
            groups.push({ category: item.category, items: [item] })
        } else {
            current.items.push(item)
        }
    }

    return groups
}

function PieceMedia({ media, title, priority }: { media: Media; title: string; priority: boolean }) {
    if (isVideo(media.src)) {
        return (
            <video
                src={media.src}
                autoPlay
                muted
                loop
                playsInline
                aria-label={title}
                className={styles.media}
            />
        )
    }

    return (
        <Image
            src={media.src}
            alt={title}
            fill
            sizes="(max-width: 767px) 94vw, 24vw"
            placeholder="blur"
            blurDataURL={media.blurDataURL}
            priority={priority}
            draggable={false}
            className={styles.media}
        />
    )
}

export async function ArchiveGrid() {
    const t = await getTranslations('archive')
    const groups = groupArchive(archive)

    const labelFor = (category: ArchiveCategory) => {
        if (category === 'logo') return t('filters.logo')
        if (category === 'illustration') return t('filters.illustration')
        return t('filters.social')
    }

    return (
        <main
            className={`page-inset ${styles.page}`}
            style={{
                paddingLeft: 0,
                paddingRight: 0,
                paddingBottom: 'calc(100 * var(--u))',
            }}
        >
            <h1 className="sr-only">{t('title')}</h1>
            {groups.map((group, groupIndex) => {
                const placed = placeGroup(group.items)
                const boardStyle: BoardStyle = { '--h': placed.height }

                return (
                    <section key={group.category} className={styles.section} aria-labelledby={`archive-${group.category}`}>
                        <h2 id={`archive-${group.category}`} className={`t-label ${styles.label}`}>
                            {labelFor(group.category)}
                        </h2>
                        <div className={styles.board} style={boardStyle}>
                            {placed.pieces.map((piece, index) => {
                                const title = t(`items.${piece.item.slug}.title`)
                                const category = t(`items.${piece.item.slug}.category`)
                                const pieceStyle: PieceStyle = {
                                    '--x': piece.x,
                                    '--y': piece.y,
                                    '--w': piece.width,
                                    '--mx': piece.phoneX,
                                    '--mw': piece.phoneWidth,
                                    '--mgap': piece.phoneGap,
                                }

                                return (
                                    <figure key={piece.item.slug} className={styles.piece} style={pieceStyle}>
                                        <div
                                            className={styles.frame}
                                            style={{ aspectRatio: `${piece.item.cover.width} / ${piece.item.cover.height}` }}
                                        >
                                            <PieceMedia
                                                media={piece.item.cover}
                                                title={title}
                                                priority={groupIndex === 0 && index < 2}
                                            />
                                        </div>
                                        {piece.caption ? (
                                            <figcaption className={`t-caption ${styles.caption}`}>
                                                {title}. {category}.
                                            </figcaption>
                                        ) : null}
                                    </figure>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
        </main>
    )
}
