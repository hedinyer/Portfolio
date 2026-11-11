import { cases, type Media } from '@/content/projects'

export const desktopTravel = 2734
export const phoneTravel = 2339

type Axis = {
    w: number
    h: number
    x: number
    y: number
}

export type StripFrame = {
    media: Media
    imageIndex: number
    phone: Axis
    desktop: Axis & { opacity?: number }
}

const desktopGap = 37.5
const phoneGap = 5.5

const desktopBoxes: Array<Omit<Axis, 'x'> & { opacity?: number }> = [
    { w: 301, h: 190, y: -111 },
    { w: 271, h: 302, y: -54 },
    { w: 242, h: 252, y: -78 },
    { w: 206, h: 327, y: -40 },
    { w: 237, h: 309, y: -49, opacity: 0.85 },
    { w: 208, h: 284, y: -62 },
    { w: 330, h: 190, y: -109 },
    { w: 262, h: 261, y: -73 },
    { w: 191, h: 235, y: -86 },
    { w: 255, h: 310, y: -49 },
    { w: 232, h: 231, y: -89 },
    { w: 231, h: 313, y: -48 },
    { w: 319, h: 206, y: -101 },
]

const phoneBoxes: Array<Omit<Axis, 'x'>> = [
    { w: 201, h: 243, y: 102 },
    { w: 246, h: 172, y: 135.7 },
    { w: 181, h: 255, y: 121.5 },
    { w: 193, h: 218, y: 144 },
    { w: 161, h: 251, y: 138.7 },
    { w: 155, h: 232, y: 131 },
    { w: 306, h: 191, y: 103.2 },
    { w: 205, h: 225, y: 124.5 },
    { w: 149, h: 203, y: 116.8 },
    { w: 179, h: 239, y: 138.7 },
    { w: 183, h: 201, y: 115 },
    { w: 166, h: 246, y: 139.3 },
    { w: 252, h: 178, y: 107.9 },
]

/** Landscape boxes get wide frames; nearer-square boxes get the less-wide stills. */
const picks: Array<[string, number]> = [
    ['seres', 0],
    ['nua', 0],
    ['nua', 2],
    ['nua', 4],
    ['nua', 6],
    ['nua', 8],
    ['geoparque', 0],
    ['babilio', 1],
    ['nua', 10],
    ['nua', 12],
    ['calendario', 1],
    ['nua', 14],
    ['geoparque-web', 0],
]

function offsets(widths: number[], start: number, gap: number) {
    const xs: number[] = []
    let x = start
    for (const width of widths) {
        xs.push(x)
        x += width + gap
    }
    return xs
}

function pick(slug: string, index: number): Media {
    const project = cases.find((item) => item.slug === slug)
    const media = project?.gallery[index]
    if (!media) {
        throw new Error(`Missing home image ${slug}#${index}`)
    }
    return media
}

const desktopX = offsets(
    desktopBoxes.map((box) => box.w),
    12,
    desktopGap,
)
const phoneX = offsets(
    phoneBoxes.map((box) => box.w),
    8,
    phoneGap,
)

export const homeFrames: StripFrame[] = picks.map(([slug, imageIndex], index) => ({
    media: pick(slug, imageIndex),
    imageIndex,
    phone: { ...phoneBoxes[index], x: phoneX[index] },
    desktop: { ...desktopBoxes[index], x: desktopX[index] },
}))

function num(value: number) {
    return String(Math.round(value * 100) / 100)
}

export function homeStripCss() {
    const phone = homeFrames
        .map((frame, index) => {
            const half = frame.phone.h / 2
            return `.home-shot-${index}{width:calc(${num(frame.phone.w)} * var(--u));height:calc(${num(frame.phone.h)} * var(--u));left:calc(${num(frame.phone.x)} * var(--u));top:max(calc(50vh + ${num(frame.phone.y)} * var(--u)),calc(var(--home-copy-bottom, 0px) + ${num(half)} * var(--u) + 18 * var(--u)));}`
        })
        .join('')

    const desktop = homeFrames
        .map((frame, index) => {
            const opacity = frame.desktop.opacity ?? 1
            return `.home-shot-${index}{width:calc(${num(frame.desktop.w)} * var(--u));height:calc(${num(frame.desktop.h)} * var(--u));left:calc(${num(frame.desktop.x)} * var(--u));top:calc(50vh + ${num(frame.desktop.y)} * var(--u));opacity:${opacity};}`
        })
        .join('')

    return `@keyframes home-counter-in{from{opacity:0}}.home-counter{animation:home-counter-in 0.8s ease both}.home-shot{pointer-events:auto;touch-action:pan-y;cursor:url("/cursor/monogram.svg") 0 0,auto}${phone}@media (min-width:768px){${desktop}}`
}
