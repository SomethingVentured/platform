import { AspectRatio, Box, Heading, HStack, Image, Tag, Text, VStack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'

import { Hero } from '../components'
import { Layout } from '../components/Layout'

type ProjectsType = {
  items: Array<HighlightedProjectType>
}

type ProjectFundingType = {
  pledged: string
  fundedPercent: string
  deadline: string
}

type HighlightedProjectType = {
  id: number
  title: string
  description: string
  owner: string
  image: string
  funding: ProjectFundingType
  network: string
  daoType: string
}

export const highlightedProjects = [
  {
    id: 4201,
    title: 'BagsysBags',
    description:
      'Esse sint ut id fugiat adipisicing aliqua et. Commodo ipsum commodo cillum laborum. Laborum sit sint ipsum anim sint irure incididunt eu eiusmod consectetur quis mollit.',
    owner: 'BagsysBags',
    image: '/assets/highlights.png',
    funding: {
      pledged: '69', // currency in eth
      fundedPercent: '420',
      deadline: '1632921305', // unix epoch
    },
    network: 'Polygon',
    daoType: 'Service DAO',
  },
  {
    id: 4202,
    title: 'FearNothing',
    description:
      'Esse sint ut id fugiat adipisicing aliqua et. Commodo ipsum commodo cillum laborum. Laborum sit sint ipsum anim sint irure incididunt eu eiusmod consectetur quis mollit.',
    owner: 'Fearless',
    image: '/assets/highlights.png',
    funding: {
      pledged: '69', // currency in eth
      fundedPercent: '777',
      deadline: '1632921305', // unix epoch
    },
    network: 'Polygon',
    daoType: 'Service DAO',
  },
  {
    id: 4203,
    title: 'LuxuryLemurs',
    description:
      'Esse sint ut id fugiat adipisicing aliqua et. Commodo ipsum commodo cillum laborum. Laborum sit sint ipsum anim sint irure incididunt eu eiusmod consectetur quis mollit.',
    owner: 'lux',
    image: '/assets/highlights.png',
    funding: {
      pledged: '69', // currency in eth
      fundedPercent: '300',
      deadline: '1632921305', // unix epoch
    },
    network: 'Polygon',
    daoType: 'Service DAO',
  },
]

export const HighlightedItems: React.FC<ProjectsType> = ({ items }) => {
  const listItems = items.map((item) => (
    <Box key={`highlightedItem-${item.id}`} id="highlights" flex="0 0 30%" width="30%">
      <AspectRatio maxW="360" ratio={16 / 9}>
        <Image src={item.image} />
      </AspectRatio>
      <Box mt={3} mb={5}>
        <Heading as="h2">{item.title}</Heading>
        <Text
          sx={{
            mb: 3,
          }}
        >
          {item.description}
        </Text>
        <Text
          sx={{
            fontSize: '14px',
          }}
        >
          by <Link href={`/user/${item.id}`}>{item.owner}</Link>
        </Text>
      </Box>

      <VStack borderTop="2px solid gold" align="flex-start" textAlign="left" spacing="1" pt={5} mb={5}>
        <span>{item.funding.pledged} pledged</span>
        <span>{item.funding.fundedPercent}% funded</span>
        <span>2 days to go</span>
      </VStack>

      <HStack>
        <Tag>{item.network}</Tag>
        <Tag>{item.daoType}</Tag>
      </HStack>
    </Box>
  ))
  return (
    <Box
      className="hightlightedItems"
      d="flex"
      flexFlow={{ base: 'column wrap', xl: 'row nowrap' }}
      justifyContent="space-between"
      pt={6}
    >
      {listItems}
    </Box>
  )
}

const Home: NextPage = (): JSX.Element => (
  <Layout>
    <Box pt={6}>
      <Hero />
      <HighlightedItems items={highlightedProjects} />
    </Box>
  </Layout>
)
// eslint-disable-next-line import/no-default-export
export default Home