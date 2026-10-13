# Weta R. C. Basic School Management Portal

A complete monorepo school management application with:
- NestJS backend API
- Prisma ORM + PostgreSQL
- Next.js web portal
- Expo React Native mobile app
- Authentication and role-based authorization
- Student management, attendance, fees, grades, timetable, dashboard, and payments

## Tech stack
- Backend: NestJS + Prisma + PostgreSQL
- Web: Next.js + TypeScript
- Mobile: Expo React Native
- Payments: Stripe
- PDF reports: pdfkit

## Repository structure
- apps/backend
- apps/web
- apps/mobile

## Setup instructions

### 1. Install root dependencies
```bash
npm install
```

### 2. Install app dependencies
```bash
npm install --workspace apps/backend
npm install --workspace apps/web
npm install --workspace apps/mobile
```

### 3. Set backend environment
```bash
cd apps/backend
cp .env.example .env
```
Update `.env` with your PostgreSQL connection string and Stripe keys.

### 4. Generate Prisma client and migrate the database
```bash
cd apps/backend
npx prisma generate
npx prisma migrate dev --name init_school_system
```

### 5. Start the backend
```bash
npm run start:dev
```

### 6. Start the web portal
```bash
npm run dev:web
```

### 7. Start the mobile app
```bash
npm run dev:mobile
```

## Default admin account
Register or login with a user created as ADMIN role.

Example login payload:
```json
{
  "email": "admin@example.com",
  "password": "123456"
}
```

## Useful API endpoints
- POST `/auth/register`
- POST `/auth/login`
- GET `/auth/me`
- GET `/students`
- POST `/students`
- GET `/classes`
- POST `/attendance`
- GET `/grades`
- POST `/fees`
- GET `/timetable`
- GET `/dashboard/overview`
- GET `/analytics/enrollment-by-month`
- POST `/payments/checkout`
- POST `/payments/webhook`
- POST `/reportcards/generate/:studentId`

## Branding
This project is branded as Weta R. C. Basic School Management Portal.

## Production notes
- Replace local file uploads with S3 or Supabase Storage for production.
- Set up Stripe webhook on a public URL for payment handling.
- Use HTTPS and secure environment variables.
- Add proper CI/CD and automated tests before production deployment.
