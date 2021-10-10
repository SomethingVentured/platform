import { HardhatUserConfig } from 'hardhat/config';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-solhint';
import '@typechain/hardhat';

const { alchemyAPIKey, deployerPrivateKey } = require('./env.json');

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        enabled: true,
        runs: 2000
      }
    }
  },
  typechain: {
    outDir: 'ts-types/contracts',
    target: 'ethers-v5'
  },
  // networks: {
  //   rinkeby: {
  //     url: `http://eth-rinkeby.alchemyapi.io/v2/${alchemyAPIKey}`,
  //     accounts: [deployerPrivateKey],
  //   },
  //   mainnet: {
  //     url: `https://eth-mainnet.alchemyapi.io/v2/${alchemyAPIKey}`,
  //     accounts: [deployerPrivateKey],
  //   },
  //   kovan: {
  //     url: `https://eth-kovan.alchemyapi.io/v2/${alchemyAPIKey}`,
  //     accounts: [],
  //   },
  //   hardhat: {
  //     forking: {
  //       url: `https://eth-mainnet.alchemyapi.io/v2/${alchemyAPIKey}`
  //     }
  //   }
  // }
};

export default config;