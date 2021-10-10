//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import {CrowdfundStorage} from "./CrowdfundStorage.sol";
import {ExampleERC20Token} from "./ERC20Token.sol";
import "./BalancerVault.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title CrowdfundLogic
 * @author MirrorXYZ
 *
 * Crowdfund the creation of NFTs by issuing ERC20 tokens that
 * can be redeemed for the underlying value of the NFT once sold.
 */
contract CrowdfundLogic is CrowdfundStorage {
    // ============ Events ============

    event Contribution(address contributor, uint256 amount);
    event FundingClosed(uint256 amountRaised);
    event Redeemed(address contributor);

    // ============ Modifiers ============

    /**
     * @dev Modifier to check whether the `msg.sender` is the operator.
     * If it is, it will run the function. Otherwise, it will revert.
     */
    modifier onlyOperator() {
        require(msg.sender == addresses[0]);
        _;
    }

    modifier nonReentrant() {
        // On the first call to nonReentrant, _notEntered will be true
        require(reentrancy_status != REENTRANCY_ENTERED, "Reentrant call");

        // Any calls to nonReentrant after this point will fail
        reentrancy_status = REENTRANCY_ENTERED;

        _;

        // By storing the original value once again, a refund is triggered (see
        // https://eips.ethereum.org/EIPS/eip-2200)
        reentrancy_status = REENTRANCY_NOT_ENTERED;
    }

    // ============ Crowdfunding Methods ============

    /**
     * @notice Mints tokens for the sender propotional to the
     *  amount of ETH sent in the transaction.
     * @dev Emits the Contribution event.
     */
    function contribute(address payable backer)
        external
        payable
        nonReentrant
    {
        require(block.timestamp<fundingParams[2], "Crowdfund: Funding period is over");
        contributions[backer]+=msg.value;
        totalContributions+=msg.value;
        emit Contribution(backer, msg.value);
    }

    /**
     * @notice Returns all the ETH that contributor supplied, can only be called if funding period is over and funding goal was not reached
     * @dev Emits the Redeemed event.
     */
    function redeem() external nonReentrant {
        require(block.timestamp>fundingParams[2] && address(this).balance<fundingParams[1], "Crowdfund: Funding has either not closed or has succeeded in meeting its goal");
        require(address(this).balance > 0, "Crowdfund: No ETH available to redeem");
        
        sendValue(payable(msg.sender), contributions[msg.sender]);
        totalContributions-=contributions[msg.sender];
        contributions[msg.sender] = 0;
        emit Redeemed(msg.sender);
    }

    // ============ Operator Methods ============

    /**
     * @notice Transfers all funds to operator, and mints tokens for the operator.
     *  Updates status to TRADING.
     * @dev Emits the FundingClosed event.
     */
    function closeFunding() external onlyOperator nonReentrant {
        require(status == Status.FUNDING, "Crowdfund: Funding must be open");
        require(fundingParams[2]<block.timestamp, "Crowdfund: Time limit has not expired");
        if (address(this).balance>=fundingParams[1]) {
            // Close funding status, move to tradable.
            status = Status.FUNDING_SUCCESS;
            // Announce that funding has been closed.
            emit FundingClosed(address(this).balance);
            // TODO: Implement logic to transfer funds to recepients
            addresses[0].transfer((address(this).balance*fundingParams[0])/100);
            // IVault vault = IVault(addresses[1]);
            // ERC20 ercToken = ERC20(addresses[2]);
            // IAsset[] memory assets;
            // assets[0] = IAsset(addresses[2]);
            // assets[1] = IAsset(address(0));
            // uint256[] memory amounts;
            // amounts[0] = ercToken.balanceOf(address(this));
            // amounts[1] = address(this).balance;
            // IVault.JoinPoolRequest memory request = IVault.JoinPoolRequest(assets, amounts, '', true);
            // vault.joinPool{value:address(this).balance}(poolId, address(this), address(this), request);
        } else {
            status = Status.FUNDING_FAIL;
        }
    }

    // ============ Utility Methods ============

    function sendValue(address payable recipient, uint256 amount) internal {
        require(
            address(this).balance >= amount,
            "Address: insufficient balance"
        );

        // solhint-disable-next-line avoid-low-level-calls, avoid-call-value
        (bool success, ) = recipient.call{value: amount}("");
        require(
            success,
            "Address: unable to send value, recipient may have reverted"
        );
    }
}