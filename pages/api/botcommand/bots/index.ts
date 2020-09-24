import { NextApiRequest, NextApiResponse } from 'next'
import { Bot, UiPathBot, RoboCloudBot } from '../../../../server/models/Bot'
import { BotCommandContext, ensureLoggedIn } from '../../../../server/middleware/context'

export const handler = async (req: NextApiRequest, res: NextApiResponse, ctx: BotCommandContext) => {
  let bot_list = []
  for (let name in ctx.bots) {
    const bot = Bot.instantiateBot(name, ctx.bots[name], ctx.sources)
    const bot_info = await bot.info()
    bot_list.push({
      name,
      settings: bot.settings(),
      properties: bot_info,
    })
  }
  res.json(bot_list)
}

export default ensureLoggedIn(handler)
