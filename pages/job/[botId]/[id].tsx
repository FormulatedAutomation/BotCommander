import React, { useState } from 'react'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import dynamic from 'next/dynamic'
import Layout from '../../../components/Layout'
import AttachmentTable from '../../../components/AttachmentTable'
import Link from 'next/link'
import classNames from 'classnames'

const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false })

const BotView = ({ jobInfo, botInfo, hostUrl }: AppProps) => {
  const [loading, setLoading] = useState(false)
  const [bot, setBot] = useState(botInfo)
  const [job, setJob] = useState(jobInfo)
  const [rawResponseOpen, setRawResponseOpen] = useState(false)

  const refresh = async (botId, jobId) => {
    setLoading(true)
    const res = await fetch(`${hostUrl}/api/botcommander/jobs/${botId}/${jobId}`)
    const botRes = await fetch(`${hostUrl}/api/botcommander/bots/${botId}`)
    const refreshedBotInfo = await botRes.json()
    const refreshedJobInfo = await res.json()
    setBot(refreshedBotInfo)
    setJob(refreshedJobInfo)
    setLoading(false)
  }

  const labelClasses = classNames({
    'inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5': true,
    'bg-orange-100 text-orange-800': job.state === 'Pending',
    'bg-red-100 text-red-800': job.state === 'Failed',
    'bg-green-100 text-green-800': job.state === 'Complete',
    'bg-yellow-100 text-yellow-800': job.state === 'Running',
  })

  return (
    <Layout wrapperClass={'bg-gray-50'}>
      <div className="px-4 py-4">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
            <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-no-wrap">
              <div className="ml-4 mt-2">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  <Link href={`/bot/${bot.id}`}><a className="underline">{bot.name}</a></Link>
                  <span className="ml-2">Run #{job.id}</span>
                </h3>
              </div>
              <div className="flex">
                <span
                  className={labelClasses}>
                  {job.state}
                </span>
                {job.state !== 'Complete' && !loading && <div className="ml-2 flex justify-center items-center">
                  <button onClick={() => refresh(bot.id, job.id)}>
                    <svg className="w-4 h-4 " fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                  </button>
                </div>}
              </div>
            </div>
          </div>
          <div className="px-4 py-5">
            {job.artifacts && <div className="mb-4">
              <AttachmentTable artifacts={job.artifacts} job={job} bot={bot} />
            </div>}
            {job.OutputArguments && <div>{job.OutputArguments}</div>}
            <span className="inline-flex rounded-md shadow-sm">
              <button type="button" onClick={() => setRawResponseOpen(!rawResponseOpen)}
                className="flex full-w items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">

                {rawResponseOpen && <svg className="-ml-0.5 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round"
                    strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>}

                {!rawResponseOpen && <svg className="-ml-0.5 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                </svg>}
                Toggle Raw Data
              </button>
            </span>
            {rawResponseOpen && <div className="px-4 py-5">
              <DynamicReactJson src={job} collapsed={false} name={false}/>
            </div>}
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
  const { botId, id } = query
  const hostUrl = process.env.HOST_URL || 'http://localhost:3000'
  const options = { headers: { cookie: ctx.req.headers.cookie } }
  const res = await fetch(`${hostUrl}/api/botcommander/jobs/${botId}/${id}`, options)
  const botRes = await fetch(`${hostUrl}/api/botcommander/bots/${botId}`, options)
  const botInfo = await botRes.json()
  const jobInfo = await res.json()
  return {
    props: {
      jobInfo,
      botInfo,
      hostUrl,
    },
  }
}

export default BotView
