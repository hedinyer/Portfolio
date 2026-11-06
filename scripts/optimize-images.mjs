import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const sourceRoot = path.join(root, 'public', 'PORTAFOLIO PAGINA WEB', 'PORTAFOLIO PAGINA WEB')
const outRoot = path.join(root, 'public', 'work')
const maxEdge = 2400

const groups = {
    nua: [
        'IDENTIDAD VISUAL/NÚA ELEGIDAS/Manual de Marca NÚA_compressed_page-0001.jpg',
        'IDENTIDAD VISUAL/NÚA ELEGIDAS/Manual de Marca NÚA_compressed_page-0004.jpg',
        'IDENTIDAD VISUAL/NÚA ELEGIDAS/Manual de Marca NÚA_compressed_page-0007.jpg',
        'IDENTIDAD VISUAL/NÚA ELEGIDAS/Manual de Marca NÚA_compressed_page-0008.jpg',
        'IDENTIDAD VISUAL/NÚA ELEGIDAS/Manual de Marca NÚA_compressed_page-0010.jpg',
        'IDENTIDAD VISUAL/NÚA ELEGIDAS/Manual de Marca NÚA_compressed_page-0011.jpg',
        'IDENTIDAD VISUAL/NÚA ELEGIDAS/Manual de Marca NÚA_compressed_page-0016.jpg',
        'IDENTIDAD VISUAL/NÚA ELEGIDAS/Manual de Marca NÚA_compressed_page-0017.jpg',
        'IDENTIDAD VISUAL/NÚA ELEGIDAS/Manual de Marca NÚA_compressed_page-0018.jpg',
        'IDENTIDAD VISUAL/NÚA ELEGIDAS/Manual de Marca NÚA_compressed_page-0023.jpg',
        'IDENTIDAD VISUAL/NÚA ELEGIDAS/Manual de Marca NÚA_compressed_page-0024.jpg',
        'IDENTIDAD VISUAL/NÚA ELEGIDAS/Manual de Marca NÚA_compressed_page-0026.jpg',
        'IDENTIDAD VISUAL/NÚA ELEGIDAS/Manual de Marca NÚA_compressed_page-0027.jpg',
        'IDENTIDAD VISUAL/NÚA ELEGIDAS/Manual de Marca NÚA_compressed_page-0029.jpg',
        'IDENTIDAD VISUAL/NÚA ELEGIDAS/Manual de Marca NÚA_compressed_page-0033.jpg',
    ],
    seres: [
        'IDENTIDAD VISUAL/SERES ELEGIDAS/MANUAL SERES_compressed_page-0001.jpg',
        'IDENTIDAD VISUAL/SERES ELEGIDAS/MANUAL SERES_compressed_page-0004.jpg',
        'IDENTIDAD VISUAL/SERES ELEGIDAS/MANUAL SERES_compressed_page-0008.jpg',
        'IDENTIDAD VISUAL/SERES ELEGIDAS/MANUAL SERES_compressed_page-0010.jpg',
        'IDENTIDAD VISUAL/SERES ELEGIDAS/MANUAL SERES_compressed_page-0012.jpg',
        'IDENTIDAD VISUAL/SERES ELEGIDAS/MANUAL SERES_compressed_page-0018.jpg',
        'IDENTIDAD VISUAL/SERES ELEGIDAS/MANUAL SERES_compressed_page-0019.jpg',
        'IDENTIDAD VISUAL/SERES ELEGIDAS/MANUAL SERES_compressed_page-0024.jpg',
        'IDENTIDAD VISUAL/SERES ELEGIDAS/MANUAL SERES_compressed_page-0026.jpg',
        'IDENTIDAD VISUAL/SERES ELEGIDAS/MANUAL SERES_compressed_page-0033.jpg',
        'IDENTIDAD VISUAL/SERES ELEGIDAS/MANUAL SERES_compressed_page-0035.jpg',
        'IDENTIDAD VISUAL/SERES ELEGIDAS/MANUAL SERES_compressed_page-0036.jpg',
        'IDENTIDAD VISUAL/SERES ELEGIDAS/MANUAL SERES_compressed_page-0038.jpg',
    ],
    geoparque: [
        'IDENTIDAD VISUAL/GEOPARQUE/1.png',
        'IDENTIDAD VISUAL/GEOPARQUE/2.png',
        'IDENTIDAD VISUAL/GEOPARQUE/3.png',
        'IDENTIDAD VISUAL/GEOPARQUE/4.png',
        'IDENTIDAD VISUAL/GEOPARQUE/5.png',
        'IDENTIDAD VISUAL/GEOPARQUE/6.png',
        'IDENTIDAD VISUAL/GEOPARQUE/7.png',
    ],
    'geoparque-web': [
        'UX UI/177871168.png',
        'UX UI/177871167.png',
    ],
    babilio: [
        'ILUSTRACION/Babilio/177871161.png',
        'ILUSTRACION/Babilio/Frame 77.png',
    ],
    calendario: [
        'ILUSTRACION/Calendario/177871160.png',
        'ILUSTRACION/Calendario/Frame 76.png',
    ],
    fidu: ['LOGOFOLIO/Frame 71.png'],
    lumar: ['LOGOFOLIO/Frame 72.png'],
    snow: ['LOGOFOLIO/Frame 73.png'],
    vierco: ['LOGOFOLIO/Frame 74.png'],
    huevos: ['LOGOFOLIO/Frame 75.png'],
    'ilustracion-1': ['ILUSTRACION/Otro/177871162.png'],
    'ilustracion-2': ['ILUSTRACION/Otro/177871163.png'],
    'redes-1': ['REDES SOCIALES/177871164.png'],
    'redes-2': ['REDES SOCIALES/177871165.png'],
    'redes-3': ['REDES SOCIALES/177871166.png'],
}

async function toMedia(input, output) {
    const image = sharp(input, { failOn: 'none' }).rotate()
    const resized = image.resize({
        width: maxEdge,
        height: maxEdge,
        fit: 'inside',
        withoutEnlargement: true,
    })

    await fs.mkdir(path.dirname(output), { recursive: true })
    await resized.webp({ quality: 80, effort: 4 }).toFile(output)

    const meta = await sharp(output).metadata()
    const blur = await sharp(output).resize(12).webp({ quality: 30 }).toBuffer()

    return {
        src: '/' + path.relative(path.join(root, 'public'), output).replaceAll('\\', '/'),
        width: meta.width,
        height: meta.height,
        blurDataURL: `data:image/webp;base64,${blur.toString('base64')}`,
    }
}

const manifest = { portrait: null, projects: {} }

for (const [slug, files] of Object.entries(groups)) {
    manifest.projects[slug] = []
    for (let index = 0; index < files.length; index += 1) {
        const input = path.join(sourceRoot, ...files[index].split('/'))
        const output = path.join(outRoot, slug, `${String(index + 1).padStart(2, '0')}.webp`)
        const media = await toMedia(input, output)
        manifest.projects[slug].push(media)
        console.log(`${slug} ${media.width}x${media.height} ${media.src}`)
    }
}

const portraitOut = path.join(root, 'public', 'portrait', 'andrea.webp')
manifest.portrait = await toMedia(path.join(root, 'public', 'andrea.jpg'), portraitOut)
console.log(`portrait ${manifest.portrait.width}x${manifest.portrait.height}`)

await fs.mkdir(path.join(root, 'content'), { recursive: true })
await fs.writeFile(
    path.join(root, 'content', 'media.json'),
    JSON.stringify(manifest, null, 2),
)

console.log('manifest written')
