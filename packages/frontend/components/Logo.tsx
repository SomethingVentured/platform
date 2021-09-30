import { Box, Image } from '@chakra-ui/react'
import React from 'react'

export const Logo = (): JSX.Element => (
  <Box>
    <Image src="./assets/logo.png" w="100%" h="auto" maxW="162px" />
  </Box>
)