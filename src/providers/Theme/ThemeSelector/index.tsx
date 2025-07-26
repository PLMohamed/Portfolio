'use client'

import React, { useState } from 'react'

import type { Theme } from './types'

import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from '..'
import { themeLocalStorageKey } from './types'

export const ThemeSelector: React.FC = () => {
  const { setTheme, theme } = useTheme()
  const [value, setValue] = useState('')

  const onThemeChange = (themeToSet: Theme | 'auto') => {
    if (themeToSet === 'auto') {
      setTheme(null)
      setValue('auto')
    } else {
      setTheme(themeToSet)
      setValue(themeToSet)
    }
  }

  React.useEffect(() => {
    const preference = window.localStorage.getItem(themeLocalStorageKey)
    setValue(preference ?? 'auto')
  }, [])

  React.useEffect(() => {
    if (theme) setValue(theme)
  }, [theme])

  return (
    <div className="flex items-center rounded-full bg-gray-800" aria-label="Theme Selector">
      <Button
        size="icon-sm"
        variant="ghost"
        className={cn('rounded-full hover:bg-primary hover:text-white', {
          'bg-primary': value === 'auto',
        })}
        onClick={() => {
          onThemeChange('auto')
        }}
      >
        <span className="sr-only">Auto Theme</span>
        <MonitorIcon className="h-4 w-4" />
      </Button>
      <Button
        size="icon-sm"
        variant="ghost"
        className={cn('rounded-full hover:bg-primary hover:text-white', {
          'bg-primary': value === 'light',
        })}
        onClick={() => {
          onThemeChange('light')
        }}
      >
        <span className="sr-only">Light Theme</span>
        <SunIcon className="h-4 w-4" />
      </Button>
      <Button
        size="icon-sm"
        variant="ghost"
        className={cn('rounded-full hover:bg-primary hover:text-white', {
          'bg-primary': value === 'dark',
        })}
        onClick={() => {
          onThemeChange('dark')
        }}
      >
        <span className="sr-only">Dark Theme</span>
        <MoonIcon className="h-4 w-4" />
      </Button>
    </div>
  )
}

export const ThemeSelectorToggle: React.FC = () => {
  const { setTheme, theme } = useTheme()
  const [value, setValue] = useState('')

  const onThemeChange = (themeToSet: Theme) => {
    setTheme(themeToSet)
    setValue(themeToSet)
  }

  React.useEffect(() => {
    const preference = window.localStorage.getItem(themeLocalStorageKey)
    setValue(preference ?? 'auto')
  }, [])

  React.useEffect(() => {
    if (theme) setValue(theme)
  }, [theme])

  return (
    <Button
      size="icon-sm"
      variant="ghost"
      className={cn('rounded-full text-foreground')}
      aria-label="Theme Selector Toggle"
      onClick={() => {
        onThemeChange(value === 'dark' ? 'light' : 'dark')
      }}
      type="button"
    >
      <span className="sr-only">Toggle Theme</span>
      {value === 'dark' ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
    </Button>
  )
}
