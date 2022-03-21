import { ethers } from "hardhat";

async function main() {
  // Deploy the price converter before using the token market.
  const PriceConverter = await ethers.getContractFactory("PriceConverter");
  const price = await PriceConverter.deploy();

  await price.deployed();

  console.log("Price converter:", price.address);

  // Deployed to check the price of BTC/EUR
  const priceDerived = await price.getDerivedPrice(
    "0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c",
    "0xb49f677943BC038e9857d61E7d053CaA2C1734C1"
  );
  console.log(priceDerived);

  // Deployed to check the price of MATIC/ETH.
  const priceDerived2 = await price.getDerivedPrice(
    "0x7bAC85A8a13A4BcD8abb3eB7d6b4d632c5a57676",
    "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419"
  );
  console.log(priceDerived2);

  // Deployed to check the price of BNB/DAI
  const priceDerived3 = await price.getDerivedPrice(
    "0x14e613AC84a31f709eadbdF89C6CC390fDc9540A",
    "0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9"
  );
  console.log(priceDerived3);

  // This is for approximation.
  const bnbPrice = Number(priceDerived3) / Math.pow(10, 8);
  console.log(Math.floor(Number(bnbPrice)));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
