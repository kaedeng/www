import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 – Page Not Found',
}

export default function NotFound() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center">
      <p className="font-bold text-2xl">404</p>
      <p className="font-bold text-2xl">Page not found</p>
    </main>
  )
}
