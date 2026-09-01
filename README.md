# Internship Board

A full-stack internship board where students can search, filter, and apply to internships.

## Live Links
- Frontend (live app): https://internship-board-client.vercel.app
- Backend API: https://internship-board-server.onrender.com/api/internships
- Backend repo: https://github.com/laxmibiradar2508-gif/internship-board-server

## Features
- Search and filter internships by domain and work mode
- Loading, empty, and error states with retry
- Application form with client-side and server-side validation
- Server rejects missing names, invalid emails, unsafe URLs, and duplicate applications
- Rate limiting, secure headers (helmet), and CORS protection on the API

## Tech Stack
- Frontend: React + Vite
- Backend: Node.js + Express
- Storage: JSON file-based data store
- Testing: Vitest + Supertest

## Setup (local development)

### Backend
Navigate to the server folder, run npm install, then node index.js. Runs on http://localhost:4000

### Frontend
Navigate to the client folder, run npm install, then npm run dev. Runs on http://localhost:5173

### Environment variables
See .env.example in each folder.

### Running tests
Navigate to the server folder and run npm test.