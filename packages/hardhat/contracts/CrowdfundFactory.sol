//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import {CrowdfundProxy} from "./CrowdfundProxy.sol";

/**
 * @title CrowdfundFactory
 * @author MirrorXYZ
 */
contract CrowdfundFactory {

    //======== Events ========

    event CrowdfundDeployed(
        address crowdfundProxy,
        string[] naming,
        uint256 [] fundingParams,
        address payable[] addresses
    );

    //======== Immutable storage =========

    address public immutable logic;

    //======== Mutable storage =========

    address payable[] public addresses;
    uint256[] public fundingParams;
    string[] public naming;
    bytes32 public poolId;

    function getAddresses() external view returns (address payable[] memory) {
        return addresses;
    }
    function getFundingParams() external view returns (uint256[] memory) {
        return fundingParams;
    }
    function getNaming() external view returns (string[] memory) {
        return naming;
    }

    //======== Constructor =========

    constructor(address logic_) {
        logic = logic_;
    }

    //======== Deploy function =========

    function createCrowdfund(
        address payable[] memory addresses_,
        uint256[] memory fundingParams_,
        bytes32 poolId_,
        string[] memory naming_
    ) external returns (address crowdfundProxy) {
        addresses = addresses_;
        fundingParams = fundingParams_;
        poolId = poolId_;
        naming = naming_;

        crowdfundProxy = address(
            new CrowdfundProxy{
                salt: keccak256(abi.encode(addresses_[0], naming_[0], naming_[1]))
            }()
        );

        delete addresses;
        delete fundingParams;
        delete poolId;
        delete naming;

        emit CrowdfundDeployed(crowdfundProxy, naming_, fundingParams_, addresses_);
    }
}