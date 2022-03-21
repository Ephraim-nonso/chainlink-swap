import { Signer } from "ethers";
import { ethers } from "hardhat";

// Holders.
const BNBHolder = "0x0c2fd5c0d42ac0a29d2ccace37fae71b66cecccd";
const DAIHolder = "0x8639d7a9521aedf18e5dc6a14c1c5cc1bfbe3ba0";

// Token contracts.
const DAIContract = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const BNBContract = "0xB8c77482e45F1F44dE1745F52C74426C631bDD52";

// market contract
const marketContract = "0x40a42Baf86Fc821f972Ad2aC878729063CeEF403";

async function prank(x: string) {
  //@ts-ignore
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [x],
  });
}

async function main() {
  // @ts-ignore
  await hre.network.provider.send("hardhat_setBalance", [
    marketContract,
    "0x100000000000000000000000",
  ]);

  // IERC20
  const con = await ethers.getContractAt("IERC20", BNBContract);
  const token2 = await ethers.getContractAt("IERC20", DAIContract);
  const market = await ethers.getContractAt("TokenMarket", marketContract);

  await prank(BNBHolder);
  const signer = await ethers.getSigner(BNBHolder);
  // const signer = await ethers.getSigner(DAIHolder);

  const g = await con.connect(signer).balanceOf(market.address);
  // // await con.connect(signer).transfer(market.address, "36040000");
  console.log(g);
  // console.log(await con.balanceOf(market.address));
  // // console.log(await token2.balanceOf(market.address));
  // // console.log(await token2.address);

  await con.connect(signer).approve(marketContract, "1000");

  const exchange = await market
    .connect(signer)
    .swap(BNBContract, DAIContract, "1000");
  console.log(exchange);

  console.log(await token2.balanceOf(BNBHolder));
  console.log(g);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
