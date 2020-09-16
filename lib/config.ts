import jwt from 'next-auth/jwt'
import { NextApiRequest, NextApiResponse } from 'next'

import secret from '../config/secret'
import acl from '../config/acl'
import processes from '../config/processes'

interface Configs {
  secret: string
  acl: object
  processes: object
}

export function get(): Promise<Configs> {
  return new Promise((res, rej) => {
    res({
      secret,
      acl,
      processes,
    })
  })
}

export default {
  get
}

