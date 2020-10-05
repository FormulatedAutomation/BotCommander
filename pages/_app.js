import React from 'react'
import PropTypes from 'prop-types'
import '../styles/main.css'
import { Provider } from 'next-auth/client'

export default function App ({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  )
}

App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
}
