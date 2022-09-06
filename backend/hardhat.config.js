require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",

  networks: {
    localhost: {
      url: 'http://localhost:8545',
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/3f834f69b8c3428bb3cfdc42bbfa58f4",
      accounts: ["9929b7ca89badbd90bd34f9732c30fdf3af660dcd48749ede4534feaacfd7382"],
    },
  }
};

// INFURA_ID="3f834f69b8c3428bb3cfdc42bbfa58f4"
// PRIVATE_KEY="9929b7ca89badbd90bd34f9732c30fdf3af660dcd48749ede4534feaacfd7382"

//npx hardhat run scripts/deplpy_1.js  --network rinkeby
