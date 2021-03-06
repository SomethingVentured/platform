import { Box, Button, Link, SimpleGrid, VStack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { FiChevronDown } from 'react-icons/fi'

import { Benefits, Hero, HeroBody, HeroCTA, HeroFooter, HeroHeading } from '../components'
import { Layout } from '../components/Layout'
import { highlightedProjects, ProjectGrid } from '../components/projects/ProjectGrid'


const Home: NextPage = () => (
  <Layout>
    <Box d="flex" flexFlow="row wrap" alignItems="center" width="100%" height="100%" minH="100vh">
      <Hero>
        <HeroHeading part1="Something Ventured..." part2="Something gained!" />
        <HeroBody content="Find patrons for your DAO or Start-up. Build a community, give perks to reward loyal supporters and raise the capital you need to launch your project. Or, find a project to help get off the ground." />
        <HeroCTA
          cta1Text="Create a venture"
          cta1Url="/account/create"
          cta1Hint="DAO it!"
          cta2Text="Find a venture"
          cta2Url="/ventures"
          cta2Hint="Good Feels!"
        />
        <HeroFooter text="Learn more" target="#benefits" inPage />
      </Hero>
    </Box>
    <Box id="benefits" d="flex" flexFlow="column wrap" justifyContent="center" width="100%" minH="100vh" maxW="7xl">
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10} py={{ base: '75px', xl: 0 }}>
        <Benefits type="fundee" compact />
        <Benefits type="funder" compact />
      </SimpleGrid>
      <Box textAlign="center" justifyContent="center" d="flex" mt={12} width="100%" sx={{
        d: { base: 'none', md: 'initial' },
        'a, button, div': {
          fontSize: { base: '40px', xl: '60px' },
          transition: 'all 0.2s ease',
          _hover: {
            color: 'green.700',
            opacity: 0.09
          }
        }
      }}>

        <Link href="/#highlights">
          <VStack spacing={[5, 10]}>
            <Button variant="cta">Example projects</Button>
            <Box sx={{
              // animation: `${bounce} 2s ease infinite`,
              color: 'green.500',
              fontSize: '60px',
              transform: 'translate3d(0 70px 0)'
            }}><FiChevronDown />
            </Box>
          </VStack>
        </Link>
      </Box>
    </Box>
    <Box id="highlights" d="flex" alignItems="center" width="100%" minH="100vh">
      <ProjectGrid items={highlightedProjects} simple={false}/>
    </Box>
  </Layout>
)
// eslint-disable-next-line import/no-default-export
export default Home


