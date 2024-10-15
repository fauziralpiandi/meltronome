import type { Metadata } from 'next'
import { Alegreya } from 'next/font/google'

import '~/globals.css'
import { site } from '~/constant'
import Disclaimer from '~/Disclaimer'

export const metadata: Metadata = {
  metadataBase: new URL(site.baseUrl),
  title: `${site.title} \u2014 ${site.author}`,
  description: site.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang={site.locale}>
      <body className={`${font.className} antialiased animate-in`}>
        <svg
          className="w-full h-full pointer-events-none fixed isolate z-50 mix-blend-soft-light"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
          }}
        >
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="1"
              numOctaves="5"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100vw" height="100vh" filter="url(#noise)" />
        </svg>
        {children}
        <Disclaimer />
      </body>
    </html>
  )
}

const font = Alegreya({
  subsets: ['latin'],
})
