import type { Preview } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import '../src/app/layouts/RootLayout.module.scss'

const preview: Preview = {
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ maxWidth: 520, padding: 24 }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
