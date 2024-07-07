require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    localhost: {
      url: "http://localhost:8545", // Replace with your local network URL
      chainId: 31337, // Replace with your local network's Chain ID
    },
  }
};