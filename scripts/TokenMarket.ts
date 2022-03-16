import { Signer } from "ethers";
import { ethers, network } from "hardhat";

async function token() {
  const TMarket = await ethers.getContractFactory("TokenMarket");
  const token = await TMarket.deploy();

  await token.deployed();

  console.log("Token deeployed to this address:", token.address);

  const tokenA: string = "0x0f07d1164aeb85C6b5d8fA1256C26E45140fE40B";
  const tokenB: string = "0xAD87240465F2a41787B0d8704Fa01B61Bd9eC869";
  const swapAmt: number = 3000; //DAI to BNB
  const base: string = "0x777A68032a88E5A84678A77Af2CD65A7b3c0775a";
  const quote: string = "0x8993ED705cdf5e84D0a3B754b5Ee0e1783fcdF16";
  const swapFnc = await token.swap(tokenA, tokenB, swapAmt, base, quote);

  console.log(swapFnc);

  // const tr = "0xAD87240465F2a41787B0d8704Fa01B61Bd9eC869";
  // // Check for the token balance
  // const IERC = await ethers.getContractAt("IERC20", tr);
  // const signer: Signer = await ethers.getSigner(
  //   "0xc0d9caf133325be902e2d6ef12d6f349f6f7249d"
  // );

  // await network.provider.send("hardhat_setBalance", [
  //   "0xc0d9caf133325be902e2d6ef12d6f349f6f7249d",
  //   "0x1000",
  // ]);

  // const bal = await IERC.balanceOf(
  //   "0xf278331e5e22da877195f5d4f71642a63405d8a7"
  // );
  // console.log(bal);
}

token().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
