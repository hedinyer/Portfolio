'use client'

import type { CSSProperties, ReactNode } from 'react'
import { Reveal } from '@/components/motion/Reveal'
import styles from './archive.module.css'

type ArchivePieceProps = {
    children: ReactNode
    style: CSSProperties
    delay: number
    eager?: boolean
}

export function ArchivePiece({ children, style, delay, eager = false }: ArchivePieceProps) {
    return (
        <Reveal as="figure" className={styles.piece} style={style} delay={delay} eager={eager}>
            {children}
        </Reveal>
    )
}
