import WalletConnectProvider from '@walletconnect/web3-provider'
import { ethers, providers } from 'ethers'
import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState} from 'react'
import Web3Modal from 'web3modal'

import { CONFIG } from '../../config'
import { clearWalletConnect } from '../../lib/auth'

// const walletconnectKey = 'walletconnect';
// const mobileLinkChoiceKey = 'WALLETCONNECT_DEEPLINK_CHOICE';
// const injectedWalletKey = "WEB3_CONNECT_CACHED_PROVIDER";
declare const window: any
export let provider: any
export let web3: any
export let accounts: any

export type ConnectWeb3ContextType = {
  provider: providers.Web3Provider | null
  onClickConnect: () => Promise<void>
  onClickDisconnect: () => void
  isConnecting: boolean
  isConnected: boolean
  address: string | null
  modalOpen: boolean
}

interface ConnectWeb3ProviderOptions {
  children: React.ReactElement
}


export function ConnectWeb3Provider({ children }: ConnectWeb3ProviderOptions) {
  const [provider, setProvider] = useState<providers.Web3Provider | null>(null)
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [isConnecting, setIsConnecting] = useState<boolean>(false)
  const [address, setAddress] = useState<string | null>(null)
  const [modalOpen] = useState(false)

  const calledOnce = useRef<boolean>(false)

  const onClickDisconnect = useCallback(async () => {
    if (web3Modal === false) return
    accounts = null
    web3Modal.clearCachedProvider()
    clearWalletConnect()
    setAddress(null)
    setProvider(null)
    setIsConnecting(false)
    setIsConnected(false)
    console.log('Web3 disconnected...')
  }, [])

  const onClickConnect = useCallback(async () => {
    if (web3Modal === false) return
    setIsConnecting(true)
    console.log('Web3 Connecting...')

    try {
      const web3Provider = await web3Modal.connect()
      web3Provider && console.log('web3 provider ready...')

      const ethersProvider = new ethers.providers.Web3Provider(web3Provider)
      ethersProvider && setProvider(ethersProvider)

      console.log('Getting your address...')
      const ethAddress = await ethersProvider.getSigner().getAddress()
      ethAddress && console.info('address obtained, web3 set: ', ethAddress)

      ethAddress && setAddress(ethAddress)
      setIsConnecting(false)
      setIsConnected(true)
    } catch (error) {
      console.log(error) // eslint-disable-line no-console
      setIsConnecting(false)
      setIsConnected(false)
      onClickDisconnect()
    }
  }, [onClickDisconnect])

  useEffect(() => {
    if (calledOnce.current) return
    calledOnce.current = true

    if (web3Modal === false) return
    if (web3Modal.cachedProvider) {
      onClickConnect().catch(() => undefined)
    }
  }, [onClickConnect])

  return (
    <ConnectWeb3Context.Provider
      value={{
        provider,
        onClickConnect,
        onClickDisconnect,
        isConnected,
        isConnecting,
        address,
        modalOpen
      }}
    >
      {children}
    </ConnectWeb3Context.Provider>
  )
}

export const ConnectWeb3Context = createContext<ConnectWeb3ContextType>({
  provider: null,
  onClickConnect: async () => {},
  onClickDisconnect: () => undefined,
  isConnecting: false,
  isConnected: false,
  address: null,
  modalOpen: false
})

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: CONFIG.infuraId
    }
  }
}

const web3Modal = 
  typeof window !== 'undefined' &&
  new Web3Modal({
    network: 'mumbai',
    cacheProvider: true,
    providerOptions
  })