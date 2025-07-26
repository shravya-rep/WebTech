# 🌤️ WeatherNow: Real-Time Weather Search Web App

A responsive full-stack web application built using **Angular**, **Bootstrap**, **Node.js**, and **MongoDB Atlas**. It delivers real-time weather forecasts, location-based searches, and interactive data visualizations by integrating various third-party APIs.

## 🚀 Features

- 🌐 **Search Weather by Location**: Users can search using street, city, and state or auto-detect their current location.
- 📍 **Autocomplete Support**: Google Places API enables city name suggestions in real-time.
- 🗺️ **Forecast Visualizations**: Interactive weather data is displayed in three tabs:
  - **Day View** – Cards for upcoming 6 days.
  - **Temperature Chart** – Min/Max temperatures for 15 days using HighCharts.
  - **Meteogram** – Hourly temperature and precipitation forecasts over 5 days.
- 📊 **Dynamic UI**: Displays progress bar, error alerts, and real-time validation using Angular Material and Bootstrap.
- ⭐ **Favorites Support**: Users can bookmark cities; favorites persist using MongoDB Atlas.
- 🐦 **Social Sharing**: Tweet the forecast summary via X (formerly Twitter).
- 📱 **Fully Responsive**: Optimized for both mobile and desktop views.

## 🧩 Architecture

```
[Client (Angular + Bootstrap)]
          ↕ (AJAX/HttpClient)
[Node.js Backend (Express)]
          ↕
[Third-Party APIs]
    ├── Tomorrow.io (Weather)
    ├── Google Geocoding
    ├── Google Places
    ├── IPInfo (User location)
    └── MongoDB Atlas (Favorites storage)
```

## 🛠️ Tech Stack

- **Frontend**: Angular 17, Bootstrap 5, Angular Material, Highcharts
- **Backend**: Node.js (Express)
- **Database**: MongoDB Atlas (NoSQL, cloud-based)
- **APIs**:
  - Tomorrow.io
  - Google Geocode, Maps, and Places
  - IPInfo
  - X (Twitter) Web Intents

## 💡 Prompt & Rate-Limiting Strategy

- **Tomorrow.io requests** are routed through a Node.js proxy to protect API keys and manage quota usage.
- Client APIs (Google, IPinfo) are accessed directly unless restricted.
- Error handling includes fallback UI for rate limit errors and invalid responses.

## 📦 Build & Run Instructions

### Prerequisites

- Node.js 18+
- Angular CLI 17+
- MongoDB Atlas account
- API keys for Tomorrow.io, Google Maps, Places, and Geocode

### Setup

```bash
# Frontend
cd angular-frontend
npm install
ng serve

# Backend
cd backend
npm install
node index.js
```

### Deployment

Deploy both frontend and backend on a single cloud service (e.g., GCP App Engine, AWS Elastic Beanstalk, or Azure Web Apps).

## ⚠️ Known Limitations

- Initial load time may vary due to real-time API calls.
- Twitter/X share may not work on mobile in incognito due to OAuth restrictions.
- Favorites are stored only by city/state (no deduping by lat/long).

## 🔮 Future Enhancements

- Add multi-language support.
- Display air quality index and pollen forecast.
- Integrate Google OAuth for personalized user profiles.

## Author: Shravya Shashidhar
