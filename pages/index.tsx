import type { NextPage } from 'next'
import React from 'react'

import { Layout } from '../components/Layout'

const Home: NextPage = () => (
    <Layout>
      <main>
        <h1>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
      </main>
    </Layout>
  )

export default Home
