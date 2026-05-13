import OrderController from './OrderController'
import WaiterBoardController from './WaiterBoardController'
import KitchenBoardController from './KitchenBoardController'
import CashierBoardController from './CashierBoardController'
import CakePreorderController from './CakePreorderController'
import CateringRequestController from './CateringRequestController'
import BusinessSettingsController from './BusinessSettingsController'

const Staff = {
    OrderController: Object.assign(OrderController, OrderController),
    WaiterBoardController: Object.assign(WaiterBoardController, WaiterBoardController),
    KitchenBoardController: Object.assign(KitchenBoardController, KitchenBoardController),
    CashierBoardController: Object.assign(CashierBoardController, CashierBoardController),
    CakePreorderController: Object.assign(CakePreorderController, CakePreorderController),
    CateringRequestController: Object.assign(CateringRequestController, CateringRequestController),
    BusinessSettingsController: Object.assign(BusinessSettingsController, BusinessSettingsController),
}

export default Staff