import {AppProps} from 'next/dist/next-server/lib/router/router'
import {GetServerSideProps, GetServerSidePropsContext, NextPageContext} from 'next'
import {useState} from 'react';
import dynamic from 'next/dynamic'
import Layout from '../../../components/Layout'
import ErrorAlert from "../../../components/ErrorAlert";
const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false });


const BotView = ({jobInfo}: AppProps) => {

  const [loading, setLoading] = useState(false);

  return (
    <Layout wrapperClass={`bg-gray-50`}>
      <div className="px-4 py-4">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
            <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-no-wrap">
              <div className="ml-4 mt-2">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {jobInfo.Id}
                </h3>
              </div>
              <div className="ml-4 mt-2 flex-shrink-0">
              <span className="inline-flex rounded-md shadow-sm">
              </span>
              </div>
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
  let jobInfo = null
  const {botId, id} = query
  const hostname = process.env.HOST_URL || 'http://localhost:3000'
  const options = {headers: {cookie: ctx.req.headers.cookie}}
  const res = await fetch(`${hostname}/api/botcommand/jobs/${botId}/${id}`, options)
  jobInfo = await res.json()
  console.log(jobInfo)
  return {
    props: {
      jobInfo
    }
  }
}

export default BotView;
