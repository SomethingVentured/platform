//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import {CrowdfundProxy} from "./CrowdfundProxy.sol";

/**
 * @title CrowdfundFactory
 * @author MirrorXYZ
 */
contract CrowdfundFactory {
    //======== Structs ========

    struct FundingReceiver {
        address payable receiver;
        uint256 percentCut;
    }

    //======== Events ========

    event CrowdfundDeployed(
        address crowdfundProxy,
        uint256 [] fundingParams,
        address payable[] addresses
    );

    //======== Immutable storage =========

    address public immutable logic;

    //======== Mutable storage =========

    address payable[] public addresses;
    function getAddresses() external view returns(address payable[] memory) {
        return addresses;
    }
    function getFundingParams() external view returns(uint256[] memory) {
        return fundingParams;
    }
    function getPoolId() external view returns(bytes32) {
        return poolId;
    }
    uint256[] public fundingParams;
    bytes32 public poolId;

    //======== Constructor =========

    constructor(address logic_) {
        logic = logic_;
    }

    //======== Deploy function =========

    function createCrowdfund(
        address payable[] calldata addresses_,
        uint256[] calldata fundingParams_,
        bytes32 poolId_
    ) external returns (address crowdfundProxy) {
        addresses = addresses_;
        fundingParams = fundingParams_;
        poolId = poolId_;

        crowdfundProxy = address(
            new CrowdfundProxy{
                salt: keccak256(abi.encode(addresses_[0], addresses_[1], addresses_[2]))
            }()
        );

        delete addresses;
        delete fundingParams;
        delete poolId;

        emit CrowdfundDeployed(crowdfundProxy, fundingParams_, addresses_);
    }
}