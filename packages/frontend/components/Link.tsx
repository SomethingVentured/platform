import { Link as ChakraLink } from '@chakra-ui/react'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import React from 'react'

type Props = Omit<
  React.ComponentProps<typeof ChakraLink>,
  keyof NextLinkProps
> & NextLinkProps

export const Link: React.FC<Props> = ({
  href,
  isExternal,
  children,
  as,
  ...props
}): JSX.Element => {
  if (isExternal && typeof href === 'string') {
    return (
      <ChakraLink isExternal href={href} {...props}>
        {children}
      </ChakraLink>
    )
  }

  return (
    <NextLink href={href} as={as} passHref>
      <ChakraLink {...props}>{children}</ChakraLink>
    </NextLink>
  )
}