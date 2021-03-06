/* eslint-disable @next/next/no-page-custom-font */
import { Box, Container } from '@chakra-ui/react'
import Head from 'next/head'
import React, { ReactNode } from 'react'

import { Footer, Navbar } from '.'

type Props = {
  children?: ReactNode
}

export const Layout: React.FC<Props> = ({
  children
}): JSX.Element => (
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
    <Container position="relative" className="wrapper" width={{ base: '100%', lg: '100vw' }} maxWidth={{ base: 'unset', xl: 'unset' }} px={0} pb={20} align="center" zIndex={100} sx={{
      '& > div': {
        textAlign: 'left'
      }
    }}>
      {children}
    </Container>
    <Footer />
    <Box position="fixed" top="60px" left={0} width="100vw" height="100vh" zIndex={0} opacity={0.2} sx={{
      backgroundImage: '/assets/page-bg-trees.jpg',
      backgroundPositionY: 'bottom',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      // backgroundAttachment: 'fixed'
    }} />
  </>
)
