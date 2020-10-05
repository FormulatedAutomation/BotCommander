import React from 'react'
import { providers as getProviders, signIn } from 'next-auth/client'
import PublicLayout from '../../components/PublicLayout'
import { Providers } from 'next-auth/providers'

export default function SignIn ({ providers }: {providers: Providers}) {
  return (
    <PublicLayout>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        {Object.values(providers).map(provider => (
          <div key={provider.id} className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <span className="block w-full rounded-md shadow-sm">
                <div key={provider.name}>
                  <button
                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                    onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
                </div>
              </span>
            </div>
          </div>
        ))}
      </div>
    </PublicLayout>
  )
}

SignIn.getInitialProps = async (context) => {
  return {
    providers: await getProviders(context),
  }
}
