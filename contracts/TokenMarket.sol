//SPDX-License-Identifier: Unlicensed

pragma solidity ^0.8.4;
import "./interfaces/IERC20.sol";
import "./pricefeed/PriceConverter.sol";

contract TokenMarket {
    // Ensure to get a valid contract after deployment.
    PriceConverter private p =
        PriceConverter(0x4bf010f1b9beDA5450a8dD702ED602A104ff65EE);

    // State variables.
    IERC20 private tokenA;
    IERC20 private tokenB;
    uint256 private id = 0;
    address internal base;
    address internal quote;

    // Event.
    event Record(uint256 tokenAmountIn, uint256 tokenAmountOut);

    struct SwapRecord {
        address baseToken;
        bool done;
        address quoteToken;
        address base;
        address quote;
        uint256 baseTokenAmount;
        uint256 quoteTokenAmount;
    }

    mapping(uint256 => SwapRecord) public swaps;

    //  check the price of BNB/DAI
    constructor() {
        base = 0x14e613AC84a31f709eadbdF89C6CC390fDc9540A;
        quote = 0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9;
    }

    function swap(
        address _tokenA,
        address _tokenB,
        uint256 _amountToSwap
    ) external returns (bool success, uint256 out) {
        require(_amountToSwap > 0, "Invalid amount passed.");
        // Records the transaction data. by receiving its relevant
        // information to be stored onchain.
        uint256 localId = id;
        int256 marketValue = p.getDerivedPrice(base, quote);

        // Reference of the storage.
        SwapRecord storage sr = swaps[localId];
        sr.baseToken = _tokenA;
        sr.quoteToken = _tokenB;
        sr.base = base;
        sr.quote = quote;
        sr.baseTokenAmount = _amountToSwap;
        sr.quoteTokenAmount = _amountToSwap * uint256(marketValue);
        sendToClient(_tokenA, sr.baseTokenAmount, _tokenB, sr.quoteTokenAmount);
        //measures to increase the index.
        localId = localId + 1;
        id = localId;
        sr.done = true;
        success = sr.done;
        out = sr.quoteTokenAmount;

        emit Record((sr.baseTokenAmount), sr.quoteTokenAmount);
    }

    // Exchange functions.
    // Transfer token into the client address.
    function sendToClient(
        address _fromToken,
        uint256 _amtIn,
        address _toToken,
        uint256 _amtOut
    ) internal returns (bool) {
        tokenB = IERC20(_toToken);
        require(
            sendToContract(_fromToken, _amtIn),
            "Must send to contract first."
        );
        require(
            tokenB.balanceOf(address(this)) > _amtOut,
            "Insufficent token in contract."
        );
        return tokenB.transfer(msg.sender, _amtOut);
    }

    // Transfer token into the address.
    function sendToContract(address _fromToken, uint256 _amt)
        internal
        returns (bool)
    {
        tokenA = IERC20(_fromToken);
        require(
            tokenA.balanceOf(msg.sender) > _amt,
            "Insufficent token from owner."
        );
        return tokenA.transferFrom(msg.sender, address(this), _amt);
    }
}
