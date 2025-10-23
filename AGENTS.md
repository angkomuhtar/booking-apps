# Agent Guidelines for Ayo Court Booking System

## Build/Test Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npx prisma generate` - Generate Prisma client
- `npx prisma db push` - Push schema changes to database
- `npm test` - Run all tests
- `npm test -- <test-file-name>` - Run single test file

## Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: Auth.js v5 (provider: Credentials)
- **Styling**: Tailwind CSS + shadcn/ui components

## Code Conventions
- **Imports**: Group by external, internal, types; use `@/` alias for root imports
- **Components**: Use functional components with TypeScript; shadcn components in `components/ui/`
- **Types**: Define in separate `.types.ts` files; use Prisma types where possible
- **Naming**: camelCase for variables/functions, PascalCase for components, kebab-case for files
- **Error Handling**: Use try-catch with proper error messages; return error states to UI
- **Server Actions**: Use `"use server"` directive; validate inputs with Zod schemas
- **Database**: Always use Prisma client; include error handling for DB operations
- **Forms**: Use React Hook Form + Zod validation with shadcn form components
- **API Routes**: Use App Router route handlers in `app/api/`; return JSON responses
