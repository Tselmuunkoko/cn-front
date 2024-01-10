import { useState} from 'react';
import { Web3 } from 'web3';
import {login, sign} from '../api/api';

function LoginComponent() {
  const [connectedAccount, setConnectedAccount] = useState('');
  async function connectWithMetamask(): Promise<void> {
    if ((window as any).ethereum) {
      const web3 = new Web3((window as any).ethereum);
      try {
        await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        setConnectedAccount(accounts[0]);
        const response = await login(JSON.stringify({'publicKey': accounts[0]}))
        const { msg } = response.data;
        await signMessage(msg, accounts[0]);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('Please download metamask');
    }
  }
  async function signMessage(msg: string, publicKey: string): Promise<void> {
    if ((window as any).ethereum) {
      const web3 = new Web3((window as any).ethereum);
      try {
        const signature = await web3.eth.personal.sign(
          msg,
          publicKey,
          ''
        );
        await sign(JSON.stringify({'publicKey': publicKey, 'msg': signature}));
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('Please download metamask');
    } 
  }
  return (
    
    <div className="App">
      <button onClick={() => connectWithMetamask()}>Connect to Metamask</button>
      <h2>{connectedAccount}</h2>
    </div>
  );
}

export default LoginComponent;
