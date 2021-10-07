import { Box } from '@chakra-ui/react'
import type { NextPage } from 'next'
import NextLink from 'next/link'
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
      <Box>Maybe you&apos;re an investor looking to <NextLink href="/investors">back a new start-up</NextLink> or perhaps you&apos;re looking to <NextLink href="/create">get backing</NextLink> for your venture?</Box>
      <HeroCTA
          cta1Text="Create a project"
          cta1Url="/create"
          cta1Hint="True dreams!"
          cta2Text="Fund a project"
          cta2Url="/invest"
          cta2Hint="Investor path"
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