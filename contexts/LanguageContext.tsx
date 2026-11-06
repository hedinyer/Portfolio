'use client'

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Language, translations, getLanguageFromLocale, isRTL } from '@/i18n/translations';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: typeof translations.en;
    isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>('en');
    const [mounted, setMounted] = useState(false);

    // Detect language on mount
    useEffect(() => {
        setMounted(true);
        
        // Check localStorage first
        const savedLang = localStorage.getItem('preferred-language') as Language | null;
        if (savedLang && (savedLang === 'es' || savedLang === 'de' || savedLang === 'he' || savedLang === 'it' || savedLang === 'en')) {
            setLanguageState(savedLang);
            return;
        }

        // Detect from browser
        if (typeof window !== 'undefined') {
            const browserLang = navigator.language || (navigator as any).userLanguage;
            const detectedLang = getLanguageFromLocale(browserLang);
            setLanguageState(detectedLang);
            localStorage.setItem('preferred-language', detectedLang);
        }
    }, []);

    const setLanguage = useCallback((lang: Language) => {
        setLanguageState(lang);
        if (typeof window !== 'undefined') {
            localStorage.setItem('preferred-language', lang);
        }
    }, []);

    // Update document direction for RTL
    useEffect(() => {
        if (mounted && typeof document !== 'undefined') {
            document.documentElement.dir = isRTL(language) ? 'rtl' : 'ltr';
            document.documentElement.lang = language;
        }
    }, [language, mounted]);

    const value: LanguageContextType = {
        language,
        setLanguage,
        t: translations[language],
        isRTL: isRTL(language)
    };

    // Always provide the context, even before mount, to prevent errors
    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}

