import React, { Component } from 'react';
import Web3 from 'web3';
import PasswordManagerContract from './abis/contracts/PasswordManager.json';
import './App.css';
import AddPassword from './components/AddPassword';
import PasswordList from './components/PasswordList';
import ViewPassword from './components/ViewPassword';
import EditPassword from './components/EditPassword';

class App extends Component {
state = {
activeScreen: 'passwordList',
activePassword: null,
};

componentDidMount() {
this.loadWeb3();
}

async loadWeb3() {
if (window.ethereum) {
window.web3 = new Web3(window.ethereum);
await window.ethereum.enable();
} else if (window.web3) {
window.web3 = new Web3(window.web3.currentProvider);
} else {
window.alert(
'Non-Ethereum browser detected. You should consider installing MetaMask',
);
}
}

setActiveScreen = (activeScreen) => {
this.setState({ activeScreen });
};

setActivePassword = (activePassword) => {
this.setState({ activePassword });
};

renderActiveScreen = () => {
const { activeScreen, activePassword } = this.state;

if (activeScreen === 'passwordList') {
  return (
    <PasswordList
      setActiveScreen={this.setActiveScreen}
      setActivePassword={this.setActivePassword}
    />
  );
}

if (activeScreen === 'addPassword') {
  return (
    <AddPassword
      setActiveScreen={this.setActiveScreen}
      setActivePassword={this.setActivePassword}
    />
  );
}

if (activeScreen === 'viewPassword') {
  return (
    <ViewPassword
      setActiveScreen={this.setActiveScreen}
      setActivePassword={this.setActivePassword}
      password={activePassword}
    />
  );
}

if (activeScreen === 'editPassword') {
  return (
    <EditPassword
      setActiveScreen={this.setActiveScreen}
      setActivePassword={this.setActivePassword}
      password={activePassword}
    />
  );
}

return null;

};

render() {
return <div className="app">{this.renderActiveScreen()}</div>;
}
}

export default App;



