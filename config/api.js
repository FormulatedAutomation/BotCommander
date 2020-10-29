export const acl = {
  groups: {
    admins: {
      emails: [
        'm@mdp.im',
        'percival@gmail.com',
        'brent@brentsanders.io',
        'brent@formulatedautomation.com',
        'josh@formulatedautomation.com'
      ],
    },
    users: {
      emails: [
        '/^[A-Z0-9._\\-+\\%]+@formulatedautomation.com$/i',
      ],
    },
    anotherGroup: {
      emails: [
        'tanguy@vialive.com',
      ],
    },
  },
}

export const bots =
[
  {
    id: 'ViaLive_EventBrite',
    name: 'EventBrite Cloud',
    description: 'Runs Eventbrite registration in the cloud',
    secret: process.env.EVENTBRITE_BOT_SECRET,
    workspaceId: 'a9fcaa8df8df49ce9a6c7fd002595dd9',
    processId: '84dc9bc3-36a7-418b-8cfb-32ff52693dc6',
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
