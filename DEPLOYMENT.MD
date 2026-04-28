# iWeather Deployment Guide

This document describes how to verify, build, document, and deploy iWeather.

## Prerequisites

- Node.js 24 or newer
- npm 10 or newer
- Git
- Access to the repository
- Deployment target, such as Vercel or another static hosting provider

The app uses Open-Meteo and does not require an API key.

## Environment Setup

Create a local environment file before running or building the app:

```bash
cp .env.example .env
```

Expected variables:

```env
VITE_OPEN_METEO_FORECAST_URL=https://api.open-meteo.com/v1/forecast
VITE_OPEN_METEO_GEOCODING_URL=https://geocoding-api.open-meteo.com/v1/search
```

## Install Dependencies

Use `npm ci` in CI or when reproducing an exact lockfile install:

```bash
npm ci
```

Use `npm install` during normal local development:

```bash
npm install
```

## Run Tests

Run the complete test suite:

```bash
npm test
```

Run tests in watch mode while developing:

```bash
npm run test:watch
```

Run tests for a specific area:

```bash
npm test -- common                 # Shared date/time and unit helpers
npm test -- roundNumber            # Shared numeric formatting helper
npm test -- weatherCodes           # Open-Meteo weather-code metadata
npm test -- CityCard               # Reusable city summary card
npm test -- CurrentWeatherPanel    # Current weather panel
npm test -- TodaysHighlight        # Today's weather highlight cards
npm test -- SevenDayForecast       # Seven-day forecast list
npm test -- useSearchHistory       # Persisted search history hook
npm test -- useTemp                # Temperature preference hook
npm test -- useTheme               # Theme preference hook
npm test -- CitiesPage             # Cities route
npm test -- DashboardPage          # Dashboard route
```

Current test coverage includes:

- Utility formatting and conversion helpers
- Weather-code mapping
- Search history behavior
- Temperature and theme preferences
- City cards and route-level pages
- Weather forecast components

## Run Lint

```bash
npm run lint
```

Note: if the repository still contains the known Fast Refresh warning in `src/app/router/routers.tsx`, resolve that before making lint a required deployment gate.

## Build Locally

Create a production build:

```bash
npm run build
```

This command runs TypeScript project checks and then creates static assets in `dist/`.

Preview the production build locally:

```bash
npm run preview
```

## Build Docs

The project uses TypeDoc for generated API documentation.

Generate docs for the shared utility modules:

```bash
npx typedoc src/shared/utils/common.ts src/shared/utils/roundNumber.ts src/shared/utils/weatherCodes.ts
```

Generated documentation is written to `docs/` by default.

To inspect the generated docs locally, open:

```txt
docs/index.html
```

## CI Verification

The GitHub Actions workflow runs on pushes and pull requests to `main` and `ep-*` branches.

Current CI steps:

```bash
npm ci
npm run build
npm test
```

## Deployment

The project is a static Vite app and can be deployed to Vercel or any static hosting provider.

Recommended Vercel settings:

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Output directory | `dist` |
| Install command | `npm ci` |
| Framework preset | Vite |

Configure these environment variables in the deployment provider:

```env
VITE_OPEN_METEO_FORECAST_URL=https://api.open-meteo.com/v1/forecast
VITE_OPEN_METEO_GEOCODING_URL=https://geocoding-api.open-meteo.com/v1/search
```

## Pre-Deployment Checklist

- Dependencies install successfully with `npm ci`.
- All tests pass with `npm test`.
- Production build passes with `npm run build`.
- Generated docs are current if utility APIs changed.
- Required environment variables are configured.
- Production preview works locally with `npm run preview`.
