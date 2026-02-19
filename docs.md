# Developer Documentation

## 1. Purpose and Scope
This document explains how the codebase works at implementation level: where logic lives, how requests flow, why key design choices were made, and what to watch for when extending behavior.

Project type:
- Full-stack Laravel 12 + Inertia + React + TypeScript cafe ordering system.
- Public customer ordering flow.
- Staff backoffice with RBAC, branch assignment, reporting, and SMS workflows.

## 2. Stack and Runtime
Backend:
- PHP / Laravel (`app/`, `routes/`, `database/`).
- Fortify authentication with email verification and optional 2FA.

Frontend:
- React + TypeScript + Inertia pages under `resources/js/pages`.
- Tailwind CSS + UI components under `resources/js/components`.
- Wayfinder route/action code generation under `resources/js/routes` and `resources/js/actions`.

Persistence:
- Relational DB via Eloquent models and migrations.
- Default `.env.example` uses SQLite.

External integration:
- SMS Ethiopia API via `app/Services/SmsEthiopiaService.php`.

## 3. High-Level Architecture
### 3.1 HTTP Pipeline
Entry point:
- `bootstrap/app.php`

Key middleware aliases:
- `staff` -> `App\Http\Middleware\EnsureStaffRole`
- `permission` -> `App\Http\Middleware\EnsureUserHasPermission`

Web stack additions:
- `HandleAppearance` shares appearance cookie value.
- `HandleInertiaRequests` injects shared props, including resolved role/permission/branch IDs.

### 3.2 Backend Layering
- Routes define endpoint, auth, and permission constraints.
- Controllers orchestrate request flow and persistence.
- FormRequest classes enforce validation.
- Services encapsulate SMS provider, template rendering, and event settings.
- Models encapsulate data shape and relationships.
- `BranchAccess` centralizes branch scoping/authorization.

### 3.3 Frontend Layering
- Inertia pages (`resources/js/pages/**`) render server-provided props.
- Layouts (`resources/js/layouts/**`) provide shell/sidebar/settings frames.
- Permission-aware sidebar is built from `auth.user.permission_slugs` shared by middleware.
- Staff pages use router/form requests directly to route URLs.

## 4. Domain Model and Data Design
Core tables and relationships:
- `customers` -> has many `orders`, has many `sms_logs`.
- `orders` -> belongs to `customer`, belongs to `pickup_location`, has many `order_items`.
- `order_items` -> belongs to `order`, belongs to `menu_item`.
- `menu_items` -> has many `order_items`.
- `pickup_locations` -> has many `orders`, belongsToMany `users`.
- `sms_templates`, `sms_notification_settings`, `sms_phone_lists`, `sms_logs` support messaging.
- RBAC: `roles`, `permissions`, `role_user`, `permission_role`, and branch assignment pivot `pickup_location_user`.

Status enums:
- `orders.order_status`: `pending`, `preparing`, `ready`, `completed`.
- `orders.receipt_status`: `pending`, `approved`, `disapproved`.
- `sms_logs.status`: `pending`, `sent`, `failed`.

Design choices:
- Deactivation over deletion for historical integrity:
  - Menu items with order history are deactivated, not deleted.
  - Pickup locations with order history are deactivated, not deleted.

## 5. Auth, RBAC, and Branch Access
### 5.1 Auth
Fortify views are mapped in `app/Providers/FortifyServiceProvider.php` to Inertia auth pages.

Enabled features (`config/fortify.php`):
- Registration
- Password reset
- Email verification
- Two-factor authentication (`confirm` and `confirmPassword` enabled)

### 5.2 RBAC Model
`App\Models\User` provides:
- `roleSlugs()` from `roles` relation.
- `permissionSlugs()` from `role_user` + `permission_role` join.
- `hasPermission()` and `hasAnyPermission()`.
- `isAdmin()` shortcut (`admin` role).

System definitions in code:
- Permission catalog: `User::PERMISSION_DEFINITIONS`
- System roles: `User::SYSTEM_ROLE_DEFINITIONS`
  - `admin`
  - `branch_manager`
  - `branch_staff`

