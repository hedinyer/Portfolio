'use client'
import { useEffect, useRef } from 'react'

export default function UnicornBackground() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Create script element to load the Unicorn Studio module
        const script = document.createElement('script')
        script.type = 'module'
        script.innerHTML = `
            import UnicornStudioEmbed from 'https://framer.com/m/UnicornStudioEmbed-wWy9.js';
            
            const container = document.getElementById('unicorn-container');
            if (container && UnicornStudioEmbed) {
                // Initialize the embed
                console.log('Unicorn Studio loaded');
            }
        `

        document.body.appendChild(script)

        return () => {
            // Cleanup
            if (script.parentNode) {
                script.parentNode.removeChild(script)
            }
        }
    }, [])

    return (
        <div
            id="unicorn-container"
            ref={containerRef}
            className="fixed inset-0 w-full h-full -z-10"
            style={{
                pointerEvents: 'none',
                opacity: 0.4
            }}
        />
    )
}
