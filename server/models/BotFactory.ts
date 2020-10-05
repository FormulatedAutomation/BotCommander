import { BotConfig } from '../../lib/config'

import { RoboCloudBot } from './RoboCloudBot'
import { UiPathBot } from './UiPathBot'

export const createFromConfig = (bot: BotConfig, sources: object): UiPathBot | RoboCloudBot => {
  if (bot.type === 'uipath') {
    return new UiPathBot(bot, sources[bot.source])
  }
  if (bot.type === 'robocloud') { return new RoboCloudBot(bot) }
}
