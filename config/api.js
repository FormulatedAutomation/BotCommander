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
}

export const sources = 
{
  'uipath': {
    "serverinfo": {
      "servername": "https://platform.uipath.com/trailingspacell/TrailingSpavyun205999",
      "refresh_token": "MUWI7ONqd347Zpoc4FvhgT8K9HHKZZKdXhdRyYUrOcgJF",
      "tenant_logical_name": "TrailingSpavyun205999",
      "client_id": "8DEv1AMNXczW3y4U15LL3jYf62jK93n5"
    }
  }
}