const hre = require("hardhat");

const contractAddress = "0x831258C537f1819605367797D85e953F1351B37f";

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  // Deploy the CryptoDevs Contract
  const nftContract = await hre.ethers.deployContract("CryptoDevs", [contractAddress]);

  // wait for the contract to deploy
  await nftContract.waitForDeployment();

  // print the address of the deployed contract
  console.log("NFT Contract Address:", nftContract.target);

  // Sleep for 30 seconds while Etherscan indexes the new contract deployment
  await sleep(30 * 1000); // 30s = 30 * 1000 milliseconds

  // Verify the contract on etherscan
  await hre.run("verify:verify", {
    address: nftContract.target,
    constructorArguments: [contractAddress],
  });
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });