// Secret for JWT and Session storage // Will automatically be generated if not found at config/secret.txt
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

const secretPath = path.join(process.cwd(), '/config/secret.txt')

function getSecret(): string {
  if (process.env.SECRET) {
    return process.env.SECRET
  } else if (fs.existsSync(secretPath)) {
    return fs.readFileSync(secretPath, 'utf-8')
  }
  console.log(`Secret not found, please either set SECRET or create a file at '${secretPath}' containing the secret key`)
  return null
}

const secret = getSecret()

export default secret