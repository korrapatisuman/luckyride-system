# 🚖 LuckyRide System

LuckyRide is a complete ride-booking platform consisting of multiple applications connected to a single backend system.

---

## 📦 Project Structure

```
luckyride-system/
│
├── backend/        # Spring Boot Backend API
├── mobile-app/     # Expo React Native (User App)
├── admin-panel/    # React Admin Dashboard
├── website/        # Public Website (Pending)
```

---

## 🚀 Features

### 👤 User (Mobile App)

* User Registration & Login
* Book a Ride
* View Ride History
* Track Ride Status

### 🛠️ Admin Panel

* Manage Users
* Manage Rides
* Update Ride Status
* Dashboard Overview

### 🌐 Website

* Landing Page
* Service Information
* Ride Booking (Planned)

---

## ⚙️ Tech Stack

### Backend

* Spring Boot
* Spring Security (JWT)
* JPA / Hibernate
* PostgreSQL / MySQL

### Frontend

* React.js (Admin Panel)
* Expo React Native (Mobile App)
* React.js (Website)

---

## 🔗 API Base URL

```
http://localhost:8080/api
```

---

## 📱 Mobile Setup

```
cd mobile-app
npm install
npx expo start
```

Make sure backend is running and update API base URL with your local IP.

---

## 🖥️ Admin Panel Setup

```
cd admin-panel
npm install
npm start
```

---

## 🌐 Website Setup

```
cd website
npm install
npm start
```

---

## 🛠️ Backend Setup

```
cd backend
mvn clean install
mvn spring-boot:run
```

---

## 🔐 Authentication

* JWT-based authentication
* Token required for protected APIs

---

## 🔄 Ride Flow

```
Requested → Accepted → Started → Completed → Cancelled
```

---

## 📌 Future Enhancements

* Payment Integration
* Driver App
* Live Tracking (Maps)
* Notifications (Firebase)

---

## 👨‍💻 Author

Suman K

---

## 📄 License

This project is for learning and development purposes.
