import type { Meta, StoryObj } from '@storybook/react-vite'
import Card from './index'

const meta = {
  title: 'Shared UI/Card',
  component: Card,
  args: {
    width: 260,
    height: 'auto',
    padding: 16,
    borderRadius: 8,
    children: (
      <div>
        <strong>Helsinki</strong>
        <p style={{ marginTop: 8 }}>Cloudy, 18°C</p>
      </div>
    ),
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const InnerSurface: Story = {
  args: {
    background: 'var(--card-inner-background)',
    borderColor: 'var(--card-inner-border)',
  },
}
