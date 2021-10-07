import { expect } from "chai";
import { ethers } from "hardhat";
import { CrowdfundProxy, CrowdfundFactory, CrowdfundLogic } from "../ts-types/contracts";
import { BigNumber } from "ethers";
import { getLogic, getFactory, getProxy } from "./deploymentUtility";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { LogDescription } from "@ethersproject/abi";

const minimumLimit = "9000000000000000000"; // 9 ETH
const deadline = Date.now()+10;
const opertorPercent = 5;

let fundingParams = [BigNumber.from(opertorPercent), BigNumber.from(minimumLimit), BigNumber.from(deadline)]
let naming = ["Name", "NM"]
const poolId = "0x48656c6c6f20576f726c64210000000000000000000000000000000000000000";


describe("Deployment of contracts", () => {
    let logic:CrowdfundLogic, factory:CrowdfundFactory, proxy:CrowdfundProxy, callableProxy:CrowdfundLogic;
    let deploymentEvent: LogDescription

    let address1:SignerWithAddress, address2:SignerWithAddress;
    let addresses:string[];

    before(async () => {
        [address1, address2] = await ethers.getSigners();
        addresses = [address1.address, address2.address]

        logic = await getLogic();
        factory = await getFactory(logic.address);
        [proxy, deploymentEvent, callableProxy] = await getProxy(factory, addresses, fundingParams, poolId, naming);
    })

    it("Factory has correct references", async () => {
        expect(await factory.logic()).to.eq(logic.address);
    })

    it("creates an event log for the deployment", async () => {
        const eventData = deploymentEvent.args;
        expect(eventData.crowdfundProxy).to.eq(proxy.address);
        expect(eventData.naming).to.eql(naming);
        expect(eventData.addresses).to.eql(addresses);
        expect(eventData.fundingParams).to.eql(fundingParams);
    });

    it("deletes parameters used during deployment", async () => {
        const addresses = await factory.getAddresses();
        const fundingparams = await factory.getFundingParams();
        const naming = await factory.getNaming();
        const poolId = await factory.poolId();

        expect(addresses).to.have.lengthOf(0);
        expect(fundingparams).to.have.lengthOf(0);
        expect(naming).to.have.lengthOf(0);
        expect(poolId).to.eq('0x0000000000000000000000000000000000000000000000000000000000000000');
    });

    it("it deploys a proxy with the correct data", async () => {
        expect(await proxy.logic()).to.eq(logic.address);
        expect(await callableProxy.addresses(0)).to.eq(addresses[0]);
        expect(await callableProxy.addresses(1)).to.eq(addresses[1]);
        expect(await callableProxy.fundingParams(0)).to.eq(fundingParams[0]);
        expect(await callableProxy.fundingParams(1)).to.eq(fundingParams[1]);
        expect(await callableProxy.fundingParams(2)).to.eq(fundingParams[2]);
        expect(await callableProxy.poolId()).to.eq(poolId);
    });
})