//SPDX-License-Identifier: Unlicensed

pragma solidity 0.8.4;
import "./interfaces/IERC20.sol";
import "./pricefeed/PriceConverter.sol";

contract TokenMarket {
    PriceConverter private p;
    IERC20 private token;
    // IERC20 private tokenB;
    uint256 public id;

    struct SwapRecord {
        address baseToken;
        bool done;
        address quoteToken;
        address base;
        address quote;
        int256 baseTokenAmount;
        int256 quoteTokenAmount;
    }

    mapping(uint256 => SwapRecord) public swaps;

    function swap(
        address _tokenA,
        address _tokenB,
        int256 _amountToSwap,
        address _base,
        address _quote
    ) external returns (bool success) {
        // Records the transaction data. by receiving its relevant
        // information to be stored onchain.
        uint256 localId = id;
        int256 marketValue = p.getDerivedPrice(base_, quote_);
        SwapRecord storage sr = swaps[localId];
        sr.baseToken = _tokenA;
        sr.quoteToken = _tokenB;
        sr.base = _base;
        sr.quote = _quote;
        sr.baseTokenAmount = _amountToSwap;
        sr.quoteTokenAmount = _amountToSwap * marketValue;
        sendToContract(_tokenA, sr.baseTokenAmount);
        sendToClient(_tokenB, sr.quoteTokenAmount);
        sr.done = true;
        success = sr.done;
        //measures to increase the index.
        localId = localId + 1;
        id = localId;
    }

    // Exchange functions.
    // Transfer token into the address.
    function sendToContract(address _fromToken, uint256 _amt)
        internal
        returns (bool)
    {
        IERC20(_fromToken).balanceOf(msg.sender) =
            IERC20(_fromToken).balanceOf(msg.sender) -
            _amount;
        return IERC20(_fromToken).transfer(address(this), _amt);
    }

    // Transfer token into the client.
    function sendToClient(address _toToken, uint256 _amt)
        internal
        returns (bool)
    {
        IERC20(_toToken).balanceOf(address(this)) =
            IERC20(_fromToken).balanceOf(address(this)) -
            _amount;
        return IERC20(_fromToken).transfer(msg.sender, _amt);
    }
}
