import type { Meta, StoryObj } from '@storybook/react-vite'
import Button from './index'

const meta = {
  title: 'Shared UI/Button',
  component: Button,
  args: {
    children: 'Search',
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithLongLabel: Story = {
  args: {
    children: 'View forecast details',
  },
}
