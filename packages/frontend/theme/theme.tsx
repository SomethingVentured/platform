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
        scrollBehavior: 'smooth',
        '.web3modal-modal-container': {
          zIndex: 2000,
        },
      },
      a: {
        color: 'green.400',
        transition: 'color 0.2s ease',
        _hover: {
          color: 'yellow.800',
          cursor: 'pointer',
        },
      },
      '#WEB3_CONNECT_MODAL_ID > div': {
        zIndex: 3000,
      }
    },
  },
  fonts: {
    heading: 'Abril Fatface, cursive',
    subHeading: 'Amatic SC',
    body: 'Ubuntu',
  },
  textStyles: {
    h3: {
      fontSize: {base: '16px', md: '20px'}
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
        sm: {
          fontFamily: 'body'
        },
        md: {
          fontFamily: 'body'
        },
        lg: {
          fontFamily: 'body'
        },
        xl: {
          mt: '10px',
          mb: 3,
        },
        '2xl': {
          color: 'green.700',
          mt: '25px',
          mb: 4,
        },
      },
      // Styles for the visual style variations
      variants: {
        secondary: {
          fontFamily: 'Amatic SC',
          fontWeight: '400'
        },
      },
      // The default `size` or `variant` values
      defaultProps: {},
    },
    Button: {
      variants: {
        cta: {
          color: 'green.600',
          fontFamily: 'Amatic SC',
          fontSize: {base: '40px', xl: '60px'},
          fontWeight: '400',
          transition: 'color 0.2s ease',
          _hover: {
            color: 'yellow.700'
          }
        },
        small: {
          color: 'green.500',
          fontFamily: 'body',
          fontSize: ['sm'],
          fontWeight: '500'
        }
      }
    },
    Link: {
      baseStyle: {
        transition: 'color 0.2s ease',
        _hover: {
          textDecoration: 'none',
        }
      }
    },
    Tag: {
      defaultProps: {
        colorScheme: 'green'
      },
      baseStyle: {
        color: 'white',
        backgroundColor: 'green.700'
      },
      variants: {
        venture: {
          color: 'white',
          backgroundColor: 'green.700'
        }
      }
    }
  },
})