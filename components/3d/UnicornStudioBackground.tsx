'use client'
import { useEffect, useRef } from 'react'

declare global {
    interface Window {
        UnicornStudio?: {
            init: () => void
            isInitialized?: boolean
        }
    }
}

export default function UnicornStudioBackground() {
    const containerRef = useRef<HTMLDivElement>(null)
    const scriptLoadedRef = useRef(false)

    useEffect(() => {
        // Prevent double initialization
        if (scriptLoadedRef.current) return

        // Check if UnicornStudio is already loaded
        if (window.UnicornStudio?.isInitialized) {
            return
        }

        // Load and initialize UnicornStudio
        if (!window.UnicornStudio) {
            window.UnicornStudio = { isInitialized: false, init: () => { } }

            const script = document.createElement('script')
            script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.35/dist/unicornStudio.umd.js'
            script.async = true

            script.onload = () => {
                if (!window.UnicornStudio?.isInitialized) {
                    window.UnicornStudio?.init()
                    if (window.UnicornStudio) {
                        window.UnicornStudio.isInitialized = true
                    }
                }
                scriptLoadedRef.current = true
            }

            script.onerror = (error) => {
                console.error('Failed to load UnicornStudio SDK:', error)
            }

            (document.head || document.body).appendChild(script)
        }

        return () => {
            // Cleanup if needed
        }
    }, [])

    return (
        <div
            ref={containerRef}
            data-us-project="vk4EupKYrtho3uX1GwWZ"
            className="fixed inset-0 w-full h-full -z-10"
            style={{
                pointerEvents: 'none',
            }}
        />
    )
}
