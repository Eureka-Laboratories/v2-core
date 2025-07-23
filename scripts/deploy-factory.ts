import { ethers } from "hardhat";

async function main() {

  console.log("Deploying UniswapV2Factory...");

  const UniswapV2Factory = await ethers.getContractFactory("UniswapV2Factory");
  const UniswapV2 = await UniswapV2Factory.deploy();

  await UniswapV2.waitForDeployment();

  console.log("UniswapV2Factory deployed to:", UniswapV2.target);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
