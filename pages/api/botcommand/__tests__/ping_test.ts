import {handler} from '../ping'
import { createMocks } from 'node-mocks-http'
import { loggedInContext } from '../../../../tests/api_test_helper';


it("Should return the authenticated users token", async () => {
  const { req, res } = createMocks({
    method: 'GET',
  });
  const ctx = await loggedInContext('m@mdp.im')
  handler(req, res, ctx)
  const data = res._getJSONData();
  expect(data.token.email).toEqual('m@mdp.im')
})