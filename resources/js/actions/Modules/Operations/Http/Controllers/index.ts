import PublicFeedbackController from './PublicFeedbackController'
import Staff from './Staff'

const Controllers = {
    PublicFeedbackController: Object.assign(PublicFeedbackController, PublicFeedbackController),
    Staff: Object.assign(Staff, Staff),
}

export default Controllers