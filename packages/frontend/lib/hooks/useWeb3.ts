import { useContext } from 'react'

import { ConnectWeb3Context, ConnectWeb3ContextType } from '../../components/web3'


export const useWeb3 = (): ConnectWeb3ContextType => useContext(ConnectWeb3Context)