import OrderController from './OrderController'
import QrMenuController from './QrMenuController'
import Staff from './Staff'

const Controllers = {
    OrderController: Object.assign(OrderController, OrderController),
    QrMenuController: Object.assign(QrMenuController, QrMenuController),
    Staff: Object.assign(Staff, Staff),
}

export default Controllers