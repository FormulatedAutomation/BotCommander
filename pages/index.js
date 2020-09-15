import Head from 'next/head'
import styles from '../styles/Home.module.css'

import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/client'

export default function Page() {
  const [ session, loading ] = useSession()

  return (
    <div className={styles.container}>
      <Head>
        <title>BotCommander</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!session && <>
        Not signed in <br />
        <button onClick={signIn}>Sign in</button>
      </>}
      {session && <>
        Signed in as {session.user.email} <br />
        <button onClick={signOut}>Sign out</button>
      </>}
    </div>
  )
}
