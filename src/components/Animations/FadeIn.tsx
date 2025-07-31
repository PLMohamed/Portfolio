'use client'

import React from 'react'
import { motion } from 'motion/react'
import { cn } from '@/utilities/ui'
import type { AnimationProps } from './types'

export const FadeIn: React.FC<AnimationProps> = ({
  children,
  className,
  delay = 0,
  duration = 0.6,
  variants,
}) => {
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
      className={cn('contents', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration,
        delay: delay / 1000,
        ease: [0.25, 0.1, 0.25, 1], // easeOut bezier curve
      }}
    >
      {children}
    </motion.div>
  )
}
