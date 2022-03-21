//SPDX-License-Identifier: Unlicensed

pragma solidity ^0.8.4;

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);

    function transferFrom(
        address i,
        address j,
        uint256
    ) external returns (bool);

    function transfer(address to, uint256 amount) external returns (bool);

    function approve(address spender, uint256 amount) external returns (bool);
}
