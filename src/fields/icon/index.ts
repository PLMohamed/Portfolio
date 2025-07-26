import deepMerge from '@/utilities/deepMerge'
import { Field } from 'payload'
import { getAllLucideIcons } from './getAllIcons'

type Icon = (options?: { overrides?: Partial<Field>; required?: boolean }) => Field

/**
 * Icon field type for Payload CMS.
 * A selection for a range of icons from luicde icons library.
 * @returns
 */
export const iconField: Icon = (options = { overrides: {}, required: false }) => {
  const { overrides, required } = options
  const icons = ['Select an icon']

  const iconField: Field = {
    name: 'icon',
    type: 'select',
    options: icons.map((iconName) => ({
      label: iconName,
      value: iconName,
    })),
    required,
    admin: {
      components: {
        Field: {
          path: '@/fields/icon/IconComponent#IconList',
        },
      },
    },
  }

  return deepMerge(iconField, overrides)
}
