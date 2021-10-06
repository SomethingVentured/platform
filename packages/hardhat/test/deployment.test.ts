import { expect } from "chai";
import { ethers } from "hardhat";
import { CrowdfundLogic } from "../ts-types/contracts/CrowdfundLogic";
import { CrowdfundProxy, CrowdfundFactory } from "../ts-types/contracts";
import { BigNumber } from "ethers";

const minimumLimit = "9000000000000000000"; // 9 ETH
const deadline = Date.now()+10;
const opertorPercent = 5;

let fundingParams = [BigNumber.from(opertorPercent), BigNumber.from(minimumLimit), BigNumber.from(deadline)]
let naming = ["Name", "NM"]
const poolId = "0x48656c6c6f20576f726c64210000000000000000000000000000000000000000";


describe("Deployment of contracts", () => {
    let logic:CrowdfundLogic, factory:CrowdfundFactory, proxy:CrowdfundProxy;
    let deploymentEvent

    let deployerWallet;
    let contributor;
    let secondContributor;
    let creatorWallet;
    let funder;
    let fundingRecipient;
    let addresses;

    before(async () => {
        [
            deployerWallet,
            contributor,
            secondContributor,
            creatorWallet,
            funder,
            fundingRecipient,
        ] = await ethers.getSigners();

        addresses = [creatorWallet.address, fundingRecipient.address]
        
        const CrowdfundLogic = await ethers.getContractFactory("CrowdfundLogic");
        logic = await CrowdfundLogic.deploy();
        await logic.deployed();
        
        const CrowdfundFactory = await ethers.getContractFactory("CrowdfundFactory");
        const deployment = await CrowdfundFactory.deploy(logic.address);
        factory = await deployment.deployed();

        let gasUsed;
        const deployTx = await factory.createCrowdfund(addresses, fundingParams, poolId, naming);
        const receipt = await deployTx.wait();
        gasUsed = receipt.gasUsed;

        deploymentEvent = factory.interface.parseLog(receipt.events[0]);

        // Compute address.
        const constructorArgs = ethers.utils.defaultAbiCoder.encode(
            ["address", "string", "string"],
            [addresses[0], naming[0], naming[1]]
        );
        const salt = ethers.utils.keccak256(constructorArgs);
        const proxyBytecode = (await ethers.getContractFactory("CrowdfundProxy")).bytecode;
        const codeHash = ethers.utils.keccak256(proxyBytecode);
        const proxyAddress = await ethers.utils.getCreate2Address(factory.address, salt, codeHash);

        proxy = await (
            await ethers.getContractAt("CrowdfundProxy", proxyAddress)
        ).deployed();

        it("Factory has correct references", async () => {
            expect(await factory.logic()).to.eq(logic.address);
        })
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
        expect(await proxy.addresses(0)).to.eq(addresses[0]);
        expect(await proxy.addresses(1)).to.eq(addresses[1]);
        expect(await proxy.fundingParams(0)).to.eq(fundingParams[0]);
        expect(await proxy.fundingParams(1)).to.eq(fundingParams[1]);
        expect(await proxy.fundingParams(2)).to.eq(fundingParams[2]);
        expect(await proxy.poolId()).to.eq(poolId);
    });
})