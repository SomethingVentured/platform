import { AspectRatio, Box, Button, Heading, HStack, Image, SimpleGrid, Tag, Text, VStack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Link from 'next/link'
import { FC } from 'react'
import { FiChevronDown } from 'react-icons/fi'

import { Benefits, Hero } from '../components'
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
  newProject?: boolean
}

type FundingInfoItemType = {
  value: string
  itemName: string
}


const Home: NextPage = () => (
  <Layout>
    <Box d="flex" flexFlow="row wrap" alignItems="center" width="100%" height="100%" minH="100vh">
      <Hero />
    </Box>
    <Box id="benefits" d="flex" flexFlow="column wrap" justifyContent="center" width="100%" minH="100vh">
      <SimpleGrid columns={{base: 1, lg: 2}} spacing={10} py={{base: '75px', xl: 'auto'}}>
        <Benefits type="fundee" />
        <Benefits type="funder" />
      </SimpleGrid>
      <Box textAlign="center" justifyContent="center" d="flex" width="100%" sx={{
        d: {base: 'none', md: 'initial'},
        'a, button, div': {
            fontSize: {base: '40px', xl: '60px'},
            transition: 'all 0.2s ease',
            _hover: {
              color: 'green.700',
              opacity: 0.09
            }
          }
        }}>        
        <Link href="/#highlights" passHref>
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
      <HighlightedItems items={highlightedProjects} />
    </Box>
  </Layout>
)
// eslint-disable-next-line import/no-default-export
export default Home


export const HighlightedItems: FC<ProjectsType> = ({ items }) => {
  const listItems = items.map((item) => (
    <Box key={`highlightedItem-${item.id}`} flex={{base: '0 0 100%', xl: '0 0 30%'}} width={{base: '100%', xl: '30%'}} mb={{base: 20, xl: 20}} sx={highlightedItemsStyles}>
      <AspectRatio maxW="360" ratio={16 / 9}>
        <Image src={item.image} />
      </AspectRatio>
      <Box mt={3} mb={5}>
        <Heading as="h3" sx={{
          fontSize: {base: '25px', xl: '30px'}
        }}><span>{item.title}</span> {item.newProject && <Box as="span" sx={{boxShadow: '1px 1px 1px rgba(0,0,0, 0.4)'}}>New</Box>}</Heading>
        <Text
          sx={{
            fontSize: {base: '14px', xl: '16px'},
            mb: 3,
          }}
        >
          {item.description}
        </Text>
        <Text
          sx={{
            fontSize: {base: '12px', xl: '14px'},
          }}
        >
          by <Link href={`/user/${item.id}`}>{item.owner}</Link>
        </Text>
      </Box>

      <HStack borderTop="2px solid gold" justify="space-between" borderColor="yellow.700" align="flex-start" textAlign="left" spacing={0} pt={5} mb={5}>
        <FundingInfoItem value={`${item.funding.pledged}`} itemName="Ξ pledged" />
        <FundingInfoItem value={`${item.funding.fundedPercent}`} itemName="% funded" />
        <FundingInfoItem value="2" itemName="days to go" />
      </HStack>

      <HStack>
        <Tag>{item.network}</Tag>
        <Tag>{item.daoType}</Tag>
      </HStack>
    </Box>
  ))
  return (
    <Box>
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
      <Box pt={{base: 0, xl: 20}} textAlign="center">
        <Button href="/" variant="cta" size="sm">View all projects</Button>
      </Box>
    </Box>
  )
}


export const FundingInfoItem: FC<FundingInfoItemType> = ({value, itemName}) => (
  <VStack sx={{
    'span:first-of-type': {
      color: 'green.800',
      fontFamily: 'heading',
      fontSize: ['30px','40px']
    }, 
    'span + span': {
      color: 'gray.400',
      fontSize: ['16px', '16px'],
      mt: '-0.5rem',
      textTransform: 'uppercase'
    }
  }}>
    <span>{value}</span> <span>{itemName}</span>
  </VStack>
)

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

const highlightedItemsStyles = {
  transition: 'all 0.3s ease-in',
  _hover: {
    transform: 'scale(1.02)'
  },
  'h3': {
    position: 'relative',
    width: '100%',
    '& > span + span': {
      position: 'absolute',
      backgroundColor: 'green.400',
      border: '1px solid green',
      borderColor: 'green.400',
      borderRadius: '50%',
      color: 'white',
      fontSize: '16px',
      fontFamily: 'Ubuntu',
      p: 4,
      right: 0,
      transform: 'rotate(15deg)',
      textTransform: 'uppercase',
    }
  }
}