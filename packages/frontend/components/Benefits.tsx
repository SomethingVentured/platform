import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import React, { ReactNode } from 'react'

type BenefitsType = {
  type: string
}

export const Benefits: React.FC<BenefitsType> = ({type}) => (
      <Container maxW="5xl" zIndex={10} position="relative">
        <Stack direction={{ base: 'column', lg: 'row' }}>
          <Stack
            flex={1}
            color="gray.400"
            justify={{ lg: 'center' }}
            py={{ base: 4, md: 20, xl: 36 }}>
            <Box mb={{ base: 8, md: 10 }}>
              <Text
                fontFamily="heading"
                fontWeight={700}
                textTransform="uppercase"
                mb={[0, 3]}
                fontSize={{base: 'sm', lg: 'xl'}}
                color="green.500">
                {type === 'fundee' ? 'Get funded' : 'Get funding'}
              </Text>
              <Heading
                color="green.700"
                mb={5}
                fontSize={{ base: '3xl', md: '5xl' }}>
                {type === 'fundee' ? 'Get your project funded' : 'Help fund a project'}
              </Heading>
              <Text fontSize={{base: 'xs', lg: 'xl'}} color="gray.500">
                Reprehenderit qui incididunt irure aliqua proident ex. Officia tempor ut esse duis reprehenderit veniam minim minim ut culpa. Amet fugiat adipisicing ipsum ea commodo velit incididunt commodo amet consequat.
              </Text>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
              {(type === 'fundee' ? fundedStats : fundingStats).map((stat) => (
                <Box key={stat.title}>
                  <Text
                    fontFamily="Amatic SC"
                    fontSize={{base: 'xl', lg: '4xl'}}
                    color="green.700"
                    mb={0}>
                    {stat.title}
                  </Text>
                  <Text fontSize={{base: 'sm', lg: 'xl'}} color="gray.600">
                    {stat.content}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
        </Stack>
      </Container>
)


const StatsText = ({ children }: { children: ReactNode }) => (
  <Text as="span" fontWeight={700} color="green.500">
    {children}
  </Text>
)

const fundedStats = [
  {
    title: 'Investors',
    content: (
      <>
        <StatsText>Kickstart your project</StatsText> with your own token and liquidity from the start
      </>
    ),
  },
  {
    title: 'Community',
    content: (
      <>
        <StatsText>Successful enterprises</StatsText> are nothing without a strong community of supporters
      </>
    ),
  },
  {
    title: 'Governance',
    content: (
      <>
        <StatsText>Create a DAO</StatsText> and have your community vote on impactful decisions.
      </>
    ),
  },
  {
    title: 'Rewards',
    content: (
      <>
        <StatsText>Maintain engagement</StatsText> and reward your most loyal supporters with perks and rewards.
      </>
    ),
  },
]

const fundingStats = [
  {
    title: 'Invest',
    content: (
      <>
        <StatsText>Help a new project</StatsText> get off the ground by buying tokens.
      </>
    ),
  },
  {
    title: 'Community',
    content: (
      <>
        <StatsText>The best thing</StatsText>, better than bags of money, is community.
      </>
    ),
  },
  {
    title: 'Governance',
    content: (
      <>
        <StatsText>Join the DAO</StatsText> for the project and have a say in its direction.
      </>
    ),
  },
  {
    title: 'Rewards',
    content: (
      <>
        <StatsText>NFT & airdropped rewards</StatsText> for your loyalty to your backed projects.
      </>
    ),
  },
]