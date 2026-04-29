FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG VITE_OPEN_METEO_FORECAST_URL=https://api.open-meteo.com/v1/forecast
ARG VITE_OPEN_METEO_GEOCODING_URL=https://geocoding-api.open-meteo.com/v1/search
ENV VITE_OPEN_METEO_FORECAST_URL=$VITE_OPEN_METEO_FORECAST_URL
ENV VITE_OPEN_METEO_GEOCODING_URL=$VITE_OPEN_METEO_GEOCODING_URL

RUN npm run build

FROM nginx:1.27-alpine AS production

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
