import { NextApiRequest, NextApiResponse } from 'next'
import { Token } from '../../../lib/token'
import processes from '../../../config/processes'
import sources from '../../../config/sources'
import authenticate from '../../../middleware/authenticate'
import { UiPathProcess } from '../../../lib/Process'

export const handler = async (req: NextApiRequest, res: NextApiResponse, token: Token) => {
    // TODO: Authorize, not just authenticate
    // if (!token) {
    //     res.statusCode = 401
    //     res.json({Error: "Not Authorized"})
    //     return
    // }
    let process_list = []
    for (let name in processes) {
        const process = new UiPathProcess(name, processes[name], sources['uipath'])
        console.log(process.processName);
        const process_res = await process.info()
        console.log(process_res)
        process_list.push({
            'id': process_res.Id,
            'name': process_res.Name
        })
    }
    res.statusCode = 200
    res.json(process_list)
}

export default authenticate(handler)
