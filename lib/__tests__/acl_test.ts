
import {ACL} from '../acl'
import {acl, bots} from '../../config/api'
import { Token } from '../../server/token';

function getEmailToken(email: string): Token {
  return {
    name: "Test User",
    email,
    iat: 99999999,
    exp: 99999999,
  }
}

it('should validate against a specific email', () => {
  const aclObj = new ACL(acl, bots)
  expect(aclObj.isAllowed(getEmailToken('m@mdp.im'), "Turkish.Lira.to.USD")).toEqual(true)
});

it('should fail against and unauthorized email', () => {
  const aclObj = new ACL(acl, bots)
  expect(aclObj.isAllowed(getEmailToken('percival@gmail.com'), "Turkish.Lira.to.USD")).toEqual(false)
});

it('should validate against a regex rule', () => {
  const aclObj = new ACL(acl, bots)
  expect(aclObj.isAllowed(getEmailToken('steve@formulatedautomation.com'), "Turkish.Lira.to.USD")).toEqual(true)
});

it('should fail against and unauthorized email with regex', () => {
  const aclObj = new ACL(acl, bots)
  expect(aclObj.isAllowed(getEmailToken('steve@formulatedautomation.info'), "Turkish.Lira.to.USD")).toEqual(false)
});