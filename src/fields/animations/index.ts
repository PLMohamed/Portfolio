import deepMerge from '@/utilities/deepMerge'
import { Field } from 'payload'

// AnimationProps Based on type text,image
type Animation = (options?: {
  overrides?: Partial<Field>
  required?: boolean
  fieldType?: 'text' | 'image' | 'card'
}) => Field

export const animationField: Animation = (
  options = { overrides: {}, required: false, fieldType: 'text' },
) => {
  const { overrides, required, fieldType } = options

  const animationFieldBase: Field = {
    name: 'animation',
    type: 'group',
    label: 'Animation',
    fields: [],
    required,
  }

  switch (fieldType) {
    case 'image':
      animationFieldBase.fields = [
        {
          name: 'image-animation',
          type: 'select',
          label: 'Image Animation',
          options: [
            { label: 'Fade In', value: 'fade-in' },
            { label: 'Slide In', value: 'slide-in' },
            { label: 'Zoom In', value: 'zoom-in' },
          ],
        },
        {
          name: 'image-animation-duration',
          type: 'number',
          label: 'Animation Duration (ms)',
          defaultValue: 500,
        },
        {
          name: 'image-animation-delay',
          type: 'number',
          label: 'Animation Delay (ms)',
          defaultValue: 0,
        },
      ]
      break
    case 'card':
      animationFieldBase.fields = [
        {
          name: 'card-animation',
          type: 'select',
          label: 'Card Animation',
          options: [
            { label: 'Fade In', value: 'fade-in' },
            { label: 'Slide In', value: 'slide-in' },
            { label: 'Zoom In', value: 'zoom-in' },
          ],
        },
        {
          name: 'card-animation-duration',
          type: 'number',
          label: 'Animation Duration (ms)',
          defaultValue: 500,
        },
        {
          name: 'card-animation-delay',
          type: 'number',
          label: 'Animation Delay (ms)',
          defaultValue: 0,
        },
      ]
      break
    case 'text':
    default:
      animationFieldBase.fields = [
        {
          name: 'text-animation',
          type: 'select',
          label: 'Text Animation',
          options: [
            { label: 'Fade In', value: 'fade-in' },
            { label: 'Slide In', value: 'slide-in' },
            { label: 'Zoom In', value: 'zoom-in' },
            {
              label: 'Bounce',
              value: 'bounce',
            },
            {
              label: 'Typewriter',
              value: 'typewriter',
            },
          ],
        },
        {
          name: 'text-animation-duration',
          type: 'number',
          label: 'Animation Duration (ms)',
          defaultValue: 500,
        },
        {
          name: 'text-animation-delay',
          type: 'number',
          label: 'Animation Delay (ms)',
          defaultValue: 0,
        },
      ]
      break
  }

  return deepMerge(animationFieldBase, overrides)
}
