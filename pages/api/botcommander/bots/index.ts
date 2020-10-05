import { NextApiRequest, NextApiResponse } from 'next'
import { BotCommanderContext, ensureLoggedIn } from '../../../../server/middleware/context'

export const handler = async (req: NextApiRequest, res: NextApiResponse, ctx: BotCommanderContext) => {
  res.json(ctx.bots.map((bot) => bot.definition()))
}

export default ensureLoggedIn(handler)
