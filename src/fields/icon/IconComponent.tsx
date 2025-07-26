'use client'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/utilities/ui'
import { FieldLabel, TextInput, useField } from '@payloadcms/ui'
import * as LucideIcons from 'lucide-react'
import { SelectFieldClientProps } from 'payload'
import { useCallback, useMemo, useState, useEffect, useRef } from 'react'
import { getAllLucideIcons } from './getAllIcons'

type IconListProps = SelectFieldClientProps

export const IconList: React.FC<IconListProps> = ({ path, field, readOnly }) => {
  const { label } = field

  const { value, setValue } = useField<string>({ path: path || field.name })

  const allIcons = useMemo(() => getAllLucideIcons(), [])
  const [open, setOpen] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [displayedIcons, setDisplayedIcons] = useState<string[]>([])
  const [loadMore, setLoadMore] = useState<number>(50) // Initial load count
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const observerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Filter icons based on search term
  const filteredIcons = useMemo(() => {
    if (!searchTerm) return allIcons
    return allIcons.filter((iconName) => iconName.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [allIcons, searchTerm])

  // Update displayed icons when filter changes or load more is triggered
  useEffect(() => {
    setDisplayedIcons(filteredIcons.slice(0, loadMore))
  }, [filteredIcons, loadMore])

  // Reset load more count when search changes
  useEffect(() => {
    setLoadMore(50)
  }, [searchTerm])

  const renderIcon = useCallback((iconName: string) => {
    const IconComponent = LucideIcons[
      iconName as keyof typeof LucideIcons
    ] as React.ComponentType<any>
    if (!IconComponent) return null
    return <IconComponent size={20} />
  }, [])

  const handleLoadMore = useCallback(() => {
    if (isLoading || displayedIcons.length >= filteredIcons.length) return

    setIsLoading(true)
    // Simulate a small delay to prevent too rapid loading
    setTimeout(() => {
      setLoadMore((prev) => prev + 50)
      setIsLoading(false)
    }, 150)
  }, [isLoading, displayedIcons.length, filteredIcons.length])

  // Intersection Observer effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0]
        if (target.isIntersecting && !isLoading && displayedIcons.length < filteredIcons.length) {
          handleLoadMore()
        }
      },
      {
        threshold: 1.0, // Trigger when the element is fully visible
        rootMargin: '0px 0px 50px 0px', // Trigger 50px before the element comes into view
      },
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current)
      }
    }
  }, [handleLoadMore, isLoading, displayedIcons.length, filteredIcons.length])

  useEffect(() => {
    function handleOnFocus() {
      if (!inputRef?.current || !observerRef.current) return
      setOpen(true)
      observerRef.current.scrollIntoView({ behavior: 'smooth' })
      observerRef.current.focus()
    }

    if (inputRef.current) {
      inputRef.current.addEventListener('focus', handleOnFocus)
    }
    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener('focus', handleOnFocus)
      }
    }
  }, [inputRef, observerRef])

  const selectedIconName = useMemo(() => {
    return value ? value : ''
  }, [value])

  const selectedIcon = useMemo(() => {
    return renderIcon(selectedIconName)
  }, [selectedIconName])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="field-type  tailwind-scope  flex-1">
        <FieldLabel htmlFor={`field-${path}`} label={label} required={field.required} />
        <PopoverTrigger asChild disabled={!!readOnly}>
          <Button
            variant="outline"
            role="combobox"
            className="w-full justify-between disabled:cursor-not-allowed disabled:opacity-50 bg-card min-h-[38px]"
            aria-expanded={open}
            disabled={!!readOnly}
            aria-readonly={!!readOnly}
          >
            {selectedIcon && selectedIconName ? (
              <div className="flex items-center gap-2">
                {selectedIcon}
                <span>{selectedIconName}</span>
              </div>
            ) : (
              <span>Select an icon</span>
            )}
            <LucideIcons.ChevronsUpDownIcon className="ms-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <TextInput
          value={value}
          onChange={setValue}
          path={path || field.name}
          readOnly={Boolean(readOnly)}
          className="hidden"
          inputRef={inputRef as React.RefObject<HTMLInputElement>} // Pass the ref to the TextInput for accessibility
        />
      </div>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder="Search icon..."
            value={searchTerm}
            onValueChange={setSearchTerm}
          />
          <CommandList>
            <CommandEmpty>No icon found.</CommandEmpty>
            <CommandGroup>
              {displayedIcons?.map((iconName) => (
                <CommandItem
                  key={iconName}
                  value={iconName}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue)
                    setOpen(false)
                  }}
                >
                  <LucideIcons.CheckIcon
                    className={cn('me-2 h-4 w-4', value === iconName ? 'opacity-100' : 'opacity-0')}
                  />
                  {renderIcon(iconName)}
                  <span className="ms-2">{iconName.replace(/([A-Z])/g, ' $1').trim()}</span>
                </CommandItem>
              ))}
              {displayedIcons.length < filteredIcons.length && (
                <div
                  ref={observerRef}
                  className="flex items-center justify-center py-2 text-sm text-muted-foreground"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Loading more icons...
                    </div>
                  ) : (
                    <span>
                      Scroll for more icons... ({filteredIcons.length - displayedIcons.length}{' '}
                      remaining)
                    </span>
                  )}
                </div>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
