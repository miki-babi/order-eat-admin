# Feature Modules

This project now uses `nwidart/laravel-modules` with feature-focused modules under `Modules/`.

## Modules

- `Ordering`
  - Public order and QR menu flow
  - Staff order board, waiter board, kitchen board, cashier board
- `Operations`
  - Pickup locations, table QR/session verification, branch screens
- `Menu`
  - Menu item management
- `Customers`
  - Customer listing and SMS send flow
- `Messaging`
  - SMS templates, notification settings, phone lists, contact import
- `AccessControl`
  - Roles, permissions, and staff user management
- `Reporting`
  - Staff reports dashboard
- `TelegramBot`
  - Telegram webhook endpoint and bot command handling
- `SystemAdmin`
  - Hidden system admin dashboard for feature locks, logs, and activity view

## Notes

- Module activation state is tracked in `modules_statuses.json`.
- Routes are split per module in `Modules/*/routes/web.php`.
- Core shared models/services remain in `app/` and are used by modules.
- After pulling these changes, run `composer dump-autoload` in your PHP 8.4+ environment.
