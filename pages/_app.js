import React from 'react'
import PropTypes from 'prop-types'
import '../styles/main.css'
import { Provider } from 'next-auth/client'
import withConfig from '../utils/withConfig'
import App, { Container } from 'next/app';

class BotCommander extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    )
  }
}
BotCommander.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
}

export default withConfig(BotCommander)
