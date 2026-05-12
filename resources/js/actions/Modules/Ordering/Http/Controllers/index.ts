import CakePreorderController from './CakePreorderController'
import CateringServiceController from './CateringServiceController'
import OrderController from './OrderController'
import QrMenuController from './QrMenuController'
import Staff from './Staff'

const Controllers = {
    OrderController: Object.assign(OrderController, OrderController),
    CakePreorderController: Object.assign(CakePreorderController, CakePreorderController),
    CateringServiceController: Object.assign(CateringServiceController, CateringServiceController),
    QrMenuController: Object.assign(QrMenuController, QrMenuController),
    Staff: Object.assign(Staff, Staff),
}

export default Controllers