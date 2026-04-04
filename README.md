# kds-rc: Advanced Cafe Operations & Marketing Suite

A modern, full-stack solution for high-volume cafes and restaurants, built with **Laravel 12**, **Inertia.js**, **React**, and **TypeScript**. This system transforms traditional order-taking into a data-driven guest experience and operational powerhouse.

---

## 🚀 Key Features & Business Impact

### 🤵 Waiter Board (Real-Time Service Orchestration)
The **Waiter Board** is the central nervous system of front-of-house operations. It provides a real-time, interactive queue of all active orders across different service points (Waiter, Kitchen, Cashier).
- **Benefit:** Eliminates "order shouting" and paper-trail delays. Staff can track preparation progress instantly, ensuring guests receive their orders exactly when they are ready.
- **Workflow:** Orders flow from QR-scanned tables or manual entry to the kitchen board, with progress synced back to the waiter board for seamless service.

### 🏷️ Customer Behavior Tagging
Empower your staff to remember the "little things" that make guests feel special. The system allows servers to tag customers with personalized behavioral markers (e.g., *VIP*, *Regular*, *Window Seeker*, *No Sugar*, *Loves Spicy*).
- **Benefit:** Creates a personalized service experience that drives loyalty. When a "Regular" sits down, the staff already knows their preference before they even speak.
- **Implementation:** Integrated directly into the Waiter Board order details, allowing for instant tagging during service.

### 🗺️ Virtual Room Tour (Digital Table & QR Mapping)
The system virtualizes your physical dining area into a structured digital map. Every table/location is assigned a unique QR code linked to a specific pickup point or service zone.
- **Benefit:** Seamlessly routes orders from any corner of the room directly to the correct kitchen station. Guests order from their table, and the system handles the spatial logic of where the food should come from.
- **Workflow:** Dynamic table management allows for quick reconfiguration of the dining space without technical overhead.

### 📊 Customer Insight (Predictive Service)
Go beyond basic history. **Customer Insight** provides staff with a real-time snapshot of guest preferences, including their most frequent items and total visit frequency.
- **Benefit:** Servers can cross-sell and up-sell based on data. "Would you like your usual Americano with that?" becomes a standard, data-backed greeting.
- **Visibility:** Insights are displayed alongside order details on the Waiter Board, providing actionable data at the exact moment of service.

### 🧠 Menu Intelligence
A dynamic, high-performance menu system that adapts to your inventory and customer trends. Features include real-time "Featured" item carousels and intelligent categorization.
- **Benefit:** Boosts sales of high-margin items by placing them in the "Popular" carousel. Ensures the menu is always accurate, reducing "item out of stock" friction.
- **Implementation:** High-fidelity QR menu for customers with smooth transitions and persistent cart logic.

### 🧙 Promo Text Generation Wizard
A sophisticated marketing automation tool that allows you to reach your customers where they are (SMS and Telegram). The **Promo Wizard** lets you filter your audience based on order history, recency, and total spend.
- **Benefit:** High-ROI marketing. Instead of "blasting" everyone, you can target customers who haven't visited in 30 days with a specific "We miss you" promo code.
- **Workflow:** Step-by-step wizard for choosing audience, composing personalized messages, and previewing the campaign before execution.

---

## 🛠️ Technical Architecture

This project is built using a **Modular Architecture**, ensuring high scalability and maintainability.

- **Backend:** Laravel 12 (PHP 8.4+)
- **Frontend:** React 19 + TypeScript
- **Communication:** Inertia.js (Modern Monolith approach)
- **Styling:** Vanilla CSS / Tailwind (System-wide design tokens)
- **Modules:**
  - `Ordering`: Comprehensive order lifecycle management.
  - `Customers`: Advanced profiling and insight tracking.
  - `Operations`: Multi-branch screen routing and table management.
  - `Messaging`: SMS and Telegram integration for marketing.

---

## 📦 Getting Started

### Prerequisites
- PHP >= 8.4
- Node.js >= 20.x
- Composer
- MySQL/PostgreSQL

### Installation
1.  **Clone and Install:**
    ```bash
    git clone [repository-url]
    cd kds-rc
    composer install
    npm install
    ```
2.  **Environment Setup:**
    ```bash
    cp .env.example .env
    php artisan key:generate
    ```
3.  **Database & Assets:**
    ```bash
    php artisan migrate --seed
    npm run dev
    ```

---

## 🛡️ Operational Strategy

The system prioritizes **Data Integrity** over simple deletion. Menu items and locations are deactivated rather than deleted to ensure that historical order logs remain accurate and actionable for reports.

---

## 🎨 Design Principles

The UI follows the **City Lucky Lite** premium design standard:
- **High Contrast:** AAA accessibility standards.
- **Multiples of 4:** Consistent spacing and alignment.
- **Non-Distractive:** Minimalist aesthetics to keep staff focused on service.
