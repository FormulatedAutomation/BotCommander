export const acl = {
  groups: {
    admins: {
      emails: [
        'm@mdp.im',
        'percival@gmail.com',
        'brent@brentsanders.io',
      ],
    },
    users: {
      emails: [
        '/^[A-Z0-9._\\-+\\%]+@formulatedautomation.com$/i',
        '*@fultonworks.co',
      ],
    },
    anotherGroup: {
      emails: [
        'foo@foo.com',
      ],
    },
  },
}

export const bots =
[
  {
    id: 'Turkish.Lira.to.USD',
    name: 'Turkish Lira Conversion Bot',
    description: 'Converts Turkish Lira to USD',
    source: 'uipath',
    type: 'uipath',
    acl: {
      groups: ['admins', 'users'],
    },
  },
  {
    id: 'Robocloud.Demo',
    name: 'Code Scraper',
    description: 'Code Violations Scraper',
    secret: process.env.CODE_VIOLATION_BOT_SECRET,
    workspaceId: '971988d2-33d9-4cdf-acd4-2d7f7b64814e',
    processId: '0acf110e-5160-43f4-a82c-9c1b5a2472dc',
    type: 'robocloud',
    acl: {
      groups: ['admins', 'users'],
    },
  },
  {
    id: 'ACL.Demo.Bot',
    name: 'ACL Demo Bot',
    description: 'A bot that should be available to no one',
    secret: 'abc123',
    workspaceId: '12345332-33d9-4cdf-acd4-222222222222',
    processId: '12323456-5160-43f4-a82c-222222222222',
    type: 'robocloud',
    acl: {
      groups: ['anotherGroup'],
    },
  },
]

export const sources =
{
  uipath: {
    platformHostname: 'platform.uipath.com',
    path: 'trailingspacell/TrailingSpavyun205999',
    refreshToken: process.env.UIPATH_REFRESH_TOKEN,
    serviceInstanceLogicalName: 'TrailingSpavyun205999',
    clientId: '8DEv1AMNXczW3y4U15LL3jYf62jK93n5',
  },
}
