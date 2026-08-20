Operator Portal — React Project Setup & Folder Structure

1. Current project

This project is the Operator Portal/Dashboard for the Bus Booking SaaS platform.

The project has been created with:

React 19.2.8

React DOM 19.2.8

TypeScript 6.0.3

Vite 8.2.2

ESLint 10.8.1

pnpm 10.17.1

Current local Node version:

Node.js v22.20.0

Node 22 is sufficient for the current Vite project. We can move the development environment to the Node 24 LTS line later as part of environment standardization. Do not change Node just to get the current project running.

2. Current Vite folder structure

After the initial Vite setup, the project should look approximately like this:

operatorPageDashboard/
│
├── node_modules/
│
├── public/
│   └── vite.svg
│
├── src/
│   ├── assets/
│   │   └── react.svg
│   │
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── pnpm-lock.yaml
├── README.md
│
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts

This is the starter structure only. It is not the final architecture for the Operator Portal.

3. What each starter file does

index.html

The HTML entry point.

The browser loads this file first.

It contains the root element:

<div id="root"></div>

React then mounts the application into this element.

src/main.tsx

The actual React entry point.

Conceptually:

index.html
    ↓
<div id="root">
    ↓
src/main.tsx
    ↓
<App />

This is where global providers will eventually be added, for example:

main.tsx
   ↓
Query Provider
   ↓
Router
   ↓
Auth Provider
   ↓
App

src/App.tsx

Currently the main application component.

For the starter Vite project, it contains the demo UI.

Later it will become much smaller because routing/layout/features will be separated.

src/App.css

Starter styles for App.tsx.

We will eventually replace most of this with our application styling system.

src/index.css

Global CSS.

This is where global styles, CSS variables, resets, etc. can live if we use CSS alongside our UI system.

src/assets/

Static assets imported by React components.

Examples later:

assets/
├── images/
├── icons/
└── logos/

public/

Files that should be served directly without being processed by Vite.

Examples:

public/
├── favicon/
├── images/
└── logos/

Use this only for assets that need direct public URLs.

vite.config.ts

Vite configuration.

Later this can contain configuration for:

React plugin

path aliases

development proxy if required

build configuration

tsconfig.*

TypeScript configuration.

The Vite template separates:

tsconfig.json
tsconfig.app.json
tsconfig.node.json

because the browser application and Vite's Node-side configuration have different TypeScript environments.

eslint.config.js

ESLint configuration.

This will enforce code-quality rules.

package.json

The project's dependency and script definition.

Typical scripts:

pnpm dev
pnpm build
pnpm lint
pnpm preview

pnpm-lock.yaml

Locks exact dependency versions.

Do commit this file to Git.

Do not manually edit it.

4. The architecture we will move toward

Do NOT create all of this immediately.

This is the target architecture we will reach gradually:

operatorPageDashboard/
│
├── public/
│
├── docs/
│
├── src/
│   │
│   ├── app/
│   │   ├── App.tsx
│   │   ├── router.tsx
│   │   └── providers/
│   │       ├── AuthProvider.tsx
│   │       └── QueryProvider.tsx
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── forms/
│   │   ├── tables/
│   │   ├── modals/
│   │   └── layout/
│   │       ├── PublicLayout.tsx
│   │       ├── DashboardLayout.tsx
│   │       ├── Navbar.tsx
│   │       ├── Sidebar.tsx
│   │       └── Header.tsx
│   │
│   ├── features/
│   │   ├── auth/
│   │   ├── pricing/
│   │   ├── onboarding/
│   │   ├── dashboard/
│   │   ├── buses/
│   │   ├── routes/
│   │   ├── drivers/
│   │   ├── bookings/
│   │   ├── staff/
│   │   ├── analytics/
│   │   ├── subscription/
│   │   ├── billing/
│   │   ├── verification/
│   │   ├── grievances/
│   │   ├── notifications/
│   │   └── settings/
│   │
│   ├── services/
│   │   └── api/
│   │       ├── client.ts
│   │       ├── auth.api.ts
│   │       ├── bus.api.ts
│   │       ├── booking.api.ts
│   │       └── subscription.api.ts
│   │
│   ├── hooks/
│   │
│   ├── guards/
│   │   ├── ProtectedRoute.tsx
│   │   ├── RoleGuard.tsx
│   │   └── PermissionGuard.tsx
│   │
│   ├── store/
│   │
│   ├── types/
│   │
│   ├── utils/
│   │
│   └── styles/
│
├── .env
├── .env.example
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── vite.config.ts
└── README.md

