//SPDX-License-Identifier: Unlicensed

pragma solidity 0.8.4;
import "./interfaces/IERC20.sol";
import "./pricefeed/Price.sol";

contract TokenMarket {
    PriceConverter private p;
    IERC20 private tokenA;
    IERC20 private tokenB;
    uint256 public id;

    struct SwapRecord {
        address fromToken;
        bool done;
        address toToken;
        address base;
        address quote;
        uint8 decimals;
        uint256 toTokenAmount;
        uint256 fromTokenAmount;
    }

    mapping(uint256 => SwapRecord) private swaps;

    function swap(
        address _tokenA,
        address _tokenB,
        uint256 _amountToSwap,
        address _base,
        addres _quote,
        uint9 _decimals
    ) external returns (bool success) {
        uint256 localId = id;
        int256 marketValue = getPriceExchange(_base, _quote, _decimals);
        SwapRecord storage sr = swaps[localId];
        sr.fromToken = _tokenA;
        sr.toToken = _tokenB;
        sr.decimals = sr.decimals;
        sr.base = _base;
        sr.quote = _quote;
        sr.fromTokenAmount = _amountToSwap;
        sr.toTokenAmount = _amountToSwap * marketValue;
        sr.done = true;
        success = s.done;
        //measures to increase the index.
        localId = localId + 1;
        id = localId;
    }

    //Function to get the swap price of tokens.
    function getPriceExchange(
        address base_,
        address quote_,
        uint8 decimals_
    ) internal returns (int256) {
        int256 price = p.getDerivedPrice(base_, quote_, decimals_);
        return price;
    }

    // Exchange function.
    function exchange(
        address _fromSwap,
        address _toSwap,
        uint256 _amount
    ) external returns (uint256) {
        // uint256 localId = id;
        tokenA = IERC20(_fromSwap);
        tokenB = IERC20(_toSwap);
        _fromSwap.approve(address(this), _amount);
        _sr.fromToken.transfer(msg.sender, _amount);
        _sr.fromToken = _sr.fromToken - _amount;
    }
}
