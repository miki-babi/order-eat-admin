import BranchScreenController from './BranchScreenController'
import FeedbackController from './FeedbackController'
import PickupLocationController from './PickupLocationController'
import TableQrController from './TableQrController'

const Staff = {
    FeedbackController: Object.assign(FeedbackController, FeedbackController),
    PickupLocationController: Object.assign(PickupLocationController, PickupLocationController),
    TableQrController: Object.assign(TableQrController, TableQrController),
    BranchScreenController: Object.assign(BranchScreenController, BranchScreenController),
}

export default Staff