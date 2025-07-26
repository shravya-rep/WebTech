# Android Weather Forecast App 🌦️📱

An Android mobile application built with Java, Node.js, MongoDB Atlas, and the Tomorrow.io API to provide real-time weather forecasts by city or current location. Designed with Google Material Design principles and implemented using Android Studio, this app supports multi-tab detailed weather views, favorites, Twitter sharing, and a responsive UI optimized for emulator devices.

## 🚀 Features

- 🔍 **City Search with Autocomplete** using Tomorrow.io API
- 📍 **Current Location Forecast** (via IPinfo or GPS)
- 📋 **Home Screen View** with current weather summary
- 📊 **Detailed Weather View**:
  - **Today** tab with key metrics like wind speed, humidity, visibility, etc.
  - **Weekly** tab with Highcharts-powered temperature trends
  - **Weather Data** tab showing cloud cover, precipitation, and humidity
- ⭐ **Favorites Management**:
  - Add/remove cities from favorites
  - Persistent storage with MongoDB Atlas
- 🕹️ **Dynamic Tabs** for favorite cities with swipe navigation
- 🐦 **One-Tap Tweet Sharing** of weather status
- 🎨 Clean UI with iconography, splash screen, card ripple effects, and progress indicators

## 🛠️ Tech Stack

- **Frontend**: Java, Android SDK, XML
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **APIs**:
  - [Tomorrow.io Weather API](https://www.tomorrow.io/weather-api/)
  - [IPinfo](https://ipinfo.io/)
- **Libraries**:
  - [Volley](https://developer.android.com/training/volley)
  - [Picasso / Glide](https://square.github.io/picasso/)
  - [Highcharts Android](https://www.highcharts.com/blog/tutorials/highcharts-android-wrapper-tutorial/)
  - Google Material Design Components

## 🔧 Setup & Installation

1. **Backend Setup**:
   - Clone backend repository and install Node dependencies
   - Set up `.env` file with Tomorrow.io and MongoDB Atlas credentials
   - Start server: `node app.js`

2. **Mobile App Setup**:
   - Open project in Android Studio
   - Connect to emulator (Pixel 5 recommended, Android 15+)
   - Run project or build APK

3. **Build APK**:
   - Run `Build > Build Bundle(s) / APK(s) > Build APK(s)` in Android Studio
   - Output APK will be found in `/app/build/outputs/apk/debug/`

## 🧠 Key Design Decisions

- Used **ViewPager with dynamic tabs** to enable seamless favorite city navigation
- Implemented **MVVM-like logic reuse** across current, search, and favorite city views
- Integrated **Highcharts** for professional-grade chart rendering
- Used **Toast** messages and **Floating Action Buttons** for intuitive UX

## 🔐 Rate Limiting & API Handling

- All API calls use non-blocking HTTP with **Volley**
- Errors are gracefully handled with fallback data or placeholder UI
- API keys secured in server-side `.env`

## 📺 Demo

A 3-minute demo video showcasing core features is given

## ✅ Known Limitations

- Favorites are not stored locally; require cloud DB availability
- No offline support (requires network)
- Designed/tested primarily on Pixel 5 emulator (Android 15)

## 🛣️ Future Enhancements

- Add push notifications for severe weather
- Enable dark mode support
- Implement offline caching with Room or SQLite
- Polish Twitter sharing with image previews

---

#Author: Shravya Shashidhar
