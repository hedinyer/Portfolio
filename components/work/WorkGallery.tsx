'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { useLayoutEffect, useRef } from 'react'
import type { Media } from '@/content/projects'
import { Link } from '@/i18n/navigation'
import { HoverDistort, useHoverDistort } from './HoverDistort'

gsap.registerPlugin(ScrollTrigger)

export type WorkTile = {
    slug: string
    title: string
    category: string
    alt: string
    cover: Media
}

function Tile({ item, priority }: { item: WorkTile; priority: boolean }) {
    const frameRef = useRef<HTMLDivElement>(null)
    const hover = useHoverDistort()

    return (
        <Link
            href={`/work/${item.slug}`}
            data-cursor="view"
            className="flex w-full flex-col md:w-auto md:shrink-0"
            onPointerEnter={(event) => {
                const frame = frameRef.current
                if (!frame) return
                hover?.current?.enter(item.cover.src, frame, event.clientX, event.clientY)
            }}
            onPointerMove={(event) => {
                hover?.current?.move(event.clientX, event.clientY)
            }}
            onPointerLeave={() => {
                hover?.current?.leave()
            }}
        >
            <div ref={frameRef} className="relative" style={{ viewTransitionName: `work-${item.slug}` }}>
                <Image
                    src={item.cover.src}
                    alt={item.alt}
                    width={item.cover.width}
                    height={item.cover.height}
                    sizes="(max-width: 768px) 100vw, 70vw"
                    priority={priority}
                    placeholder="blur"
                    blurDataURL={item.cover.blurDataURL}
                    draggable={false}
                    className="h-auto w-full md:h-[min(68vh,calc(100dvh-18rem))] md:w-auto"
                />
            </div>
            <p className="mt-3 w-0 min-w-full text-[15px] leading-snug">
                <span className="font-serif italic">{item.title}</span>
                {`. ${item.category}.`}
            </p>
        </Link>
    )
}

export function WorkGallery({
    items,
    heading,
    indexLabel,
}: {
    items: WorkTile[]
    heading: string
    indexLabel: string
}) {
    const sectionRef = useRef<HTMLElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        const section = sectionRef.current
        const track = trackRef.current
        if (!section || !track) return

        const ctx = gsap.context(() => {
            gsap.matchMedia().add('(min-width: 768px)', () => {
                gsap.to(track, {
                    x: () => -(track.scrollWidth - window.innerWidth),
                    ease: 'none',
                    scrollTrigger: {
                        trigger: section,
                        pin: true,
                        scrub: 1,
                        invalidateOnRefresh: true,
                        start: 'top top',
                        end: () => '+=' + (track.scrollWidth - window.innerWidth),
                    },
                })
            })
        }, section)

        const releasePin = (event: Event) => {
            const anchor = (event.target as HTMLElement | null)?.closest('a')
            if (!anchor) return
            const href = anchor.getAttribute('href')
            if (!href || href.startsWith('#') || href.startsWith('mailto:')) return
            ctx.revert()
        }

        document.addEventListener('click', releasePin, true)

        return () => {
            document.removeEventListener('click', releasePin, true)
            ctx.revert()
        }
    }, [items])

    return (
        <section
            ref={sectionRef}
            className="page-inset flex flex-col md:h-[100dvh] md:overflow-hidden md:px-0"
        >
            <header className="flex items-baseline gap-3 text-[11px] uppercase tracking-[0.16em] md:px-8">
                <h1>{heading}</h1>
                <span aria-hidden>·</span>
                <p>{indexLabel}</p>
            </header>
            <div className="mt-8 min-h-0 md:mt-6 md:flex-1 md:overflow-hidden">
                <HoverDistort>
                    <div
                        ref={trackRef}
                        className="flex flex-col gap-20 md:h-full md:w-max md:flex-row md:items-end md:gap-12 md:pl-8 md:pr-[12vw]"
                    >
                        {items.map((item, index) => (
                            <Tile key={item.slug} item={item} priority={index === 0} />
                        ))}
                    </div>
                </HoverDistort>
            </div>
        </section>
    )
}
