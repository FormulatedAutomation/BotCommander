import {NextApiRequest, NextApiResponse} from 'next'

const fs = require('fs')

const checkFile = async (path) => {
  try {
    await fs.promises.access(path, fs.R_OK | fs.W_OK)
  } catch (err) {
    return false;
  }
  return true;
}


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const apiConfigPath = `${process.cwd()}/config/api.js`
  const authConfigPath = `${process.cwd()}/config/auth.js`

  let status = {};

  status['apiConfigFound'] = await checkFile(apiConfigPath);
  status['authConfigFound'] = await checkFile(authConfigPath);

  res.json(status)
}

export default handler
