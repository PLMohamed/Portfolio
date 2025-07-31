import { cache } from 'react'
import * as LucideIcons from 'lucide-react'

export const getAllLucideIcons = cache((): string[] => {
  const iconNames = Object.keys(LucideIcons).filter(
    (key) =>
      key !== 'createLucideIcon' &&
      key !== 'default' &&
      key.endsWith('Icon') &&
      typeof LucideIcons[key as keyof typeof LucideIcons] === 'object',
  )
  return iconNames.sort()
})

export const getLuicdeIconComponent = cache((iconName: string) => {
  const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons] as
    | React.ComponentType<React.SVGProps<SVGSVGElement>>
    | undefined
  return IconComponent
})
