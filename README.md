# ToolNext Frontend  
A responsive Next.js application for renting tools, featuring authentication, filters, booking, user profiles, and rich UI components.

ToolNext is a platform that connects users who want to rent tools with owners who offer their equipment.  
This repository contains the **frontend** implementation of the project.

---

## Features
- Next.js 15 (App Router)
- Responsive UI (mobile-first)
- Authentication (login/register)
- Protected and public routes
- Tools catalog with category filters
- Tool details with gallery and owner info
- Add / Edit tool forms (Formik + Yup)
- Booking system with date selection
- User profile with listed tools
- Feedbacks with modal form
- Dynamic loading, error boundaries, and loaders
- API integration via Fetch / Axios
- State management with **Zustand**
- Server state caching with **React Query**
- CSS Modules for styling
- `next/image` for optimized images

---

## Project Structure
src/
├─ app/
│ ├─ layout.tsx # Main layout (Header, Footer, children)
│ ├─ page.tsx # Home page
│ ├─ error.tsx # Global error boundary
│ ├─ not-found.tsx # 404 page
│ ├─ tools/
│ │ ├─ page.tsx # Tools catalog
│ │ ├─ [toolId]/ # Tool details and booking
│ │ └─ new/ # Add tool
│ ├─ auth/
│ │ ├─ login/
│ │ └─ register/
│ ├─ profile/
│ └─ confirm/
├─ components/ # Reusable UI components
├─ lib/ # API clients, utils
├─ services/ # Data access logic (fetchers)
├─ store/ # Zustand stores
├─ hooks/ # Custom React hooks
├─ styles/ # Global and module styles
└─ types/ # TypeScript types

---

## Main UI Components

### General
- **Header** (navigation, user menu, burger menu)
- **Footer**
- **HeroBlock**
- **BenefitsBlock**
- **FeaturedToolsBlock**
- **FeedbacksBlock**
- **RegistrationPromoBlock**

### Tools
- **FilterBar**
- **ToolsGrid**
- **ToolCard**
- **ToolGallery**
- **ToolInfoBlock**

### Forms & Modals
- **AddEditToolForm**
- **BookingForm**
- **FeedbackFormModal**
- **ConfirmationModal**

---

### Environment Variables

Create a `.env.local` file:
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_UPLOADS_URL=

---

### Open the app at:

http://localhost:3000

---

## Authentication

The app supports
- Register
- Login
- Logout
- Persisted session
- Protected routes (client-side & server-side)
- Redirect logic for unauthorized users

State is stored using:
- JWT cookies (server)
- Zustand + React Query (client)

---

## Styling

- CSS Modules
- Mobile-first layout
- Reusable UI components
- Dynamic imports for images
- Accessibility considerations

---

## Scripts

npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Run production build
npm run lint         # Lint project

---

## Development Workflow

- Create a feature branch: 
  git checkout -b feature/your-task-name

- Commit changes following conventional commits.

- Open a Pull Request.

- Request review from the team.

- Merge after approval.

