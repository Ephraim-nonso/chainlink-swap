//SPDX-License-Identifier: Unlicensed

pragma solidity 0.8.4;
import "./interfaces/IERC20.sol";
import "./pricefeed/Price.sol";

contract TokenMarket {
    PriceConverter private p;
    IERC20 private tokenA;
    IERC20 private tokenB;

    struct SwapOrder {
        address fromToken;
        bool done;
        address toToken;
        address base;
        address quote;
        uint8 decimals;
        uint256 toTokenAmount;
        uint256 fromTokenAmount;
    }

    mapping(uint256 => SwapOrder) private swaps;

    function getPriceExchange(
        address _base,
        address _quote,
        uint8 _decimals
    ) external view returns (int256) {
        int256 price = p.getDerivedPrice(_base, _quote, _decimals);
        return price;
    }

    function swap(
        address _tokenA,
        address _tokenB,
        uint256 _amountToSwap,
        uint256 _amountToReceive
    ) external returns (bool) {
        tokenA = IERC20(_tokenA);
        tokenA = IERC20(_tokenB);
        int256 marketValue = getPriceExchange(_base, _quote, _decimals);
    }
}
