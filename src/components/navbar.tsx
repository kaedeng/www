'use client'

import Link from 'next/link'
import { SiGithub, SiLinkedin } from 'react-icons/si'
import { MdOutlineEmail } from 'react-icons/md'
import { useEffect, useRef, useState } from 'react'
import type { IconType } from 'react-icons'
import styles from './navbar.module.css'

// --- Config ---

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

interface IconLink {
  href: string
  icon: IconType
  label: string
  external?: boolean
}

const NAV_LINKS: NavLink[] = [
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
]

const ICON_LINKS: IconLink[] = [
  {
    href: 'https://linkedin.com/in/kaelem-deng',
    icon: SiLinkedin,
    label: 'LinkedIn',
    external: true,
  },
  {
    href: 'https://github.com/kaedeng',
    icon: SiGithub,
    label: 'GitHub',
    external: true,
  },
  { href: 'mailto:contact@kaelem.dev', icon: MdOutlineEmail, label: 'Email' },
]

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

// Pronunciation label, pronouns, and age displayed beside the name
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
        <div className="flex items-baseline gap-2">
          <ScrambleName />
          <NameMeta />
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
            {ICON_LINKS.map(({ href, icon: Icon, label, external }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className={styles.mutedLink}
                {...(external && {
                  target: '_blank',
                  rel: 'noopener noreferrer',
                })}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}
