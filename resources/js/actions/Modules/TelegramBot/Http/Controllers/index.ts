import WebhookController from './WebhookController'
import MiniAppIdentityController from './MiniAppIdentityController'
import MiniAppOrdersController from './MiniAppOrdersController'

const Controllers = {
    WebhookController: Object.assign(WebhookController, WebhookController),
    MiniAppIdentityController: Object.assign(MiniAppIdentityController, MiniAppIdentityController),
    MiniAppOrdersController: Object.assign(MiniAppOrdersController, MiniAppOrdersController),
}

export default Controllers