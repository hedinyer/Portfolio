import type { Media } from '@/content/projects'

/** Original width / height from the media asset. */
export function naturalRatio(media: Media) {
    return media.width / Math.max(1, media.height)
}
