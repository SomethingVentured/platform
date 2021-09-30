import {
  Box,
  Image
} from '@chakra-ui/react'
import React from 'react'

type ProjectProps = {
  imageUrl: string
  imageAlt: string
  title: string
  description: string
}

export const Card = ({ imageUrl, imageAlt, title, description }: ProjectProps) => (
  <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
    <Image src={imageUrl} alt={imageAlt} />

    <Box p="6">
      <Box
        mt="1"
        fontWeight="semibold"
        as="h4"
        lineHeight="tight"
        isTruncated
      >
        {title}
      </Box>

      <Box
        mt="1"
        as="p"
        lineHeight="tight"
        isTruncated
      >
        {description}
      </Box>
    </Box>
  </Box>
)