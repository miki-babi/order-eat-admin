# Cafe Ordering and Staff Management System

A Laravel + Inertia + React application for pickup-based cafe ordering with staff operations, access control, branch assignment, reporting, and SMS notifications.

## Features
### Customer features
- Browse active menu items by search and category.
- Add items to cart and place pickup orders.
- Select pickup date and pickup location.
- Upload payment receipt during checkout (optional) or later through tracking link.
- Track order status with a public tracking token link.
- Receive SMS notifications (based on enabled event settings).

### Staff features
- Manage order queue and statuses.
- Approve/disapprove receipts with optional customer notification.
- Filter orders by:
  - status
  - receipt status
  - pickup location
  - exact date
  - time window (`today`, `tomorrow`, `upcoming`)
- Browse customers, review recent history, and send bulk/promo SMS.
- Manage menu items (create/update/deactivate/delete with image upload).
- Manage pickup locations (create/update/deactivate/delete).
- View reports: sales trends, popular items, branch performance, SMS stats.
- Manage SMS templates, notification event toggles, whitelist/blacklist, and contact CSV imports.

### Access control features
- Full RBAC with roles and permissions.
- System roles:
  - `admin`
  - `branch_manager`
  - `branch_staff`
- Admin-capable workflows:
  - create permissions
  - create/update roles
  - create/update users
  - assign roles and branches
  - reset user passwords

## Tech Stack
- Backend: Laravel 12, Fortify, Inertia Laravel
- Frontend: React 19, TypeScript, Tailwind CSS, Radix UI components
- Build: Vite + Wayfinder route/action generation
- Testing: Pest + Laravel testing utilities
- SMS: SMS Ethiopia API integration

## Project Structure
- `app/Http/Controllers` -> request orchestration
- `app/Http/Requests` -> validation
- `app/Models` -> domain entities and RBAC helpers
- `app/Services` -> SMS provider, template, and notification services
- `app/Support/BranchAccess.php` -> branch scoping and access guard
- `routes/web.php` -> public + staff route map
- `database/migrations` -> schema
- `database/seeders` -> default data, roles, permissions, demo users
- `resources/js/pages` -> Inertia pages

## Setup
## 1. Prerequisites
- PHP (match installed dependency requirements)
- Composer
- Node.js + npm
- SQLite/MySQL/PostgreSQL

Note:
- In this workspace, installed vendor dependencies currently enforce PHP >= 8.4. If you run PHP 8.3, artisan commands fail.

## 2. Install
```bash
composer install
cp .env.example .env
php artisan key:generate
```

## 3. Configure database
Default `.env.example` uses SQLite.

If using SQLite:
```bash
touch database/database.sqlite
```

Then run migrations and seeders:
```bash
php artisan migrate --seed
```

## 4. Link storage for uploads
```bash
php artisan storage:link
```

## 5. Install frontend dependencies
```bash
npm install
```

## 6. Run development environment
Option A (single command, recommended):
```bash
composer dev
```

Option B (separate):
```bash
php artisan serve
npm run dev
```

## Demo Accounts (Seeder)
- Admin: `admin@example.com` / `password`
- Branch Manager: `manager@example.com` / `password`
- Branch Staff: `staff@example.com` / `password`

## SMS Configuration
Set in `.env`:
- `SMS_ETHIOPIA_ENABLED=true|false`
- `SMS_ETHIOPIA_BASE_URL=https://smsethiopia.et`
- `SMS_ETHIOPIA_API_KEY=...`

Behavior:
- If provider is disabled or missing key, sends are logged as failed with reason.
- Blacklist always blocks.
- If whitelist has entries, whitelist mode is active (only listed numbers can receive SMS).

## How to Use
## Customer flow
1. Open `/`.
2. Add menu items.
3. Continue to pickup/contact details.
4. Optionally upload receipt.
5. Submit order.
6. Use confirmation/tracking links to monitor progress and re-upload receipt if needed.

## Staff flow
1. Log in.
2. You are redirected from `/dashboard` to the first page your permissions allow.
3. Use sidebar modules (orders, customers, reports, etc.) based on assigned permissions.

## Access control flow (admin/authorized users)
1. Open `/staff/access-control`.
2. Create permissions.
3. Create roles and assign permission slugs.
4. Create users and assign roles + branch IDs.
5. Update user password/roles/branches as needed.

## Commands
```bash
# Run tests (lint + php tests)
composer test

# PHP formatting/lint
composer lint

# Frontend
npm run dev
npm run build
npm run lint
npm run types

# Send a manual SMS test
php artisan sms:test 2519XXXXXXXX "Hello"
```

## Testing
Covered by automated tests:
- Auth and settings flows.
- Order creation and order time-window filtering (`today/tomorrow/upcoming`).
- RBAC access-control workflows.
- SMS template/setting/list/contact management.
- SMS trigger conditions for order and receipt events.

Run:
```bash
php artisan test
```

## Important Notes
- Branch assignment currently has compatibility behavior: non-admin users with no assigned branches may still see all branches.
- `pickup_date` is date-only; no hour-level pickup time field exists yet.
- Receipt upload from tracking page is token-based and does not require login.

## Troubleshooting
### `php artisan` fails with platform check / PHP version error
Your installed dependencies require a newer PHP version than runtime. Upgrade PHP to the required version (currently >= 8.4 in this workspace) or reinstall dependencies in a compatible environment.

### Uploaded images/receipts not visible
Run:
```bash
php artisan storage:link
```
and ensure `APP_URL` is correct.

### SMS not sending
Check:
- `SMS_ETHIOPIA_ENABLED=true`
- `SMS_ETHIOPIA_API_KEY` set
- number format is valid Ethiopian mobile format
- not blocked by blacklist / whitelist mode
