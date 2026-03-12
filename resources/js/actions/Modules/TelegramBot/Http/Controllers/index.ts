import MiniAppIdentityController from './MiniAppIdentityController'
import MiniAppOrdersController from './MiniAppOrdersController'
import WebhookController from './WebhookController'

const Controllers = {
    WebhookController: Object.assign(WebhookController, WebhookController),
    MiniAppIdentityController: Object.assign(MiniAppIdentityController, MiniAppIdentityController),
    MiniAppOrdersController: Object.assign(MiniAppOrdersController, MiniAppOrdersController),
}

export default Controllers