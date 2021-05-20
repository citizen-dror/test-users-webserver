import React from 'react';
import logo from './logo.svg';
import './App.css';
import MyCard from './components/MyCard';

const styles = {
  div1: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
  },
  card: {
      width: 400,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fe43FE'
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <MyCard style={styles.card}>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        </MyCard>
       
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
