# WeatherNow — Full-Stack Weather Forecast App

**Live Demo:** [https://weather-app-nine-zeta-71.vercel.app](https://weather-app-nine-zeta-71.vercel.app)

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
| Frontend Hosting | Vercel |
| Backend Hosting | Railway |

---

## Architecture

```
┌─────────────────────────────────────┐
│         Browser (React + TS)        │
│  Deployed on Vercel                 │
│                                     │
│  Inputform → ResultLayout           │
│      ↓             ↓                │
│  Favorites    Rightpage (Detail)    │
│               ├── Chart1 (Range)    │
│               ├── Chart2 (Meteogram)│
│               ├── MapDisp (GMaps)   │
│               └── Twitter (Share)   │
└────────────┬────────────────────────┘
             │ fetch (VITE_API_URL in prod, Vite proxy in dev)
┌────────────▼────────────────────────┐
│   Node.js / Express Backend         │
│   Deployed on Railway               │
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
weather-app/
├── backend/                      # Shared backend (used by both Web and Android)
│   ├── index.js                  # Express server, API proxy routes, MongoDB connection
│   └── package.json
├── Web/
│   └── frontend/                 # React/TS app → deploys to Vercel
│       ├── src/
│       │   ├── components/
│       │   │   ├── inputform/    # Search form, autocomplete, IP detection
│       │   │   ├── resultLayout/ # 6-day table + tabs (Day View, Charts, Meteogram)
│       │   │   ├── rightpage/    # Day detail view with table + map
│       │   │   ├── chart1/       # Highcharts temperature range chart
│       │   │   ├── chart2/       # Highcharts meteogram (hourly)
│       │   │   ├── mapDisp/      # Google Maps embed
│       │   │   ├── favorites/    # Favorites table + row components
│       │   │   └── twitter/      # X share button
│       │   └── App.tsx
│       ├── public/
│       │   └── Images/           # Weather condition SVG icons
│       ├── vercel.json           # SPA routing rewrites for Vercel
│       └── vite.config.ts
└── Android/
    └── mobile/                   # Android app (Kotlin) → deploys to Play Store
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

## Local Setup & Run

### 1. Clone the repo

```bash
git clone https://github.com/shravya-rep/weather-app
cd weather-app
```

### 2. Configure API keys

Copy the example env files and fill in your own keys:

```bash
cp backend/.env.example backend/.env
cp Web/frontend/.env.example Web/frontend/.env
```

**`backend/.env`**
```
MONGODB_URI=your_mongodb_atlas_connection_string
GOOGLE_API_KEY=your_google_api_key
TOMORROW_API_KEY=your_tomorrow_io_api_key
```

**`Web/frontend/.env`**
```
VITE_GOOGLE_API_KEY=your_google_api_key
VITE_IPINFO_TOKEN=your_ipinfo_token
VITE_API_URL=
```

> `VITE_API_URL` is left empty for local dev — the Vite dev server proxies all API calls to `localhost:8080` automatically.

> All three Google services (Geocoding, Places, Maps JS) can share one key — just enable all three on the same key in Google Cloud Console.

> Never commit `.env` files — they are already listed in `.gitignore`.

### 3. Start the backend

```bash
cd backend
npm install
node index.js
# Server listening on port 8080
```

### 4. Start the frontend

```bash
cd Web/frontend
npm install
npm run dev
# App running at http://localhost:5173
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

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

## Deployment

This app is split into two services:

- **Frontend** → [Vercel](https://vercel.com) (serves the built React app)
- **Backend** → [Railway](https://railway.app) (runs the Express API server)

### Deploy the Backend to Railway

1. Create a new project on Railway and connect your GitHub repo
2. Set the **Root Directory** to `backend`
3. Railway will auto-detect Node.js and run `node index.js`
4. Add these environment variables in the Railway dashboard:

   | Key | Value |
   |---|---|
   | `MONGODB_URI` | Your MongoDB Atlas connection string |
   | `GOOGLE_API_KEY` | Your Google API key |
   | `TOMORROW_API_KEY` | Your Tomorrow.io API key |
   | `FRONTEND_URL` | Your Vercel frontend URL (e.g. `https://weather-app.vercel.app`) |
   | `NODE_ENV` | `production` |

5. Copy the Railway service URL (e.g. `https://weather-app-backend.up.railway.app`)

### Deploy the Frontend to Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project** → connect your GitHub repo
2. Set the **Root Directory** to `Web/frontend`
3. Vercel will auto-detect Vite — no build configuration needed
4. Add these environment variables in the Vercel dashboard:

   | Key | Value |
   |---|---|
   | `VITE_GOOGLE_API_KEY` | Your Google API key |
   | `VITE_IPINFO_TOKEN` | Your IPInfo token |
   | `VITE_API_URL` | Your Railway backend URL (from the step above) |

5. Click **Deploy**

> The `vercel.json` in `Web/frontend/` is already configured to handle SPA client-side routing.

### MongoDB Atlas — make sure your cluster is running

Free-tier Atlas clusters **pause automatically** after 60 days of no activity. Before deploying:
1. Log in to [cloud.mongodb.com](https://cloud.mongodb.com)
2. Resume your cluster if it shows as Paused
3. Under **Network Access**, add `0.0.0.0/0` to allow connections from Railway's IPs

---

## Android App

[![Android Demo](https://img.youtube.com/vi/88jpehsy6fY/0.jpg)](https://youtu.be/88jpehsy6fY)

A native Android companion app (Kotlin) is available in the `Android/` directory. It shares the same Railway backend and MongoDB Atlas database.

**Features:**
- City search with autocomplete
- Current location detection via IPinfo
- Today / Weekly / Weather Data tabs (ViewPager2 + TabLayout)
- Highcharts temperature range chart and solid gauge rendered via WebView
- Favorites stored in MongoDB Atlas (add/remove with FAB)
- One-tap Twitter/X sharing

See [`Android/README.md`](Android/README.md) for setup instructions.

---

## Known Limitations

- Weather data timezone is fixed to `America/Los_Angeles` — results for other timezones may show slightly offset times
- X share may not open on mobile browsers in private/incognito mode due to OAuth restrictions
- IPInfo free tier has a monthly request cap
