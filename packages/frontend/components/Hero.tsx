import {
  Box,
  Button,
  Container,
  createIcon,
  Heading,
  Icon,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
// import { keyframes } from '@emotion/react'
import React from 'react'
import { FiChevronDown } from 'react-icons/fi'

// const bounce = keyframes`
//   from, 20%, 53%, 80%, to {
//     transform: translate3d(0,0,0);
//   }

//   40%, 43% {
//     transform: translate3d(0, 20px, 0);
//   }

//   70% {
//     transform: translate3d(0, 15px, 0);
//   }

//   90% {
//     transform: translate3d(0,10px,0);
//   }
// `
// type ScrollObserverType = {
//   element: string
// }

// export const scrollObserver = (element: any) => {
//   const [scrolling, setScrolling] = useState(false)

//   typeof window === 'undefined' && false

//   const observer = new IntersectionObserver(entries => {
//     setScrolling(true);
//   });
//   return observer.observe(document.querySelector(element));
// }

// Tell the observer which elements to track

export const Hero: React.FC = () => (
    <>
      <Container className="hero" maxW={{base: '100%', xl: '3xl'}}>
        <Stack as={Box} textAlign="center" spacing={{ base: 8, md: 10 }} py={{ base: 0, md: 36 }}>
          <Heading fontWeight={600} fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }} lineHeight="110%">
            Something Ventured... <br />
            <Text as="span" color="green.700">
              Something Gained!
            </Text>
          </Heading>
          <Text color="gray.500" fontSize={{base: 'sm', xl: 'xl'}}>
            Find patrons for your DAO or Start-up. Build a community, give perks to reward loyal supporters and raise
            the capital you need to launch your project. Or, find a project to help get off the ground.
          </Text>
          <Stack direction="row" spacing={3} align="center" alignSelf="center" position="relative" color="green.800" overflow="visible">
            <Box position="absolute" top={0} left={0} d={{base: 'none', md: 'block'}}>
              <Icon
                as={Arrow}
                color={useColorModeValue('green.800', 'green.300')}
                w={71}
                position="absolute"
                left={-55}
                top="-20px"
                transform="scale(-1) rotate(10deg)"
              />
              <Text
                fontSize="3xl"
                fontFamily="Amatic SC"
                position="absolute"
                left="-85px"
                top="-10px"
                transform="rotate(-10deg)"
              >
                DAO it!
              </Text>
            </Box>
            <Button
              colorScheme="yellow"
              bg="yellow.800"
              color="white"
              rounded="full"
              size="sm"
              px={6}
              _hover={{
                bg: 'green.500',
              }}
            >
              Get Funded
            </Button>
            <Button
              colorScheme="green"
              bg="green.700"
              rounded="full"
              size="sm"
              px={6}
              _hover={{
                bg: 'green.500',
              }}
            >
              Get Funding
            </Button>
            <Box position="absolute" top={0} right={0} d={{base: 'none', md: 'block'}}>
              <Icon
                as={Arrow}
                color={useColorModeValue('green.800', 'green.300')}
                w={71}
                position="absolute"
                right={-71}
                top="10px"
              />
              <Text
                fontSize="3xl"
                fontFamily="Amatic SC"
                position="absolute"
                right="-100px"
                top="-30px"
                transform="rotate(10deg)"
              >
                Good feels!
              </Text>
            </Box>
          </Stack>
          <Stack direction="row" spacing={3} align="center" justifySelf="flex-end" alignSelf="center" position="relative">
            <Link href="#benefits" colorScheme="green" sx={{
              d: 'flex',
              color: 'green.600',
              justifyItems: 'flex-start',
              alignItems: 'center',
              flexFlow: 'column',
              fontFamily: 'Amatic SC',
              fontSize: {base: '40px', xl: '60px'},
              textAlign: 'center',
              transition: 'all 0.2s ease',
              _hover: {
                color: 'green.700',
                opacity: 0.09
              }
            }}>
              <Box>
                Learn more
              </Box>
              <Box sx={{
                // animation: `${bounce} 2s ease infinite`,
                color: 'green.500',
                fontSize: {base: '40px', lg: '60px'},
                mt: {base: 0, xl: 30},
                transform: 'translate3d(0 70px 0)' 
              }}><FiChevronDown /></Box>
            </Link>
          </Stack>
        </Stack>
      </Container>
    </>
  )

const Arrow = createIcon({
  displayName: 'Arrow',
  viewBox: '0 0 72 24',
  path: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.600904 7.08166C0.764293 6.8879 1.01492 6.79004 1.26654 6.82177C2.83216 7.01918 5.20326 7.24581 7.54543 7.23964C9.92491 7.23338 12.1351 6.98464 13.4704 6.32142C13.84 6.13785 14.2885 6.28805 14.4722 6.65692C14.6559 7.02578 14.5052 7.47362 14.1356 7.6572C12.4625 8.48822 9.94063 8.72541 7.54852 8.7317C5.67514 8.73663 3.79547 8.5985 2.29921 8.44247C2.80955 9.59638 3.50943 10.6396 4.24665 11.7384C4.39435 11.9585 4.54354 12.1809 4.69301 12.4068C5.79543 14.0733 6.88128 15.8995 7.1179 18.2636C7.15893 18.6735 6.85928 19.0393 6.4486 19.0805C6.03792 19.1217 5.67174 18.8227 5.6307 18.4128C5.43271 16.4346 4.52957 14.868 3.4457 13.2296C3.3058 13.0181 3.16221 12.8046 3.01684 12.5885C2.05899 11.1646 1.02372 9.62564 0.457909 7.78069C0.383671 7.53862 0.437515 7.27541 0.600904 7.08166ZM5.52039 10.2248C5.77662 9.90161 6.24663 9.84687 6.57018 10.1025C16.4834 17.9344 29.9158 22.4064 42.0781 21.4773C54.1988 20.5514 65.0339 14.2748 69.9746 0.584299C70.1145 0.196597 70.5427 -0.0046455 70.931 0.134813C71.3193 0.274276 71.5206 0.70162 71.3807 1.08932C66.2105 15.4159 54.8056 22.0014 42.1913 22.965C29.6185 23.9254 15.8207 19.3142 5.64226 11.2727C5.31871 11.0171 5.26415 10.5479 5.52039 10.2248Z"
      fill="currentColor"
    />
  ),
})
