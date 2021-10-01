import { Container } from '@chakra-ui/react'
import Head from 'next/head'
import React, { ReactNode } from 'react'

import { Footer, Navbar } from '.'

type Props = {
  children?: ReactNode
}

export const Layout = ({
  children
}: Props): JSX.Element => (
  <>
    <Head>
      <title>SomethingVentured</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Ubuntu:wght@300;400&family=Amatic+SC:wght@400;700&display=swap" rel="stylesheet" />
    </Head>
    <Navbar />
    <Container className="wrapper" width={{base: '100%', lg: '100vw'}} maxWidth={{base: 'unset', xl: '1200px'}} pb={20}>
      {children}
    </Container>
    <Footer />
  </>
)
