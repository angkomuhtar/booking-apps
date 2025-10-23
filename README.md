# Ayo - Court Booking System

Aplikasi booking lapangan badminton dan padel berbasis web, terinspirasi dari ayo.co.id.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Auth.js v5 (Credentials Provider)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Form Handling**: React Hook Form + Zod validation
- **Language**: TypeScript

## Features

### User Features
- 🔐 User authentication (register/login)
- 🏟️ Browse venues and courts
- 📅 Book courts by date and time
- 📋 View booking history
- 💰 View pricing and availability

### Admin Features
- 📊 Dashboard with statistics
- 🏢 Manage venues and courts
- 📖 Manage bookings
- 👥 View users

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ayo
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and configure:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/ayo_db"
AUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

Generate AUTH_SECRET:
```bash
openssl rand -base64 32
```

4. Set up the database:
```bash
npm run db:generate
npm run db:push
```

5. (Optional) Seed the database with sample data:
```bash
npx tsx prisma/seed.ts
```

6. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

### Models

- **User**: User accounts with role (USER/ADMIN)
- **Venue**: Sports venues with location info
- **Court**: Individual courts (Badminton/Padel) within venues
- **Booking**: Court bookings with date, time, and status

## Project Structure

```
ayo/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── admin/             # Admin dashboard
│   ├── bookings/          # User bookings
│   ├── venues/            # Venue listings
│   ├── login/             # Login page
│   └── register/          # Registration page
├── components/            # React components
│   └── ui/               # shadcn/ui components
├── lib/                   # Utilities
│   ├── prisma.ts         # Prisma client
│   └── utils.ts          # Helper functions
├── prisma/               # Database schema
│   └── schema.prisma     # Prisma schema
├── types/                # TypeScript types
├── auth.ts               # Auth.js configuration
└── middleware.ts         # Next.js middleware

```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Prisma Studio

## Default Admin Account

After seeding, you can login with:
- Email: admin@ayo.com
- Password: admin123

## Development Guidelines

See [AGENTS.md](./AGENTS.md) for detailed development guidelines and conventions.

## License

MIT
