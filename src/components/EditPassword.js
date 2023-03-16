import React, { Component } from 'react';
import Web3 from 'web3';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PasswordManagerContract from '../abis/contracts/PasswordManager.json';

class EditPassword extends Component {
  state = {
    passwordId: '',
    username: '',
    password: '',
    website: '',
    isLoading: false,
    isUpdating: false,
  };

  componentDidMount() {
    const { passwordId } = this.props.match.params;
    this.setState({ passwordId });
    this.loadPassword(passwordId);
  }

  async loadPassword(passwordId) {
    this.setState({ isLoading: true });
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
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

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ isUpdating: true });
    const { passwordId, username, password, website } = this.state;
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
    const passwordManager = new web3.eth.Contract(
      PasswordManagerContract.abi,
      PasswordManagerContract.networks[5777].address,
    );
    await passwordManager.methods
      .updatePassword(
        passwordId,
        web3.utils.utf8ToHex(username),
        web3.utils.utf8ToHex(password),
        web3.utils.utf8ToHex(website),
      )
      .send({ from: (await web3.eth.getAccounts())[0] });
    this.setState({ isUpdating: false });
    this.props.history.push('/');
  };

  render() {
    const { username, password, website, isLoading, isUpdating } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h1>Edit Password</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="username"
              value={username}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formWebsite">
            <Form.Label>Website</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter website"
              name="website"
              value={website}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={isUpdating}>
            {isUpdating ? 'Updating...' : 'Update'}
          </Button>
        </Form>
      </div>
    );
  }
}

export default EditPassword;
