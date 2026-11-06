import mediaJson from './media.json'

export type Media = {
    src: string
    width: number
    height: number
    blurDataURL: string
}

export type ProjectKind = 'case' | 'archive'
export type ProjectCategory = 'identity' | 'illustration' | 'ux' | 'logo' | 'social'

export type Project = {
    slug: string
    kind: ProjectKind
    category: ProjectCategory
    year: string | null
    collaborators: string[]
    cover: Media
    gallery: Media[]
}

const media = mediaJson as {
    portrait: Media
    projects: Record<string, Media[]>
}

function project(
    slug: string,
    kind: ProjectKind,
    category: ProjectCategory,
    extras?: { year?: string | null; collaborators?: string[] },
): Project {
    const gallery = media.projects[slug]
    if (!gallery?.length) {
        throw new Error(`Missing images for ${slug}`)
    }

    return {
        slug,
        kind,
        category,
        year: extras?.year ?? null,
        collaborators: extras?.collaborators ?? [],
        cover: gallery[0],
        gallery,
    }
}

export const portrait = media.portrait

export const cases: Project[] = [
    project('nua', 'case', 'identity'),
    project('seres', 'case', 'identity', { collaborators: ['Julián Uscategui'] }),
    project('geoparque', 'case', 'identity', { collaborators: ['Astrid Aillón', 'Ana Niño'] }),
    project('geoparque-web', 'case', 'ux', { collaborators: ['Astrid Aillón', 'Ana Niño'] }),
    project('babilio', 'case', 'illustration'),
    project('calendario', 'case', 'illustration'),
]

export const archive: Project[] = [
    project('fidu', 'archive', 'logo'),
    project('lumar', 'archive', 'logo'),
    project('snow', 'archive', 'logo'),
    project('vierco', 'archive', 'logo'),
    project('huevos', 'archive', 'logo'),
    project('ilustracion-1', 'archive', 'illustration'),
    project('ilustracion-2', 'archive', 'illustration'),
    project('redes-1', 'archive', 'social'),
    project('redes-2', 'archive', 'social'),
    project('redes-3', 'archive', 'social'),
]

export const projects: Project[] = [...cases, ...archive]

export function getProject(slug: string) {
    return projects.find((item) => item.slug === slug)
}

export function getNextCase(slug: string) {
    const index = cases.findIndex((item) => item.slug === slug)
    if (index === -1) return cases[0]
    return cases[(index + 1) % cases.length]
}

function pick(slug: string, index: number) {
    const gallery = media.projects[slug]
    return gallery[Math.min(index, gallery.length - 1)]
}

export const homeFrames: Media[][] = [
    [pick('nua', 0), pick('seres', 0), pick('babilio', 0), pick('calendario', 0)],
    [pick('geoparque', 0), pick('nua', 4), pick('seres', 5), pick('geoparque-web', 0)],
    [pick('seres', 2), pick('geoparque', 2), pick('nua', 8), pick('babilio', 1)],
]

export function imageSpan(item: Media): 'wide' | 'tall' | 'square' {
    const ratio = item.width / item.height
    if (ratio > 1.25) return 'wide'
    if (ratio < 0.85) return 'tall'
    return 'square'
}
