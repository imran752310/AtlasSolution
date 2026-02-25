# 🚀 Nexzora Digtal

**Live Application:** https://atlas-solution.vercel.app/

Atlas Solution is a production-ready full-stack web application demonstrating modern architecture, scalable backend design, and clean UI engineering. The project highlights strong proficiency in full-stack development using Next.js, PostgreSQL, and modern frontend tooling.

This project was built with a focus on:
- Scalable architecture
- Clean code structure
- Type-safe database operations
- Performance optimization
- Modern UI/UX standards

---

# 🛠 Tech Stack

## Frontend Engineering
- **Next.js** (Full-stack React framework)
- **Tailwind CSS** (Utility-first styling)
- **Shadcn UI** (Reusable, accessible components)
- **Framer Motion** (Declarative animations)

## Backend Engineering
- **Next.js API Routes** (Server-side logic & REST APIs)
- **Prisma ORM** (Type-safe database queries)
- **Neon PostgreSQL** (Serverless cloud database)
- **Resend Email API** (Transactional email sending from server-side)

### Resend Email Integration
- Sends confirmation emails to users upon form submission
- Uses a verified domain (or `onboarding@resend.dev` for testing)
- Ensures emails are sent asynchronously without blocking database operations
- Logs email send status for monitoring


![Confirmation Email Screenshot](../zatlas/public/screenshots/emailscreenshort.PNG)

---

# 🏗 System Architecture

Atlas Solution follows a clean full-stack architecture using Next.js as both frontend and backend runtime.

### Frontend Layer
- Component-driven architecture
- Responsive layout across devices
- Reusable UI components
- Animated interactions using Framer Motion
- Optimized rendering with Next.js

### Backend Layer
- Modular API route structure
- Server-side business logic separation
- Prisma-based database abstraction
- Secure and scalable database communication


This architecture ensures maintainability, scalability, and production readiness.

---

# 🔐 Admin Dashboard (Custom API Implementation)


The admin dashboard is powered by custom-built APIs using Next.js API routes.
![Confirmation Email Screenshot](../zatlas/public/screenshots/dashboard.PNG)


### Backend Capabilities
- Full CRUD operations
- Structured request validation
- Type-safe database queries via Prisma
- Clean separation of concerns
- Ready for authentication & RBAC extension

This demonstrates the ability to design and implement backend systems without relying on external backend frameworks.

---

# 🎯 Engineering Highlights

- Full-stack development using a unified framework
- Strong understanding of server-client architecture
- Database schema design using Prisma
- Clean UI implementation using utility-first CSS
- Animation integration without performance compromise
- Production deployment on Vercel with Neon DB

---

# Database Neaon



![Confirmation Email Screenshot](../zatlas/public/screenshots/database.PNG)

# ⚙️ Local Development Setup

## 1️⃣ Clone the Repository

```bash
git clone <your-repository-url>
cd <your-project-folder>
```

## 2️⃣ Install Dependencies

```bash
npm install
```

## 3️⃣ Configure Environment Variables

Create a `.env` file:

```env
DATABASE_URL="your_neon_database_url"
```

## 4️⃣ Prisma Setup

```bash
npx prisma generate
npx prisma migrate dev
```

## 5️⃣ Start Development Server

```bash
npm run dev
```

---

# 🚀 Deployment

- Deployed on Vercel
- Serverless PostgreSQL hosted on Neon
- Production-ready configuration

---

# 📌 What This Project Demonstrates

- Ability to build full-stack applications from scratch
- API design and server-side implementation using Next.js
- Real-world database integration
- Clean UI engineering practices
- Deployment and production environment setup

---

# 👨‍💻 Developer

Built as a demonstration of full-stack engineering capability using modern web technologies.

