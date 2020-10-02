import {AppProps} from 'next/dist/next-server/lib/router/router'
import {GetServerSideProps, GetServerSidePropsContext, NextPageContext} from 'next'
import {useState} from 'react';
import dynamic from 'next/dynamic'
import Layout from '../../../components/Layout'
const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false });
import Link from 'next/link';

const BotView = ({jobInfo, botInfo}: AppProps) => {

  const [loading, setLoading] = useState(false);

  return (
    <Layout wrapperClass={`bg-gray-50`}>
      <div className="px-4 py-4">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
            <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-no-wrap">
              <div className="ml-4 mt-2">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  <Link href={`/bot/${botInfo.id}`}><a className="underline">{botInfo.name}</a></Link>
                  <span className="ml-2">Run #{jobInfo.id}</span>
                </h3>
              </div>
              <span
                className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-orange-100 text-orange-800">
                  State
              </span>
            </div>
          </div>
          <div className="px-4 py-5 sm:p-0">
            <dl>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                <dt className="text-sm leading-5 font-medium text-gray-500">
                  Properties
                </dt>
                <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                  <DynamicReactJson src={jobInfo} collapsed={false} name={false}  />
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
  const {botId, id} = query
  const hostname = process.env.HOST_URL || 'http://localhost:3000'
  const options = {headers: {cookie: ctx.req.headers.cookie}}
  const res = await fetch(`${hostname}/api/botcommander/jobs/${botId}/${id}`, options)
  const botRes = await fetch(`${hostname}/api/botcommander/bots/${botId}`, options)
  const botInfo = await botRes.json()
  const jobInfo = await res.json()
  return {
    props: {
      jobInfo,
      botInfo
    }
  }
}

export default BotView;
