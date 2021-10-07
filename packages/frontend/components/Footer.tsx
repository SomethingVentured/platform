import { Box, chakra, Container, Stack, Text, useColorModeValue, VisuallyHidden } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'

const SocialButton = ({ children, label, href }: { children: ReactNode; label: string; href: string }) => (
  <chakra.button
    bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
    rounded="full"
    w={8}
    h={8}
    cursor="pointer"
    as="a"
    href={href}
    display="inline-flex"
    alignItems="center"
    justifyContent="center"
    transition="background 0.3s ease"
    _hover={{
      bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
    }}
  >
    <VisuallyHidden>{label}</VisuallyHidden>
    {children}
  </chakra.button>
)

export const Footer: React.FC = () => (
    <Box position="fixed" overflowY="visible" bottom={0} left={0} minW="100vw" zIndex={0}>
      <Container
        as={Stack}
        maxW="6xl"
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
        bg="rgba(255,255,255,0.7)" backdropFilter="blur(7px)"
        sx={{zIndex: 50}}
      >
        <Text>© 2021 SomethingVentured</Text>
        <Stack direction="row" spacing={6}>
          <SocialButton label="Twitter" href="#">
            <FaTwitter />
          </SocialButton>
          <SocialButton label="YouTube" href="#">
            <FaYoutube />
          </SocialButton>
          <SocialButton label="Instagram" href="#">
            <FaInstagram />
          </SocialButton>
        </Stack>
      </Container>
      <Box position="absolute" bottom={0} left={0} width="100vw" minH="700px" zIndex={0} opacity={0.2} sx={{
        backgroundImage: '/assets/page-bg-trees.jpg',
        backgroundPositionY: 'top',
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat'
      }} />
    </Box>
  )

