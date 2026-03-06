'use client'

import Link from 'next/link'
import { SiGithub } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa'
import { MdOutlineEmail } from 'react-icons/md'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import type { IconType } from 'react-icons'
import styles from './navbar.module.css'
import { useTheme } from '@/hooks/useTheme'

const NAME = 'Kae'
const IPA_LABEL = '/ˈkeɪ/'
const IPA_HREF = 'https://www.leskoff.com/s01763-0'

const BIRTH_YEAR = 2005
const AGE = (() => {
  const today = new Date()
  const birthdate = new Date(BIRTH_YEAR, 4, 27)
  const age = today.getFullYear() - BIRTH_YEAR
  return today <
    new Date(today.getFullYear(), birthdate.getMonth(), birthdate.getDate())
    ? age - 1
    : age
})()

interface NavLink {
  href: string
  label: string
}

const NAV_LINKS: NavLink[] = [
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
]

interface ObfuscatedIconLink {
  encoded: string
  icon: IconType
  label: string
  external?: boolean
}

// nooo more scraping D:
const OBFUSCATED_ICON_LINKS: ObfuscatedIconLink[] = [
  {
    encoded: 'aHR0cHM6Ly9saW5rZWRpbi5jb20vaW4va2FlbGVtLWRlbmc=',
    icon: FaLinkedin,
    label: 'LinkedIn',
    external: true,
  },
  {
    encoded: 'aHR0cHM6Ly9naXRodWIuY29tL2thZWRlbmc=',
    icon: SiGithub,
    label: 'GitHub',
    external: true,
  },
  {
    encoded: 'bWFpbHRvOmNvbnRhY3RAa2FlbGVtLmRldg==',
    icon: MdOutlineEmail,
    label: 'Email',
  },
]

function useHumanVerified() {
  const [verified, setVerified] = useState(false)

  useEffect(() => {
    if (verified) return
    const mark = () => setVerified(true)
    const events = ['mousemove', 'touchstart', 'keydown'] as const
    events.forEach(e => window.addEventListener(e, mark, { once: true }))
    return () => {
      events.forEach(e => window.removeEventListener(e, mark))
    }
  }, [verified])

  return verified
}

function ObfuscatedLink({
  encoded,
  icon: Icon,
  label,
  external,
}: ObfuscatedIconLink) {
  const isHuman = useHumanVerified()
  const href = isHuman ? atob(encoded) : '#'

  return (
    <a
      href={href}
      aria-label={label}
      className={styles.mutedLink}
      onClick={e => {
        if (!isHuman) e.preventDefault()
      }}
      {...(external &&
        isHuman && {
          target: '_blank',
          rel: 'noopener noreferrer',
        })}
    >
      <Icon size={16} />
    </a>
  )
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    queueMicrotask(() => setMounted(true))
  }, [])

  if (!mounted) return <div className="h-5 w-5" />

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      aria-label="Toggle theme"
      className={`${styles.mutedLink} flex self-center items-center opacity-70 transition-opacity hover:opacity-100`}
    >
      <Image src="/favicon.svg" alt="Theme toggle" width={20} height={20} />
    </button>
  )
}

// Scramble
const SCRAMBLE_CHARS = '!@#$%^&*()=+[]{}|;:,.<>?/~`among-us_67'
const SCRAMBLE_TICKS = 6
const SCRAMBLE_TICK_MS = 40

function useScramble(name: string) {
  const [display, setDisplay] = useState(name.split(''))
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isRunningRef = useRef(false)

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      isRunningRef.current = false
    },
    []
  )

  function scramble() {
    if (isRunningRef.current) return
    if (timerRef.current) clearTimeout(timerRef.current)
    isRunningRef.current = true

    const letters = name.split('')
    const totalTicks = letters.length * SCRAMBLE_TICKS
    let tick = 0

    function step() {
      setDisplay(
        letters.map((char, i) => {
          if (tick >= (i + 1) * SCRAMBLE_TICKS) return char
          return SCRAMBLE_CHARS[
            Math.floor(Math.random() * SCRAMBLE_CHARS.length)
          ]
        })
      )
      tick++
      if (tick <= totalTicks) {
        timerRef.current = setTimeout(step, SCRAMBLE_TICK_MS)
      } else {
        isRunningRef.current = false
      }
    }

    step()
  }

  return { display, scramble }
}

function ScrambleName() {
  const { display, scramble } = useScramble(NAME)

  return (
    <Link
      href="/"
      className={`${styles.scrambleName} flex cursor-pointer select-none font-medium`}
      onMouseEnter={scramble}
    >
      {display.map((char, i) => (
        <span key={`char-${i}`} className="inline-block">
          {char}
        </span>
      ))}
    </Link>
  )
}

function NameMeta() {
  return (
    <span className={`${styles.muted} hidden text-xs sm:inline`}>
      (IPA:{' '}
      <a
        href={IPA_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.mutedLink}
      >
        {IPA_LABEL}
      </a>{' '}
      · she/they · {AGE})
    </span>
  )
}

// Navbar
export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="flex items-baseline gap-2">
            <ScrambleName />
            <NameMeta />
          </div>
        </div>

        <nav className="flex items-center gap-5">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className={`${styles.mutedLink} text-sm`}
            >
              {label}
            </Link>
          ))}

          <div className="flex items-center gap-3">
            {OBFUSCATED_ICON_LINKS.map(link => (
              <ObfuscatedLink key={link.label} {...link} />
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}
