# iWeather

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=111)](#tech-stack)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](#tech-stack)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](#tech-stack)

## Introduction

iWeather is a responsive weather dashboard built as a Corsearch Frontend Engineer 2026 home assignment. It provides current weather, hourly trend charts, seven-day forecasts, saved search history, theme switching, and Celsius/Fahrenheit preferences.

## Purpose

The project demonstrates a production-minded frontend implementation with feature-based architecture, typed React components, API integration, client-side caching, responsive UI, and automated tests.

## Tech Stack

- **React 19** and **TypeScript**
- **Vite** for development and production builds
- **TanStack React Query** for API state and caching
- **Axios** for HTTP requests
- **React Router** for routing
- **ECharts** for forecast visualization
- **SCSS modules** for component styling
- **Storybook** for shared UI component documentation and visual review
- **JSDoc + TypeDoc** for utility documentation
- **Vitest** and **Testing Library** for tests
- **Open-Meteo** Forecast and Geocoding APIs

## Live Deployment

Live URL: [https://iweather-khaki.vercel.app/cities](https://iweather-khaki.vercel.app/cities)

Deployment notes are documented in [DEPLOYMENT.MD](./DEPLOYMENT.MD).

## Quick Start

```bash
npm install
cp .env.example .env
npm run dev
```

Open the local Vite URL printed in the terminal.

## Environment Variables

```env
VITE_OPEN_METEO_FORECAST_URL=https://api.open-meteo.com/v1/forecast
VITE_OPEN_METEO_GEOCODING_URL=https://geocoding-api.open-meteo.com/v1/search
```

## Useful Commands

```bash
npm run build           # Type-check and create production build
npm run storybook       # Start Storybook for shared UI components
npm run build-storybook # Build static Storybook assets
npm test                # Run all tests
npm run preview         # Preview production build locally
```

## Docker

Build and run the production container:

```bash
docker compose up --build
```

Open [http://localhost:8080/cities](http://localhost:8080/cities).

The Docker build uses the same Vite environment variables listed above. If you need to override them, set them in your shell or `.env` before running Docker Compose.

## Documentation

- [Architecture](./ARCHITECTURE.md)
- [Deployment](./DEPLOYMENT.MD)
