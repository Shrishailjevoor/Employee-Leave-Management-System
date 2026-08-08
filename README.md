# Employee Leave Management System

A full-stack web-based Employee Leave Management System that allows employees to apply for leave and managers to review, approve, or reject leave requests.

The system implements authentication, role-based access control, leave management, supporting document uploads, notifications, and a complete employee-manager approval workflow.

---

## Project Overview

The Employee Leave Management System provides two separate portals:

### Employee Portal

Employees can:

- Register an account
- Login securely
- View their dashboard
- Apply for leave
- Upload supporting documents
- View leave history
- Check leave status
- View manager remarks
- Receive in-app notifications

### Manager Portal

The predefined manager can:

- Login to the Manager Portal
- View employee leave requests
- View leave details
- View uploaded supporting documents
- Approve leave requests
- Reject leave requests
- Add remarks while approving or rejecting
- View registered employees
- View reports
- Export leave data

The project follows the complete workflow specified in the project brief:

Employee Login → Apply Leave → Manager Review → Approve/Reject → Employee Status Update → Notification.

---

# Features

## Authentication

- Employee registration
- Employee login
- Manager login
- Password hashing using bcrypt
- JWT-based authentication
- Role-based authorization
- Protected routes
- Employee and manager portal separation

## Leave Management

Employees can submit:

- Leave reason
- Start date
- End date
- Supporting document

Leave statuses:

- Pending
- Approved
- Rejected

Managers can approve or reject requests and provide remarks.

## Notifications

Employees receive in-app notifications when their leave request is:

- Approved
- Rejected

No email or SMS notification system is required.

## File Upload

Supporting documents are uploaded as actual files and stored using the backend storage implementation.

## Reports

Managers can view leave information and export reports in:

- PDF
- Excel

---

# Technology Stack

## Frontend

- React
- Vite
- React Router
- Axios
- React Hot Toast
- Lucide React
- Tailwind CSS

## Backend

- Node.js
- Express.js
- JWT
- bcrypt
- Multer
- CORS
- Morgan
- dotenv

## Database and Storage

- Supabase
- PostgreSQL database
- Supabase Storage

## Deployment

- Vercel - Frontend
- Render - Backend
- Supabase - Database and Storage


------------------------------------------------------------------------------------------------

## Demo Credentials

### Manager Account

**Username:** `manager@gcu.in`  
**Password:** `Manager@123`  

------------------------------------------------------------------------------------------------


---

# System Architecture

The application follows a three-layer full-stack architecture.

```text
                 USER
                  |
                  v
        +-------------------+
        |   React Frontend  |
        |      Vite         |
        +-------------------+
                  |
             HTTP / Axios
                  |
                  v
        +-------------------+
        |  Express Backend  |
        |     Node.js       |
        +-------------------+
                  |
        +---------+---------+
        |                   |
        v                   v
   Authentication      Business Logic
     Middleware          Controllers
        |                   |
        +---------+---------+
                  |
                  v
        +-------------------+
        |     Supabase      |
        | PostgreSQL +      |
        | Storage           |
        +-------------------+

## Project Structure

Employee-Leave-Management-System/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── multer.js
│   │   │   └── supabase.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── activityController.js
│   │   │   ├── authController.js
│   │   │   ├── dashboardController.js
│   │   │   ├── employeeController.js
│   │   │   ├── leaveController.js
│   │   │   ├── managerController.js
│   │   │   └── notificationController.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   └── roleMiddleware.js
│   │   │
│   │   ├── routes/
│   │   │   ├── activityRoutes.js
│   │   │   ├── authRoutes.js
│   │   │   ├── dashboardRoutes.js
│   │   │   ├── employeeRoutes.js
│   │   │   ├── leaveRoutes.js
│   │   │   ├── managerRoutes.js
│   │   │   ├── notificationRoutes.js
│   │   │   └── testRoutes.js
│   │   │
│   │   ├── services/
│   │   │   ├── activityService.js
│   │   │   ├── notificationService.js
│   │   │   └── storageService.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
        