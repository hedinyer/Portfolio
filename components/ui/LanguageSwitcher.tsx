'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { Language } from '@/i18n/translations'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'he', name: 'עברית', flag: '🇮🇱' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
]

export default function LanguageSwitcher() {
    const { language, setLanguage, isRTL } = useLanguage()
    const [isOpen, setIsOpen] = useState(false)

    const currentLang = languages.find(l => l.code === language) || languages[0]

    return (
        <div className="relative z-50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-blue-600/20 text-blue-600 hover:bg-white/20 transition-colors"
                aria-label="Change language"
            >
                <span className="text-lg">{currentLang.flag}</span>
                <span className="text-sm font-medium hidden sm:inline">{currentLang.name}</span>
                <svg
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border border-blue-600/20 overflow-hidden z-50 min-w-[160px]"
                        >
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => {
                                        setLanguage(lang.code)
                                        setIsOpen(false)
                                    }}
                                    className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-blue-50 transition-colors ${
                                        language === lang.code ? 'bg-blue-50 font-medium' : ''
                                    }`}
                                >
                                    <span className="text-xl">{lang.flag}</span>
                                    <span className="text-sm text-blue-600">{lang.name}</span>
                                    {language === lang.code && (
                                        <svg
                                            className="w-4 h-4 ml-auto text-blue-600"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    )}
                                </button>
                            ))}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}

