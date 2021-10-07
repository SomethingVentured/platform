import { ethers } from "hardhat";
import { CrowdfundProxy, CrowdfundFactory, CrowdfundLogic } from "../ts-types/contracts";
import { BigNumber } from "ethers";
import { LogDescription } from "@ethersproject/abi";

export const getLogic = async () => {
    const CrowdfundLogic = await ethers.getContractFactory("CrowdfundLogic");
    const logic = await CrowdfundLogic.deploy();
    await logic.deployed();
    return logic;
}

export const getFactory = async (logicAddress: string) => {
    const CrowdfundFactory = await ethers.getContractFactory("CrowdfundFactory");
    const deployment = await CrowdfundFactory.deploy(logicAddress);
    const factory = await deployment.deployed();
    return factory
}

type returnType = [CrowdfundProxy, LogDescription, CrowdfundLogic]

export const getProxy = async (factory: CrowdfundFactory, addresses:string[], fundingParams:BigNumber[], poolId:string, naming:string[]) => {
    let gasUsed;
    const deployTx = await factory.createCrowdfund(addresses, fundingParams, poolId, naming);
    const receipt = await deployTx.wait();
    gasUsed = receipt.gasUsed;
    const deploymentEvent = factory.interface.parseLog(receipt.events[0]);

    const constructorArgs = ethers.utils.defaultAbiCoder.encode(
        ["address", "string", "string"],
        [addresses[0], naming[0], naming[1]]
    );
    const salt = ethers.utils.keccak256(constructorArgs);
    const proxyBytecode = (await ethers.getContractFactory("CrowdfundProxy")).bytecode;
    const codeHash = ethers.utils.keccak256(proxyBytecode);
    const proxyAddress = await ethers.utils.getCreate2Address(factory.address, salt, codeHash);

    const proxy = await (
        await ethers.getContractAt("CrowdfundProxy", proxyAddress)
    ).deployed();

    const callableProxy = await (
        await ethers.getContractAt("CrowdfundLogic", proxyAddress)
      ).deployed();

    const returnArr:returnType = [proxy, deploymentEvent, callableProxy]

    return returnArr
}
