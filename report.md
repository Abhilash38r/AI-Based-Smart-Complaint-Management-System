# Project Report: AI-Based Smart Complaint Management System

## 1. Project Introduction
The AI-Based Smart Complaint Management System is a modern, responsive web application that streamlines the process of registering, tracking, and resolving user complaints. By integrating artificial intelligence, the system automatically detects complaint urgency, routes it to the correct department, provides a summary, and generates an automated polite response.

## 2. Objectives
- Provide a seamless user interface for registering complaints online.
- Enable administrators and users to track the real-time status of their complaints.
- Utilize AI (via OpenRouter/Gemini API) to automate the initial analysis and triage of incoming issues.
- Build a secure, scalable platform using the MERN stack and JWT-based authentication.

## 3. Tech Stack
- **Frontend**: React.js, Vite, Tailwind CSS (v4), React Router, Axios, Lucide React, React Toastify.
- **Backend**: Node.js, Express.js, Mongoose, JSON Web Tokens (JWT), bcryptjs.
- **Database**: MongoDB Atlas.
- **AI Integration**: OpenRouter API (utilizing `google/gemini-pro`).
- **Deployment**: Render (Frontend as Static Site, Backend as Web Service).

## 4. Folder Structure
```
project-root/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   │   ├── aiController.js
│   │   ├── authController.js
│   │   └── complaintController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Complaint.js
│   │   └── User.js
│   ├── routes/
│   │   ├── aiRoutes.js
│   │   ├── authRoutes.js
│   │   └── complaintRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── ComplaintCard.jsx
    │   │   ├── Navbar.jsx
    │   │   └── Sidebar.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── AiAnalysis.jsx
    │   │   ├── ComplaintForm.jsx
    │   │   ├── ComplaintList.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   └── Register.jsx
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.js
```

## 5. Frontend Code Screenshots
*(Insert screenshots of your React components here. E.g., `App.jsx`, `ComplaintForm.jsx`)*

## 6. Backend Code Screenshots
*(Insert screenshots of your Express controllers and routes here. E.g., `aiController.js`, `server.js`)*

## 7. MongoDB Screenshots
*(Insert screenshots of your MongoDB Atlas collections (`users`, `complaints`) showing inserted documents here)*

## 8. Postman/Thunder Client API Request Screenshots
*(Insert screenshots of your API tests here)*
- `POST /api/auth/register` (Token generated)
- `POST /api/complaints` (Data saved successfully)
- `GET /api/complaints` (Complaints displayed)
- `POST /api/ai/analyze` (AI JSON response)

## 9. Authentication Screenshots
*(Insert screenshots of the Login page, Registration page, and Protected Dashboard routing here)*

## 10. AI Response Screenshots
*(Insert screenshots of the AI Analysis Dashboard displaying priority badges, generated summaries, and auto-responses here)*

## 11. Render Deployment Screenshots
*(Insert screenshots of the Render dashboard showing successful builds and live deployments here)*

## 12. Live URL Testing Screenshots
*(Insert screenshots of the live web application being tested in a browser here)*

---
*Note: To generate the final PDF, open this file in VS Code and use the "Markdown PDF" extension to Export to PDF, after pasting the required screenshots.*
