# Quick Setup Guide

## 🚀 Quick Start (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database

**Option A: Using Local PostgreSQL**
```bash
# Make sure PostgreSQL is running locally
# Create database
createdb ayo_db

# Copy environment file
cp .env.example .env

# Edit .env with your database credentials
# DATABASE_URL="postgresql://username:password@localhost:5432/ayo_db"
```

**Option B: Using Docker**
```bash
docker run --name ayo-postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=ayo_db \
  -p 5432:5432 \
  -d postgres:15
```

### 3. Generate Auth Secret
```bash
# Generate a random secret key
openssl rand -base64 32

# Add to .env file
# AUTH_SECRET="your-generated-secret"
```

### 4. Setup Database Schema
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed with sample data
npx tsx prisma/seed.ts
```

### 5. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 🔑 Default Accounts (After Seeding)

**Admin Account:**
- Email: `admin@ayo.com`
- Password: `admin123`

**User Account:**
- Email: `user@ayo.com`
- Password: `user123`

## 📋 Features Overview

### User Features
- Register/Login
- Browse venues and courts
- View court availability
- View booking history

### Admin Features (Login as admin)
- Dashboard with statistics
- Manage venues and courts
- View all bookings
- View users

## 🛠️ Development Commands

```bash
# Development
npm run dev          # Start dev server with Turbopack

# Build & Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking

# Database
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema changes
npm run db:studio    # Open Prisma Studio
```

## 🗂️ Project Structure

```
ayo/
├── app/
│   ├── (auth)/
│   │   ├── login/         # Login page
│   │   └── register/      # Registration page
│   ├── admin/             # Admin dashboard
│   │   ├── bookings/      # Manage bookings
│   │   └── venues/        # Manage venues
│   ├── api/
│   │   └── auth/          # Auth API routes
│   ├── bookings/          # User bookings page
│   ├── venues/            # Venues listing
│   └── page.tsx           # Home page
├── components/
│   ├── ui/                # shadcn components
│   └── providers.tsx      # Session provider
├── lib/
│   ├── prisma.ts          # Prisma client
│   └── utils.ts           # Utilities
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed data
├── types/
│   └── next-auth.d.ts     # Auth types
├── auth.ts                # Auth.js config
└── middleware.ts          # Route protection

```

## 🔧 Common Issues

**Issue: Can't connect to database**
- Make sure PostgreSQL is running
- Check DATABASE_URL in .env
- Verify database exists

**Issue: Auth not working**
- Make sure AUTH_SECRET is set in .env
- Check NEXTAUTH_URL is correct

**Issue: Prisma client not found**
- Run `npm run db:generate`

## 📚 Tech Stack

- Next.js 15 (App Router with Turbopack)
- PostgreSQL + Prisma ORM
- Auth.js v5 (Credentials)
- Tailwind CSS v4
- shadcn/ui components
- TypeScript

## 🎯 Next Steps

1. Customize the UI and branding
2. Add payment integration
3. Add email notifications
4. Add court availability calendar
5. Add real-time booking updates
6. Deploy to production (Vercel + Neon/Supabase)

## 📖 More Information

See [README.md](./README.md) for full documentation
See [AGENTS.md](./AGENTS.md) for development guidelines
