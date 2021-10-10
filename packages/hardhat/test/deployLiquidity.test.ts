import { expect, assert } from "chai";
import { ethers, waffle } from "hardhat";
import { CrowdfundProxy, CrowdfundFactory, CrowdfundLogic } from "../ts-types/contracts";
import { BigNumber } from "ethers";
import { getLogic, getFactory, getProxy, delay, getDeadline } from "./deploymentUtility";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { LogDescription } from "@ethersproject/abi";

const { provider } = waffle;

describe("Test fund transfers after funding closes", () => {
    const minimumLimit = "900000000000000000"; // 0.9 ETH
    const fundingPeriod = 15
    const opertorPercent = 5;

    let fundingParams:BigNumber[];
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
        fundingParams = [BigNumber.from(opertorPercent), BigNumber.from(minimumLimit), getDeadline(fundingPeriod)];
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

    delay(fundingPeriod*1000)

    it("Sends funds to operator after funding closes", async () => {
        const signedProxy = callableProxy.connect(address1);
        const operatorBalance1 = await provider.getBalance(address1.address)
        const fundsAccumulated = await provider.getBalance(callableProxy.address);
        const expectedOperatorCut = fundsAccumulated.mul(fundingParams[0]).div(BigNumber.from(100))
        const tx = await signedProxy.closeFunding();
        const receipt = await tx.wait();
        const gasUsed = receipt.gasUsed;
        const gasPrice = tx.gasPrice;
        const gasCost = gasPrice.mul(gasUsed);
        const operatorBalance2 = await provider.getBalance(address1.address)
        expect(operatorBalance2).to.eq(operatorBalance1.add(expectedOperatorCut).sub(gasCost))
    })

    // TODO: Deploy Pool and test if pool receives funds after closing funding
})