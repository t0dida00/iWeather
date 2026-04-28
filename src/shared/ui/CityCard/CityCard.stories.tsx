import type { Meta, StoryObj } from '@storybook/react-vite'
import CityCard from './index'

const meta = {
  title: 'Shared UI/CityCard',
  component: CityCard,
  args: {
    countryName: 'Finland',
    cityName: 'Helsinki',
    weatherCode: 2,
    tempHigh: '18°',
    tempLow: '11°',
    latitude: 60.17,
    longitude: 24.94,
    code: 'FI',
  },
} satisfies Meta<typeof CityCard>

export default meta
type Story = StoryObj<typeof meta>

export const PartlyCloudy: Story = {}

export const Rain: Story = {
  args: {
    cityName: 'London',
    countryName: 'United Kingdom',
    weatherCode: 61,
    tempHigh: '14°',
    tempLow: '9°',
    latitude: 51.51,
    longitude: -0.13,
    code: 'GB',
  },
}

export const UnknownWeather: Story = {
  args: {
    weatherCode: undefined,
    tempHigh: '--',
    tempLow: '--',
  },
}
