// import { useState } from 'react';

// function AddPassword({ contract }) {
//   const [website, setWebsite] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [notes, setNotes] = useState('');

//   async function handleSubmit(event) {
//     event.preventDefault();
//     await contract.methods.addPassword(website, username, password, notes).send({ from: window.ethereum.selectedAddress });
//     setWebsite('');
//     setUsername('');
//     setPassword('');
//     setNotes('');
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Website:
//         <input type="text" value={website} onChange={(event) => setWebsite(event.target.value)} required />
//       </label>
//       <label>
//         Username:
//         <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} required />
//       </label>
//       <label>
//         Password:
//         <input type="text" value={password} onChange={(event) => setPassword(event.target.value)} required />
//       </label>
//       <label>
//         Notes:
//         <textarea value={notes} onChange={(event) => setNotes(event.target.value)}></textarea>
//       </label>
//       <button type="submit">Add Password</button>
//     </form>
//   );
// }

// export default AddPassword;


import React, { Component } from 'react';
import Web3 from 'web3';
import PasswordManagerContract from '../abis/contracts/PasswordManager.json';

class AddPassword extends Component {
  state = {
    username: '',
    password: '',
    website: '',
    isLoading: false,
    isAdding: false,
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ isAdding: true });
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
    const passwordManager = new web3.eth.Contract(
      PasswordManagerContract.abi,
      PasswordManagerContract.networks[5777].address,
    );
    const { username, password, website } = this.state;
    await passwordManager.methods
      .addPassword(
        web3.utils.utf8ToHex(username),
        web3.utils.utf8ToHex(password),
        web3.utils.utf8ToHex(website),
      )
      .send({ from: this.props.account });
    this.setState({ isAdding: false });
    this.props.history.push('/');
  };

  render() {
    const { username, password, website, isAdding } = this.state;
    return (
      <div>
        <h2>Add Password</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={username}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="text"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            Website:
            <input
              type="text"
              name="website"
              value={website}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <button type="submit" disabled={isAdding}>
            {isAdding ? 'Adding...' : 'Add'}
          </button>
        </form>
      </div>
    );
  }
}

export default AddPassword;
