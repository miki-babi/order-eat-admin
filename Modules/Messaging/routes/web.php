<?php

use Illuminate\Support\Facades\Route;
use Modules\Messaging\Http\Controllers\Staff\SmsTemplateController;

Route::middleware(['auth', 'verified', 'staff'])
    ->prefix('staff')
    ->name('staff.')
    ->group(function (): void {
        Route::get('sms-templates', [SmsTemplateController::class, 'index'])
            ->middleware(['permission:sms_templates.manage', 'feature:staff_sms_templates'])
            ->name('sms-templates.index');
        Route::put('sms-templates/{smsTemplate}', [SmsTemplateController::class, 'update'])
            ->middleware(['permission:sms_templates.manage', 'feature:staff_sms_templates'])
            ->name('sms-templates.update');
        Route::put('sms-notification-settings/{smsNotificationSetting}', [SmsTemplateController::class, 'updateNotificationSetting'])
            ->middleware(['permission:sms_templates.manage', 'feature:staff_sms_notification_settings'])
            ->name('sms-notification-settings.update');
        Route::post('sms-phone-lists', [SmsTemplateController::class, 'storePhoneList'])
            ->middleware(['permission:sms_templates.manage', 'feature:staff_sms_phone_lists'])
            ->name('sms-phone-lists.store');
        Route::delete('sms-phone-lists/{smsPhoneList}', [SmsTemplateController::class, 'destroyPhoneList'])
            ->middleware(['permission:sms_templates.manage', 'feature:staff_sms_phone_lists'])
            ->name('sms-phone-lists.destroy');
        Route::post('sms-contacts/import', [SmsTemplateController::class, 'importContacts'])
            ->middleware(['permission:sms_templates.manage', 'feature:staff_sms_contact_import'])
            ->name('sms-contacts.import');
        Route::get('sms-campaigns/preview-audience', [SmsTemplateController::class, 'previewAudience'])
            ->middleware(['permission:sms_templates.manage', 'feature:staff_sms_campaign_preview'])
            ->name('sms-campaigns.preview-audience');
        Route::post('sms-campaigns/send', [SmsTemplateController::class, 'sendCampaign'])
            ->middleware(['permission:sms_templates.manage', 'feature:staff_sms_templates'])
            ->name('sms-campaigns.send');
    });
