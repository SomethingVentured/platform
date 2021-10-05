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

    struct Parameters {
        address payable[] addresses;
        uint256 [] fundingParams;
        bytes32 poolId;
    }

    //======== Events ========

    event CrowdfundDeployed(
        address crowdfundProxy,
        bytes32 poolId,
        uint256 [] fundingParams,
        address payable[] addresses
    );

    //======== Immutable storage =========

    address public immutable logic;

    //======== Mutable storage =========

    // Gets set within the block, and then deleted.
    Parameters public parameters;

    function getParameters() external view returns(Parameters memory) {
        return parameters;
    }

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
        parameters = Parameters({
            addresses: addresses_,
            fundingParams: fundingParams_,
            poolId: poolId_
        });

        crowdfundProxy = address(new CrowdfundProxy());

        delete parameters;

        emit CrowdfundDeployed(crowdfundProxy, poolId_, fundingParams_, addresses_);
    }
}