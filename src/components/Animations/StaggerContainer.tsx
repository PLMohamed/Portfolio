'use client'

import React from 'react'
import { motion } from 'motion/react'
import { cn } from '@/utilities/ui'
import type { StaggerContainerProps } from './types'

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className,
  staggerDelay = 0.1,
  initialDelay = 0,
  variants,
}) => {
  const containerVariants = variants || {
    hidden: {},
    visible: {
      transition: {
        delayChildren: initialDelay / 1000,
        staggerChildren: staggerDelay / 1000,
      },
    },
  }

  return (
    <motion.div
      className={cn('contents', className)}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: 'easeOut',
          }}
          className="contents"
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
