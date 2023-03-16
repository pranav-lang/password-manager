pragma solidity ^0.8.0;

contract PasswordManager {

    struct Password {
        string website;
        string username;
        string password;
        string notes;
    }

    mapping (address => Password[]) private passwordList;

    function addPassword(string memory _website, string memory _username, string memory _password, string memory _notes) public {
        Password memory newPass = Password(_website, _username, _password, _notes);
        passwordList[msg.sender].push(newPass);
    }

    function getPassword(uint index) public view returns (string memory, string memory, string memory, string memory) {
        Password memory pass = passwordList[msg.sender][index];
        return (pass.website, pass.username, pass.password, pass.notes);
    }

    function getPasswordCount() public view returns (uint) {
        return passwordList[msg.sender].length;
    }

    function updatePassword(uint index, string memory _website, string memory _username, string memory _password, string memory _notes) public {
        require(index < passwordList[msg.sender].length, "Index out of range");
        Password storage pass = passwordList[msg.sender][index];
        pass.website = _website;
        pass.username = _username;
        pass.password = _password;
        pass.notes = _notes;
    }

    function deletePassword(uint index) public {
        require(index < passwordList[msg.sender].length, "Index out of range");
        for (uint i = index; i < passwordList[msg.sender].length-1; i++){
            passwordList[msg.sender][i] = passwordList[msg.sender][i+1];
        }
        passwordList[msg.sender].pop();
    }
}


// pragma solidity ^0.4.2;
// // SPDX-License-Identifier: MIT
// import './zeppelin/lifecycle/Killable.sol';

// contract Authentication is Killable {
//   struct User {
//     bytes32 name;
//   }

//   mapping (address => User) private users;

//   uint private id; // Stores user id temporarily

//   modifier onlyExistingUser {
//     // Check if user exists or terminate

//     require(!(users[msg.sender].name == 0x0));
//     _;
//   }

//   modifier onlyValidName(bytes32 name) {
//     // Only valid names allowed

//     require(!(name == 0x0));
//     _;
//   }

//   function login() constant
//   public
//   onlyExistingUser
//   returns (bytes32) {
//     return (users[msg.sender].name);
//   }

//   function signup(bytes32 name)
//   public
//   payable
//   onlyValidName(name)
//   returns (bytes32) {
//     // Check if user exists.
//     // If yes, return user name.
//     // If no, check if name was sent.
//     // If yes, create and return user.

//     if (users[msg.sender].name == 0x0)
//     {
//         users[msg.sender].name = name;

//         return (users[msg.sender].name);
//     }

//     return (users[msg.sender].name);
//   }

//   function update(bytes32 name)
//   public
//   payable
//   onlyValidName(name)
//   onlyExistingUser
//   returns (bytes32) {
//     // Update user name.

//     if (users[msg.sender].name != 0x0)
//     {
//         users[msg.sender].name = name;

//         return (users[msg.sender].name);
//     }
//   }
// }
