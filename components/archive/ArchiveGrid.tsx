'use client'

import { useTranslations } from 'next-intl'
import gsap from 'gsap'
import { motion, AnimatePresence } from 'motion/react'
import Image from 'next/image'
import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from 'react'
import { archive, imageSpan, type Media, type Project } from '@/content/projects'
import { useReducedMotion } from '@/components/motion'
import { ArchiveLightbox } from './ArchiveLightbox'

const filters = ['all', 'logo', 'illustration', 'social'] as const

type ArchiveFilter = (typeof filters)[number]

type Selection = {
    slug: string
    imageIndex: number
}

const PREVIEW_EASE = 'power3.out'
const PREVIEW_LAG = 0.65

function stepSelection(items: readonly Project[], current: Selection, direction: 1 | -1): Selection {
    const itemIndex = items.findIndex((item) => item.slug === current.slug)
    const safeIndex = itemIndex < 0 ? 0 : itemIndex
    const item = items[safeIndex]
    if (!item || items.length === 0) return current

    const imageIndex = current.imageIndex + direction
    if (imageIndex >= 0 && imageIndex < item.gallery.length) {
        return { slug: item.slug, imageIndex }
    }

    const nextIndex = (safeIndex + direction + items.length) % items.length
    const nextItem = items[nextIndex]
    if (!nextItem) return current

    return {
        slug: nextItem.slug,
        imageIndex: direction === 1 ? 0 : Math.max(0, nextItem.gallery.length - 1),
    }
}

function spanClass(span: ReturnType<typeof imageSpan>) {
    if (span === 'wide') return 'md:col-span-2'
    if (span === 'tall') return 'md:row-span-2'
    return ''
}

function aspectClass(span: ReturnType<typeof imageSpan>) {
    if (span === 'wide') return 'aspect-[4/3]'
    if (span === 'tall') return 'aspect-[3/4]'
    return 'aspect-square'
}

function previewOffset(x: number, y: number, node: HTMLElement) {
    const gap = 28
    const width = node.offsetWidth || 208
    const height = node.offsetHeight || 148
    const flipX = x + gap + width > window.innerWidth - 8
    const flipY = y + gap + height > window.innerHeight - 8

    return {
        x: flipX ? Math.max(8, x - gap - width) : x + gap,
        y: flipY ? Math.max(8, y - gap - height) : y + gap,
    }
}

