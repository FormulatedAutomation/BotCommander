import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import dynamic from 'next/dynamic'
import ErrorAlert from '../../components/ErrorAlert'
import BotRunForm from '../../components/BotRunForm'
import BotRunButton from '../../components/BotRunButton'
import Router from 'next/router'
const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false })

const BotView = ({ botInfo }: AppProps) => {
  const [loading, setLoading] = useState(false)
  const [inputArgs, setInputArgs] = useState({})
  const [runError, setRunError] = useState(null)

  const handleBotRun = async () => {
    setLoading(true)
    const run = await fetch(`/api/botcommander/bots/${botInfo.id}/start`, {
      method: 'POST',
      body: JSON.stringify(inputArgs),
    })
    if (!run.ok) {
      setRunError('Error starting that process')
      setLoading(false)
    } else {
      const jsonResponse = await run.json()
      Router.push(`/job/${botInfo.id}/${jsonResponse.runId}`)
    }
  }

  return (
    <Layout wrapperClass={'bg-gray-50'}>
      <div className="px-4 py-4">
        {runError && <ErrorAlert message={runError} />}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
            <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-no-wrap">
              <div className="ml-4 mt-2">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {botInfo.name}
                </h3>
              </div>
            </div>
          </div>
          {botInfo.arguments && botInfo.arguments.inputs ? (
            <BotRunForm botInfo={botInfo}
              setInputArgs={setInputArgs}
              loading={loading}
              handleSubmit={handleBotRun} />
          ) : <div className="px-4 py-4"><BotRunButton loading={loading} handlePress={handleBotRun} /></div> }

          <div className="px-4 py-5 sm:p-0">
            <dl>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                <dt className="text-sm leading-5 font-medium text-gray-500">
                  ID
                </dt>
                <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                  {botInfo.id}
                </dd>
              </div>
            </dl>
            <dl>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                <dt className="text-sm leading-5 font-medium text-gray-500">
                  Name
                </dt>
                <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                  {botInfo.name}
                </dd>
              </div>
            </dl>
            <dl>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                <dt className="text-sm leading-5 font-medium text-gray-500">
                  Description
                </dt>
                <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                  {botInfo.description}
                </dd>
              </div>
            </dl>
            <dl>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                <dt className="text-sm leading-5 font-medium text-gray-500">
                  Source
                </dt>
                <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                  {botInfo.source}
                </dd>
              </div>
            </dl>

            <dl>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                <dt className="text-sm leading-5 font-medium text-gray-500">
                  Type
                </dt>
                <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                  {botInfo.type}
                </dd>
              </div>
            </dl>

            <dl>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                <dt className="text-sm leading-5 font-medium text-gray-500">
                  Access
                </dt>
                <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                  <DynamicReactJson src={botInfo.acl} collapsed={false} name={false} />
                </dd>
              </div>
            </dl>
            <dl>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                <dt className="text-sm leading-5 font-medium text-gray-500">
                  Arguments
                </dt>
                <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                  <DynamicReactJson src={botInfo.arguments} collapsed={false} name={false} />
                </dd>
              </div>
            </dl>
            <dl>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                <dt className="text-sm leading-5 font-medium text-gray-500">
                  Properties
                </dt>
                <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                  <DynamicReactJson src={botInfo.properties} collapsed={false} name={false} />
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // @ts-ignore // NextAuth incorrectly typed this
  // const session = await getSession(ctx)
  // console.log(session)
  const query = ctx.query
  let botInfo = null
  const id = query.id
  const hostname = process.env.HOST_URL || 'http://localhost:3000'
  const options = { headers: { cookie: ctx.req.headers.cookie } }
  const res = await fetch(`${hostname}/api/botcommander/bots/${id}`, options)
  botInfo = await res.json()
  return {
    props: {
      botInfo,
    },
  }
}

export default BotView
