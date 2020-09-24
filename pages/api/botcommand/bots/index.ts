import { NextApiRequest, NextApiResponse } from 'next'
import { Bot, UiPathBot, RoboCloudBot } from '../../../../server/models/Bot'
import { BotCommandContext, ensureLoggedIn } from '../../../../server/middleware/context'

export const handler = async (req: NextApiRequest, res: NextApiResponse, ctx: BotCommandContext) => {
  let bot_list = []
  for (let botId in ctx.bots) {
    const bot = Bot.instantiateBot(botId, ctx.bots[botId], ctx.sources)
    const botInfo = await bot.definition()
    bot_list.push(botInfo)
  }
  res.json(bot_list)
}

export default ensureLoggedIn(handler)
