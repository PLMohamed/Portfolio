import { TextFieldSingleValidation } from 'payload'
import { getAllLucideIcons } from '../getAllIcons'

export const validateIcons: TextFieldSingleValidation = (value, options) => {
  if (!value && options.required) {
    return 'Icon is required'
  }

  const icons = getAllLucideIcons()

  if (value && !icons.includes(value)) {
    return `Icon "${value}" is not a valid Lucide icon.`
  }

  return true
}
