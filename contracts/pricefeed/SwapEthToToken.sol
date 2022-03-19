// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "../interfaces/IERC20.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract PriceConsumerV3 {
    // using SafeMath for uint256;
    AggregatorV3Interface internal priceFeed;
    IERC20 internal token;
    event Exchange(address owner, uint256 amountIn, uint256 amountOut);

    // function swapTokenToETH(
    //     address _token,
    //     address _base,
    //     uint256 _amount
    // ) external returns (bool) {
    //     token = IERC20(_token);
    //     require(token.transfer(address(this), _amount), "Not successful.");
    //     uint256 returnAmount = swapDerived(_base, _amount);
    //     payable(msg.sender).transfer(returnAmount);
    //     return true;
    // }

    function swapEthToExactToken(
        address base,
        address quote,
        address _token,
        uint256 _amount
    ) external returns (bool) {
        assert(msg.value == _amount);
        token = IERC20(_token);
        uint256 returnAmount = swapDerived(base, quote, _amount);
        token.transfer(msg.sender, returnAmount);
        emit Exchange(msg.sender, _amount, returnAmount);
        return true;
    }

    function swapDerived(
        address base,
        address quote,
        uint256 _amount
    ) internal returns (uint256) {
        int256 ethValue = getLatestPrice(base);
        int256 tokenValue = getLatestPrice(quote);
        int256 marketValue = ethValue / (tokenValue);
        return _amount * uint256(marketValue);
    }

    /**
     * Returns the latest price
     */
    function getLatestPrice(address _addr) public returns (int256) {
        priceFeed = AggregatorV3Interface(_addr);
        (
            ,
            /*uint80 roundID*/
            int256 price, /*uint startedAt*/ /*uint timeStamp*/ /*uint80 answeredInRound*/
            ,
            ,

        ) = priceFeed.latestRoundData();
        return price;
    }
}
