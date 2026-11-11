import { Link } from '@/i18n/navigation'

type CaseLink = { href: string; label: string }

export function NextProject({ previous, next }: { previous?: CaseLink | null; next?: CaseLink | null }) {
    if (!previous && !next) return null

    const label = [previous?.label, next?.label].filter(Boolean).join(' / ')

    return (
        <nav
            aria-label={label}
            className="case-nav flex items-baseline px-[calc(8*var(--u))] md:pr-[calc(11*var(--u))] md:pl-[calc(13*var(--u))]"
        >
            <style>{`
                .case-nav { margin-top: calc(48 * var(--u)); margin-bottom: calc(80 * var(--u)); }
                .case-nav a {
                    font-size: calc(15 * var(--u));
                    line-height: calc(18 * var(--u));
                }
                @media (min-width: 768px) {
                    .case-nav { margin-top: calc(140 * var(--u)); margin-bottom: calc(150 * var(--u)); }
                    .case-nav a {
                        font-size: calc(13 * var(--u));
                        line-height: calc(15 * var(--u));
                    }
                }
            `}</style>
            {previous ? (
                <Link href={previous.href} className="link t-next">
                    {previous.label}
                </Link>
            ) : null}
            {next ? (
                <Link href={next.href} className="link t-next ml-auto">
                    {next.label}
                </Link>
            ) : null}
        </nav>
    )
}
