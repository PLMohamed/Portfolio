import React from 'react'
import * as LucideIcons from 'lucide-react'

interface IconProps {
  name: string
  size?: number
  className?: string
  color?: string
}

export const Icon: React.FC<IconProps> = ({ name, size = 24, className, color }) => {
  if (!name) return null

  const IconComponent = LucideIcons[name as keyof typeof LucideIcons] as React.ComponentType<any>

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in Lucide icons`)
    return null
  }

  return <IconComponent size={size} className={className} color={color} />
}

export default Icon
