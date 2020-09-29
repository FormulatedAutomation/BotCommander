
import {ACL} from '../acl'
import {acl, bots, sources} from '../../config/api'
import { Token } from '../../server/token';
import { Bot } from '../../server/models/Bot';

function getEmailToken(email: string): Token {
  return {
    name: "Test User",
    email,
    iat: 99999999,
    exp: 99999999,
  }
}

const botInstances = bots.map((bot) => Bot.createFromConfig(bot, sources))

it('should validate against a specific email', () => {
  const aclObj = new ACL(acl, botInstances)
  expect(aclObj.isAllowed(getEmailToken('m@mdp.im'), "Turkish.Lira.to.USD")).toEqual(true)
});

it('should fail against and unauthorized email', () => {
  const aclObj = new ACL(acl, botInstances)
  expect(aclObj.isAllowed(getEmailToken('hacker@hacker1.com'), "Turkish.Lira.to.USD")).toEqual(false)
});

it('should validate against a regex rule', () => {
  const aclObj = new ACL(acl, botInstances)
  expect(aclObj.isAllowed(getEmailToken('steve@formulatedautomation.com'), "Turkish.Lira.to.USD")).toEqual(true)
});

it('should fail against and unauthorized email with regex', () => {
  const aclObj = new ACL(acl, botInstances)
  expect(aclObj.isAllowed(getEmailToken('steve@formulatedautomation.info'), "Turkish.Lira.to.USD")).toEqual(false)
});