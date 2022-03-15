//SPDX-License-Identifier: Unlicensed

pragma solidity 0.8.4;
import "./interfaces/IERC20.sol";
import "./pricefeed/Price.sol";

contract TokenMarket {
    PriceConverter private p;
    IERC20 private tokenA;
    IERC20 private tokenB;

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
        uint256 decimal
    ) external returns (bool) {
        tokenA = IERC20(_tokenA);
        tokenA = IERC20(_tokenB);
    }
}
