# Swap Token Market With ChainLink Oracle.

The token market allows for the swapping of token pairs. In this exactly, the BNB/DAI pair was tested with the feature of Hardhat mainnet forking that permitted me to fork, impersonate and fund the contracts so as to give out the expected token. This token market ensured to give out the equivalent of the pair requested by the user of the decentralized application.

This market price feed was provided by the ChainLink oracle that obtains offchain data, onchain, and allows for easy calculations and aided immensely for swapping.

Try running some of the following tasks:

```shell
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
```

# Mainnet Forking and Impersonation with Hardhat.

In order to test the code, ensure to fork mainnet through the guidelines provided by Hardhat. First, deploy the ```PriceFeed Converter``` contract so as to aid in providing the price from which the calculation of the equivalent will be derived.
