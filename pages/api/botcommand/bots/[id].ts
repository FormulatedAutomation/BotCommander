import { NextApiRequest, NextApiResponse } from 'next'
import { UiPathBot } from '../../../../server/models/Bot'
import { BotCommandContext, ensureLoggedIn } from '../../../../server/middleware/context'

const handler = async (req: NextApiRequest, res: NextApiResponse, context: BotCommandContext) => {
  const {sources, bots} = context
  let process = null
  for (let name in bots) {
    let bot = bots[name]
    if (name === req.query.id) {
      process = new UiPathBot(name, bot, sources[bot.source])
    }
  }
  if (process) {
    await process.info()
    res.json(process.processInfo)
    return
  }
  res.statusCode = 404
  res.json({Error:'Bot Not Found'})
}

export default ensureLoggedIn(handler)
