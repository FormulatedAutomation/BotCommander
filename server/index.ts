import { NextApiRequest, NextApiResponse } from 'next'
import { Token } from './token'

export default (req: NextApiRequest, res: NextApiResponse<any>,
  token: Token, options: object) => {

  if (!token) {
    res.statusCode = 401
    res.json({ Error: "Not Authorized" })
    return
  }




}