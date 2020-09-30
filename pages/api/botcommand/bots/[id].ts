import { NextApiRequest, NextApiResponse } from 'next'
import { Bot } from "../../../../server/models/Bot"
import { BotCommandContext, ensureLoggedIn } from '../../../../server/middleware/context'

const handler = async (req: NextApiRequest, res: NextApiResponse, ctx: BotCommandContext) => {
  let bot: null | Bot = null
  for (const b of ctx.bots) {
    if (b.id === req.query.id) {
      bot = b
    }
  }
  if (bot) {
    const botJSON: any = bot.definition()
    botJSON.properties = await bot.properties()
    res.json(botJSON)
    return
  }
  res.statusCode = 404
  res.json({Error:'Bot Not Found'})
}

export default ensureLoggedIn(handler)
