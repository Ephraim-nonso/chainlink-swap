import { ethers } from "hardhat";

async function token() {
  const TMarket = await ethers.getContractFactory("TokenMarket");
  const token = await TMarket.deploy();

  await token.deployed();

  console.log(
    "Token balance is",
    await token.checkTokenBalance(
      "0x90bdF238674569684a34F3AF8a3F55f08088bc98",
      "0x3887701c7f565367ec8cf441d9847c8552960856"
    )
  );
}

token().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
