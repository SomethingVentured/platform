/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface SplitterProxyV2FactoryInterface extends ethers.utils.Interface {
  functions: {
    "createSplit(bytes32)": FunctionFragment;
    "merkleRoot()": FunctionFragment;
    "splitter()": FunctionFragment;
    "wethAddress()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "createSplit",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "merkleRoot",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "splitter", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "wethAddress",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "createSplit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "merkleRoot", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "splitter", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "wethAddress",
    data: BytesLike
  ): Result;

  events: {};
}

export class SplitterProxyV2Factory extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: SplitterProxyV2FactoryInterface;

  functions: {
    createSplit(
      merkleRoot_: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "createSplit(bytes32)"(
      merkleRoot_: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    merkleRoot(overrides?: CallOverrides): Promise<[string]>;

    "merkleRoot()"(overrides?: CallOverrides): Promise<[string]>;

    splitter(overrides?: CallOverrides): Promise<[string]>;

    "splitter()"(overrides?: CallOverrides): Promise<[string]>;

    wethAddress(overrides?: CallOverrides): Promise<[string]>;

    "wethAddress()"(overrides?: CallOverrides): Promise<[string]>;
  };

  createSplit(
    merkleRoot_: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "createSplit(bytes32)"(
    merkleRoot_: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  merkleRoot(overrides?: CallOverrides): Promise<string>;

  "merkleRoot()"(overrides?: CallOverrides): Promise<string>;

  splitter(overrides?: CallOverrides): Promise<string>;

  "splitter()"(overrides?: CallOverrides): Promise<string>;

  wethAddress(overrides?: CallOverrides): Promise<string>;

  "wethAddress()"(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    createSplit(
      merkleRoot_: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    "createSplit(bytes32)"(
      merkleRoot_: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    merkleRoot(overrides?: CallOverrides): Promise<string>;

    "merkleRoot()"(overrides?: CallOverrides): Promise<string>;

    splitter(overrides?: CallOverrides): Promise<string>;

    "splitter()"(overrides?: CallOverrides): Promise<string>;

    wethAddress(overrides?: CallOverrides): Promise<string>;

    "wethAddress()"(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    createSplit(
      merkleRoot_: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "createSplit(bytes32)"(
      merkleRoot_: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    merkleRoot(overrides?: CallOverrides): Promise<BigNumber>;

    "merkleRoot()"(overrides?: CallOverrides): Promise<BigNumber>;

    splitter(overrides?: CallOverrides): Promise<BigNumber>;

    "splitter()"(overrides?: CallOverrides): Promise<BigNumber>;

    wethAddress(overrides?: CallOverrides): Promise<BigNumber>;

    "wethAddress()"(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    createSplit(
      merkleRoot_: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "createSplit(bytes32)"(
      merkleRoot_: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    merkleRoot(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "merkleRoot()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    splitter(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "splitter()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    wethAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "wethAddress()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}