export function ArchiveGrid() {
    const t = useTranslations('archive')
    const reduced = useReducedMotion()
    const [filter, setFilter] = useState<ArchiveFilter>('all')
    const [selection, setSelection] = useState<Selection | null>(null)
    const [trigger, setTrigger] = useState<HTMLButtonElement | null>(null)
    const [preview, setPreview] = useState<Media | null>(null)
    const previewRef = useRef<HTMLDivElement>(null)
    const xToRef = useRef<ReturnType<typeof gsap.quickTo> | null>(null)
    const yToRef = useRef<ReturnType<typeof gsap.quickTo> | null>(null)
    const canFollow = useRef(false)
    const point = useRef({ x: 0, y: 0 })

    const items = filter === 'all' ? archive : archive.filter((item) => item.category === filter)
    const selected = selection ? (items.find((item) => item.slug === selection.slug) ?? null) : null

    function place(x: number, y: number, jump: boolean) {
        const node = previewRef.current
        if (!node || !canFollow.current) return
        const next = previewOffset(x, y, node)
        if (jump || !xToRef.current || !yToRef.current) {
            gsap.set(node, { x: next.x, y: next.y })
            xToRef.current = gsap.quickTo(node, 'x', { duration: PREVIEW_LAG, ease: PREVIEW_EASE })
            yToRef.current = gsap.quickTo(node, 'y', { duration: PREVIEW_LAG, ease: PREVIEW_EASE })
            return
        }
        xToRef.current(next.x)
        yToRef.current(next.y)
    }

    useEffect(() => {
        const node = previewRef.current
        const query = window.matchMedia('(hover: hover) and (pointer: fine)')

        const sync = () => {
            canFollow.current = query.matches && !reduced
            if (!node || !canFollow.current) {
                xToRef.current = null
                yToRef.current = null
                return
            }
            xToRef.current = gsap.quickTo(node, 'x', { duration: PREVIEW_LAG, ease: PREVIEW_EASE })
            yToRef.current = gsap.quickTo(node, 'y', { duration: PREVIEW_LAG, ease: PREVIEW_EASE })
        }

        sync()
        query.addEventListener('change', sync)
        return () => {
            query.removeEventListener('change', sync)
            canFollow.current = false
            xToRef.current = null
            yToRef.current = null
        }
    }, [reduced])

    useLayoutEffect(() => {
        if (!preview) return
        const node = previewRef.current
        if (!node || !canFollow.current) return
        const next = previewOffset(point.current.x, point.current.y, node)
        gsap.set(node, { x: next.x, y: next.y })
        xToRef.current = gsap.quickTo(node, 'x', { duration: PREVIEW_LAG, ease: PREVIEW_EASE })
        yToRef.current = gsap.quickTo(node, 'y', { duration: PREVIEW_LAG, ease: PREVIEW_EASE })
    }, [preview])

    function reveal(media: Media, x: number, y: number) {
        if (!canFollow.current || reduced || selection) return
        point.current = { x, y }
        setPreview((current) => (current?.src === media.src ? current : media))
        if (preview?.src === media.src) place(x, y, false)
    }

    function conceal(event: PointerEvent<HTMLButtonElement>) {
        const next = event.relatedTarget
        if (next instanceof Element && next.closest('[data-cursor="view"]')) return
        setPreview(null)
    }

    function openItem(slug: string, button: HTMLButtonElement) {
        setPreview(null)
        setTrigger(button)
        setSelection({ slug, imageIndex: 0 })
    }

    function step(direction: 1 | -1) {
        setSelection((current) => (current ? stepSelection(items, current, direction) : current))
    }

    return (
        <main className="page-inset">
            <header className="mb-8 flex flex-col gap-6 border-b border-line pb-6 md:mb-12 md:flex-row md:items-end md:justify-between">
                <h1 className="font-serif text-xl italic leading-none tracking-tight md:text-2xl">{t('title')}</h1>
                <div role="group" aria-label={t('title')} className="flex flex-wrap gap-x-5 gap-y-1">
                    {filters.map((key) => {
                        const pressed = filter === key
                        return (
                            <button
                                key={key}
                                type="button"
                                aria-pressed={pressed}
                                onClick={() => setFilter(key)}
                                className={`min-h-11 text-[11px] uppercase tracking-[0.16em] transition-colors duration-200 ${
                                    pressed ? 'underline decoration-1 underline-offset-4' : 'text-muted hover:text-foreground'
                                }`}
                            >
                                {key === 'all' ? t('all') : t(`filters.${key}`)}
                            </button>
                        )
                    })}
                </div>
            </header>

            <ul className="relative grid grid-cols-2 gap-x-3 gap-y-8 md:auto-rows-[minmax(14rem,20vw)] md:grid-cols-4 md:gap-x-5 md:gap-y-10">
                <AnimatePresence initial={false} mode="popLayout">
                    {items.map((item) => {
                        const span = imageSpan(item.cover)
                        const title = t(`items.${item.slug}.title`)
                        const category = t(`items.${item.slug}.category`)
                        const logo = item.category === 'logo'

                        return (
                            <motion.li
                                key={item.slug}
                                layout={reduced ? false : true}
                                initial={reduced ? false : { opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, transition: { duration: reduced ? 0 : 0.25 } }}
                                transition={
                                    reduced
                                        ? { duration: 0 }
                                        : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
                                }
                                className={`min-w-0 ${spanClass(span)}`}
                            >
                                <button
                                    type="button"
                                    data-cursor="view"
                                    aria-haspopup="dialog"
                                    className="group flex h-full w-full flex-col text-left"
                                    onClick={(event) => openItem(item.slug, event.currentTarget)}
                                    onPointerEnter={(event) => {
                                        if (event.pointerType === 'touch') return
                                        reveal(item.cover, event.clientX, event.clientY)
                                    }}
                                    onPointerMove={(event) => {
                                        if (event.pointerType === 'touch') return
                                        reveal(item.cover, event.clientX, event.clientY)
                                    }}
                                    onPointerLeave={conceal}
                                >
                                    <span
                                        className={`relative block w-full overflow-hidden ${aspectClass(span)} md:aspect-auto md:min-h-0 md:flex-1`}
                                    >
                                        <Image
                                            src={item.cover.src}
                                            alt={title}
                                            width={item.cover.width}
                                            height={item.cover.height}
                                            sizes="(max-width: 768px) 50vw, 25vw"
                                            placeholder="blur"
                                            blurDataURL={item.cover.blurDataURL}
                                            className={
                                                logo
                                                    ? 'absolute inset-0 h-full w-full object-contain p-8 md:p-14'
                                                    : 'absolute inset-0 h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-90'
                                            }
                                        />
                                    </span>
                                    <span className="mt-3 flex flex-col gap-1 text-[11px] uppercase leading-tight tracking-[0.16em]">
                                        <span className="text-pretty">{title}</span>
                                        <span className="text-muted">{category}</span>
                                    </span>
                                </button>
                            </motion.li>
                        )
                    })}
                </AnimatePresence>
            </ul>

            <div
                ref={previewRef}
                hidden={preview === null || reduced || selection !== null}
                aria-hidden
                className="pointer-events-none fixed top-0 left-0 z-[55] w-52 overflow-hidden bg-background motion-reduce:hidden [@media(hover:none)]:hidden [@media(pointer:coarse)]:hidden"
            >
                {preview ? (
                    <Image
                        src={preview.src}
                        alt=""
                        width={preview.width}
                        height={preview.height}
                        sizes="208px"
                        placeholder="blur"
                        blurDataURL={preview.blurDataURL}
                        className="h-auto w-full object-contain"
                    />
                ) : null}
            </div>

            {selected && selection ? (
                <ArchiveLightbox
                    item={selected}
                    imageIndex={Math.min(selection.imageIndex, selected.gallery.length - 1)}
                    trigger={trigger}
                    onClose={() => setSelection(null)}
                    onStep={step}
                />
            ) : null}
        </main>
    )
}
