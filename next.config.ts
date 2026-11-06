import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const nextConfig: NextConfig = {
    reactCompiler: true,
    images: {
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 828, 1080, 1200, 1920, 2400],
        imageSizes: [64, 128, 256, 384],
        minimumCacheTTL: 60 * 60 * 24 * 30,
    },
}

export default withNextIntl(nextConfig)
