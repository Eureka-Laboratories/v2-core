import { ethers } from "hardhat";

async function main() {
  console.log("Creating UniswapV2 pair...");

  // Factory address - update this with your deployed factory address
  const factoryAddress = process.env.FACTORY_ADDRESS || "";
  if (!factoryAddress) {
    throw new Error("Please set FACTORY_ADDRESS environment variable");
  }

  // Token addresses - update these with your token addresses
  const tokenA = process.env.TOKEN_A || "";
  const tokenB = process.env.TOKEN_B || "";
  
  if (!tokenA || !tokenB) {
    throw new Error("Please set TOKEN_A and TOKEN_B environment variables");
  }

  console.log("Factory address:", factoryAddress);
  console.log("Token A:", tokenA);
  console.log("Token B:", tokenB);

  // Get factory contract instance
  const UniswapV2Factory = await ethers.getContractFactory("UniswapV2Factory");
  const factory = UniswapV2Factory.attach(factoryAddress);

  // Check if pair already exists
  const existingPair = await factory.getPair(tokenA, tokenB);
  if (existingPair !== ethers.ZeroAddress) {
    console.log("Pair already exists at:", existingPair);
    return { pairAddress: existingPair };
  }

  // Create the pair
  console.log("Creating pair...");
  const tx = await factory.createPair(tokenA, tokenB);
  const receipt = await tx.wait();
  
  console.log("Transaction hash:", tx.hash);
  console.log("Gas used:", receipt?.gasUsed.toString());

  // Get the pair address
  const pairAddress = await factory.getPair(tokenA, tokenB);
  console.log("New pair created at:", pairAddress);

  // Get pair count
  const pairCount = await factory.allPairsLength();
  console.log("Total pairs:", pairCount.toString());

  return { pairAddress };
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
