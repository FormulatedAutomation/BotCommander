import { NextApiRequest, NextApiResponse } from 'next'
import { Bot } from '../../../../server/models/Bot'
import { BotCommanderContext, ensureLoggedIn } from '../../../../server/middleware/context'

const handler = async (req: NextApiRequest, res: NextApiResponse, ctx: BotCommanderContext) => {
  let bot: null | Bot = null
  for (const b of ctx.bots) {
    if (b.id === req.query.id) {
      bot = b
    }
  }
  if (bot) {
    res.json(await bot.toJSON())
    return
  }
  res.statusCode = 404
  res.json({ Error: 'Bot Not Found' })
}

export default ensureLoggedIn(handler)
