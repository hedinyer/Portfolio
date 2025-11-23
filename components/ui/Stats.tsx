'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useEffect, useState } from 'react'

const data = [
    { name: 'Design', val: 90 },
    { name: 'Code', val: 85 },
    { name: '3D', val: 80 },
    { name: 'Motion', val: 95 },
]

export default function Stats() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <section className="relative z-10 py-20 px-8 md:px-20 text-white mix-blend-difference">
            <h2 className="text-sm font-bold tracking-widest mb-20 uppercase opacity-50">Skills</h2>
            <div className="h-[400px] w-full max-w-4xl mx-auto">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <XAxis dataKey="name" stroke="#fff" tick={{ fill: '#fff' }} />
                        <YAxis stroke="#fff" tick={{ fill: '#fff' }} />
                        <Tooltip
                            contentStyle={{ background: '#000', border: '1px solid #fff', color: '#fff' }}
                            cursor={{ fill: 'rgba(255,255,255,0.1)' }}
                        />
                        <Bar dataKey="val" fill="#fff" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </section>
    )
}
