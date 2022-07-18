import React from 'react';
import Header from './components/Header';
import Table from './components/Table';
import TableFilters from './components/TableFilters';
import Provider from './context/Provider';
import './App.css';

function App() {
  return (
    <Provider>
      <div className="app-wrapper">
        <Header />
        <main className="table-wrapper">
          <TableFilters />
          <Table />
        </main>
        <img
          className="background-img"
          src="./photo-1506318137071-a8e063b4bec0.jpeg"
          alt="Imagem de ceu estrelado"
        />
      </div>

    </Provider>
  );
}

export default App;
