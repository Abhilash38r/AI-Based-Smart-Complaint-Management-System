# AI-Based Smart Complaint Management System

A production-ready full-stack MERN application that leverages AI to automatically categorize, prioritize, and generate insights for user complaints.

## Tech Stack

- **Frontend**: React.js with Vite
- **Styling**: Tailwind CSS v4, Lucide React (Icons), React Toastify (Notifications)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens), bcryptjs
- **AI Integration**: OpenRouter API (Gemini/OpenAI)

## Features

- Secure User Registration & Authentication (JWT)
- Protected Routes & Dashboards
- CRUD operations for complaints (Create, Read, Update Status, Delete)
- Search complaints by location and filter by category
- AI-Powered Features:
  - Urgency/Priority Detection (Low, Medium, High, Critical)
  - Department Recommendation
  - AI Summarization of the complaint
  - Auto-generated polite response for the user

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB Atlas Account (or local MongoDB)
- OpenRouter API Key

### Installation

1. Clone the repository
2. Install Backend Dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Install Frontend Dependencies:
   ```bash
   cd frontend
   npm install
   ```

### Environment Variables

**Backend (`backend/.env`)**
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
OPENROUTER_API_KEY=your_openrouter_api_key
```

**Frontend (`frontend/.env`)**
```env
VITE_API_URL=http://localhost:5000
```

### Running Locally

1. Start the Backend:
   ```bash
   cd backend
   npm run dev
   ```
2. Start the Frontend:
   ```bash
   cd frontend
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate user & get token

### Complaints
- `GET /api/complaints` - Get all complaints (Supports `?location=` and `?category=` queries)
- `GET /api/complaints/search?location=...` - Search by location
- `POST /api/complaints` - Add a new complaint
- `PUT /api/complaints/:id` - Update complaint status
- `DELETE /api/complaints/:id` - Delete a complaint

### AI Analysis
- `POST /api/ai/analyze` - Trigger AI analysis for a complaint

## Deployment

### Render Deployment
1. Connect your GitHub repository to Render.
2. Create a Web Service for the Backend (`Build: npm install`, `Start: npm start`). Set ENV variables.
3. Create a Static Site for the Frontend (`Build: npm run build`, `Publish Dir: dist`). Set `VITE_API_URL`.
