import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { readENV } from "./scripts/utils";

const config: HardhatUserConfig = {
  solidity: "0.8.30",
  networks: {
    hardhat: {
      gas: "auto",
      mining: {
        auto: true,
        interval: 0,
      }
    },
    ethereum: {
      url: "https://rpc.flashbots.net",
      accounts: [readENV("SK")],
      chainId: 1,
      gas: "auto",
      gasPrice: "auto",
      timeout: 20000, // 20 seconds 
    }
  },
  mocha: {
    // Turn on parallel mode
    parallel: true,
    // Number of “jobs” (worker processes) to spawn
    jobs: 10,
    // Timeout for each test
    timeout: 600000, // 60 seconds
  }
};

export default config;
