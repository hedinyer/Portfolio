'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function MatrixASCII() {
    const containerRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = containerRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Set canvas size
        const resize = () => {
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
        }
        resize()
        window.addEventListener('resize', resize)

        // Matrix characters - mix of letters, numbers, and symbols
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
        const fontSize = 14
        const columns = Math.floor(canvas.width / fontSize)
        const drops: number[] = []

        // Initialize drops
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100
        }

        // Animation function
        const draw = () => {
            // Semi-transparent black background for trail effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // Blue color for text
            ctx.fillStyle = '#2563eb' // Blue-600
            ctx.font = `${fontSize}px monospace`

            // Draw characters
            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)]
                const x = i * fontSize
                const y = drops[i] * fontSize

                // Gradient effect - brighter at top
                const opacity = Math.min(1, (canvas.height - y) / canvas.height)
                ctx.globalAlpha = opacity
                ctx.fillText(text, x, y)

                // Reset drop if it reaches bottom
                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0
                }

                // Move drop down
                drops[i]++
            }

            ctx.globalAlpha = 1
            requestAnimationFrame(draw)
        }

        draw()

        return () => {
            window.removeEventListener('resize', resize)
        }
    }, [])

    return (
        <canvas
            ref={containerRef}
            className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
            style={{ mixBlendMode: 'screen' }}
        />
    )
}


