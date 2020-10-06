import http from 'http'
import fetch from 'node-fetch'
import listen from 'test-listen'
import { createMocks } from 'node-mocks-http'
import { apiResolver } from 'next/dist/next-server/server/api-utils'

import { authedCookie, loggedInContext } from '../../../../tests/api_test_helper'
import Ping, { handler } from '../ping'

const servers = []

afterAll(() => {
  for (const server of servers) {
    server.close()
  }
})

it('Should return the authenticated users token', async () => {
  const { req, res } = createMocks({
    method: 'GET',
  })
  const ctx = await loggedInContext('m@mdp.im')
  handler(req, res, ctx)
  const data = res._getJSONData()
  expect(data.token.email).toEqual('m@mdp.im')
})

describe('/api/botcommander/ping', () => {
  test('responds 401 to unauthed GET', async () => {
    expect.assertions(1)
    const requestHandler = (req, res) => {
      return apiResolver(req, res, undefined, Ping, null, false)
    }
    const server = http.createServer(requestHandler)
    servers.push(server)
    const url = await listen(server)
    const response = await fetch(url)
    expect(response.status).toBe(401)
  })

  test('responds 200 to authed GET', async () => {
    expect.assertions(1)
    const requestHandler = (req, res) => {
      return apiResolver(req, res, undefined, Ping, null, false)
    }
    const server = http.createServer(requestHandler)
    servers.push(server)
    const url = await listen(server)
    const opts = {
      headers: {
        cookie: await authedCookie('m@mdp.im'),
      },
    }
    const response = await fetch(url, opts)
    expect(response.status).toBe(200)
  })
})
