import accessControl from './access-control'
import businessSettings from './business-settings'
import cakePackages from './cake-packages'
import cakePreorders from './cake-preorders'
import cashier from './cashier'
import cateringPackages from './catering-packages'
import cateringRequests from './catering-requests'
import customers from './customers'
import feedbacks from './feedbacks'
import kitchen from './kitchen'
import menuItems from './menu-items'
import orders from './orders'
import pickupLocations from './pickup-locations'
import reports from './reports'
import screens from './screens'
import smsCampaigns from './sms-campaigns'
import smsContacts from './sms-contacts'
import smsNotificationSettings from './sms-notification-settings'
import smsPhoneLists from './sms-phone-lists'
import smsTemplates from './sms-templates'
import tableQr from './table-qr'
import tableSessions from './table-sessions'
import waiter from './waiter'

const staff = {
    accessControl: Object.assign(accessControl, accessControl),
    customers: Object.assign(customers, customers),
    menuItems: Object.assign(menuItems, menuItems),
    smsTemplates: Object.assign(smsTemplates, smsTemplates),
    smsNotificationSettings: Object.assign(smsNotificationSettings, smsNotificationSettings),
    smsPhoneLists: Object.assign(smsPhoneLists, smsPhoneLists),
    smsContacts: Object.assign(smsContacts, smsContacts),
    smsCampaigns: Object.assign(smsCampaigns, smsCampaigns),
    feedbacks: Object.assign(feedbacks, feedbacks),
    pickupLocations: Object.assign(pickupLocations, pickupLocations),
    tableQr: Object.assign(tableQr, tableQr),
    tableSessions: Object.assign(tableSessions, tableSessions),
    screens: Object.assign(screens, screens),
    orders: Object.assign(orders, orders),
    waiter: Object.assign(waiter, waiter),
    kitchen: Object.assign(kitchen, kitchen),
    cashier: Object.assign(cashier, cashier),
    cakePreorders: Object.assign(cakePreorders, cakePreorders),
    cakePackages: Object.assign(cakePackages, cakePackages),
    cateringRequests: Object.assign(cateringRequests, cateringRequests),
    cateringPackages: Object.assign(cateringPackages, cateringPackages),
    businessSettings: Object.assign(businessSettings, businessSettings),
    reports: Object.assign(reports, reports),
}

export default staff