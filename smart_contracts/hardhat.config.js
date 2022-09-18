require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
require("@nomiclabs/hardhat-web3");

const ALCHEMY_URL = process.env.ALCHEMY_URL 
const GOERLI_DEPLOYER = process.env.DEPLOYER_PK
const GOERLI_BUYER = process.env.RETAIL_PK
const EXPECTED_RECEIVER = process.env.RECIPIENT_PK
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat:{},
    goerli: {
      url: ALCHEMY_URL,
      accounts: [GOERLI_DEPLOYER, GOERLI_BUYER, EXPECTED_RECEIVER],
      allowUnlimitedContractSize: true,
      timeout: 2000000,
    },
    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      accounts: [GOERLI_DEPLOYER, GOERLI_BUYER, EXPECTED_RECEIVER],
    }
  },
  etherscan: {
    apiKey:"AVF1HEQMYAUXFYTJA376DX4VFSXE9NATW6",
  },
};
