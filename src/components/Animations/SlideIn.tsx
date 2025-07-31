'use client'

import React from 'react'
import { motion } from 'motion/react'
import { cn } from '@/utilities/ui'
import type { SlideInProps } from './types'

export const SlideIn: React.FC<SlideInProps> = ({
  children,
  className,
  delay = 0,
  duration = 0.6,
  direction = 'up',
  distance = 50,
  variants,
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance, opacity: 0 }
      case 'down':
        return { y: -distance, opacity: 0 }
      case 'left':
        return { x: distance, opacity: 0 }
      case 'right':
        return { x: -distance, opacity: 0 }
      default:
        return { y: distance, opacity: 0 }
    }
  }

  if (variants) {
    return (
      <motion.div
        className={cn('contents', className)}
        initial="hidden"
        animate="visible"
        variants={variants}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      className={cn('contents ', className)}
      initial={getInitialPosition()}
      animate={{
        x: 0,
        y: 0,
        opacity: 1,
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
