import { NextApiRequest, NextApiResponse } from 'next'
import { BotCommanderContext, ensureLoggedIn } from '../../../server/middleware/context'

export const handler = (req: NextApiRequest, res: NextApiResponse,
  context: BotCommanderContext) => {
  const token = context.token
  res.statusCode = 200
  res.json({ token })
}

export default ensureLoggedIn(handler)
