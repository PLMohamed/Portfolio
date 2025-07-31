'use client'

import React from 'react'
import { motion } from 'motion/react'
import { cn } from '@/utilities/ui'
import type { ScrollRevealProps } from './types'

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className,
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  triggerOnce = true,
  rootMargin = '0px 0px -50px 0px',
  variants,
}) => {
  if (variants) {
    return (
      <motion.div
        className={cn('contents', className)}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: triggerOnce,
          amount: threshold,
          margin: rootMargin,
        }}
        variants={variants}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      className={cn('contents', className)}
      initial={{
        opacity: 0,
        y: 32,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: triggerOnce,
        amount: threshold,
        margin: rootMargin,
      }}
      transition={{
        duration,
        delay: delay / 1000,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
