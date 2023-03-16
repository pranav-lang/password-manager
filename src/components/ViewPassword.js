import React, { Component } from 'react';
import Web3 from 'web3';
import PasswordManagerContract from '../contracts/PasswordManager.json';

class ViewPassword extends Component {
  state = {
    passwordId: '',
    username: '',
    password: '',
    website: '',
    isLoading: false,
    isDeleting: false,
  };

  componentDidMount() {
    const { passwordId } = this.props.match.params;
    this.setState({ passwordId });
    this.loadPassword(passwordId);
  }

  async loadPassword(passwordId) {
    this.setState({ isLoading: true });
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
    const passwordManager = new web3.eth.Contract(
      PasswordManagerContract.abi,
      PasswordManagerContract.networks[5777].address,
    );
    const password = await passwordManager.methods
      .getPassword(passwordId)
      .call();
    this.setState({
      username: web3.utils.hexToUtf8(password.encryptedUsername),
      password: web3.utils.hexToUtf8(password.encryptedPassword),
      website: web3.utils.hexToUtf8(password.encryptedWebsite),
      isLoading: false,
    });
  }

  handleDelete = async () => {
    const { passwordId } = this.state;
    this.setState({ isDeleting: true });
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
    const passwordManager = new web3.eth.Contract(
      PasswordManagerContract.abi,
      PasswordManagerContract.networks[5777].address,
    );
    await passwordManager.methods.deletePassword(passwordId).send({
      from: (await web3.eth.getAccounts())[0],
    });
    this.setState({ isDeleting: false });
    this.props.history.push('/');
  };

  render() {
    const { username, password, website, isLoading, isDeleting } =
      this.state;
    return (
      <div className="view-password">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h2>{website}</h2>
            <p>
              Username: {username}
              <br />
              Password: {password}
            </p>
            <button onClick={this.handleDelete} disabled={isDeleting}>
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </>
        )}
      </div>
    );
  }
}

export default ViewPassword;
