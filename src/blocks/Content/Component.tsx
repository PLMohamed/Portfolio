import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'
import { Card, CardContent } from '@/components/ui/card'
import { getLuicdeIconComponent } from '@/fields/icon/getAllIcons'
import { FadeIn, SlideIn, ScaleIn, ScrollReveal, StaggerContainer } from '@/components/Animations'

/**
 * ContentBlock component with integrated Framer Motion animations
 *
 * Animation Support:
 * - 'fade-in': Smooth fade animation using FadeIn component
 * - 'slide-in': Slide up animation using SlideIn component
 * - 'zoom-in': Scale animation using ScaleIn component
 *
 * Features:
 * - Individual column animations with custom duration and delay
 * - Automatic stagger animation for multiple animated columns
 * - ScrollReveal fallback for blocks without specific animations
 * - Proper TypeScript support for animation configuration
 *
 * Usage: Configure animations via PayloadCMS admin panel
 */
export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  const wrapWithAnimation = (
    children: React.ReactNode,
    animation?: {
      'card-animation'?: ('fade-in' | 'slide-in' | 'zoom-in') | null
      'card-animation-duration'?: number | null
      'card-animation-delay'?: number | null
    },
    index?: number,
    enableAnimation: boolean = false,
  ) => {
    if (!enableAnimation || !animation || !animation['card-animation']) return children

    const animationType = animation['card-animation']
    const duration = (animation['card-animation-duration'] || 600) / 1000 // Convert to seconds
    const baseDelay = animation['card-animation-delay'] || 0
    const staggerDelay = (index || 0) * 150 // Add stagger delay
    const totalDelay = baseDelay + staggerDelay

    switch (animationType) {
      case 'fade-in':
        return (
          <FadeIn delay={totalDelay} duration={duration} key={'fade-in-' + index}>
            {children}
          </FadeIn>
        )
      case 'slide-in':
        return (
          <SlideIn
            direction="up"
            delay={totalDelay}
            duration={duration}
            distance={30}
            key={'slide-in-' + index}
          >
            {children}
          </SlideIn>
        )
      case 'zoom-in':
        return (
          <ScaleIn delay={totalDelay} duration={duration} key={'zoom-in-' + index}>
            {children}
          </ScaleIn>
        )
      default:
        return children
    }
  }

  // Check if we should use stagger container for multiple columns with animations
  const shouldUseStagger =
    columns &&
    columns.length > 1 &&
    columns.some((col) => col.enableAnimation && col.animation && col.animation['card-animation'])

  const renderColumns = () => {
    return columns?.map((col, index) => {
      const { enableLink, link, richText, size, enableCard, icon, animation, enableAnimation } = col
      const Comp = enableCard ? ContentBlockCard : 'div'
      const IconComponent = icon ? getLuicdeIconComponent(icon) : undefined

      const columnContent = (
        <Comp
          className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`, {
            'md:col-span-2': size !== 'full',
          })}
          key={index}
        >
          {IconComponent && (
            <div className="flex items-center justify-center mb-4">
              <IconComponent className="size-12 " />
            </div>
          )}

          {richText && <RichText data={richText} enableGutter={false} />}

          {enableLink && <CMSLink {...link} />}
        </Comp>
      )

      // If using stagger, wrap the entire grid with StaggerContainer instead
      if (shouldUseStagger) {
        return columnContent
      }

      // Otherwise, wrap with individual animation
      return wrapWithAnimation(columnContent, animation, index, !!enableAnimation)
    })
  }

  const hasAnyAnimations = columns?.some((col) => col.animation && col.animation['card-animation'])

  const content = (
    <div className="container my-16">
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
        {shouldUseStagger ? (
          <StaggerContainer staggerDelay={0.15} initialDelay={0.1}>
            {renderColumns()}
          </StaggerContainer>
        ) : (
          renderColumns()
        )}
      </div>
    </div>
  )

  if (!hasAnyAnimations) {
    return (
      <ScrollReveal threshold={0.1} triggerOnce={true}>
        {content}
      </ScrollReveal>
    )
  }

  return content
}

interface ContentBlockCardProps {
  children: React.ReactNode
  className?: string
}

const ContentBlockCard: React.FC<ContentBlockCardProps> = ({ children, className }) => {
  return (
    <Card className={className}>
      <CardContent className="pt-6">{children}</CardContent>
    </Card>
  )
}
