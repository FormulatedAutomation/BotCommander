import Layout from '../components/Layout'
import { getSession } from 'next-auth/client'
import Link from 'next/link'
import ProcessGrid from "../components/ProcessGrid";


const Processes = ({processes, responseError}) => {

  return (
    <Layout>
      <div className="px-4 py-4">
        <h2 className="text-3xl font-bold">Processes</h2>
        {!responseError && <ProcessGrid processes={processes} />}
        {responseError && <div>
          <div className="rounded-md bg-red-50 p-4 my-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"/>
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm leading-5 font-medium text-red-800">
                  {responseError}
                </h3>
              </div>
            </div>
          </div>

        </div>}
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  let processes = [];
  let responseError = false;

  const hostname = process.env.HOST_URL || 'http://localhost:3000'
  const options = { headers: { cookie: context.req.headers.cookie } }

  const res = await fetch(`${hostname}/api/botcommand/bots`, options)
  if (!res.ok) {
    responseError = "Unable to connect to API"
  } else {
    processes = await res.json();
  }

  return {
    props: {
      processes,
      responseError
    }
  }
}

export default Processes;
