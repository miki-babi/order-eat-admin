import FeatureLockedController from './FeatureLockedController'
import TelegramSettingController from './TelegramSettingController'
import Settings from './Settings'

const Controllers = {
    FeatureLockedController: Object.assign(FeatureLockedController, FeatureLockedController),
    TelegramSettingController: Object.assign(TelegramSettingController, TelegramSettingController),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers