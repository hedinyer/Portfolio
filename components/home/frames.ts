import { cases, homeImages, type Media } from '@/content/projects'

/** Home strip scale; keeps every frame's proportions. */
const SCALE = 0.84

function scale(value: number) {
    return Math.round(value * SCALE * 100) / 100
}

type Axis = {
    w: number
    h: number
    x: number
    y: number
}

export type StripFrame = {
    media: Media
    imageIndex: number
    slug: string | null
    hover?: Media | null
    hoverPosition?: string
    phone: Axis
    desktop: Axis & { opacity?: number }
}

const desktopGap = scale(37.5)
const phoneGap = scale(5.5)
const desktopStart = scale(12)
const phoneStart = scale(8)

const desktopBoxes: Array<Omit<Axis, 'x'> & { opacity?: number }> = [
    { w: 242, h: 252, y: -36 },
    { w: 271, h: 302, y: -18 },
    { w: 242, h: 252, y: -36 },
    { w: 206, h: 327, y: -8 },
    { w: 237, h: 309, y: -14, opacity: 0.85 },
    { w: 216, h: 288, y: -18 },
].map(({ w, h, y, ...rest }) => ({ w: scale(w), h: scale(h), y: scale(y), ...rest }))

/** Phone keeps desktop aspect ratios; only width changes. Tops share one mobile baseline. */
const phoneLayouts: Array<{ w: number; y: number }> = [
    { w: 181, y: 0 },
    { w: 246, y: 0 },
    { w: 181, y: 0 },
    { w: 193, y: 0 },
    { w: 161, y: 0 },
    { w: 150, y: 0 },
]

const phoneBoxes: Array<Omit<Axis, 'x'>> = phoneLayouts.map((layout, index) => {
    const desktop = desktopBoxes[index]
    const width = scale(layout.w)
    const ratio = desktop.w / desktop.h
    return {
        w: width,
        h: Math.round((width / ratio) * 100) / 100,
        y: scale(layout.y),
    }
})

function offsets(widths: number[], start: number, gap: number) {
    const xs: number[] = []
    let x = start
    for (const width of widths) {
        xs.push(x)
        x += width + gap
    }
    return xs
}

function stripTravel(widths: number[], start: number, gap: number, viewport: number, endPad = 0) {
    // Positions are in design units; the canvas stays 320 / 1024 wide via --u.
    const total =
        start + widths.reduce((sum, width, index) => sum + width + (index < widths.length - 1 ? gap : 0), 0)
    return Math.round(Math.max(0, total - viewport + endPad) * 100) / 100
}

/** One full loop: all frames + a trailing gap so the next copy seats flush. */
function stripCycle(widths: number[], gap: number) {
    return Math.round((widths.reduce((sum, width) => sum + width, 0) + widths.length * gap) * 100) / 100
}

function caseMedia(slug: string, index: number): Media {
    const project = cases.find((item) => item.slug === slug)
    const media = project?.gallery[index]
    if (!media) {
        throw new Error(`Missing home image ${slug}#${index}`)
    }
    return media
}

const homeSecond = homeImages[1]
if (!homeSecond) {
    throw new Error('Missing home strip image')
}

/** Landscape boxes get wide frames; nearer-square boxes get the less-wide stills. */
const picks: Array<{
    media: Media
    slug: string | null
    imageIndex: number
    hover?: Media | null
    hoverPosition?: string
}> = [
    {
        media: caseMedia('magic-decisions', 0),
        slug: 'magic-decisions',
        imageIndex: 0,
        hover: caseMedia('magic-decisions', 15),
        hoverPosition: 'center',
    },
    {
        media: caseMedia('geoparque-web', 8),
        slug: 'geoparque-web',
        imageIndex: -1,
        hover: homeSecond,
        hoverPosition: 'center',
    },
    {
        media: caseMedia('nua', 0),
        slug: 'nua',
        imageIndex: 0,
        hover: caseMedia('nua', 15),
        hoverPosition: 'center',
    },
    {
        media: caseMedia('andrea-amarillo', 0),
        slug: 'andrea-amarillo',
        imageIndex: 0,
        hover: caseMedia('andrea-amarillo', 14),
        hoverPosition: 'center',
    },
    {
        media: caseMedia('cortteza', 28),
        slug: 'cortteza',
        imageIndex: 28,
        hover: caseMedia('cortteza', 29),
        hoverPosition: 'center',
    },
    {
        media: caseMedia('seres', 13),
        slug: 'seres',
        imageIndex: 13,
        hover: caseMedia('seres', 7),
        hoverPosition: 'center',
    },
]

const desktopWidths = desktopBoxes.map((box) => box.w)
const phoneWidths = phoneBoxes.map((box) => box.w)
const desktopX = offsets(desktopWidths, desktopStart, desktopGap)
const phoneX = offsets(phoneWidths, phoneStart, phoneGap)

export const desktopTravel = stripTravel(desktopWidths, desktopStart, desktopGap, 1024, desktopStart)
export const phoneTravel = stripTravel(phoneWidths, phoneStart, phoneGap, 320, phoneStart)
export const desktopCycle = stripCycle(desktopWidths, desktopGap)
export const phoneCycle = stripCycle(phoneWidths, phoneGap)

export const homeFrames: StripFrame[] = picks.map((pick, index) => ({
    media: pick.media,
    imageIndex: pick.imageIndex,
    slug: pick.slug,
    hover: pick.hover ?? null,
    hoverPosition: pick.hoverPosition,
    phone: { ...phoneBoxes[index], x: phoneX[index] },
    desktop: { ...desktopBoxes[index], x: desktopX[index] },
}))

function num(value: number) {
    return String(Math.round(value * 100) / 100)
}

export function homeStripCss() {
    const phone = homeFrames
        .map((frame, index) => {
            const base = `.home-shot-${index}{width:calc(${num(frame.phone.w)} * var(--u));height:calc(${num(frame.phone.h)} * var(--u));left:calc(${num(frame.phone.x)} * var(--u));top:calc(var(--home-copy-bottom, 0px) + 18 * var(--u));}`
            const loop = `.home-shot-${index}[data-replica="1"]{left:calc(${num(frame.phone.x + phoneCycle)} * var(--u));}`
            return base + loop
        })
        .join('')

    const desktop = homeFrames
        .map((frame, index) => {
            const opacity = frame.desktop.opacity ?? 1
            // Pre-center with top (not translateY) so perspective/rotateY does not pull the crop up.
            const top = frame.desktop.y - frame.desktop.h / 2
            const base = `.home-shot-${index}{width:calc(${num(frame.desktop.w)} * var(--u));height:calc(${num(frame.desktop.h)} * var(--u));left:calc(${num(frame.desktop.x)} * var(--u));top:calc(50vh + ${num(top)} * var(--u));opacity:${opacity};}`
            const loop = `.home-shot-${index}[data-replica="1"]{left:calc(${num(frame.desktop.x + desktopCycle)} * var(--u));}`
            return base + loop
        })
        .join('')

    return `@keyframes home-counter-in{from{opacity:0}}.home-counter{animation:home-counter-in 0.8s ease both}.home-shot{pointer-events:auto;touch-action:pan-y;cursor:url("/cursor/monogram.svg") 0 0,auto;transform-origin:center center;backface-visibility:hidden;will-change:transform,filter;box-shadow:0 18px 40px rgba(0,0,0,0.08),0 4px 12px rgba(0,0,0,0.04)}${phone}@media (min-width:768px){${desktop}}`
}
