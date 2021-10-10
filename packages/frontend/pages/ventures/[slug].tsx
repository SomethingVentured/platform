import {
    AspectRatio, Box, Heading,
    HStack,
    Image,
    Text} from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { Hero, HeroCTA } from '../../components'
import { Layout } from '../../components/Layout'
// import Lend from '../../components/lend'
import { highlightedProjects, ThreeTierFunding } from '../../components/projects'
import { FundingInfoItem,ProjectType } from '../../components/projects/Card'
// import { useWeb3 } from '../../lib/hooks'



const VentureDetail: NextPage = () => {
    const router = useRouter()
    const { slug } = router.query
    const venture: Array<ProjectType> = highlightedProjects.filter((v) => v.slug === slug && v)
    // console.log(venture)

    return (
        <Layout>
            <Box d="flex" flexFlow="column wrap" alignItems="center" width="100%" height="auto" sx={{
                '.hero': {
                    '& > .chakra-stack': {
                        pb: 14
                    }
                }
            }}>
                <Hero>
                    {venture ? (
                        <>
                            <AspectRatio maxW="5xl" ratio={16 / 9}>
                                <Image src={venture[0]?.image} />
                            </AspectRatio>
                            <Heading size="xl" mb={0}>
                                {venture[0]?.title}
                            </Heading>

                            <Text fontSize="lg" mt={1}>{venture[0]?.description}</Text>
                            <HStack justify="center">
                                <HeroCTA cta1Text="Fund this venture" cta1Url="#tiers" />
                                {/* <FundingDrawer venture={venture} /> */}
                            </HStack>

                            <HStack borderTop="2px solid gold" justify="space-between" borderColor="yellow.700" align="flex-start" textAlign="left" spacing={0} pt={5} mb={5}>
                                <FundingInfoItem value={`${venture[0]?.funding.pledged}`} itemName="Ξ pledged" />
                                <FundingInfoItem value={`${venture[0]?.funding.fundedPercent}`} itemName="% funded" />
                                <FundingInfoItem value="2" itemName="days to go" />
                            </HStack>
                        </>
                    ) : (
                        <Box>Not found</Box>
                    )}
                </Hero>
                <Box d="flex" flexFlow="column wrap" justifyContent="center" width="100%" maxW="3xl" height="auto">
                    <Text mb="6">Est ullamco labore anim deserunt. Lorem anim culpa sit elit eiusmod incididunt. Ut magna commodo enim consectetur amet pariatur ea. Sit tempor duis consequat culpa ex ad officia sit eu. Eiusmod qui cupidatat culpa consequat do irure cupidatat Lorem aliquip ex esse voluptate. Consectetur elit eiusmod pariatur anim dolor qui id ipsum ullamco reprehenderit eiusmod culpa. Veniam voluptate ullamco nulla voluptate nulla commodo eiusmod ex Lorem cillum nisi eu voluptate enim.</Text>
                    <Text>Est ullamco labore anim deserunt. Lorem anim culpa sit elit eiusmod incididunt. Ut magna commodo enim consectetur amet pariatur ea. Sit tempor duis consequat culpa ex ad officia sit eu. Eiusmod qui cupidatat culpa consequat do irure cupidatat Lorem aliquip ex esse voluptate. Consectetur elit eiusmod pariatur anim dolor qui id ipsum ullamco reprehenderit eiusmod culpa. Veniam voluptate ullamco nulla voluptate nulla commodo eiusmod ex Lorem cillum nisi eu voluptate enim.</Text>
                </Box>
                <ThreeTierFunding venture={venture} />
            </Box>
        </Layout>
    )
}
// eslint-disable-next-line import/no-default-export
export default VentureDetail



