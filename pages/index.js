import React, { useEffect } from 'react'
import Router from 'next/router'
import { useSession } from 'next-auth/client'
import PublicLayout from '../components/PublicLayout'

export default function Page () {
  const [session] = useSession()

  useEffect(() => {
    if (session) {
      Router.push('/bots')
    } else if (session === null) {
      // Can't use loading, as it seems to hang as 'true'
      Router.push('/auth/signin')
    }
  }, [session])

  return (
    <PublicLayout>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img src='robot_remote_patent.jpg'></img>
        </div>
      </div>
    </PublicLayout>
  )
}
