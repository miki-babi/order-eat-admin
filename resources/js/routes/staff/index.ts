import accessControl from './access-control'
import customers from './customers'
import menuItems from './menu-items'
import smsTemplates from './sms-templates'
import smsNotificationSettings from './sms-notification-settings'
import smsPhoneLists from './sms-phone-lists'
import smsContacts from './sms-contacts'
import smsCampaigns from './sms-campaigns'
import pickupLocations from './pickup-locations'
import tableQr from './table-qr'
import tableSessions from './table-sessions'
import screens from './screens'
import orders from './orders'
import waiter from './waiter'
import kitchen from './kitchen'
import cashier from './cashier'
import cakePreorders from './cake-preorders'
import cakePackages from './cake-packages'
import cateringRequests from './catering-requests'
import cateringPackages from './catering-packages'
import businessSettings from './business-settings'
import reports from './reports'

const staff = {
    accessControl: Object.assign(accessControl, accessControl),
    customers: Object.assign(customers, customers),
    menuItems: Object.assign(menuItems, menuItems),
    smsTemplates: Object.assign(smsTemplates, smsTemplates),
    smsNotificationSettings: Object.assign(smsNotificationSettings, smsNotificationSettings),
    smsPhoneLists: Object.assign(smsPhoneLists, smsPhoneLists),
    smsContacts: Object.assign(smsContacts, smsContacts),
    smsCampaigns: Object.assign(smsCampaigns, smsCampaigns),
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