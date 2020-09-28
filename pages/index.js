import styles from '../styles/Home.module.css'
import Layout from "../components/Layout";
import React, {useEffect} from 'react'
import Router from 'next/router';
import {getCsrfToken, getSession, signIn, useSession} from 'next-auth/client'
import PublicLayout from "../components/PublicLayout";

export default function Page({csrfToken}) {
  const [session, loading] = useSession()

  useEffect(() => {
    if (session) {
      Router.push("/bots");
    }
  }, [session]);

  return (
    <PublicLayout>
      <form method='POST' action='/api/auth/signin/auth0'>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <span className="block w-full rounded-md shadow-sm">
              <input type='hidden' name='csrfToken' value={csrfToken} />
              <input type='hidden' name='callbackUrl' value='http://localhost:3000/' />
              <input type="submit"
                     value="Login"
                      className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out" />

            </span>
          </div>
        </div>
      </div>
      </form>
    </PublicLayout>
  )
}

export async function getServerSideProps() {

  const csrfToken = await getCsrfToken();
  return {
    props: {
      csrfToken
    }
  }
}
