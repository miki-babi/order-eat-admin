# User Manual

## 1. Overview
This application is a pickup ordering and staff operations system for a cafe.

It has two main sides:
- Customer side: place and track pickup orders.
- Staff side: manage orders, customers, menu, branches, reports, SMS, and access control.

---

## 2. User Roles and Access

### Admin
- Full access to all pages and branches.
- Can create permissions, create roles, create users, assign branches, and reset user passwords.
- Can use all staff modules.

### Branch Manager
- Manages day-to-day branch operations based on assigned permissions and branches.
- Usually handles orders, customers, reports, menu updates, and SMS.

### Branch Staff
- Handles operational tasks like order updates and customer support features they are allowed to use.

### Important access behavior
- After login, `/dashboard` automatically redirects each user to the first page they are allowed to open.
- The left sidebar only shows pages the current user has permission to access.

---

## 3. Getting Started

1. Open the app home page: `/`
2. For staff access, click `Staff Login` and sign in.
3. After login, use the sidebar to move between authorized modules.
4. Open user menu (bottom-left profile menu) to access `Settings` and `Log out`.

### Entry point notes
- `/dashboard`: not a standalone dashboard workflow page. It redirects to the first page allowed by your permissions.
- `/welcome`: basic welcome page; operational work is typically done from `/` and `/staff/*` pages.

---

## 4. Customer Pages

### 4.1 Home / Menu (`/`)
This is the customer ordering page. It is a 4-step flow.

### Step 1: Browse Menu
- Search by item name, description, or category.
- Filter by category.
- View item image, price, and description.
- Increase/decrease quantity and add items to cart.

### Step 2: Review Cart
- Check selected items, quantities, images, and line totals.
- Adjust quantities before checkout.

### Step 3: Pickup and Contact Details
- Enter customer name and phone.
- Choose pickup date.
- Choose pickup branch.
- Enable/disable `Notify me by SMS when my order is ready`.
- If the selected branch has a Google Maps URL, click `Get Directions`.

### Step 4: Receipt Upload (Optional)
- Upload payment receipt image now (PNG/JPG/JPEG/WEBP).
- You can also skip and upload later from tracking page.

### Submit
- Click `Submit Order`.
- You are redirected to the confirmation page.

### 4.2 Confirmation (`/orders/{trackingToken}/confirmation`)
- Shows order number, statuses, pickup date, pickup branch, item summary, and total.
- If branch map URL exists, click `Get Directions`.
- Use `Track This Order` to open live tracking.

### 4.3 Tracking (`/orders/{trackingToken}/track`)
- Public page (no login needed) for that tracking token.
- Shows order timeline: `pending` -> `preparing` -> `ready` -> `completed`.
- Shows receipt status: `pending`, `approved`, or `disapproved`.
- If receipt is disapproved, reason is displayed.
- Upload a new receipt from this page when needed.
- If branch map URL exists, click `Get Directions`.

---

## 5. Authentication Pages

### 5.1 Login (`/login`)
- Email + password login.
- Optional `Remember me`.
- Link to forgot password page.

### 5.2 Register (`/register`)
- Create account with name, email, and password.

### 5.3 Forgot Password (`/forgot-password`)
- Request password reset link by email.

### 5.4 Reset Password (`/reset-password/{token}`)
- Set a new password using email reset token.

### 5.5 Verify Email (`/email/verify`)
- Resend verification email if account is unverified.

### 5.6 Two-Factor Challenge (`/two-factor-challenge`)
- Enter authenticator app code or recovery code during login.

---

## 6. Staff Pages

### 6.1 Orders (`/staff/orders`)
Purpose: process orders and receipt approvals.

### What you can do
- View order queue with customer, pickup details, item images, and totals.
- Filter by search (order ID/customer/phone), order status, receipt status, pickup location, exact date, and time window (`Today`, `Tomorrow`, `Upcoming`).
- Update order status (`pending`, `preparing`, `ready`, `completed`).
- Update receipt status: approve (optional SMS), set pending, or disapprove (reason required, optional SMS).
- Open order tracking link.
- View uploaded receipt.

### Useful behavior
- Approving a receipt can automatically move order from `pending` to `preparing`.
- Ready-notification SMS sends only when the order becomes `ready`, customer opted in, and the event is enabled.

### 6.2 Customers (`/staff/customers`)
Purpose: customer search, order history, and bulk SMS.

### What you can do
- Search customers by name or phone.
- Select customers with checkboxes.
- Open `History` for a specific customer.
- Send promo/follow-up SMS to selected customers.
- Use predefined SMS templates.
- Use placeholders supported by the system.

### 6.3 Pickup Locations (`/staff/pickup-locations`)
Purpose: manage branches.

