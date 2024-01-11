// import { useState} from 'react';
import './App.css';
import LoginComponent from './components/login';
import ProfileComponent from './components/profile';
import { useSelector } from 'react-redux';
import { RootState } from './store/reducers';

function App() {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  return (
    <div className="App">
      <LoginComponent></LoginComponent>
      {accessToken ? (
        <ProfileComponent></ProfileComponent>
      ): (<></>)}
    </div>
  );
}

export default App;
