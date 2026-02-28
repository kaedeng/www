import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { Analytics } from '@vercel/analytics/next'
import { Providers } from '@/providers/theme'
import './globals.css'
import Navbar from '@/components/navbar'

export const metadata: Metadata = {
  metadataBase: new URL('https://kaelem.dev'),
  title: {
    default: "Kae's Portfolio",
    template: "%s | Kae's Portfolio",
  },
  description:
    'Full Stack Software Engineer & CS Student at Colorado School of Mines',
  keywords: [
    'software engineer',
    'full stack developer',
    'full stack',
    'portfolio',
    'Kae',
    'Kaelem',
    'Kaelem Deng',
    'Colorado School of Mines',
    'TypeScript',
    'React',
    'Next.js',
    'Rust',
    'Python',
    'Java',
    'Spring',
    'AWS',
    'Kubernetes',
    'Docker',
  ],
  authors: [{ name: 'Kae' }],
  openGraph: {
    title: "Kae's Portfolio",
    description:
      'Full Stack Software Engineer & CS Student at Colorado School of Mines',
    url: 'https://kaelem.dev',
    siteName: "Kae's Portfolio",
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      // Favicon from Noto Emojis <3 <3
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={GeistSans.variable} suppressHydrationWarning>
      <body>
        <Providers>
          <Navbar />
          <div className="mx-auto max-w-2xl px-4">{children}</div>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
