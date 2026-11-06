'use client'

import { usePageVisible, useReducedMotion } from '@/components/motion'
import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode, type RefObject } from 'react'
import * as THREE from 'three'

type HoverApi = {
    enter: (src: string, frame: HTMLElement, clientX: number, clientY: number) => void
    move: (clientX: number, clientY: number) => void
    leave: () => void
}

const HoverContext = createContext<RefObject<HoverApi | null> | null>(null)

export function useHoverDistort() {
    return useContext(HoverContext)
}

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`

const fragmentShader = `
uniform sampler2D uTexture;
uniform vec2 uPointer;
uniform float uTime;
uniform float uAmount;
varying vec2 vUv;

void main() {
  vec2 delta = vUv - uPointer;
  float dist = dot(delta, delta);
  float falloff = exp(-dist * 12.0);
  float wave = sin(dist * 36.0 - uTime * 1.5) * 0.65 + sin(dist * 18.0 - uTime * 0.7) * 0.35;
  vec2 uv = clamp(vUv + delta * wave * falloff * uAmount, 0.001, 0.999);
  gl_FragColor = texture2D(uTexture, uv);
  #include <colorspace_fragment>
}
`

type GlBundle = {
    renderer: THREE.WebGLRenderer
    scene: THREE.Scene
    camera: THREE.OrthographicCamera
    material: THREE.ShaderMaterial
    geometry: THREE.BufferGeometry
    texture: THREE.Texture
    pointer: THREE.Vector2
    time: { value: number }
}

function wantsReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function canUseFineHover() {
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

export function HoverDistort({ children }: { children: ReactNode }) {
    const reduced = useReducedMotion()
    const visible = usePageVisible()
    const holderRef = useRef<HTMLDivElement | null>(null)
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
    const bundleRef = useRef<GlBundle | null>(null)
    const frameRef = useRef<HTMLElement | null>(null)
    const rafRef = useRef<number | null>(null)
    const visibleRef = useRef(visible)
    const tokenRef = useRef(0)
    const srcRef = useRef<string | null>(null)
    const failedRef = useRef(false)
    const sizeRef = useRef({ width: 0, height: 0 })
    const targetRef = useRef({ x: 0.5, y: 0.5 })
    const currentRef = useRef({ x: 0.5, y: 0.5 })
    const apiRef = useRef<HoverApi | null>(null)

    const stopLoop = useCallback(() => {
        if (rafRef.current === null) return
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
    }, [])

    const disposeBundle = useCallback(() => {
        stopLoop()
        const bundle = bundleRef.current
        if (bundle) {
            bundle.material.dispose()
            bundle.geometry.dispose()
            bundle.texture.dispose()
            bundleRef.current = null
        }
        const renderer = rendererRef.current
        if (renderer) {
            renderer.dispose()
            renderer.forceContextLoss()
            rendererRef.current = null
        }
        canvasRef.current?.remove()
        canvasRef.current = null
        sizeRef.current = { width: 0, height: 0 }
    }, [stopLoop])

    const disposeRef = useRef(disposeBundle)

    useEffect(() => {
        disposeRef.current = disposeBundle
    }, [disposeBundle])

    useEffect(() => {
        const holder = document.createElement('div')
        holder.className = 'pointer-events-none fixed inset-0 z-30'
        holder.setAttribute('aria-hidden', 'true')
        document.body.append(holder)
        holderRef.current = holder

        return () => {
            tokenRef.current += 1
            disposeRef.current()
            holder.remove()
            holderRef.current = null
        }
    }, [])

    useEffect(() => {
        visibleRef.current = visible
        if (visible) return
        stopLoop()
    }, [stopLoop, visible])

    useEffect(() => {
        if (!reduced) return
        tokenRef.current += 1
        srcRef.current = null
        frameRef.current = null
        disposeBundle()
    }, [disposeBundle, reduced])

    const place = useCallback((bundle: GlBundle, frame: HTMLElement) => {
        const canvas = canvasRef.current
        if (!canvas) return
        const rect = frame.getBoundingClientRect()
        const width = Math.max(Math.round(rect.width), 1)
        const height = Math.max(Math.round(rect.height), 1)
        canvas.style.left = `${Math.round(rect.left)}px`
        canvas.style.top = `${Math.round(rect.top)}px`
        canvas.style.width = `${width}px`
        canvas.style.height = `${height}px`
        if (sizeRef.current.width === width && sizeRef.current.height === height) return
        sizeRef.current = { width, height }
        bundle.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
        bundle.renderer.setSize(width, height, false)
    }, [])

    const onFrame = useRef<(now: number) => void>(() => {})

    useEffect(() => {
        onFrame.current = (now: number) => {
            if (!visibleRef.current) {
                rafRef.current = null
                return
            }
            rafRef.current = requestAnimationFrame((time) => onFrame.current(time))
            const bundle = bundleRef.current
            const frame = frameRef.current
            if (!bundle || !frame) return
            place(bundle, frame)
            const target = targetRef.current
            const current = currentRef.current
            current.x += (target.x - current.x) * 0.12
            current.y += (target.y - current.y) * 0.12
            bundle.pointer.set(current.x, current.y)
            bundle.time.value = now * 0.001
            bundle.renderer.render(bundle.scene, bundle.camera)
        }
    }, [place])

    const startLoop = useCallback(() => {
        if (rafRef.current !== null || !visibleRef.current) return
        rafRef.current = requestAnimationFrame((time) => onFrame.current(time))
    }, [])

    useEffect(() => {
        if (!visible || !bundleRef.current) return
        startLoop()
    }, [startLoop, visible])

    const setPointer = useCallback((frame: HTMLElement, clientX: number, clientY: number) => {
        const rect = frame.getBoundingClientRect()
        const x = rect.width > 0 ? (clientX - rect.left) / rect.width : 0.5
        const y = rect.height > 0 ? (clientY - rect.top) / rect.height : 0.5
        targetRef.current.x = Math.min(1, Math.max(0, x))
        targetRef.current.y = Math.min(1, Math.max(0, 1 - y))
    }, [])

    const enter = useCallback(
        (src: string, frame: HTMLElement, clientX: number, clientY: number) => {
            if (reduced || failedRef.current || wantsReducedMotion() || !canUseFineHover()) return
            const holder = holderRef.current
            if (!holder) return

            frameRef.current = frame
            setPointer(frame, clientX, clientY)
            currentRef.current = { ...targetRef.current }

            if (srcRef.current === src && (bundleRef.current || rendererRef.current)) {
                if (bundleRef.current) startLoop()
                return
            }

            tokenRef.current += 1
            const token = tokenRef.current
            srcRef.current = src
            disposeBundle()
            frameRef.current = frame

            let canvas: HTMLCanvasElement | null = null
            try {
                canvas = document.createElement('canvas')
                canvas.style.position = 'absolute'
                canvas.style.pointerEvents = 'none'
                canvas.style.visibility = 'hidden'
                canvas.setAttribute('aria-hidden', 'true')
                holder.append(canvas)
                canvasRef.current = canvas

                const renderer = new THREE.WebGLRenderer({
                    canvas,
                    alpha: true,
                    antialias: false,
                    powerPreference: 'low-power',
                })
                renderer.outputColorSpace = THREE.SRGBColorSpace
                renderer.toneMapping = THREE.NoToneMapping
                renderer.setClearColor(0x000000, 0)
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
                rendererRef.current = renderer

                const loader = new THREE.TextureLoader()
                const pending: { texture: THREE.Texture | null } = { texture: null }
                pending.texture = loader.load(
                    src,
                    (texture) => {
                        pending.texture = null
                        if (token !== tokenRef.current || rendererRef.current !== renderer) {
                            texture.dispose()
                            return
                        }

                        texture.colorSpace = THREE.SRGBColorSpace
                        texture.minFilter = THREE.LinearFilter
                        texture.magFilter = THREE.LinearFilter
                        texture.generateMipmaps = false

                        const pointer = new THREE.Vector2(currentRef.current.x, currentRef.current.y)
                        const time = { value: 0 }
                        const material = new THREE.ShaderMaterial({
                            uniforms: {
                                uTexture: { value: texture },
                                uPointer: { value: pointer },
                                uTime: time,
                                uAmount: { value: 0.55 },
                            },
                            vertexShader,
                            fragmentShader,
                            depthTest: false,
                            depthWrite: false,
                        })
                        const geometry = new THREE.PlaneGeometry(2, 2)
                        const scene = new THREE.Scene()
                        scene.add(new THREE.Mesh(geometry, material))
                        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
                        const bundle: GlBundle = {
                            renderer,
                            scene,
                            camera,
                            material,
                            geometry,
                            texture,
                            pointer,
                            time,
                        }
                        bundleRef.current = bundle
                        const activeFrame = frameRef.current
                        const surface = canvasRef.current
                        if (!activeFrame || !surface) return
                        place(bundle, activeFrame)
                        renderer.render(scene, camera)
                        surface.style.visibility = 'visible'
                        startLoop()
                    },
                    undefined,
                    () => {
                        pending.texture?.dispose()
                        pending.texture = null
                        if (token !== tokenRef.current) return
                        disposeBundle()
                    },
                )
            } catch {
                failedRef.current = true
                const renderer = rendererRef.current
                if (renderer) {
                    renderer.dispose()
                    renderer.forceContextLoss()
                    rendererRef.current = null
                }
                canvas?.remove()
                canvasRef.current = null
            }
        },
        [disposeBundle, place, reduced, setPointer, startLoop],
    )

    const move = useCallback(
        (clientX: number, clientY: number) => {
            const frame = frameRef.current
            if (!frame) return
            setPointer(frame, clientX, clientY)
        },
        [setPointer],
    )

    const leave = useCallback(() => {
        tokenRef.current += 1
        srcRef.current = null
        frameRef.current = null
        disposeBundle()
    }, [disposeBundle])

    useEffect(() => {
        apiRef.current = { enter, move, leave }
    }, [enter, leave, move])

    return <HoverContext.Provider value={apiRef}>{children}</HoverContext.Provider>
}
