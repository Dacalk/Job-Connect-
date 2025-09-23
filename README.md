# JobConnect

**JobConnect** is a vibrant, modern job posting platform designed to streamline job search and hiring for job seekers and employers. Built with usability, security, and scalability in mind, JobConnect provides real-time job search, application tracking, and admin management. 🌐💼

---

## Table of Contents
1. [Introduction](#introduction-✨)  
2. [Features](#features-🔥)  
3. [Technology Stack](#technology-stack-🛠️)  
4. [Project Structure](#project-structure-📂)  
5. [Getting Started / Installation](#getting-started--installation-⚙️)  
6. [Environment Variables](#environment-variables)  
7. [Usage / Running Locally](#usage--running-locally-🎯)  
8. [API — Quick Overview](#api--quick-overview)  
9. [Database Models (Overview)](#database-models-overview)  
10. [Testing](#testing)  
11. [Deployment Notes](#deployment-notes)  
12. [Contributing](#contributing-🤝)  
13. [Code of Conduct](#code-of-conduct)  
14. [Team Members](#team-members-👥)  
15. [License](#license-📜)  

---

# Introduction ✨
JobConnect is a web platform connecting employers and job seekers through an intuitive, secure, and efficient interface. It supports three primary roles:

- **Admin** — moderates content, manages users, views analytics  
- **Employer** — posts and manages job listings, reviews applications  
- **Job Seeker** — creates profile, uploads resumes, searches & applies for jobs

Say goodbye to scattered job hunting — JobConnect centralizes postings, applications, and communication. 🚀

---

# Features 🔥
- 🔐 **User Authentication & Role-based Authorization** (Admin / Employer / Job Seeker)  
- 📝 **Job Posting & Management** (create, update, delete, draft/publish)  
- 🖼️ **Profile & Resume Uploads** (file handling, CV parsing extension-ready)  
- 📊 **Application Tracking** (status updates, employer notes)  
- 🛡️ **Admin Moderation Panel** (approve/remove content, user management)  
- 🔍 **Search & Filters** (keyword, location, job type, salary range, tags)  
- 🔔 **Notifications** (email / in-app alerts for key events)  
- 📈 **Scalable, Modular Codebase** — easier to maintain & extend  

---

# Technology Stack 🛠️
- **Frontend:** React.js, HTML5, CSS3, Tailwind CSS / Bootstrap  
- **Backend:** Node.js + Express.js  
- **Database:** MongoDB (NoSQL) *or* PostgreSQL (Relational)  
- **Design:** Figma (design assets in `designs/`)  
- **Version Control:** Git + GitHub

---

# Project Structure 📂
```

JobConnect/
├── client/                # React frontend
│   ├── public/
│   └── src/
│       ├── components/    # Reusable UI components
│       ├── pages/         # Page components (Login, JobSearch, Dashboard)
│       ├── hooks/         # Custom hooks
│       └── App.js
├── server/                # Node.js / Express backend
│   ├── routes/            # API routes (auth, jobs, users, admin)
│   ├── controllers/       # Business logic
│   ├── models/            # DB schemas / ORM models
│   ├── middlewares/       # auth, validation, error handlers
│   └── config/            # DB + env configs
├── designs/               # Figma design files
├── docs/                  # Project documentation
└── README.md              # This file

````

---

# Getting Started / Installation ⚙️

## Clone the repo
```bash
git clone https://github.com/Dacalk/Job-Connect-.git
cd Job-Connect-
````

> Ensure you have Node.js (v16+ recommended), npm/yarn, and your DB (MongoDB or PostgreSQL).

### Backend setup

```bash
cd server
npm install
```

### Frontend setup

```bash
cd client
npm install
```

---

# Environment Variables

Create a `.env` file in `server/`:

```
PORT=5000
DATABASE_URL=mongodb://localhost:27017/jobconnect    # or PostgreSQL URL
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
NODE_ENV=development
SMTP_HOST=smtp.example.com        # optional - for email notifications
SMTP_PORT=587
SMTP_USER=you@example.com
SMTP_PASS=supersecret
CLIENT_URL=http://localhost:3000  # used for CORS or email links
```

---

# Usage / Running Locally 🎯

### Backend

```bash
cd server
npm run dev   # or npm start
```

### Frontend

```bash
cd client
npm start
```

* Frontend: `http://localhost:3000`
* Backend API: `http://localhost:5000`

---

# API — Quick Overview

Example endpoints:

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`
* `GET /api/auth/me`

### Jobs

* `POST /api/jobs` (employer only)
* `GET /api/jobs` (search & filter)
* `GET /api/jobs/:id`
* `PUT /api/jobs/:id`
* `DELETE /api/jobs/:id`

### Applications

* `POST /api/jobs/:id/apply` (job seeker)
* `GET /api/jobs/:id/applications` (employer only)
* `PUT /api/applications/:id/status`

### Admin

* `GET /api/admin/users`
* `GET /api/admin/jobs/pending`
* `PUT /api/admin/jobs/:id/approve`
* `DELETE /api/admin/jobs/:id`

---

# Database Models (Overview)

### User

* `id`, `name`, `email`, `passwordHash`, `role`, `profile`, `resumeUrl`, timestamps

### Job

* `id`, `title`, `company`, `description`, `location`, `employmentType`, `salaryRange`, `tags`, `status`, timestamps

### Application

* `id`, `jobId`, `applicantId`, `coverLetter`, `resumeUrl`, `status`, timestamps

---

# Testing

```bash
cd server
npm run test
```

(Add Jest/Mocha + Supertest as preferred.)

---

# Deployment Notes

* Use Docker or deploy separately (frontend → Vercel/Netlify, backend → Render/Heroku/DigitalOcean).
* Store resumes in cloud storage (S3, DigitalOcean Spaces).
* Configure HTTPS, rate limiting, and strong secrets for production.

---

# Contributing 🤝

1. Fork the repo 🍴
2. Create a branch: `git checkout -b feature/your-feature` 🌿
3. Commit: `git commit -m "Add feature"` ✅
4. Push: `git push origin feature/your-feature` 🚀
5. Open PR 📬

Please follow coding style, write tests, and avoid committing secrets.

---

# Code of Conduct

Contributors are expected to maintain a respectful, inclusive, and professional environment.

---

# Team Members 👥

* DMCDB Dissanayaka (32820) 🌟
* HMSSK Herath (32294) 🚀
* KMGS Wijayawardhana (31897) 🎨
* JJR Oshani (33112) 💻
* S Suthesna (34152) 🔍
* WMCK Weerasekara (32790) 🛠️

---

# License 📜

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2025 JobConnect

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
