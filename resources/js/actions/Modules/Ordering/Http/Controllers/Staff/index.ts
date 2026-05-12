import BusinessSettingsController from './BusinessSettingsController'
import CakePreorderController from './CakePreorderController'
import CashierBoardController from './CashierBoardController'
import CateringRequestController from './CateringRequestController'
import KitchenBoardController from './KitchenBoardController'
import OrderController from './OrderController'
import WaiterBoardController from './WaiterBoardController'

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