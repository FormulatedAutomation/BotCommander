import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../components/Layout'
import ProcessGrid from '../components/ProcessGrid'
import ErrorAlert from '../components/ErrorAlert'

const Processes = ({ processes, responseError }) => {
  return (
    <Layout>
      <div className="px-4 py-4">
        <h2 className="text-3xl font-bold">Processes</h2>
        {!responseError && <ProcessGrid processes={processes} />}
        {responseError && <ErrorAlert message={responseError} />}
      </div>
    </Layout>
  )
}

Processes.propTypes = {
  processes: PropTypes.array,
  responseError: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
}

export async function getServerSideProps (context) {
  let processes = []
  let responseError = false

  const hostname = process.env.HOST_URL || 'http://localhost:3000'
  const options = { headers: { cookie: context.req.headers.cookie } }

  const res = await fetch(`${hostname}/api/botcommander/bots`, options)
  if (!res.ok) {
    responseError = 'Unable to connect to API'
  } else {
    processes = await res.json()
  }

  return {
    props: {
      processes,
      responseError,
    },
  }
}

export default Processes
