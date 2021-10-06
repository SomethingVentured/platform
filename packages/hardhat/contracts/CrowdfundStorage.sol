//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

/**
 * @title CrowdfundStorage
 * @author MirrorXYZ
 */
contract CrowdfundStorage {

    // The two states that this contract can exist in. "FUNDING" allows
    // contributors to add funds.
    enum Status {FUNDING, FUNDING_FAIL, FUNDING_SUCCESS, TRADING}

    // ============ Constants ============

    // The factor by which ETH contributions will multiply into crowdfund tokens.
    uint256 internal constant REENTRANCY_NOT_ENTERED = 1;
    uint256 internal constant REENTRANCY_ENTERED = 2;

    // ============ Immutable Storage ============

    // The operator has a special role to change contract status.
    // addresses = [operator, vault, erc20_token]
    address payable[] public addresses;
    // fundingParams = [operatorPercent, minimumLimit, deadline]
    uint256 [] public fundingParams;
    string[] public naming;
    bytes32 public poolId;

    // ============ Mutable Storage ============

    // Represents the current state of the campaign.
    Status public status;
    uint256 internal reentrancy_status;
    mapping(address=>uint256) contributions;
    uint256 totalContributions;

    // ============ Delegation logic ============
    address public logic;
}