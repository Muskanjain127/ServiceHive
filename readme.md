# 🚀 ServiceHive - Smart Leads Management System

ServiceHive is a production-grade MERN (MongoDB, Express, React, Node.js) stack application designed for dynamic lead tracking, complex server-side grid filtering, secure API authorization, and custom telemetry data export. Built entirely with TypeScript for complete data flow integrity across both frontend and backend configurations.

---

## 🛠️ Tech Stack & Architecture

- **Frontend:** React, TypeScript, Tailwind CSS, Axios, React Router DOM
- **Backend:** Node.js, Express.js, TypeScript (`ts-node-dev`)
- **Database:** MongoDB Atlas (Mongoose ODM layer)
- **Containerization:** Docker & Docker Compose (WSL 2 Integrated Backend)

---

## ✨ Core Features

- **Dynamic Grid Telemetry:** Highly responsive data grid supporting real-time server-side state hooks (search, status, source) for fast filtering.
- **Robust Mongoose Input Validation:** Built-in lowercase string normalization and regex email format scanning utilizing custom error handlers to guarantee database data sanitization.
- **Assignment-Compliant CSV Export Engine:** Built-in native browser binary processing utilizing Blob and dynamic string matrices. It strips away standard pagination blocks (limit, skip), allowing administrators to download the entire matched array dataset based on active filters into Excel in a single transaction.
- **Flexible Schema Diagnostics:** Safe database date serialization fallback handling both standard and Mongoose automatic timestamp schemes (`createdAt` / `created_at`).
- **Environment Matrix Isolation:** Production setup keeping critical database credentials secure in private runtime scopes (.env) while tracking templates publicly via .env.example.

---

## 🚀 Setup Instructions (Local Machine Setup)

### Prerequisites
Ensure your local host contains the following runtimes:
- **Node.js** (v18.x or higher)
- **npm** (v9.x or higher)
- **MongoDB Atlas** Account / Connection Access

### Installation & Configuration Matrix

1. **Clone the application infrastructure:**
git clone https://github.com/Muskanjain127/servicehive.git
cd servicehive

2. **Backend Configuration:**
cd backend
npm install

Instantiate your environment file by creating a `.env` file (Referencing your actual structural parameters and Port 3000):
PORT=3000
Mongo_url=mongodb+srv://your_username:your_password@your-cluster.mongodb.net/test
JWT_Secret=your_super_secure_cryptographic_secret_key

Launch the live API listener:
npm run dev

3. **Frontend Configuration:**
Open a separate system terminal split descriptor and launch the client asset server:
cd ../frontend
npm install

Deploy the development interface:
npm run dev

Inspect the operational client layout by visiting http://localhost:5173.

---

## 🐳 Docker Container Cluster Setup (Automated)

The entire application structure can be automatically compiled and managed inside isolated virtualization sandboxes:

### Checklist Requirements
- Verify Docker Desktop is initialized and showcasing a green "Engine Running" banner.
- Ensure your system environment has updated Windows Subsystem for Linux protocols (wsl --update run under Administrator permissions).

### Deployment Engine String
From the main Root Project Folder containing your docker-compose.yml, trigger the isolated compilation framework:
docker compose up --build

### Route Map Allocation
- Frontend Panel Interface: Virtualized and accessible at http://localhost:5173
- Backend Core API Node: Virtualized and accepting transactions at http://localhost:3000
- Persistent Mongo Database Volume: Operational on default port 27017 mapped to the active cluster.

To shut down the live container instances securely, press Ctrl + C or punch down the volumes:
docker compose down

---

## 📡 API Documentation

**Base URL:** `http://localhost:3000`

### 👥 Authentication Endpoints (Public)

#### 1. User Registration
- **Endpoint:** `POST /signup`
- **Description:** Registers a new user account (Admin or Sales User).
- **Request Body (JSON):**
```json
{
  "name": "Muskan Jain",
  "email": "muskan@gmail.com",
  "password": "securepassword123",
  "role": "Admin" 
}
Response (201 Created):

JSON
{
  "success": true,
  "message": "User registered successfully"
}
2. User Login
Endpoint: POST /login

Description: Authenticates credentials and sets a secure HTTP-Only session token.

Request Body (JSON):

JSON
{
  "email": "muskan@gmail.com",
  "password": "securepassword123"
}
Response (200 OK):

JSON
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "6a0b43ed5d0176f916799b08",
    "name": "Muskan Jain",
    "email": "muskan@gmail.com",
    "role": "Admin"
  }
}
⚙️ Admin Leads Endpoints (Protected - Requires Admin Role Token)
1. Fetch All Leads (With Filters & Pagination)
Endpoint: GET /admin/allleads

Query Parameters: search, status, source, page, limit

Example Request: GET /admin/allleads?search=muskan&status=Qualified&source=Website&page=1&limit=10

Response (200 OK):

JSON
{
  "success": true,
  "data": [
    {
      "_id": "6a0b43ed5d0176f916799b08",
      "name": "hugyhugymujsnjj",
      "email": "muskan@gmail.com",
      "status": "Qualified",
      "source": "Website",
      "createdAt": "2026-05-18T16:53:01.513Z",
      "created_at": "2026-05-18T16:53:01.496Z"
    }
  ],
  "pagination": {
    "totalRecords": 1,
    "currentPage": 1,
    "totalPages": 1,
    "limit": 10
  }
}
2. Create a New Lead
Endpoint: POST /admin/create

Request Body (JSON):

JSON
{
  "name": "Rahul Sharma",
  "email": "rahul@gmail.com",
  "status": "New",
  "source": "Instagram"
}
Response (201 Created):

JSON
{
  "success": true,
  "message": "Lead created successfully",
  "lead": {
    "_id": "6a0b43ed5d0176f916799b09",
    "name": "Rahul Sharma",
    "email": "rahul@gmail.com",
    "status": "New",
    "source": "Instagram"
  }
}
3. View Single Lead Details
Endpoint: GET /admin/lead/:id

Response (200 OK):

JSON
{
  "success": true,
  "lead": {
    "_id": "6a0b43ed5d0176f916799b08",
    "name": "hugyhugymujsnjj",
    "email": "muskan@gmail.com",
    "status": "Qualified",
    "source": "Website"
  }
}
4. Update Lead Details
Endpoint: POST /admin/update/:id

Request Body (JSON):

JSON
{
  "status": "Contacted"
}
Response (200 OK):

JSON
{
  "success": true,
  "message": "Lead updated successfully"
}
5. Delete a Lead Document
Endpoint: DELETE /admin/delete/:id

Response (200 OK):

JSON
{
  "success": true,
  "message": "Lead deleted successfully"
}
6. Export Filtered Leads to CSV
Endpoint: GET /admin/export

Description: Bypasses standard pagination matrices to compile all matched filter components down into a downloadable string stream layout.

Response: Raw text/csv attachment array buffer.

📜 System Design Rules & Validations
All critical mutations or data purge sequencers require administrative access flags (checkRole("Admin")).

File processing pipelines use clean string operations to filter commas inside cells (.replace(/,/g, " ")) preventing dataset shift errors during Excel initialization.

If Excel displays short layout columns using character warnings (#####), drag and stretch the target Date column manually inside your spreadsheet client to instantly resolve formatting constraints.