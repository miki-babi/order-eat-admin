import OrderController from './OrderController'
import WaiterBoardController from './WaiterBoardController'
import KitchenBoardController from './KitchenBoardController'
import CashierBoardController from './CashierBoardController'

const Staff = {
    OrderController: Object.assign(OrderController, OrderController),
    WaiterBoardController: Object.assign(WaiterBoardController, WaiterBoardController),
    KitchenBoardController: Object.assign(KitchenBoardController, KitchenBoardController),
    CashierBoardController: Object.assign(CashierBoardController, CashierBoardController),
}

export default Staff