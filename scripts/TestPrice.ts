import { ethers } from "hardhat";

async function main() {
  const PriceConverter = await ethers.getContractFactory("PriceConverter");
  const price = await PriceConverter.deploy();

  await price.deployed();

  //Deployed to check the base of BTC/EUR
  const priceDerived = await price.getDerivedPrice(
    "0x396c5E36DD0a0F5a5D33dae44368D4193f69a1F0",
    "0xDA5904BdBfB4EF12a3955aEcA103F51dc87c7C39"
  );
  console.log(priceDerived);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
