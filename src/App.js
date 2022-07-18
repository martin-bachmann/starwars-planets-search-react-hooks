import React from 'react';
import './App.css';
import Header from './components/Header';
import Table from './components/Table';
import TableFilters from './components/TableFilters';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <Header />
      <TableFilters />
      <Table />
    </Provider>
  );
}

export default App;