5. Why we are using features/

The Operator Portal has many business areas.

Instead of:

components/
pages/
api/

with hundreds of unrelated files mixed together, we group code by business feature.

For example:

features/
└── buses/
    ├── api/
    ├── components/
    ├── pages/
    ├── schemas/
    └── types.ts

Everything related to buses stays together.

The same pattern can be used for:

auth
pricing
bookings
drivers
subscription
billing

This will make the application easier to maintain as it grows.

6. Public vs authenticated application

We will have two major layouts.

Public

PublicLayout
│
├── Navbar
├── Page
└── Footer

Pages:

/
 /features
 /solutions
 /pricing
 /faq
 /contact
 /login
 /register

The public navbar will include:

Logo
Features
Solutions
Pricing
FAQ
Login
Get Started

Authenticated

DashboardLayout
│
├── Sidebar
├── Header
└── Page

Main areas:

Dashboard
My Buses
Routes & Schedules
Drivers
Bookings
Analytics
Revenue
Staff
Subscription
Billing
Verification
Grievances
Notifications
Settings

7. API architecture

The frontend should not put API calls directly inside every component.

Instead:

Component
    ↓
Feature hook
    ↓
API function
    ↓
API client
    ↓
Backend

Example:

features/auth/
    ↓
auth.api.ts
    ↓
services/api/client.ts
    ↓
Backend Auth API

The API client will eventually handle:

Base URL

Authorization

Access token

Refresh token

Common errors

401 handling

8. Important rule for authentication

The frontend can hide/show UI according to role and permissions, but the backend remains the security authority.

For example:

Frontend:
"Should I show the Refund button?"

Backend:
"Is this user actually allowed to refund?"

The backend must enforce the permission.

9. Current setup status

Completed:

GitHub repository cloned

Vite project created

React installed

TypeScript installed

ESLint installed

Dependencies installed

Development server successfully started

The project successfully reached:

VITE ready
Local: http://localhost:5173/

So the basic React project is working.

10. Important note about the Vite overwrite

When Vite asked:

Current directory is not empty.
Remove existing files and continue?

Remove existing files and continue was selected.

That means the previous files that existed in the repository before Vite scaffolding may have been replaced.

In particular, if API files such as:

src/services/api/
├── client.ts
├── auth.api.ts
├── bus.api.ts
├── booking.api.ts
└── subscription.api.ts

were created before running pnpm create vite ., check Git history before recreating them.

Do not blindly overwrite or recreate old API work.

11. Git checkpoint

Before making major architecture changes, create a clean checkpoint:

git status

Then review the changes.

After confirming the starter project is correct:

git add .
git commit -m "chore: initialize React Vite TypeScript project"
git push origin main

Only commit files you have reviewed.

12. Immediate next step

Do not install every library yet.

First verify the starter project:

pnpm dev

Open:

http://localhost:5173/

Confirm the Vite React page appears.

Then stop the server with:

Ctrl + C

After that, we should inspect package.json and the current src/ contents, then install the project dependencies in controlled groups.

The next setup sequence should be:

1. Verify React/Vite
        ↓
2. Clean starter files
        ↓
3. Install React Router
        ↓
4. Install TanStack Query
        ↓
5. Install Axios
        ↓
6. Install React Hook Form + Zod
        ↓
7. Set up Tailwind/shadcn UI
        ↓
8. Create application folders
        ↓
9. Create public Navbar/Layout
        ↓
10. Create authentication architecture
        ↓
11. Connect existing backend APIs
        ↓
12. Build Operator Dashboard