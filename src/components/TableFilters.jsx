import React from 'react';
import NumberFilter from './NumberFilter';
import TableOrderer from './TableOrderer';
import TextFilter from './TextFilter';
import './TableFilters.css';

function TableFilters() {
  return (
    <div className=".filters-container">
      <TextFilter />
      <div className="filters-wrapper">
        <NumberFilter />
        <TableOrderer />
      </div>
    </div>
  );
}

export default TableFilters;
