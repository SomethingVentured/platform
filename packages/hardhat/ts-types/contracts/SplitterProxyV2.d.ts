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
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface SplitterProxyV2Interface extends ethers.utils.Interface {
  functions: {
    "currentWindow()": FunctionFragment;
    "merkleRoot()": FunctionFragment;
    "splitter()": FunctionFragment;
    "wethAddress()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "currentWindow",
    values?: undefined
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
    functionFragment: "currentWindow",
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

export class SplitterProxyV2 extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: SplitterProxyV2Interface;

  functions: {
    currentWindow(overrides?: CallOverrides): Promise<[BigNumber]>;

    "currentWindow()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    merkleRoot(overrides?: CallOverrides): Promise<[string]>;

    "merkleRoot()"(overrides?: CallOverrides): Promise<[string]>;

    splitter(overrides?: CallOverrides): Promise<[string]>;

    "splitter()"(overrides?: CallOverrides): Promise<[string]>;

    wethAddress(overrides?: CallOverrides): Promise<[string]>;

    "wethAddress()"(overrides?: CallOverrides): Promise<[string]>;
  };

  currentWindow(overrides?: CallOverrides): Promise<BigNumber>;

  "currentWindow()"(overrides?: CallOverrides): Promise<BigNumber>;

  merkleRoot(overrides?: CallOverrides): Promise<string>;

  "merkleRoot()"(overrides?: CallOverrides): Promise<string>;

  splitter(overrides?: CallOverrides): Promise<string>;

  "splitter()"(overrides?: CallOverrides): Promise<string>;

  wethAddress(overrides?: CallOverrides): Promise<string>;

  "wethAddress()"(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    currentWindow(overrides?: CallOverrides): Promise<BigNumber>;

    "currentWindow()"(overrides?: CallOverrides): Promise<BigNumber>;

    merkleRoot(overrides?: CallOverrides): Promise<string>;

    "merkleRoot()"(overrides?: CallOverrides): Promise<string>;

    splitter(overrides?: CallOverrides): Promise<string>;

    "splitter()"(overrides?: CallOverrides): Promise<string>;

    wethAddress(overrides?: CallOverrides): Promise<string>;

    "wethAddress()"(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    currentWindow(overrides?: CallOverrides): Promise<BigNumber>;

    "currentWindow()"(overrides?: CallOverrides): Promise<BigNumber>;

    merkleRoot(overrides?: CallOverrides): Promise<BigNumber>;

    "merkleRoot()"(overrides?: CallOverrides): Promise<BigNumber>;

    splitter(overrides?: CallOverrides): Promise<BigNumber>;

    "splitter()"(overrides?: CallOverrides): Promise<BigNumber>;

    wethAddress(overrides?: CallOverrides): Promise<BigNumber>;

    "wethAddress()"(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    currentWindow(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "currentWindow()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    merkleRoot(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "merkleRoot()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    splitter(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "splitter()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    wethAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "wethAddress()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
