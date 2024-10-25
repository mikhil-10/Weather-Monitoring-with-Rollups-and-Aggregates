# Weather Dashboard Application

## Description

This application is a real-time weather monitoring system with a dashboard that allows users to view current and forecasted weather data. Built using React for the frontend, Spring Boot for the backend, and MongoDB for data storage, it integrates the OpenWeatherMap API to fetch and display weather data. Features include daily weather summaries, a 7-day forecast, temperature conversion, and visualization of weather data through dynamic UI elements.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Design Choices](#design-choices)
- [API Endpoints](#api-endpoints)
- [Dependencies](#dependencies)
- [Future Enhancements](#future-enhancements)
- [Outro](#outro)

---

### Installation

1. **Clone the repository:**
   
   `git clone https://github.com/mikhil-10/Weather-Monitoring-with-Rollups-and-Aggregates.git`
2. **Backend Installation:**
   1. Navigate to the backend directory:
      `cd backend`
   2. Install dependencies:
      `npm install`
3. **Frontend Installation:**
   1. Navigate to the frontend directory:
      `cd frontend`

   2. Install dependencies:
      `npm install`
      

### Usage

#### Backend
1. **Run the server:**
   `npm start` # Starts server 
2. **API Testing:**  
   Use Postman or a similar tool to test API endpoints.

#### Frontend
1. **Run the React app:**
   `npm start` # Launches application on localhost:3000

---

### Features

- **Daily Weather Summary:** Rolls up daily weather data, calculates daily aggregates.
- **3-hours Forecast:** Displays mini weather cards with forecast data including day, icon, max/min temperatures, and highlights today's data.
- **Temperature Conversion:** Converts temperature data from Kelvin to Celsius.
- **City Selection:** Dropdown for selecting cities to dynamically fetch and display weather data without needing a ‘Get Weather’ button.


### Design Choices

1. **Architecture**  
   - **Frontend (React)**: User interface for displaying weather data and interacting with the system.
   - **API Layer (Express)**: Backend logic and API for handling data requests.
   - **Database Layer (MongoDB)**: Stores daily summaries and forecasts for data persistence.

2. **Weather Data Management**  
   - The app retrieves and processes real-time weather data from the OpenWeatherMap API, converts the data as needed, and stores daily summaries in MongoDB.
3. **UI Components**  
   - **3-Hours Forecast Panel**: Shows mini cards for each  3 hours, providing an icon, day, max/min temperatures.
4. **Error Handling**  
   - Error handling includes validation for API responses and fallback messages in case of API failures or connection issues.
5. **Alerts** 
    - Added Alert funtionality it is dynamic if user want they can set accordingly.Default is 35 degree it can be changed according to you.
---

### API Endpoints

- **`Get /:city`**  
  - **Purpose**: Fetches weather data for a specific city.
  - **Parameters**: `city` (string) – city name.
  - **Response**: JSON object containing current and forecasted weather data.
- **`GET /forecast/:city`**  
  - **Purpose**: Retrieves stored 3 hours interval weather summaries and display.
  - **Response**: JSON object with daily aggregate data.

---

### Dependencies

#### Frontend (React)
- **React**: Core library for building UI.
- **Axios**: To communicate with the backend API and OpenWeatherMap.
- **React Bootstrap**: For UI components and styling.

#### Backend (Express/Node)
- **Express**: Backend environment for building RESTful APIs.
- **MongoDB**: NoSQL database for data persistence.

---

### Future Enhancements

- **Add Historical Data**: Store and display historical weather data for trend analysis.
- **Advanced Weather Analytics**: Incorporate additional data like humidity and wind patterns.
---

### Outro

Thank you.