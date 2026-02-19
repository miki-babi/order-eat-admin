Here’s a **full project outline** for your cafe ordering system (web first, Telegram later), including **UI/UX flow** and **DB schema**. I’ve kept it structured so you can start implementing right away.

---

# **Project Outline: Cafe Ordering System**

## **1. User Roles**

| Role                          | Permissions / Features                                                                                                                                                |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Customer (Web / Telegram)** | Browse menu, select items, choose pickup date & location, upload receipt, track order                                                                                 |
| **Staff**                     | View/manage orders, approve/disapprove receipts, update order status, manage menu items, manage pickup locations, manage customer list (send SMS/promo), view reports |
| **Manager**                   | Same as staff + access detailed analytics/reports                                                                                                                     |

---

## **2. Customer Side UI/UX Flow (Web)**

1. **Landing/Menu Page:** Browse items → add to cart.
2. **Cart/Order Review:** Edit quantities, remove items, proceed to checkout.
3. **Pickup & Details:** Select date, location, enter phone number.
4. **Payment Verification / Receipt Upload:** Upload screenshot or skip (link via SMS sent).
5. **Order Confirmation:** Order summary + SMS link for tracking & receipt upload.
6. **Order Tracking (via link):** Track order, upload receipt if pending.

**UX Notes:**

* Mobile-first design.
* Clear status indicators.
* Minimal steps (≤5) to complete order.

---

## **3. Staff Side UI/UX Flow**

1. **Orders Page:**

   * Approve/disapprove receipts
   * Update order status: Pending → Preparing → Ready → Completed
   * Filters: date, location, status, receipt status
2. **Customer List Page:**

   * View customer details, order history
   * Send SMS individually or in bulk
3. **Pickup Locations Page:**

   * Add/Edit/Deactivate locations
4. **Menu Management Page:**

   * Add/Edit/Deactivate items, upload images, set availability
5. **Reports/Analytics Page:**

   * Sales by day/week/month
   * Popular items, pending receipts
   * Pickup location performance
   * Customer engagement

**UX Notes:**

* Color-coded statuses
* Realtime updates for orders
* Modals for actions like approve/disapprove or send SMS
* Sidebar navigation with Orders, Customers, Locations, Menu, Reports

---

## **4. Database Schema**

### **4.1 Customers**

