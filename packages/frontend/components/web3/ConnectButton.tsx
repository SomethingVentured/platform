import { Button } from '@chakra-ui/react'
import { FC } from 'react'

import { useWeb3 } from '../../lib/hooks'

export type ConnectButtonContextType = {
  onClickConnect: () => Promise<void>;
  onClickDisconnect: () => void;
  isConnecting: boolean;
  isConnected: boolean;
};

export const ConnectButton: FC = () => {
  const {
    onClickConnect,
    onClickDisconnect,
    isConnected,
    isConnecting,
  } = useWeb3()

  return (
    <>
      {isConnected ? (
        <>
          <Button className="disconnectBtn" colorScheme="green" variant="small" onClick={() => onClickDisconnect()}>Disconnect</Button>
        </>
      ) : (
          <>
            <Button className="connectBtn" colorScheme="green" isLoading={isConnecting} loadingText="Connecting..." variant="small" onClick={() => onClickConnect()}>
              {!isConnected && !isConnecting && 'Connect'}
          </Button>
          </>
      )}
    </>
  )
}
