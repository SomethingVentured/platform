import { Box, SimpleGrid } from '@chakra-ui/react'
import type { NextPage } from 'next'

// import { useRouter } from 'next/router'
import { Hero, HeroBody,HeroHeading } from '../components'
import { Layout } from '../components/Layout'

const About: NextPage = () =>
    // const router = useRouter()

     (
        <Layout>
            <Box d="flex" flexFlow="row wrap" alignItems="center" width="100%" height="auto">
                <Hero>
                    <HeroHeading part1="Introducing..." part2="SomethingVentured!" />
                    <HeroBody content="We are a mixed bag of Web3 professionals with a heavy focus on DAOs." />
                    {/* <HeroFooter text="learn more" target="#theTeam" inPage /> */}
                </Hero>
            </Box>
            <Box id="theTeam" d="flex" flexFlow="column wrap" justifyContent="center" width="auto" maxW="5xl">
                <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10} py={{ base: '75px', xl: 0 }}>
                    <Box>Michiel</Box>
                    <Box>Bagholder McFomo III - An accomplished layabout, Bagsy strives to save the world one LP position at a time.</Box>
                    <Box>Fearless</Box>
                    <Box>Alok</Box>
                    <Box>lux</Box>
                </SimpleGrid>
            </Box>
            <Box id="start" d="flex" flexFlow="column wrap" justifyContent="center" width="100%" minH="100vh">
                {/* Add instructions here */}
            </Box>
        </Layout>
    )

// eslint-disable-next-line import/no-default-export
export default About