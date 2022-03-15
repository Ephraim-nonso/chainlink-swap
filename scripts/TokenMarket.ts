import { ethers } from "hardhat";

async function token() {
  const TMarket = await ethers.getContractFactory("TokenMarket");
  const token = await TMarket.deploy();

  await token.deployed();
}

token().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
