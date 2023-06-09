pragma solidity ^0.8.0;

contract Migrations {
    address public owner;
    uint public last_completed_migration;

    constructor() {
        owner = msg.sender;
    }

    modifier restricted() {
        require(msg.sender == owner, "This function is restricted to the contract's owner");
        _;
    }

    function setCompleted(uint completed) public restricted {
        last_completed_migration = completed;
    }

    function upgrade(address newAddress) public restricted {
        Migrations upgraded = Migrations(newAddress);
        upgraded.setCompleted(last_completed_migration);
    }
}

// pragma solidity ^0.8.0;
// // SPDX-License-Identifier: MIT
// contract Migrations {
//   address public owner;
//   uint public last_completed_migration;

//   modifier restricted() {
//     if (msg.sender == owner) _;
//   }

//   constructor() public {
//     owner = msg.sender;
//   }

//   function setCompleted(uint completed) public restricted {
//     last_completed_migration = completed;
//   }

//   function upgrade(address new_address) public restricted {
//     Migrations upgraded = Migrations(new_address);
//     upgraded.setCompleted(last_completed_migration);
//   }
// }
