<?php

return [
    /*
    |--------------------------------------------------------------------------
    | SMS Templates
    |--------------------------------------------------------------------------
    |
    | Reusable SMS templates. Placeholders use {token} syntax and are resolved
    | via SmsTemplateService.
    |
    */
    'templates' => [
        'order_created' => [
            'label' => 'Order Created',
            'body' => 'Hi {name}, your order #{orderid} is received at {branch}. Items: {itemlist}. Track: {trackinglink}',
        ],
        'receipt_approved' => [
            'label' => 'Receipt Approved',
            'body' => 'Hi {name}, your receipt for order #{orderid} has been approved. We are preparing your order at {branch}.',
        ],
        'receipt_disapproved' => [
            'label' => 'Receipt Disapproved',
            'body' => 'Hi {name}, receipt for order #{orderid} was disapproved. Reason: {disapprovalreason}. Re-upload: {trackinglink}',
        ],
        'order_ready' => [
            'label' => 'Order Ready',
            'body' => 'Hi {name}, your order #{orderid} is ready for pickup at {branch}.',
        ],
        'promo_default' => [
            'label' => 'Promo Message',
            'body' => 'Hi {name}, we have a special offer for you at {branch}.',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Automatic Notification Events
    |--------------------------------------------------------------------------
    |
    | Controls which automatic SMS events are active by default. These can be
    | overridden in the SMS manager page and stored in database settings.
    |
    */
    'notification_events' => [
        'order_created' => [
            'label' => 'Order Created',
            'description' => 'Send SMS after customer places a new order.',
            'enabled' => true,
        ],
        'receipt_approved' => [
            'label' => 'Receipt Approved',
            'description' => 'Send SMS when staff approves a receipt.',
            'enabled' => false,
        ],
        'receipt_disapproved' => [
            'label' => 'Receipt Disapproved',
            'description' => 'Send SMS when staff disapproves a receipt.',
            'enabled' => true,
        ],
        'order_ready' => [
            'label' => 'Order Ready',
            'description' => 'Send SMS when order status changes to ready (for opted-in customers).',
            'enabled' => true,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Available Placeholders
    |--------------------------------------------------------------------------
    */
    'placeholders' => [
        'name' => 'Customer name',
        'phone' => 'Customer phone',
        'orderid' => 'Order ID',
        'orderstatus' => 'Order status',
        'receiptstatus' => 'Receipt status',
        'branch' => 'Pickup branch name',
        'branchaddress' => 'Pickup branch address',
        'pickupdate' => 'Pickup date',
        'trackinglink' => 'Tracking URL',
        'total' => 'Order total amount',
        'itemid' => 'First item menu ID',
        'itemids' => 'Comma-separated menu IDs',
        'itemlist' => 'Order item summary',
        'itemcount' => 'Total quantity of items',
        'recent_item' => 'Most recent purchased item',
        'recent_branch' => 'Most recent pickup branch',
        'freq_item' => 'Most frequently purchased item',
        'freq_branch' => 'Most frequently used pickup branch',
        'disapprovalreason' => 'Receipt disapproval reason',
    ],
];
