# iWeather Architecture Documentation

## High-Level Overview

iWeather is a client-rendered React application built with Vite. It integrates with Open-Meteo for geocoding and forecast data, uses TanStack React Query for server-state orchestration, and stores lightweight user preferences in browser storage.


## Application Structure

```txt
src/
  app/
    layouts/           Header and root shell
    providers/         App-level providers, including React Query
    router/            Route definitions
    styles/            Global variables, mixins, breakpoints
  features/
    preferences/       Theme and temperature-unit state
    search/            Geocoding search and history
    weather/           Forecast API, weather hook, and weather UI
  pages/               Route-level compositions
  shared/
    ui/                Cross-feature UI primitives
    utils/             Formatting and mapping utilities
```

The architecture uses feature modules for domain ownership and `shared/` for reusable primitives.



## API Integration Architecture

API calls live in feature-specific API modules:

- `features/search/api/searchApi.ts`
- `features/weather/api/weatherApi.ts`

The weather API module separates requests by data type:

- `getCurrentWeather`
- `getHourlyWeather`
- `getDailyWeather`
- `getWeatherSummary`

Each request uses shared base parameters for latitude, longitude, temperature unit, and timezone. The endpoint URLs are injected through Vite environment variables.

## State and Query Architecture

TanStack React Query owns server state. Components and hooks read query state through stable query keys:

```txt
['weatherData', 'current', lat, lon, temp]
['weatherData', 'hourly', lat, lon, temp]
['weatherData', 'daily', lat, lon, temp]
['locationSearch', debouncedSearchValue]
```

`useWeatherData` composes current, hourly, and daily query results into dashboard-friendly data:

- `todayWeatherData`
- `oneDayHourlyData`
- `sevenDayData`

Client preferences and history are intentionally separate from server state:

- Theme preference: local hook and browser storage
- Temperature unit: local hook and browser storage
- Search history: `localStorage`

## Caching Strategy

Weather data is cached according to update frequency:

| Data type | Stale time | Reason |
| --- | ---: | --- |
| Current | 15 minutes | Current conditions change most frequently |
| Hourly | 30 minutes | Forecast trend changes less frequently than current conditions |
| Daily | 3 hours | Daily forecasts are relatively stable |

The React Query provider also defines a conservative default stale time for other queries. Window-focus refetching is disabled to avoid noisy refreshes while the user is reading the dashboard.

The header reads React Query cache metadata to show the latest successful weather update timestamp across weather queries.

## Error Handling Strategy

API modules fail early when required environment variables are missing. React Query exposes request failures through `isError` and `error`, and route-level pages render simple error states.

Current behavior favors clear fallback UI over complex retry UX. Missing weather sections return `null` or placeholder states where appropriate.

## Performance Optimizations

- Debounced location search reduces API traffic while typing.
- Split weather queries avoid refetching slow-changing daily data when only current weather is stale.
- React Query cache sharing prevents duplicate requests for the same weather key.
- Route-level lazy loading is used for the dashboard page.
- SCSS modules keep CSS scoped and minimize broad style recalculation.
- ECharts components are registered explicitly to avoid importing unnecessary chart modules.

## Folder and Module Responsibilities

- `app/providers`: Application provider composition and query client setup.
- `app/router`: Route tree and route-level loading boundaries.
- `app/layouts`: Shared layout shell and header controls.
- `features/weather`: Weather API access, derived weather data hook, forecast UI, weather types.
- `features/search`: Search API integration, debounced search behavior, persisted search history.
- `features/preferences`: Theme and unit preference hooks and controls.
- `pages`: Route compositions that connect feature modules.
- `shared/ui`: Reusable UI primitives with minimal domain knowledge.
- `shared/utils`: Pure formatting, conversion, and mapping utilities.

