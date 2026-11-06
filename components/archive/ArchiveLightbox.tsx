'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import type { Project } from '@/content/projects'

const SWIPE_THRESHOLD = 40

type ArchiveLightboxProps = {
    item: Project
    imageIndex: number
    trigger: HTMLButtonElement | null
    onClose: () => void
    onStep: (direction: 1 | -1) => void
}

function focusableIn(dialog: HTMLElement) {
    return [...dialog.querySelectorAll<HTMLElement>('button:not([disabled])')].filter((node) => node.tabIndex >= 0)
}

function trapTab(event: KeyboardEvent, dialog: HTMLElement) {
    const focusable = focusableIn(dialog)
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (!first || !last) {
        event.preventDefault()
        dialog.focus({ preventScroll: true })
        return
    }

    const active = document.activeElement
    const inside = active instanceof HTMLElement && dialog.contains(active) && active !== dialog
    if (!inside) {
        event.preventDefault()
        ;(event.shiftKey ? last : first).focus()
        return
    }
    if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
    } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
    }
}

export function ArchiveLightbox({ item, imageIndex, trigger, onClose, onStep }: ArchiveLightboxProps) {
    const t = useTranslations('archive')
    const titleId = useId()
    const dialogRef = useRef<HTMLDivElement>(null)
    const title = t(`items.${item.slug}.title`)
    const category = t(`items.${item.slug}.category`)
    const summary = t(`items.${item.slug}.summary`)
    const media = item.gallery[imageIndex] ?? item.cover

    useEffect(() => {
        const onKey = (event: KeyboardEvent) => {
            const dialog = dialogRef.current
            if (!dialog) return
            if (event.key === 'Escape') {
                event.preventDefault()
                onClose()
                return
            }
            if (event.key === 'ArrowLeft') {
                event.preventDefault()
                onStep(-1)
                return
            }
            if (event.key === 'ArrowRight') {
                event.preventDefault()
                onStep(1)
                return
            }
            if (event.key === 'Tab') trapTab(event, dialog)
        }

        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [onClose, onStep])

    useEffect(() => {
        const dialog = dialogRef.current
        if (!dialog) return

        let start: { x: number; y: number; pointerId: number } | null = null

        const onDown = (event: PointerEvent) => {
            if (event.pointerType === 'mouse') return
            const target = event.target
            if (!(target instanceof Node) || !dialog.contains(target)) return
            if (target instanceof Element && target.closest('button')) return
            start = { x: event.clientX, y: event.clientY, pointerId: event.pointerId }
        }

        const onUp = (event: PointerEvent) => {
            if (!start || start.pointerId !== event.pointerId) return
            const dx = event.clientX - start.x
            const dy = event.clientY - start.y
            start = null
            if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) <= Math.abs(dy)) return
            onStep(dx < 0 ? 1 : -1)
            const blockClick = (click: Event) => {
                click.preventDefault()
                click.stopPropagation()
            }
            dialog.addEventListener('click', blockClick, { capture: true, once: true })
        }

        dialog.addEventListener('pointerdown', onDown)
        window.addEventListener('pointerup', onUp)
        return () => {
            dialog.removeEventListener('pointerdown', onDown)
            window.removeEventListener('pointerup', onUp)
        }
    }, [onStep])

    useEffect(() => {
        const dialog = dialogRef.current
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        const inerted: HTMLElement[] = []
        if (dialog) {
            for (const node of document.body.children) {
                if (!(node instanceof HTMLElement)) continue
                if (node === dialog || node.contains(dialog)) continue
                if (node.inert) continue
                node.inert = true
                inerted.push(node)
            }
        }

        dialog?.focus({ preventScroll: true })
        const returnTo = trigger

        return () => {
            document.body.style.overflow = previousOverflow
            for (const node of inerted) node.inert = false
            returnTo?.focus({ preventScroll: true })
        }
    }, [trigger])

    if (typeof document === 'undefined') return null

    return createPortal(
        <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            className="fixed inset-0 z-[80] flex bg-foreground/40 p-3 sm:p-6 md:p-10"
            onClick={onClose}
            onWheel={(event) => event.stopPropagation()}
        >
            <div
                className="flex h-full min-h-0 w-full flex-col border border-line bg-background"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="grid grid-cols-3 items-center px-4 text-[11px] uppercase tracking-[0.16em] md:px-8">
                    <button
                        type="button"
                        className="min-h-11 justify-self-start transition-transform duration-200 active:scale-[0.96]"
                        onClick={() => onStep(-1)}
                    >
                        {t('previous')}
                    </button>
                    <button
                        type="button"
                        className="min-h-11 justify-self-center transition-transform duration-200 active:scale-[0.96]"
                        onClick={onClose}
                    >
                        {t('close')}
                    </button>
                    <button
                        type="button"
                        className="min-h-11 justify-self-end transition-transform duration-200 active:scale-[0.96]"
                        onClick={() => onStep(1)}
                    >
                        {t('next')}
                    </button>
                </div>
                <div className="relative min-h-0 flex-1 touch-none">
                    <Image
                        key={media.src}
                        src={media.src}
                        alt={title}
                        width={media.width}
                        height={media.height}
                        sizes="100vw"
                        placeholder="blur"
                        blurDataURL={media.blurDataURL}
                        draggable={false}
                        className="absolute inset-0 h-full w-full object-contain p-4 md:p-10"
                    />
                </div>
                <div className="grid gap-3 px-4 pb-6 md:grid-cols-12 md:px-8 md:pb-8">
                    <div className="md:col-span-4">
                        <p className="text-[11px] uppercase tracking-[0.16em] text-muted">{category}</p>
                        <h2 id={titleId} className="mt-2 font-serif text-2xl leading-none tracking-tight text-balance">
                            {title}
                        </h2>
                        {item.gallery.length > 1 ? (
                            <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-muted tabular-nums">
                                {imageIndex + 1} / {item.gallery.length}
                            </p>
                        ) : null}
                    </div>
                    <p className="max-w-[65ch] text-pretty leading-relaxed text-muted md:col-span-7 md:col-start-6">
                        {summary}
                    </p>
                </div>
            </div>
        </div>,
        document.body,
    )
}
