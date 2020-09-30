import { NextApiRequest, NextApiResponse } from 'next'
import { RoboCloudBot } from "../../../../../server/models/RoboCloudBot"
import { UiPathBot } from "../../../../../server/models/UiPathBot"
import { BotCommandContext, ensureLoggedIn } from '../../../../../server/middleware/context'
import { BotConfig } from '../../../../../lib/config'

const handler = async (req: NextApiRequest, res: NextApiResponse, context: BotCommandContext) => {
  const { bots } = context
  if (req.method === 'POST') {
    let bot = null
    for (const b of bots) {
      if (b.id === req.query.id) {
        bot = b
      }
    }
    const result = await bot.start(JSON.parse(req.body))
    res.statusCode = 200
    res.json(result)
  } else {
      res.statusCode = 404
      res.json({ Error: "Not Found" })
      return
  }
}

export default ensureLoggedIn(handler)
