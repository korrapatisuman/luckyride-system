# 🚖 LuckyRide System

A full-stack ride booking and management system built using **Spring Boot (Backend)** and **React.js (Frontend)**.
This project allows users to book rides, manage drivers and vehicles, and track bookings efficiently.

---

## 📌 Features

### 👤 User Module

* User Registration & Login (JWT Authentication)
* Book rides (Local / Outstation)
* View booking history
* Payment integration (GPay / PhonePe simulation)

### 🚗 Driver Module

* Add & manage drivers
* Assign rides to drivers
* Driver availability tracking

### 🚘 Vehicle Module

* Add & manage vehicles
* Vehicle type selection (Car, Auto, Traveller)
* Pricing configuration

### 📊 Admin Panel

* Dashboard with booking overview
* Manage users, drivers, vehicles
* View all bookings

---

## 🏗️ Tech Stack

### 🔹 Frontend

* React.js
* React Hooks
* Axios
* CSS / Inline Styling

### 🔹 Backend

* Spring Boot
* Spring Security (JWT)
* Hibernate / JPA
* REST APIs

### 🔹 Database

* PostgreSQL / MySQL

---

## 📁 Project Structure

```
luckyride-system/
│
├── luckyride-backend/        # Spring Boot Backend
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── model/
│   └── config/
│
├── luckyride-frontend/       # React Frontend
│   ├── components/
│   ├── pages/
│   └── services/
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 🔹 Clone Repository

```
git clone https://github.com/korrapatisuman/luckyride-system.git
cd luckyride-system
```

---

### 🔹 Backend Setup (Spring Boot)

```
cd luckyride-backend
mvn clean install
mvn spring-boot:run
```

👉 Runs on: `http://localhost:8080`

---

### 🔹 Frontend Setup (React)

```
cd luckyride-frontend
npm install
npm start
```

👉 Runs on: `http://localhost:3000`

---

## 🔐 Authentication

* JWT-based authentication
* Secure APIs using Spring Security
* Token stored in frontend

---

## 💳 Payment Flow

* Advance payment supported
* Payment methods:

  * GPay
  * PhonePe

---

## 🚀 API Endpoints (Sample)

| Method | Endpoint           | Description    |
| ------ | ------------------ | -------------- |
| POST   | /api/auth/register | Register user  |
| POST   | /api/auth/login    | Login          |
| GET    | /api/bookings      | Get bookings   |
| POST   | /api/bookings      | Create booking |
| GET    | /api/drivers       | Get drivers    |

---

## 📸 Screenshots

(Add your UI screenshots here)

---

## 📌 Future Enhancements

* Live GPS tracking (Google Maps)
* Real payment gateway integration
* Ride scheduling
* Notifications (SMS/Email)

---

## 👨‍💻 Author

**Korrapati Suman**
GitHub: https://github.com/korrapatisuman

---

## ⭐ Support

If you like this project:

* ⭐ Star the repo
* 🍴 Fork it
* 📢 Share it

---

## 📄 License

This project is open-source and free to use.

