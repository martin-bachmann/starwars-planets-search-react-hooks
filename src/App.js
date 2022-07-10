import React from 'react';
import './App.css';
import Table from './components/Table';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <span>Hello, App!!</span>
      <Table />
    </Provider>
  );
}

export default App;
