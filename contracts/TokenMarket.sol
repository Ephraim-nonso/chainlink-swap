//SPDX-License-Identifier: Unlicensed

pragma solidity 0.8.4;
import "./interfaces/IERC20.sol";
import "./pricefeed/Price.sol";

contract TokenMarket {
    function getPriceExchange(
        address _base,
        address _quote,
        uint8 _decimals
    ) external returns (init256) {
        PriceConverter.getDerivedPrice(_base, _quote, _decimals);
    }
}
