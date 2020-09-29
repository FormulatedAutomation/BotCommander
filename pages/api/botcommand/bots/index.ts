import { NextApiRequest, NextApiResponse } from 'next'
import { Bot, UiPathBot, RoboCloudBot } from '../../../../server/models/Bot'
import { BotCommandContext, ensureLoggedIn } from '../../../../server/middleware/context'
import { ACL } from '../../../../lib/acl'

export const handler = async (req: NextApiRequest, res: NextApiResponse, ctx: BotCommandContext) => {
  res.json(ctx.bots.map((bot) => bot.definition()))
}

export default ensureLoggedIn(handler)
