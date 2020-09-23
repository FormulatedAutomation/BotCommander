export const acl = {
  groups: {
    admins: {
      emails: [
        'percival@gmail.com',
        'brent@brentsanders.io',
      ]
    },
    users: {
      emails: [
        '*@formulatedautomation.com',
      ]
    }
  }
}

export const bots = 
{
  'Turkish.Lira.to.USD': {
    source: 'uipath',
    type: 'uipath',
    acl: {
      groups: ['admins', 'users']
    },
  },
  'Robocloud.Demo': {
    secret: "36713df0406fc23629cee8f324a7323b",
    workSpaceId: "971988d2-33d9-4cdf-acd4-2d7f7b64814e",
    processId: "0acf110e-5160-43f4-a82c-9c1b5a2472dc",
    type: 'robocloud',
    acl: {
      groups: ['admins', 'users']
    },
  },
}

export const sources = 
{
  uipath: {
    serverinfo: {
      servername: "https://platform.uipath.com/trailingspacell/TrailingSpavyun205999",
      refresh_token: "MUWI7ONqd347Zpoc4FvhgT8K9HHKZZKdXhdRyYUrOcgJF",
      tenant_logical_name: "TrailingSpavyun205999",
      client_id: "8DEv1AMNXczW3y4U15LL3jYf62jK93n5"
    }
  },
}