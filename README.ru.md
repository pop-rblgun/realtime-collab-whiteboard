# 🎨 Real-time Collaborative Whiteboard

### 🌟 Обзор проекта
Современная высокопроизводительная среда для совместной работы, построенная на **React**, **Redux Toolkit** и **Node.js (Socket.io)**. Этот проект демонстрирует глубокое владение синхронизацией данных в реальном времени, сложным управлением состоянием через **Undo/Redo** и премиальным **Apple-style UI/UX**.

> [!IMPORTANT]
> **Техническое достижение:** Реализован отказоустойчивый движок синхронизации через WebSockets, обеспечивающий задержку менее 50 мс для бесшовного "shared whiteboard" опыта.

---

### 🚀 Ключевые возможности

*   **⚡ Real-time Sync:** Мгновенная синхронизация элементов между всеми подключенными клиентами через **Socket.io**.
*   **⏪ Redux Undo/Redo Engine:** Кастомный менеджер истории состояний внутри **Redux Toolkit**, позволяющий отменять действия пользователя.
*   **🖥️ Apple Pro Aesthetics:** Минималистичный премиум-интерфейс с использованием **CSS Glassmorphism**, размытия (blur) и типографики SF Pro.
*   **🛠️ Full-stack Интеграция:** Бесшовное взаимодействие между бэкендом на **Node.js** и фронтендом на **Vite/React**.

---

### 🛠️ Технологический стек

| Категория | Технология |
| :--- | :--- |
| **Frontend** | React 18, Vite, Redux Toolkit, CSS3 (Advanced Flexbox/Grid) |
| **Backend** | Node.js, Express, Socket.io, TypeScript |
| **State Management** | Redux (Slice pattern) + History Middleware |
| **Communication** | WebSockets |

---

### 🚦 Запуск проекта

#### 1. Backend API
```bash
cd backend
npm install
npm run dev
```

#### 2. Frontend Whiteboard
```bash
cd frontend
npm install
npm run dev
```

---
*Проект разработан как демонстрация навыков создания высокоинтерактивных веб-приложений.*
