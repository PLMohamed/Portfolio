import deepMerge from '@/utilities/deepMerge'
import { Field } from 'payload'
import { validateIcons } from './hooks/validateIcons'

type Icon = (options?: { overrides?: Partial<Field>; required?: boolean }) => Field

/**
 * Icon field type for Payload CMS.
 * A selection for a range of icons from luicde icons library.
 * @returns
 */
export const iconField: Icon = (options = { overrides: {}, required: false }) => {
  const { overrides, required } = options

  const iconField: Field = {
    name: 'icon',
    type: 'text',
    required,
    admin: {
      components: {
        Field: {
          path: '@/fields/icon/IconComponent#IconList',
        },
      },
    },
    validate: validateIcons,
  }

  return deepMerge(iconField, overrides)
}
