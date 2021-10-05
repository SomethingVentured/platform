import { expect } from "chai";
import { JsonRpcProvider } from "@ethersproject/providers";
import { ethers, waffle } from "hardhat";
import { CrowdfundLogic } from "../ts-types/contracts/CrowdfundLogic";
import { BigNumber, Contract } from "ethers";

let auctionAddress: string;
let mediaAddress: string;

let contentHex: string;
let contentHash: string;
let contentHashBytes: any;
let metadataHex: string;
let metadataHash: string;
let metadataHashBytes: any;

let tokenURI = "www.example.com";
let metadataURI = "www.example2.com";

let name = "Test Crowdfund";
let symbol = "TEST";
let CROWDFUND_STATUES = {
  FUNDING: "FUNDING",
};

const minimumLimit = "99999000000000000000000"; // 99999 ETH

const deadline = Date.now();

const TOKEN_SCALE = 1000;

const STATUS_MAP = ["FUNDING", "TRADING"];

const { provider } = waffle;

describe("Crowdfund via Proxy from Factory", () => {
  let deployerWallet;
  let contributor;
  let secondContributor;
  let creatorWallet;
  let funder;
  let fundingRecipient;

  before(async () => {
    [
      deployerWallet,
      contributor,
      secondContributor,
      creatorWallet,
      funder,
      fundingRecipient,
    ] = await ethers.getSigners();
  });

  describe("the crowdfund logic is deployed", () => {
    let logic, factory, token, proxy, callableProxy;

    describe("when deployed with appropriate arguments", () => {
      let crowdfund: CrowdfundLogic;

      before(async () => {
        const CrowdfundLogic = await ethers.getContractFactory(
          "CrowdfundLogic"
        );
        logic = await CrowdfundLogic.deploy();
        await logic.deployed();
      });

      describe("when the Crowdfund Factory is deployed", () => {
        beforeEach(async () => {
          const CrowdfundFactory = await ethers.getContractFactory(
            "CrowdfundFactory"
          );

          const deployment = await CrowdfundFactory.deploy(logic.address);
          factory = await deployment.deployed();
        });

        it("has the correct references to other contracts", async () => {
          expect(await factory.logic()).to.eq(logic.address);
        });
        describe("and a proxy is created through the factory", () => {
          let deploymentEvent, gasUsed;

          beforeEach(async () => {
            const operatorEquity = 5;
            const tokenFactory = await ethers.getContractFactory("ExampleERC20Token")
            token = await tokenFactory.deploy("Token", "TK")
            const deployTx = await factory.createCrowdfund(
              [creatorWallet.address, fundingRecipient.address, token.address],
              [BigNumber.from(operatorEquity), BigNumber.from(minimumLimit), deadline],
              "0x48656c6c6f20576f726c64210000000000000000000000000000000000000000"
            );
            const receipt = await deployTx.wait();
            gasUsed = receipt.gasUsed;

            deploymentEvent = factory.interface.parseLog(receipt.events[0]);

            // Compute address.
            const constructorArgs = ethers.utils.defaultAbiCoder.encode(
              ["address", "address", "address"],
              [creatorWallet.address, fundingRecipient.address, token.address]
            );
            const salt = ethers.utils.keccak256(constructorArgs);
            const proxyBytecode = (
              await ethers.getContractFactory("CrowdfundProxy")
            ).bytecode;
            const codeHash = ethers.utils.keccak256(proxyBytecode);
            const proxyAddress = await ethers.utils.getCreate2Address(
              factory.address,
              salt,
              codeHash
            );

            proxy = await (
              await ethers.getContractAt("CrowdfundProxy", proxyAddress)
            ).deployed();

            await token.setOperator(proxy.address)

            callableProxy = await (
              await ethers.getContractAt("CrowdfundLogic", proxyAddress)
            ).deployed();
          });

          it("creates an event log for the deployment", async () => {
            const eventData = deploymentEvent.args;
            expect(eventData.crowdfundProxy).to.eq(proxy.address);
            expect(eventData.name).to.eq(name);
            expect(eventData.symbol).to.eq(symbol);
            expect(eventData.operator).to.eq(creatorWallet.address);
          });

          it("deletes parameters used during deployment", async () => {
            const {
              name,
              symbol,
              operator,
              minimumLimit,
              operatorPercent,
            } = await factory.parameters();

            expect(name).to.eq("");
            expect(symbol).to.eq("");
            expect(operator).to.eq(
              "0x0000000000000000000000000000000000000000"
            );
            expect(minimumLimit.toString()).to.eq("0");
            expect(operatorPercent.toString()).to.eq("0");
          });

          it("it deploys a proxy with the correct data", async () => {
            expect(await proxy.logic()).to.eq(logic.address);
            expect(await callableProxy.name()).to.eq(name);
            expect(await callableProxy.symbol()).to.eq(symbol);
            expect(await callableProxy.operator()).to.eq(creatorWallet.address);
            expect(await callableProxy.operatorPercent()).to.eq("5");
          });
          describe("#redeemableFromTokens", () => {
            describe("scenarios", () => {
              // Used wolframalpha for these.
              let scenarios = [
                {
                  contributed: "7.342",
                  redeemed: "1.2",
                  fundsAdded: "0",
                  tokens: "2141",
                  expected: "2.141",
                },
                {
                  contributed: "7.342",
                  redeemed: "1.2",
                  fundsAdded: "1",
                  tokens: "2141",
                  expected: "2.489583523282318463",
                },
                {
                  contributed: "0.9432951",
                  redeemed: "0.4500796", // token supply is 493.2155
                  fundsAdded: "8.4494762", // balance is 8.9426917
                  tokens: "1029.1585",
                  expected: "18.66009315590132508",
                },
                {
                  contributed: "7.0461205",
                  redeemed: "0.17318647", // token supply is 6872.93403
                  fundsAdded: "44.15245", // balance is 51.02538403
                  tokens: "287.05264",
                  expected: "2.13110894545067228",
                },
              ];

              for (let i = 0; i < scenarios.length; i++) {
                const {
                  contributed,
                  redeemed,
                  tokens,
                  expected,
                  fundsAdded,
                } = scenarios[i];

                describe(`when ${contributed} ETH was contributed`, () => {
                  beforeEach(async () => {
                    await callableProxy
                      .connect(funder)
                      .contribute(
                        funder.address,
                        ethers.utils.parseEther(contributed),
                        {
                          value: ethers.utils.parseEther(contributed),
                        }
                      );
                  });

                  it("increases the contract's balance by that amount", async () => {
                    const newContractBalance = await provider.getBalance(
                      callableProxy.address
                    );

                    expect(newContractBalance.toString()).eq(
                      ethers.utils.parseEther(contributed).toString()
                    );
                  });

                  it("increases the contract's total supply", async () => {
                    const tokenAmount = ethers.utils
                      .parseEther(contributed)
                      .mul(TOKEN_SCALE)
                      .toString();

                    expect((await callableProxy.totalSupply()).toString()).eq(
                      tokenAmount
                    );
                  });
                });
              }
              // wait 5 seconds till the funding period expires and funding fails, then test redeeming
              // describe(`Wait 5 seconds and test redeeming`, () => {
              //   for (let i = 0; i < scenarios.length; i++) {
              //     const {
              //       contributed,
              //       redeemed,
              //       tokens,
              //       expected,
              //       fundsAdded,
              //     } = scenarios[i];
              //     describe(`and ${redeemed} tokens were redeemed`, () => {
              //       beforeEach(async () => {
              //         await callableProxy
              //           .connect(funder)
              //           .redeem(
              //             ethers.utils
              //               .parseEther(redeemed)
              //               .mul(TOKEN_SCALE)
              //               .toString()
              //           );
              //       });

              //       it("decreases the contract's balance by that amount", async () => {
              //         setTimeout(() => {
                        
              //         }, 6000);
              //         const newContractBalance = await provider.getBalance(
              //           callableProxy.address
              //         );

              //         const expected = ethers.utils
              //           .parseEther(contributed)
              //           .sub(ethers.utils.parseEther(redeemed));

              //         expect(newContractBalance.toString()).eq(
              //           expected.toString()
              //         );
              //       });

              //       describe(`and ${fundsAdded} ETH was added`, () => {
              //         beforeEach(async () => {
              //           await funder.sendTransaction({
              //             to: callableProxy.address,
              //             value: ethers.utils.parseEther(fundsAdded),
              //           });
              //         });

              //         describe(`and it is called with ${tokens} tokens`, () => {
              //           beforeEach(async () => {
              //             // Sanity check the total supply.
              //             const expected = ethers.utils
              //               .parseEther(contributed)
              //               .sub(ethers.utils.parseEther(redeemed))
              //               // NOTE: Total supply does not increase from funds added!
              //               .mul(TOKEN_SCALE);
              //             expect(
              //               (await callableProxy.totalSupply()).toString()
              //             ).eq(expected.toString());
              //           });

              //           it(`returns ${expected} ETH`, async () => {
              //             const toBurn = ethers.utils
              //               .parseEther(tokens)
              //               .toString();
              //             const expectedETH = ethers.utils
              //               .parseEther(expected)
              //               .toString();
              //             expect(
              //               await callableProxy.redeemableFromTokens(toBurn)
              //             ).to.eq(expectedETH);
              //           });
              //         });
              //       });
              //     });
              //   }
              // })
            });
          });
        })
      })
    })
  })
})