### 5.3 Legacy Compatibility
The code intentionally supports pre-RBAC data via `users.role` fallback:
- If no role pivot exists, `roleSlugs()` maps old role strings.
- If no permission pivots exist, `permissionSlugs()` falls back to legacy staff/admin sets.

Why this exists:
- Prevent breakage during migration from single-role string model to full RBAC.

Important implication:
- A user with only `users.role='staff'` still receives legacy staff permissions.

### 5.4 Branch Assignment and Scoping
Branch assignment pivot:
- `pickup_location_user`

Scope helper:
- `App\Support\BranchAccess::scopeQuery($query, $user, $column='pickup_location_id')`

Branch authorization helper:
- `BranchAccess::ensureUserCanAccessBranch($user, $pickupLocationId)`

Compatibility behavior (intentional, but important):
- For non-admin users with zero assigned branches, access is unrestricted.
- This behavior exists in both query scoping and branch checks.

Why:
- Backward compatibility for existing staff accounts created before branch assignment was introduced.

## 6. Routing and Permission Gates
Main route files:
- `routes/web.php`
- `routes/settings.php`

### 6.1 Public Customer Routes
- `GET /` -> customer menu page (`OrderController@index`)
- `POST /orders` -> create order
- `GET /orders/{trackingToken}/confirmation`
- `GET /orders/{trackingToken}/track`
- `POST /orders/{trackingToken}/receipt` -> upload/replace receipt without login (token-based)

### 6.2 Dashboard Redirect Logic
`GET /dashboard` does not render dashboard content; it redirects by permission priority:
1. `orders.view`
2. `customers.view`
3. `pickup_locations.manage`
4. `menu_items.manage`
5. `reports.view`
6. `sms_templates.manage`
7. access-control if any of `users.manage`, `roles.manage`, `permissions.manage`
8. fallback to home

This implements "load the first page by authority" behavior.

### 6.3 Staff Routes
Prefix: `/staff`
Middleware: `auth`, `verified`, `staff`, plus per-route `permission:*` checks.

Modules:
- Orders, customers, pickup locations, menu items, reports, SMS templates/settings/lists/import, access control.

## 7. Feature Internals
### 7.1 Customer Ordering Flow
Controller: `app/Http/Controllers/OrderController.php`

`index()`:
- Loads active menu items with search/category filters.
- Loads active pickup locations.
- Returns `staffRoute` only if current user can access staff panel.

`store()`:
- Validates with `StoreOrderRequest`.
- Logs attempt metadata.
- Ensures all requested item IDs are active/available.
- Upserts customer by phone.
- Stores optional receipt to `public` disk (`receipts/`).
- Creates order + order_items in DB transaction.
- Generates 40-char tracking token.
- Sends `order_created` SMS only when event is enabled.

`confirmation()` / `track()`:
- Fetch by `tracking_token` with relationships.
- Return transformed order payload for customer pages.

`uploadReceipt()`:
- Token-based upload endpoint.
- Replaces existing local receipt file if present.
- Resets receipt state to `pending` and clears disapproval reason.

Validation highlights (`StoreOrderRequest`):
- Phone normalization before validation.
- Ethiopian phone regex accepted formats: `2519XXXXXXXX`, `+2519XXXXXXXX`, `09XXXXXXXX`, `9XXXXXXXX`.
- `pickup_date` must be `after_or_equal:today`.
- Item quantity min 1, max 100.
- Receipt image max 5 MB.

### 7.2 Staff Orders
Controller: `app/Http/Controllers/Staff/OrderController.php`

`index()` supports filters:
- search (order ID/customer/phone)
- `status`
- `receipt_status`
- `pickup_location_id` (branch-authorized)
- exact `date`
- `time_bucket`:
  - `today` -> `pickup_date = today`
  - `tomorrow` -> `pickup_date = tomorrow`
  - `upcoming` -> `pickup_date > tomorrow`

Time bucket basis:
- `Carbon::today()` in app timezone (`UTC` by default unless changed).

`update()`:
- Branch-authorized before modification.
- Supports order status and receipt status updates.
- Auto transition: if receipt approved and order still pending, order moves to preparing.
- Disapproval requires reason.

