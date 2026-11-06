'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import type { Media } from '@/content/projects'
import { useReducedMotion } from './useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

type RevealImageProps = {
    media: Media
    alt: string
    className?: string
    imageClassName?: string
    sizes: string
    priority?: boolean
    transitionName?: string
    parallax?: boolean
}

export function RevealImage({
    media,
    alt,
    className,
    imageClassName,
    sizes,
    priority = false,
    transitionName,
    parallax = false,
}: RevealImageProps) {
    const frame = useRef<HTMLDivElement>(null)
    const photo = useRef<HTMLDivElement>(null)
    const reduced = useReducedMotion()

    useEffect(() => {
        const element = frame.current
        const inner = photo.current
        if (!element || reduced) return

        const reveal = gsap.fromTo(
            element,
            { clipPath: 'inset(100% 0% 0% 0%)' },
            {
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 1.15,
                ease: 'power3.inOut',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 92%',
                },
            },
        )

        const drift = parallax && inner
            ? gsap.fromTo(
                  inner,
                  { yPercent: -6 },
                  {
                      yPercent: 6,
                      ease: 'none',
                      scrollTrigger: {
                          trigger: element,
                          start: 'top bottom',
                          end: 'bottom top',
                          scrub: true,
                      },
                  },
              )
            : null

        return () => {
            reveal.scrollTrigger?.kill()
            reveal.kill()
            drift?.scrollTrigger?.kill()
            drift?.kill()
        }
    }, [media.src, parallax, reduced])

    return (
        <div ref={frame} className={`overflow-hidden ${className ?? ''}`} style={{ viewTransitionName: transitionName }}>
            <div ref={photo} className={parallax ? 'h-[112%] w-full -mt-[6%]' : 'h-full w-full'}>
                <Image
                    src={media.src}
                    alt={alt}
                    width={media.width}
                    height={media.height}
                    sizes={sizes}
                    priority={priority}
                    placeholder="blur"
                    blurDataURL={media.blurDataURL}
                    className={`h-full w-full object-cover ${imageClassName ?? ''}`}
                />
            </div>
        </div>
    )
}
