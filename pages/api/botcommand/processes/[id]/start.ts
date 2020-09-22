import { NextApiRequest, NextApiResponse } from 'next'
import { UiPathProcess } from '../../../../../server/models/Process'
import { BotCommandContext, ensureLoggedIn } from '../../../../../server/middleware/context'

const handler = async (req: NextApiRequest, res: NextApiResponse, context: BotCommandContext) => {
  const {sources, bots} = context
  if (req.method === 'POST') {
    console.log(req.query)
    console.log(req.body)
    let process = null
    for (let name in bots) {
      if (name === req.query.id) {
        process = new UiPathProcess(name, bots[name], sources['uipath'])
      }
    }
    const result = await process.start({inputLira: 300})
    res.statusCode = 200
    res.json(result)
  } else {
      res.statusCode = 404
      res.json({ Error: "Not Found" })
      return
  }
}

export default ensureLoggedIn(handler)