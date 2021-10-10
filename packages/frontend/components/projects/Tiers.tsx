import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  InputGroup,
  InputLeftAddon,
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack
} from '@chakra-ui/react'
import { FC, ReactNode, useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa'

import { ProjectType } from './Card'

export function PriceWrapper({ children }: { children: ReactNode }) {
  return (
    <Box
      mb={4}
      bg="rgba(255,255,255,0.6)"
      backdropFilter="blur(5px)"
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: 'center', lg: 'flex-start' }}
      borderColor={useColorModeValue('gray.200', 'gray.500')}
      borderRadius="xl">
      {children}
    </Box>
  )
}

export const ThreeTierFunding = ({ venture }: { venture: Array<ProjectType> }) => (
    <Box id="tiers" py={12}>
      <VStack spacing={2} textAlign="center">
        <Heading as="h1" fontSize="4xl">
          Pick your rewards tier
        </Heading>
        <Text fontSize="lg" color="gray.500">
          We believe in fair launches, so there&apos;s tiers to suit novice investors and whales alike.
        </Text>
      </VStack>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        textAlign="center"
        justify="center"
        spacing={{ base: 4, lg: 10 }}
        py={10}>
        <PriceWrapper>
          <Box py={4} px={12}>
            <Text fontWeight="500" fontSize="2xl">
              Mini
            </Text>
            <HStack justifyContent="center">
              <Text fontSize="3xl" fontWeight="600">
                Ξ
              </Text>
              <Text fontSize="5xl" fontWeight="900">
                0.1
              </Text>
              <Text fontSize="5xl" color="gray.500">
                +
              </Text>
            </HStack>
          </Box>
          <VStack
            bg={useColorModeValue('gray.50', 'gray.700')}
            py={4}
            borderBottomRadius="xl">
            <List spacing={3} textAlign="start" px={12}>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Mini swag bag
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                T1 Funding Founder NFT
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                500 $TOKEN airdrop
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                69 $VENT airdrop
              </ListItem>
            </List>
            <Box w="80%" pt={7}>
              <FundVentureModal venture={venture} tier={1} />
            </Box>
          </VStack>
        </PriceWrapper>

        <PriceWrapper>
          <Box position="relative">
            <Box
              position="absolute"
              top="-16px"
              left="50%"
              style={{ transform: 'translate(-50%)' }}>
              <Text
                textTransform="uppercase"
                bg={useColorModeValue('yellow.300', 'yellow.700')}
                px={3}
                py={1}
                color={useColorModeValue('gray.900', 'gray.300')}
                fontSize="sm"
                fontWeight="600"
                rounded="xl">
                Most Popular
              </Text>
            </Box>
            <Box py={4} px={12}>
              <Text fontWeight="500" fontSize="2xl">
                Midi
              </Text>
              <HStack justifyContent="center">
                <Text fontSize="3xl" fontWeight="600">
                  Ξ
                </Text>
                <Text fontSize="5xl" fontWeight="900">
                  2
                </Text>
                <Text fontSize="5xl" color="gray.500">
                  +
                </Text>
              </HStack>
            </Box>
            <VStack
              bg={useColorModeValue('gray.50', 'gray.700')}
              py={4}
              borderBottomRadius="xl">
              <List spacing={3} textAlign="start" px={12}>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Midi swag bag
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  T2 Funding Founder NFT
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  10K $TOKEN airdrop
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  420 $VENT
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Physical product
                </ListItem>
              </List>
              <Box w="80%" pt={7}>
                <FundVentureModal venture={venture} tier={2} />
              </Box>
            </VStack>
          </Box>
        </PriceWrapper>
        <PriceWrapper>
          <Box py={4} px={12}>
            <Text fontWeight="500" fontSize="2xl">
              Maxi
            </Text>
            <HStack justifyContent="center">
              <Text fontSize="3xl" fontWeight="600">
                Ξ
              </Text>
              <Text fontSize="5xl" fontWeight="900">
                4
              </Text>
              {/* <Text fontSize="5xl" color="gray.500">

              </Text> */}
            </HStack>
          </Box>
          <VStack
            bg={useColorModeValue('gray.50', 'gray.700')}
            py={4}
            borderBottomRadius="xl">
            <List spacing={3} textAlign="start" px={12}>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Maxi swag bag 😱
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                T3 Funding Founder NFT
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                50K $TOKEN airdrop
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                1337 $VENT airdrop
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Custom phyical product
              </ListItem>
            </List>
            <Box w="80%" pt={7}>
              <FundVentureModal venture={venture} tier={3} />
            </Box>
          </VStack>
        </PriceWrapper>
      </Stack>
    </Box>
  )



