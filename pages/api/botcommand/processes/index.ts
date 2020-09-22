import { NextApiRequest, NextApiResponse } from 'next'
import { UiPathProcess } from '../../../../server/models/Process'
import { BotCommandContext, ensureLoggedIn } from '../../../../server/middleware/context'

export const handler = async (req: NextApiRequest, res: NextApiResponse, ctx: BotCommandContext) => {
    let process_list = []
    for (let name in ctx.bots) {
        const process = new UiPathProcess(name, ctx.bots[name], ctx.sources['uipath'])
        const process_res = await process.info()
        process_list.push({
            'id': process_res['Id'],
            'name': process_res['Name']
        })
    }
    res.json(process_list)
}

export default ensureLoggedIn(handler)
