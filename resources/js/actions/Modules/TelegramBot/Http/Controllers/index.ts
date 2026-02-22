import WebhookController from './WebhookController'
import MiniAppIdentityController from './MiniAppIdentityController'

const Controllers = {
    WebhookController: Object.assign(WebhookController, WebhookController),
    MiniAppIdentityController: Object.assign(MiniAppIdentityController, MiniAppIdentityController),
}

export default Controllers