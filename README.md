# 📚 ExamNotes AI

> AI-powered exam preparation platform — generate smart notes, diagrams, charts, and downloadable PDFs in seconds.

---

## 🌐 Live Demo

- **Frontend:** [https://exam-note-client.onrender.com](https://exam-note-client.onrender.com)

---

## ✨ Features

- **Google Authentication** — Sign in instantly via Firebase Google OAuth
- **AI Note Generation** — Powered by Gemini 2.5 Flash; generates structured, exam-focused notes from any topic
- **Revision Mode** — Compact bullet-point cheat sheets for last-minute prep
- **Mermaid Diagrams** — Auto-generated flowcharts rendered in-browser
- **Recharts Visualizations** — Bar, line, and pie charts based on topic data
- **PDF Download** — Clean, printable PDFs generated server-side with PDFKit
- **Credit System** — Users start with 50 free credits; each note generation costs 10 credits
- **Stripe Payments** — Buy credit packs (₹100 / ₹200 / ₹500) with Stripe Checkout
- **Notes History** — Browse and re-open all previously generated notes
- **Quick Exam Sidebar** — Priority-ranked subtopics and important questions at a glance

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React + Vite | UI framework |
| Redux Toolkit | Global state (user data, credits) |
| React Router | Client-side routing |
| Tailwind CSS | Styling |
| Framer Motion | Animations & 3D hover effects |
| Firebase Auth | Google sign-in |
| Axios | API calls |
| Recharts | Data visualizations |
| Mermaid.js | Diagram rendering |
| React Markdown | Markdown notes rendering |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| MongoDB + Mongoose | Database |
| JSON Web Tokens | Auth (httpOnly cookies) |
| Stripe | Payment processing |
| Google Gemini 2.5 Flash | AI note generation |
| PDFKit | Server-side PDF generation |
| Nodemon | Dev server |

---

## 📁 Project Structure

```
exam-note/
├── backend/
│   ├── controllers/
│   │   ├── auth.controller.js       # Google login / logout
│   │   ├── credits.controller.js    # Stripe checkout + webhook
│   │   ├── generate.controller.js   # AI note generation
│   │   ├── notes.controller.js      # Fetch saved notes
│   │   ├── pdf.controller.js        # PDF generation
│   │   └── user.controller.js       # Current user
│   ├── middlewares/
│   │   └── isAuth.js                # JWT cookie verification
│   ├── models/
│   │   ├── notes.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── auth.route.js
│   │   ├── credit.route.js
│   │   ├── generate.route.js
│   │   ├── pdf.route.js
│   │   └── user.route.js
│   ├── services/
│   │   └── gemini.services.js       # Gemini API integration
│   ├── utils/
│   │   ├── connectDb.js
│   │   ├── promptBuilder.js         # Structured AI prompt generator
│   │   └── token.js                 # JWT generation
│   └── server.js
│
└── frontend/
    └── src/
        ├── components/
        │   ├── FinalResult.jsx      # Full notes viewer + PDF download
        │   ├── Footer.jsx
        │   ├── MermaidSetup.jsx     # Mermaid diagram renderer
        │   ├── Navbar.jsx
        │   ├── ReChartSetup.jsx     # Recharts renderer
        │   ├── Sidebar.jsx          # Quick exam view sidebar
        │   └── TopicForm.jsx        # Note generation form
        ├── pages/
        │   ├── Auth.jsx
        │   ├── History.jsx
        │   ├── Home.jsx
        │   ├── Notes.jsx
        │   ├── PaymentFailure.jsx
        │   ├── PaymentSuccess.jsx
        │   └── Pricing.jsx
        ├── redux/
        │   ├── store.js
        │   └── userSlice.js
        ├── services/
        │   └── api.js               # Axios API calls
        └── utils/
            └── firebase.js          # Firebase config
```

---

## 🔌 API Endpoints

### Auth
| Method | Route | Description |
|---|---|---|
| POST | `/api/auth/google-auth` | Login / register via Google |
| GET | `/api/auth/logout` | Clear auth cookie |

### User
| Method | Route | Description |
|---|---|---|
| GET | `/api/user/current-user` | Get authenticated user |

### Notes
| Method | Route | Description |
|---|---|---|
| POST | `/api/notes/generate-notes` | Generate AI notes (costs 10 credits) |
| GET | `/api/notes/get-all-notes` | Get all notes for current user |
| GET | `/api/notes/:id` | Get a single note by ID |

### PDF
| Method | Route | Description |
|---|---|---|
| POST | `/api/pdf/pdf-download` | Generate and download PDF |

### Credits / Payments
| Method | Route | Description |
|---|---|---|
| POST | `/api/credit/order` | Create Stripe checkout session |
| POST | `/api/payments/webhook` | Stripe webhook — credits fulfillment |

---

## 💳 Credit Plans

| Plan | Price | Credits |
|---|---|---|
| Starter | ₹100 | 50 credits |
| Popular | ₹200 | 120 credits |
| Pro Learner | ₹500 | 300 credits |

> New users receive **50 free credits** on signup. Each note generation costs **10 credits**.

---

## ⚙️ Environment Variables

### Backend — `backend/.env`

```env
PORT=8000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
CLIENT_URL=https://exam-note-client.onrender.com
```

### Frontend — `frontend/.env`

```env
VITE_SERVER_URL=https://your-backend-url.onrender.com
VITE_FIREBASE_APIKEY=your_firebase_api_key
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB instance (local or Atlas)
- Stripe account
- Google Firebase project (with Google Auth enabled)
- Google Gemini API key

### 1. Clone the repository

```bash
git clone https://github.com/your-username/exam-note.git
cd exam-note
```

### 2. Setup the Backend

```bash
cd backend
npm install
```

Create a `.env` file using the variables listed above, then start the server:

```bash
npm run dev
```

### 3. Setup the Frontend

```bash
cd frontend
npm install
```

Create a `.env` file using the variables listed above, then start the dev server:

```bash
npm run dev
```

### 4. Stripe Webhook (Local Development)

Use the [Stripe CLI](https://stripe.com/docs/stripe-cli) to forward webhook events to your local backend:

```bash
stripe listen --forward-to localhost:8000/api/payments/webhook
```

---

## 🔐 Authentication Flow

1. User clicks **Continue with Google** on the Auth page
2. Firebase opens a Google sign-in popup
3. On success, the user's `name` and `email` are sent to `/api/auth/google-auth`
4. Backend finds or creates the user in MongoDB, signs a JWT, and sets it as an `httpOnly` cookie (7-day expiry)
5. Redux state is updated with the user data, and the app redirects to Home

---

## 💡 AI Note Generation Flow

1. User fills in topic, class level, exam type, and toggles (revision mode, diagram, chart)
2. Frontend calls `POST /api/notes/generate-notes`
3. Backend checks the user has ≥ 10 credits, then builds a structured prompt via `promptBuilder.js`
4. Prompt is sent to **Gemini 2.5 Flash**, which returns a strict JSON response
5. Notes are saved to MongoDB; user credits are decremented by 10
6. Frontend renders the result with markdown, Mermaid diagrams, and Recharts visualizations

---

## 📄 AI Response Structure

```json
{
  "subTopics": {
    "⭐": [],
    "⭐⭐": [],
    "⭐⭐⭐": []
  },
  "importance": "⭐⭐",
  "notes": "Markdown string",
  "revisionPoints": [],
  "questions": {
    "short": [],
    "long": [],
    "diagram": ""
  },
  "diagram": {
    "type": "graph",
    "data": "graph TD ..."
  },
  "charts": [
    {
      "type": "bar",
      "title": "string",
      "data": [{ "name": "string", "value": 10 }]
    }
  ]
}
```

---

## 📦 Dependencies

### Backend
```
express, mongoose, jsonwebtoken, cookie-parser, cors,
dotenv, stripe, pdfkit, nodemon
```

### Frontend
```
react, react-dom, react-router-dom, redux, @reduxjs/toolkit,
axios, firebase, framer-motion, mermaid, react-markdown,
recharts, react-icons, tailwindcss, vite
```

---
