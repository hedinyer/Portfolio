import type { Media } from '@/content/projects'
import { Reveal } from '@/components/motion/Reveal'
import { FadeIn } from './FadeIn'
import { CaseMedia } from './CaseMedia'
import { naturalRatio } from './planGallery'

export function CaseGallery({ items, alt, aside }: { items: Media[]; alt: string; aside: string | null }) {
    return (
        <div className="order-3 mt-[calc(16*var(--u))] flex flex-col gap-[calc(8*var(--u))] px-[calc(8*var(--u))] md:mt-[calc(8*var(--u))] md:px-[calc(11*var(--u))]">
            {aside ? (
                <FadeIn className="w-full md:w-[calc(632*var(--u))]">
                    <p className="t-text text-pretty">{aside}</p>
                </FadeIn>
            ) : null}
            {items.map((media, index) => (
                <Reveal
                    key={media.src}
                    as="figure"
                    delay={Math.min(index * 30, 120)}
                    className="relative w-full overflow-hidden"
                    style={{ aspectRatio: String(naturalRatio(media)) }}
                >
                    <CaseMedia media={media} alt={`${alt} ${index + 2}`} sizes="(max-width: 767px) 95vw, 98vw" />
                </Reveal>
            ))}
        </div>
    )
}
