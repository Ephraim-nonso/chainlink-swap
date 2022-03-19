//SPDX-License-Identifier: Unlicensed

pragma solidity 0.8.4;
import "./interfaces/IERC20.sol";
import "./pricefeed/PriceConverter.sol";

contract TokenMarket {
    PriceConverter private p;
    IERC20 private tokenA;
    IERC20 private tokenB;
    // IERC20 private tokenB;
    uint256 public id;
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

    function swap(
        address _tokenA,
        address _tokenB,
        uint256 _amountToSwap,
        address _base,
        address _quote
    ) external returns (bool success, uint256 out) {
        // Records the transaction data. by receiving its relevant
        // information to be stored onchain.
        uint256 localId = id;
        int256 marketValue = p.getDerivedPrice(_base, _quote);

        // Refrence of the storage.
        SwapRecord storage sr = swaps[localId];
        sr.baseToken = _tokenA;
        sr.quoteToken = _tokenB;
        sr.base = _base;
        sr.quote = _quote;
        sr.baseTokenAmount = _amountToSwap; // 3
        sr.quoteTokenAmount = _amountToSwap * uint256(marketValue);
        sendToContract(_tokenA, sr.baseTokenAmount);
        sendToClient(_tokenB, sr.quoteTokenAmount);
        //measures to increase the index.
        localId = localId + 1;
        id = localId;
        sr.done = true;
        success = sr.done;
        out = sr.quoteTokenAmount;

        emit Record((sr.baseTokenAmount), sr.quoteTokenAmount);
    }

    // Exchange functions.
    // Transfer token into the address.
    function sendToContract(address _fromToken, uint256 _amt)
        internal
        returns (bool)
    {
        tokenA = IERC20(_fromToken);
        uint256 moneyInAcc = tokenA.balanceOf(msg.sender);
        moneyInAcc = moneyInAcc - _amt;
        return tokenA.transfer(address(this), _amt);
    }

    // Transfer token into the client.
    function sendToClient(address _toToken, uint256 _amt)
        internal
        returns (bool)
    {
        tokenB = IERC20(_toToken);
        uint256 moneyInAcc = tokenB.balanceOf(address(this));
        moneyInAcc = moneyInAcc - _amt;
        return tokenB.transfer(msg.sender, _amt);
    }
}
