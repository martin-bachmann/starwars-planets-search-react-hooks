import React from 'react';
import './App.css';
import Table from './components/Table';
import TableFilters from './components/TableFilters';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <h1>Star Wars Planets Search</h1>
      <TableFilters />
      <Table />
    </Provider>
  );
}

export default App;
