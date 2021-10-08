import { Box, SimpleGrid } from '@chakra-ui/react'
import type { NextPage } from 'next'
// import { useRouter } from 'next/router'
import { FC } from 'react'

import { Benefits,Hero, HeroBody, HeroCTA, HeroHeading } from '../components'
import { Layout } from '../components/Layout'


const Learn: NextPage = () => (
        <Layout>
            <CreateContent />
        </Layout>
    )
// eslint-disable-next-line import/no-default-export
export default Learn

export const CreateContent: FC = () => (
    <>
        <Box d="flex" flexFlow="row wrap" alignItems="center" width="100%" height="auto">
            <Hero>
                <HeroHeading part1="Fund with SV..." part2="Launch & build community!" />
                <HeroBody content="Don&apos;t just get funding for your new venture, reward your supporters with perks and rewards (that you define), bootstrap liquidity for your token and plug your funding campaign right into your Moloch DAO." />
                <HeroCTA
                    cta1Text="Create a venture"
                    cta1Url="/account/create"
                    cta1Hint="#DreamBig!"
                    cta2Text="Find a venture"
                    cta2Url="/ventures"
                    cta2Hint="Investors"
                />

            </Hero>
        </Box>
        <Box id="whysv" d="flex" flexFlow="column wrap" justifyContent="flex-start" width="100%" maxW="5xl">
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10} py={{ base: '75px', xl: 0 }}>
                <Benefits type="fundee" compact />
                {/* <Box /> */}
            </SimpleGrid>
        </Box>
    </>
)

