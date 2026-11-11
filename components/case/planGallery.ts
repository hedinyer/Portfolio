import type { Media } from '@/content/projects'

export type RightFrame = 'wide' | 'portrait' | 'portrait-narrow'

export type CaseRow =
    | { kind: 'full'; items: [Media]; fit: 'band' | 'natural' }
    | { kind: 'right'; items: [Media]; frame: RightFrame }
    | { kind: 'three'; items: [Media, Media, Media] }
    | { kind: 'two'; items: [Media, Media] }
    | { kind: 'edges'; items: [Media, Media] }
    | { kind: 'asymmetric'; items: [Media, Media] }

function ratioOf(media: Media) {
    return media.width / Math.max(1, media.height)
}

function isPortrait(media: Media) {
    return ratioOf(media) < 0.95
}

function isSquarish(media: Media) {
    return ratioOf(media) >= 0.95 && ratioOf(media) < 1.3
}

function isLandscape(media: Media) {
    return ratioOf(media) >= 1.3
}

export function clampedRatio(media: Media, min: number, max: number) {
    return Math.min(max, Math.max(min, ratioOf(media)))
}

/** Hero band: source ratio clamped to the reference full-width frame. */
export function heroRatio(media: Media) {
    return clampedRatio(media, 1.68, 2.05)
}

/**
 * Rows after the hero.
 * Portrait runs become 3-up, then edge pairs / 2-up.
 * Landscape runs cycle right-single, full-bleed, asymmetric pair, full, full.
 * Near-square pieces use 3-up / 2-up, or a natural full-bleed when alone.
 */
export function planGallery(rest: Media[]): CaseRow[] {
    const queue = rest.slice()
    const rows: CaseRow[] = []
    let landscapeStep = 0
    let portraitPairs = 0
    let portraitSingles = 0

    const take = (count: number) => queue.splice(0, count)

    const run = (test: (media: Media) => boolean) => {
        let count = 0
        while (queue[count] && test(queue[count])) count += 1
        return count
    }

    while (queue.length > 0) {
        const current = queue[0]

        if (isPortrait(current)) {
            const count = run(isPortrait)
            if (count >= 3) {
                const [a, b, c] = take(3) as [Media, Media, Media]
                rows.push({ kind: 'three', items: [a, b, c] })
                continue
            }
            if (count === 2) {
                const [a, b] = take(2) as [Media, Media]
                const kind = portraitPairs % 2 === 0 ? 'edges' : 'two'
                portraitPairs += 1
                rows.push({ kind, items: [a, b] })
                continue
            }
            const [item] = take(1) as [Media]
            const frame = portraitSingles % 2 === 0 ? 'portrait' : 'portrait-narrow'
            portraitSingles += 1
            rows.push({ kind: 'right', items: [item], frame })
            continue
        }

        if (isSquarish(current)) {
            const count = run(isSquarish)
            if (count >= 3) {
                const [a, b, c] = take(3) as [Media, Media, Media]
                rows.push({ kind: 'three', items: [a, b, c] })
                continue
            }
            if (count === 2) {
                const [a, b] = take(2) as [Media, Media]
                rows.push({ kind: 'two', items: [a, b] })
                continue
            }
            const [item] = take(1) as [Media]
            rows.push({ kind: 'full', items: [item], fit: 'natural' })
            continue
        }

        const step = landscapeStep % 5
        landscapeStep += 1
        if (step === 0) {
            const [item] = take(1) as [Media]
            rows.push({ kind: 'right', items: [item], frame: 'wide' })
            continue
        }
        if (step === 2 && queue.length >= 2 && isLandscape(queue[1])) {
            const [a, b] = take(2) as [Media, Media]
            rows.push({ kind: 'asymmetric', items: [a, b] })
            continue
        }
        const [item] = take(1) as [Media]
        rows.push({ kind: 'full', items: [item], fit: 'band' })
    }

    return rows
}
