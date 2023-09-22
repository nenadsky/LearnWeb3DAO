const hre = require("hardhat");
require("dotenv").config({ path: ".env" });

async function main() {
  // URL from where we can extract the metadata for a LW3Punks
  const metadataURL = "ipfs://QmYc15Cg9mv5UMnmC31oR4usXJs35n7Bn3DDWtfy9fyYV3";
  //const metadataURL = "https://gray-judicial-silverfish-820.mypinata.cloud/ipfs/QmYc15Cg9mv5UMnmC31oR4usXJs35n7Bn3DDWtfy9fyYV3/";
  /*
  DeployContract in ethers.js is an abstraction used to deploy new smart contracts,
  so lw3PunksContract here is a factory for instances of our LW3Punks contract.
  */
  // here we deploy the contract
 const lw3PunksContract = await hre.ethers.deployContract("LW3Punks", [
   metadataURL
 ]);

  await lw3PunksContract.waitForDeployment();

 // print the address of the deployed contract
  console.log("LW3Punks Contract Address:", lw3PunksContract.target);
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });