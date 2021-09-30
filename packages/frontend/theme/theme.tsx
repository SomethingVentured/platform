import { extendTheme } from '@chakra-ui/react'

export const svTheme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        color: 'gray.700',
        fontFamily: 'Ubuntu',
        width: '100%',
        maxWidth: '100vw',
        overflowX: 'hidden',
        position: 'relative',
        '.web3modal-modal-container': {
          zIndex: 2000,
        },
      },
      'h1, h2, h3, h4': {},
      // styles for the `a`
      a: {
        color: 'green.500',
        transition: 'color 0.2s ease',
        _hover: {
          color: 'yellow.800',
        },
      },
    },
  },
  components: {
    Heading: {
      baseStyle: {
        fontFamily: 'Abril Fatface, cursive',
        fontWeight: '500',
        lineHeight: 1.2,
      },
      // Styles for the size variations
      sizes: {
        xl: {
          mt: '50px',
          mb: 3,
        },
        '2xl': {
          mt: '50px',
          mb: 4,
        },
      },
      // Styles for the visual style variations
      variants: {
        brand: {
          fontFamily: 'Righteous',
        },
      },
      // The default `size` or `variant` values
      defaultProps: {},
    },
    // Button: {
    //   baseStyle: {
    //     backgroundColor: "white",
    //     borderRadius: 0,
    //     mb: 3
    //   }
    // }
  },
})