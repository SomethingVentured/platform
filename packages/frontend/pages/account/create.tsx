import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    ButtonGroup,
    Checkbox,
    CheckboxGroup,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    InputGroup,
    InputLeftAddon,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Select,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
    Tab, TabList, TabPanel,
    TabPanels, Tabs, Text,
    VStack
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { FaEye, FaMoneyBillWave, FaRegCheckCircle } from 'react-icons/fa'

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
            <HeroHeading part1="Connect to start..." part2="" />
            <Box sx={{ button: { fontSize: 40 } }}>
                <ConnectButton />
            </Box>
        </Hero>
    </Box>
)


export const CreateProject: FC = () => {
    const { address } = useWeb3()
    const [fundingSliderValue, setFundingSliderValue] = useState(0)
    // eslint-disable-next-line
    const [fundingGoal, setFundingGoal] = useState<number | any>(0)
    // console.log('fundingGoal', fundingGoal)

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
                <Accordion colorScheme="green" background="linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 4%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.4) 96%, rgba(255,255,255,0) 100%)">


                    <AccordionItem>
                        <AccordionButton d="flex" flexFlow="row nowrap" alignItems="center" textAlign="left" border="1px solid" borderColor="green.700">
                            <ItemStatus />
                            <Box pl={6}>
                                <Heading size="md">Project Outline</Heading>
                                <Text fontSize="sm" color="gray.500">Name your project, describe project, tokenomics &amp; roadmap -  upload an image or video, and establish your project details.</Text>
                            </Box>
                        </AccordionButton>
                        <AccordionPanel py={10}>
                            <HStack columns={2} spacing={20} justify="space-between" align="flex-start" pb={10} mb={10} borderBottom="1px solid" borderBottomColor="gray.700">
                                <Box maxW="33%" fontSize="14px" color="gray.500" sx={{
                                    'p': {
                                        mb: 3
                                    }
                                }}>
                                    <Heading size="sm" color="gray.800">Project Title</Heading>
                                    <Text>Write a clear, brief title and subtitle to help people quickly understand your project. Both will appear on your project and pre-launch pages.</Text>
                                    <Text>Potential backers will also see them if your project appears on category pages, search results, or in emails we send to our community.</Text>
                                </Box>

                                <VStack flex="1">
                                    <FormControl id="project_title">
                                        <FormLabel>Title</FormLabel>
                                        <Input type="text" />
                                    </FormControl>
                                    <FormControl id="project_subtitle">
                                        <FormLabel>Subtitle</FormLabel>
                                        <Input type="text" />
                                    </FormControl>
                                </VStack>
                            </HStack>

                            <HStack columns={2} spacing={20} justify="space-between" align="flex-start" pb={10} mb={10} borderBottom="1px solid" borderBottomColor="gray.700">
                                <Box maxW="33%" fontSize="14px" color="gray.500" sx={{
                                    'p': {
                                        mb: 3
                                    }
                                }}>
                                    <Heading size="sm" color="gray.800">Project Category</Heading>
                                    <Text>Choose the category that most closely aligns with your project.</Text>
                                    <Text>Think of where backers may look to find it. Reach a more specific community by also choosing a subcategory. You’ll be able to change the category and subcategory even after your project is live.</Text>
                                </Box>
                                <VStack flex="1">
                                    <FormControl id="project_category">
                                        <FormLabel>Services</FormLabel>
                                        <Select placeholder="Select option">
                                            <option value="option1">Option 1</option>
                                            <option value="option2">Option 2</option>
                                            <option value="option3">Option 3</option>
                                        </Select>
                                    </FormControl>
                                    <FormControl id="project_subcategory">
                                        <FormLabel>Sub category</FormLabel>
                                        <Select placeholder="Select option">
                                            <option value="option1">Option 1</option>
                                            <option value="option2">Option 2</option>
                                            <option value="option3">Option 3</option>
                                        </Select>
                                    </FormControl>
                                </VStack>
                            </HStack>

                            <HStack columns={2} spacing={20} justify="space-between" align="flex-start" pb={10} mb={10} borderBottom="1px solid" borderBottomColor="gray.700">
                                <Box maxW="33%" fontSize="14px" color="gray.500" sx={{
                                    'p': {
                                        mb: 3
                                    }
                                }}>
                                    <Heading size="sm" color="gray.800">Project Tokenomics</Heading>
                                    <Text>Add an Image or PDF of your current or planned Tokenomic infrastructure. </Text>
                                </Box>
                                <VStack flex="1">
                                    <FormControl id="title">
                                        <FormLabel>Upload file</FormLabel>
                                        <Input type="file" />
                                    </FormControl>
                                </VStack>
                            </HStack>

                            <HStack columns={2} spacing={20} justify="space-between" align="flex-start" pb={10} mb={10} borderBottom="1px solid" borderBottomColor="gray.700">
                                <Box maxW="33%" fontSize="14px" color="gray.500" sx={{
                                    'p': {
                                        mb: 3
                                    }
                                }}>
                                    <Heading size="sm" color="gray.800">Project Roadmap</Heading>
                                    <Text>Add an image that clearly represents your Project Roadmap. Choose one that looks good at different sizes - it’ll appear on your project page.</Text>
                                    <Text>Your image should be at least 1024x576 pixels. It will be cropped to a 16:9 ratio.</Text>
                                </Box>
                                <VStack flex="1">
                                    <FormControl id="title">
                                        <FormLabel>Upload file</FormLabel>
                                        <Input type="file" />
                                    </FormControl>
                                </VStack>
                            </HStack>

                            <HStack columns={2} spacing={20} justify="space-between" align="flex-start" pb={10} mb={10} borderBottom="1px solid" borderBottomColor="gray.700">
                                <Box maxW="33%" fontSize="14px" color="gray.500" sx={{
                                    'p': {
                                        mb: 3
                                    }
                                }}>
                                    <Heading size="sm" color="gray.800">Project Video Optional</Heading>
                                    <Text>Add an image that clearly represents your Project Roadmap. Choose one that looks good at different sizes - it’ll appear on your project page.</Text>
                                    <Text>Your image should be at least 1024x576 pixels. It will be cropped to a 16:9 ratio.</Text>
                                </Box>
                                <VStack flex="1">
                                    <FormControl id="title">
                                        <FormLabel>Upload file</FormLabel>
                                        <Input type="file" />
                                    </FormControl>
                                </VStack>
                            </HStack>

                            <HStack columns={2} spacing={20} justify="space-between" align="flex-start" pb={10} mb={10} borderBottom="1px solid" borderBottomColor="gray.700">
                                <Box maxW="33%" fontSize="14px" color="gray.500" sx={{
                                    'p': {
                                        mb: 3
                                    }
                                }}>
                                    <Heading size="sm" color="gray.800">Target launch date</Heading>
                                    <Text>Enter a date when you plan to launch — you can always return to this after you’ve built out more of your Kickstarter project page.</Text>
                                    <Text>We won’t automatically launch your project.</Text>
                                </Box>
                                <VStack flex="1">
                                    <FormControl id="title">
                                        <FormLabel>Select a date</FormLabel>
                                        <Input type="date" />
                                    </FormControl>
                                </VStack>
                            </HStack>

                            <HStack columns={2} spacing={20} justify="space-between" align="flex-start" pb={10} mb={10} borderBottom="0 solid" borderBottomColor="gray.700">
                                <Box maxW="33%" fontSize="14px" color="gray.500" sx={{
                                    'p': {
                                        mb: 3
                                    }
                                }}>
                                    <Heading size="sm" color="gray.800">Campaign duration</Heading>
                                    <Text>Set a time limit for your campaign. You won’t be able to change this after you launch.</Text>
                                </Box>
                                <VStack flex="1" >
                                    <FormControl id="title">
                                        {/* <FormLabel>Upload file</FormLabel> */}
                                        <CheckboxGroup colorScheme="green">
                                            <VStack align="left">
                                                <Checkbox>Fixed number of days (1 - 60)</Checkbox>
                                                <Checkbox>End on a specific date &amp; time</Checkbox>
                                            </VStack>
                                        </CheckboxGroup>
                                    </FormControl>
                                </VStack>
                            </HStack>
                        </AccordionPanel>
                    </AccordionItem>


                    <AccordionItem>
                        <AccordionButton d="flex" flexFlow="row nowrap" alignItems="center" textAlign="left" border="1px solid" borderColor="green.700">
                            <ItemStatus />
                            <Box pl={6}>
                                <Heading size="md">Funding</Heading>
                                <Text fontSize="sm" color="gray.500">Build out a budget and calculate your financial goals.</Text>
                            </Box>
                        </AccordionButton>
                        <AccordionPanel py={10}>
                            <HStack columns={2} spacing={20} justify="space-between" align="flex-start" pb={10} mb={10} borderBottom="1px solid" borderBottomColor="gray.700">
                                <Box maxW="33%" fontSize="14px" color="gray.500" sx={{
                                    'p': {
                                        mb: 3
                                    }
                                }}>
                                    <Heading size="sm" color="gray.800">Funding composition</Heading>
                                    <Text>Determine the various costs to bring your project to life with our Google Sheets template.</Text>
                                </Box>

                                <VStack flex="1" spacing={0}>
                                    <Box d="flex" flexFlow="row nowrap" width="100%" textAlign="center">
                                        <Box width={`${fundingSliderValue}%`} minW="4%" fontSize="sm">{`${fundingSliderValue}%`}</Box>
                                        <Box width={`${100 - fundingSliderValue}%`} />
                                    </Box>
                                    <Slider
                                        aria-label="slider-ex-3"
                                        defaultValue={0}
                                        orientation="horizontal"
                                        minH="10"
                                        value={fundingSliderValue}
                                        colorScheme="green"
                                        onChange={(val) => setFundingSliderValue(val)}
                                    >
                                        <SliderTrack backgroundColor="green.400">
                                            <SliderFilledTrack backgroundColor="green.600" />
                                        </SliderTrack>
                                        <SliderThumb boxSize={6}>
                                            <Box color="green.700" as={FaMoneyBillWave} />
                                        </SliderThumb>
                                    </Slider>
                                    <Box d="flex" flexFlow="row nowrap" alignContent="center" justifyContent="space-between" pt={10} textAlign="left" width="100%" sx={{
                                        em: {
                                            color: 'green.500',
                                            fontStyle: 'normal'
                                        }
                                    }}>
                                        <Text flex="0 0 auto">Are you sure you want to raise <em>{`${fundingSliderValue}%`}</em> in Seed Capital?</Text>
                                        <ButtonGroup flex="0 1 30%" colorScheme="green" justifyContent="flex-end" isAttached>
                                            <Button colorScheme="red" size="sm" onClick={() => setFundingSliderValue(0)}>No</Button>
                                            <Button size="sm">Yes</Button>
                                        </ButtonGroup>
                                    </Box>
                                </VStack>
                            </HStack>

                            <HStack columns={2} spacing={20} justify="space-between" align="flex-start" pb={10} mb={10} borderBottom="0px solid" borderBottomColor="gray.700">
                                <Box maxW="33%" fontSize="14px" color="gray.500" sx={{
                                    'p': {
                                        mb: 3
                                    }
                                }}>
                                    <Heading size="sm" color="gray.800">Funding goal</Heading>
                                    <Text>Set an achievable goal that covers what you need to complete your project.</Text>
                                </Box>
                                <VStack flex="1">
                                    <FormControl id="title">
                                        <FormLabel>Goal amount</FormLabel>
                                        <InputGroup width="100%">
                                            {/* eslint-disable-next-line */}
                                            <InputLeftAddon children="Ξ" />
                                            <NumberInput step={1} value={fundingGoal} defaultValue={5} min={1} max={20} onChange={(valueString) => setFundingGoal(valueString)} flex={1}
                                                keepWithinRange
                                                clampValueOnBlur={false}>
                                                <NumberInputField />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>
                                        </InputGroup>
                                        <Box pos="absolute" top={0} right={0}>{`$${fundingGoal * 3200} ($3200/Ξ)`}</Box>
                                    </FormControl>
                                </VStack>
                            </HStack>

                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionButton d="flex" flexFlow="row nowrap" alignItems="center" textAlign="left" border="1px solid" borderColor="green.700">
                            <ItemStatus />
                            <Box pl={6}>
                                <Heading size="md">Rewards</Heading>
                                <Text fontSize="sm" color="gray.500">Set your  OnChain rewards.</Text>
                            </Box>
                        </AccordionButton>
                        <AccordionPanel>
                            <Tabs colorScheme="yellow">
                                <TabList>
                                    <Tab>Reward tiers</Tab>
                                    <Tab>Add-ons</Tab>
                                    <Tab>Items</Tab>
                                </TabList>

                                <TabPanels>
                                    <TabPanel>
                                        <Box classNAme="explain">
                                            <Text fontSize="sm">Most creators offer 3-10 reward tiers, which can be physical items or special experiences. Make sure to set reasonable backer expectations.</Text>
                                        </Box>
                                        <VStack justify="space-between" align="flex-start" mt={10} >
                                            <Box className="tierPanel">
                                                <Text>Example: Access control</Text>
                                            </Box>
                                        </VStack>
                                    </TabPanel>
                                    <TabPanel>
                                        <p>two!</p>
                                    </TabPanel>
                                    <TabPanel>
                                        <p>three!</p>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionButton d="flex" textAlign="left" flexFlow="row nowrap" alignItems="center" border="1px solid" borderColor="green.700">
                            <ItemStatus />
                            <Box pl={6}>
                                <Heading size="md">Story</Heading>
                                <Text fontSize="sm" color="gray.500">Add a detailed project description and convey your risks and challenges.</Text>
                            </Box>
                        </AccordionButton>
                        <AccordionPanel />
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionButton d="flex" flexFlow="row nowrap" alignItems="center" textAlign="left" border="1px solid" borderColor="green.700">
                            <ItemStatus />
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
    complete?: boolean
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
