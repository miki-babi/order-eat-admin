import AccessControl from './AccessControl'
import Customers from './Customers'
import Menu from './Menu'
import Messaging from './Messaging'
import Operations from './Operations'
import Ordering from './Ordering'
import Reporting from './Reporting'
import SystemAdmin from './SystemAdmin'
import TelegramBot from './TelegramBot'

const Modules = {
    AccessControl: Object.assign(AccessControl, AccessControl),
    Customers: Object.assign(Customers, Customers),
    Menu: Object.assign(Menu, Menu),
    Messaging: Object.assign(Messaging, Messaging),
    Operations: Object.assign(Operations, Operations),
    Ordering: Object.assign(Ordering, Ordering),
    Reporting: Object.assign(Reporting, Reporting),
    SystemAdmin: Object.assign(SystemAdmin, SystemAdmin),
    TelegramBot: Object.assign(TelegramBot, TelegramBot),
}

export default Modules