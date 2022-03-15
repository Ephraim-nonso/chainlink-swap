import { ethers } from "hardhat";

// const provider = new ethers.providers.JsonRpcProvider(
//   "https://speedy-nodes-nyc.moralis.io/cd38a1bba9d69a2115198ff0/eth/kovan"
// );
// const aggregatorV3InterfaceABI = [
//   {
//     inputs: [],
//     name: "decimals",
//     outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "description",
//     outputs: [{ internalType: "string", name: "", type: "string" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [{ internalType: "uint80", name: "_roundId", type: "uint80" }],
//     name: "getRoundData",
//     outputs: [
//       { internalType: "uint80", name: "roundId", type: "uint80" },
//       { internalType: "int256", name: "answer", type: "int256" },
//       { internalType: "uint256", name: "startedAt", type: "uint256" },
//       { internalType: "uint256", name: "updatedAt", type: "uint256" },
//       { internalType: "uint80", name: "answeredInRound", type: "uint80" },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "latestRoundData",
//     outputs: [
//       { internalType: "uint80", name: "roundId", type: "uint80" },
//       { internalType: "int256", name: "answer", type: "int256" },
//       { internalType: "uint256", name: "startedAt", type: "uint256" },
//       { internalType: "uint256", name: "updatedAt", type: "uint256" },
//       { internalType: "uint80", name: "answeredInRound", type: "uint80" },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "version",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     stateMutability: "view",
//     type: "function",
//   },
// ];
// const addr = "0x9326BFA02ADD2366b30bacB125260Af641031331";
// const priceFeed = new ethers.Contract(addr, aggregatorV3InterfaceABI, provider);
// priceFeed.latestRoundData().then((roundData: any) => {
//   // Do something with roundData
//   console.log("Latest Round Data", roundData);
// });

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  //   const PriceConverter = await ethers.getContractFactory("PriceConverter");
  //   const priceGet = await PriceConverter.deploy();

  const provider = new ethers.providers.JsonRpcProvider(
    "https://speedy-nodes-nyc.moralis.io/cd38a1bba9d69a2115198ff0/eth/kovan"
  );

  const PriceConverter = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const Yeah = await ethers.getContractAt("PriceConverter", PriceConverter);

  //   await priceGet.deployed();

  /**
   * THIS EXAMPLE USES UN-AUDITED CODE.
   * Network: Kovan
   * Base: BTC/USD
   * Base Address: 0x6135b13325bfC4B00278B4abC5e20bbce2D6580e
   * Quote: EUR/USD
   * Quote Address: 0x0c15Ab9A0DB086e062194c273CC79f41597Bbf13
   * Decimals: 8
   */
  //   console.log("The Price Converter deployed to:", priceGet.address);

  const base = "0x6135b13325bfC4B00278B4abC5e20bbce2D6580e";
  const quote = "0x0c15Ab9A0DB086e062194c273CC79f41597Bbf13";

  //   console.log(await priceGet.getDerivedPrice(base, quote, 8));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
