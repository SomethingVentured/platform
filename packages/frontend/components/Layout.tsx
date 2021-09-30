import { Container } from '@chakra-ui/react'
import Head from 'next/head'
import React, { ReactNode } from 'react'

import { Navbar } from './Navbar'

type Props = {
  children?: ReactNode
}

export const Layout = ({
  children
}: Props) => (
  <>
    <Head>
      <title>Default Title</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Navbar />
    <Container maxWidth="1200px">
      {children}
    </Container>
  </>
)
