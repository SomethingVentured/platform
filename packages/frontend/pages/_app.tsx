import type { AppProps } from 'next/app'

import { Chakra } from '../components/Chakra'
import { svTheme } from '../theme/theme'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Chakra theme={svTheme}>
      <Component {...pageProps} />
    </Chakra>
  )
}

// eslint-disable-next-line import/no-default-export
export default MyApp