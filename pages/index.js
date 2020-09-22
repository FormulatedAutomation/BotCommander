import styles from '../styles/Home.module.css'
import Layout from "../components/Layout";
import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/client'

export default function Page() {
  const [ session, loading ] = useSession()

  return (
    <Layout>
      {!session && <>
        Not signed in <br />
        <button onClick={signIn}>Sign in</button>
      </>}
      {session && <>
        Signed in as {session.user.email} <br />
        <button onClick={signOut}>Sign out</button>
      </>}
    </Layout>
  )
}
