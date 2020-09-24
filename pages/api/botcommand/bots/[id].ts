import { NextApiRequest, NextApiResponse } from 'next'
import { Bot } from '../../../../server/models/Bot'
import { BotCommandContext, ensureLoggedIn } from '../../../../server/middleware/context'

const handler = async (req: NextApiRequest, res: NextApiResponse, ctx: BotCommandContext) => {
  let bot: null | Bot = null
  for (let id in ctx.bots) {
    if (id === req.query.id) {
      bot = Bot.instantiateBot(id, ctx.bots[id], ctx.sources)
    }
  }
  if (bot) {
    const botInfo: any = bot.definition()
    botInfo.properties = await bot.properties()
    botInfo.id = await bot.botId
    res.json(botInfo)
    return
  }
  res.statusCode = 404
  res.json({Error:'Bot Not Found'})
}

export default ensureLoggedIn(handler)
