import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,    Box,
    Heading,
    HStack,
    Text} from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { FaEye, FaRegCheckCircle } from 'react-icons/fa'

import { Hero, HeroHeading } from '../../components'
import { Layout } from '../../components/Layout'
import { ConnectButton } from '../../components/web3'
import { useWeb3 } from '../../lib/hooks'

const Create: NextPage = () => {
    const { provider, address, svUserAddress } = useWeb3()
    const router = useRouter()
    // console.log(provider?.network.chainId)

    const accountRedirect = () => {
        router.push('/account')
    }

    return (
        <Layout>
            {!provider && !address && <LoggedOut />}
            {provider && address === svUserAddress && accountRedirect()}
            {address && address !== svUserAddress && <CreateProject />}
        </Layout>
    )
}
// eslint-disable-next-line import/no-default-export
export default Create

export const LoggedOut: FC = () => (
    <Box d="flex" flexFlow="row wrap" alignItems="center" width="100%" height="auto">
        <Hero>
            <HeroHeading part1="Create venture..." part2="Connect to start..." />
            <Box sx={{ button: { fontSize: 40 } }}>
                <ConnectButton />
            </Box>
        </Hero>
    </Box>
)


export const CreateProject: FC = () => {
    const { address } = useWeb3()

    return (
        <Box id="createProject" d="flex" flexFlow="column wrap" justifyContent="center" alignItems="center" width="100%" height="auto">
            {/* <Hero>
                <HeroHeading part1="Project creation..." part2="Your journey begins now!" />
            </Hero> */}
            <Box width="100%" bgColor="rgba(39, 103, 73, 0.8)" backdropFilter="blur(7px)" boxShadow="0 -5px 5px rgba(0,0,0,0.3) inset" color="white" py={10} mb={10}>
                <Box width="100%" maxW="5xl" mx="auto">
                    <Box className="projectHeading">
                        <Heading size="lg">Unnamed project</Heading>
                        <Text>By {`${address?.substr(0, 8,)}`}</Text>
                        <Box as="span" d="inline-flex" alignItems="center">
                            <FaEye fontSize="md" /> <Box as="span" ml={1}>Preview</Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box className="steps" width="100%" maxW="5xl">
                <Accordion>
                    <AccordionItem>
                        <AccordionButton d="flex" flexFlow="row nowrap" alignItems="center" textAlign="left" border="1px solid" borderColor="green.700">
                            <ItemStatus complete />
                            <Box pl={6}>
                                <Heading size="md">Project Outline</Heading>
                                <Text fontSize="sm" color="gray.500">Name your project, describe project, tokenomics &amp; roadmap -  upload an image or video, and establish your project details.</Text>
                            </Box>
                        </AccordionButton>
                        <AccordionPanel />
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionButton d="flex" flexFlow="row nowrap" alignItems="center" textAlign="left" border="1px solid" borderColor="green.700">
                            <ItemStatus complete />
                            <Box pl={6}>
                                <Heading size="md">Funding</Heading>
                                <Text fontSize="sm" color="gray.500">Build out a budget and calculate your financial goals.</Text>
                            </Box>
                        </AccordionButton>
                        <AccordionPanel />
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionButton d="flex" flexFlow="row nowrap" alignItems="center" textAlign="left" border="1px solid" borderColor="green.700">
                            <ItemStatus complete />
                            <Box pl={6}>
                                <Heading size="md">Rewards</Heading>
                                <Text fontSize="sm" color="gray.500">Set your  OnChain rewards.</Text>
                            </Box>
                        </AccordionButton>
                        <AccordionPanel />
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionButton d="flex" textAlign="left" flexFlow="row nowrap" alignItems="center" border="1px solid" borderColor="green.700">
                            <ItemStatus complete />
                            <Box pl={6}>
                                <Heading size="md">Story</Heading>
                                <Text fontSize="sm" color="gray.500">Add a detailed project description and convey your risks and challenges.</Text>
                            </Box>
                        </AccordionButton>
                        <AccordionPanel />
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionButton d="flex" flexFlow="row nowrap" alignItems="center" textAlign="left" border="1px solid" borderColor="green.700">
                            <ItemStatus complete />
                            <Box pl={6}>
                                <Heading size="md">DAO Infrastructure</Heading>
                                <Text fontSize="sm" color="gray.500">Edit your SomethingVentured profile and add collaborators.</Text>
                            </Box>
                        </AccordionButton>
                        <AccordionPanel />
                    </AccordionItem>
                </Accordion>
            </Box >

            <Box className="support" width="100%" maxW="100vw" bgColor="rgba(39, 103, 73, 0.8)" backdropFilter="blur(3px)" color="white" py={10} mt={10} >
                <Box maxW="5xl" mx="auto">
                    <Heading size="md">Support</Heading>
                    <HStack justify="space-between" align="stretch" mt={5}>
                        <Box border="1px solid white" p={5} flex="0 1 48%">
                            <Heading size="sm">Creator docs</Heading>
                            <Text fontSize="xs">Learn about everything from shipping to communicating with backers.</Text>
                        </Box>
                        <Box border="1px solid white" p={5} flex="0 0 48%">
                            <Heading size="sm">Creator Questions</Heading>
                            <Text fontSize="xs">Get more help with any step of the process.</Text>
                        </Box>
                    </HStack>
                </Box>
            </Box>
        </Box >
    )
}

type ItemStatusType = {
    complete: boolean | null
}
export const ItemStatus: FC<ItemStatusType> = ({ complete = false }) => (
    <Box sx={{
        color: complete ? 'green.500' : 'gray.500',
        fontSize: '50',
        fontWeight: '100'
    }}>
        <FaRegCheckCircle />
    </Box>
)