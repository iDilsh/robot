# Task: Build cpanel layout and login page for iDilsh Network admin dashboard

## Summary
Created 4 files for the iDilsh Network admin dashboard:

### 1. `/src/app/api/auth/check/route.ts`
- Simple GET route that uses `verifyAuth()` to check JWT session cookie
- Returns `{ authenticated: boolean, username?: string }`
- Tested: returns `{"authenticated":false}` when not logged in

### 2. `/src/app/cpanel/login/page.tsx`
- Beautiful login page with subtle violet gradient background
- Features `/logo.svg` image, "iDilsh Network" branding, "Control Panel" subtitle
- Username/password inputs with show/hide password toggle
- Error message display with red styling
- Violet gradient submit button
- Framer Motion entrance animations (card, fields, button stagger)
- Does NOT use cpanel sidebar layout (layout passes through children for `/cpanel/login`)

### 3. `/src/app/cpanel/layout.tsx`
- Dark sidebar (`bg-slate-900`, 260px wide) with navigation items using lucide-react icons
- Auth check via `/api/auth/check` on mount, redirects to `/cpanel/login` if not authenticated
- Sidebar nav: Dashboard, Blog Posts, Portfolio, Settings, Visit Site (ExternalLink)
- Active nav item: animated violet left border indicator + lighter bg (`bg-brand-violet/15`)
- Top bar with page title, user greeting ("Hello, {username}"), View Site link
- Mobile responsive: sidebar hidden on mobile with hamburger toggle, overlay backdrop
- User info card + Logout button in sidebar footer
- Login page bypasses sidebar (renders children directly)

### 4. `/src/app/cpanel/page.tsx`
- Dashboard with "Welcome back, Thisara! 👋" heading
- 4 stat cards in responsive grid (1/2/4 columns):
  - Total Blog Posts, Published Posts, Portfolio Projects, Published Projects
  - Each card: white bg, rounded-xl, shadow-sm, icon + number + label
- Quick Actions: New Blog Post, Add Portfolio Project, Site Settings
- Recent blog posts table (last 5): title, category badge, status (Published/Draft), date
- Empty state with link to create first post
- Framer Motion fade-up animations throughout

## Verification
- `bun run lint` passed with no errors
- Dev server compiled successfully
- `/api/auth/check` endpoint returns correct response
- All pages load with HTTP 200
