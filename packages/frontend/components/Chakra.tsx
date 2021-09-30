import {
  ChakraProvider,
  cookieStorageManager,
  localStorageManager,
} from '@chakra-ui/react'
import { Dict } from '@chakra-ui/utils'
import { GetServerSidePropsContext } from 'next'
import React, { ReactNode } from 'react'

interface ChakraProps {
  cookies?: string
  theme?: Dict<string>
  children: ReactNode
}

export const Chakra = ({ cookies, theme, children }: ChakraProps): JSX.Element => (
  <ChakraProvider
    colorModeManager={
      cookies ? cookieStorageManager(cookies) : localStorageManager
    }
    theme={theme}
  >
    {children}
  </ChakraProvider>
)

export type ServerSideProps<T> = { props: T } | Promise<{ props: T }>

export function getServerSideProps({
  req,
}: GetServerSidePropsContext): ServerSideProps<{ cookies?: string }> {
  return {
    props: {
      cookies: req.headers.cookie ?? '',
    },
  }
}