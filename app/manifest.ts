import type { MetadataRoute } from 'next'

import { site } from '~/constant'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.title} \u2014 ${site.author}`,
    short_name: `${site.title} \u2014 ${site.author}`,
    description: site.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#111',
    icons: [
      {
        src: 'icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
