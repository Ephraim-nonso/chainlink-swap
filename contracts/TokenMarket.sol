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
    address internal base;
    address internal quote;

    // Event the records of transaction.
    event Record(uint256 tokenAmountIn, uint256 tokenAmountOut);

    //  check the price of BNB/DAI
    constructor() {
        base = 0x14e613AC84a31f709eadbdF89C6CC390fDc9540A;
        quote = 0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9;
    }

    /// @notice Calculates the swap cost and ensure transaction.
    /// @dev Returns the equivalent of the quote token.
    function swap(
        address _tokenA,
        address _tokenB,
        uint256 _amountToSwap
    ) external returns (uint256 _amountOut) {
        require(_amountToSwap > 0, "Invalid amount passed.");
        int256 marketValue = p.getDerivedPrice(base, quote);
        _amountOut = _amountToSwap * uint256(marketValue);
        sendToContract(_tokenA, _amountToSwap);
        sendToClient(_tokenB, _amountOut);
        // Records the transaction data. by receiving its relevant
        // information to be stored onchain.
        emit Record(_amountToSwap, _amountOut);
    }

    /// @dev Returns true on successful transfer to client.
    function sendToClient(address _toToken, uint256 _amountOut)
        internal
        returns (bool)
    {
        tokenB = IERC20(_toToken);
        return tokenB.transfer(msg.sender, _amountOut);
    }

    /// @dev Returns true on successful transfer to contract.
    function sendToContract(address _fromToken, uint256 _amountIn)
        internal
        returns (bool)
    {
        tokenA = IERC20(_fromToken);
        return tokenA.transferFrom(msg.sender, address(this), _amountIn);
    }
}
