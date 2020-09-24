import Layout from '../../components/Layout'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import { GetServerSideProps, GetServerSidePropsContext, NextPageContext } from 'next'
import { getSession } from 'next-auth/client'


const BotView = ({botInfo}: AppProps) => {
  const botList = Object.entries(botInfo).map(([key, value]) => {
    return (
      <li>{key}: {JSON.stringify(value)}</li>
    )
  })

  // TODO: Add button to start job POST /api/botcommand/bots/[id]/start
  // Redirect to /bots/[botId]/jobs/[jobId]
  return (
    <Layout>
      <div className="px-4 py-4">
        <h1>{botInfo.name}</h1>
        <ul>{botList}</ul>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async(ctx: GetServerSidePropsContext) => {
  // @ts-ignore // NextAuth incorrectly typed this
  // const session = await getSession(ctx)
  // console.log(session)
  const query = ctx.query
  let botInfo = null
  const id = query.id
  const hostname = process.env.HOST_URL || 'http://localhost:3000'
  const options = { headers: { cookie: ctx.req.headers.cookie } }
  const res = await fetch(`${hostname}/api/botcommand/bots/${id}`, options)
  botInfo = await res.json()
  console.log(botInfo)
  return {
    props: {
      botInfo
    }
  }
}

export default BotView;
