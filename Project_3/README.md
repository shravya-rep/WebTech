# WeatherNow — Full-Stack Weather Forecast App

**Live Demo:** _deploy to Render and paste your URL here_

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/shravya-rep/weather-app)

A full-stack weather application built with **React + TypeScript**, **Node.js/Express**, and **MongoDB Atlas**. Users can search any U.S. location by address or auto-detect their current position to get a 6-day forecast, interactive charts, a detailed day view with Google Maps, and persistent favorites — all in a responsive single-page app.

---

## Features

- **Address search** — Enter a street, city, and state; resolved to coordinates via the Google Geocoding API
- **Auto-detect location** — One-click current location via IPInfo geolocation
- **City autocomplete** — Real-time city suggestions powered by Google Places API
- **6-day forecast table** — Date, weather status with icon, high/low temps, and wind speed
- **Day detail view** — Click any row for a full breakdown: apparent temp, sunrise/sunset, humidity, visibility, cloud cover, and an embedded Google Map
- **Temperature Range Chart** — 6-day min/max area-range chart (Highcharts)
- **Meteogram** — 5-day hourly chart showing temperature, humidity, air pressure, and wind barbs (Highcharts)
- **Favorites** — Star any city to save it to MongoDB Atlas; reload it from the Favourites tab anytime
- **X (Twitter) sharing** — Share the current forecast directly to X with one click
- **Animated transitions** — Smooth slide animations between list and detail views (Framer Motion)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite |
| UI | Bootstrap 5, React-Bootstrap |
| Charts | Highcharts, highcharts-react-official |
| Maps | @react-google-maps/api |
| Animations | Framer Motion |
| Backend | Node.js, Express |
| Database | MongoDB Atlas (Mongoose) |
| Weather Data | Tomorrow.io API |
| Location | Google Geocoding API, Google Places API, IPInfo |
| Sharing | X (Twitter) Web Intents |

---

## Architecture

```
┌─────────────────────────────────────┐
│         Browser (React + TS)        │
│                                     │
│  Inputform → ResultLayout           │
│      ↓             ↓                │
│  Favorites    Rightpage (Detail)    │
│               ├── Chart1 (Range)    │
│               ├── Chart2 (Meteogram)│
│               ├── MapDisp (GMaps)   │
│               └── Twitter (Share)   │
└────────────┬────────────────────────┘
             │ fetch (relative URLs)
┌────────────▼────────────────────────┐
│       Node.js / Express Backend     │
│                                     │
│  /processdata  → Tomorrow.io API    │
│  /autocomplete → Google Places API  │
│  /storedata    → MongoDB Atlas      │
│  /loaddata     → MongoDB Atlas      │
│  /deletedata   → MongoDB Atlas      │
│  /loadacity    → MongoDB Atlas      │
└─────────────────────────────────────┘
```

The backend acts as a proxy for all third-party API calls, keeping API keys off the client.

---

## Project Structure

```
Project_3/
├── Backend/
│   ├── index.js          # Express server, API proxy routes, MongoDB connection
│   └── package.json
└── React-Typescript/
    ├── src/
    │   ├── components/
    │   │   ├── inputform/        # Search form, autocomplete, IP detection
    │   │   ├── resultLayout/     # 6-day table + tabs (Day View, Charts, Meteogram)
    │   │   ├── rightpage/        # Day detail view with table + map
    │   │   ├── chart1/           # Highcharts temperature range chart
    │   │   ├── chart2/           # Highcharts meteogram (hourly)
    │   │   ├── mapDisp/          # Google Maps embed
    │   │   ├── favorites/        # Favorites table + row components
    │   │   └── twitter/          # X share button
    │   └── App.tsx
    ├── public/
    │   └── Images/               # Weather condition SVG icons
    ├── package.json
    └── vite.config.ts
```

---

## Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- A **MongoDB Atlas** cluster (free tier works)
- API keys for:
  - [Tomorrow.io](https://tomorrow.io) — weather data
  - [Google Cloud](https://console.cloud.google.com) — Geocoding API, Places API, Maps JavaScript API
  - [IPInfo](https://ipinfo.io) — IP geolocation (free tier works)

---

## Setup & Run

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd Project_3
```

### 2. Configure API keys

Copy the example env files and fill in your own keys:

```bash
cp Backend/.env.example Backend/.env
cp React-Typescript/.env.example React-Typescript/.env
```

**`Backend/.env`**
```
MONGODB_URI=your_mongodb_atlas_connection_string
GOOGLE_API_KEY=your_google_api_key
TOMORROW_API_KEY=your_tomorrow_io_api_key
```

**`React-Typescript/.env`**
```
VITE_GOOGLE_API_KEY=your_google_api_key
VITE_IPINFO_TOKEN=your_ipinfo_token
```

> All three Google services (Geocoding, Places, Maps JS) can share one key — just enable all three on the same key in Google Cloud Console.

> Never commit `.env` files — they are already listed in `.gitignore`.

### 3. Start the backend

```bash
cd Backend
npm install
node index.js
# Server listening on port 8080
```

### 4. Start the frontend (development)

```bash
cd React-Typescript
npm install
npm run dev
# App running at http://localhost:5173
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Building for Production

```bash
cd React-Typescript
npm run build
# Output goes to dist/
```

The Express backend is already configured to serve the built frontend from `react-typescript/dist`:

```js
app.use(express.static('react-typescript/dist'));
```

So for production, build the frontend first, then run `node index.js` — a single Node process serves everything on port 8080.

---

## API Routes

| Method | Route | Description |
|---|---|---|
| GET | `/processdata?lat=&long=` | Fetches 6-day + hourly forecast from Tomorrow.io |
| GET | `/autocomplete?cityval=` | Returns city name suggestions from Google Places |
| GET | `/storedata?latlongval=&city=&state=` | Saves a favorite city to MongoDB |
| GET | `/loaddata` | Returns all saved favorites |
| GET | `/deletedata?_id=` | Deletes a favorite by MongoDB `_id` |
| GET | `/loadacity?_id=` | Loads a single favorite by `_id` |

---

## Usage

1. **Search by address** — Fill in Street, City, and State, then click Search
2. **Search by location** — Check "Current Location" to auto-fill via IP geolocation, then click Search
3. **Browse forecast** — Switch between Day View, Daily Temp Chart, and Meteogram tabs
4. **View details** — Click any row in Day View to see a full breakdown and map
5. **Save a favorite** — Click the star icon next to the city name
6. **Load a favorite** — Click Favourites, then click any saved city
7. **Share** — Click the X icon on the detail page to tweet the current conditions

---

## Deploying to Render (Free)

This project is pre-configured for [Render](https://render.com) via `render.yaml` at the repo root. One service hosts both the frontend and backend.

### Steps

1. Push this repo to GitHub (make sure `.env` files are NOT committed)

2. Go to [render.com](https://render.com) → **New** → **Blueprint** → connect your GitHub repo
   Render will detect `render.yaml` automatically

3. In the Render dashboard for the service, go to **Environment** and add these variables:

   | Key | Value |
   |---|---|
   | `MONGODB_URI` | Your MongoDB Atlas connection string |
   | `GOOGLE_API_KEY` | Your Google API key |
   | `TOMORROW_API_KEY` | Your Tomorrow.io API key |
   | `VITE_GOOGLE_API_KEY` | Your Google API key (same as above) |
   | `VITE_IPINFO_TOKEN` | Your IPInfo token |

4. Click **Deploy** — Render will build the frontend and start the backend automatically

5. Your app will be live at `https://<your-service-name>.onrender.com`

> **Note:** Free tier Render services spin down after 15 minutes of inactivity. The first request after a spin-down takes ~30 seconds. Upgrade to a paid plan to keep it always-on.

### MongoDB Atlas — make sure your cluster is running

Free-tier Atlas clusters **pause automatically** after 60 days of no activity. Before deploying:
1. Log in to [cloud.mongodb.com](https://cloud.mongodb.com)
2. Resume your cluster if it shows as Paused
3. Under **Network Access**, add `0.0.0.0/0` to allow connections from Render's IPs

---

## Known Limitations

- Weather data timezone is fixed to `America/Los_Angeles` — results for other timezones may show slightly offset times
- Favorites do not deduplicate — saving the same city twice creates two entries
- X share may not open on mobile browsers in private/incognito mode due to OAuth restrictions
- IPInfo free tier has a monthly request cap

