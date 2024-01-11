import { useState} from 'react';
import { Web3 } from 'web3';
import {login, sign, get} from '../api/api';
import { useDispatch } from 'react-redux';
import { setAccessToken } from '../store/authSlice';
import { setEmail, setPhone } from '../store/userSlice';

// Login component that handles login or sign up flow
function LoginComponent() {
  const [connectedAccount, setConnectedAccount] = useState('');
  const dispatch = useDispatch();
  // first connect to metamask wallet and get public key from user
  async function connectWithMetamask(): Promise<void> {
    if ((window as any).ethereum) {
      const web3 = new Web3((window as any).ethereum);
      try {
        await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        setConnectedAccount(accounts[0]);
        const response = await login(JSON.stringify({'publicKey': accounts[0]}))
        const { msg } = response.data;
        // call signing service from backend with returned message from login service
        await signMessage(msg, accounts[0]);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('Please download metamask');
    }
  }
  // handles signing flow 
  async function signMessage(msg: string, publicKey: string): Promise<void> {
    if ((window as any).ethereum) {
      const web3 = new Web3((window as any).ethereum);
      try {
        const signature = await web3.eth.personal.sign(
          msg,
          publicKey,
          ''
        );
        // if backend verifies user then we get access token and store it into store and localstorage
        const token = await sign(JSON.stringify({'publicKey': publicKey, 'msg': signature}));
        dispatch(setAccessToken(token));
        // get user profile
        const {phone, email} = await get();
        await dispatch(setEmail(email))
        await dispatch(setPhone(phone));
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('Please download metamask');
    } 
  }
  return (
    <div className="bg-gray-200 p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Meta mask wallet connect demo</h1>
      <div className="flex items-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => connectWithMetamask()}
        >
          Connect to Metamask
        </button>
      </div>
    </div>
    // <div className="App">
    //   <button onClick={() => connectWithMetamask()}>Connect to Metamask</button>
    // </div>
  );
}

export default LoginComponent;
