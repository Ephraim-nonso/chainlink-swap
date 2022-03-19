import { ethers } from "hardhat";

// // base of LINK to ETH
// const LINKtoETH = "0xDC530D9457755926550b59e8ECcdaE7624181557";

const base = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419";
const quote = "0x2c1d072e956AFFC0D435Cb7AC38EF18d24d9127c";
const Linktoken = "0x514910771AF9Ca656af840dff83E8264EcF986CA";
const LinkHolder = "0xd360c6329215ec4d7d585f1d8f8c7c1c265be658";

const swapper = "0x3d2fb958376ee1ca22322b2c226666e414c3cfdd";

const con = "0xde2Bd2ffEA002b8E84ADeA96e5976aF664115E2c";

async function Token() {
  // const signer = await ethers.getSigner(LinkHolder);

  // const TokenToETH = await ethers.getContractFactory("PriceConsumerV3");
  // const tokenDerived = await TokenToETH.deploy();
  // await tokenDerived.deployed();
  // console.log("The Address is :", tokenDerived.address);
  const Link = await ethers.getContractAt("IERC20", Linktoken);
  const bal = await Link.balanceOf(con);
  console.log(bal);
  const signer2 = await ethers.getSigner(swapper);

  const contractAddr = await ethers.getContractAt(
    "PriceConsumerV3",
    con,
    signer2
  );

  // const balLink = await Link.balanceOf(LinkHolder);
  // console.log(balLink);

  // const balLink2 = await Link.balanceOf(tokenDerived.address);
  // console.log("Before transfer", balLink2);

  // @ts-ignore
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [swapper],
  });

  // //@ts-ignore
  // await network.provider.send("hardhat_setBalance", [
  //   LinkHolder,
  //   "0x1000000000000000000000000000",
  // ]);
  // await Link.connect(signer).transfer(tokenDerived.address, 10000000000);

  // const balLink3 = await Link.balanceOf(tokenDerived.address);
  // console.log("After transfer", balLink3);

  /// Testing of swapper function here.

  const returnETH = await contractAddr.swapETHToToken(
    base,
    quote,
    Linktoken,
    1
  );
  console.log(await returnETH.wait());

  const balLink = await Link.balanceOf(swapper);
  console.log("Swapper owns link of", balLink);

  // Get balance

  // //@ts-ignore
  // await network.provider.send("hardhat_setBalance", [
  //   tokenDerived.address,
  //   "0x2000000000000000000000000000000000",
  // ]);
  // //@ts-ignore
  // await network.provider.send("hardhat_setBalance", [
  //   Linktoken,
  //   "0x2000000000000000000000000000000000",
  // ]);
}

Token().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
