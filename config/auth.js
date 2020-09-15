import Providers from 'next-auth/providers'

export default [
  Providers.Auth0({
    domain: 'formulated-dev1.us.auth0.com',
    clientId: 'dD27q7zaJCTUtVfoNNY6fIHZStO3JpvA',
    clientSecret: 'lJsUtQPTjJmfpHsAmmtQcLz_bMOxxV4ED0nAGq8rVHQRnmItNQpIx3g1x4gLDd3R',
  }),
  // ...add more providers here
]
