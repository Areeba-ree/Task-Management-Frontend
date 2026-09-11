# TaskSphere — Frontend

A modern, responsive React frontend for the Task Management App, built as part of the EncoderX Remote Internship (Batch 02) — Full Stack Development track, Week 01.

## 📋 Overview

TaskSphere lets users sign up, log in, and manage their personal tasks through a clean Kanban-style dashboard. Tasks move through three stages — **To Do → In Progress → Done** — with a controlled, one-directional workflow.

## 🛠️ Tech Stack

- **Library:** React (Vite)
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Styling:** Tailwind CSS
- **Icons:** Lucide React

## ✨ Features

- User registration and login with JWT-based authentication
- Protected routes — dashboard only accessible when logged in
- Kanban-style dashboard with three status columns (To Do, In Progress, Completed)
- Create, edit, and delete tasks via a modal form
- One-directional status flow (To Do → In Progress → Done) enforced in the UI
- Optimistic UI updates — task changes reflect instantly without waiting on the server
- Personalized greeting and avatar based on the logged-in user's name
- Loading, empty, and error states throughout

## 📁 Project Structure

```
src/
├── api/
│   ├── axios.js        # Base Axios instance with auth interceptor
│   └── services.js     # API endpoint functions
├── assets/
├── components/
│   ├── Navbar.jsx
│   ├── ProtectedRoute.jsx
│   └── TaskModal.jsx    # Reusable create/edit task modal
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   └── Dashboard.jsx
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Areeba-ree/Task-Management-Frontend.git
cd Task-Management-Frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the backend URL

Open `src/api/axios.js` and confirm the `baseURL` points to your running backend:

```javascript
const API = axios.create({
  baseURL: 'http://localhost:3000', 
});
```

### 4. Run the application

```bash
npm run dev
```

The app will start on `http://localhost:5173` by default.

## 🔗 Backend Repository

This frontend connects to the TaskSphere backend, built with NestJS, PostgreSQL, and JWT authentication:

👉 [Task-Management-System (Backend)](https://github.com/Areeba-ree/Task-Management-System)

The backend must be running (locally or deployed) for this frontend to function.

## 📡 Pages & Routes

| Route         | Page       | Access               |
|---------------|------------|-----------------------|
| `/login`      | Login      | Public                |
| `/signup`     | Register   | Public                |
| `/dashboard`  | Dashboard  | Protected (JWT required) |

Unauthenticated users attempting to access `/dashboard` are redirected to `/login`.

## 🔒 Authentication Flow

1. User registers via `/signup` (name, email, password)
2. User logs in via `/login` — receives a JWT access token
3. Token and user info are stored in `localStorage`
4. All subsequent API requests automatically attach the token via an Axios interceptor
5. Logging out clears `localStorage` and redirects to `/login`

## 🎨 Design

- Warm, glassmorphism-inspired UI with soft gradients and blurred glow accents
- Purple-orange and warm-tone color palettes across auth and dashboard screens
- Smooth transitions and hover states for a polished, seamless feel

## 👩‍💻 Author

Built as part of the EncoderX Remote Internship Batch 02.

## 📄 License

This project is for educational purposes as part of the EncoderX internship program.