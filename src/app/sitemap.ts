import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cyberbay.tech'
  
  const routes = [
    '',
    '/bug-hunters',
    '/careers',
    '/company',
    '/contact-us',
    '/privacy-policy',
    '/pricing',
    '/solutions/continuous-monitoring',
    '/solutions/platform',
    '/solutions/bug-bounty'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return routes
}
