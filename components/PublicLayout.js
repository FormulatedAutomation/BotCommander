import React from 'react'
import PropTypes from 'prop-types'

import Head from 'next/dist/next-server/lib/head'

import ProgressBar from './ProgressBar'

const PublicLayout = ({ children }) => {
  return (
    <div>
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"/>
      </Head>
      <ProgressBar/>
      {children}
    </div>
  )
}

PublicLayout.propTypes = {
  children: PropTypes.function,
}

export default PublicLayout
