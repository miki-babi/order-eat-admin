<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Default Locked Message
    |--------------------------------------------------------------------------
    |
    | Message displayed when a feature is locked.
    |
    */
    'default_locked_message' => env('FEATURE_LOCK_DEFAULT_MESSAGE', 'This feature is locked. Contact us to unlock.'),

    /*
    |--------------------------------------------------------------------------
    | Optional Support Contact
    |--------------------------------------------------------------------------
    |
    | Optional contact line displayed on the locked page.
    |
    */
    'support_contact' => env('FEATURE_UNLOCK_CONTACT'),

    /*
    |--------------------------------------------------------------------------
    | Feature Groups
    |--------------------------------------------------------------------------
    |
    | Top-level categories used to organize granular feature toggles.
    |
    */
    'groups' => [
        'customer' => [
            'name' => 'Customer Experience',
            'description' => 'Public ordering and tracking touchpoints.',
        ],
        'staff_orders' => [
            'name' => 'Staff Order Operations',
            'description' => 'Operational order boards and transitions.',
        ],
        'staff_customers' => [
            'name' => 'Staff Customer Management',
            'description' => 'Customer list and outbound customer communication.',
        ],
        'staff_menu' => [
            'name' => 'Staff Menu Management',
            'description' => 'Menu catalog viewing and updates.',
        ],
        'staff_operations' => [
            'name' => 'Staff Operations Management',
            'description' => 'Branches, tables, and screen routing.',
        ],
        'staff_messaging' => [
            'name' => 'Staff SMS Messaging',
            'description' => 'SMS templates, settings, and audience tooling.',
        ],
        'staff_reporting' => [
            'name' => 'Staff Reporting',
            'description' => 'Operational insights and metrics.',
        ],
        'staff_access' => [
            'name' => 'Staff Access Control',
            'description' => 'Roles, permissions, and staff identity management.',
        ],
        'integrations' => [
            'name' => 'Integrations',
            'description' => 'Third-party integration endpoints and channels.',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Feature Catalog
    |--------------------------------------------------------------------------
    |
    | Granular lockable capabilities. `group` maps each toggle to a major area.
    |
    */
    'features' => [
        'customer_menu_browsing' => [
            'group' => 'customer',
            'name' => 'Menu Browsing',
            'description' => 'Customer homepage and menu browsing screen.',
            'enabled' => true,
            'help_url' => null,
        ],
        'customer_web_checkout' => [
            'group' => 'customer',
            'name' => 'Web Checkout',
            'description' => 'Submit customer orders from web menu flow.',
            'enabled' => true,
            'help_url' => null,
        ],
        'customer_cake_preordering' => [
            'group' => 'customer',
            'name' => 'Cake Preordering',
            'description' => 'Browse cake packages and place customized cake preorders.',
            'enabled' => true,
            'help_url' => null,
        ],
        'customer_catering_requests' => [
            'group' => 'customer',
            'name' => 'Catering Service Requests',
            'description' => 'Browse catering packages and submit event service requests.',
            'enabled' => true,
            'help_url' => null,
        ],
        'customer_qr_menu' => [
            'group' => 'customer',
            'name' => 'QR Menu',
            'description' => 'Table QR menu page rendering.',
            'enabled' => true,
            'help_url' => null,
        ],
        'customer_qr_checkout' => [
            'group' => 'customer',
            'name' => 'QR Checkout',
            'description' => 'Submit table orders from QR flow.',
            'enabled' => true,
            'help_url' => null,
        ],
        'customer_order_confirmation' => [
            'group' => 'customer',
            'name' => 'Order Confirmation Page',
            'description' => 'Confirmation page after order submission.',
            'enabled' => true,
            'help_url' => null,
        ],
        'customer_order_tracking' => [
            'group' => 'customer',
            'name' => 'Order Tracking Page',
            'description' => 'Live order tracking and status timeline page.',
            'enabled' => true,
            'help_url' => null,
        ],
        'customer_receipt_upload' => [
            'group' => 'customer',
            'name' => 'Receipt Upload',
            'description' => 'Upload or replace payment receipt from tracking page.',
            'enabled' => true,
            'help_url' => null,
        ],

        'staff_order_queue' => [
            'group' => 'staff_orders',
            'name' => 'Order Queue',
            'description' => 'Main staff order queue list.',
            'enabled' => true,
            'help_url' => null,
        ],
        'staff_order_updates' => [
            'group' => 'staff_orders',
            'name' => 'Order Status Updates',
            'description' => 'Patch/update order statuses from staff queue.',
            'enabled' => true,
            'help_url' => null,
        ],
        'staff_waiter_board' => [
            'group' => 'staff_orders',
            'name' => 'Waiter Board',
            'description' => 'Waiter board access and confirm/serve actions.',
            'enabled' => true,
            'help_url' => null,
        ],
        'staff_kitchen_board' => [
            'group' => 'staff_orders',
            'name' => 'Kitchen Board',
            'description' => 'Kitchen board visibility and preparation updates.',
            'enabled' => true,
            'help_url' => null,
        ],
        'staff_cashier_board' => [
            'group' => 'staff_orders',
            'name' => 'Cashier Board',
            'description' => 'Cashier board visibility.',
            'enabled' => true,
            'help_url' => null,
        ],
        'staff_cake_preorders' => [
            'group' => 'staff_orders',
            'name' => 'Cake Preorders',
            'description' => 'Manage cake packages and monitor cake preorder requests.',
            'enabled' => true,
            'help_url' => null,
        ],
        'staff_catering_requests' => [
            'group' => 'staff_orders',
            'name' => 'Catering Requests',
            'description' => 'Manage catering packages and handle catering service requests.',
            'enabled' => true,
            'help_url' => null,
        ],

        'staff_customers_list' => [
            'group' => 'staff_customers',
            'name' => 'Customers List',
            'description' => 'View customer list and history.',
            'enabled' => true,
            'help_url' => null,
        ],
        'staff_customers_sms' => [
            'group' => 'staff_customers',
            'name' => 'Customer SMS',
            'description' => 'Send customer SMS from staff portal.',
            'enabled' => true,
            'help_url' => null,
        ],

        'staff_menu_catalog' => [
            'group' => 'staff_menu',
            'name' => 'Menu Catalog View',
            'description' => 'View menu catalog management page.',
            'enabled' => true,
            'help_url' => null,
        ],
        'staff_menu_management' => [
            'group' => 'staff_menu',
            'name' => 'Menu Catalog Management',
            'description' => 'Create, update, and delete menu items.',
            'enabled' => true,
            'help_url' => null,
        ],

        'staff_pickup_locations' => [
            'group' => 'staff_operations',
            'name' => 'Pickup Locations',
            'description' => 'Manage branch pickup locations.',
            'enabled' => true,
            'help_url' => null,
        ],
        'staff_table_qr' => [
            'group' => 'staff_operations',
            'name' => 'Table QR Management',
            'description' => 'Manage dining tables and table sessions.',
            'enabled' => true,
            'help_url' => null,
        ],
        'staff_screen_routing' => [
            'group' => 'staff_operations',
            'name' => 'Screen Routing',
            'description' => 'Configure waiter/kitchen/cashier screen assignments.',
            'enabled' => true,
            'help_url' => null,
        ],

        'staff_sms_templates' => [
            'group' => 'staff_messaging',
            'name' => 'SMS Templates',
            'description' => 'View and edit SMS templates.',
            'enabled' => true,
            'help_url' => null,
        ],
        'staff_sms_notification_settings' => [
            'group' => 'staff_messaging',
            'name' => 'SMS Notification Settings',
            'description' => 'Toggle automatic SMS notification events.',
            'enabled' => true,
            'help_url' => null,
        ],
        'staff_sms_phone_lists' => [
            'group' => 'staff_messaging',
            'name' => 'SMS Phone Lists',
            'description' => 'Manage SMS whitelist/blacklist entries.',
            'enabled' => true,
            'help_url' => null,
        ],
        'staff_sms_contact_import' => [
            'group' => 'staff_messaging',
            'name' => 'SMS Contact Import',
            'description' => 'Import contacts into SMS tools.',
            'enabled' => true,
            'help_url' => null,
        ],
        'staff_sms_campaign_preview' => [
            'group' => 'staff_messaging',
            'name' => 'SMS Audience Preview',
            'description' => 'Preview SMS campaign audience targeting.',
            'enabled' => true,
            'help_url' => null,
        ],

        'staff_reporting_dashboard' => [
            'group' => 'staff_reporting',
            'name' => 'Reporting Dashboard',
            'description' => 'View staff reporting and analytics dashboard.',
            'enabled' => true,
            'help_url' => null,
        ],

        'staff_access_control_dashboard' => [
            'group' => 'staff_access',
            'name' => 'Access Control Dashboard',
            'description' => 'Open access control management page.',
            'enabled' => true,
            'help_url' => null,
        ],
        'staff_access_control_roles' => [
            'group' => 'staff_access',
            'name' => 'Role Management',
            'description' => 'Create and update role definitions.',
            'enabled' => true,
            'help_url' => null,
        ],
        'staff_access_control_permissions' => [
            'group' => 'staff_access',
            'name' => 'Permission Management',
            'description' => 'Create custom permissions.',
            'enabled' => true,
            'help_url' => null,
        ],
        'staff_access_control_users' => [
            'group' => 'staff_access',
            'name' => 'User Access Management',
            'description' => 'Create and update staff users with roles.',
            'enabled' => true,
            'help_url' => null,
        ],

        'telegram_bot_webhook' => [
            'group' => 'integrations',
            'name' => 'Telegram Bot Webhook',
            'description' => 'Telegram webhook intake and command handling.',
            'enabled' => true,
            'help_url' => null,
        ],
        'telegram_bot_miniapp_launch' => [
            'group' => 'integrations',
            'name' => 'Telegram Miniapp Launch Button',
            'description' => 'Inline button settings for launching the Telegram miniapp. Lock message = button label, help URL = custom miniapp URL.',
            'enabled' => true,
            'lock_message' => 'Order',
            'help_url' => null,
        ],
    ],
];
