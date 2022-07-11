import React from 'react';
import './App.css';
import Table from './components/Table';
import TextFilter from './components/TextFilter';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <h1>Star Wars Planets Search</h1>
      <TextFilter />
      <Table />
    </Provider>
  );
}

export default App;
