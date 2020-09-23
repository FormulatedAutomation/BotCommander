// Secret for JWT and Session storage // Will automatically be generated if not found at config/secret.txt
import fs from 'fs'
import path from 'path'
import {promisify} from 'util'

const secretPath = path.join(process.cwd(), '/config/secret.txt')
const MIN_SECRET_LEN = 25 // Even in base64, this would be less than 128 bits of entropy

const fsExists = promisify(fs.exists)
const fsReadFile = promisify(fs.readFile)

export async function get(): Promise<string> {
  let secret = null
  if (process.env.SECRET) {
    secret = process.env.SECRET
  } else if (await fsExists(secretPath)) {
    secret = await fsReadFile(secretPath, 'utf-8')
  }
  if (!secret) {
    console.log(`Secret not found, please either set SECRET or create a file at '${secretPath}' containing the secret key`)
    console.log(`Exiting...`)
    process.exit(1)
  }
  if (secret && secret.length < MIN_SECRET_LEN) {
    console.log(`Secret is not secure, please set a secret > ${MIN_SECRET_LEN} characters in length.`)
    console.log(`Exiting...`)
    process.exit(1)
  }
  return secret
}