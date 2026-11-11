'use client'

import { usePathname } from '@/i18n/navigation'

export function SiteChrome({ children, footer }: { children: React.ReactNode; footer: React.ReactNode }) {
    const pathname = usePathname()
    const hideFooter = pathname === '/'

    return (
        <>
            {children}
            {hideFooter ? null : footer}
        </>
    )
}
