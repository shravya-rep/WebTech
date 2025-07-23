# 🌦️ Weather Forecast Web Application

## Overview

A full-stack weather forecast application that provides real-time weather data, powered by multiple external APIs. Users can search for weather information based on their geolocation or a manually entered address. The application features a modern user interface with interactive weather cards, tables, and graphs.

## 🔧 Features

- **Dynamic Location Search**
  - Auto-detects location using IP-based geolocation (ipinfo.io)
  - Manual input option using Google Maps Geocoding API

- **Backend (Flask)**
  - Acts as a proxy to securely access the Tomorrow.io and Google APIs
  - Fetches latitude and longitude for input address and retrieves forecast data
  - Returns structured JSON to the frontend

- **Frontend (JavaScript, AJAX)**
  - Submits and processes user queries without page reload
  - Displays:
    - **Current weather summary** in a card view
    - **15-day forecast table**
    - **Expandable weather details** for each day
    - **Highcharts graphs** for daily and hourly weather trends

- **Highcharts Integration**
  - Interactive charts to display:
    - Min/Max temperature over the next 15 days
    - Hourly conditions for selected days

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript, Highcharts
- **Backend:** Python Flask
- **APIs:**
  - Tomorrow.io Weather API
  - Google Maps Geocoding API
  - ipinfo.io
- **Cloud Hosting:** Compatible with Google Cloud, AWS, or Azure

## 🌐 User Experience

- Responsive layout and hover effects
- Input validation and tooltips for user-friendly error handling
- Instant visual feedback and loading states
- All weather icons and values mapped from API responses

## 📌 Highlights

- Modular backend with clean routing
- Fully asynchronous frontend for a seamless user experience
- Graceful handling of errors and empty API results
- Suitable for deployment on any major cloud provider

---

> This project demonstrates strong integration between frontend interactivity and backend API orchestration, making it ideal for showcasing full-stack development skills in weather data visualization.

#Author
Shravya Shashidhar