type VentureType = {
  venture: Array<ProjectType>
  tier: number
}
export const FundVentureModal: FC<VentureType> = ({ venture, tier }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [depositAmount, setDepositAmount] = useState<number | string>(0)
  let tierName = ''
  let tokenDrop = ''
  let ventDrop = ''
  let depositMin = 0.1
  let depositMax = 1.999

  switch (tier) {
    case 1:
      tierName = 'Mini'
      tokenDrop = '500'
      ventDrop = '69'
      break
    case 2:
      tierName = 'Midi'
      tokenDrop = '10K'
      ventDrop = '420'
      depositMin = 2
      depositMax = 3.999
      break
    case 3:
      tierName = 'Maxi'
      tokenDrop = '50K'
      ventDrop = '1337'
      depositMin = 4
      depositMax = 7
      break
    default:
      break
  }

  return (
    <>
      <Button colorScheme="green" onClick={onOpen}>Fund</Button>

      <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
        <ModalOverlay backgroundColor="rgba(39, 103, 73,0.9)" sx={{
          backdropFilter: 'blur(8px)',
        }} />
        <ModalContent sx={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.6) 100%)',
          boxShadow: '0 0 15px rgba(0,0,0,0.5)'
        }}>
          <ModalHeader>
            <Text fontSize="xl" color="gray.700" textTransform="uppercase">{tierName} tier</Text>
            <Heading size="2xl" mt={0}>{venture[0]?.title}</Heading>
            <Text fontSize="md" fontWeight="normal" color="gray.600" maxW="3xl">{venture[0]?.description}</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack columns={2} justify="space-between" align="flex-start">
              <VStack
                align="start"
                py={4}
                flex="0 0 45%">
                <Box>
                  <Heading size="lg">Deposit</Heading>
                  <Text>If you&apos;re happy with the {tierName} tier and its rewards, enter the amount you wish to deposit and we will do the rest for you.</Text>
                </Box>
                <Box>
                  <VStack flex="1">
                    <FormControl id="title">
                      <FormLabel>Deposit amount</FormLabel>
                      <InputGroup width="100%">
                        {/* eslint-disable-next-line */}
                        <InputLeftAddon children="Ξ" />
                        <NumberInput step={0.1} value={depositAmount} defaultValue={depositMin} min={depositMin} max={depositMax} onChange={(valueString) => setDepositAmount(valueString)} flex={1}
                          keepWithinRange
                          clampValueOnBlur={false}>
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </InputGroup>
                      <Box pos="absolute" top={0} right={0}>{`$${(+depositAmount * 3600).toFixed(0)} ($3600/Ξ)`}</Box>
                    </FormControl>
                  </VStack>
                </Box>
              </VStack>
              <VStack
                py={4}
                flex="0 0 45%"
                align="start"
              >
                <Heading size="lg">You get</Heading>
                <List spacing={3} textAlign="start" >
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.600" />
                    Limited edition {tierName} tier swag 🎉
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.600" />
                    {tierName} Funding Founder NFT representing your invesment and giving you access to ongoing perks
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.600" />
                    {tokenDrop} $TOKEN airdrop
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.600" />
                    {ventDrop} $VENT
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.600" />
                    Physical product
                  </ListItem>
                </List>
              </VStack>
            </HStack>
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