```sql
CREATE TABLE customers (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    telegram_id BIGINT NULL,
    telegram_username VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

### **4.2 Orders**

```sql
CREATE TABLE orders (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    customer_id BIGINT NOT NULL REFERENCES customers(id),
    pickup_date DATE NOT NULL,
    pickup_location_id BIGINT NOT NULL REFERENCES pickup_locations(id),
    receipt_url VARCHAR(255) NULL,
    receipt_status ENUM('pending','approved','disapproved') DEFAULT 'pending',
    order_status ENUM('pending','preparing','ready','completed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

### **4.3 Order Items**

```sql
CREATE TABLE order_items (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_id BIGINT NOT NULL REFERENCES orders(id),
    menu_item_id BIGINT NOT NULL REFERENCES menu_items(id),
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

### **4.4 Menu Items**

```sql
CREATE TABLE menu_items (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(50) NULL,
    image_url VARCHAR(255) NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

### **4.5 Pickup Locations**

```sql
CREATE TABLE pickup_locations (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

### **4.6 SMS / Promo Logs (Optional)**

```sql
CREATE TABLE sms_logs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    customer_id BIGINT NULL REFERENCES customers(id),
    message TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## **5. Relationships**

* `customers` → `orders` = 1:N
* `orders` → `order_items` = 1:N
* `pickup_locations` → `orders` = 1:N
* `menu_items` → `order_items` = 1:N

---

## **6. Additional Notes**

* Telegram fields are nullable for now (used when Telegram mini app is added later).
* SMS system integrated with order placement and receipt verification for web customers 
* sms config 
curl -X POST https://smsethiopia.et/api/sms/send \
  -H "KEY: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"msisdn": "251911639555", "text": "Hello World"}'.
* Staff dashboard handles approvals/disapprovals and status updates.
* Reports and analytics can be generated via queries joining orders, order_items, menu_items, and pickup_locations.

---


---

Here’s a detailed UI/UX flow for the web customer side 
## **1. Landing / Menu Page**

**Purpose:** Let customers browse and select items.

**UI Elements:**

* **Menu Grid / List:** Items with name, description, price, image.
* **Category Filters:** Drinks, Pastries, Specials, etc.
* **Search Bar:** Search by name or category.
* **Add to Cart Button:** Each item has a clear “Add to Cart.”

**Interactions / Flow:**

1. Customer scrolls / filters → selects item → clicks Add to Cart.
2. Mini-cart updates live with items, quantity, and total price.

**UX Notes:**

* Show item image and short description for clarity.
* Indicate stock/unavailable items (greyed out).

---

## **2. Cart / Order Review Page**

**Purpose:** Review selected items before placing the order.

**UI Elements:**

* Item list: Name, quantity, price, total per item.
* Cart total at the bottom.
* Edit quantity / remove items buttons.
* Proceed to Checkout button.

**Interactions / Flow:**

1. Customer adjusts quantities or removes items.
2. Click **Proceed to Checkout** → moves to pickup & payment page.

**UX Notes:**

* Keep cart summary visible throughout navigation.
* Show estimated preparation time per item if desired.

---

## **3. Pickup & Details Page**

**Purpose:** Collect pickup info and phone number.

**UI Elements:**

* **Pickup Date Selector:** Today, Tomorrow, Custom Date (calendar input).
* **Pickup Location Selector:** Dropdown of active locations.
* **Phone Number Input:** Required for SMS notification.

**Interactions / Flow:**

1. Customer selects date and location.
2. Enters phone number.
3. Click **Next / Upload Receipt** → moves to payment verification.

**UX Notes:**

* Validate phone number format.
* Disable past dates in calendar.
* Highlight default pickup location if the customer has previous orders.

---

## **4. Payment Verification / Receipt Upload Page**

**Purpose:** Upload proof of payment for the order.

**UI Elements:**

* Upload field for screenshot/image of receipt.
* Instructions: “Upload payment screenshot to verify your order.”
* Option to skip (SMS link will allow upload later if needed).
* Submit Order button.

**Interactions / Flow:**

1. Customer uploads receipt → preview displayed.
2. Click **Submit Order** → triggers SMS notification with link for tracking and receipt upload if skipped.

**UX Notes:**

* Show accepted file types and max size.
* If skipped, clearly inform the customer that they can upload later via the SMS link.

---

## **5. Order Confirmation Page**

**Purpose:** Confirm the order and inform about tracking.

**UI Elements:**

* Summary of order: Items, pickup date, location, total price.
* Status message: “Your order has been placed successfully.”
* **Web customers:** SMS link sent to track order & upload receipt if needed.
* **Telegram customers:** Inline confirmation (for future implementation).

**Interactions / Flow:**

1. Customer sees confirmation message.
2. Optionally, provide **Print / Save Order** button.
3. SMS link allows receipt upload or tracking if skipped initially.

**UX Notes:**

* Keep the design clean with order summary clearly visible.
* Include customer support info in case of issues.

---

## **6. Optional: Order Tracking Page (via SMS link)**

**Purpose:** Track status of order and upload receipt if missing.

**UI Elements:**

* Order status timeline: Pending → Preparing → Ready → Completed
* Upload receipt button (if missing or disapproved).
* Customer contact info displayed.

**Interactions / Flow:**

1. Customer clicks SMS link → sees order status.
2. Can upload receipt if not already done.
3. Status updates in real-time or with page refresh.

**UX Notes:**

* Show clear color-coded statuses (yellow/pending, blue/preparing, green/ready, grey/completed).
* Keep interface minimal for mobile users.

---

### **General UX Guidelines**

* Mobile-first design: Web ordering will often happen on phones.
* Minimal clicks: Customers should complete order in **4–5 steps max**.
* Clear instructions for receipt upload and pickup info.
* Visual feedback for all actions (upload success, form validation).
* Consistent color-coding for statuses across dashboard and customer pages.

---

Here’s a **detailed UI/UX flow** for the staff dashboard based on your updated structure. I’ll break it down page by page with interactions and logic:

---

## **1. Orders Page (Main Dashboard)**

**Purpose:** Central hub for managing incoming orders.

**UI Elements:**

* **Orders Table / List:** Columns:

  * Order ID
  * Customer Name & Phone
  * Items Ordered (expandable)
  * Pickup Date & Location
  * Payment Receipt Status (uploaded / pending)
  * Order Status (Pending → Preparing → Ready → Completed)
  * Actions (Approve / Disapprove / Update Status)

* **Filters / Search:**

  * By date, status, pickup location, receipt status.

**Interactions / Flow:**

1. New order appears → highlighted or marked “New.”
2. Click order → expand details: items, receipt screenshot, notes.
3. **Receipt Verification:**

   * Approve → order status changes to Preparing.
   * Disapprove → SMS sent automatically to customer to re-upload receipt.
4. Update order status manually if needed (Preparing → Ready → Completed).

**UX Notes:**

* Highlight pending receipts clearly.
* Use color codes for status: Pending (yellow), Preparing (blue), Ready (green), Completed (grey).
* Ability to bulk approve receipts for efficiency.

---

## **2. Customer List Page**

**Purpose:** Manage customers and send communications.

**UI Elements:**

* **Customer Table:** Name, Phone, Number of Orders, Last Order Date.

* **Search / Filters:** By name, phone, order count, last order date.

* **Actions per Customer:**

  * Send SMS (manual)
  * View order history

* **Bulk Actions:**

  * Send promotional SMS to all or filtered customers

**Interactions / Flow:**

1. Staff clicks a customer → opens modal to send SMS.
2. For bulk SMS → select customers or all → write message → send → show success/error notification.

**UX Notes:**

* Keep SMS history per customer accessible.
* Show character limit warning for SMS.
* Confirm bulk action before sending.

---

## **3. Pickup Locations Page**

**Purpose:** Add or manage all pickup locations available for orders.

**UI Elements:**

* **Locations Table:** Name, Address/Details, Active Status.
* **Actions:** Add / Edit / Deactivate / Delete
* **Search / Filter:** By name or status

**Interactions / Flow:**

1. Add location → fill name, address, save → location becomes selectable in orders.
2. Edit → change name, address, or status.
3. Deactivate → remove from customer selection but keep history for past orders.

**UX Notes:**

* Mark active/inactive locations clearly.
* Confirm delete to prevent accidental removal.

---

## **4. Menu Management Page**

**Purpose:** Manage all menu items that customers can order.

**UI Elements:**

* **Items Table:** Name, Description, Price, Category, Availability, Image
* **Actions:** Add / Edit / Deactivate / Delete
* **Filters / Search:** By name, category, availability

**Interactions / Flow:**

1. Add item → fill details (name, description, price, category, image) → save → visible to customers.
2. Edit item → update details → save changes reflected immediately.
3. Deactivate → hide from menu but retain past orders.

**UX Notes:**

* Use image thumbnails for easier recognition.
* Allow drag-and-drop reordering for front-end menu display.
* Show availability toggle prominently.

---

## **5. Reports / Analytics Page**

**Purpose:** Insights for managers and staff to monitor performance.

**UI Elements:**

* **Charts / Tables:**

  * Daily / Weekly / Monthly sales
  * Popular items
  * Pending receipts
  * Pickup locations performance
  * Customer engagement (SMS clicks or promo responses)

* **Filters:** Date range, location, item category

**Interactions / Flow:**

1. Select filters → update charts/tables dynamically.
2. Click on items/locations in charts → drill down into order lists.

**UX Notes:**

* Provide export option (CSV / PDF) for reporting.
* Keep dashboard responsive for tablets if staff use it on mobile devices.

---

### **General Dashboard UX**

* Left-hand navigation sidebar with links: Orders, Customers, Pickup Locations, Menu, Reports.
* Top bar: Notifications, User Profile, Settings.
* Consistent color coding for statuses (orders, receipts).
* Modals for quick actions (approve/disapprove, add/edit items, send SMS).
* Real-time updates: new orders should appear without page refresh.

---

