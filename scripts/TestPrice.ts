import { ethers } from "hardhat";

async function main() {
  const PriceConverter = await ethers.getContractFactory("PriceConverter");
  const price = await PriceConverter.deploy();

  await price.deployed();

  //Deployed to check the base of BTC/EUR
  const priceDerived = await price.getDerivedPrice(
    "0x6135b13325bfC4B00278B4abC5e20bbce2D6580e",
    "0x0c15Ab9A0DB086e062194c273CC79f41597Bbf13"
  );
  console.log(priceDerived);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
