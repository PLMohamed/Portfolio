'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { ThemeSelectorToggle } from '@/providers/Theme/ThemeSelector'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex gap-3 items-center">
      <ThemeSelectorToggle />
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} />
      })}
    </nav>
  )
}
