import { Box } from '@chakra-ui/react'
import type { NextPage } from 'next'
// import { useRouter } from 'next/router'
import { FC } from 'react'

import { Hero, HeroBody,HeroHeading } from '../components'
import { Layout } from '../components/Layout'
import { ConnectButton } from '../components/web3'
import { useWeb3 } from '../lib/hooks'

const Create: NextPage = () => {
    const { provider, address, svUserAddress } = useWeb3()
    // const router = useRouter()
    // console.log(provider?.network.chainId)
    



    return (
        <Layout>
            {(!provider || provider.network.chainId !== 80001) && !address && <LoggedOut />}
            {provider && address === svUserAddress && <Dashboard />}
            {address && address !== svUserAddress && <CreateProject />}
        </Layout>
    )
}
// eslint-disable-next-line import/no-default-export
export default Create

export const LoggedOut: FC = () => (
    <Box d="flex" flexFlow="row wrap" alignItems="center" width="100%" height="auto">
        <Hero>
        <HeroHeading part1="Create your project..." part2="" />
            <HeroHeading part1="Before you do that..." part2="You better login 👍" />
            <Box sx={{ button: { fontSize: 40 } }}>
                <ConnectButton />
            </Box>
        </Hero>
    </Box>

)

export const CreateProject: FC = () => (
    <Box id="createProject" d="flex" flexFlow="column wrap" justifyContent="center" width="100%" height="auto" minH="100vh">
        <Hero>
            <HeroHeading part1="Project creation..." part2="Your journey begins now 🎉" />
        </Hero>
        <Box flex={1}>Step 1</Box>
    </Box>
)

export const Dashboard: FC = () => (
    <Box id="dashboard" d="flex" flexFlow="column wrap" justifyContent="center" width="100%" height="auto">
        <Hero>
            <HeroHeading part1="The heart of any service..." part2="Is your dashboard" />
            <HeroBody content="The users dashboard will go here..." />
        </Hero>
    </Box>
)