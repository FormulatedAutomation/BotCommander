import { NextApiRequest, NextApiResponse } from 'next'
import { RoboCloudBot, UiPathBot } from '../../../../../server/models/Bot'
import { BotCommandContext, ensureLoggedIn } from '../../../../../server/middleware/context'
import { BotConfig } from '../../../../../lib/config'

const handler = async (req: NextApiRequest, res: NextApiResponse, context: BotCommandContext) => {
  const {sources, bots} = context
  if (req.method === 'POST') {
    let process = null
    for (let name in bots) {
      if (name === req.query.id) {
        process = getProcess(name, bots[name], sources)
      }
    }
    const result = await process.start(req.body)
    res.statusCode = 200
    res.json(result)
  } else {
      res.statusCode = 404
      res.json({ Error: "Not Found" })
      return
  }
}

function getProcess(name: string, bot: BotConfig, sources: object): UiPathBot | RoboCloudBot {
  if (bot.type === 'uipath') {
   return new UiPathBot(name, bot, sources[bot.source])
  } 
  if (bot.type === 'robocloud')
   return new RoboCloudBot(name, bot)
}

export default ensureLoggedIn(handler)