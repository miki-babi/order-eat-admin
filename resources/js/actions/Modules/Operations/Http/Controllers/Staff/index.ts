import PickupLocationController from './PickupLocationController'
import TableQrController from './TableQrController'
import BranchScreenController from './BranchScreenController'

const Staff = {
    PickupLocationController: Object.assign(PickupLocationController, PickupLocationController),
    TableQrController: Object.assign(TableQrController, TableQrController),
    BranchScreenController: Object.assign(BranchScreenController, BranchScreenController),
}

export default Staff