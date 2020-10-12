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
    id: 'Stock.History',
    name: 'Stock History Bot',
    description: 'Stock History Downloader',
    secret: process.env.STOCK_HISTORY_SECRET,
    workspaceId: 'da69252b-22dd-4852-a316-5074e316ace7',
    processId: '136e1ea8-e6ae-4da6-b3d3-cfc4227fa3d9',
    type: 'robocloud',
    arguments: {
      input: [
        {
          name: 'ticker',
          displayName: 'Ticker',
          type: 'string',
        },
      ],
    },
    acl: {
      groups: ['admins', 'users'],
    },
  },
  {
    id: 'No.Access.Bot',
    name: 'ACL Demo Bot',
    description: 'A bot that should be available to no one - For test purposes',
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
