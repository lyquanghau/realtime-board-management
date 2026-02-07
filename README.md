# Realtime Board Management

A backend service for a **Realtime Board Management** system (Trello-like).

This project demonstrates **email-based authentication, JWT authorization, Firestore data modeling, and realtime-ready backend architecture**.
It is built as part of a technical assessment with focus on **clean code, separation of concerns, and real-world backend practices**.

---

## ✨ Features

### 🔐 Authentication & Authorization
- Email signup using **verification code (OTP)**
- Email delivery via **Nodemailer (Gmail App Password)**
- Verify OTP to activate account
- Generate **JWT access token**
- JWT-protected APIs
- Auth middleware for protected routes

---

### 📋 Board Management
- Create boards (JWT required)
- Get all boards of the logged-in user
- Boards are isolated per user (no data leakage)

---

### 🧱 Column Management
- Create columns inside a board
- Columns stored as **Firestore subcollections**
- Each board can contain multiple columns

---

### ⚡ Realtime Ready
- Built on **Firebase Firestore**
- Firestore provides native **realtime updates**
- Any changes to boards or columns can be reflected instantly on connected clients
- No polling or page refresh required
- No WebSocket server needed for this scope

---

## 🧠 Tech Stack

- **Node.js**
- **Express.js**
- **Firebase Admin SDK**
- **Cloud Firestore**
- **JWT (jsonwebtoken)**
- **Nodemailer**
- **dotenv**

---

## 🏗️ Architecture Overview

The application follows a layered backend architecture:

- **Routes** define HTTP endpoints
- **Controllers** handle request/response flow
- **Services** contain business logic
- **Middleware** handles authentication and authorization
- **Firestore** acts as the data layer
- **JWT** is used for stateless authentication

This structure improves maintainability and scalability.

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/        # Firebase & environment configuration
│   ├── middleware/    # JWT authentication middleware
│   ├── routes/        # API route definitions
│   ├── controllers/   # Request/response handling
│   ├── services/      # Business logic
│   └── index.js       # Application entry point
├── .env
├── package.json
└── README.md
```

---

## 📊 Firestore Data Model

### Users
```
users/{userId}
  ├─ email
  ├─ isVerified
  ├─ createdAt
```

### Boards
```
boards/{boardId}
  ├─ title
  ├─ ownerId
  ├─ createdAt
```

### Columns (Subcollection)
```
boards/{boardId}/columns/{columnId}
  ├─ title
  ├─ order
  ├─ createdAt
```

---

## 🔁 Realtime Design

The project leverages **Firestore realtime listeners**.

### Realtime flow:
1. Client sends a request to create/update a board or column
2. Backend verifies JWT and writes data to Firestore
3. Firestore emits realtime updates
4. All subscribed clients receive changes instantly

Example frontend concept:
```js
onSnapshot(collectionRef, (snapshot) => {
  // Update UI immediately when data changes
});
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `backend/` directory:

```env
PORT=3814
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

> **Note**
> `EMAIL_PASS` must be a **Gmail App Password**, not a normal Gmail password.
> Gmail **2-Step Verification** must be enabled.

---

## 🔥 Firebase Setup

1. Create a Firebase project
2. Enable **Cloud Firestore**
3. Create a **Service Account**
4. Download the service account JSON key
5. Configure Firebase Admin SDK in `src/config/firebase.js`

---

## ▶️ Running the Project

Install dependencies:
```bash
npm install
```

Run in development mode (auto reload):
```bash
npm run dev
```

Run in production mode:
```bash
npm start
```

Server runs at:
```
http://localhost:3814
```

---

## 🧪 API Endpoints

### Authentication
- `POST /auth/signup`  
  Send verification code to email

- `POST /auth/verify`  
  Verify code and receive JWT token

---

### User
- `GET /user/me`  
  Get current authenticated user (JWT required)

---

### Boards
- `POST /boards`  
  Create a board (JWT required)

- `GET /boards`  
  Get all boards of the logged-in user (JWT required)

---

### Columns
- `POST /boards/:boardId/columns`  
  Create a column inside a board (JWT required)

---

## 📝 Notes & Design Decisions

- Firestore **composite indexes** are required for queries using `where` and `orderBy`
- Verification codes expire after a short time for security
- JWT is used for stateless authentication
- Firestore subcollections are used to model boards and columns
- The architecture is designed for easy extension (cards, collaborators, realtime UI)

---

## 👤 Author

**Lý Quang Hậu**
Backend-focused project demonstrating authentication, authorization, Firestore modeling, and realtime-ready architecture.
