import { ChevronDownIcon, ChevronRightIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Collapse,
  Flex,
  Icon,
  IconButton,
  Image,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'

interface NavItem {
  label: string
  // eslint-disable-next-line react/no-unused-prop-types
  subLabel?: string
  // eslint-disable-next-line react/no-unused-prop-types
  children?: Array<NavChildren>
  href?: string
}

interface NavChildren {
  label: string
  subLabel?: string
  href?: string
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Fund',
    children: [
      {
        label: 'Fund a project',
        subLabel: 'Find projects to invest in',
        href: '#',
      },
      {
        label: 'Get funding',
        subLabel: 'Get funding & build a community for your project',
        href: '#',
      },
    ],
  },
  {
    label: 'About',
    children: [
      {
        label: 'How does it work',
        subLabel: 'Learn more about our platform',
        href: '#',
      },
      {
        label: 'Who we are',
        subLabel: 'A band of Web3 & DAO maxis',
        href: '#',
      },
    ],
  },
  // {
  //   label: 'Learn Design',
  //   href: '#',
  // },
  // {
  //   label: 'Hire Designers',
  //   href: '#',
  // },
]

const headerStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: ['100%', '100vw'],
  backdropFilter: 'blur(7px)',
  boxShadow: '0 0 8px rgba(0,0,0,0.4)',
  transition: 'all 0.2s ease',
  zIndex: 2000
}

export const Navbar = (): JSX.Element => {
  const { isOpen, onToggle } = useDisclosure()
  return (
    <Box className="header" sx={headerStyles} backgroundColor={isOpen ? 'white' : 'rgba(255,255,255, 0.8)'}>
      <Flex align="center" justifyContent="space-between" py={2} px={8}>
        <Flex flex={{ base: 1, md: 'auto' }} ml={{ base: -2 }} display={{ base: 'flex', md: 'none' }}>
          <IconButton
            variant="ghost"
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            aria-label="Toggle Navigation"
            onClick={onToggle}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }} align="center">
          <Link href="/">
            <Image src="/assets/logo.png" maxW="100px"/>
          </Link>
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack flex={{ base: 1, md: 0 }} justify="flex-end" direction="row" spacing={6}>
          <Button as="a" fontSize="xs" fontWeight={400} variant="link" href="#">
            Sign In
          </Button>
          <Button
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize="xs"
            fontWeight={600}
            color="white"
            bg="green.700"
            href="#"
            _hover={{
              bg: 'green.300',
            }}
          >
            Sign Up
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  )
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200')
  const linkHoverColor = useColorModeValue('gray.800', 'white')
  const popoverContentBgColor = useColorModeValue('white', 'gray.800')

  return (
    <Stack direction="row" spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger="hover" placement="bottom-start">
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? '#'}
                fontSize="sm"
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent border={0} boxShadow="xl" bg={popoverContentBgColor} p={4} rounded="xl" minW="sm">
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  )
}

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => (
  <Link
    href={href}
    role="group"
    display="block"
    p={2}
    rounded="md"
    _hover={{ bg: useColorModeValue('green.50', 'gray.900') }}
  >
    <Stack direction="row" align="center">
      <Box>
        <Text transition="all .3s ease" _groupHover={{ color: 'green.600' }} fontWeight={500}>
          {label}
        </Text>
        <Text fontSize="sm">{subLabel}</Text>
      </Box>
      <Flex
        transition="all .3s ease"
        transform="translateX(-10px)"
        opacity={0}
        _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
        justify="flex-end"
        align="center"
        flex={1}
      >
        <Icon color="green.600" w={5} h={5} as={ChevronRightIcon} />
      </Flex>
    </Stack>
  </Link>
)

const MobileNav = () => (
  <Stack bg={useColorModeValue('white', 'gray.800')} p={4} minH="100vh" display={{ md: 'none' }}>
    {NAV_ITEMS.map((navItem) => (
      <MobileNavItem key={navItem.label} {...navItem} />
    ))}
  </Stack>
)

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify="space-between"
        align="center"
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition="all .25s ease-in-out"
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle="solid"
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align="start"
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  )
}
