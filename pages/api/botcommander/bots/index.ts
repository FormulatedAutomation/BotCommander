import { NextApiRequest, NextApiResponse } from 'next'
import { Bot } from "../../../../server/models/Bot"
import { RoboCloudBot } from "../../../../server/models/RoboCloudBot"
import { UiPathBot } from "../../../../server/models/UiPathBot"
import { BotCommanderContext, ensureLoggedIn } from '../../../../server/middleware/context'
import { ACL } from '../../../../lib/acl'

export const handler = async (req: NextApiRequest, res: NextApiResponse, ctx: BotCommanderContext) => {
  res.json(ctx.bots.map((bot) => bot.definition()))
}

export default ensureLoggedIn(handler)
