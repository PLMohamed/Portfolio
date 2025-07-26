import clsx from 'clsx'
import React from 'react'
import { Lobster } from 'next/font/google'

const lobster = Lobster({ subsets: ['latin'], weight: '400', display: 'swap' })

interface Props {
  className?: string
}

export const Logo = (props: Props) => {
  const { className } = props

  return (
    <span className={clsx('text-2xl font-bold ', lobster.className, className)}>PLMOHAMED</span>
  )
}