SMS trigger conditions in update:
- Receipt approved SMS: only if `notify_customer=true`, status changed, event enabled.
- Receipt disapproved SMS: only if `notify_customer=true`, status changed, event enabled.
- Order ready SMS: only if status changed to ready, customer opted in (`notify_when_ready`), event enabled.

### 7.3 Staff Customers and Promo SMS
Controller: `app/Http/Controllers/Staff/CustomerController.php`

`index()`:
- Customer list restricted to customers with orders in visible branches.
- Supports search and selected customer history (last 10 orders).

`sendSms()`:
- Sends to selected customer IDs constrained by branch visibility.
- Renders message with template placeholders using latest visible order context.
- Counts sent/failed based on provider result.

### 7.4 Menu Items
Controller: `app/Http/Controllers/Staff/MenuItemController.php`

- Full create/update/delete/deactivate workflows.
- Image upload to `public` disk (`menu-items/`).
- Replacing image deletes old local file.
- Delete fallback to deactivate when referenced by order history.

### 7.5 Pickup Locations
Controller: `app/Http/Controllers/Staff/PickupLocationController.php`

- Admin sees all; non-admin can be limited by assigned branch IDs.
- Update/delete guarded by branch authorization helper.
- Delete fallback to deactivate when order history exists.

### 7.6 Reports
Controller: `app/Http/Controllers/Staff/ReportController.php`

Filters:
- `from`, `to`, optional `pickup_location_id`

Outputs:
- Summary metrics (sales/orders/pending receipts/completed orders)
- Sales by day
- Top items
- Pickup location performance
- SMS status totals (`sent`, `failed`, `pending`)

Branch constraints applied across report queries.

### 7.7 SMS Management
Controller: `app/Http/Controllers/Staff/SmsTemplateController.php`

Capabilities:
- Edit SMS templates.
- Toggle event settings.
- Manage whitelist/blacklist numbers.
- Import contacts from CSV (`name,phone`).

Resilience design:
- Uses `Schema::hasTable()` checks so page/services do not crash before migrations are applied.

### 7.8 Access Control
Controller: `app/Http/Controllers/Staff/AccessControlController.php`

Capabilities:
- Create permissions.
- Create/update roles and permission assignments.
- Create/update users, reset password, assign roles, assign branches.

Notes:
- Role slug is generated from name on create, unique, underscore style.
- Role slug is not changed on role update.
- Creating/updating users with manager/staff roles requires at least one branch (`StoreUserRequest`/`UpdateUserRequest` post-validation).
- User routes require both `users.manage` and `branches.assign` permissions.

## 8. SMS Subsystem Deep Dive
### 8.1 Template and Event Sources
Config defaults in `config/sms.php`:
- `templates`
- `notification_events`
- `placeholders`

Runtime services:
- `SmsTemplateService`
- `SmsNotificationService`

Both services sync config defaults into DB tables when present.

Why DB sync exists:
- Keeps defaults in source control while allowing runtime edits in admin UI.

### 8.2 Provider Adapter
Service: `SmsEthiopiaService`

Send flow:
1. Create `sms_logs` record with `pending`.
2. Normalize phone to `251XXXXXXXXX`.
3. Enforce blacklist and optional whitelist mode.
4. Validate provider enabled + API key.
5. POST to `${SMS_ETHIOPIA_BASE_URL}/api/sms/send`.
6. Persist provider response and sent/failed status.

Failure paths are logged with explicit reasons for support diagnostics.

Normalization supports:
- `2519XXXXXXXX`
- `09XXXXXXXX`
- `9XXXXXXXX`
(and same for `7` prefix ranges)

## 9. Frontend Structure and Behavior
### 9.1 Boot and Rendering
- Client bootstrap: `resources/js/app.tsx`
- SSR entry: `resources/js/ssr.tsx`
- Root blade template: `resources/views/app.blade.php`

### 9.2 Shared Auth/Permission Context
Injected by `HandleInertiaRequests`:
- `auth.user.role`
- `auth.user.role_slugs`
- `auth.user.permission_slugs`
- `auth.user.pickup_location_ids`
- `auth.user.is_admin`
- `flash.success` / `flash.error`

