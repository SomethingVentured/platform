import { Box, SimpleGrid } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { FC } from 'react'

import { Benefits,Hero, HeroBody, HeroHeading } from '../components'
import { Layout } from '../components/Layout'

const Invest: NextPage = () => 
    // const { address, provider, svUserAddress } = useWeb3()
    // const router = useRouter()

     (
        <Layout>
            <Investing />
        </Layout>
    )

// eslint-disable-next-line import/no-default-export
export default Invest

export const Investing: FC = () => 
    // const { address, provider } = useWeb3()
     (
        <>
            <Box d="flex" flexFlow="row wrap" alignItems="center" width="100%" height="auto">
                <Hero>
                    <HeroHeading part1="Invest with SV..." part2="Get perks and rewards!" />
                    <HeroBody content={'There\'s a ton of benefits to investing in a new venture through the SomethingVentured platform.'} />
                    {/* <HeroCTA
            cta1Text="Start"
            cta1Url="#start"
        // cta1Hint="Best decision"
        /> */}
                    {/* <Box sx={{ button: { fontSize: 40 } }}>
                    {!address && !provider && <ConnectButton /> }
                </Box> */}

                </Hero>
            </Box>
            <Box id="whysv" d="flex" flexFlow="column wrap" justifyContent="flex-start" width="100%">
                <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10} py={{ base: '75px', xl: 0 }}>
                    <Benefits type="funder" compact />
                    <Box />
                </SimpleGrid>
            </Box>
        </>
    )


// export const CreateProject: FC = () => (
//     <Box id="createProject" d="flex" flexFlow="column wrap" justifyContent="center" width="100%" height="auto" minH="100vh">
//         <Hero>
//             <HeroHeading part1="Project creation..." part2="Your journey begins now 🎉" />
//         </Hero>
//         <Box flex={1}>Hey</Box>
//     </Box>
// )

// export const Dashboard: FC = () => (
//     <Box id="dashboard" d="flex" flexFlow="column wrap" justifyContent="center" width="100%" height="auto">
//         <Hero>
//             <HeroHeading part1="The heart of any service..." part2="Is your dashboard" />
//             <HeroBody content="The users dashboard will go here..." />
//         </Hero>
//     </Box>
// )