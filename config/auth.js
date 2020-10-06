import Providers from 'next-auth/providers'

export default [
  Providers.Auth0({
    domain: 'formulated-dev1.us.auth0.com',
    clientId: 'dD27q7zaJCTUtVfoNNY6fIHZStO3JpvA',
    clientSecret: process.env.AUTH0_SECRET,
  }),
  // ...add more providers here
]
