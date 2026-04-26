import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
  type LucideIcon,
} from "lucide-react"

type WeatherMeta = {
  label: string
  icon: LucideIcon
}

export const WEATHER_CODE_MAP: Record<number, WeatherMeta> = {
  0: {
    label: "Clear sky",
    icon: Sun,
  },

  1: {
    label: "Mainly clear",
    icon: CloudSun,
  },
  2: {
    label: "Partly cloudy",
    icon: CloudSun,
  },
  3: {
    label: "Overcast",
    icon: Cloud,
  },

  45: {
    label: "Fog",
    icon: CloudFog,
  },
  48: {
    label: "Rime fog",
    icon: CloudFog,
  },

  51: {
    label: "Light drizzle",
    icon: CloudDrizzle,
  },
  53: {
    label: "Moderate drizzle",
    icon: CloudDrizzle,
  },
  55: {
    label: "Dense drizzle",
    icon: CloudDrizzle,
  },

  56: {
    label: "Freezing drizzle",
    icon: CloudDrizzle,
  },
  57: {
    label: "Dense freezing drizzle",
    icon: CloudDrizzle,
  },

  61: {
    label: "Slight rain",
    icon: CloudRain,
  },
  63: {
    label: "Moderate rain",
    icon: CloudRain,
  },
  65: {
    label: "Heavy rain",
    icon: CloudRain,
  },

  66: {
    label: "Freezing rain",
    icon: CloudRain,
  },
  67: {
    label: "Heavy freezing rain",
    icon: CloudRain,
  },

  71: {
    label: "Light snow",
    icon: CloudSnow,
  },
  73: {
    label: "Moderate snow",
    icon: CloudSnow,
  },
  75: {
    label: "Heavy snow",
    icon: CloudSnow,
  },

  77: {
    label: "Snow grains",
    icon: CloudSnow,
  },

  80: {
    label: "Rain showers",
    icon: CloudRain,
  },
  81: {
    label: "Heavy rain showers",
    icon: CloudRain,
  },
  82: {
    label: "Violent rain showers",
    icon: CloudRain,
  },

  85: {
    label: "Snow showers",
    icon: CloudSnow,
  },
  86: {
    label: "Heavy snow showers",
    icon: CloudSnow,
  },

  95: {
    label: "Thunderstorm",
    icon: CloudLightning,
  },
  96: {
    label: "Thunderstorm with hail",
    icon: CloudLightning,
  },
  99: {
    label: "Severe thunderstorm with hail",
    icon: CloudLightning,
  },
}