import React from 'react';
import { Toaster } from 'react-hot-toast';
import './App.css';
import Routes from './routes/Routes';

class App extends React.Component {

  render(){
  return (
    <>
      <Routes />
      <Toaster />
    </>
  );
  }
}

export default App;
