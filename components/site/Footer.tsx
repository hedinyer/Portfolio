import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { site } from '@/content/site'

const links = [
    { href: '/work', key: 'work' },
    { href: '/archive', key: 'archive' },
    { href: '/about', key: 'about' },
    { href: '/contact', key: 'contact' },
] as const

export async function SiteFooter() {
    const footer = await getTranslations('footer')
    const nav = await getTranslations('nav')
    const year = new Date().getFullYear()

    return (
        <footer className="border-t border-line px-5 py-8 text-[12px] uppercase tracking-[0.16em] md:px-8">
            <div className="grid gap-8 md:grid-cols-4">
                <p>{site.name}</p>
                <nav className="flex flex-col gap-2">
                    {links.map((link) => (
                        <Link key={link.href} href={link.href} className="min-h-6">
                            {nav(link.key)}
                        </Link>
                    ))}
                </nav>
                <a href={`mailto:${site.email}`} className="normal-case tracking-normal">
                    {site.email}
                </a>
                <p>{`${year} · ${footer('crafted')}`}</p>
            </div>
        </footer>
    )
}
