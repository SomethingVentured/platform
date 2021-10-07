import { expect, assert } from "chai";
import { ethers, waffle } from "hardhat";
import { CrowdfundProxy, CrowdfundFactory, CrowdfundLogic } from "../ts-types/contracts";
import { BigNumber } from "ethers";
import { getLogic, getFactory, getProxy } from "./deploymentUtility";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { LogDescription } from "@ethersproject/abi";



const { provider } = waffle;

function delay(interval:number) {
    return it('should delay', done => 
    {
        setTimeout(() => done(), interval)

    }).timeout(interval + 100)
}

describe("Test staking and redeeming when successful", () => {
    const minimumLimit = "9000000000000000000"; // 9 ETH
    const fundingPeriod = 15
    const deadline = Math.round(Date.now() / 1000)+fundingPeriod;
    const opertorPercent = 5;

    let fundingParams = [BigNumber.from(opertorPercent), BigNumber.from(minimumLimit), BigNumber.from(deadline)]
    let naming = ["Name", "NM"]
    const poolId = "0x48656c6c6f20576f726c64210000000000000000000000000000000000000000";
    let logic:CrowdfundLogic, factory:CrowdfundFactory, proxy:CrowdfundProxy, callableProxy:CrowdfundLogic;
    let deploymentEvent: LogDescription

    let address1:SignerWithAddress, address2:SignerWithAddress, staker1:SignerWithAddress;
    let addresses:string[];

    before(async () => {
        [address1, address2, staker1] = await ethers.getSigners();
        addresses = [address1.address, address2.address]

        logic = await getLogic();
        factory = await getFactory(logic.address);
        [proxy, deploymentEvent, callableProxy] = await getProxy(factory, addresses, fundingParams, poolId, naming);
    })

    
    it("Receives funds and updates storage variables", async () => {
        let stakes = ['10', '20.32', '101', '3920.431', '90.123']
        for (const stake of stakes) {
            const signedProxy = callableProxy.connect(staker1);
            const prevContribution = await signedProxy.contributions(staker1.address)
            const prevContributions = await signedProxy.totalContributions()
            signedProxy.contribute(staker1.address, {value:ethers.utils.parseEther(stake)})
            const contribution = await signedProxy.contributions(staker1.address)
            const contributions = await signedProxy.totalContributions()
            expect(contribution).eq(prevContribution.add(BigNumber.from(ethers.utils.parseEther(stake))))
            expect(contributions).eq(prevContributions.add(BigNumber.from(ethers.utils.parseEther(stake))))
        }
        const contributions = await callableProxy.totalContributions()
        const expected = stakes.reduce((a, b) => +a + +b, 0)
        expect(contributions).to.eq(ethers.utils.parseEther(String(expected)))
    })

    it("Rejects premature refunding", async () => {
        const signedProxy = callableProxy.connect(staker1);
        try{
            await signedProxy.redeem();
            assert.fail("Transaction should have failed");
        } catch (err) {
            const errorMessage = "Crowdfund: Funding has either not closed or has succeeded in meeting its goal";
            assert.include(err.message, errorMessage, `The error message should contain ${errorMessage}`);
        }
    })
    
    delay(fundingPeriod*1000)

    it("Rejects refunding if funding was a success", async () => {
        const signedProxy = callableProxy.connect(staker1);
        try{
            await signedProxy.redeem();
            assert.fail("Transaction should have failed");
        } catch (err) {
            const errorMessage = "Crowdfund: Funding has either not closed or has succeeded in meeting its goal";
            assert.include(err.message, errorMessage, `The error message should contain ${errorMessage}`);
        }
    })
})

describe("Test staking and redeeming when failed", () => {
    const minimumLimit = "999000000000000000000"; // 999 ETH
    const fundingPeriod = 20
    const deadline = Math.round(Date.now() / 1000)+fundingPeriod;
    const opertorPercent = 5;

    let fundingParams = [BigNumber.from(opertorPercent), BigNumber.from(minimumLimit), BigNumber.from(deadline)]
    let naming = ["Name2", "NM2"]
    const poolId = "0x48656c6c6f20576f726c64210000000000000000000000000000000000000000";

    let logic:CrowdfundLogic, factory:CrowdfundFactory, proxy:CrowdfundProxy, callableProxy:CrowdfundLogic;
    let deploymentEvent: LogDescription

    let address1:SignerWithAddress, address2:SignerWithAddress, staker1:SignerWithAddress;
    let addresses:string[];

    before(async () => {
        [address1, address2, staker1] = await ethers.getSigners();
        addresses = [address1.address, address2.address]

        const deadline = Math.round(Date.now() / 1000)+fundingPeriod;
        fundingParams[2] = BigNumber.from(deadline)

        logic = await getLogic();
        factory = await getFactory(logic.address);
        [proxy, deploymentEvent, callableProxy] = await getProxy(factory, addresses, fundingParams, poolId, naming);
    })
    
    it("Receives funds and updates storage variables", async () => {
        let stakes = ['10', '2.32', '1', '3.4', '1']
        const temp = await provider.getBalance(callableProxy.address);
        for (const stake of stakes) {
            const signedProxy = callableProxy.connect(staker1);
            const prevContribution = await signedProxy.contributions(staker1.address)
            const prevContributions = await signedProxy.totalContributions()
            signedProxy.contribute(staker1.address, {value:ethers.utils.parseEther(stake)})
            const contribution = await signedProxy.contributions(staker1.address)
            const contributions = await signedProxy.totalContributions()
            expect(contribution).eq(prevContribution.add(BigNumber.from(ethers.utils.parseEther(stake))))
            expect(contributions).eq(prevContributions.add(BigNumber.from(ethers.utils.parseEther(stake))))
        }
        const balance = await provider.getBalance(callableProxy.address);
        const expected = stakes.reduce((a, b) => +a + +b, 0)
        expect(balance).to.eq(ethers.utils.parseEther(String(expected)))
    })

    delay(fundingPeriod*1000)

    it("Refunds funds when funding fails", async () => {
        const oldContractbalance = await provider.getBalance(callableProxy.address);
        const oldStakerBalance = await provider.getBalance(staker1.address)
        const expectedRefund = await callableProxy.contributions(staker1.address)
        const signedProxy = callableProxy.connect(staker1);
        const tx = await signedProxy.redeem()
        const receipt = await tx.wait();
        const gasUsed = receipt.gasUsed;
        const gasPrice = tx.gasPrice;
        const newContractbalance = await provider.getBalance(callableProxy.address);
        const newStakerBalance = await provider.getBalance(staker1.address)
        expect(oldContractbalance).to.eq(newContractbalance.add(expectedRefund))
        expect(newStakerBalance).to.eq(oldStakerBalance.add(expectedRefund).sub(gasPrice.mul(gasUsed)))
    })
})