# Tiny Link Shortener

A full-stack URL shortener application built with Node.js/Express backend and Next.js frontend. This project allows users to shorten long URLs into compact, shareable links.

## 🚀 Features

- Shorten long URLs into compact links
- MongoDB database for storing shortened links
- RESTful API backend
- Modern Next.js frontend with React and TypeScript
- Responsive UI with Tailwind CSS

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **MongoDB** - Either:
  - MongoDB Atlas (cloud) - [Sign up here](https://www.mongodb.com/cloud/atlas)
  - MongoDB Community Edition (local) - [Download here](https://www.mongodb.com/try/download/community)

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/nirajkumar2001/Tiny_Link_Shortner.git
cd Tiny_Link_Shortner
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd tiny-link-backend
npm install
```

Create a `.env` file in the `tiny-link-backend` directory:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

**For MongoDB Atlas:**
- Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a free cluster
- Get your connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
- Replace `your_mongodb_connection_string` with your actual connection string

**For Local MongoDB:**
- Use: `mongodb://localhost:27017`

### 3. Frontend Setup

Open a new terminal, navigate to the frontend directory and install dependencies:

```bash
cd tinylink-frontend
npm install
```

If your backend runs on a different URL, you may need to configure the API endpoint in the frontend code.

## ▶️ Running the Application

### Start the Backend Server

In the `tiny-link-backend` directory:

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The backend server will run on `http://localhost:5000` (or the PORT specified in your `.env` file).

### Start the Frontend Server

In a new terminal, navigate to the `tinylink-frontend` directory:

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

The frontend will run on `http://localhost:3000`.

### Access the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 📁 Project Structure

```
Tiny_Link_Shortner/
├── tiny-link-backend/          # Backend API
│   ├── src/
│   │   ├── config/            # Database configuration
│   │   ├── controllers/       # Route controllers
│   │   ├── models/            # MongoDB models
│   │   ├── routes/            # API routes
│   │   ├── app.js             # Express app setup
│   │   └── server.js          # Server entry point
│   ├── package.json
│   └── .env                   # Environment variables (create this)
│
└── tinylink-frontend/          # Frontend application
    ├── app/                   # Next.js app directory
    ├── components/            # React components
    ├── public/                # Static assets
    ├── package.json
    └── next.config.ts
```

## 🔧 Available Scripts

### Backend (`tiny-link-backend`)

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon (auto-reload)

### Frontend (`tinylink-frontend`)

- `npm run dev` - Start the development server
- `npm run build` - Build the production bundle
- `npm start` - Start the production server
- `npm run lint` - Run ESLint

## 🌐 API Endpoints

The backend provides the following endpoints:

- `GET /healthz` - Health check endpoint
- `POST /api/links` - Create a shortened link
- `GET /api/links/:shortCode` - Get original URL by short code
- `GET /api/links` - Get all links (if implemented)

## 📝 Environment Variables

### Backend (`.env` file in `tiny-link-backend/`)

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/
PORT=5000
```

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

This project was developed with the assistance of:
- **ChatGPT** - For code suggestions, debugging help, and development guidance
- **Cursor** - For AI-powered code completion and development assistance

## 👤 Author

**Niraj Kumar**

- GitHub: [@nirajkumar2001](https://github.com/nirajkumar2001)

---

⭐ If you find this project helpful, please consider giving it a star!

