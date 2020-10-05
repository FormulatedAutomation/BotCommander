import { NextApiRequest, NextApiResponse } from 'next'
import { BotCommanderContext, ensureLoggedIn } from '../../../../../server/middleware/context'

const handler = async (req: NextApiRequest, res: NextApiResponse, context: BotCommanderContext) => {
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
    res.json({ Error: 'Not Found' })
  }
}

export default ensureLoggedIn(handler)
