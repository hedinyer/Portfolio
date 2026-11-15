import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { archive, type Media, type Project } from '@/content/projects'
import { ArchivePiece } from './ArchivePiece'
import styles from './archive.module.css'

const COL_X = [11, 262, 515, 768] as const
const COLUMN_WIDTH = 245
const GAP = 48
const CAPTION_BLOCK = 15
const PHONE_X = 9
const PHONE_WIDTH = 302
const PHONE_GAP = 48
const FRAME_RATIO = 3 / 4

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
}

function round(value: number) {
    return Math.round(value * 100) / 100
}

function isVideo(src: string) {
    return /\.(mp4|webm|mov)$/i.test(src)
}

function placePieces(items: readonly Project[]) {
    const cursors = COL_X.map(() => 0)
    let height = 0
    const imageHeight = COLUMN_WIDTH / FRAME_RATIO

    const pieces: PlacedPiece[] = items.map((item, index) => {
        const column = index % COL_X.length
        const y = cursors[column] ?? 0
        const bottom = y + imageHeight + CAPTION_BLOCK
        cursors[column] = y + imageHeight + GAP
        height = Math.max(height, bottom)

        return {
            item,
            x: COL_X[column] ?? COL_X[0],
            y: round(y),
            width: COLUMN_WIDTH,
            phoneX: PHONE_X,
            phoneWidth: PHONE_WIDTH,
            phoneGap: index === items.length - 1 ? 0 : PHONE_GAP,
        }
    })

    return { pieces, height: round(height) }
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
    const placed = placePieces(archive)
    const boardStyle: BoardStyle = { '--h': placed.height }

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
            <div className={styles.board} style={boardStyle}>
                {placed.pieces.map((piece, index) => {
                    const title = t(`items.${piece.item.slug}.title`)
                    const pieceStyle: PieceStyle = {
                        '--x': piece.x,
                        '--y': piece.y,
                        '--w': piece.width,
                        '--mx': piece.phoneX,
                        '--mw': piece.phoneWidth,
                        '--mgap': piece.phoneGap,
                    }

                    return (
                        <ArchivePiece
                            key={piece.item.slug}
                            style={pieceStyle}
                            delay={Math.min(index * 30, 150)}
                            eager={index < 4}
                        >
                            <div className={styles.frame} style={{ aspectRatio: '3 / 4' }}>
                                <PieceMedia media={piece.item.cover} title={title} priority={index < 2} />
                            </div>
                            <figcaption className={`t-caption ${styles.caption}`}>{title}.</figcaption>
                        </ArchivePiece>
                    )
                })}
            </div>
        </main>
    )
}
