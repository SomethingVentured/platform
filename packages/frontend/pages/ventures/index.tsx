import { Box } from '@chakra-ui/react'
import type { NextPage } from 'next'

import { Hero, HeroBody, HeroHeading } from '../../components'
import { Layout } from '../../components/Layout'
import { highlightedProjects,ProjectGrid } from '../../components/projects'


const Ventures: NextPage = () => (
  <Layout>
    <Box d="flex" flexFlow="row wrap" alignItems="center" width="100%" height="auto">
      <Hero>
        <HeroHeading part1="Check the ventures..." part2="Back a venture today!" />
        <HeroBody content="Eiusmod nisi incididunt anim incididunt nostrud laboris aliqua excepteur ut excepteur quis. Minim ut duis aute nostrud consequat esse cupidatat commodo cillum qui. Pariatur duis enim sint ea." />
      </Hero>
    </Box>
    <Box id="ventures" d="flex" flexFlow="column wrap" alignItems="center" width="100%" minH="100vh">
      <ProjectGrid items={highlightedProjects} simple />
      <ProjectGrid items={highlightedProjects} simple />
    </Box>
  </Layout>
)
// eslint-disable-next-line import/no-default-export
export default Ventures

