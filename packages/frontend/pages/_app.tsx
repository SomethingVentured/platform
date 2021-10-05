import type { AppProps } from 'next/app'

import { Chakra } from '../components/Chakra'
import { ConnectWeb3Provider } from '../components/web3'
import { svTheme } from '../theme/theme'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <Chakra theme={svTheme}>
      <ConnectWeb3Provider>
        <Component {...pageProps} />
      </ConnectWeb3Provider>
    </Chakra>
  )
}

// eslint-disable-next-line import/no-default-export
export default MyApp