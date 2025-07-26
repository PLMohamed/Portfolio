import { cache } from 'react'
import * as LucideIcons from 'lucide-react'

export const getAllLucideIcons = cache((): string[] => {
  const iconNames = Object.keys(LucideIcons).filter(
    (key) =>
      key !== 'createLucideIcon' &&
      key !== 'default' &&
      typeof LucideIcons[key as keyof typeof LucideIcons] === 'object',
  )
  return iconNames.sort()
})
