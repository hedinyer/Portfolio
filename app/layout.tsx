import type { ReactNode } from 'react'
import { Inter, Instrument_Serif } from 'next/font/google'
import './globals.css'

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
    variable: '--font-inter',
})

const instrument = Instrument_Serif({
    subsets: ['latin'],
    weight: '400',
    style: ['normal', 'italic'],
    variable: '--font-instrument',
})

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="es" className={`${inter.variable} ${instrument.variable}`} suppressHydrationWarning>
            <body className="antialiased">{children}</body>
        </html>
    )
}
