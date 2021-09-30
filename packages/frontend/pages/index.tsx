import type { NextPage } from 'next'
import { Box, Button, Stack, Text } from '@chakra-ui/react'

import { Layout } from '../components/Layout'
import { Link } from '../components/Link'
import { Card } from '../components/projects/Card'

const Home: NextPage = () => (
    <Layout>
      <main>
        <h1>
          <div>Something Ventured</div>
          <div>Something Gained</div>
        </h1>
        <div>
          <Text>
            Find patrons for your DAO. Build a community, give perks to reward loyal supporters
            and raise the capital you need to launch your project. Or, find a project to get off the ground.
          </Text>
          <Stack spacing={4} direction="row" align="center">
            <Button colorScheme="teal" size="md">
              Fund
            </Button>
            <Button colorScheme="teal" size="md">
              Found
            </Button>
          </Stack>
          <Box><Link href="#">Learn More</Link></Box>
        </div>
        <Card
          title="Project"
          description="description"
          imageUrl="https://picsum.photos/500/300"
          imageAlt="The alt of the image"
        />
      </main>
    </Layout>
  )

export default Home