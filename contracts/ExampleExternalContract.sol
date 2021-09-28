// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.0;

contract ExampleExternalContract {

  bool public completed;

  function complete() public payable {
    completed = true;
  }
}