import { Box, Button, Heading } from '@chakra-ui/react'
import NextLink from 'next/link'

import type { ProjectType } from './Card'
import { Card } from './Card'


export const ProjectGrid = ({ items = [] }: { items: Array<ProjectType> }) => {
    const listItems = items.map((item) => (
        <Card item={item} />
    ))

    return (
        <Box maxW="5xl" mx="auto">
            <Heading as="h2" size="2xl" variant="secondary">Check out the projects...</Heading>
            <Box
                className="hightlightedItems"
                d="flex"
                flexFlow={{ base: 'column wrap', xl: 'row nowrap' }}
                justifyContent="space-between"
                py={6}
            >
                {listItems}
            </Box>
            <Box pt={{ base: 0, xl: 20 }} textAlign="center">
                <NextLink href="/ventures">
                    <Button variant="cta" size="sm">View all projects</Button>
                </NextLink>
            </Box>
        </Box>
    )
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
      newProject: true,
    },
  ]

