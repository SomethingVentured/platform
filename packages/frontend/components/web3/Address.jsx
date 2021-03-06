import { Skeleton,Text } from '@chakra-ui/react'
import React from 'react'
import Blockies from 'react-blockies'
// import { useThemeSwitcher } from "react-css-theme-switcher";
// import { useEnsAddress } from 'eth-hooks/dapps'


const blockExplorerLink = (address, blockExplorer) =>
  `${blockExplorer || 'https://etherscan.io/'}${'address/'}${address}`

export function Address(props) {
  const { address, minimized, size, onChange, fontSize, blockExplorer} = props
  // const ens = useEnsAddress(props.ensProvider, address)

  // const { currentTheme } = useThemeSwitcher();

  if (!address) {
    return (
      <span>
        <Skeleton startColor="green.400" endColor="green.800" height="20px" />
      </span>
    )
  }

  let displayAddress = address.substr(0, 6)

  // const ensSplit = ens && ens.split('.')
  // const validEnsCheck = ensSplit && ensSplit[ensSplit.length - 1] === 'eth'

  if (size === 'short') {
    displayAddress += `...${  address.substr(-4)}`
  } else if (size === 'long') {
    displayAddress = address
  }

  const etherscanLink = blockExplorerLink(address, blockExplorer)
  if (minimized) {
    return (
      <span style={{ verticalAlign: 'middle' }}>
        <a
          // style={{ color: currentTheme === "light" ? "#222222" : "#ddd" }}
          target="_blank"
          href={etherscanLink}
          rel="noopener noreferrer"
        >
          <Blockies seed={address.toLowerCase()} size={8} scale={2} />
        </a>
      </span>
    )
  }

  let text
  if (onChange) {
    text = (
      <Text>
        <a
          // style={{ color: currentTheme === "light" ? "#222222" : "#ddd" }}
          target="_blank"
          href={etherscanLink}
          rel="noopener noreferrer"
        >
          {displayAddress}
        </a>
      </Text>
    )
  } else {
    text = (
      <Text>
        <a
          // style={{ color: currentTheme === "light" ? "#222222" : "#ddd" }}
          target="_blank"
          href={etherscanLink}
          rel="noopener noreferrer"
        >
          {displayAddress}
        </a>
      </Text>
    )
  }

  return (
    <span>
      <span style={{ verticalAlign: 'middle' }}>
        <Blockies
          seed={address.toLowerCase()}
          size={8}
          scale={fontSize ? fontSize / 7 : 4}
        />
      </span>
      <span
        style={{
          verticalAlign: 'middle',
          paddingLeft: 5,
          fontSize: fontSize || 28
        }}
      >
        {text}
      </span>
    </span>
  )
}
