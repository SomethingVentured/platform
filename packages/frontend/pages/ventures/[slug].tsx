import {
    AspectRatio, Box, Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    HStack,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FC, useRef } from 'react'

import { Hero, HeroBody, HeroHeading } from '../../components'
import { Layout } from '../../components/Layout'
// import Lend from '../../components/lend'
import { highlightedProjects } from '../../components/projects'
import { ProjectType } from '../../components/projects/Card'
// import { useWeb3 } from '../../lib/hooks'



const VentureDetail: NextPage = () => {
    const router = useRouter()
    const { slug } = router.query
    const venture: Array<ProjectType> = highlightedProjects.filter((v) => v.slug === slug && v)
    // console.log(venture)

    return (
        <Layout>
            <Box d="flex" flexFlow="row wrap" alignItems="center" width="100%" height="auto">
                <Hero>
                    {venture ? (
                        <>
                            <AspectRatio maxW="5xl" ratio={16 / 9}>
                                <Image src={venture[0]?.image} />
                            </AspectRatio>
                            <HeroHeading part1={venture[0]?.title} part2={`By ${venture[0]?.owner}`} />
                            <HeroBody content={venture[0]?.description} />
                            <HStack justify="center">
                                <FundVentureModal venture={venture} />
                                <FundingDrawer venture={venture} />
                            </HStack>
                        </>
                    ) : (
                        <Box>Not found</Box>
                    )}
                </Hero>
            </Box>
        </Layout>
    )
}
// eslint-disable-next-line import/no-default-export
export default VentureDetail

type VentureType = {
    venture: Array<ProjectType>
}
export const FundVentureModal: FC<VentureType> = ({ venture }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button colorScheme="green" onClick={onOpen}>Fund this venture (Modal style)</Button>

            <Modal isOpen={isOpen} onClose={onClose} size="3xl" isCentered>
                <ModalOverlay backgroundColor="rgba(39, 103, 73,0.9)" sx={{
                    backdropFilter: 'blur(8px)',
                }} />
                <ModalContent sx={{
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.4) 100%)',
                    boxShadow: '0 0 15px rgba(0,0,0,0.5)'
                }}>
                    <ModalHeader>Funding {venture[0]?.title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box>Text</Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme="green">Confirm</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export const FundingDrawer: FC<VentureType> = ({ venture }) => {
    // const { selectedProvider, ethPrice } = useWeb3()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef<HTMLButtonElement>(null)

    return (
        <>
            <Button ref={btnRef} colorScheme="purple" onClick={onOpen}>
                Fund this venture (Drawer style)
            </Button>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
                colorScheme="green"
            >
                <DrawerOverlay backgroundColor="rgba(39, 103, 73,0.9)" sx={{
                    backdropFilter: 'blur(8px)',
                }} />
                <DrawerContent pt={16} maxW="3xl" sx={{
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.7) 100%)',
                    boxShadow: '0 0 15px rgba(0,0,0,0.5)'
                }}>
                    <DrawerCloseButton />
                    <DrawerHeader>Funding {`${venture[0]?.title}`}</DrawerHeader>

                    <DrawerBody>
                        {/* <Lend
                            selectedProvider={userProvider}
                            ethPrice={price} /> */}
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant="outline" colorScheme="red" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="green">Confirm</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}