'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect, useState } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  const [headerHeight, setHeaderHeight] = useState<string>('10.4rem')

  useEffect(() => {
    setHeaderTheme('dark')
  })

  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.getElementById('header')
      if (header) {
        const height = window.getComputedStyle(header).height
        setHeaderHeight(`${Number.parseFloat(height) + 64}px`)
      }
    }

    updateHeaderHeight()

    const observer = new MutationObserver(updateHeaderHeight)
    const header = document.getElementById('header')
    if (header) {
      observer.observe(header, { attributes: true, childList: true, subtree: true })
    }

    return () => {
      observer.disconnect()
    }
  }, [setHeaderHeight])

  return (
    <div
      className="relative flex items-center justify-center text-white"
      data-theme="dark"
      style={{ marginTop: `-${headerHeight}` }}
    >
      <div className="container mb-8 z-10 relative flex items-center justify-center">
        <div className="max-w-146 md:text-center">
          {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="min-h-[80vh] select-none">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
        )}
      </div>
    </div>
  )
}
