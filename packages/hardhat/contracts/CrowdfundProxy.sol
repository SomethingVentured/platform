//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import {CrowdfundStorage} from "./CrowdfundStorage.sol";
import {CrowdfundFactory} from "./CrowdfundFactory.sol";

interface ICrowdfundFactory {

    function mediaAddress() external returns (address);

    function logic() external returns (address);
    function getAddresses() external view returns(address payable[] memory);
    function getFundingParams() external view returns(uint256[] memory);
    function getPoolId() external view returns(bytes32);
}

/**
 * @title CrowdfundProxy
 * @author MirrorXYZ
 */
contract CrowdfundProxy is CrowdfundStorage {
    constructor() {
        logic = ICrowdfundFactory(msg.sender).logic();
        // Crowdfund-specific data.
        addresses = ICrowdfundFactory(msg.sender).getAddresses();
        fundingParams = ICrowdfundFactory(msg.sender).getFundingParams();
        poolId = ICrowdfundFactory(msg.sender).getPoolId();
        // Initialize mutable storage.
        status = Status.FUNDING;
    }

    fallback() external payable {
        address _impl = logic;
        assembly {
            let ptr := mload(0x40)
            calldatacopy(ptr, 0, calldatasize())
            let result := delegatecall(gas(), _impl, ptr, calldatasize(), 0, 0)
            let size := returndatasize()
            returndatacopy(ptr, 0, size)

            switch result
                case 0 {
                    revert(ptr, size)
                }
                default {
                    return(ptr, size)
                }
        }
    }

    receive() external payable {}
}