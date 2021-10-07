import { Box } from '@chakra-ui/react'
import type { NextPage } from 'next'

// import { useRouter } from 'next/router'
import { Hero, HeroBody, HeroFooter,HeroHeading } from '../components'
import { Layout } from '../components/Layout'

const Learn: NextPage = () => 
    // const router = useRouter()

     (
        <Layout>
            <Box d="flex" flexFlow="row wrap" alignItems="center" width="100%" height="auto">
                <Hero>
                    <HeroHeading part1="Learn more about..." part2="Our platform" />
                    <HeroBody content="Never heard of us before? Not sure what this site is all about? Read on and soak up the info, good human..." />
                    <HeroFooter text="Why SomethingVentured?" target="#why" inPage />
                </Hero>
            </Box>
            <Box id="why" d="flex" flexFlow="column wrap" justifyContent="center" width="100%" minH="100vh">
                {/* Add instructions here */}
            </Box>
        </Layout>
    )

// eslint-disable-next-line import/no-default-export
export default Learn