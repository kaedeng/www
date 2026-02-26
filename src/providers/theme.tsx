'use client'

import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="system"
      themes={['latte', 'macchiato']}
      value={{ light: 'latte', dark: 'macchiato' }}
    >
      {children}
    </ThemeProvider>
  )
}