### What you can do
- Create branch with name, address, optional Google Maps URL, and active/inactive state.
- Edit branch details and map URL.
- Delete/deactivate branch.
- Open `Open in Google Maps` link for branches with a map URL.

### Note
- If a branch has historical orders, delete action deactivates it instead of hard delete.

### 6.4 Menu Items (`/staff/menu-items`)
Purpose: menu catalog management.

### What you can do
- Filter by search, category, and status.
- Create menu item with name, description, price, category, optional image, and active/inactive state.
- Edit existing items and replace image.
- Delete/deactivate items.

### Note
- If an item has order history, delete action deactivates it instead of hard delete.

### 6.5 Reports (`/staff/reports`)
Purpose: analytics and operations visibility.

### What you can do
- Filter by date range (`from`, `to`) and pickup location.
- View total sales, total orders, pending receipts, completed orders, sales by day, popular items, pickup location performance, and SMS stats (sent/failed/pending).

### 6.6 SMS Templates (`/staff/sms-templates`)
Purpose: control outbound SMS behavior and content.

### Sections
- Placeholder reference (tokens you can use in templates).
- Template list and template editor.
- SMS notification event toggles (enable/disable send events).
- Whitelist/blacklist phone management.
- Contact import via CSV (`name,phone`).

### How to use
1. Select a template from the left list.
2. Edit label/body and save.
3. Use placeholders in template body (example: `{name}`, `{orderid}`).
4. Toggle events on/off in `SMS Notification Manager`.
5. Add numbers to whitelist/blacklist as needed.
6. Import customer contacts with a valid CSV file.

### 6.7 Access Control (`/staff/access-control`)
Purpose: manage permissions, roles, users, and branch assignments.

### Permission Management
- Create custom permissions with name, optional slug, and description.

### Role Management
- Create roles and assign permission slugs.
- Edit role name/description/permission set.

### User Management
- Create users with name, email, password, roles, and branch assignments.
- Edit users to update profile fields, change password (optional), update roles, and update branch assignments.

### Branch assignment rule
- Users assigned `branch_manager` or `branch_staff` must have at least one branch selected.

---

## 7. Account Settings Pages

Access from user dropdown -> `Settings`.

### 7.1 Profile (`/settings/profile`)
- Update name and email.
- If email changes, verification may be required again.
- Delete account (requires current password confirmation).

### 7.2 Password (`/settings/password`)
- Change password by entering current password and new password.

### 7.3 Appearance (`/settings/appearance`)
- Change theme/appearance preferences.

### 7.4 Two-Factor Authentication (`/settings/two-factor`)
- Enable or disable 2FA.
- Complete QR/manual setup flow.
- View and regenerate recovery codes.

---

## 8. Common Workflows

### 8.1 Process Today’s Orders
1. Go to `Orders`.
2. Set `Time Window` to `Today`.
3. Review receipts.
4. Approve or disapprove receipts with reason.
5. Move valid orders through `preparing` -> `ready` -> `completed`.

### 8.2 Send Promotional SMS
1. Go to `Customers`.
2. Search and select target customers.
3. Pick a template or type custom message.
4. Confirm placeholder text.
5. Click `Send SMS`.

### 8.3 Add a New Branch with Directions
1. Go to `Pickup Locations`.
2. Click `Add Pickup Location`.
3. Enter name, address, and `Google Maps Link`.
4. Save.
5. Customers will see `Get Directions` where branch details are shown.

### 8.4 Create a New Staff User
1. Go to `Access Control`.
2. Create/update role and permissions if needed.
3. In `Create User`, add user details.
4. Assign roles.
5. Assign branch(es) (required for manager/staff roles).
6. Save user.

---

## 9. Status Reference

### Order status
- `pending`: order created, waiting processing
- `preparing`: accepted and being prepared
- `ready`: ready for pickup
- `completed`: collected/closed

### Receipt status
- `pending`: waiting review
- `approved`: accepted
- `disapproved`: rejected, customer must re-upload

---

## 10. Troubleshooting

### Customer cannot find branch directions
- Confirm branch has a valid Google Maps URL in `Pickup Locations`.
- Ensure branch is active.

### Staff cannot see a page in sidebar
- Check assigned role permissions in `Access Control`.

### Staff cannot see expected branch data
- Check user branch assignments in `Access Control`.

### SMS did not send
- Check SMS event toggle in `SMS Templates`.
- Check whitelist/blacklist entries.
- Check phone format and provider configuration.

---

## 11. Best Practices
- Keep roles minimal: grant only necessary permissions.
- Always enter a clear reason when disapproving a receipt.
- Keep branch map links updated for accurate customer directions.
- Periodically review whitelist/blacklist and SMS templates.
- Use 2FA for admin and manager accounts.
