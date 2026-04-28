import type { Meta, StoryObj } from '@storybook/react-vite'
import { Moon, Sun } from 'lucide-react'
import Toggle from './index'

const meta = {
  title: 'Shared UI/ToggleButton',
  component: Toggle,
  args: {
    value: 'light',
    options: [
      { label: 'Light', value: 'light', icon: <Sun size={16} /> },
      { label: 'Dark', value: 'dark', icon: <Moon size={16} /> },
    ],
    onChange: (value) => console.log('Selected', value),
  },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {}

export const Dark: Story = {
  args: {
    value: 'dark',
  },
}
