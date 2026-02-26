'use client'

import { useTheme } from '@/hooks/useTheme'

export default function Home() {
  const { theme, setTheme } = useTheme()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <p className="font-bold text-2xl">WIP, check back later</p>
      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="rounded-md px-4 py-2 font-medium"
        style={{ background: 'var(--surface-0)', color: 'var(--foreground)' }}
      >
        change theme
      </button>
    </main>
  )
}