Used directly by sidebar and pages.

### 9.3 Permission-Aware Navigation
Component: `resources/js/components/app-sidebar.tsx`

Nav links are generated only when user has required permission (or is admin).
This ensures users land only on pages they can operate.

### 9.4 Customer Pages
- `customer/menu.tsx`: 4-step wizard with cart, details, optional receipt upload.
- `customer/confirmation.tsx`: summary + tracking link.
- `customer/tracking.tsx`: timeline + receipt re-upload if needed.

### 9.5 Staff Pages
- `staff/orders.tsx`: summary, filters, time buckets, update actions, approve/disapprove dialogs.
- `staff/customers.tsx`: search, history, bulk SMS.
- `staff/menu-items.tsx`: CRUD + image upload.
- `staff/pickup-locations.tsx`: CRUD + activation.
- `staff/reports.tsx`: analytics cards and charts.
- `staff/sms-templates.tsx`: template/event/list/contact management.
- `staff/access-control.tsx`: permission/role/user administration.

### 9.6 Generated Route Helpers
- Route/action helpers generated by Wayfinder plugin in `vite.config.ts`.
- Generated files in `resources/js/routes/**` and `resources/js/actions/**` map TS calls back to controller methods.

## 10. Validation Map
Main FormRequest classes:
- Order creation/upload: `app/Http/Requests/Orders/*`
- Staff module validations: `app/Http/Requests/Staff/*`
- Settings/auth profile/password/2FA: `app/Http/Requests/Settings/*`

Notable business validations:
- Branch role assignment requires branch IDs.
- Receipt disapproval requires reason.
- SMS message max length 480.
- Contacts import file must be CSV/TXT and <= 5 MB.

## 11. Seed Data and Bootstrap State
`database/seeders/DatabaseSeeder.php`:
- Calls `RolePermissionSeeder` first.
- Seeds sample menu items and branches.
- Seeds demo users and assigns roles/branches:
  - `admin@example.com` / `password`
  - `manager@example.com` / `password`
  - `staff@example.com` / `password`

`RolePermissionSeeder` seeds all defined permissions and system roles.

## 12. Testing Coverage
Framework:
- Pest + Laravel plugin.
- `RefreshDatabase` for Feature tests.

Covered areas:
- Auth flows (login/register/password reset/verification/2FA challenge).
- Settings flows (profile/password/2FA settings access).
- Access control creation/update behavior.
- Order flow creation and staff filters (`today`, `tomorrow`, `upcoming`).
- SMS template manager operations and event toggles.
- SMS trigger conditions for order/receipt updates.

Known gaps:
- No deep frontend component tests.
- No load/performance tests.
- No explicit policy tests for every permission edge case.

## 13. Operational Notes
### 13.1 Storage
Uploads use `public` disk:
- `receipts/`
- `menu-items/`

`php artisan storage:link` is required for public URLs.

### 13.2 Queue
Default queue connection is DB (`.env.example`).
Current order/SMS flows are synchronous service calls; queue worker is still included in `composer dev` command.

### 13.3 Useful Commands
- Start dev stack: `composer dev`
- Run tests: `composer test`
- Send test SMS: `php artisan sms:test {phone} {message}`

### 13.4 Environment Runtime Caveat
In this workspace, vendor platform check currently requires PHP >= 8.4 (`vendor/composer/platform_check.php`), and `php artisan` fails under PHP 8.3.6. Ensure runtime PHP version matches installed dependencies.

## 14. Important Implementation Caveats
- Branch compatibility mode: unassigned non-admin users are effectively unrestricted across branches.
- Legacy role fallback may grant broader permissions than strict RBAC pivots if pivots are missing.
- `pickup_date` is date-only (no pickup time field). Time-bucket filters are day-based, not hour-based.
- `dashboard` route is a redirect router, not a feature page.
- Customer tracking is token-based and intentionally available without login.

## 15. Suggested Extension Points
- Tighten branch behavior by making empty branch assignment deny access for non-admin users.
- Move SMS sends to queued jobs for reliability/retry control.
- Add audit logging for role/permission/user mutations.
- Add pickup time window fields if operations require hour-level scheduling.
