import { NextApiRequest, NextApiResponse } from 'next'
import { BotCommanderContext, ensureLoggedIn } from '../../../server/middleware/context'

export const handler = (req: NextApiRequest, res: NextApiResponse,
  context: BotCommanderContext) => {
  const token = context.token
  const bots = context.bots.map(bot => ({ id: bot.id }))
  console.log(bots)
  res.statusCode = 200
  res.json({ token, bots: bots })
}

export default ensureLoggedIn(handler)
