import { ethers } from "hardhat";

// Holders.
const BNBHolder = "0x743F382Ae4d557F74e7180A5db0FEd7c703c8144";
const SUSHIHolder = "0xF296178d553C8Ec21A2fBD2c5dDa8CA9ac905A00";

// Token contracts.
const SUSHIContract = "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2";
const BNBContract = "0xB8c77482e45F1F44dE1745F52C74426C631bDD52";

async function prank(x: string) {
  //@ts-ignore
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [x],
  });
}

async function FundTokenMarket() {
  // Get the Token Market.
  const TokenMarket = await ethers.getContractFactory("TokenMarket");
  const market = await TokenMarket.deploy();
  await market.deployed();
  console.log(market.address);

  // Get ERC20 contracts.
  const con = await ethers.getContractAt("IERC20", BNBContract);
  const token2 = await ethers.getContractAt("IERC20", SUSHIContract);

  // Get and impersonate holder of the toBeReceived Token inorder to fund Token Market.
  const signer = await ethers.getSigner(SUSHIHolder);
  await prank(SUSHIHolder);

  // Fund contract.
  await token2
    .connect(signer)
    .transfer(market.address, "10633146002348112500000");

  // Check balances of transferred funds.
  console.log(await con.balanceOf(market.address));
  console.log(await token2.balanceOf(market.address));
  console.log(await token2.balanceOf(SUSHIHolder));
}

// Error handling.
FundTokenMarket().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
