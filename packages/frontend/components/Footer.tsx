import { Box, chakra, Container, Stack, Text, useColorModeValue, VisuallyHidden } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { FaDiscord, FaTwitter, FaYoutube } from 'react-icons/fa'

const SocialButton = ({ children, label, href }: { children: ReactNode; label: string; href: string }) => (
  <chakra.button
    bg={useColorModeValue('none', 'green.700')}
    rounded="full"
    color="green.700"
    fontSize="22px"
    w={10}
    h={10}
    cursor="pointer"
    as="a"
    href={href}
    display="inline-flex"
    alignItems="center"
    justifyContent="center"
    transition="all 0.2s ease"
    _hover={{
      bg: 'green.700',
      color: 'white'
    }}
  >
    <VisuallyHidden>{label}</VisuallyHidden>
    {children}
  </chakra.button>
)

export const Footer: React.FC = () => (
  <Box position="fixed" overflowY="visible" bottom={0} left={0} minW="100vw" zIndex={100}>
    <Container
      as={Stack}
      pos="relative"
      height="75px"
      maxW="100vw"
      py={4}
      direction={{ base: 'column', md: 'row' }}
      spacing={4}
      justify={{ base: 'center', md: 'space-between' }}
      align={{ base: 'center', md: 'center' }}
      sx={{
        zIndex: 50,
        backgroundColor: 'rgba(255,255,255, 0.8)',
        backdropFilter: 'blur(7px)'
      }}
    >
      <Box as={Stack} direction="row" align="center" justify="space-between" mx="auto" width="100%" maxW="100vw" px={8} color="green.700">
        <Text>© 2021 SomethingVentured</Text>
        <Stack direction="row" spacing={3}>
          <SocialButton label="Discord" href="#">
            <FaDiscord />
          </SocialButton>
          <SocialButton label="Twitter" href="#">
            <FaTwitter />
          </SocialButton>
          <SocialButton label="YouTube" href="#">
            <FaYoutube />
          </SocialButton>
        </Stack>
      </Box>
    </Container>
  </Box>
)

