import { cases, type Media } from '@/content/projects'

export function caseSlugFor(media: Media): string {
    const match = cases.find(
        (item) => item.cover.src === media.src || item.gallery.some((image) => image.src === media.src),
    )

    if (!match) {
        throw new Error(`No case matches ${media.src}`)
    }

    return match.slug
}
