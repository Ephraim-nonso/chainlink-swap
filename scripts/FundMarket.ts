import { ethers } from "hardhat";

// Holders.
const BNBHolder = "0x743F382Ae4d557F74e7180A5db0FEd7c703c8144";
const DAIHolder = "0x8639d7a9521aedf18e5dc6a14c1c5cc1bfbe3ba0";

// Token contracts.
const DAIContract = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
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
  const token2 = await ethers.getContractAt("IERC20", DAIContract);

  // Get and impersonate holder of the toBeReceived Token inorder to fund Token Market.
  const signer = await ethers.getSigner(DAIHolder);
  await prank(DAIHolder);

  // Fund contract.
  await token2
    .connect(signer)
    .transfer(market.address, "10633146002348112500000");

  // Check balances of transferred funds.
  console.log(await con.balanceOf(market.address));
  console.log(await token2.balanceOf(market.address));
  console.log(await token2.balanceOf(DAIHolder));
}

// Error handling.
FundTokenMarket().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
