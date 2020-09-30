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
    } else if (!loading) {
      Router.push("/auth/signin");
    }
  }, [session]);

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

export async function getServerSideProps() {

  const csrfToken = await getCsrfToken();
  return {
    props: {
      csrfToken
    }
  }
}
