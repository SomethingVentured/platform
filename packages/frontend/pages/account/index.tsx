import { Box } from '@chakra-ui/react'
import type { NextPage } from 'next'
// import NextLink from 'next/link'
import { FC } from 'react'

import { Hero, HeroBody, HeroCTA,HeroHeading } from '../../components'
import { Layout } from '../../components/Layout'
import { ConnectButton } from '../../components/web3'
import { useWeb3 } from '../../lib/hooks'

const Account: NextPage = () => {
  const {address, provider, svUserAddress} = useWeb3()

  return (
    <Layout>
            {!provider && !address && <LoggedOut />}
            {provider && address === svUserAddress && <Dashboard />}
            {address && address !== svUserAddress && <CreateAccount />}
    </Layout>
  )
}
// eslint-disable-next-line import/no-default-export
export default Account

export const Dashboard: FC = () => (
  <Box id="dashboard" d="flex" flexFlow="column wrap" justifyContent="center" width="100%" height="auto">
    <Hero>
      <HeroHeading part1="The heart of any service..." part2="Is your dashboard" />
      <HeroBody content="The users dashboard will go here..." />
    </Hero>
  </Box>
)

export const CreateAccount: FC = () => (
  <Box d="flex" flexFlow="row wrap" alignItems="center" width="100%" height="100%" minH="100vh">
    <Hero>
      <HeroHeading part1="Looks like you haven't ..." part2="done anything here yet" />
      <HeroBody content="Your account is created when you first invest or create a project on the platform." />
      <Box>Id magna eiusmod ullamco anim duis laborum laboris consequat elit nulla. Pariatur irure proident sit qui fugiat ipsum nulla aliquip aute. Nostrud quis et reprehenderit amet laborum excepteur elit reprehenderit Lorem pariatur labore exercitation ipsum nisi.</Box>
      <HeroCTA
          cta1Text="Create a project"
          cta1Url="/account/create"
          cta1Hint="#DreamBig!"
          cta2Text="Fund a venture"
          cta2Url="/ventures"
          cta2Hint="Investors"
        />
    </Hero>
  </Box>
)

export const LoggedOut: FC = () => (
  <Box d="flex" flexFlow="row wrap" alignItems="center" width="100%" height="auto">
      <Hero>
          <HeroHeading part1="Before you do that, Gary..." part2="You'd better login 👍" />
          <Box minH="50vh" sx={{ button: { fontSize: 40 } }}>
              <ConnectButton />
          </Box>
      </Hero>
  </Box>

)