import order from './order'
import telegram from './telegram'

const api = {
    order: Object.assign(order, order),
    telegram: Object.assign(telegram, telegram),
}

export default api