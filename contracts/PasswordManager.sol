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
