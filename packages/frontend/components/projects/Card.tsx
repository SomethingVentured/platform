import { AspectRatio, Box, Heading, HStack, Image, Link, LinkBox, Tag, Text, VStack } from '@chakra-ui/react'
import NextLink from 'next/link'
import { FC } from 'react'

export type ProjectsType = {
  item: ProjectType
}

export type ProjectFundingType = {
  pledged: string
  fundedPercent: string
  deadline: string
}

export type ProjectType = {
  id: number
  title: string
  slug: string
  description: string
  owner: string
  image: string
  funding: ProjectFundingType
  network: string
  daoType: string
  newProject?: boolean
}

export type FundingInfoItemType = {
  value: string
  itemName: string
}

export const Card: FC<ProjectsType> = ({ item }) => (
  <NextLink href={`/ventures/${item.slug}`}>
    <LinkBox key={`highlightedItem-${item.id}`} flex={{ base: '0 0 100%', xl: '0 0 30%' }} width={{ base: '100%', xl: '30%' }} mb={{ base: 20, xl: 20 }} sx={highlightedItemsStyles}>

      <AspectRatio maxW="360" ratio={16 / 9}>
        <Image src={item.image} />
      </AspectRatio>
      <Box mt={3} mb={5}>
        <Heading as="h3" sx={{
          fontSize: { base: '25px', xl: '30px' }
        }}><span>{item.title}</span> {item.newProject && <Box as="span" sx={{ boxShadow: '1px 1px 1px rgba(0,0,0, 0.4)' }}>New</Box>}</Heading>
        <Text
          sx={{
            fontSize: { base: '14px', xl: '16px' },
            mb: 3,
          }}
        >
          {item.description}
        </Text>
        <Text
          sx={{
            fontSize: { base: '12px', xl: '14px' },
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
        <Tag >{item.daoType}</Tag>
      </HStack>
    </LinkBox>
  </NextLink>
)

export const FundingInfoItem: FC<FundingInfoItemType> = ({ value, itemName }) => (
  <VStack sx={{
    'span:first-of-type': {
      color: 'green.700',
      fontFamily: 'heading',
      fontSize: ['30px', '40px']
    },
    'span + span': {
      color: 'gray.500',
      fontSize: ['16px', '16px'],
      mt: '-0.5rem',
      textTransform: 'uppercase'
    }
  }}>
    <span>{value}</span> <span>{itemName}</span>
  </VStack>
)

const highlightedItemsStyles = {
  transition: 'all 0.3s ease-in',
  _hover: {
    cursor: 'pointer',
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