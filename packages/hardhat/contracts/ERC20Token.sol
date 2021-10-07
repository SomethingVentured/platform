//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ExampleERC20Token is ERC20{

    constructor(string memory name_, string memory symbol_) ERC20(name_, symbol_) {
        operator = msg.sender;
    }

    uint16 internal constant TOKEN_SCALE = 1000;
    address operator;

    modifier isOperator() {
        require(msg.sender==operator, "Message sender is not approved operator");
        _;
    }

    function makeOperator(address newOperator) public isOperator {
        operator = newOperator;
    }

    function mint(address to, uint256 amount) external payable isOperator {
        uint256 tokenAmount = valueToTokens(amount);
        _mint(to, tokenAmount);
    }

    function burn(address from, uint256 value) external isOperator {
        _burn(from, value);
    }

    function valueToTokens(uint256 value) public pure returns (uint256 tokens) {
        tokens = value * (TOKEN_SCALE);
    }

    function tokensToValue(uint256 tokenAmount) internal pure returns (uint256 value) {
        value = tokenAmount / TOKEN_SCALE;
    }
}